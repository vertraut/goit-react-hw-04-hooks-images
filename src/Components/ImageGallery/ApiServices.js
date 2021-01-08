const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19101483-97eb89a6c64111aa623235b5f';

let currentPage = 1;
let perPage = 12;

// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

function apiFetch(query) {
  fetch(
    `${BASE_URL}?q=${query}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
  )
    .then(r => r.json())
    .then(images => images.hits);
}

export default apiFetch;
