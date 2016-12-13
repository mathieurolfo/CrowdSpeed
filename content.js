setTimeout(loadElements, 1000);
console.log('running content script')


function loadElements() {  
    var mainElem = document.getElementById("watch-header");
    $(mainElem).css({
        "width": "1000px"
    })
    
   // console.log($('video:not(#rewardvideo)')[0].width);
    //$("#watch-header")[0].innerHTML = generateFlaggerHTML();
    //$("#watch-header")[0].innerHTML += generateFlaggerHTML();
    //console.log(chrome.extension.getURL('/timeline.html'));
    $("#watch7-sidebar-contents").remove();

    var flags = {}
    flags["uninteresting"] = new Set()
    flags["difficult"] = new Set()

    $("#watch-header").load(chrome.extension.getURL('/timeline.html'), function() {
        //$(generateFlaggerHTML()).prependTo($("#watch-header"));
        clicked = function(elem) {
            console.log("i've been clicked!")
        }
        //$("#watch-header")[0].innerHTML += generateFlaggerHTML();
        
        $('#export').click(function() {
            var u = "u ";
            for (let item of flags["uninteresting"]) u += item + " ";
            var d = "   d ";
            for (let item of flags["difficult"]) d += item + " ";
            alert(u+d)
        });

        $('.flag-button').click(function(elem) {

        	console.log("clicked");
        	var listName = "#" + elem.currentTarget.id + "-flags";
        	var rawTime = $('video:not(#rewardvideo)').get()[0].currentTime
        	var mins = Math.floor(rawTime/60)
        	var secs = Math.floor(rawTime % 60)
        	if (secs < 10) {
        		secs = "0" + secs
        	}
        	var currTime = mins + ":" + secs 
            
            if(elem.target.id === "difficult") {
                if (!flags["difficult"].has(currTime)) {
                    var flag = "<span class='d-timestamp' style='padding: 2px;margin:2px;border-style: dotted;border-width:1px;font-size:14px'>" + currTime + "</span>"
                    $(flag).insertAfter($(listName))
                    flags["difficult"].add(currTime)
                }
            } else {
                if (!flags["uninteresting"].has(currTime)) {
                    var flag = "<span class='u-timestamp' style='padding: 2px;margin:2px;border-style: dotted;font-size:14px;border-width:1px;'>" + currTime + "</span>"
                    $(flag).insertAfter($(listName))
                    flags["uninteresting"].add(currTime)
                }
            }


            $('.d-timestamp').click(function(elem) {
                console.log(elem.target)
                console.log(elem.target.parentNode)
                elem.target.parentNode.removeChild(elem.target);
                flags["difficult"].delete(elem.target.innerHTML)
                
            });
            
        	$('.u-timestamp').click(function(elem) {
                console.log(elem.target)
                console.log(elem.target.parentNode)
                elem.target.parentNode.removeChild(elem.target);
                flags["uninteresting"].delete(elem.target.innerHTML)
                console.log(flags["uninteresting"])
            });
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
        	"font-size": "16px",
            "border-radius": "4px"

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

        // $('#flaggingwindow').css({
        //     "height": "800px"
        // })

        var video = $('video:not(#rewardvideo)')
    
        
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