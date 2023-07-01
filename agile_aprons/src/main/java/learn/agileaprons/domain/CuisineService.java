package learn.agileaprons.domain;

import learn.agileaprons.data.CuisineRepository;
import learn.agileaprons.models.Cuisine;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CuisineService {

    private final CuisineRepository repository;

    public CuisineService(CuisineRepository repository) {
        this.repository = repository;
    }

    public List<Cuisine> findAll() {
        return repository.findAll();
    }
}
