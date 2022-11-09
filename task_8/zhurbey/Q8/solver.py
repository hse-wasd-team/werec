from abc import ABC, abstractmethod
from typing import Any

from .collector import Subscriber


class Publisher(ABC):
    def __init__(self) -> None:
        self.subscribers: list[Subscriber] = []

    def add_subscriber(self, subscriber: Subscriber) -> None:
        self.subscribers.append(subscriber)

    def notify(self, *args: Any, **kwargs: Any) -> None:
        for sub in self.subscribers:
            sub.notify(*args, **kwargs)

    @abstractmethod
    def run(self) -> None:
        pass


class Solver(Publisher):
    def __init__(self, n: int, perm: list[int]) -> None:
        super().__init__()

        self._n = n

        self.board = [[0] * n for _ in range(n)]
        self.perm = perm

    def run(self) -> None:
        for i in range(self._n):
            success = self._put_queen(self.perm[i], i)
            if not success:
                return

        # notify if solution is correct
        self.invert_board()
        self.notify(self.board)

    def _put_queen(self, y: int, x: int) -> bool:
        if self.board[y][x] != 0:
            return False

        for i in range(self._n):
            self.board[y][i] = 1
            self.board[i][x] = 1

            if y + i < self._n and x + i < self._n:
                self.board[y + i][x + i] = 1
            if y - i >= 0 and x + i < self._n:
                self.board[y - i][x + i] = 1
            if y + i < self._n and x - i >= 0:
                self.board[y + i][x - i] = 1
            if y - i >= 0 and x - i >= 0:
                self.board[y - i][x - i] = 1

        self.board[y][x] = 2
        return True

    def invert_board(self) -> None:
        for i in range(len(self.board)):
            for j in range(len(self.board[i])):
                self.board[i][j] -= 1
