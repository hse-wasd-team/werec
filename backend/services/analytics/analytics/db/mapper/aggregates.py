from sqlalchemy import Column, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ...core.const import AggregateType
from ..engine import Base


class Aggregate(Base):
    __tablename__ = "t_aggregate"

    id = Column(Integer, primary_key=True)
    type = Column(Enum(AggregateType), nullable=False)
    name = Column(String, nullable=True)
    value = Column(Integer, nullable=False)

    report_id = Column(Integer, ForeignKey("t_report.id"))
    report = relationship("Report", back_populates="aggregates")
