package user.medicine.api.demo.services

import org.springframework.stereotype.Service
import user.medicine.api.demo.dtos.AnswerUpdateDTO
import user.medicine.api.demo.exceptions.DoctorNotFoundException
import user.medicine.api.demo.exceptions.QuestionNotFoundException
import user.medicine.api.demo.models.Answer
import user.medicine.api.demo.repositories.AnswerRepository
import user.medicine.api.demo.repositories.DoctorRepository
import user.medicine.api.demo.repositories.QuestionRepository

@Service
class AnswerService(
    private val answerRepository: AnswerRepository,
    private val questionRepository: QuestionRepository,
    private val doctorRepository: DoctorRepository,
    private val doctorService: DoctorService,
) {

    fun createAnswer(answer: Answer): Answer {
        // Verifica se a pergunta associada existe
        val questionExists = questionRepository.existsById(answer.questionId)
        if (!questionExists) {
            throw QuestionNotFoundException("ID question not found")
        }

        // Verifica se o médico associado existe (se aplicável)
        val doctorExists = doctorRepository.existsById(answer.doctorId)
        if (!doctorExists) {
            throw DoctorNotFoundException("Doctor not found")
        }

        // Salva a resposta no banco de dados
        val saveAnswer = answerRepository.save(answer)

        // Adiciona o ID da resposta à lista de perguntas do usuário
        doctorService.addAnswerToDoctor(saveAnswer.doctorId, saveAnswer.id!!)

        // retorna a resposta
        return saveAnswer
    }

    fun getAllAnswers(): List<Answer> {
        // Busca a resposta pelo ID. Se não encontrar, lança uma exceção
        return answerRepository.findAll()
    }

    fun getAnswerById(id: String): Answer {
        // Busca a resposta pelo ID. Se não encontrar, lança uma exceção
        return answerRepository.findById(id).orElseThrow { RuntimeException("Answer not found") }
    }

    fun getAnswersByQuestionId(questionId: String): List<Answer> {
        // Busca todas as respostas associadas a uma pergunta específica
        return answerRepository.findByQuestionId(questionId)
    }

    fun updateAnswer(id: String, updatedAnswerDTO: AnswerUpdateDTO): Answer {
        // Busca a resposta existente pelo ID
        val existingAnswer = getAnswerById(id)

        // Cria uma nova resposta com as informações atualizadas
        val updatedAnswerEntity = existingAnswer.copy(
            content = updatedAnswerDTO.content ?: existingAnswer.content,
            likes = updatedAnswerDTO.likes ?: existingAnswer.likes
        )

        // Salva a resposta atualizada no banco de dados e retorna a resposta atualizada
        return answerRepository.save(updatedAnswerEntity)
    }

    fun deleteAnswer(id: String) {
        // Busca a resposta pelo ID e a deleta do banco de dados
        val answer = getAnswerById(id)
        answerRepository.delete(answer)
    }
}
