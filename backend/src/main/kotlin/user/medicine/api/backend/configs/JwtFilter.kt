package user.medicine.api.backend.configs

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException

@Component
class JwtFilter(
    private val jwtUtil: JwtUtil,
    private val userDetailsService: UserDetailsService,
    private val doctorDetailsService: UserDetailsService
) : OncePerRequestFilter() {

    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val authHeader = request.getHeader("Authorization")

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            val token = authHeader.substring(7)
            if (jwtUtil.isTokenExpired(token).not()) {
                val username = jwtUtil.extractUsername(token)
                // Tente carregar detalhes do usuário
                val userDetails: UserDetails? = try {
                    userDetailsService.loadUserByUsername(username)
                } catch (e: Exception) {
                    null
                }

                // Tente carregar detalhes do médico
                val doctorDetails: UserDetails? = try {
                    doctorDetailsService.loadUserByUsername(username)
                } catch (e: Exception) {
                    null
                }

                // Configure a autenticação se os detalhes do usuário ou do médico foram encontrados
                if (userDetails != null) {
                    val auth = UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)
                    auth.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication = auth
                } else if (doctorDetails != null) {
                    val auth = UsernamePasswordAuthenticationToken(doctorDetails, null, doctorDetails.authorities)
                    auth.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication = auth
                }
            }
        }
        chain.doFilter(request, response)
    }
}
