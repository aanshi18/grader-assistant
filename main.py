from fastapi import FastAPI
from pdf_router import router as pdf_router
import httpx

app = FastAPI()

app.include_router(pdf_router)

# Run the server with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 

    url = "http://localhost:8000/upload_pdf" 
    with httpx.Client() as client:
        response = client.post(url)  
