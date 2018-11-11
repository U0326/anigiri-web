export default {
    title: '公式ハッシュタグツイート',
    description: '公式ハッシュタグでのツイート数',
    label: 'hash_tag',
    takeSortedLogic: function(a, b) {
        if (a.sampling_tweet_count < b.sampling_tweet_count) {
            return 1;
        } else {
            return -1;
        }
    },
    calculate: function(anime) {
        return anime.sampling_tweet_count;
    }
}
