package user.medicine.api.backend.configs

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf { csrf -> csrf.disable() } // Desativa a proteção CSRF
            .authorizeHttpRequests { requests ->
                requests.anyRequest().permitAll() // Permite acesso a todas as requisições
            }

        return http.build()
    }
}



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