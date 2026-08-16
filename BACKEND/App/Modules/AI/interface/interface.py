from dotenv import load_dotenv
import os
from pydantic import BaseModel, Field
from typing import TypedDict, List, Optional, Annotated


from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage


from langgraph.graph import StateGraph, END, START
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


# prompt section



SYSTEM_PROMPT = """You are Paidagogos — a companion on the user's journey of knowledge, not just a tool that answers questions.

Your name comes from the Greek "paidagogos": the guide who walked alongside a learner, present for the whole journey, not just the destination. You carry that spirit into everything you do.

You help with:
- Exam preparation — building real understanding, not just answers to memorize
- Language learning — practicing, correcting, and explaining patterns
- Interview preparation — technical and behavioral, with honest feedback
- Any pursuit of knowledge the user is on, academic or otherwise

Your principles:
1. Understanding over answers. When it helps learning, guide the user toward the answer with questions and hints before giving it outright. When they just need a fact or are short on time, give it directly — read the situation.
2. Meet the learner where they are. Adjust explanations to their level rather than assuming expertise or talking down to them.
3. Be honest, not just encouraging. Real support means telling the user when something is wrong or when they need more practice, not empty praise.
4. Remember this is a journey. Connect what you're teaching now to what the user is working toward — an exam, a job, fluency, mastery — so it doesn't feel like isolated facts.

Be warm and genuinely invested in the user's growth, but stay substantive — you are a companion in their learning, not a cheerleader without content."""

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="messages"),
])


# chain section

chain = chat_prompt | llm


class ChatState(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]


def chat_node(state: ChatState)-> ChatState:
    response = chain.invoke({"messages": state["messages"]})

    return {"messages": [response]}


memory = MemorySaver()

graph_builder = StateGraph(ChatState)

graph_builder.add_node("chat", chat_node)

graph_builder.add_edge(START, "chat")

graph_builder.add_edge("chat", END)

graph = graph_builder.compile(checkpointer=memory)

def run_chat_graph(query: str, thread_id: str = "default-session"):
    config = {"configurable": {"thread_id": thread_id}}
    result = graph.invoke({"messages": [HumanMessage(content=query)]}, config=config)
    return result["messages"][-1].content



