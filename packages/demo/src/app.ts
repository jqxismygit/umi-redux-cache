import { middleware, effect } from 'umi-redux-cache'

export const dva = {
    config: {
        onError(err: ErrorEvent) {
            err.preventDefault();
            console.error(err.message);
        },
        onAction: middleware,
        onEffect: effect
    },
};
