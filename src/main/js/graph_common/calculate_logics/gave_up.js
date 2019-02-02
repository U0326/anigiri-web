export default {
    title: '「切った」ツイート',
    description: '「切った」でヒットしたツイート数',
    label: 'gave_up',
    takeSortLogic: function(a, b) {
        return a.gaveUpTweetCount < b.gaveUpTweetCount ? 1 : -1;
    },
    calculate: function(anime) {
        return anime.gaveUpTweetCount;
    }
}
