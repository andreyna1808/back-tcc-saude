package user.medicine.api.backend.models

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "answers")
data class Answer(
    @Id val id: String? = null,
    val questionId: String,  // ID da pergunta à qual a resposta está vinculada
    val doctorId: String,  // ID do médico que respondeu
    val content: String,  // Conteúdo da resposta
    val likes: Int = 0  // Contador de curtidas
)