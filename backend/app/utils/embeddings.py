from sentence_transformers import SentenceTransformer
import numpy as np

# Load model once
model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_embedding(text: str) -> list:
    embedding = model.encode(text)
    return embedding.tolist()  # MongoDB-friendly