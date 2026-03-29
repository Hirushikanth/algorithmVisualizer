package com.algorithmvisualizer.algovisual.service;

import com.algorithmvisualizer.algovisual.algorithm.*;
import com.algorithmvisualizer.algovisual.model.SortStep;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SortingService {

    public List<SortStep> bubbleSort(List<Integer> array) {
        return BubbleSort.sort(array);
    }

    public List<SortStep> selectionSort(List<Integer> array) {
        return SelectionSort.sort(array);
    }

    public List<SortStep> insertionSort(List<Integer> array) {
        return InsertionSort.sort(array);
    }

    public List<SortStep> mergeSort(List<Integer> array) {
        return MergeSort.sort(array);
    }

    public  List<SortStep> quickSort(List<Integer> array) {
        return QuickSort.sort(array);
    }
}
