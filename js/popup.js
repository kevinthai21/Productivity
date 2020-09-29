/*
 * File: popup.js
 * Created by Kevin Thai
 * September 30, 2020
 *
 * This file will change the information that popup displays depending
 * on what the user does. When the user 'starts' the productive state,
 * it will save it to the local storage and start the timer. If the user
 * pressed the 'settings' button, it would lead to an HTML page that will
 * help customize the user experience. The timer to give the user more 
 * incentive to continue being productive.
 */

// Strings for the "state change" button.
var stringOff = "Start";
var stringOn = "Stop";

// Variables that hold the elements from popup.html.
var buttonState = document.getElementById("changeState");
var buttonSetting = document.getElementById("settingsButton");
var labelHour = document.getElementById("hours");
var labelMinute = document.getElementById("minutes");
var labelSeconds = document.getElementById("seconds");

// Event listeners.
buttonState.addEventListener("click", clickState);
buttonSetting.addEventListener("click", clickSetting);

var storage = chrome.storage.local;

// When displaying the popup, the file has to get the state data
// in order to keep consistency.
storage.get("state", function(x) {
    if( x.state == true) 
    {
        buttonState.innerText = stringOn;
	changeTimeLabels();
    }
    else buttonState.innerText = stringOff;
});

// Calling this function every second.
setInterval(changeTimeLabels, 1000);


/*
 * Function: clickState();
 * Description: When the user clicks on the button to change
 * the state between productive and non-productive, it
 * will set the state in local storage. It will also change
 * the inner text of the button to indicate the change of
 * states is successful.
 */
function clickState()
{
    storage.get(["state","time"], function(x) 
    {
        var newState;
	
	// if the state is off, then turn it on (and vice versa).
        if(x.state == false || x.state == undefined) 
        {
            changeTimeLabels();
            newState = true;
            buttonState.innerText = stringOn;
        }
        else 
        {
            newState = false;
            buttonState.innerText = stringOff;
            storage.set({"time" : 0});
            resetTimeLabels();
        }

        storage.set({"state": newState});
    });

}

/*
 * Function clickSetting();
 * Description: It opens a new tab to go to the HTML that the user
 * can change the settings with.
 */
function clickSetting()
{
    chrome.tabs.create({url: "settings.html"});
}


/*
 * Function: changeTimeLabels();
 * Description: The function looks into the data to determine the
 * number of seconds has passed since activating the productivity
 * state. It will change the time labels in the popup.
 */
function changeTimeLabels()
{
    storage.get(["time", "state"], function(data) 
    {
	// if not productive state, then don't change anything
        if(!data.state) return;

        // distinguish between seconds, minutes, hours from number of seconds
	var seconds = parseInt(data.time%60);
        var minutes = parseInt((data.time/60)%60);
        var hours = parseInt(data.time/1200);
	
	// write out the numbers onto the popup.
        if(seconds<10) 
        {
            labelSeconds.innerText = "0" + seconds;
        }
        else labelSeconds.innerText = seconds;
        if(minutes<10) 
        {
            labelMinute.innerText = "0" + minutes + ":";
        }
        else labelMinute.innerText = minutes + ":";
        if(hours > 0) 
        {
            labelHour.innerHTML = hours + ":";
        }
    });
}

/*
 * Function: resetTimeLabels();
 * Description: When the user decides to turn of the productivity state,
 * then the time labels will be reset.
 */
function resetTimeLabels()
{
    labelSeconds.innerText = "";
    labelMinute.innerText = "";
    labelHour.innerText= "";
}