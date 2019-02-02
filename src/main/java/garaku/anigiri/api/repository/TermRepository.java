package garaku.anigiri.api.repository;


import garaku.anigiri.api.repository.entity.TermEntity;
import garaku.anigiri.api.response.counting_tweet.in_cour.CountingTweetPerAnime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TermRepository extends JpaRepository<TermEntity, Integer> {
    @Query("SELECT term " +
            "FROM TermEntity term " +
                "INNER JOIN AnimeEntity anime ON term.termId = anime.termId " +
            "WHERE term.year = :year AND term.cour = :cour")
    TermEntity findAnimesByYearAndCour(@Param("year") int year, @Param("cour") int cour);

    @Query("SELECT NEW garaku.anigiri.api.response.counting_tweet.in_cour.CountingTweetPerAnime(" +
                "anime.animeId," +
                "anime.title," +
                "SUM(result. samplingTweetCount)," +
                "SUM(result.gaveUpTweetCount)) " +
            "FROM TermEntity term " +
                "INNER JOIN AnimeEntity anime ON term.termId = anime.termId " +
                "INNER JOIN ResultEntity result ON anime.animeId = result.animeId " +
            "WHERE term.year = :year AND term.cour = :cour " +
            "GROUP BY anime.animeId")
    List<CountingTweetPerAnime> countTweetInCour(@Param("year") int year, @Param("cour") int cour);

}
