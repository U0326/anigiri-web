package garaku.anigiri.api.repository;

import garaku.anigiri.api.repository.entity.AnimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnimeRepository extends JpaRepository<AnimeEntity, Integer> {
    @Query("SELECT anime " +
            "FROM AnimeEntity anime " +
                "INNER JOIN ResultEntity result ON anime.animeId = result.animeId " +
            "WHERE anime.animeId = :animeId")
    public AnimeEntity findByAnimeId(Integer animeId);
}
