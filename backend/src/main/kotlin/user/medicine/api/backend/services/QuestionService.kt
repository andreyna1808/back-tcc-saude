package user.medicine.api.backend.services

import org.springframework.stereotype.Service
import user.medicine.api.backend.dtos.QuestionUpdateDTO
import user.medicine.api.backend.models.Question
import user.medicine.api.backend.repositories.QuestionRepository

@Service
class QuestionService(
    private val questionRepository: QuestionRepository,
    private val userService: UserService // Adicione o UserService para atualizar o usuário
) {

    fun createQuestion(question: Question): Question {
        // Verifica se o usuário existe
        val user = userService.getUserById(question.userId)

        // Salva a pergunta no banco de dados
        val savedQuestion = questionRepository.save(question)

        // Adiciona o ID da pergunta à lista de perguntas do usuário
        userService.addQuestionToUser(question.userId, savedQuestion.id!!)

        return savedQuestion
    }


    fun getAllQuestions(): List<Question> {
        return questionRepository.findAll()
    }

    fun getQuestionById(id: String): Question {
        // Busca a pergunta pelo ID. Se não encontrar, lança uma exceção
        return questionRepository.findById(id).orElseThrow { RuntimeException("Question not found") }
    }

    fun updateQuestion(id: String, updatedQuestionDTO: QuestionUpdateDTO): Question {
        // Busca a pergunta existente pelo ID
        val existingQuestion = getQuestionById(id)

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
        val question = getQuestionById(id)
        questionRepository.delete(question)
    }
}