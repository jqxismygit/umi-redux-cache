import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  app.use(require('/Users/king/Desktop/github/redux-cache/packages/demo/node_modules/dva-immer/dist/index.js')());
  app.model({ namespace: 'list', ...(require('/Users/king/Desktop/github/redux-cache/packages/demo/src/pages/list/models/list.ts').default) });
app.model({ namespace: 'detail', ...(require('/Users/king/Desktop/github/redux-cache/packages/demo/src/pages/detail/models/detail.ts').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
