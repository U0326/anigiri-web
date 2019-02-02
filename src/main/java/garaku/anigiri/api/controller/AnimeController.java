package garaku.anigiri.api.controller;

import garaku.anigiri.api.repository.entity.AnimeEntity;
import garaku.anigiri.api.response.counting_tweet.about_anime.CountingTweetAboutAnimeResponse;
import garaku.anigiri.api.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AnimeController {
    @Autowired
    private AnimeService service;

    @GetMapping("/anime/{animeId}")
    public CountingTweetAboutAnimeResponse responseAnimeData(@PathVariable("animeId") int animeId) {
        AnimeEntity anime = service.takeCountingTweetAboutAnime(animeId);
        return new CountingTweetAboutAnimeResponse(anime);
    }
}
