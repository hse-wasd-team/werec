from aiohttp.web import View as BaseView
from sqlalchemy.orm import sessionmaker  # type: ignore


class View(BaseView):
    @property
    def session(self) -> sessionmaker:
        return self.request.app["session"]
