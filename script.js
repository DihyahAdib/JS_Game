// Inspired by FreeCodeCamp, Developed by Dihyah Adib.
let instructions = "Use the buttons to navigate, buy weapons and potions to up your game and defeat the dragon!";

let score = 0;
let level = 100;
let xp = 0;
let health = 1100;
let gold = 1050; 
let currentWeaponIndex = 0;
let currentMonsterIndex = 0;
let currentMonsterDeath = 0;

const xpMultiplier = 1.5;
const monsterMultipier = 2.5;

const inventory = ["None"];

const weapons = [
    {name: "None", strength: 0},         
    {name: "Sword", strength: 25},       
    {name: "Scythe", strength: 50},      
    {name: "GreatHammer", strength: 75}, 
    {name: "Excalibur", strength: 200}  
];

const monsters = [
    {name: "Ghoul", health: 50, strength: 25, worth: 10 },
    {name: "Beast", health: 100, strength: 50, worth: 15 },
    {name: "WereWolf", health: 200, strength: 100, worth: 20 },
    {name: "Dragon", health: 500, strength: 200, worth: 25 }
];

const elements = {
    //Text & UI elements.
    levelText: document.querySelector("#levelText"),
    text: document.querySelector("#text"),
    xpText: document.querySelector("#xpText"),
    healthText: document.querySelector("#healthText"),
    goldText: document.querySelector("#goldText"),
    shopUI: document.querySelector(".shopUI"),
    lore: document.querySelector("#lore"),
    mainGame: document.querySelector("#mainGame"),
    //tooltip
    tooltip: document.querySelector(".tooltip"),

    //Monster Controls.
    monsterStats: document.querySelector("#monsterStats"),
    monsterName: document.querySelector("#monsterName"),
    monsterHealth: document.querySelector("#monsterHealth"),
    controlsForMonsters: document.querySelector(".controlsForMonsters"),
    buttonAttack: document.querySelector("#buttonAttack"),
    
    //Screens and Scenes.
    preloaderScreen: document.querySelector(".preloaderScreen"),
    loserScreen: document.querySelector(".loserScreen"),
    loserExplain: document.getElementById("loserExplain"),
    beatBossScreen: document.querySelector(".beatBossScreen"),
    bossExplain: document.querySelector("#bossExplain"),
    winnerScreen: document.querySelector(".winnerScreen"),
    winnerExplain: document.querySelector("#winnerExplain")
};

const buttons = {
    buyHealth: [
        document.querySelector("#button10HP"),      
        document.querySelector("#button50HP"),      
        document.querySelector("#button100HP")       
    ],
    navigation: [
        document.querySelector(".buttonBack"),     
        document.querySelector(".buttonStore"),     
        document.querySelector(".buttonCave"),
    ],
    weaponPurchase: [
        document.querySelector("#buttonSword"),
        document.querySelector("#buttonScythe"),
        document.querySelector("#buttonGreatHammer"),
        document.querySelector("#buttonExcalibur")
    ],
    monsterSelection: [
        document.querySelector("#buttonGhoul"),
        document.querySelector("#buttonBeast"),
        document.querySelector("#buttonWereWolf"),
        document.querySelector("#buttonDragon"),
    ],
    loreSelection: [
        document.querySelector("#buttonSwordText"),
        document.querySelector("#buttonScytheText"),
        document.querySelector("#buttonGreatHammerText"),
        document.querySelector("#buttonExcaliburText")
    ],
    screenEndings: [
        document.querySelector("#continueButton"),
    ]
};

//amount, and required level.
buttons.buyHealth[0].onclick = () => buyHealth(10, 0); 
buttons.buyHealth[1].onclick = () => buyHealth(50, 10);
buttons.buyHealth[2].onclick = () => buyHealth(100, 15);

buttons.navigation[0].onclick = () => justBack();
buttons.navigation[1].onclick = () => goStore();
buttons.navigation[2].onclick = () => goCave();

