const themeButton = document.querySelector('#theme-toggle')

themeButton.addEventListener('click',()=>{
    const curr = document.documentElement.dataset.theme
      const next = curr === 'performance' ? 'battery' : 'performance';
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme',next)
    themeButton.textContent= next === 'performance' ? "Performance Mode" : "Battery Saver Mode"
} )

export function initBtn(){
   themeButton.textContent= document.documentElement.dataset.theme === 'performance' ? "Performance Mode" : "Battery Saver Mode"
}