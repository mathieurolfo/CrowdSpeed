setTimeout(showHide, 1000);
console.log('running content script')


function showHide() {  
    var el = document.getElementById("watch-header");
    el.innerHTML = "put pins and stuff here"
    var videoplayer = document.getElementById("player")
    var video = $('video:not(#rewardvideo)')
    console.log(video[0])
    //el.innerHTML = videoplayer.getCurrentTime()
}

function addPin() {
	var video = $('video:not(#rewardvideo)')
	console.log(video[0].getCurrentTime())
}
