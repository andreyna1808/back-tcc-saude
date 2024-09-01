package user.medicine.api.backend.services

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

@Service
class FileStorageService {

    private val uploadDir: String = Paths.get("uploads").toAbsolutePath().toString()

    init {
        val path = Paths.get(uploadDir)
        if (!Files.exists(path)) {
            Files.createDirectories(path)
        }
    }

    fun normalizeFileName(originalFileName: String, userId: String): String {
        val extension = originalFileName.substringAfterLast('.', "")
        return "$userId.$extension"
    }

    fun storeFile(file: MultipartFile, userId: String): String {
        val originalFileName = file.originalFilename ?: UUID.randomUUID().toString()
        println("originalFileName $originalFileName")
        val newFileName = normalizeFileName(originalFileName, userId)
        println("newFileName $newFileName")

        val uploadDirFile = File(uploadDir)
        if (!uploadDirFile.exists()) uploadDirFile.mkdirs()

        val existingFiles = uploadDirFile.listFiles { _, name ->
            name.startsWith("$userId.")
        }
        existingFiles?.forEach { it.delete() }

        val destinationFile = File(uploadDirFile, newFileName)
        println("destinationFile $destinationFile")
        file.transferTo(destinationFile)

        return "/uploads/$newFileName"
    }

    fun getFile(fileName: String): File {
        return File("$uploadDir$fileName")
    }
}

