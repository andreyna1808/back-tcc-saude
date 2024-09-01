package user.medicine.api.demo.models

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import user.medicine.api.demo.services.Likeable

@Document(collection = "users")
data class User(
    @Id val id: String? = null,
    val name: String,
    @Indexed(unique = true)
    val nickname: String,
    @Indexed(unique = true)
    val email: String,
    val password: String, // Senha criptografada
    val blockedComment: Boolean = true,
    val questions: List<String> = emptyList(), // Lista de IDs de perguntas associadas ao usuário
    override val likedQuestions: List<LikedQuestion> = emptyList(), // Lista de perguntas com likes do usuário
    override val likedAnswers: List<LikedAnswer> = emptyList(), // Lista de perguntas com likes do usuário
    val profileImageUrl: String? = null  // URL da imagem de perfil
): Likeable
