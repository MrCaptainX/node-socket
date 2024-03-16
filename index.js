// Importing the required modules
const WebSocket = require('ws');

// Creating a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Array to store connected clients
const clients = [];
console.log('trying')
// Event listener for when a client connects
wss.on('connection', function connection(ws) {
  console.log('A client connected');

  // Add the new client to the list
  clients.push(ws);

  // Event listener for when the server receives a message from a client
  ws.on('message', function incoming(message,isBinary) {
    // Loop through all clients
    clients.forEach(client => {
      // Send the message to all clients except the one that sent the message
      if (client !== ws) {
        client.send(message,{binary:isBinary});
        console.log('sent')
      }
    });
  });

  // Event listener for when a client disconnects
  ws.on('close', function close() {
    console.log('A client disconnected');

    // Remove the disconnected client from the list
    clients.splice(clients.indexOf(ws), 1);
  });
});
