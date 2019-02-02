package garaku.anigiri.api.service;

import garaku.anigiri.api.repository.TermRepository;
import garaku.anigiri.api.repository.entity.TermEntity;
import garaku.anigiri.api.response.counting_tweet.in_cour.CountingTweetPerAnime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourService {
    @Autowired
    private TermRepository repository;

    public List<TermEntity> takeAllTerms() {
        return repository.findAll();
    }

    public TermEntity takeAnimeListByYearAndCour(int year, int cour) {
        return repository.findAnimesByYearAndCour(year, cour);
    }

    public List<CountingTweetPerAnime> takeCountingTweetInCour(int year, int cour) {
        return repository.countTweetInCour(year, cour);
    }
}
