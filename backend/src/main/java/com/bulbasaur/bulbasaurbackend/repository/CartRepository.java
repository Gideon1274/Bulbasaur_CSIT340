package com.bulbasaur.bulbasaurbackend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bulbasaur.bulbasaurbackend.model.Cart;
import com.bulbasaur.bulbasaurbackend.model.User;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    public List<Cart> findByUser(User user);


}
