const urlParams = new URLSearchParams(window.location.search);

function getCookie(cname) {

    return urlParams.get(cname);
}

var mouseX = 0
var mouseY = 0

var primaryMouseButtonDown = false;

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

    const data2 = {
        "user": "traox",
        "input": {
            "mouseX": mouseX,
            "mouseY": mouseY,
            "leftClick": primaryMouseButtonDown
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
}, 50)



function setPrimaryButtonState(e) {
  var flags = e.buttons !== undefined ? e.buttons : e.which;
  primaryMouseButtonDown = (flags & 1) === 1;
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
