package user.medicine.api.backend.controllers

import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import user.medicine.api.backend.configs.JwtUtil
import user.medicine.api.backend.dtos.DoctorUpdateDTO
import user.medicine.api.backend.models.Answer
import user.medicine.api.backend.models.Doctor
import user.medicine.api.backend.services.DoctorDetailsService
import user.medicine.api.backend.services.DoctorService
import user.medicine.api.backend.services.FileStorageService
import user.medicine.api.backend.services.LikeService
import java.io.File

@RestController
@RequestMapping("/api/doctors")
class DoctorController(
    private val doctorService: DoctorService,
    private val fileStorageService: FileStorageService,
    private val likeService: LikeService,
    private val doctorDetailsService: DoctorDetailsService,
    private val jwtUtil: JwtUtil,
    private val passwordEncoder: PasswordEncoder
) {

    @PostMapping("/register")
    fun register(@RequestBody doctor: Doctor): Doctor = doctorService.registerDoctor(doctor)

    @GetMapping("")
    fun getAllDoctors(): List<Doctor> = doctorService.getAllDoctors()

    @GetMapping("/{id}")
    fun getDoctor(@PathVariable id: String): Doctor = doctorService.getDoctorById(id)

    @GetMapping("/{id}/answers")
    fun getDoctorAnswers(@PathVariable id: String): List<Answer> {
        return doctorService.getDoctorAnswers(id)
    }

    @PutMapping("/{id}/like")
    fun toggleLike(
        @PathVariable id: String,
        @RequestParam("itemId") itemId: String,
        @RequestParam("isQuestion") isQuestion: Boolean
    ): Any {
        return likeService.toggleLike(id, itemId, isQuestion, false)
    }

    @PutMapping("/{id}")
    fun updateDoctor(@PathVariable id: String, @RequestBody updatedDoctor: DoctorUpdateDTO): Doctor {
        return doctorService.updateDoctor(id, updatedDoctor)
    }

    @DeleteMapping("/{id}")
    fun deleteDoctor(@PathVariable id: String) {
        doctorService.deleteDoctor(id)
    }

    @PutMapping("/{id}/image")
    fun updateProfileImage(
        @PathVariable id: String, @RequestParam("file") file: MultipartFile
    ): ResponseEntity<String> {
        // Salva o novo arquivo e substitui o antigo, se existir
        val imageUrl = fileStorageService.storeFile(file, id)

        // Atualiza o registro do médico com a nova URL da imagem
        doctorService.updateDoctor(id, DoctorUpdateDTO(profileImageUrl = imageUrl))

        return ResponseEntity.ok("Profile image updated successfully")
    }

    @GetMapping("/{id}/image")
    fun getImage(@PathVariable id: String): ResponseEntity<File> {
        val doctor = doctorService.getDoctorById(id)
        val imageUrl = doctor.profileImageUrl ?: throw RuntimeException("Image not found")
        val file = fileStorageService.getFile(imageUrl.substringAfter("/uploads/"))
        return ResponseEntity.ok(file)
    }

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: Map<String, String>): ResponseEntity<Any> {
        val email = loginRequest["email"]
        val password = loginRequest["password"]

        if (email != null && password != null) {
            try {
                val doctorDetails = doctorDetailsService.loadUserByUsername(email)
                println("doctorDetails: $doctorDetails")
                if (passwordEncoder.matches(password, doctorDetails.password)) {
                    val token = jwtUtil.generateToken(email)
                    println("token: $token")
                    return ResponseEntity.ok(mapOf("token" to token))
                }
            } catch (e: Exception) {
                println("Error: ${e.message}")  // Adicione um log para verificação
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials")
    }
}
