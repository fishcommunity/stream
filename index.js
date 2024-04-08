const urlParams = new URLSearchParams(window.location.search);

function getCookie(cname) {

    return urlParams.get(cname);
}

var mouseX = 0
var mouseY = 0

var leftButtonDown = false;
var rightButtonDown = false;
var middleButtonDown = false;

var keyDown = ""

setInterval(() => {
    const data1 = {
        "user": getCookie("user"),
    };
    fetch('https://traoxfish.us-3.evennode.com/stream/getpicture', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            document.getElementById("picture").src = "data:image/bmp;base64," + json.picture
        }
    });
}, 50)

setInterval(() => {
    const data2 = {
        "user": "traox",
        "input": {
            "mouseX": mouseX,
            "mouseY": mouseY,
            "leftClick": leftButtonDown,
            "rightClick": rightButtonDown,
            "middleClick": middleButtonDown,
            "key": keyDown
        },
    };
    fetch('https://traoxfish.us-3.evennode.com/stream/uploadinput', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
    })
    keyDown = ""
}, 25)



function setPrimaryButtonState(e) {
  var flags = e.buttons !== undefined ? e.buttons : e.which;
  
  if (e.which == 1) {
    if (e.buttons == 0) leftButtonDown = false
    else if (e.buttons == 1) leftButtonDown = true
  } else if (e.which == 3) {
    if (e.buttons == 0) rightButtonDown = false
    else if (e.buttons == 2) rightButtonDown = true
  } else if (e.which == 2) {
    if (e.buttons == 0) middleButtonDown = false
    else if (e.buttons == 4) middleButtonDown = true
  }
}

document.addEventListener("mousedown", setPrimaryButtonState);
document.addEventListener("mousemove", setPrimaryButtonState);
document.addEventListener("mouseup", setPrimaryButtonState);



document.getElementById("picture").onmousemove = function(e) { 
    const x = Math.round(((e.pageX - e.currentTarget.offsetLeft) / document.getElementById("picture").clientWidth) * 1920); 
    const y = Math.round(((e.pageY - e.currentTarget.offsetTop) / document.getElementById("picture").clientHeight) * 1080); 
    mouseX = x
    mouseY = y
}

document.oncontextmenu = function(e) {
    return false;
}

document.addEventListener('keydown', function(event) {
    keyDown = event.key;
});
