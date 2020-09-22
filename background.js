var storage = chrome.storage.local;
var state, links;
var blockedSites = ["facebook.com", "youtube.com", "twitter.com", 
                        "linkedin.com", "instagram.com"];
var blockedState = [true, true, true, true, true];

var numDefaultBlocked = 5;

setDefault();

// Works fine, atm
function blockSite() 
{
    // console.log("Found blocked site.");
    chrome.tabs.update({url: "blockedSite.html"})
}

function addLink() {
    console.log("Added things.");
    blockedSites.push(inputSite.innerHTML);
    blockedSites.push(true);

    console.log("Array: " + blockedSites);
}
function setDefault() {
    console.log("Set the default");
    storage.set({"links": ['facebook.com','youtube.com','twitter.com', 'linkedin.com', 'instagram.com']});
}

// This method works but has some bugs.
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // console.log(details)
        chrome.storage.local.get(["state", "links"], function(data) {
            state = data.state;
            links = data.links;

            if(!state) return;

            for(index=0; index< links.length; index++) {
                if (details.url && state && 
                    details.url.includes(links[index])) {
                    // if(blockedState[index] == true) {
                        console.log("Found a site.");
                        blockSite();
                    // }
                    return;
                }
            }
        })
    }, {urls: ["<all_urls>"]}
);