package user.medicine.api.demo.controllers

import org.springframework.web.bind.annotation.*
import user.medicine.api.demo.dtos.UserUpdateDTO
import user.medicine.api.demo.models.User
import user.medicine.api.demo.services.UserService

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @PostMapping("/register")
    fun register(@RequestBody user: User): User = userService.registerUser(user)

    @GetMapping("")
    fun getAllUser(): List<User> = userService.getAllUsers()

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: String): User = userService.getUserById(id)

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: String, @RequestBody updatedUserDTO: UserUpdateDTO): User {
        return userService.updateUser(id, updatedUserDTO)
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: String) {
        userService.deleteUser(id)
    }
}