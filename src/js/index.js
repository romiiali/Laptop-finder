import "./theme.js";
import { initBtn } from "./theme.js";

const res = await fetch("./data/laptops.json");
const { laptops } = await res.json();

const count = laptops.length;
const cheapest = laptops.reduce((min, l) => (l.price < min.price ? l : min)).price;

const laptopsCount = document.querySelector('#laptops-count');
const lowestPrice = document.querySelector('#lowest-price');
const Favs = document.querySelector('#favs-saved');

// localStorage.removeItem("favourites");

laptopsCount.innerHTML = `<p>Number of laptops available
<span class="stats-span">${count}</span></p>`;

lowestPrice.innerHTML = `<p>Prices Starting From $
<span class="stats-span">${cheapest}</span></p>`;

const renderFavs = () => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    Favs.innerHTML = `<p>You have
    <span class="stats-span">${favourites.length}</span>
    in <a href="./favourites.html">Favourites</a></p>`;
};

renderFavs();

window.addEventListener('pageshow', renderFavs);

window.addEventListener('storage', (e) => {
    if (e.key === "favourites") renderFavs();
});

initBtn();