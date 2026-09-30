from pathlib import Path

from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base


# =========================
# DATABASE
# =========================

BASE_DIR = Path(__file__).resolve().parents[1]
DATABASE_PATH = BASE_DIR / "mesa_market.db"

DATABASE_URL = f"sqlite:///{DATABASE_PATH}"


engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)


# =========================
# FOREIGN KEYS
# =========================

@event.listens_for(engine, "connect")
def enable_foreign_keys(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


# =========================
# SESSION
# =========================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# =========================
# BASE
# =========================

Base = declarative_base()


# =========================
# DATABASE DEPENDENCY
# =========================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()