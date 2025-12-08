package com.bulbasaur.bulbasaurbackend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bulbasaur.bulbasaurbackend.model.Cart;
import com.bulbasaur.bulbasaurbackend.model.CartRequest;
import com.bulbasaur.bulbasaurbackend.model.Product;
import com.bulbasaur.bulbasaurbackend.model.User;
import com.bulbasaur.bulbasaurbackend.service.CartService;
import com.bulbasaur.bulbasaurbackend.service.ProductService;
import com.bulbasaur.bulbasaurbackend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;

    @PostMapping("/add-to-cart")
    public String addToCart(@RequestBody CartRequest cartRequest) {

        String userEmail = cartRequest.getUserEmail();
        long productId = cartRequest.getProductId();

        User user = userService.findByEmail(userEmail);
        Product product = productService.getProductById(productId);

        if (user == null || product == null) {
            return "User or product not found.";
        }

        // Create a new cart entry and associate it with the user and product
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cartService.SaveCart(cart);

        return "Product added to cart successfully!";
    }


    @PostMapping("/fetch-cart-items")
    public List<Cart> fetchCartItems(@RequestBody CartRequest cartRequest) {
        String userEmail = cartRequest.getUserEmail();
        User user = userService.findByEmail(userEmail);

        List<Cart> cartItems = cartService.getCartByUser(user);



        return cartItems;
    }

    @DeleteMapping("/delete-cart-item")
    public void deleteCartItem(@RequestBody CartRequest cartRequest) {

        long cartId = cartRequest.getCartId();
        cartService.deleteCart(cartId);
    }

}
