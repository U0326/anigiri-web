package garaku.anigiri.api.controller;

import garaku.anigiri.api.repository.entity.TermEntity;
import garaku.anigiri.api.response.anime_list.AnimeListResponse;
import garaku.anigiri.api.response.counting_tweet.in_cour.CountingTweetInCourResponse;
import garaku.anigiri.api.response.counting_tweet.in_cour.CountingTweetPerAnime;
import garaku.anigiri.api.response.terms.TermsResponse;
import garaku.anigiri.api.service.CourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CourController {
    @Autowired
    private CourService courService;

    @GetMapping("/cours")
    public TermsResponse responseAllCours() {
        List<TermEntity> terms = courService.takeAllTerms();
        TermsResponse response = new TermsResponse(terms);
        return response;
    }

    @GetMapping("/cour/animeList/{year}/{cour}")
    public AnimeListResponse responseAnimeList(
            @PathVariable("year") int year, @PathVariable("cour") int cour) {
        TermEntity term = courService.takeAnimeListByYearAndCour(year, cour);
        return new AnimeListResponse(term);
    }

    @GetMapping("/cour/{year}/{cour}")
    public CountingTweetInCourResponse responseCourData(
            @PathVariable("year") int year, @PathVariable("cour") int cour) {
        List<CountingTweetPerAnime> results = courService.takeCountingTweetInCour(year, cour);
        return new CountingTweetInCourResponse(year, cour, results);
    }
}
