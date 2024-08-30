package user.medicine.api.demo.models

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "users") // Indica que essa classe representa um documento na coleção users no MongoDB.
data class User(
    @Id val id: String? = null,
    val name: String,
    @Indexed(unique = true)
    val nickname: String,
    @Indexed(unique = true)
    val email: String,
    val password: String, // Senha criptografada
    val blockedComment: Boolean = true
)
