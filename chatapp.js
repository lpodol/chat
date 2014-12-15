var ws = new WebSocket("ws://localhost:3000");

//Create the page layout.
var body = document.querySelector("body");
var div = document.getElementById("div");
var ul = document.createElement("ul");
ul.style.listStyle = "none";
div.appendChild(ul);
setInterval(function () {
  var elem = div;// just to scroll down the line
  elem.scrollTop = elem.scrollHeight;
},30);

//Getting a message from the server.
ws.addEventListener("message", function(event){
  var item = JSON.parse(event.data);
  var li = document.createElement("li");
  var message = item.message;
  message = message.replace("(bear)", "ˁ˚ᴥ˚ˀ");
  message = message.replace("(bye)", "¸.·´¯`·.´¯`·.¸¸.·´¯`·.¸><(((º>");
  message = message.replace("(cry)", "(╥﹏╥)");
  message = message.replace("(why)", "ლ(ಠ益ಠლ)╯");

  // var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;//Thanks, StackOverflow!
  // message = message.replace(exp,"<a href='$1'>$1</a>");
  li.innerHTML = "<span>" + item.name  + ":</span> " + message;
  ul.appendChild(li);
//Reset the text box to blank.
  textinput.value = "";

  var array = item.message.split(" ");

  array.forEach(function(url){
    if (url.subsplit(0,4) === "http"){
      li.innerHTML = "<a href = " + url + ">" + url + "</a>"
      array.splice(i, 1, url);
      ul.appendChild(li)
    }
  })

  array.forEach(function(piclink){
    var length = piclink.length;
    var end_chars = piclink.charAt(length-3) + piclink.charAt(length-2) + piclink.charAt(length-1);
    end_chars = end_chars.toLowerCase();
    if(end_chars === "gif" || end_chars === "jpg" || end_chars === "bmp" || end_chars === "png"){
      var img = document.createElement("img");
      img.src = piclink;
      li.appendChild(img);
    };
  });
});

//Sending to and stringifying text and name box input for the server as an object.
var textinput = document.getElementById("textbox");
var nameinput = document.getElementById("namebox");
textinput.addEventListener("keypress", function(event){
  if (event.keyCode === 13){
    ws.send(JSON.stringify({
      name: nameinput.value,
      message: textinput.value
    }));
  };
});
