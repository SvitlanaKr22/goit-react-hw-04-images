import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '32806243-dfe26fa8cb817022a28999782';
const PER_PAGE = 12;

export async function fetchContents({ nameQuery, page }) {
  try {
    return await axios.get(
      `?q=${nameQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
  } catch (error) {
    console.error(error);
  }
}

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
