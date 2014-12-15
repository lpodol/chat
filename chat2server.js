var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});
var history = [];
var clients = [];

console.log("Listening on port 3000. Please press CTRL + C to quit.")

server.on("connection", function(ws){
  clients.push(ws);
  // if (history.length > 0){
  //   clients.forEach(function(message){
  //     ws.send(message);
  //   });
  // };
  console.log("A client has connected to the server!");

  ws.on("message", function(msg){
    history.push(msg);
    var hash = JSON.parse(msg);
    console.log(hash.name + ": " + hash.message);
    for (var i = 0; i < clients.length; i++){
      clients[i].send(msg);
    }

    var message = hash.message;
    var array = message.split(" ");

    array.forEach(function(word){
      if(word === "cat" || word === "kitten" || word === "kitty" || word === "kitteh"){
        ws.send(JSON.stringify({name: "Server", message: "You have been banned for discussing cats."}));
        ws.close();
        console.log("Client was banned for discussing cats.");
      }
    });
  });

  ws.on("close", function(){
    console.log("A client has disconnected.")
    var x = clients.indexOf(ws);//Should determine which client disconnected.
    clients.splice(x, 1);//This ought to remove the client from the array of connected clients.
  });
})
