//Declairing Variables##########################################################################
//Declairing player's stats
var player = {
    CharacterName: "",
    playerMaxHealth: 0,
    playerCurrentHealth: 0,
    playerDefense: 0,
    playerNumberAttacks: 0,
    playerAttackBonus: 0,
    playerDamageDiceSide: 0,
    playerDamageNumberRoll: 0,
    playerDamageBonus: 0,
}
//Monster's Stats
var monster = {
    Name: "",
    monsterMaxHealth: 0,
    monsterCurrentHealth: 0,
    monsterDefense: 0,
    monsterAttackBonus: 0,
    monsterDamageDiceSide: 0,
    monsterDamageNumberRoll: 0,
    monsterDamageBonus: 0,
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
        player.CharacterName = "Fredrick"
        player.MaxHealth = 128;
        player.CurrentHealth = 128;
        player.Defense = 20;
        player.AttackBonus = 8;
        player.NumberAttacks = 2;
        player.DamageDiceSide = 12;
        player.DamageNumberRoll = 1;
        player.DamageBonus = 6;

        startGame();
        
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
        var goblin = {name:"test", maxHealth:500, currentHealth:500, defense: 35, attackBonus: 6, diceSides: 6, diceRolls: 3, damageBonus: 6};

        //creating a list of monsters so one can be selected randomly.
        var monstersList = [];
        monstersList[0] = goblin;

        //Randomly picks a monster from the array and sets global variables
        var key= Math.floor(Math.random()*monstersList.length);
        monster.Name = monstersList[key].name;
        monster.MaxHealth = monstersList[key].maxHealth;
        monster.CurrentHealth = monstersList[key].currentHealth;
        monster.Defense = monstersList[key].defense;
        monster.AttackBonus = monstersList[key].attackBonus;
        monster.DamageDiceSide = monstersList[key].diceSides;
        monster.DamageNumberRoll = monstersList[key].diceRolls;
        monster.DamageBonus = monstersList[key].damageBonus;

        console.log(monster);
    };

    //run at the begninning of a game to toggle html interface items, get a monster to fight.
    function startGame(){
        printPlayerStats();
        toggleCharacterSelect();
        monsterSelector();
    };
    //hides the character select interface - only after hero selected
    function toggleCharacterSelect(){
        $('.character-select').toggleClass("vanish");
    };

    //shows the adventure interface - called after characterSelect vanishes


    //Function for debugging. prints all player stats to the console.
    function printPlayerStats(){
        console.log("Character Chosen: "+player.CharacterName);
        console.log("Max Health: "+player.MaxHealth);
        console.log("Current Health: "+player.CurrentHealth);
        console.log("Defense: "+player.Defense);
        console.log("to hit Bonus: "+player.AttackBonus);
        console.log("Number of Attacks: "+ player.NumberAttacks);
        console.log("Damage Dice Sides: "+player.DamageDiceSide);
        console.log("Damage Roll Number: "+player.DamageNumberRoll);
        console.log("Damage Bonus: "+player.DamageBonus);
    };

});