package com.algorithmvisualizer.algovisual.algorithm;

import com.algorithmvisualizer.algovisual.model.SortStep;

import java.util.ArrayList;
import java.util.List;

public class BubbleSort {

    public static List<SortStep> sort(List<Integer> input) {
        List<Integer> arr = new ArrayList<>(input);
        List<SortStep> steps = new ArrayList<>();

        int n = arr.size();
        int stepCount = 1;

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {

                // highlight comparison
                steps.add(new SortStep(
                        new ArrayList<>(arr),
                        List.of(j, j + 1),
                        String.format("Pass %d, Step %d - Compare arr[%d]=%d with arr[%d]=%d",
                                i + 1, stepCount++, j, arr.get(j), j + 1, arr.get(j + 1))
                ));

                if (arr.get(j) > arr.get(j + 1)) {
                    int temp = arr.get(j);
                    arr.set(j, arr.get(j + 1));
                    arr.set(j + 1, temp);

                    // record swap step
                    steps.add(new SortStep(
                            new ArrayList<>(arr),
                            List.of(j, j + 1),
                            String.format("Pass %d, Step %d - SWAP! arr[%d] and arr[%d] swapped",
                                    i + 1, stepCount++, j, j + 1)
                    ));
                }
            }
        }

        // Final step to show sorted array
        steps.add(new SortStep(
                new ArrayList<>(arr),
                List.of(n-1, n-1),
                "Array sorted successfully!"
        ));

        return steps;
    }
}
