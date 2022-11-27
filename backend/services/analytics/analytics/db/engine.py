# import os

from aiohttp.web import Application
from asyncpgsa import PG  # type: ignore
from sqlalchemy import create_engine  # type: ignore
from sqlalchemy.orm import declarative_base, sessionmaker  # type: ignore


# from yarl import URL


# db_dsn = URL.build(
#     scheme=os.environ["DB_SCHEME"],
#     host=os.environ["DB_HOST"],
#     user=os.environ["DB_USER"],
#     password=os.environ.get("DB_PASSWORD", ""),
#     port=int(os.environ["DB_PORT"]),
#     path=os.environ["DB_NAME"],
# )

db_dsn = "postgresql://analytics_user:analytics_pw@localhost:5432/analytics_db"

Base = declarative_base()
engine = create_engine(db_dsn)


async def db_initalization(app: Application) -> None:
    app["session"] = sessionmaker(bind=engine)

    Base.metadata.create_all(engine)

    # app["pg"] = PG()
    # await app["pg"].init(str(db_dsn))


async def db_destruction(app: Application) -> None:
    pass

    # await app["pg"].pool.close()


if __name__ == "__main__":
    Base.metadata.create_all(engine)
