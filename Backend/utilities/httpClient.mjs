const BASE_URL = "http://localhost:3000";

export const fetchData = async (endpoint) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`htto error status: ${response.status}`);
  }
  return await response.json();
};
