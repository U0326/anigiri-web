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

export {createAnimeListId, createCourLabel};
