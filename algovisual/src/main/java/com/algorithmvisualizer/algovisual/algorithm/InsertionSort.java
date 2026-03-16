package com.algorithmvisualizer.algovisual.algorithm;

import com.algorithmvisualizer.algovisual.model.SortStep;
import java.util.ArrayList;
import java.util.List;

public class InsertionSort {

    public static List<SortStep> sort(List<Integer> input) {
        List<Integer> arr = new ArrayList<>(input);
        List<SortStep> steps = new ArrayList<>();

        int n = arr.size();

        // Initial state: first element is "sorted"
        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(0),  // only index 0 highlighted as sorted
                "Starting Insertion Sort – first element is already sorted"
        ));

        for (int i = 1; i < n; i++) {
            int key = arr.get(i);
            int j = i - 1;

            // Record the moment we pick the next key to insert
            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(i, i),           // highlight the key position twice (or use special style)
                    String.format("Pass %d – Selected key = %d at index %d", i, key, i)
            ));

            // Compare and shift larger elements to the right
            while (j >= 0 && arr.get(j) > key) {
                // Highlight: comparing j with the key position (i)
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(j, i),
                        String.format("Comparing arr[%d]=%d > key=%d → will shift right", j, arr.get(j), key)
                ));

                arr.set(j + 1, arr.get(j));
                j--;

                // Record after shift (array has changed)
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(j + 1, i),   // shifted position and key position
                        String.format("Shifted %d right to index %d", key, j + 1)
                ));
            }

            // Place the key in its correct position
            arr.set(j + 1, key);

            // Record the insertion
            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(j + 1, j + 1),
                    String.format("Inserted key %d at index %d", key, j + 1)
            ));
        }

        // Final sorted state
        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(n - 1, n - 1),
                "Array sorted successfully!"
        ));

        return steps;
    }
}