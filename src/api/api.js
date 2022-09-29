import axios from "axios";

const API_KEY = '30250701-58f241540210259817e57fd57';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchData(searchQuery) {
    const response = await axios
        .get(BASE_URL,{parametrs:{
            key: API_KEY,
            q: searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page: 1,
            
        },
    })
        .then(result => response.data)
        .catch(error => console.log(error))
    
}



