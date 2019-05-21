require("dotenv").config();

const axios = require("axios")
const Spotify = require('node-spotify-api')
const keys= require("./keys.js")
const moment =  require("moment")

//append text files
const fs = require("fs");
var query = process.argv[3];

var option = process.argv[2];
//Spotify Client
const spotify = new Spotify(keys.spotify);



function spotifyCall(songName) {
    spotify.search({type: 'track',query:songName}, function(err, data) {
        if (err) {
            return console.log('Error occurred' + err);
        }
        console.log("\n Track Info " + "\nArtist: " + data.tracks.items[0].artists[0].name + "\n Song: " + data.tracks.items[0].name + "\n Link: " + data.tracks.items[0].external_urls.spotify + "\n Album: " + data.tracks.items[0].album.name + "\n" + "\n This song is great, But how about another!")
    })
}
// Movie-this request with axios with the omdb api
function movieThis(movieName) {
    if (!movieName) {
        movieName = "Mr.Nobdy";
    }
    var queryUrl = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    // axios request with axios to help debug the actual URL
    axios.get(queryUrl)
         .then(function(response) {

                //  console.log(response.data)
                console.log("\n Movie Info " + response.data.Title + "\nRelease Year: " + response.data.Year + "\n Rating: " + response.data.Rated + "\n Release Country: " + response.data.Country + "\n Language: " + response.data.Language + "\n Plot: " + response.data.Country + "\n Actors: " + response.data.Actors + "\n" + "\n Really? This one?!?")
            
         });

};
// Concert-this request axios for bandsintown api
function concertThis(artist) {
    var bandsQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // Url to try and debug against the actual URL
    axios.get(bandsQueryUrl)
         .then(function(response) {
             console.log(`Upcoming Events: `)
             console.log(`Artist: ${artist} \n Venue:  ${response.data[0].venue.name} \n Location:  ${response.data[0].venue.country} \n Date:  ${moment(response.data[0].datetime).format("MM-DD-YYYY")} \n Party on Garth`);
             
         })
}

switch(option){
    case "movie-this":
        movieThis(query);
        break;
    case "spotify-this-song":
        spotifyCall(query);
        break;
    case "concert-this":
        concertThis(query);
        break;
    default:
        fs.readFile("random.txt", "UTF8", function(error, data){
            var data = data.split(",");
            var wantIt = data[1];
            if (error){
                return console.log(error)
            }
            //Call Function
            spotifyCall(wantIt);
        })
}
