import fitz 
import re

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
