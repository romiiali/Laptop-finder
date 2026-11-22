import "./theme.js";
import { initBtn, showToast } from "./theme.js";


initBtn();


//we want to map over each laptop item and display in a card
const res = await fetch("./data/laptops.json");
const { laptops } = await res.json();

const section = document.querySelector('#catalouge')

const getCompare = ()=> JSON.parse(localStorage.getItem("Compare")) || []
