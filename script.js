const movieForm = document.getElementById('movie-form');

// Movie Class: Represents a movie
class Movie {
    constructor (title, producer, umi) {
        this.title = title;
        this.producer = producer;
        this.umi = umi;
    }
}

//UI Class: Handle UI Tasks
class UI {
    static displayMovies() {
        const movies = Store.getMovies();

        movies.forEach((movie) => UI.addMovieToList(movie));
    }

    static addMovieToList(movie) {
        const list = document.getElementById('movie-list');

        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${movie.title}</td>
          <td>${movie.producer}</td>
          <td>${movie.umi}</td>
          <td>
            <a href="#" class="btn btn-danger btn-sm delete">remove</a>
          </td>
        `
        list.appendChild(row);
    }

    static deleteMovie(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#movie-form');
        container.insertBefore(div, form);

        //Vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('name').value = '';
        document.getElementById('umi').value = '';
    }
}

//Store Class: Handle Local Storage
class Store {
    static getMovies() {
        let movies;
        if(localStorage.getItem('movies') === null) {
            movies = [];
        }else {
            movies = JSON.parse(localStorage.getItem('movies'));
        }
        return movies;
    }

    static addMovies(movie) {
        const movies = Store.getMovies();
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    static removeMovie(umi) {
        const movies = Store.getMovies();
        movies.forEach((movie, index) => {
            if(movie.umi === umi) {
                movies.splice(index, 1);
            }
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

//Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);

//Event: Add a Movie
movieForm.addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault()

    //Get form values
    const title = document.getElementById('title').value;
    const producer = document.getElementById('name').value;
    const umi = document.getElementById('umi').value;

    //Validate
    if(title === '' || producer === '' || umi === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    }else {
        //Instantiate movie
        const movie = new Movie(title, producer, umi);
        
        //Add movie to UI
        UI.addMovieToList(movie);

        //Add movie to Store
        Store.addMovies(movie);

        //Show success message
        UI.showAlert('Movie Added', 'success');

        //Clear fields
        UI.clearFields();
    }

});

//Event: Remove a Movie
//We target the #movie-list so that we can do it for all its list i.e Event propagation
document.getElementById('movie-list').addEventListener('click', (e) => {
    //Remove movie from UI
    UI.deleteMovie(e.target);

    //Remove movie from store
    Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

    //Show success message
    UI.showAlert('Movie Removed', 'success');
});
