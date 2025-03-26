import androidx.compose.desktop.ui.tooling.preview.Preview
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import kotlinx.coroutines.launch
import services.ApiService
import models.StartSessionResponse

private val LightGray = Color(0xFFF6F6F6)
private val DarkGray = Color(0xFF404040)
private val ButtonGray = Color(0xFF828282)
private val White = Color(0xFFFFFFFF)

@Composable
@Preview
fun App() {
    var sessionId by remember { mutableStateOf<String?>(null) }
    var error by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()
    val apiService = remember { ApiService() }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(if (sessionId == null) LightGray else DarkGray)
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
                .align(Alignment.Center),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(
                "Schedule App",
                color = if (sessionId == null) Color.Black else White
            )
            
            Button(
                onClick = {
                    scope.launch {
                        try {
                            val response = apiService.startSession("user123", "focus")
                            sessionId = response.sessionId
                        } catch (e: Exception) {
                            error = e.message
                        }
                    }
                },
                colors = ButtonDefaults.buttonColors(
                    backgroundColor = ButtonGray,
                    contentColor = White
                )
            ) {
                Text("Start Session")
            }

            Button(
                onClick = {
                    scope.launch {
                        try {
                            apiService.endSession("user123")
                            sessionId = null
                        } catch (e: Exception) {
                            error = e.message
                        }
                    }
                },
                colors = ButtonDefaults.buttonColors(
                    backgroundColor = ButtonGray,
                    contentColor = White
                )
            ) {
                Text("End Session")
            }

            if (sessionId != null) {
                Text(
                    "Active Session: $sessionId",
                    color = White
                )
            }

            if (error != null) {
                Text(
                    "Error: $error",
                    color = Color.Red
                )
            }
        }
    }
}

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "Schedule App"
    ) {
        App()
    }
} 