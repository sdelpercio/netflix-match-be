const genres = {};

const updateGenres = (genre, room) => {
    room = room.trim().toLowerCase();
    const existingRoom = room in genres;

    if(existingRoom) {
        const existingGenre = genres[room].indexOf(genre)

        // add genre to room
        if(existingGenre === -1) {
            genres[room] = [...genres[room], genre]
        }
    } else {
        genres[room] = [].push(genre)
    }
}

const getGenres = (room) => {
    room = room.trim().toLowerCase();

    // remove duplicates
    let uniques = [...new Set(genres[room])]

    return uniques;
}

// Removes the room from the genres object
const removeGenresRoom = (room) => {
    room = room.trim().toLowerCase();
    delete genres[room]
}

module.exports = { updateGenres, getGenres, removeGenresRoom }