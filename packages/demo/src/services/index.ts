import axios from 'axios';

export async function fetchList() {
    return axios.get('/all').then(response => {
        const data = response.data;
        const code = response.status;
        return {
            data,
            code
        }
    })
}

export async function fetchDetail() {
    return axios.get('/detail').then(response => {
        const data = response.data;
        const code = response.status;
        return {
            data,
            code
        }
    })
}

