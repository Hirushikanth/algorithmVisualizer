package com.algorithmvisualizer.algovisual.algorithm;

import com.algorithmvisualizer.algovisual.model.SortStep;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class QuickSort {

    private static final Random random = new Random();

    public static List<SortStep> sort(List<Integer> input) {
        List<Integer> arr = new ArrayList<>(input);
        List<SortStep> steps = new ArrayList<>();

        // Record initial state
        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(0, arr.size() - 1, -1),
                "Initial array - Ready to start QuickSort"
        ));

        quickSort(arr, 0, arr.size() - 1, steps);

        // Final sorted state
        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(0, arr.size() - 1, -1),
                "Array sorted successfully!"
        ));

        return steps;
    }

    private static void quickSort(List<Integer> arr, int low, int high, List<SortStep> steps) {
        if (low < high) {
            // Partition and get the final pivot position
            int pivotIndex = partition(arr, low, high, steps);

            // Recurse on left and right parts
            quickSort(arr, low, pivotIndex - 1, steps);
            quickSort(arr, pivotIndex + 1, high, steps);
        }
    }

    private static int partition(List<Integer> arr, int low, int high, List<SortStep> steps) {

        // === Step 1: Choose random pivot and swap it to the end (like in the video) ===
        int pivotIndex = low + random.nextInt(high - low + 1);
        int pivot = arr.get(pivotIndex);

        // Swap pivot to end
        if (pivotIndex != high) {
            int temp = arr.get(pivotIndex);
            arr.set(pivotIndex, arr.get(high));
            arr.set(high, temp);

            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(low, high, high),
                    String.format("Chose random pivot = %d at index %d → moved to end (position %d)",
                            pivot, pivotIndex, high)
            ));
        } else {
            steps.add(new SortStep(
                    new ArrayList<>(arr),
                    List.of(low, high, high),
                    String.format("Chose random pivot = %d (already at end)", pivot)
            ));
        }

        // Now pivot is at arr[high]
        int left = low;
        int right = high - 1;

        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(low, high, -1),
                String.format("PARTITION START: Pivot = %d | left=%d, right=%d", pivot, left, right)
        ));

        // === Step 2: Two-pointer partition (exactly as shown in the video) ===
        while (left <= right) {

            // Move left pointer right while element <= pivot
            while (left <= right && arr.get(left) <= pivot) {
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(low, high, left),
                        String.format("left pointer move: arr[%d]=%d <= pivot → left++", left, arr.get(left))
                ));
                left++;
            }

            // Move right pointer left while element >= pivot
            while (left <= right && arr.get(right) >= pivot) {
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(low, high, right),
                        String.format("right pointer move: arr[%d]=%d >= pivot → right--", right, arr.get(right))
                ));
                right--;
            }

            // If pointers haven't crossed, swap the two elements
            if (left < right) {
                int temp = arr.get(left);
                arr.set(left, arr.get(right));
                arr.set(right, temp);

                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(low, high, left),
                        String.format("SWAP: arr[%d] ↔ arr[%d]  (left=%d > pivot, right=%d < pivot)",
                                left, right, arr.get(left), arr.get(right))  // note: values after swap
                ));

                // Move pointers after swap (as per video logic)
                left++;
                right--;
            }
        }

        // === Step 3: Place pivot in its final position ===
        int temp = arr.get(left);
        arr.set(left, arr.get(high));
        arr.set(high, temp);

        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(low, high, left),
                String.format("PLACE PIVOT: Swap pivot %d into position %d", pivot, left)
        ));

        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(left, left, left),
                String.format("PARTITION COMPLETE: Pivot %d is now at index %d. Left side ≤ pivot, Right side ≥ pivot",
                        pivot, left)
        ));

        return left;   // return the final pivot position
    }
}