from functools import cache
from typing import Any

import yaml


@cache
def parse_config() -> dict[str, Any]:
    # with open("some_path/config.yaml", "r") as f:
    #     try:
    #         return yaml.safe_load(f)
    #     except yaml.YAMLError as exc:
    #         raise exc

    return {}
