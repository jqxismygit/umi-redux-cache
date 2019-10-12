import {
    fetchDetail
} from '../../../services';
import { createCachedAction } from 'umi-redux-cache'

const DetailModel = {
    namespace: 'detail',
    state: {
        content: {}
    },
    effects: {
        *fetchDetail(effectAction, { call, put }) {

            const response = yield call(fetchDetail, effectAction.payload.id);
            if (response && response.code === 200) {
                const detail = response.data || {};
                // yield put({
                //     type: 'update',
                //     payload: detail
                // });
                yield put(createCachedAction(effectAction, {
                    type: 'update',
                    payload: detail
                }))
            }
        }
    },
    reducers: {
        update(state, { payload }) {
            return {
                ...state,
                content: payload
            };
        }
    }
};

export default DetailModel;