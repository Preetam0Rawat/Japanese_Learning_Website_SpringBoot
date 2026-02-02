package com.preetam.japanese_learning_backend.config;


import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.preetam.japanese_learning_backend.dto.JwtTokenRequest;
import com.preetam.japanese_learning_backend.dto.JwtTokenResponse;

@RestController
@RequestMapping("/student")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> authenticate(@RequestBody JwtTokenRequest request) {

        var authToken = new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
        );

        var authentication = authenticationManager.authenticate(authToken);

        String jwt = tokenService.generateToken(authentication);

        return ResponseEntity.ok(new JwtTokenResponse(jwt));
    }


}



