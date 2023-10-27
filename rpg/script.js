
let xp = 0;
let health = 100;
let gold = 50;

let fighting;
let currentwepon = 0;
let monsterhealth;
let inventory = ['stick'];
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');

const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText= document.querySelector('#goldText');
const monsterName = document.querySelector('#monsterName');
const  monsterHealth= document.querySelector('#monsterHealth');
const text = document.querySelector('#text');
const button3 = document.querySelector('#button3');
const monsterStats = document.querySelector('#monsterStats');

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightingDragon;
const locations = [
    {
        name: 'town-square',
        'button-text': ['Go to store', "Go to cave", 'Fight dragon'],
        'button-function': [goStore, goCave, fightingDragon],
        text: "You are in  the town square .You see a sign that say \"store\""
    }, {
        name: 'store',
        'button-text': ["Buy 10 health(10 gold)", "Buy weapon(30 gold)", 'Go back to town'],
        'button-function': [buyHealth, buyWeapon, goTown],
        text:"You enter the store"
    }, {
        name: 'cave',
        'button-text': ['Fight slime', 'Fight fanged beast ', 'Go to town'],
        'button-function': [fightSlime, fightBeast, goTown],
        text:"You enter in the  cave , you see monsters!"
    }, {
        name: "fight",
        "button-text": ["Attack", 'Dodge', 'Run'],
        "button-function":[attack,dodge,goTown],
        text:"you are fighting a monster"
    },
    {
        name: "Kill Monster",
        "button-text": ["Go to town", 'Go to town', 'Go to town'],
        "button-function":[goTown,goTown,easterEgger],
        text: 'the monster scream "Args" as it dies! ,You gain experience points and find some gold'
    },{
        name: "lose",
        "button-text": ["Replay?", 'Replay?', 'Replay?'],
        "button-function":[restart,restart,restart],
        text: 'You die, haha'

    },
    {
        name: "win",
        "button-text": ["Replay?", 'Replay?', 'Replay?'],
        "button-function":[restart,restart,restart],
        text: 'You win the game , Dragon is dead! the town is relived ThankYou to play my game '

    },
    {
        name: "easteregg",
        "button-text": [" 2", ' 8 ', 'Go to town'],
        "button-function":[pickTwo,pickEight,goTown],
        text: 'You find a hidden game ,Pick a number above,Ten no are randomly chosen from 0 to 10 ,if your no matches with any random numbers you win'

    }

]
const monsters = [
    {
        name:"slime",level:2,health:15
    }, { name: "Fanged-beast", level: 8, health: 60 },
    {name:"Dragon",level:20,health:300}
]
const weapons = [
    { name: 'stick', power: 5 },
    { name: "dagger", power: 30 },
    { name: 'hammer', power: 50 },
    { name: 'sword', power: 100 }
];

function update(location) {
    if (location.name == "Kill Monster") {
        button2.style.display = "none";
       
    } else {
        button2.style.display = "inline-block";
       
    }
    monsterStats.style.display = "none";
    button1.innerHTML = location["button-text"][0];
    button2.innerHTML = location["button-text"][1];
    button3.innerHTML = location["button-text"][2];
    button1.onclick = location['button-function'][0];
    button2.onclick = location['button-function'][1];
    button3.onclick = location['button-function'][2];
    text.innerHTML = location.text;
}
function goTown() {

    update(locations[0]);

}
function goStore() {
    update(locations[1]);
}
function buyHealth() {
    if (gold >= 10) {
        health = health + 10;//compound assignment
        healthText.innerHTML = health;
        gold = gold - 10;
        goldText.innerHTML = gold;
        text.innerHTML = "thanks for buying your current health is " + health;
    }
    else {
        text.innerHTML ="you donot have enough money"
            
    }

}

