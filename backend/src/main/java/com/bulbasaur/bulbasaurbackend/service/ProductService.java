package com.bulbasaur.bulbasaurbackend.service;



import java.util.List;

import com.bulbasaur.bulbasaurbackend.model.Product;

public interface ProductService {

    public Product saveProduct(Product product);

    public List<Product> getAllProducts();

    public List<Product> findByCategory(String category);

    public Product getProductById(long id);
}
