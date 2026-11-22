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
