# main.py
from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI()

# HTML form
@app.get("/", response_class=HTMLResponse)
async def homepage():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FastAPI Form</title>
    </head>
    <body>
        <h2>Submit Text to API</h2>
        <form id="textForm">
            <textarea id="userInput" placeholder="Enter text" required ></textarea>
            <button type="submit">Submit</button>
        </form>
        <p id="responseMessage"></p>

        <script>
            const form = document.getElementById('textForm');
            const responseMessage = document.getElementById('responseMessage');

            form.addEventListener('submit', async (event) => {
                event.preventDefault();  // Prevent page reload

                const userInput = document.getElementById('userInput').value;

                try {
                    const response = await fetch('/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ text: userInput }),
                    });

                    const result = await response.json();
                    responseMessage.textContent = `Response: ${result.message}`;
                } catch (error) {
                    responseMessage.textContent = 'Error: Failed to submit text!';
                }
            });
        </script>
    </body>
    </html>
    """

class TextInput(BaseModel):
    text: str

@app.post("/submit")
async def submit_text(data: TextInput):
    return {"message": f"You submitted: {data.text}"}
