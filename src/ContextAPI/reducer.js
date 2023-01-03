/** giving empty dataLayer as initialState */
export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    current_playlist: null,
    nowPlaying: null,
    recommendations: [],
    libraryVisible: false,
    searchResult: [],
    // accessToken: null
    /** REMOVE after development */
    // accessToken: 'BQDVUSDt-MhldPaljrF8Zmr6d2MNSkQc4CxbSSunWe91yjH0uFRidyizxBtAWDQC8N4Z7ckw2VgGRcjAuDuaA-CH9w_Gr11FNImKhdxrgAn7gzt6w4kR7LNK0D97bJSpgEfs2Iya2YeMkdAGWz4bdfxWN4vSamRFizTjiMT5qHOldW5VeJ27TqAuXMWODGoIgzhr8YzxmUTPh4FObGYY'
}

/**reducer listens to actions and returns new state
 * params -->
 * state - how it currently looks, action - set them,delete them, etc...
 */
export const reducer = (state, action) => {
    /** action --> type, [payload] */
    /** console.log('action: ', action); */

    switch(action.type){
        case 'SET_USER':
            return {
                /** maintain the previous state(...state) and change the mentioned fields(user in this case) */
                ...state,
                user: action.user
            };
        case 'SET_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: action.accessToken
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            };
        case 'SET_CURRENT_PLAYLIST':
            return {
                ...state,
                current_playlist: action.current_playlist
            };
        case 'SET_NOW_PLAYING':
            return {
                ...state,
                nowPlaying: action.nowPlaying
            };
        case 'SET_RECOMMENDATIONS':
            return {
                ...state,
                recommendations: action.recommendations
            };
        case 'SET_LIBRARY_VISIBLE':
            return {
                ...state,
                libraryVisible: action.libraryVisible
            };
        case 'SET_SEARCH_RESULTS':
            return {
               ...state,
                searchResult: action.payload.tracks.items
            };
        default:
            return state;
    }
}