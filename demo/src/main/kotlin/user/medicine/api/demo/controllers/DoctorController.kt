package user.medicine.api.demo.controllers

import org.springframework.web.bind.annotation.*
import user.medicine.api.demo.dtos.DoctorUpdateDTO
import user.medicine.api.demo.models.Doctor
import user.medicine.api.demo.services.DoctorService

@RestController
@RequestMapping("/api/doctors")
class DoctorController(private val doctorService: DoctorService) {

    @PostMapping("/register")
    fun register(@RequestBody doctor: Doctor): Doctor = doctorService.registerDoctor(doctor)

    @GetMapping("")
    fun getAllDoctors(): List<Doctor> = doctorService.getAllDoctors()

    @GetMapping("/{id}")
    fun getDoctor(@PathVariable id: String): Doctor = doctorService.getDoctorById(id)

    @PutMapping("/{id}")
    fun updateDoctor(@PathVariable id: String, @RequestBody updatedDoctor: DoctorUpdateDTO): Doctor {
        return doctorService.updateDoctor(id, updatedDoctor)
    }

    @DeleteMapping("/{id}")
    fun deleteDoctor(@PathVariable id: String) {
        doctorService.deleteDoctor(id)
    }
}
