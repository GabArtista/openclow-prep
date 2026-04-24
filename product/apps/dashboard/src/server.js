import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sendText } from "../../../packages/shared/src/http.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const host = process.env.OPENCLOW_DASHBOARD_HOST ?? "127.0.0.1";
const port = Number(process.env.OPENCLOW_DASHBOARD_PORT ?? "3000");

const files = {
  "/": {
    path: path.join(__dirname, "index.html"),
    contentType: "text/html; charset=utf-8"
  },
  "/app.js": {
    path: path.join(__dirname, "app.js"),
    contentType: "application/javascript; charset=utf-8"
  }
};

const server = http.createServer((request, response) => {
  const target = files[new URL(request.url, `http://${host}:${port}`).pathname];

  if (!target) {
    sendText(response, 404, "Not found");
    return;
  }

  sendText(response, 200, fs.readFileSync(target.path, "utf8"), target.contentType);
});

server.listen(port, host, () => {
  console.log(`openclow-dashboard listening on http://${host}:${port}`);
});
