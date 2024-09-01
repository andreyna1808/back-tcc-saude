package user.medicine.api.backend.dtos

data class QuestionUpdateDTO(
    val content: String? = null,
    val anonymous: Boolean? = null,
    val likes: Int? = null,
)