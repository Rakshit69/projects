const cell = document.querySelectorAll(".cell")
const status1=document.getElementById("status")
const restartbtn = document.querySelector("#restart");
const winconditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    
]
let options = ["", "", "", "", "", "", "", "", ""];
let currentplayre = "X";
let running = false;


initializeGame();

function initializeGame() {
    running = true;
   cell.forEach((element)=>element.addEventListener("click",cellclicked))
    restartbtn.addEventListener("click", restartgame)
    status1.textContent=`${currentplayre}'s turn`
}
function cellclicked() {
    const cellindex = this.getAttribute("cellIndex");
    if (options[cellindex] != "" || !running) {
        return;
    }
    updatecell(this, cellindex);
    checkwinner();
}
function updatecell(cell, index) {
    options[index] = currentplayre;
    cell.textContent = currentplayre;
   
    
}
function changeplayer() {
    currentplayre = (currentplayre == "X") ? "O" : "X";


}
function checkwinner() {
    let round = false;
    for (let i = 0; i < winconditions.length; i++) {
        const element = winconditions[i];
        if (options[element[0]] != "" && (options[element[1]] == options[element[2]] && options[element[0]] == options[element[1]])) {
            round = true;
            break;
        }
    }
    if (round) {
        status1.textContent = `${currentplayre} Wins`;
        running = false;
    }
    else if (!options.includes("")) {
        status1.textContent = `Draw!`;
        running = false;

        
    } else {
        changeplayer();
    }
}
function restartgame() {
    running = true;
    currentplayre = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cell.forEach((element) => {
        element.textContent = "";
    })
    status1.textContent=`${currentplayre}'s turn`


}
