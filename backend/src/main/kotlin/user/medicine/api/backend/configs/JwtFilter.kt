package user.medicine.api.backend.configs

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import user.medicine.api.backend.services.AuthService
import java.io.IOException

@Component
class JwtFilter(
    private val jwtUtil: JwtUtil, // Utilitário para manipulação do JWT
    private val authService: AuthService,
) : OncePerRequestFilter() { // Filtro que será executado uma vez por requisição

    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val authHeader = request.getHeader("Authorization") // Obtém o cabeçalho de autorização da requisição

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            val token = authHeader.substring(7) // Extrai o token removendo o prefixo "Bearer "
            if (jwtUtil.isTokenExpired(token).not()) { // Verifica se o token não está expirado
                val email = jwtUtil.extractUsername(token) // Extrai o nome de usuário do token
                // Tente carregar detalhes do usuário
                val userDetails: UserDetails? = try {
                    authService.loadUserByEmail(email) // Carrega os detalhes do usuário pelo username
                } catch (e: Exception) {
                    null // Caso o usuário não seja encontrado, retorna null
                }

                // Tente carregar detalhes do médico
                val doctorDetails: UserDetails? = try {
                    authService.loadUserByEmail(email) // Carrega os detalhes do médico pelo username
                } catch (e: Exception) {
                    null // Caso o médico não seja encontrado, retorna null
                }

                // Configure a autenticação se os detalhes do usuário ou do médico foram encontrados
                if (userDetails != null) {
                    val auth = UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)
                    auth.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication =
                        auth // Define o contexto de segurança com o usuário autenticado
                } else if (doctorDetails != null) {
                    val auth = UsernamePasswordAuthenticationToken(doctorDetails, null, doctorDetails.authorities)
                    auth.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication =
                        auth // Define o contexto de segurança com o médico autenticado
                }
            }
        }
        chain.doFilter(request, response) // Passa a requisição e a resposta para o próximo filtro na cadeia
    }
}
