from sqlalchemy import Column, Enum, Integer

from ...core.const import DeviceType, EventType, ObjectType
from ..engine import Base


class Event(Base):
    __tablename__ = "t_event"
    __mapper_args__ = {
        "polymorphic_on": "type",
    }

    id = Column(Integer, primary_key=True)
    type = Column(Enum(EventType), nullable=False)
    timestamp = Column(Integer, nullable=False)
    device_type = Column(Enum(DeviceType), nullable=False)
    object_id = Column(Integer, nullable=True)
    object_type = Column(Enum(ObjectType), nullable=True)


class Subscription(Event):
    __mapper_args__ = {
        "polymorphic_identity": "Subscription",
    }

    # feed_id = Column(Integer, nullable=True)


class View(Event):
    __mapper_args__ = {
        "polymorphic_identity": "View",
    }

    # object_id = Column(Integer, nullable=True)
    # object_type = Column(Enum(ObjectType), nullable=True)


type_class_mapping = {
    EventType.Subscription: Subscription,
    EventType.View: View,
}
