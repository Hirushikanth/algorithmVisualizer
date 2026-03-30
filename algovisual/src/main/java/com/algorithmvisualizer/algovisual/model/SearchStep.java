package com.algorithmvisualizer.algovisual.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchStep {
    private List<Integer> array;
    private List<Integer> highlight;
    private String pointerInfo;
}