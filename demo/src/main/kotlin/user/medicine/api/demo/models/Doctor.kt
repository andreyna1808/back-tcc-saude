package user.medicine.api.demo.models

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import user.medicine.api.demo.services.Likeable

@Document(collection = "doctors")
data class Doctor(
    @Id val id: String? = null,
    val name: String,
    @Indexed(unique = true)
    val crm: String,  // Número do CRM
    @Indexed(unique = true)
    val email: String,
    val password: String,  // Senha criptografada
    val specialty: String,  // Especialidade do médico
    val answers: List<String> = emptyList(), // Lista de IDs de respostas associadas ao médico
    override val likedQuestions: List<LikedQuestion> = emptyList(), // Lista de perguntas com likes do usuário
    override val likedAnswers: List<LikedAnswer> = emptyList(), // Lista de perguntas com likes do usuário
    val profileImageUrl: String? = null,  // URL da imagem de perfil
) : Likeable
