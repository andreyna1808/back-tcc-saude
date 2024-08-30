package user.medicine.api.demo.dtos

data class UserUpdateDTO(
    val name: String? = null,
    val email: String? = null,
    val nickname: String? = null,
    val password: String? = null
)