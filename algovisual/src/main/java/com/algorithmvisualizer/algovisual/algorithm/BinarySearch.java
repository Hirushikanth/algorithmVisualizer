package com.algorithmvisualizer.algovisual.algorithm;

import com.algorithmvisualizer.algovisual.model.SearchStep;

import java.util.ArrayList;
import java.util.List;

public class BinarySearch {

    public static List<SearchStep> search(List<Integer> input, int target) {
        List<Integer> arr = new ArrayList<>(input);
        List<SearchStep> steps = new ArrayList<>();

        int n = arr.size();
        int left = 0;
        int right = n - 1;
        int foundIndex = -1;

        // Record initial state
        steps.add(new SearchStep(
                new ArrayList<>(arr),
                List.of(left, right, target),
                String.format("Initial array - Searching for target=%d in range [%d, %d]",
                        target, left, right)
        ));

        while (left <= right) {
            int mid = left + (right - left) / 2;

            // Record comparison step
            steps.add(new SearchStep(
                    new ArrayList<>(arr),
                    List.of(left, right, mid),
                    String.format("Calculate mid = %d + (%d - %d) / 2 = %d, arr[%d]=%d",
                            left, right, left, mid, mid, arr.get(mid))
            ));

            steps.add(new SearchStep(
                    new ArrayList<>(arr),
                    List.of(mid, mid, target),
                    String.format("Compare arr[%d]=%d with target=%d",
                            mid, arr.get(mid), target)
            ));

            if (arr.get(mid).equals(target)) {
                foundIndex = mid;
                steps.add(new SearchStep(
                        new ArrayList<>(arr),
                        List.of(mid, mid, target),
                        String.format("✓ MATCH FOUND! arr[%d]=%d equals target=%d",
                                mid, arr.get(mid), target)
                ));
                break;
            } else if (arr.get(mid) < target) {
                steps.add(new SearchStep(
                        new ArrayList<>(arr),
                        List.of(left, right, mid),
                        String.format("arr[%d]=%d < target=%d, search RIGHT half [%d, %d]",
                                mid, arr.get(mid), target, mid + 1, right)
                ));
                left = mid + 1;
            } else {
                steps.add(new SearchStep(
                        new ArrayList<>(arr),
                        List.of(left, right, mid),
                        String.format("arr[%d]=%d > target=%d, search LEFT half [%d, %d]",
                                mid, arr.get(mid), target, left, mid - 1)
                ));
                right = mid - 1;
            }
        }

        // Final result
        if (foundIndex != -1) {
            steps.add(new SearchStep(
                    new ArrayList<>(arr),
                    List.of(foundIndex, foundIndex, target),
                    String.format("Search Complete: Target %d found at index %d",
                            target, foundIndex)
            ));
        } else {
            steps.add(new SearchStep(
                    new ArrayList<>(arr),
                    List.of(left, right, target),
                    String.format("Search Complete: Target %d NOT found in array",
                            target)
            ));
        }

        return steps;
    }
}