
import "./theme.js";
import { initBtn } from "./theme.js";


//we want  to generate the stats 
const res = await fetch("./data/laptops.json")
const {laptops} = await res.json()
//number of avaliable laptops
const count = laptops.length
//lowest laptop price
const cheapest = laptops.reduce((min,l)=> l.price < min.price ? l : min).price
//number of favourites
const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
const favCount=favourites.length


const laptopsCount = document.querySelector('#laptops-count')
const lowestPrice = document.querySelector('#lowest-price')
const Favs = document.querySelector('#favs-saved')
const dataTheme = document.documentElement.dataset.theme
const themeButton = document.querySelector('#theme-toggle')

laptopsCount.innerHTML = `<p>Number of laptops available 
<span class="stats-span">${count}</span>
 </p>`
lowestPrice.innerHTML= `<p>Prices Starting From $
<span class="stats-span">${cheapest}</span>
</p>`
Favs.innerHTML = `<p> You have 
<span class="stats-span">${favCount}</span>
 in <a href="./favourites.html">Favourites</a>
</p>`

initBtn();