//currentWeaponIndex, cost, required Level.
buttons.weaponPurchase[0].onclick = () => buyWeapon(1, 30);
buttons.weaponPurchase[1].onclick = () => buyWeapon(2, 50, 5);
buttons.weaponPurchase[2].onclick = () => buyWeapon(3, 150, 10);
buttons.weaponPurchase[3].onclick = () => buyWeapon(4, 250, 15);

//currentMonsterIndex.
buttons.monsterSelection[0].onclick = () => fightMonster(0);
buttons.monsterSelection[1].onclick = () => fightMonster(1);
buttons.monsterSelection[2].onclick = () => fightMonster(2);
buttons.monsterSelection[3].onclick = () => fightMonster(3);

elements.buttonAttack.onclick = playerGuess;

buttons.buyHealth.forEach(button => {
    button.addEventListener("mouseover", () => {
        button.querySelector("abbr").classList.add("show");
    });
    button.addEventListener("mouseout", () => {
        button.querySelector("abbr").classList.remove("show");
    });
})

buttons.weaponPurchase.forEach(button => {
    button.addEventListener("mouseover", () => {
        button.querySelector("abbr").classList.add("show");
    });
    button.addEventListener("mouseout", () => {
        button.querySelector("abbr").classList.remove("show");
    });
})

buttons.loreSelection.forEach(button => {
    button.addEventListener("mouseover", () => {
        button.querySelector("abbr").classList.add("show");
    });
    button.addEventListener("mouseout", () => {
        button.querySelector("abbr").classList.remove("show");
    });
})

async function delayUpdate(element, message, delay) {   
    await new Promise(resolve => setTimeout(resolve, delay));
    element.innerText = message;
}

async function displayLoadingText(text) {
    for (let i = 0; i < 5; i++) {
        await delayUpdate(elements.text, text + ".".repeat(i), 100);
    }
    await delayUpdate(elements.text, "", 100);
}

function updateStats() {
    elements.levelText.innerText = level;
    elements.xpText.innerText = xp;
    elements.healthText.innerText = health;
    elements.goldText.innerText = gold;
}

async function updateWeapon(newWeaponIndex) {
    currentWeaponIndex = newWeaponIndex;
    const currentWeapon = weapons[currentWeaponIndex];
    const { name, strength } = currentWeapon;
    weaponName = name;
    weaponStrength = strength;
    await delayUpdate(text,`Equipped: ${name} with a strength of: ${strength}`, 500);
    await new Promise(resolve => setTimeout(resolve, 1500));
    text.innerText = "";
}

async function updateMonster(newMonsterIndex) {
    currentMonsterIndex = newMonsterIndex;
    const currentMonster = monsters[currentMonsterIndex];
    console.log("Fighting Monster:", currentMonster);
    const { name, health, strength, worth } = currentMonster;
    elements.monsterHealth = health;
    monsterStrength = strength;
    monsterWorth = worth;
    
    monsterName.innerText = name;
    elements.monsterHealth.innerText = health;
    await new Promise(resolve => setTimeout(resolve, 1500));
    text.innerText = "";
}

function checkLevelUp() {
    if (xp >= 100) {
        xp -= 100;
        level+= 1;
        updateStats();
    }
}

async function buyHealth(amount, requiredLevel) {
    if (gold >= amount && level >= requiredLevel) {
        gold -= amount;
        health += amount;
        updateStats();
        elements.text.innerText = `Health purchased, ${gold} gold left`;
    } else {
        elements.text.innerText = "Not enough gold or levels!";
    }
    await delayUpdate(elements.text, "", 1500);
}

async function buyWeapon(index, cost, requiredLevel = 0) {
    if (gold >= cost && level >= requiredLevel) {
        if (!inventory.includes(weapons[index].name)) {
            inventory.push(weapons[index].name);
            currentWeaponIndex = index;
            gold -= cost;
            updateStats();
            elements.text.innerText = `Equipped: ${weapons[index].name}`;
            buttons.loreSelection[index - 1].style.display = "flex";
        } else {
            elements.text.innerText = `You already own the ${weapons[index].name}!`;
        }
    } else {
        elements.text.innerText = "Not enough gold or levels!";
    }
    await delayUpdate(elements.text, "", 1000);
}

