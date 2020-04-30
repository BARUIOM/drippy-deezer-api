const Axios = require('axios').default;
const axios = Axios.create();

const web_api = 'https://www.deezer.com/ajax/gw-light.php';
const rest_api = 'https://api.deezer.com';

const Track = require('./model/dz-track.js');

module.exports = class Deezer {

    constructor(arl_token) {
        this.cookies = [`arl=${arl_token}`];
        axios.interceptors.request.use(request => {
            request.headers['Cookie'] = this.cookies.join('; ');

            if (request.url === web_api) {
                request.params['input'] = '3';
                request.params['api_version'] = '1.0';
                request.params['api_token'] = this.api_token || '';
            }
            return request;
        });

        this.authenticate();
        axios.interceptors.response.use(response => {
            if (response.data['error'] && response.data['error']['VALID_TOKEN_REQUIRED']) {
                delete this.api_token;
                this.cookies.splice(1, 1);
                return this.authenticate().then(() => axios.request(response.config));
            }
            return response;
        });
    }

    async authenticate() {
        const response = await axios.get(web_api, {
            params: { method: 'deezer.getUserData' }
        });
        this.api_token = response.data.results['checkForm'];
        this.cookies[1] = `sid=${response.data.results['SESSION_ID']}`;
    }

    async search(query, track) {
        if (track !== undefined) {
            const res = await axios.get('/search/track', {
                baseURL: rest_api,
                params: { q: `artist:"${query}" track:"${track}"` }
            });

            return [...res.data['data']].map(e => new Track(e));
        }

        const data = { query: query, filter: '', output: 'TRACK' };
        const res = await axios.post(web_api, data, {
            params: { method: 'search.music' }
        });
        return [...res.data.results['data']].map(e => new Track(e));
    }

    async getTrack(track_id) {
        const res = await axios.post(web_api, { sng_id: track_id }, {
            params: { method: 'song.getData' }
        });
        return res.data['results'];
    }

}