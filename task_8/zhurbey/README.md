### Problem A. Key Word in Context (KWIC)
My solution for this task uses "Main/Subroutine with stepwise refinement" method, so besides having main function
that solves the task I have distinguished several functions that implement pretty basic operations.
So, there is `main` function that implements the whole KWIC task solution, and then there are atomic functions
like `get_n_grams` that group adjacent words into groups of n elements, `group_n_grams` that aggregates those
n_grams into dict where keys are keywords and values are contexts they appear in, and the last one is `print_results`
that prints the results in a human-readable way.

So if we run the algorithm like so:
```
text = "zero one two three one ten eleven"
n = 3

main(text, n)
```

The output will be:
```
one: zero one two, three one ten
two: one two three
three: two three one
ten: one ten eleven
```

There are also a couple of corner cases tests present in `KWIC.main.py`


### Problem B. Eight Queens (8Q)
This task's solution uses "Implicit invocation" method and therefore Observer pattern.
The idea of the solution is that I have a collector class who is collecting all computation results and it is
a subscriber/observer from the pattern(abstract class of Subscriber and implementation of Collector are present
in `Q8/collect.py` file). Another class is Solver that is taking a role of Publisher, when Solver successfully finishes
the task it notifies all the subscribers about the found solution(Publisher abstract class and Solver implementation
are placed in `Q8.solver.py` file). When a collector receives a signal from one of the solvers it prints the result and
also saves it in its own internal attribute.

Examples of calls:
```
n = 8
main(n)
```

```
n = 4
main(n)
```

Solution implementation solves the task not only for 8Q but for any specified n, number of found answers for different
n follows the table on https://en.wikipedia.org/wiki/Eight_queens_puzzle


The output example:  
for n=1
```
Next solution:
[1]
```

for n=2 and n=3 there are no solutions.  

for n=4:
```
Next solution:
[0, 0, 1, 0]
[1, 0, 0, 0]
[0, 0, 0, 1]
[0, 1, 0, 0]

Next solution:
[0, 1, 0, 0]
[0, 0, 0, 1]
[1, 0, 0, 0]
[0, 0, 1, 0]
```

for n=8:
```
Next solution:
[1, 0, 0, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 0, 1, 0]
[0, 0, 0, 0, 1, 0, 0, 0]
[0, 0, 0, 0, 0, 0, 0, 1]
[0, 1, 0, 0, 0, 0, 0, 0]
[0, 0, 0, 1, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 1, 0, 0]
[0, 0, 1, 0, 0, 0, 0, 0]

Next solution:
[1, 0, 0, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 0, 1, 0]
[0, 0, 0, 1, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 1, 0, 0]
[0, 0, 0, 0, 0, 0, 0, 1]
[0, 1, 0, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 1, 0, 0, 0]
[0, 0, 1, 0, 0, 0, 0, 0]

Next solution:
[1, 0, 0, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 1, 0, 0]
[0, 0, 0, 0, 0, 0, 0, 1]
[0, 0, 1, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 0, 1, 0]
[0, 0, 0, 1, 0, 0, 0, 0]
[0, 1, 0, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 1, 0, 0, 0]

...
```






