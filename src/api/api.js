import axios from "axios";

const API_KEY = '30250701-58f241540210259817e57fd57';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchData = async (searchQuery, page) => {
  const searchParams = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
  })
  
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&${searchParams}`
  );
  return response.data;
};

// export const fetchData = async searchQuery => {
//     const response = axios
//         .get(BASE_URL, {
//             parametrs: {
//                 key: API_KEY,
//                 q: searchQuery,
//                 image_type: 'photo',
//                 orientation: 'horizontal',
//                 per_page: 12,
//                 page: 1,
            
//             },
//         })
//     return response.data;
// };





