const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19101483-97eb89a6c64111aa623235b5f';

function fetchImages(query, page, perPage) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  console.log(url);

  return fetch(url).then(r => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error('Ничего не найдено'));
  });
}

export default fetchImages;
