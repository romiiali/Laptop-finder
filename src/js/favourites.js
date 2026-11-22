import "./theme.js";
import { initBtn, showToast } from "./theme.js";
import { fetchLaptops } from "./api.js";
import { showSkeletons, showError, setBtnState, cardTemplate } from "./ui.js";
import { getFavs, toggleFav, getCompare, toggleCompare, clearFavs } from "./storage.js";

initBtn();

const section = document.querySelector('#catalouge')
let laptops = []
showSkeletons(section, 3)          // skeleton shows first
try {
    laptops = await fetchLaptops();
} catch (err) {
    showError(section, err.message);   // clear error message
    throw err;                         // stop: nothing to render without data
}

const showEmptyIfNeeded = ()=>{
    if(!section.querySelector('.laptop-card')){
        section.innerHTML = `<p class="text-muted col-span-full">No favourites yet</p>`
    }
}

// filter() keeps only the saved laptops, map() turns each one into a card
const favLaptops = laptops.filter(l=>getFavs().includes(l.id))
section.innerHTML = favLaptops.map(l => cardTemplate(l, { compare: true })).join("")
showEmptyIfNeeded()

document.querySelectorAll('.fav-btn').forEach(btn => {
    const id = Number(btn.dataset.id)
    setBtnState(btn, getFavs().includes(id))

    btn.addEventListener('click', ()=>{
        const isFav = toggleFav(id)
        const name = laptops.find(l => l.id===id)?.name ?? "item"
        setBtnState(btn, isFav)
        if(!isFav){
            btn.closest('.laptop-card').remove()
            showEmptyIfNeeded()
        }
        showToast(isFav ? `${name} added to favourites` : `${name} is removed from favourites`)
    })
})

document.querySelectorAll('.compare-btn').forEach(btn => {
    const id = Number(btn.dataset.id)
    setBtnState(btn, getCompare().includes(id))

    btn.addEventListener('click', ()=>{
        const isCompare = toggleCompare(id)
        const name = laptops.find(l => l.id===id)?.name ?? "item"
        if(isCompare === null){
            return showToast(`Compare is full (max 4) - remove a laptop first`)
        }
        setBtnState(btn, isCompare)
        showToast(isCompare ? `${name} added to Compare` : `${name} is removed from Compare`)
    })
})

const clearAllBtn = document.querySelector('.clear-all')
clearAllBtn.innerHTML = `<button class="btn-action">Clear All</button>`
clearAllBtn.addEventListener('click', ()=>{
    clearFavs()
    section.innerHTML = `<p class="text-muted col-span-full">No favourites yet</p>`
    showToast("All favourites cleared")
})
