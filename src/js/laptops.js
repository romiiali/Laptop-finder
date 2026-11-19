import "./theme.js";
import { initBtn, showToast } from "./theme.js";


initBtn();


//we want to map over each laptop item and display in a card
const res = await fetch("./data/laptops.json");
const { laptops } = await res.json();

const section = document.querySelector('#catalouge')
section.innerHTML= laptops.map((l)=>{
    return `
    <div class="laptop-card">
    <div class="flex flex-row justify-between "> <h3 class="font-bold">${l.name}</h3> 
    <button class="fav-btn" data-id="${l.id}">
    <img src="./assets/heart-button-performance.svg" alt="fav" class="h-6 w-6 block [html[data-theme='battery']_&]:hidden hover:scale-110  hover:cursor-pointer " ">
    <img src="./assets/heart-button-battery.svg" alt="fav" class="h-6 w-6 hidden [html[data-theme='battery']_&]:block hover:scale-110  hover:cursor-pointer ">
    </button>
    </div>
        <p class="text-muted">${l.brand}</p>
        <p class="text-accent font-bold">$${l.price}</p>
        <p>category: ${l.category}</p>
        <p>Weight ${l.weightKg}</p>
        <a href="./details.html?id=${l.id}" class="btn-action">View Details</a>
    </div>
    `
}).join("")

const favBtn = document.querySelectorAll('.fav-btn')
const getFavs = ()=> JSON.parse(localStorage.getItem("favourites")) || []
const toggleFav = (id)=>{
    const favs= getFavs()
    const exists = favs.includes(id)
    const next=exists ? favs.filter(f=>f!==id) : [...favs, Number(id)]
    localStorage.setItem("favourites", JSON.stringify(next))
    return !exists
}

const setBtnState = (btn,isFav)=>{
    btn.classList.toggle('opacity-50',isFav)
    btn.classList.toggle('opacity-100',!isFav)
}

favBtn.forEach(
    btn => {
        const id=Number(btn.dataset.id)
        setBtnState(btn,getFavs().includes(id))

        btn.addEventListener('click', ()=>{
            const isFav = toggleFav(id)
            const name = laptops.find((l)=> l.id===id)?.name ?? "item";
            setBtnState(btn,isFav)
            showToast(isFav? `${name} added to favourites` : `${name} is removed from favourites`)
        })
    })
