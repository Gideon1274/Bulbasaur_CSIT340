package com.bulbasaur.bulbasaurbackend.model;

public class CartRequest {

    private String userEmail;
    private long productId;
    private long cartId;

    public long getCartId() {
        return cartId;
    }

    public void setCartId(long cartId) {
        this.cartId = cartId;
    }

    public CartRequest(String email, long productId) {
        this.userEmail = email;
        this.productId = productId;
    }

    public CartRequest() {

    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String email) {
        this.userEmail = email;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }
}
