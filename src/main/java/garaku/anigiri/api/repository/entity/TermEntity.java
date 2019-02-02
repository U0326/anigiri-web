package garaku.anigiri.api.repository.entity;

import garaku.anigiri.api.repository.entity.AnimeEntity;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Table(name = "terms")
@Entity
@Getter
@ToString(exclude = "animeList")
public class TermEntity {
    @Id
    @Column(name = "id")
    private Integer termId;
    @Column(name = "year")
    private Integer year;
    @Column(name = "cour")
    private Integer cour;
    @OneToMany
    @JoinColumn(name = "term_id")
    private List<AnimeEntity> animeList;
}
