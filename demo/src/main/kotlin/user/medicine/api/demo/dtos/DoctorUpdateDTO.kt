package user.medicine.api.demo.dtos

data class DoctorUpdateDTO(
    val name: String? = null,
    val crm: String? = null,
    val email: String? = null,
    val password: String? = null,
    val specialty: String? = null
)