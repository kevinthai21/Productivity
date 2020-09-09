var storage = chrome.storage.local;

console.log("Hello");
findDomain();
function blockSite() {
    window.location.replace("blockedSite.html");
}

function findDomain() {
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