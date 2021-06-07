const { exec } = require("child_process");
// const fetch = require("node-fetch");
const fetch = require("sync-fetch");
var host = "http://localhost:8000";

function startContainer(existingId) {
  if (existingId) {
    exec(`docker start ${existingId}`, (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err);
      } else {
        // the *entire* stdout and stderr (buffered)
        console.log("Starting existing container with same name", existingId);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    });
  } else {
    exec("docker run --name cube-ui -d -p 8000:8000 b861a3a3a970", (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err);
      } else {
        console.log("Starting container", stdout);
      }
    });
  }
}

if (host.includes("//localhost")) {
  var status = 0;
  try {
    const healthApiResult = fetch(host + "/api/health", {
      headers: {},
    });

    status = healthApiResult.status;

    console.log("Server is already running");
  } catch (error) {
    console.error("Server is not running. We will start now");
  }

  if (status !== 200) {
    var existingId = "";
    exec('docker ps -a -f "name=cube-ui" --format "{{.ID}}"', (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err);
      } else {
        existingId = stdout.trim();
        if (existingId) {
          console.log("Existing container with same name found", existingId);
        } else {
          console.log("Existing container with same name NOT found");
        }
      }
      startContainer(existingId);
    });
  }
}
