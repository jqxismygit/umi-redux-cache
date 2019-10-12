import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

const List = (props) => {
    const { dispatch } = props;
    React.useEffect(() => {
        dispatch({
            type: 'list/fetchList'
        });
    }, []);
    return (
        <>
            <div>List</div>
            <Link to={'/detail'}>详情</Link>
        </>
    )
}

export default connect()(List);