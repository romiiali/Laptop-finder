const themeButton = document.querySelector('#theme-toggle')
const saved = localStorage.getItem('theme') || 'performance';
document.documentElement.dataset.theme = saved;


themeButton.addEventListener('click',()=>{
    const curr=document.documentElement.dataset.theme
      const next = curr === 'performance' ? 'battery' : 'performance';
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme',next)
    themeButton.textContent= next === 'performance' ? "Performance Mode" : "Battery Saver Mode"
} )

export function initBtn(){
   themeButton.textContent= saved === 'performance' ? "Performance Mode" : "Battery Saver Mode"
}

export const showToast = (msg) => {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, 5000);
};

// Mobile menu: the nav links are hidden below md until the burger button is pressed
const menuBtn = document.querySelector('#menu-toggle')
const navLinks = document.querySelector('#nav-links')
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const closed = navLinks.classList.toggle('max-md:hidden')
    menuBtn.setAttribute('aria-expanded', String(!closed))
  })
}
