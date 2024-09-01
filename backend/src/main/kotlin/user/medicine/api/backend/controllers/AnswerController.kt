package user.medicine.api.backend.controllers

import org.springframework.web.bind.annotation.*
import user.medicine.api.backend.dtos.AnswerUpdateDTO
import user.medicine.api.backend.models.Answer
import user.medicine.api.backend.services.AnswerService

@RestController
@RequestMapping("/api/answers")
class AnswerController(private val answerService: AnswerService) {

    @PostMapping("/create")
    fun create(@RequestBody answer: Answer): Answer = answerService.createAnswer(answer)

    @GetMapping("")
    fun getAnswer(): List<Answer> = answerService.getAllAnswers()

    @GetMapping("/{id}")
    fun getAnswer(@PathVariable id: String): Answer = answerService.getAnswerById(id)

    @GetMapping("/question/{questionId}")
    fun getAnswersByQuestionId(@PathVariable questionId: String): List<Answer> = answerService.getAnswersByQuestionId(questionId)

    @PutMapping("/{id}")
    fun updateAnswer(@PathVariable id: String, @RequestBody updatedAnswer: AnswerUpdateDTO): Answer {
        return answerService.updateAnswer(id, updatedAnswer)
    }

    @DeleteMapping("/{id}")
    fun deleteAnswer(@PathVariable id: String) {
        answerService.deleteAnswer(id)
    }
}
