package com.armator.security;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.BufferedReader;
import java.io.InputStream;

/**
 * Classes used to check if password is secure according to password policy made by CERT Polska
 * Reference: https://cert.pl/posts/2022/01/kompleksowo-o-haslach/
 */
public class PasswordSecurityHandler {
    public boolean isOnBlacklist(String password) {
            try {
                String root = System.getProperty("user.dir");
                Path path = Paths.get(root + "/weakpass.txt");
                return Files.lines(path).anyMatch(l -> l.contains(password));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    public boolean isPasswordLengthValid(String password) {
        return (password.length() >= 12 && password.length() <= 64);
    }
}