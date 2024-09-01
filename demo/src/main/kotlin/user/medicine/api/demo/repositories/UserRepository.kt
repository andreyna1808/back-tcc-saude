package user.medicine.api.demo.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.demo.models.Question
import user.medicine.api.demo.models.User

interface UserRepository : MongoRepository<User, String> {
    fun existsByNickname(nickname: String): Boolean
    fun existsByEmail(email: String): Boolean
}