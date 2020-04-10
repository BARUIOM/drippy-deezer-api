import Track from "./model/dz-track";

declare class Deezer {

    session: string;
    
    api_token: string;

    constructor(arl_token: string);

    search(query: string): Promise<Array<Track>>;

    search(artist: string, track: string): Promise<Array<Track>>;

    getTrack(track_id: string): Promise<object>;

}

export = Deezer;