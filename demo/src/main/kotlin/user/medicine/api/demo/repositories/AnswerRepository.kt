package user.medicine.api.demo.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.demo.models.Answer
import user.medicine.api.demo.models.Question

interface AnswerRepository : MongoRepository<Answer, String> {
    // Define um método para encontrar respostas por questionId
    fun findByQuestionId(questionId: String): List<Answer>
    fun findByDoctorId(doctorId: String): List<Answer>
}