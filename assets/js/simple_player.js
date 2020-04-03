$( document ).ready(function() {  

var timeDrag = false;   /* Drag status */
var isPlaying = false;
var theSound = $("#firstTrack");
var allIcons = $("i");
var isLoaded = false;

     

theSound.on("timeupdate",function(){
     var currentPos = theSound[0].currentTime; //Get currenttime
    var maxduration = theSound[0].duration; //Get video duration
    var percentage = 100 * currentPos / maxduration; //in %
    $('.timeBar').css('width', percentage+'%');
     $("#getTime").html(Math.floor(theSound[0].currentTime)+":"+Math.floor(theSound[0].duration));
}) ;    


$("#playIt").click( function(event) {
    
    // run once.
    if (!isLoaded) {
        theSound.trigger('load');
        setTimeout(startBuffer, 500);
        isLoaded = true;
     
        
    }
    
    // toggle play/pause
    if (!isPlaying) {
    
    theSound.trigger('play');
       
    $("#playIt").find(allIcons).removeClass("fa-play");
    $("#playIt").find(allIcons).addClass("fa-pause");
        
    isPlaying = true;
        
    }
    else {
        
        theSound.trigger('pause');
        
        $("#playIt").find(allIcons).removeClass("fa-pause");
        $("#playIt").find(allIcons).addClass("fa-play");
        
        isPlaying = false;
        
    }
});
     
$("#stepFive").click(function(){
    var currentPos = theSound[0].currentTime + 5;
    theSound[0].currentTime = currentPos;
});
     
     
$("#stepFiveback").click(function(){
       var currentPos = theSound[0].currentTime - 5;
    theSound[0].currentTime = currentPos;
});

     $('.progressBar').mousedown(function(e) {
    timeDrag = true;
    updatebar(e.pageX);
});
     
$(document).mouseup(function(e) {
    if(timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if(timeDrag) {
        updatebar(e.pageX);
    }
});
 
//update Progress Bar control
var updatebar = function(x) {
    var progress = $('.progressBar');
    var maxduration = theSound[0].duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();
 
    //Check within range
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }
 
    //Update progress bar and video currenttime
    $('.timeBar').css('width', percentage+'%');
    theSound[0].currentTime = maxduration * percentage / 100;
};
     
     //loop to get HTML5 video buffered data
var startBuffer = function() {
    
    var maxduration = $("#firstTrack")[0].duration;
    var currentBuffer = $("#firstTrack")[0].buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    $('.bufferBar').css('width', percentage+'%');
 
    //re-loop if not entierely buffered
    if(currentBuffer < maxduration) {
       setTimeout(startBuffer, 500);
    }
    
};
    //Volume control clicked
$('.volumeBar').on('mousedown', function(e) {
    var position = e.pageX - volume.offset().left;
    var percentage = 100 * position / volume.width();
    $('.volume').css('width', percentage+'%');
    theSound[0].volume = percentage / 100;
});

 });