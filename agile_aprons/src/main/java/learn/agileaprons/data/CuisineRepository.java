package learn.agileaprons.data;

import learn.agileaprons.models.Cuisine;

import java.util.List;

public interface CuisineRepository {
    List<Cuisine> findAll();
}
