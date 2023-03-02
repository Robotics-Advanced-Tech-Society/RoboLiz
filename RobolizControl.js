//const { io } = require("socket.io-client");
var Emergency = false;
var CameraNum= 1;
var RepeatTime = 100;
var socket = io();

//AJAX STUFF START UP
var xhttp = new XMLHttpRequest()
var responce;
var serverURL = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; //Got to get that eventually...
var FIFTEEN = 0;

//Commanded Motion:
// 1 = forward, 2 = backwards, 3 = rotate right, 4 = rotate left, 5 = Camera right, 6 = Camera left, 7 = Camera Change
const commands = ["NEW"]; // Start all new chains with NEW, and an END..
const delays = ["N"]; //N means its a command with no delay, and any other number is in .01 seconds... 
var up = true;
var counting = 0;



function mainRunning(){
    if(!Emergency){
        //Put in here the other functions that needs to repeatively happen.
        console.log("Running Code");        
        setTimeout(mainRunning,RepeatTime);
        if(FIFTEEN == 15){
            FIFTEEN = 0;
            if(!up){
                UP();
                up = false;
            }
            //Serverpush function
            console.log(commands);
        }FIFTEEN++;
        if(!up){counting++;}
    }
}
mainRunning();



//Handleing inputs:
function Keys(IN){
    if(up){
        if(IN == "W"){
            commands[commands.length()] = 1;
        }else if(IN == "A"){
            commands[commands.length()] = 3;
        }else if(IN == "S"){
            commands[commands.length()] = 2;
        }else if(IN == "D"){
            commands[commands.length()] = 4;
        }else if(IN == "J"){
            commands[commands.length()] = 5;
        }else if(IN == "K"){
            commands[commands.length()] = 6;
        }else if(IN == "P"){
            commands[commands.length()] = 7;
            delays[delays.length()] = 'N';
            up = true;
            counting = 0;
            countNOW = false;
        }
    }else{
        //Send up to flask thing saying stop it you dummy... only one key press at a time
    }
    
}
//these start the counting of how long a key is pressed... NOT SPACING OUT WITH LIKE THE 25 Seconds thing...
function DOWN(){
    up = false;
}
function UP(){
    up=true;
    delays[delays.length] = counting;
    counting = 0;
    
}




//LISTENING TO AJAX
xhttp.onreadystatechange = function(){
    if(this.readystate == 4 && this.status == 200){
        responce = this.responseText;
    }
};

//Need to make small command sections of like .25 seconds, then ajax that data away to the server...








//Personalized camerafeed...
var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio :true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}


//Emergency Error handleing

$('#Emergency').click(function(){   //Incase of emergency stop
    if(!Emergency){
        Emergency = true;
        $("#Emergency").text("Begin Robot Again!");
    }else{
        Emergency = false;
        alert("robot is starting again...");
        $("#Emergency").text("Emergency Stop");
        mainRunning();
    }
});

function ETJ(err){
    if(!Emergency){Emergency = true;}
    $('#Emergency').text(err);
}







