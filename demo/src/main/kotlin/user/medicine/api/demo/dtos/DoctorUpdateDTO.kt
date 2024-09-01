package user.medicine.api.demo.dtos

import org.springframework.web.multipart.MultipartFile

data class DoctorUpdateDTO(
    val name: String? = null,
    val crm: String? = null,
    val email: String? = null,
    val password: String? = null,
    val specialty: String? = null,
    val profileImageUrl: String?  // URL da imagem de perfil
)