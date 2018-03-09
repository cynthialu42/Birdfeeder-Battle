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

    var blueJay = {
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
        "health" : 250,
        "multiplier" : 5,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    var cat = {
        "name" : "cat",
        "health" : 500,
        "multiplier" : 5,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    var owl = {
        "name" : "owl",
        "health" : 450,
        "multiplier" : 5,
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
        let heroPwer = hero.power();
        let villainPwer = villain.power();

       hero.health -= villainPwer;
       villain.health -= heroPwer;

       // Increase power
       

       // Check health
       if (isCharacterDead(hero) === true){
           alert(`oh noes goodbye ${hero.name}`);
       }
       if (isCharacterDead(villain) === true){
            alert(`oh noes goodbye ${villain.name}`);
        }

       console.log(heroPwer);
       console.log(hero.health);

    }
    
    $('#attackBtn').on('click', function(){
        // minus things
        // minus more things!
        attack(cardinal, owl);
    });
    

    //Variables
    let fightingDiv = $('#owl');
    let cardinalDiv = $('#cardinal');
    let bluejayDiv = $('#bluejay');
    let woodpeckerDiv = $('#woodpecker');
    let charAttackDiv = $('#attackCharacters');
    let heroAttackDiv = $('#heroAttack');
    let villainAttackDiv = $('#villainAttack');
    //Functions 
    function moveAttacker(attacker){
        heroAttackDiv.append(attacker);
    }
    //Events
    let heroPlayer = true;
    $('#cardinal').on('click', function(){
        if (heroPlayer){
            moveAttacker(cardinalDiv);
            heroPlayer = false;
        }   
    });
    $('#bluejay').on('click', function(){
        if (heroPlayer){
            moveAttacker(bluejayDiv);
            heroPlayer = false;
        }   
    });
    $('#woodpecker').on('click', function(){
        if (heroPlayer){
            moveAttacker(woodpeckerDiv);
            heroPlayer = false;
        }    
    });

    

});