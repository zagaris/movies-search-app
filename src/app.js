const form = document.querySelector("form");
const input = document.querySelector("#inputMovie")
const results = document.querySelector("#results");

const API_URL = 'http://www.omdbapi.com/?type=movie&s=';
const API_KEY = '&apikey=YOUR_KEY';

form.addEventListener('submit', formSubmitted);

function formSubmitted(e) {
    e.preventDefault();
    const movie = input.value;
    getMovie(movie);
    input.value = '';
}

function formatArray(movies) {
    movies = movies.filter((movie, index, self) =>
    index === self.findIndex((nextMovie) => (
        nextMovie.imdbID === movie.imdbID && nextMovie.imdbID === movie.imdbID
    ))
  )
    movies = movies.filter((movie) => 
        movie.Poster !== "N/A"
    );

    return movies;
}

function getMovie(movie) {
    const url = `${API_URL}${movie}${API_KEY}`
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        const movies = formatArray(data.Search);
      
        results.innerHTML = '';
        let html = ` <section class="row movies-section"> <section class="mt-2 col-9 row" id="results">`;

        movies.forEach(movie => {

            html += `
                <div class="card col-4">
                    <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        ${
                            button ?
                            `<button onclick="window.open('https://www.imdb.com/title/${movie.imdbID}')" type="button" class="btn btn-danger watch-later-button">Watch</button>`
                            : ''
                          }
                    </div>
                </div>     
            `;
        })
        html += `</section> </section>`
        results.innerHTML = html;
    })
    .catch((error) => {
        results.innerHTML = `
        <br>
        <div style="
        background: #A63446;
        color: #ffffff;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        text-align: center;">
        Movie not found!
        </div>`
    })

}