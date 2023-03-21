//const { io } = require("socket.io-client");
var Emergency = false;
var CameraNum = 1;
var RepeatTime = 1;
//var socket = io();

//AJAX STUFF START UP
var xhttp = new XMLHttpRequest()
var responce;
var serverURL = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; //Got to get that eventually...
var TWENTYFIVE = 0;

//Commanded Motion:
// 1 = forward, 2 = backwards, 3 = rotate right, 4 = rotate left, 5 = Camera right, 6 = Camera left, 7 = Camera Change
const commands = ["NEW"]; // Start all new chains with NEW, and an END..
var Added = false;

//Video receiver stuff
var volume = 10; //Make sure to set to 50 later...
var camAllow = true;
var micAllow = true;
var recording = false;
let MediaRecord;
let chunks = [];

/*
Notes to self:
Set up a stop for recording on emergency stop
maybe log in page
Kill code
Remove Audio test part of personal camera... or atleast remove the feed back...
ajax
learn node.js for database manipulation...

*/



function mainRunning(){
    if(!Emergency){
        //Put in here the other functions that needs to repeatively happen.
        //console.log("Running Code");        
        if(TWENTYFIVE == 25){
            TWENTYFIVE = 0;
            serverpush();            
        }TWENTYFIVE++;
        
        setTimeout(mainRunning,RepeatTime);
    }
}

//Beginning start functions...
mainRunning();
startVideo(true, true);


//Handleing inputs:
function Keys(IN){
    if (IN == "W") {
        commands[commands.length] = 1;
    } else if (IN == "A") {
        commands[commands.length] = 3;
    } else if (IN == "S") {
        commands[commands.length] = 2;
    } else if (IN == "D") {
        commands[commands.length] = 4;
    } else if (IN == "J") {
        commands[commands.length] = 5;
    } else if (IN == "K") {
        commands[commands.length] = 6;
    } else if (IN == "P") {
        commands[commands.length] = 7;
    } else {
        console.log("UH HO");
    }
    Added = true;
   
}
//these start the counting of how long a key is pressed... NOT SPACING OUT WITH LIKE THE 25 Seconds thing...





// PREPPING SERVER PUSH
function serverpush(){
    // Do the push ajax... 
    if(recording && MediaRecord.status == "active"){
        MediaRecord.requestData();
    }
    if (Added && commands.length < 7) {
        commands[commands.length] = "END";
        console.log(commands);
        Added = false;
        data = {'COMMANDS': commands,
                'Password': "LetsaGO",
                'Chunks':chunks
            };
    }else{
        data = {'COMMANDS': "['NA']",
                'Password':"letsaGO",
                'Chunks':chunks
            }
    }
    //ajax goes here
    //$.post(serverURL,data);
    commands.length=0;
    commands[0]="NEW";
    chunks.length=0;
}

// add in an emergency push request for the emergency stop button!


//LISTENING TO AJAX
xhttp.onreadystatechange = function(){
    if(this.readystate == 4 && this.status == 200){
        responce = this.responseText;
    }
};

//Need to make small command sections of like .25 seconds, then ajax that data away to the server...





//Personalized camerafeed +Videorecording...
var videos = document.querySelector("#MiniScreen");
function startVideo(Vid, Aud){
    if(Vid || Aud){
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: Vid, audio : Aud })
          .then(function (stream) {
            videos.srcObject = stream;
            videos.muted = true; // REMOVE THIS IF YOU WANT TO TEST AUDIO...
            MediaRecord = new MediaRecorder(stream);
            recording = true;
          })
          .catch(function (err0r) {
            console.log("Something went wrong!"+err0r);
          });
      }
      if(!Vid){
      }
    }
}
if(recording){
    MediaRecord.ondataavailable = (e) => {
        chunks.push(e.data);
    };
}

function vidEnd(){
    stream = videos.srcObject;
    stream.getTracks().forEach(function(track) {
        track.stop();
      });
    recording = false;
}

function restartStream(){
    vidEnd();
    startVideo(camAllow,micAllow);
}



//REMEMBER THAT THESE VIDEO IS DIFFERENT FROM THE STREAM VIDEO... STREAM VIDEO IS VIDEOS not VIDEO

function volumeupdate(){
    video.volume = volume/100;
    $("#CURRENTVOLUME").text(""+(volume)+"%");
}
function volumeupdate(vols){
    video.volume = vols/100;
    $("#CURRENTVOLUME").text(""+(vols)+"%");
}
$("#upVol").click(function(){
    if(volume<100){
        volume=volume+2;
        volumeupdate();
    }
});
$("#downVol").click(function(){
    if(volume>0){
        volume=volume - 2;
        volumeupdate();
    }
});

$("#mute").click(function(){
    micAllow = !micAllow;
    if(micAllow){$("#muteimage").attr('src',"/static/nonmuted.png");}
    if(!micAllow){$("#muteimage").attr('src',"/static/muted.png");}
    restartStream();
});
$("#camera").click(function(){
    camAllow = !camAllow;
    if(camAllow){$("#cameraimage").attr('src',"/static/Camera.png");}
    if(!camAllow){$("#cameraimage").attr('src',"/static/NOCAMERA.png");}
    restartStream();
});




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




//misc
function REMOVEVIDEOBACKGROUND(){
    $(".videoElement").css("background-color","transparent");
    console.log("fine... you just don't like style");
}





