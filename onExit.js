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

    console.log("Server is already running");
  } catch (error) {
    console.error("Server is not running. Can't be stopped");
  }

  if (status == 200) {
    exec('docker ps -f "name=cube" --format "{{.ID}}"', (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err);
      } else {
        const containerId = stdout.trim();
        if (containerId) {
          console.log("Stopping container with id: ", containerId);
          exec(`docker stop ${containerId}`, (err1, stdout1, stderr1) => {
            if (err1) {
              //some err occurred
              console.error(err1);
            } else {
              console.log(`Container is stopped: ${stdout1}`);
            }
          });
        }
      }
    });
  }
}
