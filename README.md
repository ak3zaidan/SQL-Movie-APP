To run use commands:

node diagnostic.js <port number random 3-6k>

or 

./node_modules/forever/bin/forever start diagnostic.js 6019

to stop the server

control c when using the first command to run

and

./node_modules/forever/bin/forever stop diagnostic.js
when using the second command to start

forever allows server to run even after ssh connection is disabled.
