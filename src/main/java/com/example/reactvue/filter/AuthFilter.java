package com.example.reactvue.filter;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;


@Component
@Order(1)
public class AuthFilter implements Filter {
	@Override
	public void init(FilterConfig filterConfig) {
		System.out.println("Initiating WebFilter >> ");
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
		try {
			String uri = ((HttpServletRequest) req).getRequestURI();
			System.out.println("uri equals:  " + uri);
			chain.doFilter(req, res);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void destroy() {
		System.out.println("Destroying WebFilter >> ");
	}
}
