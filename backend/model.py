import os
import config

from groq import Groq

groq_client = Groq(
    api_key= config.api_key,
)

def getModelResponse(memory_prompt,user_prompt):

    chat_completion = groq_client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": memory_prompt,
                "role": "user",
                "content" : user_prompt,
            }
        ],
        model="llama3-8b-8192"
    )

    return chat_completion.choices[0].message.content
