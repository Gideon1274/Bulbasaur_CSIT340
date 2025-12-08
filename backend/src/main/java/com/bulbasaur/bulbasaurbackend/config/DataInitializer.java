package com.bulbasaur.bulbasaurbackend.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.bulbasaur.bulbasaurbackend.model.User;
import com.bulbasaur.bulbasaurbackend.service.UserService;

@Component
public class DataInitializer implements ApplicationRunner {

    private final UserService userService;

    public DataInitializer(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        try {
            String adminEmail = "admin@gmail.com";
            if (!userService.checkEmailExists(adminEmail)) {
                User admin = new User();
                admin.setEmail(adminEmail);
                admin.setPassword("123");
                admin.setFirstName("Admin");
                admin.setLastName("User");
                userService.saveUser(admin);
                System.out.println("Created default admin user: " + adminEmail);
            } else {
                System.out.println("Admin user already exists: " + adminEmail);
            }
        } catch (Exception e) {
            System.err.println("Failed to initialize default user: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
