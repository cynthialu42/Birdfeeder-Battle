$(document).ready(function(){
    
    // Hero objects
    var cardinal = {
        "name": "cardinal",
        "health": 200,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    var bluejay = {
        "name": "blue jay",
        "health": 300,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    var woodpecker = {
        "name": "wood pecker",
        "health": 350,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    // Villain Objects
    var squirrel = {
        "name" : "squirrel",
        "health" : 50,
        "multiplier" : 20,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    var cat = {
        "name" : "cat",
        "health" : 50,
        "multiplier" : 20,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    var owl = {
        "name" : "owl",
        "health" : 45,
        "multiplier" : 20,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    function isCharacterDead(character){
        if (character.health <= 0){
            return true;
        }
        return false;
    }
    
    function displayHeroName(name, health){
        if (name === "cardinal")
            $('#cardinalStats').html(health);
        else if (name === "blue jay")
            $('#bluejayStats').html(health);
        else
            $('#woodpeckerStats').html(health);
    }

    function displayVillainName(name, health){
        if (name === "squirrel")
            $('#squirrelStats').html(health);
        else if (name === "cat")
            $('#catStats').html(health);
        else
            $('#owlStats').html(health);
    }

    function checkHealth(hero, villain){
        if (isCharacterDead(hero) && isCharacterDead(villain)){
            $('.heroHit').empty();
            $('.villainHit').empty();
            $('.result').text(`Tie!`);
            heroObj = {};
            villainObj = {};
        }
        else if (isCharacterDead(hero) === true){
            heroObj = {};
            flag = false;
            $('.heroHit').empty();
            $('.villainHit').empty();
            $('.result').text(`${hero.name} has fallen!`);
        }
        else if (isCharacterDead(villain) === true){
            villainObj = {};
            if (villain.name === "squirrel"){
                $('#dead').append(squirrelDiv);
                $('.result').text(`${villain.name} has been defeated! Choose another opponent`);
                squirrelDiv.css({"border-color":"grey", "background": "grey"});
                squirrelFlag = false;
            }
            else if (villain.name === "cat"){
                $('#dead').append(catDiv);
                $('.result').text(`${villain.name} has been defeated! Choose another opponent`);
                catDiv.css({"border-color":"grey", "background": "grey"});
                catFlag = false;
            }
            else{
                $('#dead').append(owlDiv);
                $('.result').text(`${villain.name} has been defeated! Choose another opponent`);
                owlDiv.css({"border-color":"grey", "background": "grey"});
                owlFlag = false;
            }
            villainPlayer = true;
        }
        else
            return;
    }

    function didHeroWin(hero){
        console.log("here");
        if (!squirrelFlag && !catFlag && !owlFlag){
            $('.heroHit').empty();
            $('.villainHit').empty();
            $('.result').text(`You have won the battle!`);
            if (hero.name === "cardinal"){
                $(".cardinal-fight-image").removeClass("show");
                $(".cardinal-win-image").addClass("show");
            }
            else if (hero.name === "blue jay"){
                $(".blue-fight-image").removeClass("show");
                $(".blue-win-image").addClass("show");
            }
            else{
                $(".wood-fight-image").removeClass("show");
                $(".wood-win-image").addClass("show");
            }
            
            return true;
        }
        else
            return false;
    }
    let heroHealth = '';
    let villainHealth = '';
    let heroPower = 0;
    function attack(hero, villain){
        let tempHeroPower = hero.power();
        heroPower += tempHeroPower;
        let heroName = hero.name;
        
        let villainPower = villain.power();
        let villainName = villain.name;
    
        hero.health -= villainPower;
        villain.health -= heroPower;

        $('.heroHit').text(`${heroName} attacks at ${heroPower}hp!`);
        $('.villainHit').text(`${villainName} attacks at ${villainPower}hp!`);
        heroHealth = hero.health;
        villainHealth = villain.health;

        displayHeroName(heroName, heroHealth);
        displayVillainName(villainName, villainHealth);
    
        // Check health
        checkHealth(hero, villain);
        didHeroWin(hero);
        //console.log(`full hero power: ${heroPower}`);
        //console.log(hero.health);

    }
    
    $('#attackBtn').on('click', function(){
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
    let heroAttackDiv = $('.heroAttack');
    let villainAttackDiv = $('.villainAttack');

    //Functions 
    function heroAttacker(attacker){
        heroAttackDiv.append(attacker);
        //$('#heroName').append($('#cardinalName'));
        //$('#heroStats').append($('#cardinalStats'));
        //$(".heroAttack").addClass("test");
        attacker.css("border-color","green");
    }

    function villainAttacker(attacker){
        villainAttackDiv.append(attacker);
        attacker.css("border-color","green");
    }

    //Events
    let heroPlayer = true;
    let flag = true;
    $('#cardinal').on('click', function(){
        if (heroPlayer && flag){
            heroAttacker(cardinalDiv);
            heroPlayer = false;
            heroObj = cardinal;
            $(".cardinal-image").addClass("hide");
            $(".cardinal-fight-image").addClass("show");
        }   
    });
    $('#bluejay').on('click', function(){
        if (heroPlayer && flag){
            heroAttacker(bluejayDiv);
            heroPlayer = false;
            heroObj = bluejay;
            $(".blue-image").addClass("hide");
            $(".blue-fight-image").addClass("show");
        }   
    });
    $('#woodpecker').on('click', function(){
        if (heroPlayer && flag){
            heroAttacker(woodpeckerDiv);
            heroPlayer = false;
            heroObj = woodpecker;
            $(".wood-image").addClass("hide");
            $(".wood-fight-image").addClass("show");
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
            $('.result').empty();
            $('.heroHit').empty();
            $('.villainHit').empty();
        }   
    });
    $('#cat').on('click', function(){
        if (villainPlayer && catFlag){
            villainAttacker(catDiv);
            villainPlayer = false;
            villainObj = cat;
            $('.result').empty();
            $('.heroHit').empty();
            $('.villainHit').empty();
        }   
    });
    $('#owl').on('click', function(){
        if (villainPlayer && owlFlag){
            villainAttacker(owlDiv);
            villainPlayer = false;
            villainObj = owl;
            $('.result').empty();
            $('.heroHit').empty();
            $('.villainHit').empty();
        }    
    });


});