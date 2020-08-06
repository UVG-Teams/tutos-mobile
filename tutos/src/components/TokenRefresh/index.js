import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../tools/actions/auth';

const TokenRefresh = ({
    onRefresh,
    reviewTime = 300000     // 5 min
}) => {
    useEffect(
        () => {
            const interval = setInterval(onRefresh, reviewTime);
            return () => {
                clearInterval(interval);
            };
        },
        []
    );
    return null;
};

export default connect(
    undefined,
    dispatch => ({
        onRefresh() {
            dispatch(actions.startTokenRefresh());
        },
    }),
)(TokenRefresh);
