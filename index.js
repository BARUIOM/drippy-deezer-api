const axios = require('axios').default;
const web_api = 'https://www.deezer.com/ajax/gw-light.php';
const rest_api = 'https://api.deezer.com';

const Track = require('./model/dz-track.js');

module.exports = class Deezer {

    constructor(arl_token) {
        this.session = `arl=${arl_token}; `;
        axios.get(web_api, {
            params: {
                input: '3',
                api_version: '1.0',
                api_token: '',
                method: 'deezer.getUserData'
            },
            headers: { 'Cookie': this.session }
        }).then(response => {
            this.api_token = response.data.results['checkForm'];
            this.session += `sid=${response.data.results['SESSION_ID']}`;
        });
    }

    async search(query, track) {
        if (track !== undefined) {
            const res = await axios.get('/search/track', {
                baseURL: rest_api,
                params: { q: `artist:"${query}" track:"${track}"` },
                headers: { 'Cookie': this.session }
            });

            return [...res.data['data']].map(e => new Track(e));
        }

        const data = { query: query, filter: '', output: 'TRACK' };
        const res = await axios.post(web_api, data, {
            params: {
                input: '3',
                api_version: '1.0',
                api_token: this.api_token,
                method: 'search.music'
            },
            headers: { 'Cookie': this.session }
        });
        return [...res.data.results['data']].map(e => new Track(e));
    }

    async getTrack(track_id) {
        const res = await axios.post(web_api, { sng_id: track_id }, {
            params: {
                input: '3',
                api_version: '1.0',
                api_token: this.api_token,
                method: 'song.getData'
            },
            headers: { 'Cookie': this.session }
        });
        return res.data['results'];
    }

}