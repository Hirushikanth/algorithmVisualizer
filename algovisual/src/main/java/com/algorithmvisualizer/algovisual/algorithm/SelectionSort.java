package com.algorithmvisualizer.algovisual.algorithm;

import com.algorithmvisualizer.algovisual.model.SortStep;

import java.util.ArrayList;
import java.util.List;

public class SelectionSort {

    public static List<SortStep> sort(List<Integer> input) {
        List<Integer> arr = new ArrayList<>(input);
        List<SortStep> steps = new ArrayList<>();

        int n = arr.size();

        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;

            // Step 1: Initialize i and min at start of unsorted portion
            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(i, minIndex, i),
                    String.format("i=%d, min=%d - Starting pass %d, min initialized at index %d",
                            i, minIndex, i + 1, minIndex)
            ));

            // Find the minimum element in unsorted portion
            for (int j = i + 1; j < n; j++) {
                // Step 2: Compare current min with element at j
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(i, minIndex, j),
                        String.format("i=%d, min=%d, j=%d - Compare arr[%d]=%d with arr[%d]=%d",
                                i, minIndex, j, minIndex, arr.get(minIndex), j, arr.get(j))
                ));

                if (arr.get(j) < arr.get(minIndex)) {
                    minIndex = j;
                    // Step 3: New minimum found
                    steps.add(new SortStep(
                            new ArrayList<>(arr),
                            List.of(i, minIndex, j),
                            String.format("i=%d, min=%d, j=%d - New minimum found! arr[%d]=%d is smaller",
                                    i, minIndex, j, minIndex, arr.get(minIndex))
                    ));
                }
            }

            // Swap if minimum is not at current position
            if (minIndex != i) {
                int temp = arr.get(i);
                arr.set(i, arr.get(minIndex));
                arr.set(minIndex, temp);

                // Step 4: Record swap
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(i, minIndex, minIndex),
                        String.format("i=%d, min=%d - SWAP! arr[%d] and arr[%d] swapped",
                                i, minIndex, i, minIndex)
                ));
            } else {
                // No swap needed
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(i, minIndex, minIndex),
                        String.format("i=%d, min=%d - No swap needed, element already in correct position",
                                i, minIndex)
                ));
            }
        }

        // Final sorted state
        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(n-1, n-1, n-1),
                "Array sorted successfully!"
        ));

        return steps;
    }
}