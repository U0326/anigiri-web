import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});

function retrieveJson(urlPath) {
    return httpClient.get(urlPath)
            .then((res) => { return res.data; })
            .catch(err => { });
}

function createAnimeListId (graphRowData) {
    let animeListId = graphRowData.year + '-' + graphRowData.cour;
    if (graphRowData.animeId) {
        animeListId += '-' + graphRowData.animeId;
    }
    return animeListId;
}

function createCourLabel(cour) {
    return '第' + cour + 'クール(' + (1 + 3 * (cour - 1)) + '月〜' + (3 + 3 * (cour - 1)) + '月)';
}

export {createAnimeListId, createCourLabel, retrieveJson};
