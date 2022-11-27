from marshmallow import Schema, fields

from analytics.core.schemas import PostEventSchema


class PostEventsEndpointSchema(Schema):
    data = fields.Nested(PostEventSchema, required=True)
