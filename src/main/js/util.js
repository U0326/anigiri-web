function createAnimeListId (graphRowData) {
    let animeListId = graphRowData.year + '-' + graphRowData.cour;
    if (graphRowData.animeId) {
        animeListId += '-' + graphRowData.animeId;
    }
    return animeListId;
}

export {createAnimeListId};