package user.medicine.api.backend.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.backend.models.Question

interface QuestionRepository : MongoRepository<Question, String> {
    fun findByUserId(userId: String): List<Question>
}