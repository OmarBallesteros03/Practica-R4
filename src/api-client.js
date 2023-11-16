const URL = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=f0a8a11203888d5aaf76918c71ca29f6&format=json'

function getMusicData() {
    return fetch(`${URL}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => data.topartists.artist)
    .then((artists) =>
      Promise.all(
        artists.map((artist) => {
          const URL = `https://api.deezer.com/search?q='${artist.name}'`;
          return fetch(URL)
            .then((response) => response.json())
            .then((data) => {
              return {
                id: artist.mbid,
                name: artist.name,
                image: data.data[0].artist.picture_medium,
              };
            });
        })
      )
    );
}


export {getMusicData}