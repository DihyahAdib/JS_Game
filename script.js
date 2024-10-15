let level = 0;
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fightingState = [0, 1, 2];
let fighting;
let monsterHealth;
let inventory = ["Sword"];

const button1 = document.querySelector("#button1"); //--- ONLY STORE BUTTON ---//
const button2 = document.querySelector("#button2"); //--- ONLY CAVE BUTTON ---//
const button3 = document.querySelector("#button3"); //--- ONLY BUY10HP BUTTON ---//

const button4 = document.querySelector("#button4"); //--- ONLY BACK BUTTON ---//
const button5 = document.querySelector("#button5"); //--- ONLY BUYWEAPON BUTTON ---//
const button6 = document.querySelector("#button6"); //--- ONLY GHOUL BUTTON ---//

const button7 = document.querySelector("#button7"); //--- ONLY BEAST BUTTON ---//
const button8 = document.querySelector("#button8"); //--- ONLY WEREWOLF BUTTON ---//
const button9 = document.querySelector("#button9"); //--- ONLY DRAGGGOOON BUTTON ---//

const levelText = document.querySelector("#levelText");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const controlsForMonsters = document.querySelector("#controlsForMonsters");

//initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = buyHealth;

button4.onclick = justBack;
button5.onclick = buyWeapon;
button6.onclick = fightGhoul;

button7.onclick = fightBeast;
button8.onclick = fightWereWolf;
button9.onclick = fightDragon;

async function goStore() {
    console.log("Going To Store");
    await new Promise(resolve => setTimeout(resolve, 400));
    text.innerText = "Going To Store";

    await new Promise(resolve => setTimeout(resolve, 100));
    text.innerText = "Going To Store.";

    await new Promise(resolve => setTimeout(resolve, 200));
    text.innerText = "Going To Store..";
    
    await new Promise(resolve => setTimeout(resolve, 300));
    text.innerText = "Going To Store...";

    await new Promise(resolve => setTimeout(resolve, 400));
    button3.style.display = "inline-block";
    button5.style.display = "inline-block";

    text.innerText = " ";
}

async function justBack() {
 
    console.log("Going back");
    await new Promise(resolve => setTimeout(resolve, 400));
    text.innerText = "Going Back To Main menu";

    await new Promise(resolve => setTimeout(resolve, 100));
    text.innerText = "Going Back To Main menu.";

    await new Promise(resolve => setTimeout(resolve, 200));
    text.innerText = "Going Back To Main menu..";
    
    await new Promise(resolve => setTimeout(resolve, 300));
    text.innerText = "Going Back To Main Menu...";

    await new Promise(resolve => setTimeout(resolve, 400));
    button3.style.display = "none";
    button5.style.display = "none";

    controlsForMonsters.style.display = "none";
    button6.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    button9.style.display = "none";

    await new Promise(resolve => setTimeout(resolve, 100));
    text.innerText = "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.";
}

async function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        goldText.innerText = gold;
        health += 10; 
        healthText.innerText = health;
        
        console.log("Health purchased, Gold reduced to", gold);
        text.innerText = ("Health purchased, -10 Gold");
        await new Promise(resolve => setTimeout(resolve, 800));
        text.innerText = "";
        
        if (gold <= 0) {
            button3.disabled = true;
            text.innerText = ("Not Enough Gold!");
            await new Promise(resolve => setTimeout(resolve, 1800));
            text.innerText = "";
        }
    }  
}
async function buyWeapon() {
    if (gold >= 30) {
        gold -= 30;
        goldText.innerText = gold;
        currentWeapon++;
        
        console.log("Weapon purchased, Gold reduced to", gold);
        text.innerText = (nameOfWeapon + " purchased, -30 Gold");
        await new Promise(resolve => setTimeout(resolve, 800));
        text.innerText = "";
        
        if (currentWeapon === 1) {
            button5.disabled = true;
            await new Promise(resolve => setTimeout(resolve, 400));
        }
    } 
}
async function goCave() {
    console.log("Going To Cave");
    await new Promise(resolve => setTimeout(resolve, 400));
    text.innerText = "Going To Cave";

    await new Promise(resolve => setTimeout(resolve, 100));
    text.innerText = "Going To Cave.";

    await new Promise(resolve => setTimeout(resolve, 200));
    text.innerText = "Going To Cave..";
    
    await new Promise(resolve => setTimeout(resolve, 300));
    text.innerText = "Going To Cave...";

    await new Promise(resolve => setTimeout(resolve, 400));

    controlsForMonsters.style.display = "block";
    button6.style.display = "inline-block";
    button7.style.display = "inline-block";
    button8.style.display = "inline-block";
    button9.style.display = "inline-block";

    button1.disabled = true;
    button3.style.display = "none";
    button5.style.display = "none";

    if (level === 0) {
        text.innerText = "Dragon Locked: Get More Levels!";
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    text.innerText = ""

}

function fightGhoul() {
    console.log("Fighting The Dragon!")
}
function fightBeast() {
    console.log("Fighting The Dragon!")
}
function fightWereWolf() {

}
async function fightDragon() {
    console.log("Fighting The Dragon!")
    if (level === 0) {
        text.innerText = "Dragon Locked: Get More Levels!";
        await new Promise(resolve => setTimeout(resolve, 1500));
        button9.disabled = true;
        text.innerText = ""
    } else {

    }
}