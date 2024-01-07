package com.armator.security;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Classes used to check if password is secure according to password policy made by CERT Polska
 * Reference: https://cert.pl/posts/2022/01/kompleksowo-o-haslach/
 */
public class PasswordSecurityHandler {
    public static boolean isOnBlacklist(String password) {
        try {
            return Files.lines(Paths.get("weakpass.txt")).anyMatch(l -> l.contains(password));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public static boolean isPasswordLengthValid(String password) {
        return (password.length() >= 12 && password.length() <= 64);
    }
}
