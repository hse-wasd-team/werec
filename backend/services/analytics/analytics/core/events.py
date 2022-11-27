from typing import Any

from sqlalchemy.orm import Session

from analytics.db.mapper.events import type_class_mapping


def create_event(session: Session, data: dict[str, Any]) -> None:
    event_class = type_class_mapping[data["type"]]

    session.add(event_class(**data))
    session.commit()
