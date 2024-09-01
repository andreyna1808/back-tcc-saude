package user.medicine.api.backend.dtos

import org.springframework.web.multipart.MultipartFile

data class UserUpdateDTO(
    val name: String? = null,
    val email: String? = null,
    val nickname: String? = null,
    val password: String? = null,
    val profileImageUrl: String?  // URL da imagem de perfil
)