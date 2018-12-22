export default {
    title: '「切った」ツイート / 公式ハッシュタグツイート',
    description: '「切った」でヒットしたツイート数 / 公式ハッシュタグでヒットしたツイート数 ',
    label: 'gave_up_and_hash_tag',
    takeSortLogic: function(a, b){
        return a.gave_up_tweet_count / a.sampling_tweet_count <
                b.gave_up_tweet_count / b.sampling_tweet_count ? 1 : -1;
    },
    calculate: function(anime) {
        return anime.gave_up_tweet_count / anime.sampling_tweet_count;
    }
}
