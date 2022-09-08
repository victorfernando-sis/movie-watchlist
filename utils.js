let savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || Array()


let movies = []
async function setMoviesInfo(array) {
    movies = []
    for (let movie of array) {
        const res = await fetch(`https://www.omdbapi.com/?apikey=62678496&i=${movie.imdbID}`)
        const data = await res.json()
        movies.push(data)
    }
}

function updateLocalStorage(e) {
    const buttonId = e.target.id
    const buttonName = e.target.name
    const movieId = buttonId.split("-")[1]

    if (buttonName === "add") {
        savedWatchlist.push(movieId)
        e.target.parentNode.classList.add("watchlist")

    } else if (buttonName === "remove") {
        savedWatchlist = savedWatchlist.filter(item => item != movieId)
        e.target.parentNode.classList.remove("watchlist")
    }
    localStorage.setItem('watchlist', JSON.stringify(savedWatchlist))
}

function generateMoviesHtml(data) {
    return data.map(item => {
        const watchlist = (savedWatchlist.includes(item.imdbID)) ? "watchlist" : ""
        return `
                <div class="movie-box">
                <img class="movie-banner" alt=" Film Poster" src="${item.Poster}">
                    <div class="info-container">
                        <div>
                            <span class="movie-title">${item.Title}</span>
                            <span class="movie-rating">⭐️ ${item.imdbRating}</span>
                        </div>
                        <div class="movie-specs ${watchlist}">
                            <span class="duration">${item.Runtime}</span>
                            <span class="genre">${item.Genre}</span>                    
                            <button class="action-btn add-item" name="add" id="add-${item.imdbID}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                            <button class="action-btn remove-item" name="remove" id="remove-${item.imdbID}"><i class="fa-solid fa-circle-minus"></i> Remove</button>
                        </div>
                        <p class="movie-desc">${item.Plot}</p>
                    </div>
                </div>`
    }).join('')
}

function emptyWatchlistHtml() {
    return `
        <div class="empty-watchlist">
        <p class="empty-watchlist-lable">Your watchlist is looking a little empty...<p>
        <div class="empty-watchlist-btn">
            <i class="fa-solid fa-circle-plus"></i>
            <a href="./index.html">Let’s add some movies!</a>
        </div>
        </div>
        `
}
function movieNotFoundHtml() {
    return `
        <p class="movie-not-found"> Unable to find what you’re looking for. Please try another search.</p>
        `
}

export { updateLocalStorage, savedWatchlist, generateMoviesHtml, setMoviesInfo, movies, emptyWatchlistHtml, movieNotFoundHtml }