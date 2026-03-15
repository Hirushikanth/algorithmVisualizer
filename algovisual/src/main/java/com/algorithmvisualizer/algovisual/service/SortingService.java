package com.algorithmvisualizer.algovisual.service;

import com.algorithmvisualizer.algovisual.algorithm.BubbleSort;
import com.algorithmvisualizer.algovisual.model.SortStep;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SortingService {

    public List<SortStep> bubbleSort(List<Integer> array) {
        return BubbleSort.sort(array);
    }
}
