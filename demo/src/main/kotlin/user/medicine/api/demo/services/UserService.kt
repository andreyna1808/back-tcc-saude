package user.medicine.api.demo.services

import org.springframework.stereotype.Service
import user.medicine.api.demo.models.User
import user.medicine.api.demo.repositories.UserRepository
import org.springframework.dao.DataIntegrityViolationException
import user.medicine.api.demo.dtos.UserUpdateDTO
import user.medicine.api.demo.exceptions.NicknameAlreadyExistsException

@Service
class UserService(private val userRepository: UserRepository) {

    fun registerUser(user: User): User {
        // Verifica se o nickname já existe
        if (userRepository.existsByNickname(user.nickname)) {
            throw NicknameAlreadyExistsException("Nickname já está em uso")
        } else if (userRepository.existsByEmail(user.email)) {
            throw NicknameAlreadyExistsException("Email já está em uso")
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
            throw IllegalArgumentException("Nickname já está em uso")
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
}
