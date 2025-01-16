const quotes = ["“I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best”― Marilyn Monro",
   "“So many books, so little time.”― Frank Zappa", 
   "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”― Albert Einstein",
   "“You only live once, but if you do it right, once is enough.”― Mae West"]

const quoteText = document.getElementById('quote')
const generateBtn = document.getElementById('generate__btn')

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomIndex]
  quoteText.textContent = randomQuote
}
quoteText.textContent = 'tap to generate quote'
generateBtn.addEventListener('click', generateQuote)

