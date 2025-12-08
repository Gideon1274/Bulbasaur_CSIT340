package com.bulbasaur.bulbasaurbackend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bulbasaur.bulbasaurbackend.model.Product;
import com.bulbasaur.bulbasaurbackend.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add-product")
    public String addProduct(@RequestBody Product product) {
        productService.saveProduct(product);
        return "Product added";
    }

    @GetMapping("/get-all-products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/get-products-by-category")
    public List<Product> getProductsByCategory(@RequestParam("category") String category) {

        List<Product> products = productService.findByCategory(category);

        return products;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Long productId) {

        Product product = productService.getProductById(productId);

        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }




}
