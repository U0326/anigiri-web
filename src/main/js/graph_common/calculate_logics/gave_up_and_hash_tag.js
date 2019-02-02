export default {
    title: '「切った」 / 公式ハッシュタグツイート',
    description: '「切った」でヒットしたツイート数 / 公式ハッシュタグでヒットしたツイート数 ',
    label: 'gave_up_and_hash_tag',
    takeSortLogic: function(a, b){
        return a.gaveUpTweetCount / a.samplingTweetCount <
                b.gaveUpTweetCount / b.samplingTweetCount ? 1 : -1;
    },
    calculate: function(anime) {
        return anime.gaveUpTweetCount / anime.samplingTweetCount;
    }
}
