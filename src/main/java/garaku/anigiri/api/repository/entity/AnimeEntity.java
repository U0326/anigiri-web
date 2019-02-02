package garaku.anigiri.api.repository.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Table(name = "anime_list")
@Entity
@Getter
@ToString
public class AnimeEntity {
    @Id
    @Column(name = "id")
    private Integer animeId;
    @Column(name = "term_id")
    private Integer termId;
    @Column(name = "title")
    private String title;
    @OneToMany
    @JoinColumn(name = "anime_id")
    private List<ResultEntity> searchResults;
}
