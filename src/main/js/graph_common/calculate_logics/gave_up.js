export default {
    title: '「切った」ツイート',
    description: '「切った」でヒットしたツイート数',
    label: 'gave_up',
    takeSortLogic: function(a, b) {
        return a.gave_up_tweet_count < b.gave_up_tweet_count ? 1 : -1;
    },
    calculate: function(anime) {
        return anime.gave_up_tweet_count;
    }
}
