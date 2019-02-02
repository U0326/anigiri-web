export default {
    title: '公式ハッシュタグツイート',
    description: '公式ハッシュタグでヒットしたツイート数',
    label: 'hash_tag',
    takeSortLogic: function(a, b) {
        return a.samplingTweetCount < b.samplingTweetCount ? 1 : -1;
    },
    calculate: function(anime) {
        return anime.samplingTweetCount;
    }
}
