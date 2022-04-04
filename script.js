//var ws = new WebSocket("ws://10.55.10.147:5556");
//ws.binaryType = "blob";

socket = new WebSocket("ws://10.55.10.147:5556");
socket.binaryType = "blob";

// Log socket opening and closing
socket.addEventListener("open", event => {
    console.log("Websocket connection opened");
});

/*
socket.addEventListener("close", event => {
    console.log("Websocket connection closed");
});
*/
// Handle the message
socket.addEventListener("message", event => {
    console.log("here");
    if (event.data instanceof Blob) {
        reader = new FileReader();

        reader.onload = () => {
            console.log("Result: " + reader.result);
            /*
            if (reader.result == 'Username: ') {
                $("#getuname").show();
            } 
            else if (reader.result == 'Enter New Password:  ') {
                $("#getuname").hide();
                $("#getpasswd").show();
            }
            else if (reader.result == 'Repeat New Password: ') {
                $("#getuname").hide();
                $("#getpasswd").hide();
                $("#getpasswd2").show();
            }

            else if (reader.result == 'Password: ') {
                $("#getuname").hide();
                $("#getpasswd").hide();
                $("#getpasswd2").hide();
                $("#gethname").hide();
                $("#getpasswd").show();
            }
            else if (reader.result.includes('Host: ')) {
                $("#getuname").hide();
                $("#getpasswd").hide();
                $("#getuname").hide();
                $("#gethname").show();
            }
            else {
                   $(".login").hide();
                   $(".everything").show();
            }
            */
        };

        var h = reader.readAsText(event.data);
        
        console.log("reader.result: " + h)
        
        

    } else {
        console.log("Result: " + event.data);
    }
});

function username() {
    //$("#getuname").show();
    var usrname = String(document.getElementById("uname").value);
    console.log(usrname);
    send(usrname);
    $("#getuname").hide();
    $("#getpasswd").show();
}

function passwd() {
    var usrname = String(document.getElementById("passwd").value);
    console.log(usrname);
    send(usrname);
    $("#getuname").hide();
    $("#getpasswd").hide();
    $("#getpasswd2").show();
}

function passwd2() {
    var usrname = String(document.getElementById("passwd2").value);
    console.log(usrname);
    send(usrname);
    $("#getuname").hide();
    $("#getpasswd").hide();
    $("#getpasswd2").hide();
    $("#gethname").show();
}

function hname() {
    var usrname = String(document.getElementById("hname").value);
    console.log(usrname);
    $("#getuname").hide();
    $("#getpasswd").hide();
    $("#getpasswd2").hide();
    $("#gethname").hide();
    $(".login").hide();
    $(".everything").show();
    send(usrname);
}

function send(text) {
    console.log(text);
    var f = Uint8Array.from(Array.from(text).map(letter => letter.charCodeAt(0)));
    socket.send(f);
}

function writeComment() {

	var button = document.getElementById('commentButton'); 
    var commentField = document.getElementById('commentInput');
    var div = document.getElementById("output"); 
    var comment = document.createElement("p"); 
    comment.addEventListener("click", deleteComment);
    
    if(commentField.value.charAt(0) != " " &&   commentField.value.length != 0) {
        comment.innerHTML = commentField.value; 
        div.append(comment);
    }
    commentField.value = ""; 
}



const input = document.querySelector('textarea');
const num = document.querySelector('.num');
let val = input.value;
let lines = 1;

function update(e) {
    val = input.value;
    
    let lineBreaks = val.match(/\n/gi) || [];
    let numOfSpans = num.childElementCount;
    lines = lineBreaks.length ? lineBreaks.length + 1 : 1;
    
    num.innerHTML = ""
    for(var i = 0; i < lines; i++) {
        console.log('creating no', i)
        var element = document.createElement('span');
        element.innerHTML = i+1;
        num.appendChild(element); 
    }
}

input.addEventListener('input', update);