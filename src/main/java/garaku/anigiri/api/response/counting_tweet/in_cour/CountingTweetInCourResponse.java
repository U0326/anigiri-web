package garaku.anigiri.api.response.counting_tweet.in_cour;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@ToString
public class CountingTweetInCourResponse {
    int year;
    int cour;
    List<CountingTweetPerAnime> data;
}
