package com.fastarm.back.auth.security.filter;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.auth.security.entity.RefreshToken;
import com.fastarm.back.auth.security.service.JwtService;
import com.fastarm.back.auth.security.util.JwtUtil;
import com.fastarm.back.common.constants.JwtConstants;
import com.fastarm.back.auth.security.service.ResponseService;
import com.fastarm.back.member.controller.dto.MemberLoginRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Iterator;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        setFilterProcessesUrl("/auths/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        MemberLoginRequest loginRequest;

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginRequest = objectMapper.readValue(messageBody, MemberLoginRequest.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String loginId = loginRequest.getLoginId();
        String password = loginRequest.getPassword();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginId, password, null);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        LoginMemberInfo userDetails = (LoginMemberInfo) authResult.getPrincipal();
        String loginId = userDetails.getLoginId();

        Collection<? extends GrantedAuthority> authorities = authResult.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String access = JwtUtil.createJwt("access", loginId, role, JwtConstants.ACCESS_EXPIRED);
        String refresh = JwtUtil.createJwt("refresh", loginId, role, JwtConstants.REFRESH_EXPIRED);

        RefreshToken refreshToken = RefreshToken.builder()
                .loginId(loginId)
                .refreshToken(refresh)
                .build();

        jwtService.saveRefreshToken(refreshToken);

        response.setHeader("Authorization", "Bearer " + access);
        response.addCookie(ResponseService.createCookie("refresh", refresh));
        ResponseService.setResponse(response, "AU100", "일반 로그인 성공", HttpStatus.OK);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        ResponseService.setResponse(response, "AU000", "일반 로그인 실패", HttpStatus.UNAUTHORIZED);
    }

}
