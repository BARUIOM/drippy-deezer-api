module.exports = class Track {

    constructor(data) {
        this.id = data['id'] || data['SNG_ID'];
        this.duration = data['duration'] || Number(data['DURATION']);
        this.title_short = data['title_short'] || data['SNG_TITLE'];
        this.title_version = data['title_version'] || data['VERSION'] || '';
        this.explicit_lyrics = data['explicit_lyrics'] || data['EXPLICIT_TRACK_CONTENT']['EXPLICIT_LYRICS_STATUS'] == 1;
    }

}