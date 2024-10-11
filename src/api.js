const API_URL = 'https://v2.api.noroff.dev/online-shop';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return await response.json();
};