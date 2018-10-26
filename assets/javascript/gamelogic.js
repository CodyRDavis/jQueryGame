//Declairing Variables##########################################################################
//Declairing player's stats
var player = {
    characterName: "",
    maxHealth: 0,
    currentHealth: 0,
    defense: 0,
    numberAttacks: 0,
    attackBonus: 0,
    damageDiceSide: 0,
    damageNumberRoll: 0,
    damageBonus: 0,
};
//Monster's Stats
var monster = {
    name: "",
    maxHealth: 0,
    currentHealth: 0,
    defense: 0,
    numberAttacks: 0,
    attackBonus: 0,
    damageDiceSide: 0,
    damageNumberRoll: 0,
    damageBonus: 0,
};
//gamecounters and tracking
var numberMonsterDefeated = 0;

//waits for webpage to full load
$( document ).ready(function() {

    //###################################################################
    //Checking to see which hero player picks
    
    $( "#dwarfHero" ).click(function() { //Dwarf Hero
        console.log("Selected Hero: Dwarf");
        //setting global stats to that of the dwarf
        player.characterName = "Fredrick"
        player.maxHealth = 128;
        player.currentHealth = 128;
        player.defense = 20;
        player.attackBonus = 8;
        player.numberAttacks = 2;
        player.damageDiceSide = 12;
        player.damageNumberRoll = 1;
        player.damageBonus = 6;

        startGame();
        

        //###########################################################################
        //please remove below. its only here for testing purposes.
        combat();
        
    });

    $( "#rangerHero" ).click(function() { //Ranger Hero
        console.log("Selected Hero: Ranger");
    });

    $( "#paladinHero" ).click(function() { //Paladin Hero
        console.log("Selected Hero: Paladin");
    });

    $( "#monkHero" ).click(function() { //Monk Hero
        console.log("Selected Hero: Monk");
    });

    //randomly selects monster and populates the global variables for monster
    //currently only spits out dumb monster
    function monsterSelector() {

        //blueprint of all monsters in game
        var monstersList = [
            {name:"Goblin", maxHealth:76, currentHealth:76, defense: 15, numberAttacks: 1, attackBonus: 4, diceSides: 6, diceRolls: 1, damageBonus: 2},
            {name:"Orc", maxHealth: 134, currentHealth: 134, defense: 24, numberAttacks: 1, attackBonus: 6, diceSides: 6, diceRolls: 1, damageBonus: 5}
        ];

        //creating a list of monsters so one can be selected randomly.

        //Randomly picks a monster from the array and sets global variables for current monster
        var key= Math.floor(Math.random()*monstersList.length);
        monster.name = monstersList[key].name;
        monster.maxHealth = monstersList[key].maxHealth;
        monster.currentHealth = monstersList[key].currentHealth;
        monster.defense = monstersList[key].defense;
        monster.numberAttacks = monstersList[key].numberAttacks;
        monster.attackBonus = monstersList[key].attackBonus;
        monster.damageDiceSide = monstersList[key].diceSides;
        monster.damageNumberRoll = monstersList[key].diceRolls;
        monster.damageBonus = monstersList[key].damageBonus;

        console.log(monster);
    };

    //run at the begninning of a game to toggle html interface items, get a monster to fight.
    function startGame(){
        printPlayerStats();
        toggleCharacterSelect();
        monsterSelector();
    };

    //handles a round of combat.
    function combat() {
        //determines which attacks hit
        var playerAttackRoll = rollDice(1, 20, player.attackBonus);
        var monsterAttackRoll = rollDice(1,20,monster.attackBonus);
        var damageDealt = 0;

        console.log("starting to see who got hit....");
        //checking to see if player hits monster or misses
        if (playerAttackRoll > monster.defense) {

            damageDealt = 0; //making sure damageDealt is zero.

            console.log("You hit the monster, player Damage rolls!");

            for (var i = 0; i<player.numberAttacks; i++){ // looping through the number of times as player has attacks.

                currentAttack = rollDice(player.damageNumberRoll, player.damageDiceSide, player.damageBonus);
                damageDealt += currentAttack;
            }
            console.log("Monster HP was: "+monster.currentHealth);
            monster.currentHealth -= damageDealt; //Monsters health looses total ammount of damage as players dealth from all attacks.
            console.log("Monster Hp after attack is: "+monster.currentHealth);
        }
        else {
            console.log("you missed the monster!");
        }
        

        //checking to see if the monsters attacks are hitting.
        if (monsterAttackRoll > player.defense) {

            damageDealt = 0; //making sure damageDealt is zero.

            console.log("The monster hit you.");

            for (var i = 0; i<monster.numberAttacks; i++){ // looping through the number of times as player has attacks.

                currentAttack = rollDice(player.damageNumberRoll, player.damageDiceSide, player.damageBonus);
                damageDealt += currentAttack;
            }

            console.log(player.characterName+"'s HP was: "+player.currentHealth);
            player.currentHealth -= damageDealt; //Monsters health looses total ammount of damage as players dealth from all attacks.
            console.log(player.characterName+"'s HP is: "+player.currentHealth);
        } else {

            console.log("The monster missed you.");
        }
        console.log("end of combat");



    };

    //handles the math behind a dice roll and returns the total roll
    function rollDice(rolls, sides, bonus) {
        var rollTotal = 0;
        for(var i = 0; i<rolls; i++){

            currentRoll = (Math.floor(Math.random()*sides)+1);
            console.log("Rolled: "+currentRoll);
            rollTotal+=currentRoll;
        }
        rollTotal += bonus;
        console.log(rollTotal);
        return rollTotal;
    };

    function checkCombatEndConditions(){
    
        if(monster.currentHealth<=0) {
            console.log("Monster Defeated!!!! *final fantasy victory music");
            monsterSelector();
        }
        else if (player.currentHealth) {
            console.log("You Died...");
            //toggle dungeon interface...
            toggleCharacterSelect();
        }

    };

    //hides the character select interface - only after hero selected
    function toggleCharacterSelect(){
        $('.character-select').toggleClass("vanish");
    };

    //shows the adventure interface - called after characterSelect vanishes

    //TODO!!!!

    //Function for debugging. prints all player stats to the console.
    function printPlayerStats(){
        console.log("Character Chosen: "+player.characterName);
        console.log("Max Health: "+player.maxHealth);
        console.log("Current Health: "+player.currentHealth);
        console.log("Defense: "+player.defense);
        console.log("to hit Bonus: "+player.attackBonus);
        console.log("Number of Attacks: "+ player.numberAttacks);
        console.log("Damage Dice Sides: "+player.damageDiceSide);
        console.log("Damage Roll Number: "+player.damageNumberRoll);
        console.log("Damage Bonus: "+player.damageBonus);
    };

});