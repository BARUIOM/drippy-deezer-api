declare class Track {

    id: string;

    duration: number;

    title_short: string;

    title_version: string;

    explicit_lyrics: boolean;

    constructor(data: object);

}

export = Track;