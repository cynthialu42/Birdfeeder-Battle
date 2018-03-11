$(document).ready(function(){
    
    // Variables
    let heroHealth = '';
    let villainHealth = '';
    let heroPower = 0;

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

    let heroPlayer = true;
    let flag = true;

    let villainPlayer = true;
    let squirrelFlag = true;
    let catFlag = true;
    let owlFlag = true;
    
    // Hero objects
    var cardinal = {
        "name": "cardinal",
        "health": 2,
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

    function isCharacterDead(character){
        if (character.health <= 0){
            return true;
        }
        return false;
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
            $('.replay-btn').removeClass("hide");
            if (hero.name === "cardinal"){
                $(".cardinal-fight-image").removeClass("show");
                $(".cardinal-sad-image").addClass("show");
            }
            else if (hero.name === "blue jay"){
                $(".blue-fight-image").removeClass("show");
                $(".blue-sad-image").addClass("show");
            }
            else{
                $(".wood-fight-image").removeClass("show");
                $(".wood-sad-image").addClass("show");
            }

            if (villain.name === "squirrel"){
                $(".squirrel-fight-image").removeClass("show");
                $(".squirrel-win-image").addClass("show");
            }
            else if (villain.name === "cat"){
                $(".cat-fight-image").removeClass("show");
                $(".cat-win-image").addClass("show");
            }
            else{
                $(".owl-fight-image").removeClass("show");
                $(".owl-win-image").addClass("show");
            }
        }
        else if (isCharacterDead(villain) === true){
            villainObj = {};
            if (villain.name === "squirrel"){
                $('#dead-squirrel').append(squirrelDiv);
                $(".squirrel-fight-image").removeClass("show");
                $(".squirrel-sad-image").addClass("show");
                $(".dead-squirrel-class").addClass("show");
                $(".squirrel-fighting").removeClass("right-fighter");
                $('.result').text(`${villain.name} has been defeated! Choose another opponent`);
                //squirrelDiv.css({"border-color":"grey", "background": "grey", "opacity": ".65"});
                squirrelFlag = false;
            }
            else if (villain.name === "cat"){
                $('#dead-cat').append(catDiv);
                $(".cat-fight-image").removeClass("show");
                $(".cat-sad-image").addClass("show");
                $(".dead-cat-class").addClass("show");
                $(".cat-fighting").removeClass("right-fighter");
                $('.result').text(`${villain.name} has been defeated! Choose another opponent`);
                //catDiv.css({"border-color":"grey", "background": "grey", "opacity": ".65"});
                catFlag = false;
            }
            else{
                $('#dead-owl').append(owlDiv);
                $(".owl-fight-image").removeClass("show");
                $(".owl-sad-image").addClass("show");
                $(".dead-owl-class").addClass("show");
                $(".owl-fighting").removeClass("right-fighter");
                $('.result').text(`${villain.name} has been defeated! Choose another opponent`);
                //owlDiv.css({"border-color":"grey", "background": "grey", "opacity": ".65"});
                owlFlag = false;
            }
            villainPlayer = true;
        }
        else
            return;
    }

    function didHeroWin(hero){
        if (!squirrelFlag && !catFlag && !owlFlag){
            $('.heroHit').empty();
            $('.villainHit').empty();
            $('.result').text(`You have won the battle!`);
            $('.replay-btn').removeClass("hide");
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

    }

    function showAttackButton(hero, villain){
        if ((jQuery.isEmptyObject(heroObj) === false) && (jQuery.isEmptyObject(villainObj) === false)){
            $('.button-div').removeClass("hide");
        }
        return;
    }

    function heroAttacker(attacker){
        heroAttackDiv.append(attacker);
        attacker.css("border-color","green");
        showAttackButton(heroObj, villainObj);
    }

    function villainAttacker(attacker){
        villainAttackDiv.append(attacker);
        //attacker.css({"border-color":"green","padding":".5em .5em"});
        showAttackButton(heroObj, villainObj);
    }

    //Events
    $('#cardinal').on('click', function(){
        if (heroPlayer && flag){
            heroObj = cardinal;
            heroAttacker(cardinalDiv);
            heroPlayer = false;

            $(".cardinal-image").addClass("hide");
            $(".cardinal-fight-image").addClass("show");
            $(".cardinal-fighting").addClass("left-fighter");
        }   
    });

    $('#bluejay').on('click', function(){
        if (heroPlayer && flag){
            heroObj = bluejay;
            heroAttacker(bluejayDiv);
            heroPlayer = false;
            
            $(".blue-image").addClass("hide");
            $(".blue-fight-image").addClass("show");
            $(".bluejay-fighting").addClass("left-fighter");
        }   
    });

    $('#woodpecker').on('click', function(){
        if (heroPlayer && flag){
            heroObj = woodpecker;
            heroAttacker(woodpeckerDiv);
            heroPlayer = false;
            
            $(".wood-image").addClass("hide");
            $(".wood-fight-image").addClass("show");
            $(".woodpecker-fighting").addClass("left-fighter");

        }    
    });

    // Villain Character Selection
    $('#squirrel').on('click', function(){
        if (villainPlayer && squirrelFlag){
            villainObj = squirrel;
            villainAttacker(squirrelDiv);
            villainPlayer = false;

            $(".squirrel-image").addClass("hide");
            $(".squirrel-fight-image").addClass("show");
            $(".squirrel-fighting").addClass("right-fighter");
            
            $('.result').empty();
            $('.heroHit').empty();
            $('.villainHit').empty();
        }   
    });

    $('#cat').on('click', function(){
        if (villainPlayer && catFlag){
            villainObj = cat;
            villainAttacker(catDiv);
            villainPlayer = false;

            $(".cat-image").addClass("hide");
            $(".cat-fight-image").addClass("show");
            $(".cat-fighting").addClass("right-fighter");
            
            $('.result').empty();
            $('.heroHit').empty();
            $('.villainHit').empty();
        }   
    });

    $('#owl').on('click', function(){
        if (villainPlayer && owlFlag){
            villainObj = owl;
            villainAttacker(owlDiv);
            villainPlayer = false;

            $(".owl-image").addClass("hide");
            $(".owl-fight-image").addClass("show");
            $(".owl-fighting").addClass("right-fighter");
            
            $('.result').empty();
            $('.heroHit').empty();
            $('.villainHit').empty();
        }    
    });

    $('#attackBtn').on('click', function(){
        attack(heroObj, villainObj);
    });

    $('#replayBtn').on('click',function(){
        location.reload();
    });


    
});