function buyWeapon() {
    if (currentwepon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentwepon++;
            goldText.innerHTML = gold;
            let newwepon = weapons[currentwepon].name;
            text.innerHTML = "You have a new weopen " + newwepon + ",";
            inventory.push(newwepon);
            text.innerHTML += " In your inventory you have " + inventory;


        } else {
            text.innerHTML = "you donot have enough money to buy  wepons";

        }
    } else {
        text.innerHTML = "you already have the most powerful wepon what else you want "
        button2.innerHTML = "sell weopons (15gold)";
        button2.onclick = sellWepons;

    }

}

function sellWepons() {
    if (inventory.length > 1) {
        let currentwepon = inventory.shift();
        gold += 15;
        goldText.innerHTML = gold;
        text.innerHTML = "you sold a" + currentwepon + " ,";
        text.innerHTML += "In your inventory you have" + inventory;
        
    }
    text.innerHTML = "Don't sell your only wepon";

}
function goCave() {
    update(locations[2]);
}
function fight() {
    monsterHealth.innerHTML = monsters[fighting].health;
    monsterhealth = monsters[fighting].health;
    monsterName.innerHTML = monsters[fighting].name;

    // button1.innerHTML = locations[3]["button-text"][0];
    // button2.innerHTML = locations[3]["button-text"][1];
    // button3.innerHTML = locations[3]["button-text"][2];
    // button1.onclick = locations[3]['button-function'][0];
    // button2.onclick = locations[3]['button-function'][1];
    // button3.onclick = locations[3]['button-function'][2];
    update(locations[3]);
    monsterStats.style.display = "block";
}
function fightSlime() {
    fighting = 0;
    fight();


}
function fightBeast() {
    fighting = 1;
    fight();
}

function fightingDragon() {
    fighting = 2;
    fight();
}
function attack() {
    text.innerHTML = "the " + monsters[fighting].name + " attacks ";
    if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
        
    } else {
        text.innerHTML += " you miss";
    }
    
    healthText.innerHTML = health;
    monsterhealth -= weapons[currentwepon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth.innerHTML = monsterhealth;
    if (health <= 0) {
        healthText.innerHTML = 0;
        lose();
    } else if (monsterhealth <= 0) {
         (fighting == 2) ? winGame() : defeatMonster();

        
    }
    if (Math.random() < 0.1 && currentwepon > 0) {
        text.innerHTML += " your" + inventory.pop() + " breaks.";
        currentwepon--;


    }
}
function getMonsterAttackValue(level) {
    let hit = level * 6 - Math.floor((Math.random() * xp));
    return hit;
}
function isMonsterHit() {
    return Math.random() > .2 || health <= 20;

}
function dodge() {
    text.innerHTML = "you successfully dodge the attack by" + monsters[fighting].name+".";
    
}
function lose() {
    update(locations[5]);

}
function winGame() {
    update(locations[6]);

}

function defeatMonster() {
    gold += Math.floor(6.7 * monsters[fighting].level);
    xp += monsters[fighting].level;
    xpText.innerHTML = xp;
    goldText.innerHTML = gold;

    update(locations[4]);
}
function restart() {
    xp = 0;
health = 100;
 gold = 50;

 currentwepon = 0;
    xpText.innerHTML = xp;
    healthText.innerHTML = health;
    goldText.innerHTML = gold;

    inventory = ['stick'];
    goTown();

}
function easterEgger() {
    update(locations[7]);
}
function pickTwo() {
    pick(2);

}
function pickEight(){
    pick(8);

}
function pick(guess) {
    text.innerHTML = "you picked the no " + guess + " here are the random numbers :\n";
    let no = [];
    while (no.length < 10) {
        no.push(Math.floor(Math.random() * 11));
    }
    for (let i = 0; i < 10; i++){
        text.innerHTML += no[i] + "\n";
    }
    if (no.indexOf(guess)!=-1) {
        text.innerHTML += "Right! You win 20 gold";
        gold += 20;
        goldText = gold;

    } else {
        text.innerHTML += "Lose! you lose 10 health";
        health -= 10;

        if (health <= 0) {
            lose();
        } else {
            healthText.innerHTML = health;
        }

        
    }
}
