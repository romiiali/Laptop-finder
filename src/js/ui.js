// One skeleton card that matches the shape of .laptop-card
export const skeletonCard = () => `
    <div class="laptop-card">
        <div class="skeleton h-40 w-full"></div>
        <div class="skeleton h-5 w-3/4"></div>
        <div class="skeleton h-4 w-1/2"></div>
        <div class="skeleton h-6 w-1/3"></div>
        <div class="skeleton h-10 w-full"></div>
    </div>`;

export const showSkeletons = (section, n = 8) => {
    section.innerHTML = Array.from({ length: n }, skeletonCard).join("");
};

export const showError = (section, msg) => {
    section.innerHTML = `<p class="text-accent font-bold p-4">${msg}</p>`;
};

// Dims a button when it is "active" (already a favourite / already in compare)
export const setBtnState = (btn, active) => {
    btn.classList.toggle('opacity-50', active)
    btn.classList.toggle('opacity-100', !active)
}

// Heart button: one icon per theme, the theme decides which one is visible
export const favButton = (id) => `
    <button class="fav-btn" data-id="${id}" aria-label="Toggle favourite">
        <img src="./assets/heart-button-performance.svg" alt="" class="h-6 w-6 block [html[data-theme='battery']_&]:hidden hover:scale-110 hover:cursor-pointer">
        <img src="./assets/heart-button-battery.svg" alt="" class="h-6 w-6 hidden [html[data-theme='battery']_&]:block hover:scale-110 hover:cursor-pointer">
    </button>`

// One laptop card, shared by the catalogue and the favourites page.
// Use l => cardTemplate(l, { compare: true }) to add the Compare button.
export const cardTemplate = (l, { compare = false } = {}) => `
    <div class="laptop-card">
        <div class="flex flex-row justify-between gap-2">
            <h3 class="font-bold">${l.name}</h3>
            <div class="flex flex-row items-center gap-2 shrink-0">
                ${favButton(l.id)}
                ${compare ? `<button class="btn-action text-sm compare-btn" data-id="${l.id}">Compare</button>` : ''}
            </div>
        </div>
        <img src="${l.image}" alt="${l.name}" class="h-40 w-full object-cover rounded">
        <p class="text-muted">${l.brand}</p>
        <p class="text-accent font-bold">$${l.price}</p>
        <p>Category: ${l.category}</p>
        <p>CPU: ${l.cpu}</p>
        <p>${l.ramGB} GB RAM &middot; ${l.batteryHours} h battery &middot; ${l.weightKg} kg</p>
        <a href="./details.html?id=${l.id}" class="btn-action">View Details</a>
    </div>`
