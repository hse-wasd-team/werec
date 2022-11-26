from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from analytics.db import mapper


db_dsn = "postgresql://analytics_user:analytics_pw@localhost:5432/analytics_db"
engine = create_engine(db_dsn)
Session = sessionmaker(bind=engine)
