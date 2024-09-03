package user.medicine.api.backend.configs

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.security.Key
import java.util.Date

@Component
class JwtUtil {

    @Value("\${jwt.secret}")
    private lateinit var secretKey: String // A chave secreta para assinar o JWT, que é injetada através do application.properties

    private val expirationTimeInMs = 1000 * 60 * 45 // 45 minutos em milissegundos, define o tempo de expiração do token

    private fun getKey(): Key {
        // Gera a chave de assinatura usando a chave secreta convertida para bytes
        return Keys.hmacShaKeyFor(secretKey.toByteArray())
    }

    // Gera um token JWT e retorna um mapa contendo o token e sua data de expiração
    fun generateToken(username: String, id: String): Map<String, Any> {
        val expirationDate = Date(System.currentTimeMillis() + expirationTimeInMs) // Data de expiração calculada com base no tempo atual

        // Cria o token JWT usando o nome de usuário, data de emissão, data de expiração e assina com a chave
        val token = Jwts.builder()
            .setSubject(username)
            .claim("id", id) // Adicionando o ID como claim
            .setIssuedAt(Date())
            .setExpiration(expirationDate)
            .signWith(getKey(), SignatureAlgorithm.HS256)
            .compact()

        // Retorna o token e a data de expiração em um mapa
        return mapOf(
            "token" to token, "expiresAt" to expirationDate.time // Data de expiração em milissegundos
        )
    }

    // Extrai o nome de usuário do token JWT
    fun extractUsername(token: String): String {
        return getClaims(token).subject // Pega as claims (informações do token) e retorna o subject, que é o username
    }

    // Verifica se o token está expirado
    fun isTokenExpired(token: String): Boolean {
        return getClaims(token).expiration.before(Date()) // Compara a data de expiração do token com a data atual
    }

    // Extrai todas as claims (informações) do token
    private fun getClaims(token: String): Claims {
        // Configura o parser JWT com a chave de assinatura e extrai o corpo (claims) do token
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).body
    }
}
