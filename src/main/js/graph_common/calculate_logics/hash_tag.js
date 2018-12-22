export default {
    title: '公式ハッシュタグツイート',
    description: '公式ハッシュタグでヒットしたツイート数',
    label: 'hash_tag',
    takeSortLogic: function(a, b) {
        return a.sampling_tweet_count < b.sampling_tweet_count ? 1 : -1;
    },
    calculate: function(anime) {
        return anime.sampling_tweet_count;
    }
}
