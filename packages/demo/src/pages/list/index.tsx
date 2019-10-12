import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

const List = (props) => {
    const { dispatch, allIds } = props;
    React.useEffect(() => {
        dispatch({
            type: 'list/fetchList'
        });
    }, []);
    return (
        <>
            <div>List</div>
            {
                allIds && allIds.map(i => (
                    <div key={i.id} style={{ marginTop: '10px' }}>
                        <Link to={`/detail/${i.id}`}>{i.name}</Link>
                    </div>
                ))
            }

        </>
    )
}

export default connect(({ list }) => ({
    allIds: list.allIds
}))(List);