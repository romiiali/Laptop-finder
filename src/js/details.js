import "./theme.js";
import { initBtn,showToast } from "./theme.js";

initBtn();

const res = await fetch("./data/laptops.json");
const { laptops } = await res.json();

const params = new URLSearchParams(window.location.search)
const id = Number(params.get("id"))

const laptop = laptops.find(l=>l.id===id)

const section = document.querySelector('#catalouge')

if(!laptop){
    section.innerHTML=`<p class="text-muted">laptop not found</p>`
}else{
    section.innerHTML = `
    <div class="laptop-card">
    <div class="flex flex-row justify-end">
      <button class="fav-btn" data-id="${laptop.id}">
    <img src="./assets/heart-button-performance.svg" alt="fav" class="h-6 w-6 block [html[data-theme='battery']_&]:hidden hover:scale-110  hover:cursor-pointer ">
    <img src="./assets/heart-button-battery.svg" alt="fav" class="h-6 w-6 hidden [html[data-theme='battery']_&]:block hover:scale-110  hover:cursor-pointer ">
    </button>
    </div>
      <img src="${laptop.image}" alt="${laptop.name}" class="h-64 w-full object-cover rounded">
      <h2 class="font-bold text-2xl">${laptop.name}</h2>
      <p class="text-muted">${laptop.brand}</p>
      <p class="text-accent font-bold text-xl">$${laptop.price}</p>
      <p class="prose text-gray-400 ">${laptop.description}</p>
      <table class="w-full text-left mt-4">
        <tbody>
          <tr><th class="p-2">CPU</th><td class="p-2 text-accent">${laptop.cpu}</td></tr>
          <tr><th class="p-2">RAM</th><td class="p-2 text-accent">${laptop.ramGB} GB</td></tr>
          <tr><th class="p-2">Storage</th><td class="p-2 text-accent">${laptop.storageGB} GB</td></tr>
          <tr><th class="p-2">Battery</th><td class="p-2 text-accent">${laptop.batteryHours} h</td></tr>
          <tr><th class="p-2">Weight</th><td class="p-2 text-accent">${laptop.weightKg} kg</td></tr>
          <tr><th class="p-2">Screen</th><td class="p-2 text-accent">${laptop.screenInches}"</td></tr>
          <tr><th class="p-2">Category</th><td class="p-2 text-accent">${laptop.category}</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

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
