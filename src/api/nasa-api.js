/**
 * API docs, from the email document
 * https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
 */

const API_BASE_URL = 'https://images-api.nasa.gov';


export const searchNasaImages = async (params) => {
  const queryParams = new URLSearchParams();
  
  if (params.q) queryParams.append('q', params.q);
  if (params.media_type) queryParams.append('media_type', params.media_type);
  if (params.year_start) queryParams.append('year_start', params.year_start);
  if (params.year_end) queryParams.append('year_end', params.year_end);
  
  const response = await fetch(`${API_BASE_URL}/search?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.status}`);
  }
  
  return await response.json();
};

export const getAssetById = async (nasaId) => {
  const response = await fetch(`${API_BASE_URL}/asset/${nasaId}`);
  
  if (!response.ok) {
    throw new Error(response.status);
  }
  
  return await response.json();
};