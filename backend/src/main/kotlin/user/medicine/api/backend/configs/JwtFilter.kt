package user.medicine.api.backend.configs

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import user.medicine.api.backend.services.AuthService
import java.io.IOException

@Component
class JwtFilter(
    private val jwtUtil: JwtUtil,
    private val authService: AuthService,
) : OncePerRequestFilter() {

    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val authHeader = request.getHeader("Authorization")

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            val token = authHeader.substring(7)
            if (!jwtUtil.isTokenExpired(token)) {
                val email = jwtUtil.extractUsername(token)
                println("Entrei no primeiro if $email")

                // Primeiro tenta carregar como usuário
                var userDetails: UserDetails? = try {
                    authService.loadUserByEmail(email)
                } catch (e: UsernameNotFoundException) {
                    null
                }

                // Se não encontrou como usuário, tenta como médico
                if (userDetails == null) {
                    userDetails = try {
                        authService.loadDoctorByEmail(email)
                    } catch (e: UsernameNotFoundException) {
                        null
                    }
                }

                println("userDetails $userDetails")

                if (userDetails != null) {
                    val auth = UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)
                    println("auth $auth")
                    auth.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication = auth
                }
            }
        }
        chain.doFilter(request, response)
    }
}

