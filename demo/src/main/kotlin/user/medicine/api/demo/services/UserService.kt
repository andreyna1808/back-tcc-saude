package user.medicine.api.demo.services

import org.springframework.stereotype.Service
import user.medicine.api.demo.models.User
import user.medicine.api.demo.repositories.UserRepository
import user.medicine.api.demo.repositories.QuestionRepository
import user.medicine.api.demo.dtos.UserUpdateDTO
import user.medicine.api.demo.exceptions.NicknameAlreadyExistsException
import user.medicine.api.demo.exceptions.UserNotFoundException
import user.medicine.api.demo.models.LikedAnswer
import user.medicine.api.demo.models.LikedQuestion
import user.medicine.api.demo.models.Question
import user.medicine.api.demo.repositories.AnswerRepository

@Service
class UserService(
    private val userRepository: UserRepository,
    private val questionRepository: QuestionRepository, // Adicione o repositório de perguntas
    private val answerRepository: AnswerRepository,
) {

    fun registerUser(user: User): User {
        // Verifica se o nickname já existe
        if (userRepository.existsByNickname(user.nickname)) {
            throw NicknameAlreadyExistsException("Nickname already exists")
        } else if (userRepository.existsByEmail(user.email)) {
            throw NicknameAlreadyExistsException("Email already exists")
        }

        // Salva o usuário no banco de dados e retorna o mesmo usuário
        return userRepository.save(user)
    }

    fun getAllUsers(): List<User> {
        // Retorna todos os usuários do banco de dados
        return userRepository.findAll()
    }

    fun getUserById(id: String): User {
        // Busca o usuário pelo ID. Se não encontrar, lança uma exceção
        return userRepository.findById(id).orElseThrow { RuntimeException("User not found") }
    }

    fun updateUser(id: String, updatedUserDTO: UserUpdateDTO): User {
        // Busca o usuário existente pelo ID
        val existingUser = getUserById(id)

        // Se o nickname não foi fornecido na atualização, usa o nickname existente
        val updatedNickname = updatedUserDTO.nickname ?: existingUser.nickname

        // Verifica se o nickname já existe para outro usuário (exceto o usuário atual)
        if (userRepository.existsByNickname(updatedNickname) && updatedNickname != existingUser.nickname) {
            throw IllegalArgumentException("Nickname already exists")
        }

        // Atualiza as informações do usuário
        val updatedUserEntity = existingUser.copy(
            name = updatedUserDTO.name ?: existingUser.name,
            email = updatedUserDTO.email ?: existingUser.email,
            nickname = updatedNickname,
            password = updatedUserDTO.password ?: existingUser.password
        )

        // Salva o usuário atualizado no banco de dados e retorna o usuário atualizado
        return userRepository.save(updatedUserEntity)
    }

    fun deleteUser(id: String) {
        // Busca o usuário pelo ID e o deleta do banco de dados
        val user = getUserById(id)
        userRepository.delete(user)
    }

    fun getUserQuestions(id: String): List<Question> {
        // Busca o usuário pelo ID e verifica se ele existe
        val user = getUserById(id)
        // Busca todas as perguntas associadas ao usuário
        return questionRepository.findByUserId(user.id!!)
    }

    fun addQuestionToUser(userId: String, questionId: String) {
        val user = try {
            getUserById(userId)
        } catch (e: RuntimeException) {
            throw UserNotFoundException("User not found")
        }

        val updatedQuestions = user.questions + questionId
        val updatedUser = user.copy(questions = updatedQuestions)
        userRepository.save(updatedUser)
    }

    fun salmorous(userId: String, itemId: String, isQuestion: Boolean): User {
        // Obtém o usuário pelo ID
        val user = getUserById(userId)

        // Seleciona a lista correta com base em isQuestion
        val likedItems = if (isQuestion) {
            user.likedQuestions.toMutableList() as MutableList<Any>
        } else {
            user.likedAnswers.toMutableList() as MutableList<Any>
        }

        // Verifica se já existe um like na lista
        val existingLike = likedItems.find {
            when {
                isQuestion && it is LikedQuestion -> it.questionId == itemId
                !isQuestion && it is LikedAnswer -> it.answerId == itemId
                else -> false
            }
        }

        if (existingLike != null) {
            // Se já deu like, remove o like (toggle)
            likedItems.remove(existingLike)
            // Remove o like da pergunta ou resposta correspondente
            updateLikeCount(itemId, isQuestion, -1)
        } else {
            // Se não deu like, adiciona um like
            val newLike = if (isQuestion) {
                LikedQuestion(questionId = itemId, liked = true)
            } else {
                LikedAnswer(answerId = itemId, liked = true)
            }
            likedItems.add(newLike)
            // Adiciona o like à pergunta ou resposta correspondente
            updateLikeCount(itemId, isQuestion, 1)
        }

        // Cria o novo objeto User com a lista atualizada
        val updatedUser = if (isQuestion) {
            user.copy(likedQuestions = likedItems.filterIsInstance<LikedQuestion>())
        } else {
            user.copy(likedAnswers = likedItems.filterIsInstance<LikedAnswer>())
        }

        // Salva e retorna o usuário atualizado
        return userRepository.save(updatedUser)
    }

    // Atualiza o número de likes na pergunta ou resposta
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
