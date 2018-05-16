// Teletubbies Stats
var tubbies = [
    {
        name: "Tinky Winky",
        pic: "images/tinky_winky.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Tinky-Winky",
        energy: 300,
        minAtk: 5,
        maxAtk: 25
    },
    {
        name: "Dipsy",
        pic: "images/dipsy.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Dipsy",
        energy: 250,
        minAtk: 1,
        maxAtk: 35
    },
    {
        name: "Laa Laa",
        pic: "images/laa_laa.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Laa-Laa",
        energy: 200,
        minAtk: 10,
        maxAtk: 20
    },
    {
        name: "Po",
        pic: "images/po.jpg",
        wiki: "http://teletubbies.wikia.com/wiki/Po",
        energy: 150,
        minAtk: 20,
        maxAtk: 35
    }
];

// Uninvited Guests



// List the Teletubbies in the about section
console.log("We have " + tubbies.length + " Tellietubbies ready to play!");
for (var i = 0; i < tubbies.length; i++) {
    $( ".list-unstyled" ).append( $( "<li><a href=\"" + tubbies[i].wiki + "\" target=\"_blank\" class=\"text-white\">" + tubbies[i].name + "</a></li>" ) );
}

// Creates the Teletubbies cards
function showTubbies() {
    for (var i = 0; i < tubbies.length; i++) {
        $( ".row.arena" ).append( $( "<div class=\"col-md-3\"><div class=\"card mb-3 box-shadow\"><img src=\"" + tubbies[i].pic + "\" class=\"card-img-top tt-pics\" alt=\"" + tubbies[i].name + "\"><div class=\"card-body\"><h4>" + tubbies[i].name + "</h4><p class=\"card-text\">Energy: " + tubbies[i].energy + "<br>Attack: " + tubbies[i].minAtk + "-" + tubbies[i].maxAtk + "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\"><button type=\"button\" class=\"btn btn-sm btn-outline-secondary\">Select</button></div><small class=\"text-muted\"></small></div></div></div></div>" ) );
    }
}

showTubbies ();

        




function resetGame () {
    $( ".row.arena" ).remove();
}