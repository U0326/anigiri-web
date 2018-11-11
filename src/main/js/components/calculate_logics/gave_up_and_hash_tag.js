export default {
    title: '「切った」ツイート / 公式ハッシュタグツイート',
    description: '「切った」でヒットしたツイート数 / 公式ハッシュタグでのツイート数 ',
    label: 'gave_up_and_hash_tag',
    takeSortedLogic: function(a, b){
        if (a.gave_up_tweet_count / a.sampling_tweet_count <
                b.gave_up_tweet_count / b.sampling_tweet_count) {
            return 1;
        } else {
            return -1
        }
    },
    calculate: function(anime) {
        return anime.gave_up_tweet_count / anime.sampling_tweet_count;
    }
}
