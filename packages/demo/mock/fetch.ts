import _ from 'lodash';

const fetchList = () => {
    return [
        {
            id: 1,
            name: '第一项',
        },
        {
            id: 2,
            name: '第二项'
        }
    ]
}

const fetchDetail = (id) => {
    if (id === 1) {
        return {
            id: '1',
            name: '第一项'
        }
    } else {
        return {
            id: '2',
            name: '第二项'
        }
    }

}


export default {

    //平台相关API
    'GET /api/all': fetchList(),
    //简单这么写下
    'GET /api/detail/1': fetchDetail(1),
    'GET /api/detail/2': fetchDetail(2),
};