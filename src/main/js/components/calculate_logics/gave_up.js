export default {
    title: '「切った」ツイート',
    description: '「切った」でヒットしたツイート数',
    label: 'gave_up',
    takeSortedLogic: function(a, b) {
        if (a.gave_up_tweet_count < b.gave_up_tweet_count) {
            return 1;
        } else {
            return -1;
        }
    },
    calculate: function(anime) {
        return anime.gave_up_tweet_count;
    }
}
