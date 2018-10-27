//Declairing Variables##########################################################################
//Declairing player's stats
var player = {
    characterName: "not set",
    maxHealth: 0,
    currentHealth: 0,
    defense: 0,
    numberAttacks: 0,
    attackBonus: 0,
    damageDiceSide: 0,
    damageNumberRoll: 0,
    damageBonus: 0
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
    damageBonus: 0
};
    //gamecounters and tracking
var numberMonsterDefeated = 0;

//waits for webpage to full load
$( document ).ready(function() {

    //###################################################################
    //runs on load to set up the default texts on Character Select and Adventure Board

    characterSelectDefaulter();
    $( "#lastGameReport" ).text("");

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

        //sets gameboard piece
        $('#heroImg').attr("src", "assets/images/avatar-dwarf.jpg")

        startGame();
        
    });

    $( "#rangerHero" ).click(function() { //Ranger Hero
        console.log("Selected Hero: Ranger");

        //sets gameboard piece
        $('#heroImg').attr("src", "assets/images/avatar-ranger.jpg")
    });

    $( "#paladinHero" ).click(function() { //Paladin Hero
        console.log("Selected Hero: Paladin");

        //sets gameboard piece
        $('#heroImg').attr("src", "assets/images/avatar-paladin.jpg")
    });

    $( "#monkHero" ).click(function() { //Monk Hero
        console.log("Selected Hero: Monk");

        //sets gameboard piece
        $('#heroImg').attr("src", "assets/images/avatar-monk.jpg")
    });


    //####################################################################
    //Controls for inside the Dungeon

    $( "#attackButton").click(function() {
        console.log("attackbutton hit...")
        canCombat();
    });

    //randomly selects monster and populates the global variables for monster
    //currently only spits out dumb monster
    function monsterSelector() {

        //blueprint of all monsters in game
        var monstersList = [
            {name:"Goblin", maxHealth:76, currentHealth:76, defense: 15, numberAttacks: 1, attackBonus: 4, diceSides: 6, diceRolls: 1, damageBonus: 2, source: "assets/images/monster-goblin.jpg"},
            {name:"Orc", maxHealth: 134, currentHealth: 134, defense: 24, numberAttacks: 1, attackBonus: 6, diceSides: 6, diceRolls: 1, damageBonus: 5, source:" assets/images/monster-orc.jpg"}
        ];

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

        $('#combatLog').prepend("<p>"+player.characterName + "encounters an enemy " + monster.name + " in the dungeron! </p>");
        $('#monsterImg').attr("src", monstersList[key].source);
        $('#monsterImg').addClass("image-monster");

    };

    //run at the begninning of a game to toggle html interface items, get a monster to fight.
    function startGame(){
        printPlayerStats();
        gameBoardDefaulter();
        toggleCharacterSelect();
        toggleAdventureScreen();
        monsterSelector();
    };

    //checks to see if the game instance is ready for combat
    function canCombat(){
        if( player.characterName != "not set" && monster.name != "") {
            combat();
        }
    }
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
            monster.currentHealth -= damageDealt; //Monsters health looses total ammount of damage as players dealth from all attacks.
            console.log("Monster Hp after attack is: "+monster.currentHealth);

            //printing out player's damage to the combat log
            $('#combatLog').prepend("<p>"+player.characterName + " hits " + monster.name + " for a total of  " + damageDealt+" damage.  </p>");
            $('#combatLog').prepend("<p>" + monster.name +": "+monster.currentHealth+"hp/"+monster.maxHealth+"hp</p>");
        }
        else {

            //printing out player's miss to the combat log.
            console.log("you missed the monster!");
            $('#combatLog').prepend("<p>"+player.characterName + " misses the " + monster.name + ".  </p>");
            $('#combatLog').prepend("<p>" + monster.name +": "+monster.currentHealth+"hp/"+monster.maxHealth+"hp</p>");
        }
        
        checkCombatEndConditions(); // checking to see if monster died before monster would get a turn

        //checking to see if the monsters attacks are hitting.
        if (monsterAttackRoll > player.defense) {

            damageDealt = 0; //making sure damageDealt is zero.

            console.log("The monster hit you.");

            for (var i = 0; i<monster.numberAttacks; i++){ // looping through the number of times as player has attacks.

                currentAttack = rollDice(player.damageNumberRoll, player.damageDiceSide, player.damageBonus);
                damageDealt += currentAttack;
            }

            player.currentHealth -= damageDealt; //Monsters health looses total ammount of damage as players dealth from all attacks.
            console.log(player.characterName+"'s HP is: "+player.currentHealth);


            //Printing out damage player takes to combat log.
            $('#combatLog').prepend("<p>"+monster.name + " hits " + player.characterName + " for a total of  " + damageDealt+" damage.  </p>");
            $('#combatLog').prepend("<p>" + player.characterName +": "+player.currentHealth+"hp/"+player.maxHealth+"hp</p>");
            
        } else {

            //printing out the monster missing the player to combat log
            console.log("The monster missed you.");
            $('#combatLog').prepend("<p>"+monster.name + " misses " + player.characterName + ".  </p>");
            $('#combatLog').prepend("<p>" + player.characterName +": "+player.currentHealth+"hp/"+player.maxHealth+"hp</p>");
        }

        checkCombatEndConditions(); // checking to see if player died after monster attacked.

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
            numberMonsterDefeated++; //incriminting counter of total monsters killed this run.
            monsterSelector(); //get a new monster
        }
        else if (player.currentHealth <= 0) {
            console.log("You Died...");
            console.log("You killed "+numberMonsterDefeated+" before falling to the darkness.");
            $('#textDeath').text( "You have Died." );
            $('#textNumberSlain').text( player.characterName + " killed " +numberMonsterDefeated + " monsters before falling to the darkness..." );
            //toggle dungeon interface...
            resetPlayer();
            toggleCharacterSelect(); //bring back the character select screen, allows users to get new hero.
            toggleAdventureScreen(); // hides the previous adventure.
        }

    };

    //hides the character select interface - only after hero selected
    function toggleCharacterSelect(){
        $('.character-select').toggleClass("vanish");
    };

    //shows the adventure interface - called after characterSelect vanishes
    function toggleAdventureScreen(){
        $('.adventureScreen').toggleClass("vanish");
    }


    //Zeros out player's stats so that no left over data gives weird results for consecutive games.
    function resetPlayer(){
        player.characterName ="not set";
        player.maxHealth = 0;
        player.currentHealth = 0;
        player.defense = 0;
        player.numberAttacks = 0;
        player.attackBonus = 0;
        player.damageDiceSide = 0;
        player.damageNumberRoll = 0;
        player.damageBonus = 0;
        numberMonsterDefeated = 0;
    }

    //sets the initial values of the character select screen so that player see's intended text
    function characterSelectDefaulter(){
        $( "#gameTopTip" ).text("Select a Hero to brave the dungeon.");

    }

    //sets the initial values of the game board so that player see's intended text
    function gameBoardDefaulter() {
        $( "#gameBoardTitle" ).text( player.characterName + " enters the dungeon...");
        $( "#combatLog").text ("");
    }

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