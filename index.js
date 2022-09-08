import {
    updateLocalStorage,
    savedWatchlist,
    generateMoviesHtml,
    setMoviesInfo,
    movies,
    movieNotFoundHtml
} from './utils.js'

const moviesListEl = document.getElementById("movies-list-el")
const searchInput = document.getElementById("search-el")
const searchBtn = document.getElementById("search-btn")


async function searchMoviesArray(search) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=62678496&plot=full&s=${search}`)
    const data = await res.json()
    if (!data.Error)
        await setMoviesInfo(data.Search)
    
    return
}

async function renderResults() {
    moviesListEl.innerHTML = `<div class="loader"></div>`
    await searchMoviesArray(searchInput.value)

    if (movies.length === 0)
        return moviesListEl.innerHTML = movieNotFoundHtml()

    moviesListEl.innerHTML = generateMoviesHtml(movies)

    const actionBtn = document.getElementsByClassName("action-btn")
    for (var i = 0; i < actionBtn.length; i++) {
        actionBtn[i].addEventListener('click', updateLocalStorage)
    }
}

searchBtn.addEventListener("click", renderResults)

