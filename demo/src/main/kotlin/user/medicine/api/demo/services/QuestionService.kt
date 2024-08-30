package user.medicine.api.demo.services

import org.springframework.stereotype.Service
import user.medicine.api.demo.models.Question
import user.medicine.api.demo.repositories.QuestionRepository

@Service
class QuestionService(private val questionRepository: QuestionRepository) {

    fun createQuestion(question: Question): Question {
        // Salva a pergunta no banco de dados e retorna a mesma pergunta
        return questionRepository.save(question)
    }

    fun getQuestionById(id: String): Question {
        // Busca a pergunta pelo ID. Se não encontrar, lança uma exceção
        return questionRepository.findById(id).orElseThrow { RuntimeException("Question not found") }
    }

    fun updateQuestion(id: String, updatedQuestion: Question): Question {
        // Busca a pergunta existente pelo ID
        val existingQuestion = getQuestionById(id)

        // Informações atualizadas
        val updatedQuestionEntity = existingQuestion.copy(
            content = updatedQuestion.content,
            anonymous = updatedQuestion.anonymous
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