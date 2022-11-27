from typing import Any

from aiohttp import web
from aiohttp_apispec import setup_aiohttp_apispec, validation_middleware

from analytics.config import parse_config
from analytics.db.engine import db_destruction, db_initalization

from .handlers.events.endpoints import EventsView
from .handlers.reports.endpoints import ReportView


def build_app(config: dict[str, Any]) -> web.Application:
    app = web.Application()
    app.add_routes(
        [
            web.post("/events", EventsView),
            web.post("/reports", ReportView),
            # web.get("/reports", ReportsView),
            web.get("/reports/{report_id}", ReportView),
            web.delete("/reports/{report_id}", ReportView),
        ]
    )
    app.middlewares.append(validation_middleware)

    setup_aiohttp_apispec(app=app, title="docs", version="v1", url="/api/v1/docs")

    return app


def start_server() -> None:
    app = build_app(parse_config())

    app.on_startup.append(db_initalization)
    app.on_cleanup.append(db_destruction)

    web.run_app(app)
