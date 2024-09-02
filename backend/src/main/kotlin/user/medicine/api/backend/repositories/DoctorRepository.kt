package user.medicine.api.backend.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.backend.models.Doctor
import user.medicine.api.backend.models.User

interface DoctorRepository : MongoRepository<Doctor, String> {
    fun existsByCrm(crm: String): Boolean
    fun existsByEmail(email: String): Boolean
    fun findByEmail(email: String): Doctor?
}
