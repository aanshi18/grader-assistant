import os
import config
from pydantic import BaseModel, Field
from pydantic import BaseModel, confloat
from langchain_core.prompts import ChatPromptTemplate

class MyModel(BaseModel):
    correctness_score: confloat(ge=0.0, le=1.0)
    suggestion: str = Field(description="2 lines suggestion to student to score better.")

from langchain_groq import ChatGroq

llm = ChatGroq(
    model="llama-3.1-70b-versatile",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=config.api_key
    # other params...
)
structured_llm = llm.with_structured_output(MyModel)

from groq import Groq
import os

if "GROQ_API_KEY" not in os.environ:
    os.environ["GROQ_API_KEY"] = config.api_key

# groq_client = Groq(
#     api_key= config.api_key,
# )

# def getModelResponse(memory_prompt,user_prompt):

#     chat_completion = groq_client.chat.completions.create(
#         messages=[
#             {
#                 "role": "system",
#                 "content": memory_prompt,
#                 "role": "user",
#                 "content" : user_prompt,
#             }
#         ],
#         model="llama3-8b-8192"
#     )

#     return chat_completion.choices[0].message.content

def getModelResponse(memory_prompt,user_prompt):

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "{system}",
            ),
            ("human", "{user}"),
        ]
    )

    chain = prompt | structured_llm
    output = chain.invoke(
        {
            "system": memory_prompt,
            "user" : user_prompt

    }
    )
    return output

def queryResponse(memory_prompt,user_prompt):

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "{system}",
            ),
            ("human", "{user}"),
        ]
    )

    chain = prompt | llm
    output = chain.invoke(
        {
            "system": memory_prompt,
            "user" : user_prompt

    }
    )
    return output