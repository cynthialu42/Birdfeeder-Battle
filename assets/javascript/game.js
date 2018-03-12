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
        "name": "Cardinal",
        "health": 75,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    var bluejay = {
        "name": "Blue Jay",
        "health": 100,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    var woodpecker = {
        "name": "Woodpecker",
        "health": 200,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    // Villain Objects
    var squirrel = {
        "name" : "Squirrel",
        "health" : 150,
        "multiplier" : 20,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    var cat = {
        "name" : "Cat",
        "health" : 300,
        "multiplier" : 20,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };

    var owl = {
        "name" : "Owl",
        "health" : 250,
        "multiplier" : 20,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier);
        }
    };
    
    
    function displayHeroHealth(name, health){
        if (name === "Cardinal")
            $('#cardinalStats').html(health);
        else if (name === "Blue Jay")
            $('#bluejayStats').html(health);
        else
            $('#woodpeckerStats').html(health);
    }

    function displayVillainHealth(name, health){
        if (name === "Squirrel")
            $('#squirrelStats').html(health);
        else if (name === "Cat")
            $('#catStats').html(health);
        else
            $('#owlStats').html(health);
    }

    // Pass in object. Check if perished
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
            
            $('.result').text(`${hero.name} has fallen!`);
            $('.replay-btn').removeClass("hide");
            $('.peck-btn').addClass("hide");
            
            if (hero.name === "Cardinal"){
                $(".cardinal-fight-image").removeClass("show");
                $(".cardinal-sad-image").addClass("show");
            }
            else if (hero.name === "Blue Jay"){
                $(".blue-fight-image").removeClass("show");
                $(".blue-sad-image").addClass("show");
            }
            else{
                $(".wood-fight-image").removeClass("show");
                $(".wood-sad-image").addClass("show");
            }

            if (villain.name === "Squirrel"){
                $(".squirrel-fight-image").removeClass("show");
                $(".squirrel-win-image").addClass("show");
            }
            else if (villain.name === "Cat"){
                $(".cat-fight-image").removeClass("show");
                $(".cat-win-image").addClass("show");
            }
            else{
                $(".owl-fight-image").removeClass("show");
                $(".owl-win-image").addClass("show");
            }
            $('.heroHit').empty();
            $('.villainHit').empty();
        }
        else if (isCharacterDead(villain) === true){
            villainObj = {};
            if (villain.name === "Squirrel"){
                $('#dead-squirrel').append(squirrelDiv);
                $(".squirrel-fight-image").removeClass("show");
                $(".squirrel-sad-image").addClass("show");
                $(".dead-squirrel-class").addClass("show");
                $(".squirrel-fighting").removeClass("right-fighter");
                $('.result').text(`${villain.name} has been defeated! Choose another opponent`);
                //squirrelDiv.css({"border-color":"grey", "background": "grey", "opacity": ".65"});
                squirrelFlag = false;
            }
            else if (villain.name === "Cat"){
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
            $('.peck-btn').addClass("hide");
            if (hero.name === "Cardinal"){
                $(".cardinal-fight-image").removeClass("show");
                $(".cardinal-win-image").addClass("show");
            }
            else if (hero.name === "Blue Jay"){
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

    // Parameters: hero and villain object
    // Decrease health of hero and villain on each click
    function attack(hero, villain){
        // Increase hero power on each attack
        let tempHeroPower = hero.power();
        heroPower += tempHeroPower;
        let heroName = hero.name;
        
        // Villain power stays constant
        let villainPower = villain.power();
        let villainName = villain.name;
    
        // Decrease health of hero and villain
        hero.health -= villainPower;
        villain.health -= heroPower;

        // Display commentary
        $('.heroHit').text(`${heroName} attacks at ${heroPower}hp!`);
        $('.villainHit').text(`${villainName} attacks at ${villainPower}hp!`);
        heroHealth = hero.health;
        villainHealth = villain.health;

        // Display health stats
        displayHeroHealth(heroName, heroHealth);
        displayVillainHealth(villainName, villainHealth);
    
        // Check health
        checkHealth(hero, villain);
        didHeroWin(hero);

    }

    // Parameters: hero and villain object
    // If both objects are populated, show button
    function showAttackButton(hero, villain){
        if ((jQuery.isEmptyObject(hero) === false) && (jQuery.isEmptyObject(villain) === false)){
            $('.button-div').removeClass("hide");
        }
        return;
    }

    // Move hero to fighting area and show attack button
    // only if both hero and villain have been chosen
    function moveHero(attacker){
        heroAttackDiv.append(attacker);
        showAttackButton(heroObj, villainObj);
    }

    // Move villain to fighting area and show attack button
    // only if both hero and villain have been chosen
    function moveVillain(attacker){
        villainAttackDiv.append(attacker);
        showAttackButton(heroObj, villainObj);
    }

    // On Click Events

    // Hero Character Selection
    $('#cardinal').on('click', function(){
        // If a hero hasn't been selected yet, 
        // then it is available for selection
        if (heroPlayer && flag){
            heroObj = cardinal;
            heroPlayer = false;

            // Move hero to fighting area
            moveHero(cardinalDiv);

            // Change image
            $(".cardinal-image").addClass("hide");
            $(".cardinal-fight-image").addClass("show");
            $(".cardinal-fighting").addClass("left-fighter");
        }   
    });

    $('#bluejay').on('click', function(){
        if (heroPlayer && flag){
            heroObj = bluejay;
            heroPlayer = false;

            moveHero(bluejayDiv);
            
            
            $(".blue-image").addClass("hide");
            $(".blue-fight-image").addClass("show");
            $(".bluejay-fighting").addClass("left-fighter");
        }   
    });

    $('#woodpecker').on('click', function(){
        if (heroPlayer && flag){
            heroObj = woodpecker;
            heroPlayer = false;

            moveHero(woodpeckerDiv);
            
            $(".wood-image").addClass("hide");
            $(".wood-fight-image").addClass("show");
            $(".woodpecker-fighting").addClass("left-fighter");

        }    
    });

    // Villain Character Selection
    $('#squirrel').on('click', function(){
        // If a villain hasn't been selected yet, 
        // then it is available for selection
        if (villainPlayer && squirrelFlag){
            villainObj = squirrel;
            villainPlayer = false;

            // Move villain to fighting area
            moveVillain(squirrelDiv);
            
            // Change image
            $(".squirrel-image").addClass("hide");
            $(".squirrel-fight-image").addClass("show");
            $(".squirrel-fighting").addClass("right-fighter");
            
             // Clear out fighting area
            $('.result').empty();
            $('.heroHit').empty();
            $('.villainHit').empty();
        }   
    });

    $('#cat').on('click', function(){
        if (villainPlayer && catFlag){
            villainObj = cat;
            villainPlayer = false;

            moveVillain(catDiv);
            
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
            villainPlayer = false;

            moveVillain(owlDiv);
            
            $(".owl-image").addClass("hide");
            $(".owl-fight-image").addClass("show");
            $(".owl-fighting").addClass("right-fighter");
            
           
            $('.result').empty();
            $('.heroHit').empty();
            $('.villainHit').empty();
        }    
    });

    // Call attack function
    $('#attackBtn').on('click', function(){
        attack(heroObj, villainObj);
    });

    // Restart Game
    $('#replayBtn').on('click',function(){
        location.reload();
    });


    
});