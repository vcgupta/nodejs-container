const { exec } = require("child_process");
// const fetch = require("node-fetch");
const fetch = require("sync-fetch");
var host = "http://localhost:8000";

if (host.includes("//localhost")) {
  var status = 0;
  try {
    const healthApiResult = fetch(host + "/api/health", {
      headers: {},
    });

    status = healthApiResult.status;

    console.log("Server is running");
  } catch (error) {
    console.error("Server is not running.");
  }
}
