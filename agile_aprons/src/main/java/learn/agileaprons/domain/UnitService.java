package learn.agileaprons.domain;

import learn.agileaprons.data.UnitRepository;
import learn.agileaprons.models.Unit;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {

    private final UnitRepository repository;

    public UnitService(UnitRepository repository) {
        this.repository = repository;
    }

    public List<Unit> findAll(){ return repository.findAll(); }
}
