from marshmallow import Schema, fields

from analytics.core.schemas import PostReportSchema


class PostReportEndpointSchema(Schema):
    data = fields.Nested(PostReportSchema)
