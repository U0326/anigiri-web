package garaku.anigiri.api.response.counting_tweet.in_cour;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class CountingTweetPerAnime {
    private int id;
    private String title;
    private long samplingTweetCount;
    private long gaveUpTweetCount;
}
