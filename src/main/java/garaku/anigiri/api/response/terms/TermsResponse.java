package garaku.anigiri.api.response.terms;

import garaku.anigiri.api.repository.entity.TermEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TermsResponse {
    private List<Term>terms = new ArrayList<>();

    public TermsResponse(List<TermEntity> terms) {
        terms.stream().forEach(term -> addTerm(term.getYear(), term.getCour()));
    }

    private void addTerm(int year, int cour) {
        Term term = terms.stream()
                .filter(element -> element.getYear() == year)
                .findFirst()
                .orElseGet(() -> new Term(year));
        term.addCourIfAbsent(cour);
        if (!terms.contains(term)) {
            terms.add(term);
        }
    }
}
