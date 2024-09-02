package user.medicine.api.backend.controllers

import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import user.medicine.api.backend.configs.JwtUtil
import user.medicine.api.backend.dtos.DoctorUpdateDTO
import user.medicine.api.backend.dtos.UserUpdateDTO
import user.medicine.api.backend.models.User
import user.medicine.api.backend.models.Question
import user.medicine.api.backend.services.FileStorageService
import user.medicine.api.backend.services.LikeService
import user.medicine.api.backend.services.UserDetailsService
import user.medicine.api.backend.services.UserService
import java.io.File

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService,
    private val fileStorageService: FileStorageService,
    private val likeService: LikeService,
    private val userDetailsService: UserDetailsService,
    private val jwtUtil: JwtUtil
) {

    @PostMapping("/register")
    fun register(@RequestBody user: User): User {
        return userService.registerUser(user)
    }

    @GetMapping("")
    fun getAllUser(): List<User> {
        return userService.getAllUsers()
    }

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: String): User {
        return userService.getUserById(id)
    }

    @GetMapping("/{id}/questions")
    fun getUserQuestions(@PathVariable id: String): List<Map<String, Any>> {
        val user = userService.getUserById(id)
        val questions = userService.getUserQuestions(id)

        return questions.map { question ->
            mapOf(
                "question" to question,
                "liked" to user.likedQuestions.any { it.questionId == question.id && it.liked }
            )
        }
    }

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: String, @RequestBody updatedUserDTO: UserUpdateDTO): User {
        return userService.updateUser(id, updatedUserDTO)
    }

    @PutMapping("/{id}/like")
    fun toggleLike(
        @PathVariable id: String,
        @RequestParam("itemId") itemId: String,
        @RequestParam("isQuestion") isQuestion: Boolean
    ): Any {
        return likeService.toggleLike(id, itemId, isQuestion, true)
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: String) {
        userService.deleteUser(id)
    }

    @PutMapping("/{id}/image")
    fun updateProfileImage(
        @PathVariable id: String, @RequestParam("file") file: MultipartFile
    ): ResponseEntity<String> {
        // Salva o novo arquivo e substitui o antigo, se existir
        val imageUrl = fileStorageService.storeFile(file, id)

        // Atualiza o registro do médico com a nova URL da imagem
        userService.updateUser(id, UserUpdateDTO(profileImageUrl = imageUrl))

        return ResponseEntity.ok("Profile image updated successfully")
    }

    @GetMapping("/{id}/image")
    fun getImage(@PathVariable id: String): ResponseEntity<File> {
        val user = userService.getUserById(id)
        val imageUrl = user.profileImageUrl ?: throw RuntimeException("Image not found")
        val file = fileStorageService.getFile(imageUrl.substringAfter("/uploads/"))
        return ResponseEntity.ok(file)
    }

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: Map<String, String>): ResponseEntity<Any> {
        val email = loginRequest["email"]
        val password = loginRequest["password"]

        if (email != null && password != null) {
            try {
                val userDetails = userDetailsService.loadUserByUsername(email)
                if (userDetails.password == password) {
                    val token = jwtUtil.generateToken(email)
                    return ResponseEntity.ok(mapOf("token" to token))
                }
            } catch (e: Exception) {
                // Handle user not found
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials")
    }
}
