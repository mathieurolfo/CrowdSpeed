setTimeout(loadElements, 1000);
console.log('running content script')


function loadElements() {  
    var mainElem = document.getElementById("watch-header");
    
   // console.log($('video:not(#rewardvideo)')[0].width);

    //$("#watch-header")[0].innerHTML += generateFlaggerHTML();
    //console.log(chrome.extension.getURL('/timeline.html'));

    $('.flag-button').click(function(elem) {
    	console.log("clicked");
    	var listName = "#" + elem.currentTarget.id + "-flags";
    	var rawTime = $('video:not(#rewardvideo)').get()[0].currentTime
    	var mins = Math.floor(rawTime/60)
    	var secs = Math.floor(rawTime % 60)
    	if (secs < 10) {
    		secs = "0" + secs
    	}
    	var currTime = mins + ":" + secs + "  "
    	$(listName)[0].innerHTML += currTime
    });

    $('.header').css({
    	"font-size": "16px",
    	"font-weight": "bold",
    	"margin-bottom": "10px"
    })

    $('.flag-button').css({
 		"border": "1px solid black",
    	"margin-right": "10px",
    	"margin-bottom": "5px",
    	"padding": "5px",
    	"font-size": "16px"
    });
    $('.flag-button').hover(function() {
    	$(this).css("cursor", "pointer");
    });
    $('#uninteresting-flags').css({
    	"font-size": "16px"
    });
    $('#difficult-flags').css({
    	"font-size": "16px"
    	
    });
    $('#difficult').css({
    	"background-color": "red",
    	"color": "white"
    })
    $('#uninteresting').css({
    	"background-color": "yellow",
    	"color": "black"
    })

    $('#flaggingwindow').css({
        "height": "800px"
    })

    var video = $('video:not(#rewardvideo)')
    
    $("#watch-header").load(chrome.extension.getURL('/timeline.html'), function() {
        // $(generateFlaggerHTML()).prependTo($("#watch-header"));

        $("#watch-header")[0].innerHTML += generateFlaggerHTML();
    });
    

}

function generateFlaggerHTML() {
	html = "<div id='flaggingwindow'>"
	html += "<div class='header'>Click on the buttons to flag the current time!</div>"
	html += "<button id='difficult' class='flag-button'>Difficult</button>"
	html += "<span id='difficult-flags'></span>"
	html += "<br>"
	html += "<button id='uninteresting' class='flag-button'>Uninteresting</button>"
	html += "<span id='uninteresting-flags'></span>"
	html += "</div>";
	return html;
	
}