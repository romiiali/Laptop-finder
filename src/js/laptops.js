import "./theme.js";
import { initBtn } from "./theme.js";


initBtn();


//we want to map over each laptop item and display in a card
const res = await fetch("./data/laptops.json");
const { laptops } = await res.json();

const section = document.querySelector('#catalouge')
section.innerHTML= laptops.map((l)=>{
    return `
    <div class="laptop-card">
        <h3 class="font-bold">${l.name}</h3>
        <p class="text-muted">${l.brand}</p>
        <p class="text-accent font-bold">$${l.price}</p>
        <p>category: ${l.category}</p>
        <p>Weight ${l.weightKg}</p>
        <a href="./details.html?id=${l.id}" class="btn-action">View Details</a>
    </div>
    `
}).join("")
