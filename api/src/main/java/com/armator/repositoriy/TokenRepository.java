package com.armator.repositoriy;

import com.armator.model.RevokedToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<RevokedToken, Integer> {
    Optional<RevokedToken> findByRevokedTokenDigest(String revokedTokenDigest);
}
