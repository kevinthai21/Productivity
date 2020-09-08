var state = false;
var test = document.getElementById("stateChange");

if (test) {
    test.onclick = function() {changeState() };
}

// not working at the moement
if (window.location.href.includes("google.com") && state == true){
    window.location.replace("C:\Users\Kevin Thai\Documents\GitHub\productivity\blockedSite.html");
}

function changeState()
{
    if (state == false) {
        state = true;
        test.innerText = "Stop";
    }
    else {
        state= false;
        test.innerText = "Start";
    }
}
console.log("State: " + state);
