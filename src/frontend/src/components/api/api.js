import axios from 'axios'
import Storage from '../../store/storage';
const  BACKEND_ENDPOINT = '';

export default{
    BACKEND_ENDPOINT: BACKEND_ENDPOINT,
    // user api
    USER_LOGIN: BACKEND_ENDPOINT + '/login',

    // k8s api
    K8S_LISTNAMESPACE: BACKEND_ENDPOINT + '/k8s/api/v1/namespaces',
    K8S_LISTNODEURL: BACKEND_ENDPOINT + '/k8s/api/v1/nodes',
    K8S_LISTEVENTURL: BACKEND_ENDPOINT + '/k8s/api/v1/events',
    K8S_CREATEDEPLOYMENTS: BACKEND_ENDPOINT + '/k8s/apis/apps/v1beta1/',
    K8S_CREATESERVICE: BACKEND_ENDPOINT + '/k8s/api/v1/',
    K8S_CREATEINGRESS: BACKEND_ENDPOINT + '/k8s/apis/extensions/v1beta1/',

    // cicd api
    CICD_DEPLOYING: BACKEND_ENDPOINT + '/v1/deploying',
    CICD_job_logs: BACKEND_ENDPOINT + '/v1/get-job-logs',
    CICD_cancel_build_job: BACKEND_ENDPOINT + '/v1/cancel-build-job',
    CICD_get_histories: BACKEND_ENDPOINT + '/v1/deployed-histories',
    CICD_projects_ticker: false,
    CICD_logs_ticker: false,

    // image manager
    IMAGE_GETIMAGE_TOTAL: BACKEND_ENDPOINT + '/v1/images/count',
    IMAGE_DELETE_IMAGE: BACKEND_ENDPOINT + '/v1/images/delete',
    IMAGE_GETIMAGE_ONLINE: BACKEND_ENDPOINT + '/v1/images/get-online',
    IMAGE_GET_LATEST_IMAGE: BACKEND_ENDPOINT + '/v1/images/get-latest',
    IMAGE_UPDATE_IMAGE_ONLINE: BACKEND_ENDPOINT +'/v1/images/to-online',
    IMAGE_GROUP_IMAGE_PROJECT: BACKEND_ENDPOINT +'/v1/images/projects',
}

// 过滤请求
axios.interceptors.request.use((config) => {
    if (config.url !== BACKEND_ENDPOINT + "/login") {
        let token = Storage.get(Storage.KEYS.TOKEN)
        if (token !== undefined) {
            config.headers.common['TOKEN'] = token
        }
    }
    return config
})

axios.interceptors.response.use((response) => {
    if (response.config.url !==  BACKEND_ENDPOINT + "/login") {
        if (response.data.code === -1) {
            Storage.remove(Storage.KEYS.TOKEN)
            window.location.href = "/#/login"
        }
    }
    return response;
}, (error) => {
    return Promise.reject(error)
})
