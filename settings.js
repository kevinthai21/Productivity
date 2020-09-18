var storage = chrome.storage.local;
setDefault();

var userInput = document.getElementById("inputLink");
var userEnter = document.getElementById("inputEnter");

userEnter.addEventListener("click", addLink(userInput.innerText));

function addLink(userLink)
{  
    console.log("Added " + userLink);
    storage.get("links", function(x)
    {
        newLinks = x.links;
        newLinks.push(userLink);
        storage.set({"links": newLinks});
        console.log(x.links);
    });
}

function setDefault() {
    storage.set({"links": ['facebook.com','youtube.com', 'twitter.com']});
}