package com.algorithmvisualizer.algovisual.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class SortStep {
    private List<Integer> array;
    private List<Integer> highlight;
    private String pointerInfo;
}
