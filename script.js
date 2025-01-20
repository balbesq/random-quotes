import quotes from './quotes.js'

const quoteText = document.getElementById('quote')
const generateBtn = document.getElementById('generate__btn')

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomIndex]
  const quote = `<em>“${randomQuote.quote}”</em> <br> ${randomQuote.author}`
  quoteText.innerHTML = quote
  
}
quoteText.textContent = 'click to generate quote'
generateBtn.addEventListener('click', generateQuote)

