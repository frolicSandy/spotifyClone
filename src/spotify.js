/** https://developer.spotify.com/documentation/web-playback-sdk/quick-start/# */

/** endpoint for the user to be sent-to to perform login and authentication */
export const authEndpoint = 'https://accounts.spotify.com/authorize';

/** redirectUri for the user(for the homepage in this case) to be redirected-to post autherisation */
/** const redirectUri = 'http://localhost:3000/';*/
const redirectUri = 'https://spotify-clone-6659c.web.app/';

/** ClientId provided by spotify */
const clientId = '561e6c3d7b4345d6beded469fec3af7a';

/** The permissions to perform the operations mentioned in the scope will only be administered. */
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-read-collaborative"
];

/** retreiving the access-token from the url users are redirected to post authentication 
 * Sample url: http://localhost:3000/#access_token=BQAErNoCZApcUiB54D2p62tggPmgiUq5hfQFT7BQKIZDAkE-uuHbaMR3cGqwUa0vg6BGrYABqTnl7hTMOgMRqTrqL3ANGy166fiHDRoTMyc3cAp0SLZ1AlSvZ1osVIrT54I273GLZ-ls1nbP31VwRavrVOJErdWaFr61NUX-ljP1BQKDuhPnzqH_88gb-SSNRGgq2LO44afHPKLMW7_G&token_type=Bearer&expires_in=3600
 * .reduce() --> 
 * param1: initial - initial value of reduce,
 *         item - item we get every time it loops through
 * param2: {} --> empty object --> the value that initial starts with.
*/
export const getAccessTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
}

/** generating loginUrl starting with 
 * authEndpoint followed by parameters --> 
 * clientId,
 *  redirectUri,
 *  scope[](.join()-->goes through all the scopes and adds space<%20> between all of them),
 *  response_type(to send back an acknowledgement token(basically string which is like a pass--> says you are who you say you are) post authentication),
 *  show_dialog */
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;