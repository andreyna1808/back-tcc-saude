package user.medicine.api.demo.services

import org.springframework.stereotype.Service
import user.medicine.api.demo.models.Answer
import user.medicine.api.demo.repositories.AnswerRepository

@Service
class AnswerService(private val answerRepository: AnswerRepository) {

    fun createAnswer(answer: Answer): Answer {
        // Salva a resposta no banco de dados e retorna a mesma resposta
        return answerRepository.save(answer)
    }

    fun getAnswerById(id: String): Answer {
        // Busca a resposta pelo ID. Se não encontrar, lança uma exceção
        return answerRepository.findById(id).orElseThrow { RuntimeException("Answer not found") }
    }

    fun getAnswersByQuestionId(questionId: String): List<Answer> {
        // Busca todas as respostas associadas a uma pergunta específica
        return answerRepository.findByQuestionId(questionId)
    }

    fun updateAnswer(id: String, updatedAnswer: Answer): Answer {
        // Busca a resposta existente pelo ID
        val existingAnswer = getAnswerById(id)

        // Cria uma nova resposta com as informações atualizadas
        val updatedAnswerEntity = existingAnswer.copy(
            content = updatedAnswer.content
            // Atualize outros campos conforme necessário
        )

        // Salva a resposta atualizada no banco de dados e retorna a resposta atualizada
        return answerRepository.save(updatedAnswerEntity)
    }

    fun deleteAnswer(id: String) {
        // Busca a resposta pelo ID e a deleta do banco de dados
        val answer = getAnswerById(id)
        answerRepository.delete(answer)
    }
}
