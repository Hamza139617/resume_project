from dotenv import load_dotenv
import os
from pydantic import BaseModel, Field
from typing import TypedDict, List, Optional, Annotated


from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage


from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver



## llm section

load_dotenv()
llm_token = os.getenv("Groq_Token")


llm = ChatGroq(
    api_key=llm_token,
    model="openai/gpt-oss-20b",
    temperature=0.0
)


class ChatState(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]

