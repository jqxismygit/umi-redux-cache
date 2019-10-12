import routes from './router.config';
import plugins from './plugin.config';
import serverConfig from './server.config';

const { SERVER_ENV } = process.env;
let BaseURL = '';
if (SERVER_ENV && serverConfig[SERVER_ENV]) {
    BaseURL = serverConfig[SERVER_ENV];
} else {
    BaseURL = serverConfig.localhost;
}

export default {
    plugins,
    targets: {
        ie: 9
    },
    ...routes,
    define: {
        BASE_URL: BaseURL
    }
};
