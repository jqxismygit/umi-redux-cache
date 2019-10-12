const CACHE_SINGLE = Symbol('$$cache-proxy$$');

const cache = {};

export const middleware = store => next => action => {
    if (action && action[CACHE_SINGLE]) {
        cache[action[CACHE_SINGLE]] = true;
    }
    next(action);
}

export const effect = (effect, { put }, model, actionType) => {
    return function* (...args) {
        if (args && args.length > 0 && !cache[JSON.stringify(args[0])]) {
            yield effect(...args);
        }
    }
}

export const createCachedAction = (proxyAction, currentAction) => {
    if (proxyAction) {
        const single = JSON.stringify(proxyAction);
        return {
            ...currentAction,
            [CACHE_SINGLE]: single
        }
    } else {
        return currentAction;
    }
}