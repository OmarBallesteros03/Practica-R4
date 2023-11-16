const URL = '/2.0/?method=geo.gettopartists&country=spain&api_key=f0a8a11203888d5aaf76918c71ca29f6&format=json'

function getMusicData() {
    return fetch(`${URL}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map(artist => {
        return {
            id: artist.mbid,
            name: artist.name,
            image: artist.image[0]['text']
        }
    }))
}

export {getMusicData}