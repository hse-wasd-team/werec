import itertools

from .collector import Collector
from .solver import Solver


def main(n: int) -> None:
    perms = [*itertools.permutations(list(range(n)))]
    collector = Collector()

    for perm_ in perms:
        solver = Solver(n, perm_)
        solver.add_subscriber(collector)
        solver.run()


if __name__ == "__main__":
    n = 8

    main(n)
