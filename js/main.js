
// Global variables
var tubbieStatus = 0; // 0 = default starting, 1 = available for battle, 2 = ready to attack, 3 = defeated
var opponentStatus = false; // false if no opponent, true if an opponent has been selected
var levelUpEnergy = 50; // how much energy to add on level-up

// All of the tubbies
const allTubbies = [
    {
        id: 0,
        sname: "tinky_winky",
        name: "Tinky Winky",
        pic: "images/tinky_winky.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Tinky-Winky",
        energy: 600,
        minAtk: 5,
        maxAtk: 25
    },
    {
        id: 1,
        sname: "dipsy",
        name: "Dipsy",
        pic: "images/dipsy.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Dipsy",
        energy: 250,
        minAtk: 25,
        maxAtk: 65
    },
    {
        id: 2,
        sname: "laa_laa",
        name: "Laa Laa",
        pic: "images/laa_laa.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Laa-Laa",
        energy: 200,
        minAtk: 30,
        maxAtk: 75
    },
    {
        id: 3,
        sname: "po",
        name: "Po",
        pic: "images/po.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Po",
        energy: 100,
        minAtk: 50,
        maxAtk: 100
    }
];


// List the Teletubbies in the about section
console.log("We have " + allTubbies.length + " Teletubbies ready to play!");
for (var i = 0; i < allTubbies.length; i++) {
    $( ".list-unstyled" ).append( $( `<li><a href="${allTubbies[i].wiki}" target="_blank" class="text-white">${allTubbies[i].name}</a></li>` ) );
}
resetGame(); // start new game

   // Select a Teletubbie to play
   $(document).on('click', ".btn.btn-outline-secondary.btn-sm", function() { // clicked the battle button
    var myClasses = this.classList;
    var chosenTubbieId = parseInt(myClasses[3]);
    console.log("Player chose tubbie id: " + chosenTubbieId);
    // clear the arena
    $( ".row.arena" ).empty();

    //remove chosen tubbie from available tubbies
    availableTubbies.splice(chosenTubbieId,1); //remove the chosen tubbie from list of available tubbies
    console.log("Available Tubbies...");
    console.log(availableTubbies);

    //create a new array for the chosen tubbie
    for(var i = 0; i < allTubbies.length; i++) {
        var checkId = parseInt(allTubbies[i].id); // find matching id
        if (checkId === chosenTubbieId) {
            console.log("found chosen tubbie");
                var chosenTubbie = [].concat(allTubbies[i]); // add tubbie with matching id to chosen array
        }
    }
    console.log("Chosen Tubbie...");
    console.log(chosenTubbie);
    $(".row.chatter").empty();   
    $(".row.chatter").append(`<p>You chose ${chosenTubbie[0].name}! Now choose your first opponent!</p>`); // chosen tubbie id is always 0
    placeCards(chosenTubbie, "arena", 2); //put the other tubbies in the dugout
    placeCards(availableTubbies, "dugout", 1); //put the other tubbies in the dugout

    // Check to see if a Battle button was pressed
    $(document).on('click', ".btn.btn-warning", function() { // clicked the battle button        
        var opponentClasses = this.classList; // the tubbie id was added to the class list, get it
        var opponentTubbieId = parseInt(opponentClasses[3]);
        console.log("Player chose opponent tubbie id: " + opponentTubbieId);
        console.log("Battle Button Pressed");
        if (opponentStatus===false) { // If no opponent chosen yet
            chooseOpponent(opponentTubbieId);
        }
    });
    startingChosenEnergy = chosenTubbie[0].energy; // temporarilly store chosen energy
    console.log(startingChosenEnergy);

    // Check to see if attack button was pressed
    $(document).on('click', ".btn.btn-danger", function() { // clicked the red button
        console.log("Attack Button Pressed");


        if (opponentStatus===false) {
            $(".row.chatter").empty();
            $(".row.chatter").append(`<p>You must first have an opponent to attack!  Choose one of the Teletubbies below</p>`); // chosen tubbie id is always 0

        } else if (opponentStatus===true){
            let chosenAtk = 0;
            let opponentAtk = 0;
            // generate random attack from chosen and opponents between minAtm and maxAtk
            console.log(`Chosen attack range: ${chosenTubbie[0].minAtk}-${chosenTubbie[0].maxAtk}`);
            chosenAtk = randomAtk(chosenTubbie[0].minAtk,chosenTubbie[0].maxAtk);
            console.log(`Chosen attacks for ${chosenAtk}`)
            console.log(`Opponent attack range: ${opponentTubbie[0].minAtk}-${opponentTubbie[0].maxAtk}`);
            opponentAtk = randomAtk(opponentTubbie[0].minAtk,opponentTubbie[0].maxAtk);
            console.log(`Opponent attacks for ${opponentAtk}`)
            $(".row.chatter").empty();
            $(".row.chatter").append(`<p>You drain ${chosenAtk} energy from ${opponentTubbie[0].name}! ---><p>`); // attack message
            $(".row.chatter").append(`<p class="text-danger"> <---${opponentTubbie[0].name} drains ${opponentAtk} energy from you!</p>`); // attack message
            chosenTubbie[0].energy = chosenTubbie[0].energy - opponentAtk;
            opponentTubbie[0].energy = opponentTubbie[0].energy - chosenAtk;
            console.log(`Chosen energy = ${chosenTubbie[0].energy}`)
            console.log(`Opponent energy = ${opponentTubbie[0].energy}`)
            if (opponentTubbie[0] === 'undefined') {
                $(".row.chatter").empty();
                $(".row.chatter").append(`<p class="text-danger">You don't have an opponent!</p>`);                
            } else if (chosenTubbie[0].energy <= 0){ // Player loses game
                $(".row.chatter").empty();
                $(".row.chatter").append(`<p class="text-danger">Uh oh!  You fell asleep!  Sorry, game over!</p><button type="button" class="btn btn-sm btn-success"><span><h3>Play Again</h3></span></button>`);
                $(document).on('click', ".btn.btn-sm.btn-success", function() { location.reload(); });
                $( ".row.arena" ).empty();
                placeCards(chosenTubbie, "arena", 3); // remove attack button
                placeCards(opponentTubbie, "arena", 3);

            } else if (opponentTubbie[0].energy <= 0){ // Player wins battle
                $(".row.chatter").empty();
                $(".row.chatter").append(`<p class="text-success">Victory! ${opponentTubbie[0].name} has fallen asleep!</p>`);
                chosenTubbie[0].energy = startingChosenEnergy + (4 - availableTubbies.length) * levelUpEnergy;
                console.log("available tubbies");
                console.log(availableTubbies);

                $( ".row.arena" ).empty(); 
                placeCards(chosenTubbie, "arena", 2); // redraw chosen with new energy level

                placeCards(opponentTubbie, "bed", 3); // move defeated opponent to bed
                opponentTubbie.length = 0; //and remove him from opponentTubbie
                opponentStatus=false;

                $( ".row.dugout" ).empty();
                placeCards(availableTubbies, "dugout", 1); // redraw the dugout with available tubbies, add button so they can be selected

                if (availableTubbies.length <=0 && opponentTubbie.length <=0) { // check to see if player also won game
                    $(".row.chatter").append(`<p class="text-success">..Congratulations, YOU WON!!!...</p><button type="button" class="btn btn-sm btn-success"><span><h3>Play Again</h3></span></button>`);
                    $(document).on('click', ".btn.btn-sm.btn-success", function() { location.reload(); });
                    $( ".row.arena" ).empty();
                    placeCards(chosenTubbie, "arena", 3);
                }

            }
             else { // redraw for next round, this shows energy change after each attack
                $( ".row.arena" ).empty();
                placeCards(chosenTubbie, "arena", 2);
                placeCards(opponentTubbie, "arena", 3);
            }
            
        }
    });
});


