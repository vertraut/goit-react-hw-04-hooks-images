const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19101483-97eb89a6c64111aa623235b5f';
let perPage = 12;

function fetchImages(query, page) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  return fetch(url).then(r => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error('Ничего не найдено'));
  });
}

export default fetchImages;
