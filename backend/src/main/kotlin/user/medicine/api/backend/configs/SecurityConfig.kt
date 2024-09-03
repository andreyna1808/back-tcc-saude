package user.medicine.api.backend.configs

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtFilter: JwtFilter,
) {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf { csrf ->
            csrf.disable() // Desativa CSRF
        }.authorizeHttpRequests { authz ->
            authz.requestMatchers("/api/auth/*/login", "/api/auth/logout", "/api/*/register")
                .permitAll() // Permite acesso aos endpoints de login e registro
                .anyRequest().authenticated() // Exige autenticação para outras requisições
        }.sessionManagement { session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Define a política de sessão como stateless
        }

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build() // Constrói a configuração de segurança
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder() // Usa BCrypt para codificação de senhas
    }

    @Bean
    fun authenticationManager(authenticationConfiguration: AuthenticationConfiguration): AuthenticationManager {
        return authenticationConfiguration.authenticationManager
    }

    @Bean
    fun webMvcConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000") // Permite requisições do localhost:3000
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite os métodos HTTP especificados
                    .allowedHeaders("*") // Permite todos os cabeçalhos
                    .allowCredentials(true) // Permite cookies e credenciais
            }
        }
    }
}

//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.security.config.annotation.web.builders.HttpSecurity
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
//import org.springframework.security.web.SecurityFilterChain
//
//@Configuration
//@EnableWebSecurity
//class SecurityConfig {
//
//    @Bean
//    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
//        http.csrf { csrf -> csrf.disable() } // Desativa a proteção CSRF
//            .authorizeHttpRequests { requests ->
//                requests.anyRequest().permitAll() // Permite acesso a todas as requisições
//            }
//
//        return http.build()
//    }
//}


//
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.security.config.annotation.web.builders.HttpSecurity
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
//import org.springframework.security.crypto.password.PasswordEncoder
//import org.springframework.security.web.SecurityFilterChain
//import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint
//
//@Configuration
//@EnableWebSecurity
//class SecurityConfig {
//
//    @Bean
//    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
//        http.csrf { csrf -> csrf.disable() } // Desativa a proteção CSRF para simplificar o desenvolvimento
//            .authorizeHttpRequests { requests ->
//                requests.requestMatchers("/api/users/register", "/api/doctors/register")
//                    .permitAll() // Permite acesso público para criar usuários e médicos
//                    .requestMatchers("/api/users/**", "/api/questions/**", "/api/answers/**")
//                    .authenticated() // Requer autenticação para editar e deletar
//            }
//            .httpBasic { basic -> basic.authenticationEntryPoint(basicAuthenticationEntryPoint()) } // Configura autenticação básica HTTP
//
//        return http.build()
//    }
//
//    @Bean
//    fun passwordEncoder(): PasswordEncoder {
//        return BCryptPasswordEncoder()
//    }
//
//    @Bean
//    fun basicAuthenticationEntryPoint(): BasicAuthenticationEntryPoint {
//        return BasicAuthenticationEntryPoint().apply {
//            realmName = "MyApp"
//        }
//    }
//}