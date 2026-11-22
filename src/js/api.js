// Loads all laptops. Throws a readable error if anything goes wrong.
export const fetchLaptops = async () => {
    try {
        const res = await fetch("./data/laptops.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { laptops } = await res.json();
        return laptops;
    } catch (err) {
        throw new Error("Could not load laptops. Make sure you are running a local server.");
    }
};
