import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocomit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """
    FASTAPI dependency: yields a db session always closes it after the request
    """

    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()
    