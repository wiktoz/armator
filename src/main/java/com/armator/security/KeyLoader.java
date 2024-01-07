package com.armator.security;

import java.io.File;
import java.io.InputStream;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.nio.file.Path;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Objects;

public class KeyLoader {
    public String getKeyFromFile() {

        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("keystore")) {
            return new String(inputStream.readAllBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void createKeystoreFile(){
        String resourceFolderPath = getClass().getClassLoader().getResource("").getPath();
        String fileName = "keystore";
        Path path = Path.of(resourceFolderPath.substring(1) + fileName.trim());
        File file = new File(path.toString());
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("File already exists");
            return;
        }

        byte[] key = new byte[0];
        try {
            key = generateKey();
            System.out.println(new BigInteger(1, key).toString(16));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        saveKeyToFile(key);
    }

    private byte[] generateKey() throws NoSuchAlgorithmException {
        SecureRandom secureRandom = SecureRandom.getInstanceStrong();
        byte[] values = new byte[32];
        secureRandom.nextBytes(values);
        return values;
    }
    private void saveKeyToFile(byte[] key){
        try (PrintWriter pw = new PrintWriter("target\\classes\\keystore")) {
            pw.println(new BigInteger(1, key).toString(16));
            pw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
