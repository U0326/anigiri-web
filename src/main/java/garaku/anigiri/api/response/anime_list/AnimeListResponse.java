package garaku.anigiri.api.response.anime_list;

import garaku.anigiri.api.repository.entity.AnimeEntity;
import garaku.anigiri.api.repository.entity.TermEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AnimeListResponse {
    int year;
    int cour;
    List<Anime> animes = new ArrayList<>();

    public AnimeListResponse(TermEntity term) {
        year = term.getYear();
        cour = term.getCour();
        for (AnimeEntity anime : term.getAnimeList()) {
            animes.add(new Anime(anime.getAnimeId(), anime.getTitle()));
        }
    }
}
