var storage = chrome.storage.local;
var state, links, time;
var totalSeconds;
var blockedSites = ["facebook.com", "youtube.com", "twitter.com", 
                        "linkedin.com", "instagram.com"];
var blockedState = [true, true, true, true, true];

var numDefaultBlocked = 5;

setDefault();
setInterval(setTime, 1000);


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

function setTime()
{
    totalSeconds++;
    chrome.storage.local.get(["state","time"], function(data)
    {
        state = data.state;

        if(!state) 
        {
            totalSeconds = 0;
            return;
        }

        storage.set({"time" : totalSeconds});

    });
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
                        if (details.url.includes("settings.html?add_link=" + links[index])) {
                            return;
                        }
                    // if(blockedState[index] == true) {
                        console.log("Found a site: " + details.url);
                        blockSite();
                    // }
                    return;
                }
            }
        })
    }, {urls: ["<all_urls>"]}
);