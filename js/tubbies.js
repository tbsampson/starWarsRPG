const backgroundMusic = "sounds/theme_song.mp3";

var tubbieSounds = [
    {
        oneday: "sounds/tubbyoneday.wav",
        uhoh: "sounds/tubbyuhoh.wav",
        hooray: "sounds/tubbyhooray.wav",
        bye: "sounds/tubbybyebye.wav",
        again: "sounds/tubbyagain.wav"
    },

]

// reset function
function resetTubbies() {



    availableTubbies = [
        {
            id: 0,
            sname: "tinky_winky",
            name: "Tinky Winky",
            pic: "images/tinky_winky.jpg",
            wiki: "http://teletubbies.wikia.com/wiki/Tinky-Winky",
            greeting: "sounds/tubbytinky.wav",
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
            greeting: "sounds/tubbydipsy.wav",
            energy: 200,
            minAtk: 25,
            maxAtk: 65
        },
        {
            id: 2,
            sname: "laa_laa",
            name: "Laa Laa",
            pic: "images/laa_laa.jpg",
            wiki: "http://teletubbies.wikia.com/wiki/Laa-Laa",
            greeting: "sounds/tubbylaalaa.wav",
            energy: 150,
            minAtk: 30,
            maxAtk: 75
        },
        {
            id: 3,
            sname: "po",
            name: "Po",
            pic: "images/po.jpg",
            wiki: "http://teletubbies.wikia.com/wiki/Po",
            greeting: "sounds/tubbypo.wav",
            energy: 100,
            minAtk: 50,
            maxAtk: 100
        }
    ];
}