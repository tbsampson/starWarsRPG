// Global variables
var opponentStatus = false; // false if no opponent, true if an opponent has been selected
var levelUpEnergy = 50; // how much energy to add on level-up
var musicPlaying = false;

resetGame(); // start new game

// List the Teletubbies in the about section
console.log("We have " + availableTubbies.length + " Teletubbies ready to play!");
for (var i = 0; i < availableTubbies.length; i++) {
    $( ".list-unstyled" ).append( $( `<li><a href="${availableTubbies[i].wiki}" target="_blank" class="text-white">${availableTubbies[i].name}</a></li>` ) );
}

// Select a Teletubbie to play
$(document).on('click', ".btn.btn-outline-secondary.btn-sm", function() { // clicked the select button
    var myClasses = this.classList;
    var chosenTubbieId = parseInt(myClasses[3]);
    // clear the arena
    $( ".row.arena" ).empty();

    //create a new array for the chosen tubbie
    for(var i = 0; i < availableTubbies.length; i++) {
        var checkId = parseInt(availableTubbies[i].id); // find matching id
        if (checkId === chosenTubbieId) {
            chosenTubbie = [].concat(availableTubbies[i]); // add tubbie with matching id to chosen array
        }
    }

    //remove chosen tubbie from available tubbies
    availableTubbies.splice(chosenTubbieId,1); //remove the chosen tubbie from list of available tubbies
    placeCards(chosenTubbie, "arena", 3); //put the other tubbies in the dugout
    placeCards(availableTubbies, "dugout", 1); //put the other tubbies in the dugout
    $(".row.chatter").empty();   
    $(".row.chatter").append(`<p>You chose ${chosenTubbie[0].name}! Now choose your first opponent!</p>`);

    //set chosen tubbie starting energy
    startingChosenEnergy = chosenTubbie[0].energy;

    // play greeting
    $(".row.arena").append(`<audio autoplay src="${chosenTubbie[0].greeting}" type="audio/mpeg"></audio>`)

    // Background music controls
    if (musicPlaying === false) {
            $(".container.d-flex.justify-content-between").append(`<audio autoplay loop controls src="${backgroundMusic}" type="audio/mpeg"></audio>`)
            musicPlaying = true;
    }
});

// Check to see if a Battle button was pressed
$(document).on('click', ".btn.btn-warning", function() { // clicked the battle button        
    var opponentClasses = this.classList; // the tubbie id was added to the class list, get it
    var opponentTubbieId = parseInt(opponentClasses[3]);
    console.log("Player chose opponent tubbie id: " + opponentTubbieId);
    console.log("Battle Button Pressed");
    if (opponentStatus===false) { // If no opponent chosen yet
        chooseOpponent(opponentTubbieId);
    }
    // play greeting
    $(".row.arena").append(`<audio autoplay src="${opponentTubbie[0].greeting}" type="audio/mpeg"></audio>`)    
});

// Check to see if attack button was pressed
$(document).on('click', ".btn.btn-danger", function() { // clicked the red button
    let chosenAtk = 0;
    let opponentAtk = 0;
    
    // generate random attack from chosen and opponents between minAtm and maxAtk
    chosenAtk = randomAtk(chosenTubbie[0].minAtk,chosenTubbie[0].maxAtk);
    opponentAtk = randomAtk(opponentTubbie[0].minAtk,opponentTubbie[0].maxAtk);
    $(".row.chatter").empty();
    $(".row.chatter").append(`<p>You drain ${chosenAtk} energy from ${opponentTubbie[0].name}! ---><p>`); // attack message
    $(".row.chatter").append(`<p class="text-danger"> <---${opponentTubbie[0].name} drains ${opponentAtk} energy from you!</p>`); // attack message
    chosenTubbie[0].energy = chosenTubbie[0].energy - opponentAtk;
    opponentTubbie[0].energy = opponentTubbie[0].energy - chosenAtk;
    
    if (opponentTubbie[0] === 'undefined') {
        $(".row.chatter").empty();
        $(".row.chatter").append(`<p class="text-danger">You don't have an opponent!</p>`);                
    } else if (chosenTubbie[0].energy <= 0){ // Player loses game
        $(".row.chatter").empty();
        $(".row.chatter").append(`<p class="text-danger">Uh oh!  You fell asleep!  Sorry, game over!</p><button type="button" class="btn btn-sm btn-success"><span><h3>Play Again</h3></span></button>`);
        $(document).on('click', ".btn.btn-sm.btn-success", function() { resetGame(); });
        $( ".row.arena" ).empty();
        placeCards(chosenTubbie, "arena", 3); // remove attack button
        placeCards(opponentTubbie, "arena", 3);

        // say again again
        $(".row.dugout").append(`<audio autoplay src="${tubbieSounds[0].again}" type="audio/mpeg"></audio>`)    

    } else if (opponentTubbie[0].energy <= 0){ // Player wins battle
        $(".row.chatter").empty();
        $(".row.chatter").append(`<p class="text-success">Victory! ${opponentTubbie[0].name} has fallen asleep!</p>`);
        chosenTubbie[0].energy = startingChosenEnergy + (4 - availableTubbies.length) * levelUpEnergy;
        $( ".row.arena" ).empty(); 
        placeCards(chosenTubbie, "arena", 3); // redraw chosen with new energy level
        placeCards(opponentTubbie, "bed", 3); // move defeated opponent to bed
        $( ".row.dugout" ).empty(); 
        placeCards(availableTubbies, "dugout", 1); // move defeated opponent to bed
        opponentTubbie.length = 0; //and remove him from opponentTubbie
        opponentStatus=false;

        // say bye
        $(".row.bed").append(`<audio autoplay src="${tubbieSounds[0].bye}" type="audio/mpeg"></audio>`)    

        if (availableTubbies.length <=0 && opponentTubbie.length <=0) { // check to see if player also won game
            $(".row.chatter").append(`<p class="text-success">..Congratulations, YOU WON!!!...</p><button type="button" class="btn btn-sm btn-success"><span><h3>Play Again</h3></span></button>`);
            $(document).on('click', ".btn.btn-sm.btn-success", function() {resetGame(); });
            $( ".row.arena" ).empty();
            placeCards(chosenTubbie, "arena", 3);
            // say hooray
            $(".row.chatter").append(`<audio autoplay src="${tubbieSounds[0].hooray}" type="audio/mpeg"></audio>`)    

        }
    }
        else { // redraw for next round, this shows energy change after each attack
        $( ".row.arena" ).empty();
        placeCards(chosenTubbie, "arena", 3);
        placeCards(opponentTubbie, "arena", 2);
    }
});

function resetGame () {
    $( ".row.arena" ).empty(); 
    $( ".row.chatter" ).empty(); 
    $( ".row.dugout" ).empty(); 
    $( ".row.bed" ).empty(); 
    // Some globals
    chosenTubbie = []; // tubbie player has chosen to play as
    opponentTubbie = []; // this tubbie is the active opponent
    availableTubbies = []; // remaining tubbies
    //availableTubbies = [].concat(allTubbies) // Innitially all tubbies are available
    resetTubbies();
    defeatedTubbies = []; // defeated tubbies
    opponentStatus=false;
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
            placeCards(opponentTubbie, "arena", 2); //put the other tubbies in the dugout
            $( ".row.dugout" ).empty();
            placeCards(availableTubbies, "dugout", 3); //put the other tubbies in the dugout
        }            
    }
}









 
 