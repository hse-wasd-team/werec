from typing import Any

from sqlalchemy.orm import Session

from analytics.db.mapper.reports import Report, type_class_mapping


def create_report(session: Session, data: dict[str, Any]) -> Report:
    report_class = type_class_mapping[data["type"]]
    report = report_class(**data)
    session.add(report_class(**data))

    # TODO: long running task, use SQS
    report.build_report(session)

    session.commit()

    return report
