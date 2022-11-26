openapi:
	docker-compose up -d openapi

api:
	docker-compose up -d api

postgres:
	docker-compose up -d postgres



# Print code style/typing errors(doesn't apply any changes).
# All configuration is set in pyproject.toml and setup.cfg
isort_check:
	isort --check-only --diff calculator/

black_check:
	black --diff calculator/

mypy_check:
	mypy calculator/

flake8_check:
	flake8 calculator/ --ignore=E501,W503

style_check: isort_check black_check mypy_check flake8_check
