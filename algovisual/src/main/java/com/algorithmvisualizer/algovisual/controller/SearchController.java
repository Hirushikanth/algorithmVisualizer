package com.algorithmvisualizer.algovisual.controller;

import com.algorithmvisualizer.algovisual.model.SearchRequest;
import com.algorithmvisualizer.algovisual.model.SearchStep;
import com.algorithmvisualizer.algovisual.service.SearchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping("/linear")
    public List<SearchStep> linearSearch(@RequestBody SearchRequest request) {
        return searchService.linearSearch(request.getArray(), request.getTarget());
    }

    @PostMapping("/binary")
    public List<SearchStep> binarySearch(@RequestBody SearchRequest request) {
        return searchService.binarySearch(request.getArray(), request.getTarget());
    }
}