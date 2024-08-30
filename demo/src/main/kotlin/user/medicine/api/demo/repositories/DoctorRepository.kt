package user.medicine.api.demo.repositories

import org.springframework.data.mongodb.repository.MongoRepository
import user.medicine.api.demo.models.Doctor

interface DoctorRepository : MongoRepository<Doctor, String> {
    fun existsByCrm(crm: String): Boolean
    fun existsByEmail(email: String): Boolean
}