async function justBack() {
    displayLoadingText("Going Back To Main")
    await delayUpdate(elements.text, "", 500);
    elements.controlsForMonsters.style.visibility = "hidden";
    elements.monsterStats.style.display = "none";
    elements.shopUI.classList.remove("shopUI-visible")
    buttons.navigation.forEach(button => {
        button.disabled = false;
    });
}

async function goStore() {
    displayLoadingText("Going To Store")
    toggleStoreVisibility();
    await delayUpdate(elements.text, "", 500);
    elements.controlsForMonsters.style.visibility = "hidden";
    elements.monsterStats.style.display = "none";
}

async function goCave() {
    displayLoadingText("Going To Cave")
    await delayUpdate(elements.text, "", 500);
    elements.controlsForMonsters.style.visibility = "visible";
    buttons.monsterSelection.forEach(button => {
        button.style.display = "flex";
    });
}

async function toggleStoreVisibility() {
    if (elements.shopUI.classList.contains("shopUI-visible")) {
        elements.mainGame.style.transform = "translateX(25%)";
        await delayUpdate(elements.text, "", 300);
        elements.shopUI.classList.remove("shopUI-visible");
    } else {
        elements.mainGame.style.transform = "translateX(0)";
        await delayUpdate(elements.text, "", 250);
        elements.shopUI.classList.add("shopUI-visible");
    }
}

async function fightMonster(index) {
    currentMonsterIndex = index;
    const monster = monsters[index];

    const requirements = {
        0: { requiredWeaponIndex: 1, requiredLevel: 0 },
        1: { requiredWeaponIndex: 2, requiredLevel: 5 },  
        2: { requiredWeaponIndex: 3, requiredLevel: 10 }, 
        3: { requiredWeaponIndex: 4, requiredLevel: 15 } 
    }

    const { requiredWeaponIndex, requiredLevel } = requirements[index];

    if (currentWeaponIndex < requiredWeaponIndex) {
        elements.text.innerText = `Your weapon is too weak to fight the ${monster.name}! You need ${weapons[requiredWeaponIndex].name}.`;
        await delayUpdate(elements.text, "", 2500);
        return;
    }
    
    if (level < requiredLevel) {
        elements.text.innerText = `You need to be at least level ${requiredLevel} to fight the ${monster.name}.`;
        await delayUpdate(elements.text, "", 2500);
        return;
    }

    buttons.monsterSelection.forEach((button, i) => {
        if (i !== index) {
            button.disabled = true;
            buttons.navigation.forEach(button => {
                button.disabled = true;
            });
        }
    });

    elements.mainGame.style.transform = "translateX(25%)";
    await delayUpdate(elements.text, "", 300);
    elements.shopUI.classList.remove("shopUI-visible");
    
    elements.buttonAttack.style.display = "block"; 
    elements.text.innerText = `You approach the ${monster.name}...`;
    await delayUpdate(elements.text," ", 800);

    elements.monsterStats.style.display = "flex";
    elements.monsterName.innerText = monster.name;
    elements.monsterHealth.innerText = monster.health;
    
}

async function playerGuess() {
    const randomizedRollNumOutCome = Math.floor(Math.random() * 3) + 1;
    const playerRollNum = parseInt(prompt("Guess the correct number to Attack, 1 - 3: "));

    if (isNaN(playerRollNum) || playerRollNum < 1 || playerRollNum > 3) {
        await delayUpdate(text, "Please enter a valid number between 1 and 3.", 1500);
        return;
    } 

    currentMonsterStats();
    if (playerRollNum === randomizedRollNumOutCome) {
        playerHitMonster();
        elements.text.innerText = "You hit the monster!";
        await delayUpdate(elements.text, "", 1500);
        

    } if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome + 1) {
        xp += 10;
        updateStats();
        text.innerText = "You over swung and missed the monster! try again...";
        await delayUpdate(elements.text, "", 1500);

    } if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome - 1) {
        xp += 10;
        updateStats();
        text.innerText = "You narrowly dodged the monster! try again...";
        await delayUpdate(elements.text, "", 1500);

    } if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome + 2 ||  playerRollNum === randomizedRollNumOutCome - 2) {
        monsterHitPlayer();
        text.innerText = "You completely missed the monster and it has attacked you!";
        await delayUpdate(elements.text, "", 1500);
    }
    console.log("player number: ",playerRollNum)
    console.log("random number: ",randomizedRollNumOutCome)
    currentMonsterStats();
}

