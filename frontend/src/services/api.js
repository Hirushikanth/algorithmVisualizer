import axios from 'axios';

// The base URL connects to your Spring Boot backend
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const sortAPI = {
    /**
     * Triggers the Bubble Sort algorithm on the backend.
     * @param {number[]} array - The un-sorted array
     * @returns {Promise<Object[]>} - Array of step objects { array: [], highlight: [] }
     */
    getBubbleSortSteps: async (array) => {
        try {
            const response = await apiClient.post('/sort/bubble', { array });
            return response.data;
        } catch (error) {
            console.error("API Error: Failed to fetch sorting steps", error);
            // Return a safe fallback so the frontend doesn't crash
            return [];
        }
    },

    getSelectionSortSteps: async (array) => {
        try {
            const response = await apiClient.post('/sort/selection', { array });
            return response.data;
        } catch (error) {
            console.error("API Error: Selection Sort", error);
            return [];
        }
    },

    getInsertionSortSteps: async (array) => {
        try {
            const response = await apiClient.post('/sort/insertion', { array });
            return response.data;
        } catch (error) {
            console.error("API Error: Insertion Sort", error);
            return [];
        }
    }
};