//For the date-time
const moment = require('moment');
//Define port
const webSocketsServerPort = 8000;
//Web socket
const webSocketServer = require("websocket").server;
//HTTP server
const http = require("http");
const { json } = require('stream/consumers');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

//Received message type
mType = "";

console.log("Server running...");

// Set today's word to guess
var hiztegia = require('./hiztegiJSON-ES.json');
let elemenAukeratu = Math.floor(Math.random()*hiztegia.hitzak.length);
hiztegiHitza = hiztegia.hitzak[elemenAukeratu].hitza;
console.log("Word to guess: " + hiztegiHitza);

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];
//User identifier
let userID;

//Send message
const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    console.log(client + " || " + userID);
    if(mType == "contentchange") if(client != userID) clients[client].sendUTF(json);
    if(mType == "userevent") clients[client].sendUTF(json);
  });
};

//Two message types
const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange",
  CHAT: "chat",
};

//Connection request
wsServer.on("request", function (request) {

  userID = getUniqueID();
  console.log("[" + moment().format('YYYY/MM/D hh:mm:ss') + "] RECEIVED a new connection from origin " + request.origin + "." );
  
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log("CONNECTED: " + userID + " IN " + Object.getOwnPropertyNames(clients));

  //Inform the client of his ID
  const json = { type: "initial", id: userID, word: hiztegiHitza };
  clients[userID].sendUTF(JSON.stringify(json));

  //On message received
  connection.on("message", function (message) {

    if (message.type === "utf8") {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = { type: dataFromClient.type };
      
      if (dataFromClient.type === typesDef.USER_EVENT) {
        
        mType = "userevent";
        users[userID] = dataFromClient;
        userActivity.push(
          `${dataFromClient.username} joined to edit the document`
        );
        userID = dataFromClient.id;
        json.subtype = "joined";
        json.username = dataFromClient.username;

      } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {

        mType = "contentchange";
        console.log("Received from client: " + dataFromClient.content);
        editorContent = dataFromClient.content;
        console.log(dataFromClient.id);
        userID = dataFromClient.id;
        json.data = editorContent;

      } else if(dataFromClient.type === typesDef.CHAT){

        mType = "userevent";
        userID = dataFromClient.id;
        json.username = dataFromClient.username;
        json.data = dataFromClient.content;
      }

      sendMessage(JSON.stringify(json));
    }
  });

  //User disconnected
  connection.on("close", function (connection) {
    console.log(new Date() + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${this.username} left the document`);
    //editorContent = dataFromClient.username;
    json.subtype = "left";
    json.data = editorContent;
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });
});
