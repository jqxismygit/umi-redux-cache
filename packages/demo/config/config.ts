import routes from './router.config';
import plugins from './plugin.config';

export default {
    plugins,
    targets: {
        ie: 9
    },
    ...routes,
    define: {
        BASE_URL: 'http://localhost:8000'
    }
};
