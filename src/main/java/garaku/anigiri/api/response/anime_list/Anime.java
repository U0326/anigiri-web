package garaku.anigiri.api.response.anime_list;

import lombok.Data;

@Data
public class Anime {
    int id;
    String title;

    public Anime(int id, String title) {
        this.id = id;
        this.title = title;
    }
}
