package user.medicine.api.backend.controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import user.medicine.api.backend.configs.JwtUtil
import user.medicine.api.backend.services.AuthService

@RestController
@RequestMapping("api/auth")
class AuthController(
    private val authService: AuthService, private val jwtUtil: JwtUtil
) {

    @PostMapping("/logout")
    fun logout(@RequestHeader("Authorization") authHeader: String): ResponseEntity<Any> {
        if (authHeader.startsWith("Bearer ")) {
            val token = authHeader.substring(7)
            authService.blacklistToken(token)
            return ResponseEntity.ok("Logged out successfully")
        }
        return ResponseEntity.status(400).body("Invalid token")
    }

    @PostMapping("/users/login")
    fun loginUser(@RequestBody loginRequest: Map<String, String>): ResponseEntity<Any> {
        val email = loginRequest["email"]
        val password = loginRequest["password"]

        if (email != null && password != null) {
            try {
                val userDetails = authService.loadUserByEmail(email) // Chama o método correto para usuários
                if (userDetails.password == password) {
                    val tokenData = jwtUtil.generateToken(email)
                    return ResponseEntity.ok(
                        mapOf(
                            "token" to tokenData["token"],
                            "expiresAt" to tokenData["expiresAt"],
                            "typeUser" to "user"
                        )
                    )
                }
            } catch (e: Exception) {
                // Handle user not found
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials")
    }

    @PostMapping("/doctors/login")
    fun loginDoctor(@RequestBody loginRequest: Map<String, String>): ResponseEntity<Any> {
        val email = loginRequest["email"]
        val password = loginRequest["password"]

        if (email != null && password != null) {
            try {
                val doctorDetails = authService.loadDoctorByEmail(email) // Chama o método correto para médicos
                if (doctorDetails.password == password) {
                    val tokenData = jwtUtil.generateToken(email)
                    return ResponseEntity.ok(
                        mapOf(
                            "token" to tokenData["token"],
                            "expiresAt" to tokenData["expiresAt"],
                            "typeUser" to "user"
                        )
                    )
                }
            } catch (e: Exception) {
                println("Error: ${e.message}")
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials")
    }
}
