$(document).ready(function(){
    
    // Hero objects
    var cardinal = {
        "name": "cardinal",
        "health": 200,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    var bluejay = {
        "name": "blue jay",
        "health": 300,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    var woodpecker = {
        "name": "wood pecker",
        "health": 350,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    // Villain Objects
    var squirrel = {
        "name" : "squirrel",
        "health" : 50,
        "multiplier" : 5,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    var cat = {
        "name" : "cat",
        "health" : 50,
        "multiplier" : 5,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    var owl = {
        "name" : "owl",
        "health" : 45,
        "multiplier" : 50,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    function isCharacterDead(character){
        if (character.health <= 0){
            return true;
        }
        return false;
    }

    function attack(hero, villain){
        let heroPower = hero.power();
        let villainPower = villain.power();

        hero.health -= villainPower;
        villain.health -= heroPower;

        if (hero.name === "cardinal")
            $('#cardinalStats').html(hero.health);
        else if (hero.name === "blue jay")
            $('#bluejayStats').html(hero.health);
        else
            $('#woodpeckerStats').html(hero.health);

        if (villain.name === "squirrel")
            $('#squirrelStats').html(villain.health);
        else if (villain.name === "cat")
            $('#catStats').html(villain.health);
        else
            $('#owlStats').html(villain.health);

    
        // Check health
        if (isCharacterDead(hero) === true){
            alert(`oh noes goodbye ${hero.name}`);
        }
        if (isCharacterDead(villain) === true){
            alert(`oh noes goodbye ${villain.name}`);
            villainObj = {};
            if (villain.name === "squirrel"){
                $('#dead').append(squirrelDiv);
                squirrelFlag = false;
            }
            else if (villain.name === "cat"){
                $('#dead').append(catDiv);
                catFlag = false;
            }
            else{
                $('#dead').append(owlDiv);
                owlFlag = false;
            }
            villainPlayer = true;
        }

        console.log(heroPower);
        console.log(hero.health);

    }
    
    $('#attackBtn').on('click', function(){
        // minus things
        // minus more things!
        attack(heroObj, villainObj);
    });
    

    //Variables
    let heroObj = {};
    let villainObj = {};
    let cardinalDiv = $('#cardinal');
    let bluejayDiv = $('#bluejay');
    let woodpeckerDiv = $('#woodpecker');

    let squirrelDiv = $('#squirrel');
    let catDiv = $('#cat');
    let owlDiv = $('#owl');


    let charAttackDiv = $('#attackCharacters');
    let heroAttackDiv = $('#heroAttack');
    let villainAttackDiv = $('#villainAttack');

    //Functions 
    function heroAttacker(attacker){
        heroAttackDiv.append(attacker);
        //$('#heroName').append($('#cardinalName'));
        //$('#heroStats').append($('#cardinalStats'));
    }

    function villainAttacker(attacker){
        villainAttackDiv.append(attacker);
    }

    //Events
    let heroPlayer = true;
    $('#cardinal').on('click', function(){
        if (heroPlayer){
            heroAttacker(cardinalDiv);
            heroPlayer = false;
            heroObj = cardinal;
        }   
    });
    $('#bluejay').on('click', function(){
        if (heroPlayer){
            heroAttacker(bluejayDiv);
            heroPlayer = false;
            heroObj = bluejay;
        }   
    });
    $('#woodpecker').on('click', function(){
        if (heroPlayer){
            heroAttacker(woodpeckerDiv);
            heroPlayer = false;
            heroObj = woodpecker;
        }    
    });

    // Villain Character Selection
    let villainPlayer = true;
    let squirrelFlag = true;
    let catFlag = true;
    let owlFlag = true;
    $('#squirrel').on('click', function(){
        if (villainPlayer && squirrelFlag){
            villainAttacker(squirrelDiv);
            villainPlayer = false;
            villainObj = squirrel;
        }   
    });
    $('#cat').on('click', function(){
        if (villainPlayer && catFlag){
            villainAttacker(catDiv);
            villainPlayer = false;
            villainObj = cat;
        }   
    });
    $('#owl').on('click', function(){
        if (villainPlayer && owlFlag){
            villainAttacker(owlDiv);
            villainPlayer = false;
            villainObj = owl;
        }    
    });


});