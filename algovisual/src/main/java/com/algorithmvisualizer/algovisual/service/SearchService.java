package com.algorithmvisualizer.algovisual.service;

import com.algorithmvisualizer.algovisual.algorithm.LinearSearch;
import com.algorithmvisualizer.algovisual.model.SearchStep;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    public List<SearchStep> linearSearch(List<Integer> array, int target) {
        return LinearSearch.search(array, target);
    }
}