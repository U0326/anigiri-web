package garaku.anigiri.api.repository.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Table(name = "search_results")
@Entity
@Data
@ToString
public class ResultEntity {
    @Id
    @Column(name = "id")
    private Integer resultId;
    @Column(name = "anime_id")
    private Integer animeId;
    @Column(name = "sampling_tweet_count")
    private Integer samplingTweetCount;
    @Column(name = "gave_up_tweet_count")
    private  Integer gaveUpTweetCount;
    @Column(name = "tweeted_date")
    private LocalDateTime tweetedDate;
    @Column(name = "created_at")
    private  LocalDateTime createdAt;
}
