import { middleware, effect } from 'umi-redux-cache'

export const dva = {
    config: {
        onAction: middleware,
        onEffect: effect
    },
};
