import "./theme.js";
import { initBtn, showToast } from "./theme.js";


initBtn();


//we want to map over each laptop item and display in a card
const res = await fetch("./data/laptops.json");
const { laptops } = await res.json();

const section = document.querySelector('#catalouge')
const cardTemplate= (l)=> `
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
const bindfavs= ()=>{
    const favBtn = document.querySelectorAll('.fav-btn')
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
}


    //now we need a search bar that changes the seen laptops everytime we keydown
    let searchTerm = ""
    let category =""
    let sortBy="price-asc"
    const sorters={
        "price-asc":  (a, b) => a.price - b.price,
        "price-dsc": (a, b) => b.price - a.price,
        "RAM-asc":  (a, b) => a.ramGB - b.ramGB,
        "RAM-dsc": (a, b) => b.ramGB - a.ramGB,
        "battery-asc":  (a, b) => a.batteryHours - b.batteryHours,
        "battery-dsc": (a, b) => b.batteryHours - a.batteryHours,
        "weight-asc":  (a, b) => a.weightKg - b.weightKg,
        "weight-dsc": (a, b) => b.weightKg - a.weightKg,

    }
    const render = ()=>{
        const filtered = laptops.filter(l =>{
        const matchSearch = l.name.toLowerCase().includes(searchTerm) || l.brand.toLowerCase().includes(searchTerm)
        const matchCategory = !category || l.category === category
        return matchSearch && matchCategory
        })
        const sorted=[...filtered].sort(sorters[sortBy])
        section.innerHTML=sorted.map(cardTemplate).join("")
        bindfavs()
    }


    document.querySelector('#search').addEventListener('input',(e)=>{
        searchTerm= e.target.value.toLowerCase()
        render()
    })
    //we need a dropdown that arranges laptops (prices lowest to highest, rams lowest to highest, select brand, select category)

    document.querySelector('#category').addEventListener('change', (e)=>{
        category=e.target.value
        render()
    })

    document.querySelector('#sort-filter').addEventListener('change',(e)=>{
        sortBy=e.target.value
        render();
    })

    render()
