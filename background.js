var storage = chrome.storage.local;
var blockedSites = ["facebook.com", "youtube.com", "twitter.com"];
var blockedStates = [true, true, true];

console.log("Hello");

function blockSite() 
{
    console.log("Found blocked site.");
    chrome.tabs.goBack();
}

function findDomain() 
{
    chrome.tabs.query({active: true, lastFocusedWindow:true}, tabs => {
        let url = tabs[0].url;
        console.log(url);
    })
    var current = window.location.href;
    console.log("Current: " + current);
    if (current.includes("facebook")) {
        blockSite();
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details);
        chrome.storage.local.get("state", function(data) {
            state = data.state;
            // console.log("State: " + state);
            for (index=0; index<blockedSites.length; index++) {
                if(details.url&& state &&
                    details.url.includes(blockedSites[index])) {
                        if(blockedStates[index] == true) {
                            blockSite();
                            break;
                        }
                    }
            }
        })
    },
    {urls: ["<all_urls>"]}
);

// chrome.webRequest.onBeforeRequest.addListener( function(url) {
//     return {cancel:true}, {urls:["https:://www.google.com"]}, ["blocking"]
// });


// function checkState() 
// {
//     storage.get("state", function(x) {
//         if (x.state == true) return true;
//         return false;
//     });
// }