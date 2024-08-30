package user.medicine.api.demo.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.demo.models.Question

interface QuestionRepository : MongoRepository<Question, String>