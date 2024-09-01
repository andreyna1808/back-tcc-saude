package user.medicine.api.backend.services

import org.springframework.stereotype.Service
import user.medicine.api.backend.models.*
import user.medicine.api.backend.repositories.QuestionRepository
import user.medicine.api.backend.repositories.AnswerRepository
import user.medicine.api.backend.repositories.UserRepository
import user.medicine.api.backend.repositories.DoctorRepository

// Interface que define os métodos para classes que podem ser "curtidas"
interface Likeable {
    val likedQuestions: List<LikedQuestion>
    val likedAnswers: List<LikedAnswer>
}

@Service
class LikeService(
    private val userRepository: UserRepository,
    private val doctorRepository: DoctorRepository,
    private val questionRepository: QuestionRepository,
    private val answerRepository: AnswerRepository
) {

    // Método principal para alternar o like em uma pergunta ou resposta
    fun toggleLike(id: String, itemId: String, isQuestion: Boolean, isUser: Boolean): Any {

        // Obtém a entidade (usuário ou médico) pelo ID
        val entity = getEntityById(id, isUser)

        // Cria listas mutáveis para perguntas e respostas curtidas
        val likedQuestions = entity.likedQuestions.toMutableList()
        val likedAnswers = entity.likedAnswers.toMutableList()

        // Verifica se é uma pergunta
        if (isQuestion) {

            // Procura um like existente na lista de perguntas curtidas
            val existingLike = likedQuestions.find { it.questionId == itemId }
            if (existingLike != null) {

                // Remove o like existente e decrementa a contagem de likes
                likedQuestions.remove(existingLike)
                updateLikeCount(itemId, isQuestion, -1)
            } else {

                // Adiciona um novo like e incrementa a contagem de likes
                likedQuestions.add(LikedQuestion(questionId = itemId, liked = true))
                updateLikeCount(itemId, isQuestion, 1)
            }
        } else {

            // Procura um like existente na lista de respostas curtidas
            val existingLike = likedAnswers.find { it.answerId == itemId }
            if (existingLike != null) {

                // Remove o like existente e decrementa a contagem de likes
                likedAnswers.remove(existingLike)
                updateLikeCount(itemId, isQuestion, -1)
            } else {

                // Adiciona um novo like e incrementa a contagem de likes
                likedAnswers.add(LikedAnswer(answerId = itemId, liked = true))
                updateLikeCount(itemId, isQuestion, 1)
            }
        }

        // Atualiza a entidade com as novas listas de likes
        val updatedEntity = updateEntityWithLikes(entity, likedQuestions, likedAnswers, isUser)

        // Salva a entidade atualizada no repositório
        return saveUpdatedEntity(updatedEntity, isUser)
    }

    // Método para obter a entidade (usuário ou médico) pelo ID
    private fun getEntityById(id: String, isUser: Boolean): Likeable {
        return if (isUser) {
            userRepository.findById(id).orElseThrow { RuntimeException("User not found") } as Likeable
        } else {
            doctorRepository.findById(id).orElseThrow { RuntimeException("Doctor not found") } as Likeable
        }
    }

    // Método para atualizar a entidade com as novas listas de likes
    private fun updateEntityWithLikes(
        entity: Likeable, likedQuestions: List<LikedQuestion>, likedAnswers: List<LikedAnswer>, isUser: Boolean
    ): Likeable {
        return if (isUser) {
            (entity as User).copy(
                likedQuestions = likedQuestions, likedAnswers = likedAnswers
            ) as Likeable
        } else {
            (entity as Doctor).copy(
                likedQuestions = likedQuestions, likedAnswers = likedAnswers
            ) as Likeable
        }
    }

    // Método para salvar a entidade atualizada no repositório
    private fun saveUpdatedEntity(entity: Likeable, isUser: Boolean): Any {
        return if (isUser) {
            userRepository.save(entity as User)
        } else {
            doctorRepository.save(entity as Doctor)
        }
    }

    // Método para atualizar a contagem de likes de uma pergunta ou resposta
    private fun updateLikeCount(itemId: String, isQuestion: Boolean, delta: Int) {
        if (isQuestion) {
            val question = questionRepository.findById(itemId).orElseThrow { RuntimeException("Question not found") }
            val updatedQuestion = question.copy(likes = question.likes + delta)
            questionRepository.save(updatedQuestion)
        } else {
            val answer = answerRepository.findById(itemId).orElseThrow { RuntimeException("Answer not found") }
            val updatedAnswer = answer.copy(likes = answer.likes + delta)
            answerRepository.save(updatedAnswer)
        }
    }
}