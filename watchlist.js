import {
    updateLocalStorage,
    generateMoviesHtml,
    savedWatchlist,
    emptyWatchlistHtml
} from '/utils.js'

const moviesListEl = document.getElementById("movies-list-el")

let movies = []
async function setMoviesInfo(array) {
    for (let film of array) {
        const res = await fetch(`https://www.omdbapi.com/?apikey=62678496&i=${film}`)
        const data = await res.json()
        movies.push(data)
    }
}


async function renderResults() {
    await setMoviesInfo(savedWatchlist)
    
    if (movies.length === 0)
        return moviesListEl.innerHTML = emptyWatchlistHtml()
    moviesListEl.innerHTML = generateMoviesHtml(movies)

    const actionBtn = document.getElementsByClassName("action-btn")
    for (var i = 0; i < actionBtn.length; i++) {
        actionBtn[i].addEventListener('click', updateLocalStorage)
    }
}

renderResults()

