//Declairing Variables##########################################################################
//Declairing player's stats
var playerCharacterName = "";
var playerMaxHealth = 0;
var playerCurrentHealth = 0;
var playerDefense = 0;
var playerNumberAttacks = 0;
var playerAttackBonus = 0;
var playerDamageDiceSide = 0;
var playerDamageNumberRoll = 0;
var playerDamageBonus = 0;
//Monster's Stats
var monsterName = "";
var monsterMaxHealth = 0;
var monsterCurrentHealth = 0;
var monsterDefense = 0;
var monsterAttackBonus = 0;
var monsterDamageDiceSide = 0;
var monsterDamageNumberRoll = 0;
var monsterDamageBonus = 0;
//gamecounters and tracking
var numberMonsterDefeated = 0;


//waits for webpage to full load
$( document ).ready(function() {

    //###################################################################
    //Checking to see which hero player picks
    
    $( "#dwarfHero" ).click(function() { //Dwarf Hero
        console.log("Selected Hero: Dwarf");
        //setting global stats to that of the dwarf
        playerCharacterName = "Fredrick"
        playerMaxHealth = 128;
        playerCurrentHealth = 128;
        playerDefense = 20;
        playerAttackBonus = 8;
        playerNumberAttacks = 2;
        playerDamageDiceSide = 12;
        playerDamageNumberRoll = 1;
        playerDamageBonus = 6;

        printPlayerStats();
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

    //Function for debugging. prints all player stats to the console.
    function printPlayerStats(){
        console.log("Character Chosen: "+playerCharacterName);
        console.log("Max Health: "+playerMaxHealth);
        console.log("Current Health: "+playerCurrentHealth);
        console.log("Defense: "+playerDefense);
        console.log("to hit Bonus: "+playerAttackBonus);
        console.log("Number of Attacks: "+ playerNumberAttacks);
        console.log("Damage Dice Sides: "+playerDamageDiceSide);
        console.log("Damage Roll Number: "+playerDamageNumberRoll);
        console.log("Damage Bonus: "+playerDamageBonus);
    }

});