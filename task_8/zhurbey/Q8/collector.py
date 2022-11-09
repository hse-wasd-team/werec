from abc import ABC, abstractmethod

from typing import Any


SOLUTION_TYPE = list[list[int]]


class Subscriber(ABC):
    @abstractmethod
    def notify(self, *args: Any, **kwargs: Any) -> None:
        pass


class Collector(Subscriber):
    def __init__(self) -> None:
        self.solutions: list[SOLUTION_TYPE] = []

    @staticmethod
    def _print_solution(solution: SOLUTION_TYPE) -> None:
        print("Next solution:")
        for i in range(len(solution)):
            print(solution[i])

        print("")

    def notify(self, solution: SOLUTION_TYPE) -> None:
        self.solutions.append(solution)

        self._print_solution(solution)
