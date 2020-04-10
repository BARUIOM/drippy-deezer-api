import Track from "./model/dz-track";

declare class Deezer {

    session: string;

    api_token: string;

    /**
     * Creates a new instance of the Deezer API wrapper
     * @param arl_token Your user ARL token
     */
    constructor(arl_token: string);

    /**
     * Searches for tracks
     * @param query The query to search for
     */
    search(query: string): Promise<Array<Track>>;

    /**
     * Alternative to the default search method, more precise and faster
     *  - Not every track can be found by using this method
     * @param artist The artist name to search for
     * @param track The track name to search for
     */
    search(artist: string, track: string): Promise<Array<Track>>;

    /**
     * Get any track metadada by given id
     * @param track_id The track's unique id
     */
    getTrack(track_id: string): Promise<object>;

}

export = Deezer;