const clientID = 'd0f789b84ff54627bd26d37372b36723';
const redirectURI = 'http://smoothjammms.surge.sh/';

let token;

const Spotify = {

  getAccessToken() {
    if (token) {
      return token;
    }
    else {
      let url = window.location.href;
      const tokenMatch = url.match(/access_token=([^&]*)/);
      const expireMatch = url.match(/expires_in=([^&]*)/);
      if (tokenMatch && expireMatch) {
        token = tokenMatch[1];
        const expiresIn = Number(expireMatch[1]);
        window.setTimeout(() => token = '', expiresIn * 1000);
        window.history.pushState(token, null, '/');
      }
      else if (!tokenMatch) {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    }
  },

  search(term) {
    const token = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },


  savePlaylist(playlist, trackURIs) {
    if (!playlist || !trackURIs.length) {
      return;
    }

    const token = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`
    };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => response.json()
    ).then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            name: playlist
          })
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
              uris: trackURIs
            })
          });
        });
      })
  }
}
export default Spotify;
