const movieForm = document.getElementById('movie-form');

// Movie Class: Represents a movie
class Movie {
    constructor (title, producer, year) {
        this.title = title;
        this.producer = producer;
        this.year = year;
    }
}

//UI Class: Handle UI Tasks
class UI {
    static displayMovies() {
        const storedMovies = [
            {
                title: "Black Panther",
                producer: "Marvel",
                year: 2017
            },
            {
                title: "Banshee",
                producer: "Marvel",
                year: 2002
            }
        ]

        const movies = storedMovies;

        movies.forEach((movie) => UI.addMovieToList(movie));
    }

    static addMovieToList(movie) {
        const list = document.getElementById('movie-list');

        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${movie.title}</td>
          <td>${movie.producer}</td>
          <td>${movie.year}</td>
          <td>
            <a href="#" class="btn btn-danger btn-sm delete">remove</a>
          </td>
        `
        list.appendChild(row);
    }
}

//Store Class: Handle Local Storage

//Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);

//Event: Add a Movie
movieForm.addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault()

    //Get form values
    const title = document.getElementById('title').value;
    const producer = document.getElementById('name').value;
    const year = document.getElementById('year').value;

    //Instantiate movie
    const movie = new Movie(title, producer, year);
    
    //Add movie to list
    UI.addMovieToList(movie);
});

//Event: Remove a Movie
