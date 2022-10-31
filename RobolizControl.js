var Emergency = false;
var CameraNum= 1;


function mainRunning(){
    if(!Emergency){
        //Put in here the other functions that needs to repeatively happen.
        setTimeout(mainRunning(),100);
        console.log("Running");
    }
}

$('#Emergency').click(function(){
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
