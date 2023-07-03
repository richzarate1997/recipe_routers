package learn.agileaprons.controllers;

import learn.agileaprons.domain.CuisineService;
import learn.agileaprons.models.Cuisine;
import learn.agileaprons.models.Unit;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cuisine")
public class CuisineController {

    private final CuisineService service;

    public CuisineController(CuisineService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cuisine> findAll() {return  service.findAll();}
}
