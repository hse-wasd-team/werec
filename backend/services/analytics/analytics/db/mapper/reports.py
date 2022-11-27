from abc import abstractmethod
from typing import Any, Optional

from sqlalchemy import Column, Enum, Integer, String
from sqlalchemy.orm import Session, relationship

from ...core.const import AggregateType, EventType, ReportType
from ..engine import Base
from .aggregates import Aggregate
from .events import Event


class Report(Base):
    __tablename__ = "t_report"
    __mapper_args__ = {
        "polymorphic_on": "type",
    }

    id = Column(Integer, primary_key=True)
    type = Column(Enum(ReportType), nullable=False)
    owner_id = Column(Integer, nullable=False)
    feed_id = Column(Integer, nullable=False)
    schedule = Column(String, nullable=True)
    start_ts = Column(Integer, nullable=True)
    end_ts = Column(Integer, nullable=True)

    aggregates = relationship("Aggregate", cascade="all, delete-orphan")

    @abstractmethod
    def build_report(self, session: Session) -> dict[str, Any]:
        pass


class ActivityReport(Report):
    __mapper_args__ = {
        "polymorphic_identity": "ActivityReport",
    }

    def build_report(self, session: Session) -> None:
        for row in self.aggregates or []:
            session.delete(row)

        base_query = (
            session.query(Event).filter(Event.timestamp >= self.start_ts).filter(Event.timestamp <= self.end_ts)
        )
        views_count = base_query.filter(Event.type == EventType.View).count()
        subscriptions_count = base_query.filter(Event.type == EventType.Subscription).count()

        session.add(Aggregate(type=AggregateType.FeedViews, value=views_count, report=self))
        session.add(Aggregate(type=AggregateType.FeedSubscriptions, value=subscriptions_count, report=self))

        session.commit()

    def get_aggregate_by_type(self, aggregate_type: AggregateType) -> Optional[Aggregate]:
        for item in self.aggregates:
            if item.type == aggregate_type:
                return item

    def dump(self) -> dict:
        views = self.get_aggregate_by_type(AggregateType.FeedViews)
        subscriptions = self.get_aggregate_by_type(AggregateType.FeedSubscriptions)
        return {
            "id": self.id,
            "type": self.type,
            "owner_id": self.owner_id,
            "schedule": self.schedule,
            "start_ts": self.start_ts,
            "end_ts": self.end_ts,
            "report": {
                "feed_views": views.value if views else 0,
                "feed_subscriptions": subscriptions.value if subscriptions else 0,
            },
        }


# class ContentAnalysisReport(Report):
#     __mapper_args__ = {
#         "polymorphic_identity": "ContentAnalysisReport",
#     }
#
#     def build_report(self) -> dict[str, Any]:
#         pass


type_class_mapping = {
    ReportType.ActivityReport: ActivityReport,
    # ReportType.ContentAnalysisReport: ContentAnalysisReport,
}
