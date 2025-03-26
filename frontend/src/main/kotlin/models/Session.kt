package models

import kotlinx.serialization.Serializable

@Serializable
data class StartSessionRequest(
    val userId: String,
    val mode: String
)

@Serializable
data class StartSessionResponse(
    val sessionId: String
)

@Serializable
data class EndSessionRequest(
    val userId: String
)

@Serializable
data class EndSessionResponse(
    val success: Boolean
) 