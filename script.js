import quotes from './quotes.js'

const quoteText = document.getElementById('quote')
const generateBtn = document.getElementById('generate__btn')
const like = document.getElementById('like')
const favorites = document.getElementById('favorites')
const favoriteQuote = document.getElementById('favoriteQuote')

let isLikeState = false
let isFavoriteState = false
let currentQuoteIndex = 0

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomIndex]
  currentQuoteIndex = randomIndex

  const quote = `<em>“${randomQuote.quote}”</em> <br> ${randomQuote.author}`
  quoteText.innerHTML = quote

  if (quotes[randomIndex].isLike === true) {
    isLikeState = true
    updateLikeButton()
  } else {
    isLikeState = false
    updateLikeButton()
  }
}

function toggleLike() {
  isLikeState = !isLikeState
  quotes[currentQuoteIndex].isLike = isLikeState
  updateLikeButton()
  if (isFavoriteState === true) {
    updateFavoritesButton()
    showFavorites()
  }
}

function updateLikeButton() {
    if (isLikeState === true) {
    like.innerHTML = `<svg data-slot="icon" fill="white" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="25px" height="25px">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
          </svg>`
  } else {
    like.innerHTML = `<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="25px" height="25px">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
          </svg>`

  }
}


function toggleFavorites() {
  isFavoriteState = !isFavoriteState
  updateFavoritesButton()
  showFavorites()
}

function updateFavoritesButton() {
  if (isFavoriteState === true) {
    favorites.innerHTML = `Favorites <svg data-slot="icon" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="25px" height="25px">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
</svg>`
  } else {
    favorites.innerHTML = `Favorites
      <svg data-slot="icon" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="25px" height="25px">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
      </svg>`
    favoriteQuote.innerHTML = ''
  }
}

function showFavorites() {
  const favoriteQuotes = quotes.filter(quote => quote.isLike)
  if (favoriteQuotes.length === 0) {
    favoriteQuote.innerHTML = 'There are no favorite quotes yet'
    updateFavoritesButton()
    return
  }

  favoriteQuote.innerHTML = favoriteQuotes.map(quote => `
      <div class="favorite-card">
        <p><em>“${quote.quote}”</em> ${quote.author}</p>
      </div>
     `).join('')
  updateFavoritesButton()
}

updateFavoritesButton()
updateLikeButton()

quoteText.textContent = 'click to generate quote'

generateBtn.addEventListener('click', generateQuote)
like.addEventListener('click', toggleLike)
favorites.addEventListener('click', toggleFavorites)
