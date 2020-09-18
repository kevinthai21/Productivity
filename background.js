var storage = chrome.storage.local;
var state;
var blockedSites = ["facebook.com", "youtube.com", "twitter.com", 
                        "linkedin.com", "instagram.com"];
var blockedState = [true, true, true, true, true];

var numDefaultBlocked = 5;
document.URL = "settings.html"
console.log("Document <Should be background.js>: " + document);
console.log("Document scripts: " + document.URL);
var inputSite = document.getElementById("addLink");
var buttonEnter = document.getElementById("inputEnter");
if(inputSite)
{
    console.log("hello")
}

if(buttonEnter)  {
    buttonEnter.addEventListener("click", addLink);
    console.log("Hello")
}


// Works fine, atm
function blockSite() 
{
    console.log("Found blocked site.");
    //chrome.tabs.goBack();
    // chrome.tabs.create({url: "blockedSite.html"})
    chrome.tabs.update({url: "blockedSite.html"})
}

function addLink() {
    console.log("Added things.");
    blockedSites.push(inputSite.innerHTML);
    blockedSites.push(true);

    console.log("Array: " + blockedSites);
}

// This method works but has some bugs.
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // console.log(details)
        chrome.storage.local.get("state", function(data) {
            state = data.state;
            // console.log("State: " + state);
            for(index=0; index< blockedSites.length; index++) {
                if (details.url && state && 
                    details.url.includes(blockedSites[index])) {
                    if(blockedState[index] == true) {
                        console.log(details.url);
                        blockSite();
                    }
                    return;
                }
            }
        })
    }, {urls: ["<all_urls>"]}
);