import quotes from './quotes.js'

import { generateRandomInt } from './utils.js'

const quoteText = document.getElementById('quote')
const generateBtn = document.getElementById('generate__btn')
const like = document.getElementById('like')
const favorites = document.getElementById('favorites')
const favoriteQuote = document.getElementById('favoriteQuote')
const deleteLike = document.getElementById('deleteLike')

let isLikeState = false
let isFavoriteState = false
let currentQuoteIndex = 0

function generateQuote() {
  const randomIndex = generateRandomInt(quotes.length)
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

  favoriteQuote.innerHTML = favoriteQuotes.map((quote, index) => `
      <div class="favorite-card data-index='${index}'">
        <p><em>“${quote.quote}”</em> - ${quote.author}</p>
        <button id='deleteLike' class="generate__btn deleteLike__btn" data-index='${quotes.indexOf(quote)}'>
          <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="20px" heigh="20px">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
          </svg>
        </button>
      </div>
     `).join('')
  updateFavoritesButton()
}


function removeLike(event) {
  const deleteBtn = event.target.closest('.deleteLike__btn')
  if (!deleteBtn) return

  const quoteIndex = deleteBtn.dataset.index
  if (quoteIndex !== undefined) {
    quotes[quoteIndex].isLike = false
    showFavorites()
    isLikeState = false
    updateLikeButton()
  }
}


updateFavoritesButton()
updateLikeButton()

quoteText.textContent = 'click to generate quote'

generateBtn.addEventListener('click', generateQuote)
like.addEventListener('click', toggleLike)
favorites.addEventListener('click', toggleFavorites)
favoriteQuote.addEventListener('click', removeLike)
