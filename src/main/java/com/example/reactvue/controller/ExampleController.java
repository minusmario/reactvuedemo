package com.example.reactvue.controller;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/example")
public class ExampleController {
	@GetMapping
	public String demo() {
		List<JSONObject> data = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			JSONObject tmp = new JSONObject();
			tmp.put("row", i);
			tmp.put("data", Math.random());
			data.add(tmp);
		}
		return new JSONArray(data).toString();
	}
}
