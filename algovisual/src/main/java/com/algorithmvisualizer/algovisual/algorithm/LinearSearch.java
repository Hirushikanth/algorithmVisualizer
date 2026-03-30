package com.algorithmvisualizer.algovisual.algorithm;

import com.algorithmvisualizer.algovisual.model.SearchStep;

import java.util.ArrayList;
import java.util.List;

public class LinearSearch {

    public static List<SearchStep> search(List<Integer> input, int target) {
        List<Integer> arr = new ArrayList<>(input);
        List<SearchStep> steps = new ArrayList<>();

        int n = arr.size();
        int foundIndex = -1;

        for (int i = 0; i < n; i++) {
            // Record comparison step
            steps.add(new SearchStep(
                    new ArrayList<>(arr),
                    List.of(i, target),
                    String.format("Step %d: Compare arr[%d]=%d with target=%d",
                            i + 1, i, arr.get(i), target)
            ));

            if (arr.get(i).equals(target)) {
                foundIndex = i;
                steps.add(new SearchStep(
                        new ArrayList<>(arr),
                        List.of(i, target),
                        String.format("✓ MATCH FOUND! arr[%d]=%d equals target=%d",
                                i, arr.get(i), target)
                ));
                break;
            }
        }

        // Final result
        if (foundIndex != -1) {
            steps.add(new SearchStep(
                    new ArrayList<>(arr),
                    List.of(foundIndex, target),
                    String.format("Search Complete: Target %d found at index %d",
                            target, foundIndex)
            ));
        } else {
            steps.add(new SearchStep(
                    new ArrayList<>(arr),
                    List.of(n - 1, target),
                    String.format("Search Complete: Target %d NOT found in array",
                            target)
            ));
        }

        return steps;
    }
}