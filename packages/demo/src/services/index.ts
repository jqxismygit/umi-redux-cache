import axios from 'axios';

export async function fetchList() {
    return axios.get('/api/all').then(response => {
        const data = response.data;
        const code = response.status;
        return {
            data,
            code
        }
    })
}

export async function fetchDetail(id) {
    return axios.get(`/api/detail/${id}`).then(response => {
        const data = response.data;
        const code = response.status;
        return {
            data,
            code
        }
    })
}

