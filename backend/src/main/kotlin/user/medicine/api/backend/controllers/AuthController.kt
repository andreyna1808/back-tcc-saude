package user.medicine.api.backend.controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import user.medicine.api.backend.configs.JwtUtil
import user.medicine.api.backend.repositories.DoctorRepository
import user.medicine.api.backend.repositories.UserRepository
import user.medicine.api.backend.services.AuthService

@RestController
@RequestMapping("api/auth")
class AuthController(
    private val authService: AuthService,
    private val jwtUtil: JwtUtil,
    private val doctorRepository: DoctorRepository,
    private val userRepository: UserRepository
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
                val userDetails = authService.loadUserByEmail(email)


                if (userDetails.password == password) {
                    val user = userRepository.findByEmail(email) // Obtenha o usuário do banco de dados
                    val tokenData = jwtUtil.generateToken(email, user!!.id!!) // Passe o ID ao gerar o token
                    return ResponseEntity.ok(
                        mapOf(
                            "token" to tokenData["token"], "expiresAt" to tokenData["expiresAt"], "typeUser" to "user"
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
                val doctorDetails = authService.loadDoctorByEmail(email)
                if (doctorDetails.password == password) {
                    val doctor = doctorRepository.findByEmail(email) // Obtenha o médico do banco de dados
                    val tokenData = jwtUtil.generateToken(email, doctor!!.id!!) // Passe o ID ao gerar o token
                    return ResponseEntity.ok(
                        mapOf(
                            "token" to tokenData["token"], "expiresAt" to tokenData["expiresAt"], "typeUser" to "doctor"
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
