import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
const Detail = (props) => {
    const { dispatch } = props;

    React.useEffect(() => {
        dispatch({
            type: 'detail/fetchDetail',
            payload: {
                id: 1
            }
        });
    }, []);
    
    return (
        <>
            <div>Detail</div>
            <Link to={'/'}>返回</Link>
        </>
    )
}

export default connect()(Detail);