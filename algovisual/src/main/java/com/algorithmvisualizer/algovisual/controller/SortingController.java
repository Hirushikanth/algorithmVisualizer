package com.algorithmvisualizer.algovisual.controller;

import com.algorithmvisualizer.algovisual.model.SortRequest;
import com.algorithmvisualizer.algovisual.model.SortStep;
import com.algorithmvisualizer.algovisual.service.SortingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sort")
@CrossOrigin
public class SortingController {

    private final SortingService sortingService;

    public SortingController(SortingService sortingService) {
        this.sortingService = sortingService;
    }

    @PostMapping("/bubble")
    public List<SortStep> bubbleSort(@RequestBody SortRequest request) {
        return sortingService.bubbleSort(request.getArray());
    }
}
