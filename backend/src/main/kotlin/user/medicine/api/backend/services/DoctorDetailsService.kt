package user.medicine.api.backend.services

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import user.medicine.api.backend.repositories.DoctorRepository

@Service
class DoctorDetailsService(
    private val doctorRepository: DoctorRepository
) : UserDetailsService {

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(email: String): UserDetails {
        val doctor = doctorRepository.findByEmail(email)
            ?: throw UsernameNotFoundException("Doctor not found with email: $email")

        return org.springframework.security.core.userdetails.User(
            doctor.email, doctor.password, emptyList() // Ajuste os roles conforme necessário
        )
    }
}

