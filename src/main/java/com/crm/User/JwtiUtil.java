package com.crm.User;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtiUtil {

private static final SecretKey key =
            Keys.secretKeyFor(SignatureAlgorithm.HS256);


    public String genrateToken(String userName){

        return Jwts.builder()
        .setSubject(userName)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
       .signWith(key, SignatureAlgorithm.HS256)
        .compact();
    }

    public String extractUserName(String token){

       
return Jwts.parserBuilder()
            .setSigningKey(key)   // ✅ SAME SecretKey used for signing
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
    
}
