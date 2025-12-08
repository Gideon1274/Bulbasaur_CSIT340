package com.bulbasaur.bulbasaurbackend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bulbasaur.bulbasaurbackend.model.Product;
import com.bulbasaur.bulbasaurbackend.repository.ProductRepository;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Override
    public Product getProductById(long id) {
        List<Product> products = productRepository.findProductByProductId(id);
        return products.get(0);
    }


}
