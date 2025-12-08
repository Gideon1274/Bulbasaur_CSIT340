package com.bulbasaur.bulbasaurbackend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bulbasaur.bulbasaurbackend.model.Cart;
import com.bulbasaur.bulbasaurbackend.model.User;
import com.bulbasaur.bulbasaurbackend.repository.CartRepository;
import com.bulbasaur.bulbasaurbackend.repository.UserRepository;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void SaveCart(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public List<Cart> getCartByUser(User user) {

        return cartRepository.findByUser(user);
    }

    @Override
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    @Override
    public void deleteCart(long cartId) {
        cartRepository.deleteById(cartId);
    }
}
