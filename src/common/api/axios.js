import axios from "axios";
import appConfig from "../../../config/app-config.json";
// import router from "../../router/router";

const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;

const createInstance = config => {
    if (typeof config === "string" && !localStorage.getItem('jwt')) {
        config = {
            baseURL: config,
            headers: {

            }
        };
    }
    if (typeof config === "string" && localStorage.getItem('jwt')) {
        config = {
            baseURL: config,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        };
        // const token = localStorage.getItem('jwt')
        // config.headers.Authorization = 'Bearer ' + localStorage.getItem('jwt')
    }

    const instance = axios.create(config);
    return instance;
};

const onSuccess = res => {
    return Promise.resolve(res);
};

const onError = err => {
    if (err.response.status == HTTP_STATUS_UNAUTHORIZED || err.response.status == HTTP_STATUS_FORBIDDEN) {
        window.location.href = "login";
        // router.push("/login")
    }
    throw new Error(err);
};
export default {
    get: (url, params, config) => {
        if (!config) {
            config = appConfig.api.BaseUrl.default;
        }
        const instance = createInstance(config);
        return instance
            .get(url, {
                params: params
            })
            .then(onSuccess)
            .catch(onError);
    },
    post: (url, data, config) => {
        if (!config) {
            config = appConfig.api.BaseUrl.default;
        }
        const instance = createInstance(config);
        return instance
            .post(url, data)
            .then(onSuccess)
            .catch(onError);
    },
    put: (url, data, config) => {
        if (!config) {
            config = appConfig.api.BaseUrl.default;
        }
        const instance = createInstance(config);
        return instance
            .put(url, data)
            .then(onSuccess)
            .catch(onError);
    },
    patch: (url, data, config) => {
        if (!config) {
            config = appConfig.api.BaseUrl.default;
        }
        const instance = createInstance(config);
        return instance
            .patch(url, data)
            .then(onSuccess)
            .catch(onError);
    },
    delete: (url, params, config) => {
        if (!config) {
            config = appConfig.api.BaseUrl.default;
        }
        const instance = createInstance(config);
        return instance
            .delete(url, {
                params: params
            })
            .then(onSuccess)
            .catch(onError);
    }
};