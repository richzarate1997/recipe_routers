package learn.agileaprons.security;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@ConditionalOnWebApplication
public class SecurityConfig {

    private final JwtConverter jwtConverter;

    public SecurityConfig(JwtConverter jwtConverter) {
        this.jwtConverter = jwtConverter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {

        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                .antMatchers(HttpMethod.POST,
                        "/security/authenticate", "/security/create-account").permitAll()
                .antMatchers(HttpMethod.POST, "/security/refresh-token").authenticated()
                .antMatchers(HttpMethod.GET,
                        "/api/ingredient",
                        "/api/ingredient/*",
                        "/api/recipe",
                        "/api/recipe/*",
                        "/api/recipe/search/*",
                        "/api/unit",
                        "/api/cuisine",
                        "/api/user/*", "/api/user"
                ).permitAll()
                .antMatchers(HttpMethod.POST, "/api/ingredient", "/api/recipe").permitAll()
                // Replace ^ with authenticated permission only for posts below later \/
//                .antMatchers(HttpMethod.POST, "/api/ingredient", "/api/recipe", "/api/user").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/recipe/*", "/api/user/*").permitAll()
                // Replace ^ with authenticated permission only for posts below later \/
//                .antMatchers(HttpMethod.PUT, "/api/*").authenticated()
                .antMatchers(HttpMethod.DELETE, "/api/recipe/*").permitAll()
                // Replace ^ with authenticated permission only for posts below later \/
//                .antMatchers(HttpMethod.DELETE, "/api/*").hasAuthority("ADMIN")
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(authConfig), jwtConverter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
