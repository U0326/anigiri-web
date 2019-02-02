package garaku.anigiri.api.service;

import garaku.anigiri.api.repository.AnimeRepository;
import garaku.anigiri.api.repository.entity.AnimeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnimeService {
    @Autowired
    private AnimeRepository repository;

    public AnimeEntity takeCountingTweetAboutAnime(int animeId) {
        return repository.findByAnimeId(animeId);
    }
}
