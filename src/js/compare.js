import "./theme.js";
import { initBtn, showToast } from "./theme.js";
import { fetchLaptops } from "./api.js";
import { showSkeletons, showError, setBtnState } from "./ui.js";
import { getFavs, getCompare, toggleFav, removeFromCompare } from "./storage.js";


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
    <div class="compare-card" data-id="${l.id}">
            <button class ="btn-ghost remove-comp" data-id="${l.id}">Remove</button>
            <h1 class="text-accent font-bold text-xl " data-spec="name">${l.name}</h1>
            <p data-spec="brand"> ${l.brand}</p>
            <p data-spec="price">$ ${l.price}</p>
            <p data-spec="cpu">CPU ${l.cpu}</p>
            <p data-spec="ramGB">${l.ramGB} RAMs</p>
            <p data-spec="storageGB">${l.storageGB} GBs</p>
            <p data-spec="batteryHours">${l.batteryHours} Amp/Hr</p>
            <p data-spec="weightKg">${l.weightKg} Kg</p>
            <p data-spec="screenInches">${l.screenInches} inches</p>
            <div class="flex flex-row gap-3 ">
                 <button class="fav-btn" data-id="${l.id}">
                    <img src="./assets/heart-button-performance.svg" alt="fav" class="h-6 w-6 block [html[data-theme='battery']_&]:hidden hover:scale-110  hover:cursor-pointer ">
                    <img src="./assets/heart-button-battery.svg" alt="fav" class="h-6 w-6 hidden [html[data-theme='battery']_&]:block hover:scale-110  hover:cursor-pointer ">
                </button>
                <a href="./details.html?id=${l.id}" class="btn-action" >Details</a>
            </div>
           
        </div>
    `


const compLaptops = laptops.filter(l=>getCompare().includes(l.id))
section.innerHTML=compLaptops.map(cardTemplate).join("")

//we need to highlight lowest price-weight , highest ram-storage-battery-screeninches

const highlightBest= (key,mode)=>{
    const current = laptops.filter(l=>getCompare().includes(l.id))
    if(current.length < 2) return
    const values = current.map(l=>l[key])
    const best = mode === 'min' ? Math.min(...values) : Math.max(...values)
    current.filter( l=>l[key]===best).forEach(
        l=>{
            section.querySelector(`.compare-card[data-id="${l.id}"] [data-spec="${key}"]`)?.classList.add('best-value')
        }
    )
}

const highlightAll = ()=>{
    section.querySelectorAll('.best-value').forEach(el=>el.classList.remove('best-value'))
    highlightBest('price','min')
    highlightBest('weightKg','min')
    highlightBest('ramGB', 'max')
    highlightBest('storageGB', 'max')
    highlightBest('batteryHours', 'max')
    highlightBest('screenInches', 'max')
}

highlightAll()


const showEmptyIfNeeded = ()=>{
    const count = section.querySelectorAll('.compare-card').length

    if(count === 0){
        section.innerHTML = `<p class="text-muted">Nothing to compare yet</p>`
    }
    else if(count < 2){
        section.innerHTML = `<p class="text-muted">Add more laptops to compare</p>`
    }else if(count > 4){
        section.innerHTML = `<p class="text-muted">Too many laptops - remove some to compare</p>`
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
            btn.closest('.compare-card').remove()
            highlightAll()
            showEmptyIfNeeded()
        }
        showToast(isFav? `${name} added to favourites` : `${name} is removed from favourites`)
    })
})

const removeCompBtn = document.querySelectorAll('.remove-comp')
removeCompBtn.forEach(
btn => {
    const id=Number(btn.dataset.id)

    btn.addEventListener('click', ()=>{

        const name = laptops.find((c)=> c.id===id)?.name ?? "item";
        removeFromCompare(id)
        btn.closest('.compare-card').remove()
        highlightAll()
        showEmptyIfNeeded()
        showToast(`${name} is removed from Compare`)
    })
})
