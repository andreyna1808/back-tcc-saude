package user.medicine.api.backend.services

import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import user.medicine.api.backend.dtos.AnswerUpdateDTO
import user.medicine.api.backend.exceptions.AnswerNotFoundException
import user.medicine.api.backend.exceptions.DoctorNotFoundException
import user.medicine.api.backend.exceptions.QuestionNotFoundException
import user.medicine.api.backend.models.Answer
import user.medicine.api.backend.repositories.AnswerRepository
import user.medicine.api.backend.repositories.DoctorRepository
import user.medicine.api.backend.repositories.QuestionRepository

@Service
class AnswerService(
    private val answerRepository: AnswerRepository,
    private val questionRepository: QuestionRepository,
    private val doctorRepository: DoctorRepository,
    @Lazy private val doctorService: DoctorService,
    @Lazy private val questionService: QuestionService,
    @Lazy private val userService: UserService
) {

    fun createAnswer(answer: Answer): Answer {
        // Verifica se a pergunta associada existe
        val questionExists = questionRepository.existsById(answer.questionId)
        if (!questionExists) {
            throw QuestionNotFoundException("ID question not found")
        }

        // Verifica se o médico associado existe (se aplicável)
        val doctorExists = doctorRepository.existsById(answer.doctorId)
        if (!doctorExists) {
            throw DoctorNotFoundException("Doctor not found")
        }

        // Salva a resposta no banco de dados
        val saveAnswer = answerRepository.save(answer)

        // Adiciona o ID da resposta à lista de perguntas do usuário
        doctorService.addAnswerToDoctor(saveAnswer.doctorId, saveAnswer.id!!)

        // retorna a resposta
        return saveAnswer
    }

    fun getAllAnswers(): List<Map<String, Any?>> {
        val answers = answerRepository.findAll()
        return answers.map { answer ->
            val doctor = doctorService.getById(answer.doctorId)
            val question = questionService.getById(answer.questionId)
            mapOf(
                "id" to answer.id,
                "questionData" to mapOf(
                    "id" to question.id,
                    "content" to question.content,
                    "likes" to question.likes
                ),
                "doctorData" to mapOf(
                    "id" to doctor.id,
                    "name" to doctor.name,
                    "crm" to doctor.crm,
                    "specialty" to doctor.specialty
                ),
                "content" to answer.content,
                "likes" to answer.likes
            )
        }
    }

    fun getAnswerById(id: String): Map<String, Any?> {
        val answer = answerRepository.findById(id).orElseThrow { RuntimeException("Answer not found") }
        val doctor = doctorService.getById(answer.doctorId)
        val question = questionService.getById(answer.questionId)
        val user = userService.getById(question.userId)
        return mapOf(
            "id" to answer.id,
            "questionData" to mapOf(
                "id" to question.id,
                "content" to question.content,
                "likes" to question.likes
            ),
            "userData" to mapOf(
                "id" to user.id,
                "nickname" to user.nickname,
            ),
            "doctorData" to mapOf(
                "id" to doctor.id,
                "name" to doctor.name,
                "crm" to doctor.crm,
                "specialty" to doctor.specialty
            ),
            "content" to answer.content,
            "likes" to answer.likes
        )
    }

    fun getAnswersByQuestionId(questionId: String): List<Map<String, Any?>> {
        val answers = answerRepository.findByQuestionId(questionId)
        return answers.map { answer ->
            val doctor = doctorService.getById(answer.doctorId)
            mapOf(
                "id" to answer.id,
                "doctorData" to mapOf(
                    "id" to doctor.id,
                    "name" to doctor.name,
                    "crm" to doctor.crm,
                    "specialty" to doctor.specialty
                ),
                "content" to answer.content,
                "likes" to answer.likes
            )
        }
    }

    fun getById(id: String): Answer {
        // Busca a resposta pelo ID. Se não encontrar, lança uma exceção
        return answerRepository.findById(id).orElseThrow { AnswerNotFoundException(id) }
    }

    fun updateAnswer(id: String, updatedAnswerDTO: AnswerUpdateDTO): Answer {
        // Busca a resposta existente pelo ID
        val existingAnswer = getById(id)

        // Cria uma nova resposta com as informações atualizadas
        val updatedAnswerEntity = existingAnswer.copy(
            content = updatedAnswerDTO.content ?: existingAnswer.content,
            likes = updatedAnswerDTO.likes ?: existingAnswer.likes
        )

        // Salva a resposta atualizada no banco de dados e retorna a resposta atualizada
        return answerRepository.save(updatedAnswerEntity)
    }

    fun deleteAnswer(id: String) {
        // Busca a resposta pelo ID e a deleta do banco de dados
        val answer = getById(id)
        answerRepository.delete(answer)
    }
}