function playerHitMonster() {
    const currentMonster = monsters[currentMonsterIndex];
    const currentWeapon = weapons[currentWeaponIndex];
    const monsterWorth = currentMonster.worth;
    let reward = 2 * monsterWorth;
    xp += 90;
    gold += reward;

    checkLevelUp();
    updateStats();
    currentMonster.health -= currentWeapon.strength;
    elements.monsterHealth.innerText = currentMonster.health;

    if (currentMonster.health <= 0) {
        elements.beatBossScreen.classList.add("visible");
        elements.bossExplain.innerText = `You defeated the ${currentMonster.name}!`;
        elements.buttonAttack.style.display = "none";
        elements.monsterStats.style.display = "none";

        currentMonsterDeath++; //once this is more than 5 and the monsters name is Dragon show winner screen to insure that ppl dont cheat it has to be more than 5.
        console.log(`current total of monster deaths ${currentMonsterDeath}`);
        setTimeout(() => {
            elements.beatBossScreen.classList.remove("visible");
            elements.buttonAttack.style.display = "block";
            resetMonsterHealth(currentMonsterIndex);
            buttons.monsterSelection.forEach(button => {
                button.disabled = false;
            });
            buttons.navigation.forEach(button => {
                button.disabled = false;
            })
            elements.controlsForMonsters.style.visibility = "visible";

            elements.shopUI.classList.remove("shopUI-visible");
        }, 4000);
    }
    if (currentMonster.name === "Dragon" && currentMonster.health <= 0 && currentMonsterDeath > 0) {
        elements.winnerScreen.classList.add("visible");
        elements.winnerExplain.innerText = `You defeated the ${currentMonster.name}! \n Press reset to play again`;
    }
}

async function monsterHitPlayer() {
    const currentMonster = monsters[currentMonsterIndex];
    const monsterStrength = currentMonster.strength;

    health -= monsterStrength;
    updateStats();

    if (health <= 0) {
        health = 0;
        updateStats();
        elements.loserScreen.classList.add("visible");
        elements.loserExplain.innerText = `${currentMonster.name} has bested you...`
        elements.buttonAttack.style.display = "none";
        elements.monsterStats.style.display = "none";

        buttons.navigation.forEach(button => {
            button.disabled = false;
        });
    }
}

function resetMonsterHealth(monsterIndex) {
    const initialHealth = {
        0: 50,  // Ghoul
        1: 100, // Beast
        2: 200, // WereWolf
        3: 500  // Dragon
    };

    monsters[monsterIndex].health = initialHealth[monsterIndex];

    elements.monsterName.innerText = monsters[monsterIndex].name;
    elements.monsterHealth.innerText = monsters[monsterIndex].health;
    console.log("Reset monster health for:", monsters[monsterIndex].name, "to", monsters[monsterIndex].health);
}

function currentMonsterStats() {
    const currentMonster = monsters[currentMonsterIndex];

    if (currentMonster) {
        elements.monsterName.innerText = currentMonster.name;
        elements.monsterHealth.innerText = currentMonster.health;
    } else {
        monsterName.innerText = "No monster selected";
        elements.monsterHealth.innerText = "";
    }
}

document.getElementById('restartButton')?.addEventListener('click', function() {
    location.reload(); // Reloads the current page
});



checkLevelUp();

updateStats();