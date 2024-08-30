package user.medicine.api.demo.services

import org.springframework.stereotype.Service
import user.medicine.api.demo.models.Doctor
import user.medicine.api.demo.repositories.DoctorRepository
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.web.client.RestTemplate
import user.medicine.api.demo.dtos.DoctorUpdateDTO
import user.medicine.api.demo.exceptions.CrmAlreadyExistsException
import user.medicine.api.demo.exceptions.InvalidCrmException
import user.medicine.api.demo.exceptions.NicknameAlreadyExistsException
import user.medicine.api.demo.models.User

@Service
class DoctorService(private val doctorRepository: DoctorRepository) {

    fun registerDoctor(doctor: Doctor): Doctor {
        // Verifica se o CRM já existe
        if (doctorRepository.existsByCrm(doctor.crm)) {
            throw CrmAlreadyExistsException("CRM já está em uso")
        } else if (doctorRepository.existsByEmail(doctor.email)) {
            throw NicknameAlreadyExistsException("Email já está em uso")
        }

        // Validação do CRM
//        if (!validateCRM(doctor.crm)) {
//            throw InvalidCrmException("CRM inválido")
//        }

        // Lógica para criar um novo médico
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
            throw IllegalArgumentException("CRM já está em uso")
        }

        // Atualiza as informações do médico
        val updatedDoctorEntity = existingDoctor.copy(
            name = updatedDoctorDTO.name ?: existingDoctor.name,
            email = updatedDoctorDTO.email ?: existingDoctor.email,
            password = updatedDoctorDTO.password ?: existingDoctor.password,
            crm = updatedCrm
        )

        // Salva o médico atualizado no banco de dados e retorna o médico atualizado
        return doctorRepository.save(updatedDoctorEntity)
    }


    fun deleteDoctor(id: String) {
        // Busca o médico pelo ID e o deleta do banco de dados
        val doctor = getDoctorById(id)
        doctorRepository.delete(doctor)
    }

//    private fun validateCRM(crm: String): Boolean {
//        // Implementação da validação do CRM via API externa
//        val restTemplate = RestTemplate()
//        val url = "https://portal.cfm.org.br/api_rest_php/api/v1/medicos/buscar_medicos?crm=$crm"  // Eu preciso me cadastrar e é pago
//        val response = restTemplate.getForObject(url, String::class.java)
//        return response?.contains(crm) == true
//    }
}
