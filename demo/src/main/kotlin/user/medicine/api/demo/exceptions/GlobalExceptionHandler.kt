package user.medicine.api.demo.exceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus

// Exceções Personalizadas
class NicknameAlreadyExistsException(message: String) : RuntimeException(message)
class CrmAlreadyExistsException(message: String) : RuntimeException(message)
class InvalidCrmException(message: String) : RuntimeException(message)
class UserNotFoundException(message: String) : RuntimeException(message)
class QuestionNotFoundException(message: String) : RuntimeException(message)
class DoctorNotFoundException(message: String) : RuntimeException(message)

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(NicknameAlreadyExistsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleNicknameAlreadyExists(ex: NicknameAlreadyExistsException): ResponseEntity<String> {
        return ResponseEntity(ex.message, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(CrmAlreadyExistsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleCrmAlreadyExists(ex: CrmAlreadyExistsException): ResponseEntity<String> {
        return ResponseEntity(ex.message, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(InvalidCrmException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleInvalidCrm(ex: InvalidCrmException): ResponseEntity<String> {
        return ResponseEntity(ex.message, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(RuntimeException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun handleNotFound(ex: RuntimeException): ResponseEntity<String> {
        return ResponseEntity(ex.message, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(SecurityException::class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    fun handleUnauthorized(ex: SecurityException): ResponseEntity<String> {
        return ResponseEntity(ex.message, HttpStatus.UNAUTHORIZED)
    }
}
