import _ from 'lodash';

const fetchList = () => {
    return [
        {
            id: 1,
            name: 'a',
        },
        {
            id: 2,
            name: 'b'
        }
    ]
}

const fetchDetail = () => {
    return {
        id: '1',
        name: 'a'
    }
}

export default {

    //平台相关API
    'GET /all': fetchList(),
    'GET /detail': fetchDetail(),
};