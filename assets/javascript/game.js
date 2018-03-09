$(document).ready(function(){
    
    var luke = {
        "name": "luke",
        "health": 200,
        "multiplier": 10,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };

    var darthMaul = {
        "name" : "darth maul",
        "health" : 400,
        "multiplier" : 5,
        "power" : function(){
            return Math.floor(Math.random() * this.multiplier)
        }
    };
    function isJediDead(jedi){
        if (jedi.health <= 0){
            return true;
        }
        return false;
    }

    function attack(jediOne, jediTwo){
        let j1Pwer = jediOne.power();
        let j2Pwer = jediTwo.power();

       jediOne.health -= j2Pwer;
       jediTwo.health -= j1Pwer;

       // Increase power
       

       // Check health
       if (isJediDead(jediOne) === true){
           alert(`oh noes goodbye ${jediOne.name}`);
       }
       if (isJediDead(jediTwo) === true){
            alert(`oh noes goodbye ${jediTwo.name}`);
        }

       console.log(j1Pwer);
       console.log(jediOne.health);

    }
    
    $('#attackBtn').on('click', function(){
        // minus things
        // minus more things!
        attack(luke, darthMaul);
    });
    

    //Variables
    let darthMaulDiv = $('#dm');
    let charAttackDiv = $('#attackCharacters');
    //Functions 
    function moveAttacker(attacker){
        charAttackDiv.append(attacker);
    }
    //Events
    //clicking luke will move darth maul below
    $('#luke').on('click', function(){
        moveAttacker(darthMaulDiv);
        
    });

    

});