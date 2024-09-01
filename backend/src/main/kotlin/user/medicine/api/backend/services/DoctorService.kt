package user.medicine.api.backend.services

import org.springframework.stereotype.Service
import user.medicine.api.backend.models.Doctor
import user.medicine.api.backend.repositories.DoctorRepository
import user.medicine.api.backend.dtos.DoctorUpdateDTO
import user.medicine.api.backend.exceptions.CrmAlreadyExistsException
import user.medicine.api.backend.exceptions.NicknameAlreadyExistsException
import user.medicine.api.backend.exceptions.UserNotFoundException
import user.medicine.api.backend.models.Answer
import user.medicine.api.backend.repositories.AnswerRepository

@Service
class DoctorService(
    private val doctorRepository: DoctorRepository,
    private val answerRepository: AnswerRepository
) {

    fun addAnswerToDoctor(doctorId: String, answerId: String) {
        val doctor = try {
            getDoctorById(doctorId)
        } catch (e: RuntimeException) {
            throw UserNotFoundException("User not found")
        }

        val updatedAnswer = doctor.answers + answerId
        val updatedUser = doctor.copy(answers = updatedAnswer)
        doctorRepository.save(updatedUser)
    }

    fun registerDoctor(doctor: Doctor): Doctor {
        // Valida se o CRM ou o e-mail já existem
        if (doctorRepository.existsByCrm(doctor.crm)) {
            throw CrmAlreadyExistsException("CRM already exists")
        } else if (doctorRepository.existsByEmail(doctor.email)) {
            throw NicknameAlreadyExistsException("Email already exists")
        }

        // Validação do CRM
//        if (!validateCRM(doctor.crm)) {
//            throw InvalidCrmException("CRM inválido")
//        }

        // Salva o médico no banco de dados
        return doctorRepository.save(doctor)
    }

    fun getAllDoctors(): List<Doctor> {
        // Retorna todos os usuários do banco de dados
        return doctorRepository.findAll()
    }


    fun getDoctorById(id: String): Doctor {
        // Busca o médico pelo ID. Se não encontrar, lança uma exceção
        return doctorRepository.findById(id).orElseThrow { RuntimeException("Doctor not found") }
    }

    fun updateDoctor(id: String, updatedDoctorDTO: DoctorUpdateDTO): Doctor {
        // Busca o médico existente pelo ID
        val existingDoctor = getDoctorById(id)

        // Se o CRM não foi fornecido na atualização, usa o CRM existente
        val updatedCrm = updatedDoctorDTO.crm ?: existingDoctor.crm

        // Verifica se o CRM já existe para outro médico (exceto o médico atual)
        if (doctorRepository.existsByCrm(updatedCrm) && updatedCrm != existingDoctor.crm) {
            throw IllegalArgumentException("CRM already exists")
        }

        // Atualiza as informações do médico
        val updatedDoctorEntity = existingDoctor.copy(
            name = updatedDoctorDTO.name ?: existingDoctor.name,
            email = updatedDoctorDTO.email ?: existingDoctor.email,
            password = updatedDoctorDTO.password ?: existingDoctor.password,
            crm = updatedCrm,
            profileImageUrl = updatedDoctorDTO.profileImageUrl // Aceita null se for explicitamente fornecido
        )

        // Salva o médico atualizado no banco de dados e retorna o médico atualizado
        return doctorRepository.save(updatedDoctorEntity)
    }


    fun deleteDoctor(id: String) {
        // Busca o médico pelo ID e o deleta do banco de dados
        val doctor = getDoctorById(id)
        doctorRepository.delete(doctor)
    }

    fun getDoctorAnswers(id: String): List<Answer> {
        // Busca o médico pelo ID e verifica se ele existe
        val doctor = getDoctorById(id)

        // Busca todas as respostas associadas ao médico usando a lista de IDs
        return answerRepository.findByDoctorId(doctor.id!!)
    }


//    private fun validateCRM(crm: String): Boolean {
//        // Implementação da validação do CRM via API externa
//        val restTemplate = RestTemplate()
//        val url = "https://portal.cfm.org.br/api_rest_php/api/v1/medicos/buscar_medicos?crm=$crm"  // Eu preciso me cadastrar e é pago
//        val response = restTemplate.getForObject(url, String::class.java)
//        return response?.contains(crm) == true
//    }
}
