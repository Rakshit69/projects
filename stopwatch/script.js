let buttons=document.getElementsByClassName("buttons")
let start=document.getElementById("startbtn")
let pause=document.getElementById("pausebtn")
let reset=document.getElementById("resetbtn")
let display=document.getElementById("display")
let container=document.getElementById("display-container")

let starttime = 0;
let elapsedtime = 0;
let currenttime = 0;

let paused = true;
let intervalid;
let hrs=0;
let min = 0;
let sec = 0;
start.addEventListener("click",() => {
    if (paused) {
        paused = false;
        starttime = Date.now() - elapsedtime;
        intervalid = setInterval(updatetime, 75);
    }
});
pause.addEventListener("click",() => {
    if (!paused) {
        paused = true;
        // elapsedtime = Date.now() - starttime;
        clearInterval(intervalid)
    }
});
reset.addEventListener("click",() => {
    starttime = 0;
 elapsedtime = 0;
 currenttime = 0;

 paused = true;
 clearInterval(intervalid)
 hrs=0;
 min = 0;
    sec = 0;
    display.textContent="00:00:00"
});

function updatetime() {
    elapsedtime = Date.now() - starttime;

    sec = Math.floor((elapsedtime / 1000) % 60); 
    min = Math.floor((elapsedtime / (1000*60)) % 60); 
    hrs = Math.floor((elapsedtime / (1000 * 60 * 60)) % 60); 
sec=pad(sec)
min=pad(min)
    hrs = pad(hrs)
    display.textContent = `${hrs}:${min}:${sec}`;
    
    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }

}
