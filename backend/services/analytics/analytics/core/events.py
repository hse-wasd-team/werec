from datetime import datetime
from typing import Any

from sqlalchemy.orm import Session

from analytics.db.mapper.events import type_class_mapping, Event


def create_event(session: Session, data: dict[str, Any]) -> None:
    event_class = type_class_mapping[data["type"]]

    session.add(event_class(**data))
    session.commit()

    send_report(session)

def send_report(session: Session):
    session.close()
    import smtplib
    from email.message import EmailMessage

    report_msg = "Recent activities on your feeds\n"
    events = session.query(Event).all()
    for event in events:
        report_msg += "-----------------------------------\n"
        report_msg += "Type: {0}\n".format(event.type)
        report_msg += "Device type: {0}\n".format(event.device_type)
        report_msg += "Object type: {0}\n".format(event.object_type)
        report_msg += "Date: {0}\n".format(datetime.fromtimestamp(event.timestamp))

    email_address = ""
    email_password = ""

    msg = EmailMessage()
    msg['Subject'] = "Report from WeRec"
    msg['From'] = email_address
    msg['To'] = ""
    msg.set_content(report_msg)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(email_address, email_password)
        smtp.send_message(msg)