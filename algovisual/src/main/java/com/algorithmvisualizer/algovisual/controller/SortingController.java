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

    @PostMapping("/selection")
    public List<SortStep> selectionSort(@RequestBody SortRequest request) {
        return sortingService.selectionSort(request.getArray());
    }

    @PostMapping("/insertion")
    public List<SortStep> insertionSort(@RequestBody SortRequest request) {
        return sortingService.insertionSort(request.getArray());
    }

    @PostMapping("/merge")
    public List<SortStep> mergeSort(@RequestBody SortRequest request) {
        return sortingService.mergeSort(request.getArray());
    }

    @PostMapping("/quick")
    public List<SortStep> quickSort(@RequestBody SortRequest request) {
        return sortingService.quickSort(request.getArray());
    }
}
