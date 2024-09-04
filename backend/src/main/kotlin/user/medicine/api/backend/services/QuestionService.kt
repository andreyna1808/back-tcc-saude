package user.medicine.api.backend.services

import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import user.medicine.api.backend.dtos.QuestionUpdateDTO
import user.medicine.api.backend.exceptions.QuestionNotFoundException
import user.medicine.api.backend.models.Question
import user.medicine.api.backend.repositories.QuestionRepository

@Service
class QuestionService(
    private val questionRepository: QuestionRepository,
    @Lazy private val userService: UserService, // Adicione o UserService para atualizar o usuário
    @Lazy private val answerService: AnswerService
) {

    fun createQuestion(question: Question): Question {
        // Verifica se o usuário existe
        val user = userService.getById(question.userId)

        // Salva a pergunta no banco de dados
        val savedQuestion = questionRepository.save(question)

        // Adiciona o ID da pergunta à lista de perguntas do usuário
        userService.addQuestionToUser(question.userId, savedQuestion.id!!)

        return savedQuestion
    }

    fun getAllQuestions(): List<Map<String, Any>> {
        val questions = questionRepository.findAll()
        return questions.map { question ->
            val user = userService.getById(question.userId)
            val answers = answerService.getAnswersByQuestionId(question.id!!)
            mapOf(
                "id" to question.id,
                "userData" to mapOf(
                    "id" to user.id,
                    "nickname" to user.nickname
                ),
                "content" to question.content,
                "anonymous" to question.anonymous,
                "likes" to question.likes,
                "answers" to answers
            )
        }
    }

    fun getQuestionById(id: String): Map<String, Any> {
        val question = questionRepository.findById(id).orElseThrow { RuntimeException("Question not found") }
        val user = userService.getById(question.userId)
        val answers = answerService.getAnswersByQuestionId(question.id!!)
        return mapOf(
            "id" to question.id,
            "userData" to mapOf(
                "id" to user.id,
                "nickname" to user.nickname
            ),
            "content" to question.content,
            "anonymous" to question.anonymous,
            "likes" to question.likes,
            "answers" to answers
        )
    }

    fun getById(id: String): Question {
        // Busca a pergunta pelo ID. Se não encontrar, lança uma exceção
        return questionRepository.findById(id).orElseThrow { QuestionNotFoundException(id) }
    }

    fun updateQuestion(id: String, updatedQuestionDTO: QuestionUpdateDTO): Question {
        // Busca a pergunta existente pelo ID
        val existingQuestion = getById(id)

        // Informações atualizadas
        val updatedQuestionEntity = existingQuestion.copy(
            content = updatedQuestionDTO.content ?: existingQuestion.content,
            anonymous = updatedQuestionDTO.anonymous ?: existingQuestion.anonymous,
            likes = updatedQuestionDTO.likes ?: existingQuestion.likes
        )

        // Salva a pergunta atualizada no banco de dados e retorna a pergunta atualizada
        return questionRepository.save(updatedQuestionEntity)
    }

    fun deleteQuestion(id: String) {
        // Busca a pergunta pelo ID e a deleta do banco de dados
        val question = getById(id)
        questionRepository.delete(question)
    }
}