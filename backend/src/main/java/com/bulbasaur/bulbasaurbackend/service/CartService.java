package com.bulbasaur.bulbasaurbackend.service;



import java.util.List;

import com.bulbasaur.bulbasaurbackend.model.Cart;
import com.bulbasaur.bulbasaurbackend.model.User;

public interface CartService {

    public void SaveCart(Cart cart);

    public List<Cart> getCartByUser(User user);

    public List<Cart> getAllCartItems();

    public void deleteCart(long cartId);
}
