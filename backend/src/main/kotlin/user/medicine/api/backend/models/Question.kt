package user.medicine.api.backend.models

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "questions")
data class Question(
    @Id val id: String? = null,
    val userId: String,  // ID do usuário que fez a pergunta
    val content: String,  // Conteúdo da pergunta
    val anonymous: Boolean = false,  // Indica se a pergunta é anônima
    val likes: Int = 0  // Contador de curtidas
)