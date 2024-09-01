package user.medicine.api.backend.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.backend.models.Question
import user.medicine.api.backend.models.User

interface UserRepository : MongoRepository<User, String> {
    fun existsByNickname(nickname: String): Boolean
    fun existsByEmail(email: String): Boolean
}