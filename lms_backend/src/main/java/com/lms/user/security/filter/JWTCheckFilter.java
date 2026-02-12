package com.lms.user.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;
import com.lms.user.controller.Response;
import com.lms.user.controller.ResponseMessage;
import com.lms.user.controller.ResponseStatusCode;
import com.lms.user.security.SecurityUser;
import com.lms.user.util.JWTUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

    String method = request.getMethod();
    String path = request.getRequestURI();
    log.info("JWTCheckFilter shouldNotFilter - method: {}, path: {}", method, path);

    // 1) Preflight(CORS) OPTIONS는 무조건 제외
    if ("OPTIONS".equalsIgnoreCase(method)) {
      return true;
    }
    // 2) Swagger & API Docs (굳이 JWT 필요 없음)
    if (path.startsWith("/swagger") ||
        path.startsWith("/v3/api-docs") ||
        path.startsWith("/swagger-ui") ||
        path.startsWith("/api-docs") ||
        path.startsWith("/admin_deletecourse") ||
        path.startsWith("/error")) {
      return true;
    }

    // 3) 로그인 페이지 + 로그인 처리 URL (formLogin)
    if (path.startsWith("/user/login")) {
      return true;
    }

    // 4) 회원가입 (POST /user)
    if ("POST".equalsIgnoreCase(method) && "/user".equals(path)) {
      return true;
    }

    // 5) /api/member/**는 토큰 없이 permitAll
    if (path.startsWith("/api/member/")) {
      return true;
    }

    // 그 외는 JWT 체크 대상
    return false;

  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    log.info("1.------------------------JWTCheckFilter.......................");
    String authHeaderStr = request.getHeader("Authorization");
    log.info("2.------------------------JWTCheckFilter.......................");
    try {
      String accessToken = "";
      if (StringUtils.hasText(authHeaderStr) && authHeaderStr.startsWith("Bearer")) {
        accessToken = authHeaderStr.substring(7);
      }
      log.info("3.------------------------JWTCheckFilter.......................");
      Map<String, Object> claims = JWTUtil.validateToken(accessToken);
      log.info("4.------------------------JWTCheckFilter.......................");
      log.info("JWT claims: " + claims);

      String userid = (String) claims.get("userId");
      String password = (String) claims.get("password");
      String name = (String) claims.get("name");
      String email = (String) claims.get("email");
      Boolean social = (Boolean) claims.get("social");
      List<String> roleNames = (List<String>) claims.get("roleNames");

      SecurityUser securityUser = new SecurityUser(userid, password, name, email, social.booleanValue(), roleNames);

      log.info("-----------------------------------");
      log.info(securityUser);
      log.info(securityUser.getAuthorities());

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(securityUser,
          password, securityUser.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      
      filterChain.doFilter(request, response);

    } catch (Exception e) {

      log.error("JWT Check Error..............");
      log.error("예외객체타입  :" + e.getClass().getSimpleName());
      log.error("예외객체메세지:" + e.getMessage());
      String message = e.getMessage();
      Response response2 = new Response();

      if (message.equals("Expired")) {
        response2.setStatus(ResponseStatusCode.ERROR_EXPIRED_TOKEN);
        response2.setMessage(ResponseMessage.ERROR_EXPIRED_TOKEN);
      } else {
        response2.setStatus(ResponseStatusCode.ERROR_ACCESS_TOKEN);
        response2.setMessage(ResponseMessage.ERROR_ACCESS_TOKEN);
      }

      Gson gson = new Gson();
      String jsonStr = gson.toJson(response2);

      response.setContentType("application/json");
      PrintWriter printWriter = response.getWriter();
      printWriter.println(jsonStr);
      printWriter.close();

    }

  }

}