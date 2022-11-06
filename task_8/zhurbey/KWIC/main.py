
def get_n_grams(words: list[str], n: int) -> list[list[str]]:
    """traverse the list with sliding window of size=n and save all the combinations"""
    if not words:
        return []

    return [words[i:i + n] for i in range(len(words) - n + 1)]


def group_n_grams(n_grams: list[list[str]], n: int) -> dict[str, list[list[str]]]:
    """Aggregate n_grams into dict where keys are keywords and values are contexts"""
    aggregate = dict()

    for i in n_grams:
        keyword = i[n // 2]
        if keyword in aggregate:
            aggregate[keyword].append(i)
            continue

        aggregate[keyword] = [i]

    return aggregate


def print_results(result: dict[str, list[list[str]]]) -> None:
    """Function prints the results in a human readable way"""

    for key in result:
        string_context = ", ".join([" ".join(i) for i in result[key]])
        print(f"{key}: {string_context}")


def main(text: str, n: int) -> None:
    """Main function that implements the basic KWIC algorithm and then prints the results"""

    words = text.split()
    if len(words) < n:
        raise Exception("Invalid arguments, context size is less then words count")

    n_grams = get_n_grams(words, n)
    result = group_n_grams(n_grams, n)

    print_results(result)


if __name__ == "__main__":
    text = "zero one two three one ten eleven"
    n = 3

    main(text, n)

    # # test cases:
    # main("one two", 3)  # throws an error
    # main("one two", 2)  # corner case
    # main("", 0)  # corner case
