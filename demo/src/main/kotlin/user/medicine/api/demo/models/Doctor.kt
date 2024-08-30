package user.medicine.api.demo.models

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "doctors")
data class Doctor(
    @Id val id: String? = null,
    val name: String,
    @Indexed(unique = true)
    val crm: String,  // Número do CRM
    @Indexed(unique = true)
    val email: String,
    val password: String,  // Senha criptografada
    val specialty: String  // Especialidade do médico
)