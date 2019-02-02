package garaku.anigiri.api.response.terms;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Term {
    private int year;
    private List<Integer> cours = new ArrayList<>();

    public Term(int year) {
        this.year = year;
    }

    public void addCourIfAbsent(int cour) {
        if(!hasCour(cour)) {
            cours.add(cour);
        }
    }

    public boolean hasCour(int cour) {
        return cours.stream()
                .filter(element -> element.equals(cour))
                .findFirst()
                .isPresent();
    }
}
