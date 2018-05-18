
// Global variables
var tubbieStatus = 0; // 0 = default starting, 1 = available for battle, 2 = ready to attack, 3 = defeated
var opponentStatus = 0;
var playerEnergy = 0;
var opponentEnergy = 0;
var playerMinAtk = 0;
var playerMaxAtk = 0;
// Teletubbies Stats
var allTubbies = [
    {
        id: 0,
        sname: "tinky_winky",
        name: "Tinky Winky",
        pic: "images/tinky_winky.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Tinky-Winky",
        energy: 300,
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
        minAtk: 1,
        maxAtk: 35
    },
    {
        id: 2,
        sname: "laa_laa",
        name: "Laa Laa",
        pic: "images/laa_laa.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Laa-Laa",
        energy: 200,
        minAtk: 10,
        maxAtk: 20
    },
    {
        id: 3,
        sname: "po",
        name: "Po",
        pic: "images/po.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Po",
        energy: 150,
        minAtk: 20,
        maxAtk: 35
    }
];



// List the Teletubbies in the about section
console.log("We have " + allTubbies.length + " Teletubbies ready to play!");
for (var i = 0; i < allTubbies.length; i++) {
    $( ".list-unstyled" ).append( $( `<li><a href="${allTubbies[i].wiki}" target="_blank" class="text-white">${allTubbies[i].name}</a></li>` ) );
}

// The arena - all tubbies are in the arena at the start of game, after that only battling tubbies will appear in the arena
function makeCards(tubbieList, putWhere, tubbieStatus) {
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

// START GAME
function startGame(startingLineup){
    makeCards(startingLineup, "arena", 0); // Show all the tubbies in the arena at start of game and set game status 0 (new game)
}
startGame(allTubbies);

function resetGame () {
    $( ".row.arena" ).empty(); 
}




// Select a Teletubbie to play
$(".btn").click(function() {
    var myClasses = this.classList;
    var chosenTubbieId = parseInt(myClasses[3]);
    console.log("Player chose tubbie id: " + chosenTubbieId);
    // clear the arena
    $( ".row.arena" ).empty();


    //remove chosen tubbie from available tubbies
    var availableTubbies = [].concat(allTubbies); //Make a copy of the full list of tubbies
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
    
    makeCards(chosenTubbie, "arena", 2); //put the other tubbies in the dugout
    makeCards(availableTubbies, "dugout", 1); //put the other tubbies in the dugout

    // Check to see if attack button was pressed
    $(".btn.btn-danger").click(function() {
        console.log("Attack Button Pressed");
        if (opponentStatus===0) {
            $(".row.chatter").empty();
            $(".row.chatter").append(`<p>You must first have an opponent to attack!  Choose one of the Teletubbies below</p>`); // chosen tubbie id is always 0
        }
    });

    // Check to see if a Battle button was pressed
    $(".btn.btn-warning").click(function() {
        var opponentClasses = this.classList;
        var opponentTubbieId = parseInt(opponentClasses[3]);
        console.log("Player chose opponent tubbie id: " + opponentTubbieId);
        console.log("Battle Button Pressed");
        if (opponentStatus===0) { // If no opponent chosen yet

                //create a new array for the opponent tubbie
                for(var i = 0; i < availableTubbies.length; i++) {
                    var checkOpponentId = parseInt(availableTubbies[i].id); // find matching id in available tubbies
                    if (checkOpponentId === opponentTubbieId) {
                        console.log("found opponent tubbie");
                        var opponentTubbie = [].concat(availableTubbies[i]); // add tubbie with matching id to opponent array
                        $(".row.chatter").empty();
                        $(".row.chatter").append(`<p>You've chosen to battle ${opponentTubbie[0].name}!  Now press the attack!</p>`); // chosen tubbie id is always 0
                        
                        for(var i = 0; i < availableTubbies.length; i++){
                            if (parseInt(availableTubbies[i].id) === opponentTubbieId) {
                                console.log("Found matching opponent id: " + availableTubbies[i].id)
                                availableTubbies.splice(i,1); //remove the opponent tubbie from list of available tubbies
                            }
                    }
                    makeCards(opponentTubbie, "arena", 3); //put the other tubbies in the dugout
                    $( ".row.dugout" ).empty();
                    makeCards(availableTubbies, "dugout", 3); //put the other tubbies in the dugout
                }            
            }
        }
    });    
 });

 
 