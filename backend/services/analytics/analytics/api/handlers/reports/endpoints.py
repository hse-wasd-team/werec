import json

from aiohttp.web import Response
from aiohttp_apispec import request_schema

from analytics.core.reports import create_report
from analytics.core.schemas import activity_report_schema
from analytics.db.mapper.reports import Report

from ..base.views import View
from .schemas import PostReportEndpointSchema


class ReportView(View):
    @property
    def report_id(self) -> int:
        return int(self.request.match_info.get("report_id"))  # type: ignore

    @request_schema(PostReportEndpointSchema, strict=True)
    async def post(self) -> Response:
        data = self.request["data"]["data"]
        session = self.session()

        create_report(session, data)
        session.close()

        return Response(status=203)

    async def get(self) -> Response:
        session = self.session()
        report = session.query(Report).filter(Report.id == self.report_id).one()
        session.close()

        data = {"data": activity_report_schema.dumps(report.dump())}
        return Response(body=json.dumps(data))

    async def delete(self) -> Response:
        session = self.session()
        report = session.query(Report).filter(Report.id == self.report_id).one()

        session.delete(report)
        session.commit()
        session.close()

        return Response(status=204)
