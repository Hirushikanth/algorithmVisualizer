package com.algorithmvisualizer.algovisual.algorithm;

import com.algorithmvisualizer.algovisual.model.SortStep;

import java.util.ArrayList;
import java.util.List;

public class MergeSort {

    public static List<SortStep> sort(List<Integer> input) {
        List<Integer> arr = new ArrayList<>(input);
        List<SortStep> steps = new ArrayList<>();

        // Record initial state
        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(0, arr.size() - 1, arr.size() / 2),
                String.format("Initial array - Range [%d, %d], mid=%d",
                        0, arr.size() - 1, arr.size() / 2)
        ));

        mergeSort(arr, 0, arr.size() - 1, steps);

        // Final sorted state
        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(0, arr.size() - 1, 0),
                "Array sorted successfully!"
        ));

        return steps;
    }

    private static void mergeSort(List<Integer> arr, int left, int right, List<SortStep> steps) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            // Record divide step
            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(left, right, mid),
                    String.format("DIVIDE: Splitting range [%d, %d] at mid=%d",
                            left, right, mid)
            ));

            // Sort left half
            mergeSort(arr, left, mid, steps);

            // Sort right half
            mergeSort(arr, mid + 1, right, steps);

            // Merge the sorted halves
            merge(arr, left, mid, right, steps);
        }
    }

    private static void merge(List<Integer> arr, int left, int mid, int right, List<SortStep> steps) {
        // Create temporary arrays
        List<Integer> leftArr = new ArrayList<>();
        List<Integer> rightArr = new ArrayList<>();

        for (int i = left; i <= mid; i++) {
            leftArr.add(arr.get(i));
        }
        for (int i = mid + 1; i <= right; i++) {
            rightArr.add(arr.get(i));
        }

        int i = 0, j = 0, k = left;

        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(left, right, k),
                String.format("MERGE: Starting merge of [%d, %d] and [%d, %d]",
                        left, mid, mid + 1, right)
        ));

        // Merge the temporary arrays
        while (i < leftArr.size() && j < rightArr.size()) {
            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(left + i, mid + 1 + j, k),
                    String.format("MERGE: Compare left[%d]=%d with right[%d]=%d",
                            left + i, leftArr.get(i), mid + 1 + j, rightArr.get(j))
            ));

            if (leftArr.get(i) <= rightArr.get(j)) {
                arr.set(k, leftArr.get(i));
                i++;
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(left + i - 1, mid + 1 + j, k),
                        String.format("MERGE: Place %d at position %d (from left subarray)",
                                leftArr.get(i - 1), k)
                ));
            } else {
                arr.set(k, rightArr.get(j));
                j++;
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(left + i, mid + 1 + j - 1, k),
                        String.format("MERGE: Place %d at position %d (from right subarray)",
                                rightArr.get(j - 1), k)
                ));
            }
            k++;
        }

        // Copy remaining elements of leftArr
        while (i < leftArr.size()) {
            arr.set(k, leftArr.get(i));
            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(left + i, right, k),
                    String.format("MERGE: Copy remaining left element %d to position %d",
                            leftArr.get(i), k)
            ));
            i++;
            k++;
        }

        // Copy remaining elements of rightArr
        while (j < rightArr.size()) {
            arr.set(k, rightArr.get(j));
            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(left, mid + 1 + j, k),
                    String.format("MERGE: Copy remaining right element %d to position %d",
                            rightArr.get(j), k)
            ));
            j++;
            k++;
        }

        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(left, right, right),
                String.format("MERGE: Completed merge of range [%d, %d]", left, right)
        ));
    }
}