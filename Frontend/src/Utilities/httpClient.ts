const BASE_URL = "http://localhost:5001/api";

export const fetchData = async (endpoint: string) => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error - Status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchData", error);
    throw error;
  }
};
