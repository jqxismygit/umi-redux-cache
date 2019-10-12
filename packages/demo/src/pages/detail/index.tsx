import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
const Detail = (props) => {
    const { dispatch, content, match } = props;
    const { params } = match;

    React.useEffect(() => {
        dispatch({
            type: 'detail/fetchDetail',
            payload: {
                id: params.id
            }
        });
    }, []);

    return (
        <>
            <Link to={'/'}>返回</Link>
            <div>{content && content.name}</div>
        </>
    )
}

export default connect(({ detail }) => ({
    content: detail.content
}))(Detail);