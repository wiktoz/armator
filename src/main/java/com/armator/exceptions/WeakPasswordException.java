package com.armator.exceptions;

public class WeakPasswordException extends SecurityException{
    public WeakPasswordException(String message) {
        super(message);
    }
}
