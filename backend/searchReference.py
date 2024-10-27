# Define the list to store the structured data
data = []

# Open the raw text file
with open("transcript.txt", "r") as file:
    # Loop over each line in the file
    for idx, line in enumerate(file, start=1):
        # Split the line into timestamp and text based on the first tab or space
        parts = line.strip().split(maxsplit=1)
        if len(parts) == 2:
            timestamp, text = parts
            # Append the dictionary with structured data
            data.append({
                "id": str(idx),
                "timestamp": timestamp,
                "text": text
            })

# Print or use the data list
# print(data[0])
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')  # You can choose a model suitable for your use case

# Generate embeddings for each text entry
for item in data:
    item['embedding'] = model.encode(item['text']).tolist()


import chromadb

# Initialize Chroma client and create a collection
client = chromadb.Client()
collection = client.create_collection("oop_concept")

# Insert each item into Chroma DB
for item in data:
    collection.add(
        documents=[item["text"]],
        metadatas=[{"timestamp": item["timestamp"]}],
        ids=[item["id"]],
        embeddings=[item["embedding"]]
        )


def getReferences(query):

    # Encode the query text
    query_embedding = model.encode(query).tolist()

    # Perform the query for the top result
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=1
    )

    # Display results
    return results["metadatas"][0][0]["timestamp"]
