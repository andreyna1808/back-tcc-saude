package user.medicine.api.demo.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.demo.models.Answer

interface AnswerRepository : MongoRepository<Answer, String> {
    // Define um método para encontrar respostas por questionId
    fun findByQuestionId(questionId: String): List<Answer>
}