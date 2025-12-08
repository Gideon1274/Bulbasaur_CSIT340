package com.bulbasaur.bulbasaurbackend.service;


import com.bulbasaur.bulbasaurbackend.model.User;

public interface UserService {

    public boolean findUserByEmailAndPassword(String email, String password);

    public boolean checkEmailExists(String email);

    public void saveUser(User user);

    public User findByEmail(String email);
}
