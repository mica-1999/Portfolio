/**
 * Fetches data from the API based on the route and user ID.
 * @param {string} route - The API endpoint to fetch data from.
 * @param {string} [userId] - The user ID to include in the query (optional).
 * @returns {Promise<Object|null>} - The fetched data or null if an error occurs.
 */

export const fetchDataFromApi = async (route, userId) => {
    try {
        const url = userId ? `${route}?userId=${userId}` : route;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${route}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${route}:`, error);
        throw error;
    }
};

export const getRandUserPassword = (fName, lName) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const value = `${fName.charAt(0).toLowerCase()}${lName.toLowerCase()}${randomNum}`;
    
    return { username: value, password: value };
};
