// All localStorage access lives here, so every page shares the same data.
const FAV_KEY = "favourites"
const COMPARE_KEY = "Compare"
export const MAX_COMPARE = 4

const read = (key) => JSON.parse(localStorage.getItem(key)) || []
const write = (key, list) => localStorage.setItem(key, JSON.stringify(list))

export const getFavs = () => read(FAV_KEY)
export const getCompare = () => read(COMPARE_KEY)

export const removeFromCompare = (id) =>
    write(COMPARE_KEY, getCompare().filter(c => c !== Number(id)))

// returns true if the laptop is now a favourite, false if it was removed
export const toggleFav = (id) => {
    id = Number(id)
    const favs = getFavs()
    const exists = favs.includes(id)
    write(FAV_KEY, exists ? favs.filter(f => f !== id) : [...favs, id])
    if (exists) removeFromCompare(id)   // keep the compare list in sync
    return !exists
}

// returns true (added), false (removed) or null (4 already selected, so a 5th is blocked)
export const toggleCompare = (id) => {
    id = Number(id)
    const comps = getCompare()
    const exists = comps.includes(id)
    if (!exists && comps.length >= MAX_COMPARE) return null
    write(COMPARE_KEY, exists ? comps.filter(c => c !== id) : [...comps, id])
    return !exists
}

export const clearFavs = () => {
    localStorage.removeItem(FAV_KEY)
    localStorage.removeItem(COMPARE_KEY)
}
