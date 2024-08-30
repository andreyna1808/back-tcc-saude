package user.medicine.api.demo.controllers

import org.springframework.web.bind.annotation.*
import user.medicine.api.demo.models.Question
import user.medicine.api.demo.services.QuestionService

@RestController
@RequestMapping("/api/questions")
class QuestionController(private val questionService: QuestionService) {

    @PostMapping("/create")
    fun create(@RequestBody question: Question): Question = questionService.createQuestion(question)

    @GetMapping("/{id}")
    fun getQuestion(@PathVariable id: String): Question = questionService.getQuestionById(id)

    @PutMapping("/{id}")
    fun updateQuestion(@PathVariable id: String, @RequestBody updatedQuestion: Question): Question {
        return questionService.updateQuestion(id, updatedQuestion)
    }

    @DeleteMapping("/{id}")
    fun deleteQuestion(@PathVariable id: String) {
        questionService.deleteQuestion(id)
    }
}
