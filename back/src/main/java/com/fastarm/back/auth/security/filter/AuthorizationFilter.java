package com.fastarm.back.auth.security.filter;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.auth.security.util.JwtUtil;
import com.fastarm.back.auth.security.service.ResponseService;
import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.exception.MemberNotFoundException;
import com.fastarm.back.member.repository.MemberRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class AuthorizationFilter extends OncePerRequestFilter {

    private final MemberRepository memberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = authorization.split(" ")[1];

        try {
            JwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            ResponseService.setResponse(response, "AU005", "엑세스 토큰 만료", null, HttpStatus.UNAUTHORIZED);
            return;
        }

        String category = JwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {
            ResponseService.setResponse(response, "AU006", "엑세스 토큰 인증 실패", null, HttpStatus.UNAUTHORIZED);
            return;
        }

        String loginId = JwtUtil.getLoginId(accessToken);

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        LoginMemberInfo loginMemberInfo = new LoginMemberInfo(member);

        Authentication authToken = new UsernamePasswordAuthenticationToken(loginMemberInfo, null, loginMemberInfo.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
