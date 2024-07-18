const fetch = require('node-fetch'); // Ensure you have node-fetch installed

async function getMovieCharacters(movieId) {
    const baseUrl = "https://swapi.dev/api/films/";

    try {
        const response = await fetch(`${baseUrl}${movieId}/`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const movieData = await response.json();
        const characterUrls = movieData.characters;

        for (const characterUrl of characterUrls) {
            try {
                const charResponse = await fetch(characterUrl);
                if (!charResponse.ok) {
                    throw new Error(`Error fetching character data: ${charResponse.statusText}`);
                }
                const charData = await charResponse.json();
                console.log(charData.name);
            } catch (error) {
                console.error(error.message);
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}

const movieId = process.argv[2];
if (!movieId) {
    console.error("Usage: node script.js <Movie ID>");
    process.exit(1);
}

getMovieCharacters(movieId);

