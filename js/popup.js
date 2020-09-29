var stringOff = "Start";
var stringOn = "Stop";

var buttonState = document.getElementById("changeState");
var buttonSetting = document.getElementById("settingsButton");
var labelHour = document.getElementById("hours");
var labelMinute = document.getElementById("minutes");
var labelSeconds = document.getElementById("seconds");

buttonState.addEventListener("click", clickState);
buttonSetting.addEventListener("click", clickSetting);

console.log(document.URL);
var storage = chrome.storage.local;
storage.get("state", function(x) {
    if( x.state == true) 
    {
        buttonState.innerText = stringOn;
    }
    else buttonState.innerText = stringOff;
});
setInterval(changeTimeLabels, 1000);

function clickState()
{
    storage.get(["state","time"], function(x) 
    {
        var newState;
        console.log("State before: " + x.state);

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

        console.log("State afer: " + newState);
        storage.set({"state": newState});
    });

}

function clickSetting()
{
    chrome.tabs.create({url: "settings.html"});
}

function changeTimeLabels()
{
    storage.get(["time", "state"], function(data) 
    {
        if(!data.state) return;

        var seconds = parseInt(data.time%60);
        var minutes = parseInt((data.time/60)%60);
        var hours = parseInt(data.time/1200);
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

function resetTimeLabels()
{
    labelSeconds.innerText = "";
    labelMinute.innerText = "";
    labelHour.innerText= "";
}