const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("time-stamp");

// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener("change", setVideoProgress);

// Function to play and pause video
function toggleVideoStatus(){
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update the play and pause icon
function updatePlayIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

// Update progress and timestamp of video
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // Get the minutes
    let minutes = Math.floor(video.currentTime / 60);
    if(minutes < 10) {
        minutes = "0" + String(minutes);
    }
    // Get the seconds
    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10) {
        seconds = "0" + String(seconds);
    }

    timestamp.innerHTML = `${minutes}:${seconds}`;
}

// Set the video's progress
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}


 