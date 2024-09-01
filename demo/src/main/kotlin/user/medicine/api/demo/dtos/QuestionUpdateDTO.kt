package user.medicine.api.demo.dtos

data class QuestionUpdateDTO(
    val content: String? = null,
    val anonymous: Boolean? = null,
    val likes: Int? = null,
)