package services

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.logging.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json
import models.*

class ApiService {
    private val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                prettyPrint = true
            })
        }
        install(Logging) {
            level = LogLevel.ALL
        }
    }

    companion object {
        private const val BASE_URL = "http://localhost:3000"
    }

    suspend fun startSession(userId: String): StartSessionResponse {
        val request = StartSessionRequest(userId)
        return client.post("$BASE_URL/sessions/start") {
            contentType(ContentType.Application.Json)
            setBody(request)
        }.bodyAsText().let { Json.decodeFromString(it) }
    }

    suspend fun endSession(userId: String): EndSessionResponse {
        val request = EndSessionRequest(userId)
        return client.post("$BASE_URL/sessions/end") {
            contentType(ContentType.Application.Json)
            setBody(request)
        }.bodyAsText().let { Json.decodeFromString(it) }
    }

} 