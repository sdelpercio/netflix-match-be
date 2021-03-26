const movies = {};

const updateMovies = (movie, room) => {
    room = room.trim().toLowerCase();
    const existingRoom = room in movies;

    if(existingRoom) {
        movies[room] = [...movies[room], movie]
    } else {
        movies[room] = []
        movies[room].push(movie)
    }
}

const getMovieMatches = (room) => {
    room = room.trim().toLowerCase();
    const existingRoom = room in movies;

    if(existingRoom) {
        return movies[room].filter((e, i, a) => a.indexOf(e) !== i)
    } else {
        return []
    }
}

const removeMoviesRoom = (room) => {
    room = room.trim().toLowerCase();
    delete genres[room]
}

module.exports = { updateMovies, getMovieMatches, removeMoviesRoom } 