package user.medicine.api.backend.services

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import user.medicine.api.backend.repositories.DoctorRepository
import user.medicine.api.backend.repositories.UserRepository
import java.util.concurrent.ConcurrentHashMap

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val doctorRepository: DoctorRepository
) {

    private val blacklist = ConcurrentHashMap<String, Boolean>() // Blacklist de tokens

    // Carrega detalhes do usuário com base no email fornecido
    @Throws(UsernameNotFoundException::class)
    fun loadUserByEmail(email: String): UserDetails {
        val user = userRepository.findByEmail(email)
            ?: throw UsernameNotFoundException("User not found with email: $email")

        return org.springframework.security.core.userdetails.User(
            user.email, user.password, emptyList() // Ajuste os roles conforme necessário
        )
    }

    // Carrega detalhes do médico com base no email fornecido
    @Throws(UsernameNotFoundException::class)
    fun loadDoctorByEmail(email: String): UserDetails {
        val doctor = doctorRepository.findByEmail(email)
            ?: throw UsernameNotFoundException("Doctor not found with email: $email")

        return org.springframework.security.core.userdetails.User(
            doctor.email, doctor.password, emptyList() // Ajuste os roles conforme necessário
        )
    }

    // Adiciona o token à blacklist
    fun blacklistToken(token: String) {
        blacklist[token] = true
    }

    // Verifica se o token está na blacklist
    fun isTokenBlacklisted(token: String): Boolean {
        return blacklist.containsKey(token)
    }
}
