var storage = chrome.storage.local;
var state;
var blockedSites = ["facebook.com", "youtube.com", "twitter.com"];
var blockedState = [true, true, true];

console.log("Hello");
function blockSite() 
{
    console.log("Found blocked site.");
    chrome.tabs.goBack();
}


// This method works but has some bugs.
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details)
        chrome.storage.local.get("state", function(data) {
            state = data.state;
            // console.log("State: " + state);
            for(index=0; index< blockedSites.length; index++) {
                if (details.url && state && 
                    details.url.includes(blockedSites[index])) {
                    if(blockedState[index] == true) blockSite();
                    return;
                    break;
                }
            }
        })
    }, {urls: ["<all_urls>"]}
);


// function checkState() 
// {
//     var foundState = false;
//     chrome.storage.local.get("state", function(x) {
//         foundState = x.state;
//         console.log("found state 1: " + foundState);
//         // console.log(x);
//         // if (x.state == true) {
//         //     console.log("This is true!");
//         //     return true;
//         // }
//         // return false;
//     });
//     console.log("Found state 2: " + foundState);
//     return foundState;
// }