import { Middleware, Action } from 'redux'
const CACHE_SINGLE = Symbol('$$cache-proxy$$');

const cache: object = {};

export const middleware: Middleware = store => next => action => {
    if (action && action[CACHE_SINGLE]) {
        cache[action[CACHE_SINGLE]] = true;
    }
    next(action);
}

export const effect: any = (effect, { put }, model, actionType) => {
    return function* (...args) {
        if (args && args.length > 0 && !cache[JSON.stringify(args[0])]) {
            console.log('未缓存, 继续effect---------->>>', actionType);
            yield effect(...args);
        } else {
            console.log('已缓存, 取消effect---------->>>', actionType);
        }
    }
}

export interface ICreateCachedAction {
    (proxyAction: Action, currentAction: Action): Action
}

export const createCachedAction: ICreateCachedAction = (proxyAction, currentAction) => {
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
