package com.algorithmvisualizer.algovisual.model;

import lombok.Data;
import java.util.List;

@Data
public class SearchRequest {
    private List<Integer> array;
    private Integer target;
}