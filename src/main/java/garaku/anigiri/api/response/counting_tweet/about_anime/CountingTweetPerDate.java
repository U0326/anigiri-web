package garaku.anigiri.api.response.counting_tweet.about_anime;

import com.fasterxml.jackson.annotation.JsonFormat;
import garaku.anigiri.api.repository.entity.ResultEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CountingTweetPerDate {
    private int samplingTweetCount;
    private int gaveUpTweetCount;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime tweetedDate;

    public CountingTweetPerDate(ResultEntity result) {
        samplingTweetCount = result.getSamplingTweetCount();
        gaveUpTweetCount = result.getGaveUpTweetCount();
        tweetedDate = result.getTweetedDate();
    }
}
