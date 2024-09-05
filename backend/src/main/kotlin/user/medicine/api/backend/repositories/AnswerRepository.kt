package user.medicine.api.backend.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.backend.models.Answer
import user.medicine.api.backend.models.Question

interface AnswerRepository : MongoRepository<Answer, String> {
    // Define um método para encontrar respostas por questionId
    fun findByQuestionId(questionId: String): List<Answer>
    fun findByDoctorId(doctorId: String): List<Answer>
    fun findAllByQuestionId(questionId: String): List<Answer>
}