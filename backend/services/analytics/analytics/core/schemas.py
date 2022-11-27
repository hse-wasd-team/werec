from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from analytics.core.const import DeviceType, EventType, ObjectType, ReportType


class PostEventSchema(Schema):
    type = EnumField(EventType, required=True)
    device_type = EnumField(DeviceType, data_key="deviceType", required=True)
    timestamp = fields.Integer(required=True)
    object_type = EnumField(ObjectType, data_key="objectType", required=True)
    object_id = fields.Integer(data_key="objectId", required=True)


class EventSchema(PostEventSchema):
    id = fields.Integer(required=True)


class PostReportSchema(Schema):
    type = EnumField(ReportType, required=True)
    feed_id = fields.Integer(data_key="feedId", required=True)
    owner_id = fields.Integer(data_key="ownerId", required=True)
    start_ts = fields.Integer(data_key="startTs", required=True)
    end_ts = fields.Integer(data_key="endTs", required=True)
    schedule = fields.String(required=False)


class _ActivityReportSchema(Schema):
    feed_views = fields.Integer(data_key="feedViews", required=True)
    feed_subscriptions = fields.Integer(data_key="feedSubscriptions", required=True)
    # feed_configuration_views = fields.Integer(data_key="feedConfigurationViews", required=True)


class ActivityReportSchema(PostReportSchema):
    id = fields.Integer(required=True)
    report = fields.Nested(_ActivityReportSchema, required=True)


post_event_schema = PostEventSchema()
event_schema = EventSchema()
post_report_schema = PostReportSchema()
activity_report_schema = ActivityReportSchema()


# class TagCount(Schema):
#     tag_name = fields.String(data_key="tagName", required=True)
#     count = fields.Integer(required=True)
#
#
# class KeywordCount(Schema):
#     keyword = fields.String(required=True)
#     count = fields.Integer(required=True)
#
#
# class SourceCount(Schema):
#     source = fields.String(required=True)
#     count = fields.Integer(required=True)
#
#
# class _ContenAnalysysReport(Schema):
#     topics_views = fields.List(TagCount, data_key="topicViews", defeault=list, missing=list)
#     topics_subscriptions = fields.List(TagCount, data_key="topicsSubscriptions", defeault=list, missing=list)
#     keyword_views = fields.List(TagCount, data_key="keywordViews", defeault=list, missing=list)
#     sources_views = fields.List(TagCount, data_key="sourcesViews", defeault=list, missing=list)


# class ContentAnalysisReport(PostReportSchema):
#     pass
