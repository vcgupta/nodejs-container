This project contains Node.js scripts, which can be used to start or stop the docker container. Also this project contains a sample server for docker container.

== Files ==
-server.js: NodeJS server, running inside a docker
-Dockerfile: Docker definition
-onExit, onStart, test.js files: Script to run from command line `node <file.js>` to start docker

== Setup docker ==
`
cd <dir>
docker build

`

== Node command ==

    `node onStart.js` - to start a container
    `node onStop.js` - to start a container
    `node test.js` - to start a container
