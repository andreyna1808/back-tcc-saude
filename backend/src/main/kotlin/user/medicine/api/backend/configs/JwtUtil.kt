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
    private lateinit var secretKey: String  // Chave secreta para assinar o token

    // Gera uma chave do tipo Key a partir da chave secreta
    private fun getKey(): Key {
        return Keys.hmacShaKeyFor(secretKey.toByteArray())  // Cria uma chave HMAC a partir da chave secreta
    }

    // Gera um token JWT para um usuário
    fun generateToken(username: String): String {
        return Jwts.builder()
            .setSubject(username)  // Define o nome de usuário no token
            .setIssuedAt(Date())  // Define a data de emissão do token
            .setExpiration(Date(System.currentTimeMillis() + 1000 * 60 * 60))  // Define a data de expiração (1 hora)
            .signWith(getKey(), SignatureAlgorithm.HS256)  // Assina o token com a chave secreta
            .compact()  // Cria o token como uma String compacta
    }

    // Extrai o nome de usuário do token
    fun extractUsername(token: String): String {
        return getClaims(token).subject  // Obtém o nome de usuário a partir dos "claims" do token
    }

    // Verifica se o token está expirado
    fun isTokenExpired(token: String): Boolean {
        return getClaims(token).expiration.before(Date())  // Verifica se a data de expiração é anterior à data atual
    }

    // Obtém os "claims" do token
    private fun getClaims(token: String): Claims {
        return Jwts.parserBuilder()  // Usa o parserBuilder em vez do parser para criar um parser configurado
            .setSigningKey(getKey())  // Define a chave secreta para validar o token
            .build()
            .parseClaimsJws(token)  // Analisa o token
            .body  // Obtém os "claims" do token
    }
}
