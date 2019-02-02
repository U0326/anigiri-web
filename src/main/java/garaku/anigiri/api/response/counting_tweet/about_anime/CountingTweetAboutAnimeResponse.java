package garaku.anigiri.api.response.counting_tweet.about_anime;

import garaku.anigiri.api.repository.entity.AnimeEntity;
import garaku.anigiri.api.repository.entity.ResultEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CountingTweetAboutAnimeResponse {
    private int animeId;
    private String title;
    private List<CountingTweetPerDate> data = new ArrayList<>();

    public CountingTweetAboutAnimeResponse(AnimeEntity anime) {
        animeId = anime.getAnimeId();
        title = anime.getTitle();
        for (ResultEntity result : anime.getSearchResults()) {
            data.add(new CountingTweetPerDate(result));
        }
    }
}
