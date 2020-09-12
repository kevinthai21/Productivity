var storage = chrome.storage.local;

console.log("Hello");
blockSite();
// findDomain();
function blockSite() 
{
    // window.location.replace("blockedSite.html");
    console.log(chrome.url);
    return {cancel: true};
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
        return {cancel:true}
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