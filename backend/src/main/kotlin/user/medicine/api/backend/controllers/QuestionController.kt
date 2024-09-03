package user.medicine.api.backend.controllers

import org.springframework.web.bind.annotation.*
import user.medicine.api.backend.dtos.QuestionUpdateDTO
import user.medicine.api.backend.models.Question
import user.medicine.api.backend.services.QuestionService

@RestController
@RequestMapping("/api/questions")
class QuestionController(
    private val questionService: QuestionService
) {

    @PostMapping("/create")
    fun create(@RequestBody question: Question): Question {
        return questionService.createQuestion(question)
    }

    @GetMapping("")
    fun getAllQuestions(): List<Map<String, Any>> = questionService.getAllQuestions()

    @GetMapping("/{id}")
    fun getQuestion(@PathVariable id: String): Map<String, Any> = questionService.getQuestionById(id)


    @PutMapping("/{id}")
    fun updateQuestion(@PathVariable id: String, @RequestBody updatedQuestion: QuestionUpdateDTO): Question {
        return questionService.updateQuestion(id, updatedQuestion)
    }

    @DeleteMapping("/{id}")
    fun deleteQuestion(@PathVariable id: String) {
        questionService.deleteQuestion(id)
    }
}