package learn.agileaprons.data;

import learn.agileaprons.models.Unit;

import java.util.List;

public interface UnitRepository {
    List<Unit> findAll();
}
