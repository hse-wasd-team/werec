from aiohttp.web import Response
from aiohttp_apispec import request_schema

from analytics.core.events import create_event

from ..base.views import View
from .schemas import PostEventsEndpointSchema


class EventsView(View):
    @request_schema(PostEventsEndpointSchema, strict=True)
    async def post(self) -> Response:
        data = self.request["data"]["data"]
        session = self.session()

        create_event(session, data)
        session.close()

        return Response(status=203)
