import fitz 
import re
import json
import http

# Helper function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    text = ""
    with fitz.open(pdf_file) as doc:
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)  
            text += page.get_text()
    return text

def extract_percentage(response_message: str):
    pattern = r'(\d+(?:\.\d+)?)%'
    match = re.search(pattern, response_message)
    if match:
        return float(match.group(1))
    else:
        return None
    
def checkPlagiarism(answer):
    conn = http.client.HTTPSConnection("api.gptzero.me")
    payload = json.dumps({
    "document": answer,
    "multilingual": False
    })
    headers = {
    'Content-Type': 'application/json'
    }
    conn.request("POST", "/v2/predict/text", payload, headers)
    res = conn.getresponse()
    
    data = res.read()
    print(data)
    data_str = data.decode("utf-8")
    data_dict = json.loads(data_str)


    return data_dict['documents'][0]['completely_generated_prob']
