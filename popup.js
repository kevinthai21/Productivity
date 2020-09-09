var stringOff = "Start";
var stringOn = "Stop";

var buttonState = document.getElementById("stateChange");
var buttonSetting = document.getElementById("settingsButton");

buttonState.addEventListener("click", clickState);
buttonSetting.addEventListener("click", clickSetting);

var storage = chrome.storage.local;
storage.get("state", function(x) {
    if( x.state == true) buttonState.innerText = stringOn;
    else buttonState.innerText = stringOff;
});

function clickState()
{
    storage.get("state", function(x) 
    {
        var newState;
        console.log("State before: " + x.state);

        if(x.state == false || x.state == undefined) 
        {
            newState = true;
            buttonState.innerText = stringOn;
        }
        else 
        {
            newState = false;
            buttonState.innerText = stringOff;
        }

        console.log("State afer: " + newState);
        storage.set({"state": newState});
    });

}

function clickSetting()
{
    chrome.tabs.create({url: "settings.html"});
}