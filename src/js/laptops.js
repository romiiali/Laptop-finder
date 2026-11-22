import "./theme.js";
import { initBtn, showToast } from "./theme.js";
import { fetchLaptops } from "./api.js";
import { showSkeletons, showError, setBtnState, cardTemplate } from "./ui.js";
import { getFavs, toggleFav } from "./storage.js";

initBtn();

const section = document.querySelector('#catalouge')
let laptops = []

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
        // "battery-asc":  (a, b) => a.batteryHours - b.batteryHours,
        // "battery-dsc": (a, b) => b.batteryHours - a.batteryHours,
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
        const resSize = ()=> filtered.length == 0 ? 'No result found' : `${filtered.length} Results Found`
        document.querySelector('.result-count').innerHTML=`<p>${resSize()}</p>`
        section.innerHTML=sorted.map(l => cardTemplate(l)).join("")
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

    showSkeletons(section)                  // 1. skeleton shows first
    try {
        laptops = await fetchLaptops()      // 2. wait for data
        render()                            // 3. draw the cards
    } catch (err) {
        showError(section, err.message)     // 4. clear error message on failure
    }
