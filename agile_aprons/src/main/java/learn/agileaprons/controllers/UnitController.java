package learn.agileaprons.controllers;

import learn.agileaprons.domain.UnitService;
import learn.agileaprons.models.Unit;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/unit")
public class UnitController {
    private final UnitService service;

    public UnitController(UnitService service) {this.service = service;}

    @GetMapping
    public List<Unit> findAll() {return  service.findAll();}


}
