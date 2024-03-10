let hour = document.getElementById("hours");
let minute = document.getElementById("minute");

let second = document.getElementById("second");


function showTime() {
    const data = new Date();
    const mm = data.getMinutes()*6;
    const hh = data.getHours() * 30 + (mm/ 2);
    const ss = data.getSeconds() * 6;

    hour.style.transform = `rotate(${hh}deg)`
    minute.style.transform = `rotate(${mm}deg)`
    second.style.transform = `rotate(${ss}deg)`
}
setInterval(showTime,1000);