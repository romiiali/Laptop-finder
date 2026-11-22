import "./theme.js";
import { initBtn, showToast } from "./theme.js";
import { fetchLaptops } from "./api.js";
import { showSkeletons, showError } from "./ui.js";


initBtn();

//we want to map over each laptop item and display in a card
const section = document.querySelector('#catalouge')
let laptops = []
showSkeletons(section, 3)      
try {
    laptops = await fetchLaptops();
} catch (err) {
    showError(section, err.message);   
    throw err;                      
}

const cardTemplate= (l)=> `
    <div class="laptop-card w-full md:w-3/4 lg:w-1/2 flex flex-col-reverse sm:flex-row-reverse justify-between gap-4">
    <div class="w-full ">
    <div class="flex flex-row flex-wrap gap-2 justify-between ">
        <h3 class="font-bold">${l.name}</h3> 
        <div class="flex flex-row items-center gap-2 shrink-0">
            <button class="fav-btn" data-id="${l.id}">
            <img src="./assets/heart-button-performance.svg" alt="fav" class="h-6 w-6 block [html[data-theme='battery']_&]:hidden hover:scale-110  hover:cursor-pointer ">
            <img src="./assets/heart-button-battery.svg" alt="fav" class="h-6 w-6 hidden [html[data-theme='battery']_&]:block hover:scale-110  hover:cursor-pointer ">
            </button>
            <button class="btn-action text-sm compare-btn"  data-id="${l.id}">Compare</button>
        </div>
    </div>
        <p class="text-muted">${l.brand}</p>
        <p class="text-accent font-bold">$${l.price}</p>
        <p>category: ${l.category}</p>
        <p>Weight ${l.weightKg}</p>
        <a href="./details.html?id=${l.id}" class="btn-action">View Details</a>
    </div>
    <div>
        <img src="${l.image}" alt="${l.name}" class="h-40 w-full sm:h-full sm:w-40 object-cover rounded">
    </div>
    </div>
    `

const getFavs = ()=> JSON.parse(localStorage.getItem("favourites")) || []
const favLaptops = laptops.filter(l=>getFavs().includes(l.id))
section.innerHTML=favLaptops.map(cardTemplate).join("")

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

const showEmptyIfNeeded = ()=>{
    if(!section.querySelector('.laptop-card')){
        section.innerHTML = `<p class="text-muted">No favourites yet</p>`
    }
}
showEmptyIfNeeded()

const favBtn = document.querySelectorAll('.fav-btn')
favBtn.forEach(
btn => {
    const id=Number(btn.dataset.id)
    setBtnState(btn,getFavs().includes(id))

    btn.addEventListener('click', ()=>{
        const isFav = toggleFav(id)
        const name = laptops.find((l)=> l.id===id)?.name ?? "item";
        setBtnState(btn,isFav)
        if(!isFav){
            localStorage.setItem("Compare", JSON.stringify(getCompare().filter(c=>c!==id)))
            btn.closest('.laptop-card').remove()
            showEmptyIfNeeded()
        }
        showToast(isFav? `${name} added to favourites` : `${name} is removed from favourites`)
    })
})

const compareBtn = document.querySelectorAll('.compare-btn')
const getCompare = ()=> JSON.parse(localStorage.getItem("Compare")) || []

const toggleCompare = (id)=>{

    const comps= getCompare()
    const exists = comps.includes(id)
    
    if(!exists && comps.length >4){
        return null
    }
    const next=exists ? comps.filter(c=>c!==id) : [...comps, Number(id)]
    localStorage.setItem("Compare", JSON.stringify(next))
    return !exists
    
}
compareBtn.forEach(
btn => {
    const id=Number(btn.dataset.id)
    setBtnState(btn,getCompare().includes(id))

    btn.addEventListener('click', ()=>{
        const isCompare = toggleCompare(id)
        const name = laptops.find((c)=> c.id===id)?.name ?? "item";
        if(isCompare===null){
            return showToast(`Compare is Full - Remove laptop to compare`)
        }
        setBtnState(btn,isCompare)
        showToast(isCompare? `${name} added to Compare` : `${name} is removed from Compare`)
    })
})
const clearAllBtn = document.querySelector('.clear-all')

clearAllBtn.innerHTML = `<button class="btn-action">Clear All</button>`
clearAllBtn.addEventListener('click', ()=>{
    localStorage.removeItem("favourites");
    localStorage.removeItem("Compare");
    section.innerHTML = `<p class="text-muted">No favourites yet</p>`
    showToast("All favourites cleared");
})
