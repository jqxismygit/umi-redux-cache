import {
    fetchList
} from '../../../services';
import { createCachedAction } from 'umi-redux-cache'

const ListModel = {
    namespace: 'list',
    state: {
        allIds: []
    },
    effects: {
        *fetchList(_, { call, put }) {
            console.log('fetchList--------->>');
            const response = yield call(fetchList);
            if (response && response.code === 200) {
                const list = response.data || [];
                // yield put({
                //     type: 'update',
                //     payload: list
                // });
                yield put(createCachedAction(_, {
                    type: 'update',
                    payload: list
                }));
            }
        }
    },
    reducers: {
        update(state, { payload }) {
            return {
                ...state,
                allIds: payload
            };
        }
    }
};

export default ListModel;