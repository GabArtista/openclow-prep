import fs from "node:fs";
import path from "node:path";
import { createId } from "../../shared/src/ids.js";
import { getDefaultStatePath, loadState, saveState } from "../../runtime/src/persistence.js";

function ensureDirectory(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function atomicWriteJson(filePath, payload) {
  ensureDirectory(filePath);
  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.renameSync(tmpPath, filePath);
}

function getQueuePath(statePath) {
  return path.join(path.dirname(statePath), "queue.json");
}

function getArtifactsIndexPath(statePath) {
  return path.join(path.dirname(statePath), "artifacts.json");
}

function getArtifactsDir(statePath) {
  return path.join(path.dirname(statePath), "artifacts");
}

function stripInternalFields(store) {
  const {
    statePath,
    queuePath,
    artifactsIndexPath,
    artifactsDir,
    commit,
    recordArtifact,
    persistState,
    persistQueue,
    persistArtifactsIndex,
    ...serializable
  } = store;

  return serializable;
}

function loadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

export function createDurableStore(options = {}) {
  const statePath = options.statePath ?? getDefaultStatePath();
  const store = loadState(statePath);
  const queuePath = options.queuePath ?? getQueuePath(statePath);
  const artifactsIndexPath = options.artifactsIndexPath ?? getArtifactsIndexPath(statePath);
  const artifactsDir = options.artifactsDir ?? getArtifactsDir(statePath);

  store.queue = loadJson(queuePath, Array.isArray(store.queue) ? store.queue : []);
  store.artifacts = loadJson(artifactsIndexPath, Array.isArray(store.artifacts) ? store.artifacts : []);

  Object.defineProperties(store, {
    statePath: {
      value: statePath,
      enumerable: false,
      writable: true
    },
    queuePath: {
      value: queuePath,
      enumerable: false,
      writable: true
    },
    artifactsIndexPath: {
      value: artifactsIndexPath,
      enumerable: false,
      writable: true
    },
    artifactsDir: {
      value: artifactsDir,
      enumerable: false,
      writable: true
    }
  });

  store.persistState = () => saveState(statePath, stripInternalFields(store));
  store.persistQueue = () => atomicWriteJson(queuePath, store.queue);
  store.persistArtifactsIndex = () => atomicWriteJson(artifactsIndexPath, store.artifacts);
  store.commit = () => {
    store.persistState();
    store.persistQueue();
    store.persistArtifactsIndex();
  };
  store.recordArtifact = (artifact) => {
    const record = {
      id: createId(),
      created_at: new Date().toISOString(),
      ...artifact
    };

    store.artifacts.push(record);

    const artifactPath = path.join(
      artifactsDir,
      record.run_id ?? "global",
      record.step_id ?? "step",
      `${record.id}.json`
    );

    atomicWriteJson(artifactPath, record);
    store.commit();
    return record;
  };

  return store;
}