function resetGame () {
    $( ".row.arena" ).empty(); 
    $( ".row.chatter" ).empty(); 
    $( ".row.dugout" ).empty(); 
    $( ".row.bed" ).empty(); 
    // Some globals
    chosenTubbie = new Array(); // tubbie player has chosen to play as
    opponentTubbie = new Array(); // this tubbie is the active opponent
    availableTubbies = new Array(); // remaining tubbies
    availableTubbies = [].concat(allTubbies) // Innitially all tubbies are available
    defeatedTubbies = new Array(); // defeated tubbies    
    placeCards(availableTubbies, "arena", 0); // Show all the tubbies in the arena at start of game and set game status 0 (new game)
    gameOver = false;
}

// Random attack
function randomAtk(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


// Place the tubbies in the appropriate place 
function placeCards(tubbieList, putWhere, tubbieStatus) {
    var buttonLabel = '';
    var hideButton = false;
    var buttonColor = 'btn-outline-secondary';
    switch(tubbieStatus) {
        case 0:
            buttonLabel = 'Select';
            break;
        case 1:
            buttonLabel = 'Battle';
            buttonColor = 'btn-warning';

            break;
        case 2:
            buttonLabel = 'Attack';
            buttonColor = 'btn-danger';
            break;
        case 3:
            hideButton = true;
        break;            
        default:
            buttonLabel = 'Select';
    }
    for (var i = 0; i < tubbieList.length; i++) {
        $( `.row.${putWhere}` ).append( $( `
        <div class="col-md-3">
            <div class="card mb-3 box-shadow">
                <img src="${tubbieList[i].pic}" class="card-img-top tt-pics" alt="${tubbieList[i].name}">
                <div class="card-body"><h4>${tubbieList[i].name}</h4>
                    <p class="card-text">Energy: ${tubbieList[i].energy}
                    <br>Attack: ${tubbieList[i].minAtk}-${tubbieList[i].maxAtk}</p>
                        <div class="d-flex justify-content-between align-items-center ${tubbieList[i].sname}">
                            
                       </div>
                    </div>
                </div>
            </div>
        </div>`));

        if (hideButton===false) { // Only show button when it's time to pick a tubbie
            $( `.d-flex.justify-content-between.align-items-center.${tubbieList[i].sname}` ).append( $( `<div class="btn-group"><button type="button" class="btn ${buttonColor} btn-sm ${tubbieList[i].id}">${buttonLabel}</button></div>`));
        }
    }
}


function chooseOpponent(opId) {
        //create a new array for the opponent tubbie
        for(var i = 0; i < availableTubbies.length; i++) {
            var checkOpponentId = parseInt(availableTubbies[i].id); // find matching id in available tubbies
            if (checkOpponentId === opId) {
                console.log("Found opponent id "+ availableTubbies[i].id +" in availableTubbies")
                opponentTubbie = [].concat(availableTubbies[i]); // add tubbie with matching id to opponent array
                $(".row.chatter").empty();
                $(".row.chatter").append(`<p>You've chosen to battle ${opponentTubbie[0].name}!  Now press the attack!</p>`); // chosen tubbie id is always 0
                opponentStatus = true; //set opponent status to 1 (an opponent has been chosen)
                for(var i = 0; i < availableTubbies.length; i++){
                    if (parseInt(availableTubbies[i].id) === opId) {
                        console.log("Removing tubbie id "+ availableTubbies[i].id +" from availableTubbies");
                        console.log("i=" + i);
                        console.log(availableTubbies);
                        availableTubbies.splice(i,1); //remove the opponent tubbie from list of available tubbies
                        console.log(availableTubbies);
                    }
            }
            placeCards(opponentTubbie, "arena", 3); //put the other tubbies in the dugout
            $( ".row.dugout" ).empty();
            placeCards(availableTubbies, "dugout", 3); //put the other tubbies in the dugout
        }            
    }
}









 
 