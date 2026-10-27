/* Level 3: Functions and modular code */
level({
  id: 'L3', num: 3, title: 'Functions & Modular Code', tag: 'Intermediate',
  blurb: 'Write reusable functions, understand scope and recursion, use the standard library, handle errors and work with files, CSV and JSON.',
  outcomes: ['Design functions with clear parameters, return values and docstrings', 'Explain scope, the call stack and recursion', 'Pass functions as values and use lambdas', 'Organise code into modules and use the standard library', 'Handle errors with «try» / «except» and raise your own', 'Read and write text, CSV and JSON files']
});

/* ------------------------------------------------------------------ 3.1 */
lesson({
  id: 'functions', level: 'L3', title: 'Defining functions', minutes: 60,
  keywords: 'function def return parameter argument docstring none',
  goals: ['Define functions with «def» and call them', 'Distinguish parameters from arguments', 'Return values, including several at once', 'Write docstrings', 'Explain why functions make programs better'],
  body: [
    section('learn', 'Why functions?'),
    p`A **function** is a named block of code that performs one task. You have been calling built-in functions since lesson 0.1: «print», «len», «input», «sorted». Now you will write your own.

    Functions give you: **reuse** (write once, call many times), **abstraction** (callers only need to know *what* it does, not *how*), **testability** (check one small piece at a time), and **readability** (a well-named function call reads like a sentence). The principle behind this is often stated as **DRY**: Don't Repeat Yourself.`,
    code('Defining and calling')`
      def greet():
          print("Hello!")
          print("Welcome to the course.")

      greet()          # call it
      greet()          # and again
    `,
    p`«def» starts the definition, followed by the name, brackets and a colon. The indented body does not run when Python reads the definition; it runs each time the function is **called** with «greet()».`,
    section('learn', 'Parameters and arguments'),
    code('Passing information in')`
      def greet(name, programme):
          print(f"Hello {name}, welcome to {programme}!")

      greet("Ama", "Computer Science")      # positional arguments
      greet(programme="Law", name="Kofi")   # keyword arguments
    `,
    p`**Parameters** are the names in the definition («name», «programme»). **Arguments** are the actual values passed in a call («"Ama"»). Positional arguments are matched by order; keyword arguments by name, so their order does not matter.`,
    section('learn', 'Returning values'),
    code('return sends a value back')`
      def area_of_circle(radius):
          return 3.14159 * radius ** 2

      a = area_of_circle(2)
      print(a)
      print(area_of_circle(1) + area_of_circle(3))

      def is_even(n):
          return n % 2 == 0

      print([n for n in range(10) if is_even(n)])
    `,
    p`«return» ends the function immediately and hands a value back to the caller, so the call can be used anywhere a value can: in a variable, an expression, an «if». **Printing is not returning**: a function that prints shows something to a human, but gives nothing back to the program.`,
    code('print vs return')`
      def add_print(a, b):
          print(a + b)

      def add_return(a, b):
          return a + b

      x = add_print(2, 3)     # prints 5, but returns None
      y = add_return(2, 3)    # prints nothing, returns 5
      print("x =", x)
      print("y =", y)
    `,
    p`A function without a «return» (or with a bare «return») returns «None». Prefer functions that **return** results and let the caller decide whether to print them; such functions are reusable and testable.`,
    section('learn', 'Returning several values and returning early'),
    code('Tuples and early return')`
      def min_max_mean(values):
          if not values:
              return None          # early return for the special case
          return min(values), max(values), sum(values) / len(values)

      lo, hi, avg = min_max_mean([4, 8, 15, 16, 23, 42])
      print(lo, hi, round(avg, 2))
      print(min_max_mean([]))
    `,
    section('learn', 'Docstrings'),
    code('Documenting a function')`
      def bmi(weight_kg, height_m):
          """Return the body mass index.

          weight_kg: body mass in kilograms (must be positive)
          height_m:  height in metres (must be positive)
          """
          return weight_kg / height_m ** 2

      print(round(bmi(68, 1.75), 1))
      print(bmi.__doc__.splitlines()[0])
      # help(bmi) shows the full docstring in the REPL
    `,
    p`A **docstring** is a string literal on the first line of the body. Tools such as «help()», editors and documentation generators read it. Describe what the function does, its parameters and what it returns. One clear sentence is often enough.`,
    note('deep', 'Going deeper · functions are objects')`«def» creates a **function object** and binds it to a name, just as «=» binds a value. So functions can be stored in variables, put in lists and dicts, passed as arguments and returned from other functions: Python has **first-class functions**. You already used this when you wrote «key=len» or «key=counts.get». Lesson 3.4 builds on it.`,
    quiz(
      { q: 'What does a function return if it has no «return» statement?', o: ['«0»', '«""»', '«None»', 'An error'], a: 2, why: 'Every call returns something; the default is «None».' },
      { q: 'In «def f(x, y):», what are «x» and «y»?', o: ['Arguments', 'Parameters', 'Return values', 'Keywords'], a: 1, why: 'Names in the definition are parameters; values in a call are arguments.' },
      { q: 'What is printed?', code: R`
          def f(n):
              return n * 2
              print("done")
          print(f(4))`, o: ['«done» then «8»', '«8»', '«done»', '«None»'], a: 1, why: '«return» ends the function; the print after it never runs.' },
      { q: 'Which call is invalid for «def g(a, b):»?', o: ['«g(1, 2)»', '«g(b=2, a=1)»', '«g(1, b=2)»', '«g(a=1, 2)»'], a: 3, why: 'Positional arguments cannot follow keyword arguments.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Letter grade function', level: 'easy',
      prompt: `Write «letter_grade(mark)» that **returns** «"A"» for 80+, «"B"» for 70–79, «"C"» for 60–69, «"D"» for 50–59 and «"F"» otherwise. The test code is already written.`,
      starter: R`
        def letter_grade(mark):
            pass   # replace with your code

        for m in [95, 80, 79, 65, 50, 49]:
            print(m, letter_grade(m))`,
      expect: `
        95 A
        80 A
        79 B
        65 C
        50 D
        49 F`,
      hints: ['Use «if/elif/else» with a «return» in each branch.'],
      solution: R`
        def letter_grade(mark):
            if mark >= 80:
                return "A"
            elif mark >= 70:
                return "B"
            elif mark >= 60:
                return "C"
            elif mark >= 50:
                return "D"
            return "F"

        for m in [95, 80, 79, 65, 50, 49]:
            print(m, letter_grade(m))`,
      explain: `Because «return» exits immediately, the final «else» is not needed: if we reach the last line, every other case has already returned.`
    }),
    task({
      title: 'Prime function', level: 'medium',
      prompt: `Write «is_prime(n)» that returns «True» if «n» is prime. Numbers below 2 are not prime. Check divisors only up to √n. Then print the primes below 50 using a comprehension.`,
      starter: R`
        def is_prime(n):
            pass

        print([n for n in range(50) if is_prime(n)])`,
      expect: `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]`,
      hints: ['Return «False» early when «n < 2».', 'Loop «d» from 2 while «d * d <= n»; return «False» if «n % d == 0».', 'If the loop finishes, return «True».'],
      solution: R`
        def is_prime(n):
            if n < 2:
                return False
            d = 2
            while d * d <= n:
                if n % d == 0:
                    return False
                d += 1
            return True

        print([n for n in range(50) if is_prime(n)])`
    }),
    task({
      title: 'Statistics function', level: 'medium',
      prompt: `Write «describe(data)» that returns a **dictionary** with keys «"n"», «"mean"», «"median"» and «"range"». Round the mean to 2 decimals. Do not modify the list passed in.`,
      starter: R`
        def describe(data):
            pass

        values = [12, 7, 3, 21, 9, 15]
        print(describe(values))
        print(values)`,
      expect: `
        {'n': 6, 'mean': 11.17, 'median': 10.5, 'range': 18}
        [12, 7, 3, 21, 9, 15]`,
      hints: ['Use «sorted(data)» (not «.sort()») so the caller\'s list is untouched.', 'Median: middle element, or average of the two middle elements.'],
      solution: R`
        def describe(data):
            ordered = sorted(data)
            n = len(ordered)
            mid = n // 2
            median = ordered[mid] if n % 2 else (ordered[mid - 1] + ordered[mid]) / 2
            return {
                "n": n,
                "mean": round(sum(ordered) / n, 2),
                "median": median,
                "range": ordered[-1] - ordered[0],
            }

        values = [12, 7, 3, 21, 9, 15]
        print(describe(values))
        print(values)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Refactor the grade calculator into functions',
      brief: `**Refactoring** means improving the structure of code without changing what it does. Take the grade calculator from lessons 1.4 and 1.6 and rewrite it as a set of small functions, each doing one job, with a «main()» function that ties them together.`,
      reqs: ['«read_mark(prompt)»: asks until it gets a number between 0 and 100 and returns it as a float', '«weighted_total(assignment, midsem, exam)»: returns the weighted mark (20/20/60)', '«grade_for(mark)»: returns a «(letter, point)» tuple', '«report(name, mark, letter, point)»: returns the summary string (does not print)', '«main()»: calls the others and prints the report; call «main()» at the bottom', 'Every function has a docstring'],
      input: 'Abena\n72\n150\n65\n81',
      starter: R`
        def read_mark(prompt):
            """Ask until the user enters a number from 0 to 100; return it."""
            pass
        `,
      solution: R`
        GRADES = [(80, "A", 4.0), (75, "B+", 3.5), (70, "B", 3.0), (65, "C+", 2.5),
                  (60, "C", 2.0), (55, "D+", 1.5), (50, "D", 1.0), (0, "F", 0.0)]


        def read_mark(prompt):
            """Ask until the user enters a number from 0 to 100; return it."""
            while True:
                text = input(prompt)
                if text.replace(".", "", 1).isdigit() and 0 <= float(text) <= 100:
                    return float(text)
                print("  Please enter a number from 0 to 100.")


        def weighted_total(assignment, midsem, exam):
            """Combine the three marks using 20% / 20% / 60% weights."""
            return assignment * 0.2 + midsem * 0.2 + exam * 0.6


        def grade_for(mark):
            """Return (letter, grade point) for a final mark."""
            for minimum, letter, point in GRADES:
                if mark >= minimum:
                    return letter, point


        def report(name, mark, letter, point):
            """Build the one-line summary for a student."""
            return f"{name.upper()}: {mark:.1f} -> {letter} ({point})"


        def main():
            name = input("Student name: ")
            a = read_mark("Assignment mark: ")
            m = read_mark("Mid-semester mark: ")
            e = read_mark("Exam mark: ")
            total = weighted_total(a, m, e)
            letter, point = grade_for(total)
            print(report(name, total, letter, point))


        main()`,
      explain: `The grade scale moved from a long «if/elif» chain into a **data table** («GRADES»), and «grade_for» just searches it. Separating data from logic like this means you can change the scale without touching any code. Notice «read_mark» rejects 150 and asks again. Each function can now be tested on its own: «assert grade_for(75) == ("B+", 3.5)».`
    })
  ]
});

/* ------------------------------------------------------------------ 3.2 */
lesson({
  id: 'arguments', level: 'L3', title: 'Arguments in depth', minutes: 50,
  keywords: 'default arguments keyword args kwargs star unpacking keyword-only mutable default',
  goals: ['Give parameters default values', 'Accept any number of arguments with «*args» and «**kwargs»', 'Force keyword-only and positional-only parameters', 'Unpack lists and dicts into calls', 'Avoid the mutable default argument trap'],
  body: [
    section('learn', 'Default values'),
    code('Defaults make parameters optional')`
      def power(base, exponent=2):
          return base ** exponent

      print(power(5))         # exponent defaults to 2
      print(power(2, 10))
      print(power(exponent=3, base=4))

      def describe_pet(name, kind="dog", age=None):
          text = f"{name} is a {kind}"
          if age is not None:
              text += f", {age} years old"
          return text

      print(describe_pet("Bingo"))
      print(describe_pet("Kitty", "cat", 3))
      print(describe_pet("Polly", age=1, kind="parrot"))
    `,
    p`Parameters with defaults must come **after** those without. Using «None» as a default and checking «is not None» is the standard way to say "this argument is optional".`,
    section('learn', '*args: any number of positional arguments'),
    code('Collecting extra arguments into a tuple')`
      def average(*numbers):
          if not numbers:
              return 0
          return sum(numbers) / len(numbers)

      print(average(4, 8, 15))
      print(average(1, 2, 3, 4, 5, 6))
      print(average())

      marks = [70, 80, 90]
      print(average(*marks))     # * unpacks a list into separate arguments
    `,
    section('learn', '**kwargs: any number of keyword arguments'),
    code('Collecting keyword arguments into a dict')`
      def make_profile(name, **details):
          profile = {"name": name}
          profile.update(details)
          return profile

      print(make_profile("Ama", programme="CS", level=200, hall="Volta"))

      settings = {"programme": "Law", "level": 100}
      print(make_profile("Kofi", **settings))   # ** unpacks a dict into keywords
    `,
    section('learn', 'Keyword-only and positional-only parameters'),
    code('* and / in a signature')`
      def transfer(amount, *, to_account, fee=0):
          """Parameters after * MUST be given by keyword."""
          return f"Sent {amount} to {to_account} (fee {fee})"

      print(transfer(100, to_account="ACC-2201"))
      # transfer(100, "ACC-2201") would raise TypeError

      def distance(x, y, /):
          """Parameters before / MUST be positional."""
          return (x ** 2 + y ** 2) ** 0.5

      print(distance(3, 4))
    `,
    p`Keyword-only parameters make calls self-documenting and prevent mix-ups between arguments of the same type: «transfer(100, to_account="X")» cannot be confused. The full order of a signature is: positional-only, «/», normal, «*args» or «*», keyword-only, «**kwargs».`,
    section('learn', 'The mutable default trap'),
    code('A bug that surprises everyone once')`
      def add_item_bad(item, basket=[]):
          basket.append(item)
          return basket

      print(add_item_bad("apple"))
      print(add_item_bad("bread"))     # the SAME list is reused!

      def add_item(item, basket=None):
          if basket is None:
              basket = []
          basket.append(item)
          return basket

      print(add_item("apple"))
      print(add_item("bread"))
    `,
    note('deep', 'Going deeper · when defaults are evaluated')`Default values are evaluated **once**, when the «def» statement runs, not each time the function is called. A mutable default (list, dict, set) is therefore a single object shared by every call that does not pass that argument. The «None» sentinel pattern creates a fresh object per call. Linters such as pylint and ruff warn about this automatically.`,
    quiz(
      { q: 'What type is «args» inside «def f(*args)»?', o: ['list', 'tuple', 'dict', 'set'], a: 1, why: 'Extra positional arguments are packed into a tuple.' },
      { q: 'What type is «kwargs» inside «def f(**kwargs)»?', o: ['list', 'tuple', 'dict', 'set'], a: 2, why: 'Extra keyword arguments are packed into a dict.' },
      { q: 'Which definition is invalid?', o: ['«def f(a, b=1):»', '«def f(a=1, b):»', '«def f(*args, a):»', '«def f(a, *, b):»'], a: 1, why: 'A parameter without a default cannot follow one with a default.' },
      { q: 'Why is «def f(x, items=[])» dangerous?', o: ['Lists cannot be defaults', 'The same list is shared across calls', 'It is slower', 'It is not dangerous'], a: 1, why: 'Defaults are evaluated once at definition time.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Flexible formatter', level: 'easy',
      prompt: `Write «format_price(amount, currency="GHS", decimals=2)» returning strings like «GHS 12.50». Use the test code.`,
      starter: R`
        def format_price(amount, currency="GHS", decimals=2):
            pass

        print(format_price(12.5))
        print(format_price(1999, "USD", 0))
        print(format_price(3.14159, decimals=3))`,
      expect: `
        GHS 12.50
        USD 1999
        GHS 3.142`,
      hints: ['A nested format spec: «f"{amount:.{decimals}f}"».'],
      solution: R`
        def format_price(amount, currency="GHS", decimals=2):
            return f"{currency} {amount:.{decimals}f}"

        print(format_price(12.5))
        print(format_price(1999, "USD", 0))
        print(format_price(3.14159, decimals=3))`
    }),
    task({
      title: 'Build an HTML tag', level: 'medium',
      prompt: `Write «tag(name, *children, **attrs)» that returns an HTML string. Children are joined with no separator; attributes become «key="value"» pairs. Use the test code.`,
      starter: R`
        def tag(name, *children, **attrs):
            pass

        print(tag("p", "Hello"))
        print(tag("a", "Docs", href="https://python.org", target="_blank"))
        print(tag("ul", tag("li", "one"), tag("li", "two")))`,
      expect: `
        <p>Hello</p>
        <a href="https://python.org" target="_blank">Docs</a>
        <ul><li>one</li><li>two</li></ul>`,
      hints: ['«"".join(children)» for the content.', 'Attributes: «"".join(f\' {k}="{v}"\' for k, v in attrs.items())».'],
      solution: R`
        def tag(name, *children, **attrs):
            attributes = "".join(f' {k}="{v}"' for k, v in attrs.items())
            return f"<{name}{attributes}>{''.join(children)}</{name}>"

        print(tag("p", "Hello"))
        print(tag("a", "Docs", href="https://python.org", target="_blank"))
        print(tag("ul", tag("li", "one"), tag("li", "two")))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'A reusable report printer',
      brief: `Write a general-purpose function «print_table(rows, *columns, title=None, width=12, numbers=2)» that prints any list of dictionaries as an aligned text table. This is the kind of small utility programmers build once and reuse in every project.`,
      reqs: ['«rows» is a list of dicts; «columns» are the keys to show, in order (if none are given, use all keys of the first row)', '«title» (keyword-only, optional) is printed above the table, centred over its full width', 'Numbers are right-aligned with «numbers» decimal places; text is left-aligned', 'A separator line of «-» under the header', 'Return the number of rows printed'],
      starter: R`
        def print_table(rows, *columns, title=None, width=12, numbers=2):
            pass

        students = [
            {"name": "Ama", "programme": "CS", "gpa": 3.71, "credits": 96},
            {"name": "Kofi", "programme": "Law", "gpa": 3.2, "credits": 64},
            {"name": "Esi", "programme": "Medicine", "gpa": 3.95, "credits": 120},
        ]
        count = print_table(students, "name", "gpa", "credits", title="Dean's list", numbers=1)
        print(count, "rows")
        print_table(students)`,
      solution: R`
        def print_table(rows, *columns, title=None, width=12, numbers=2):
            """Print a list of dicts as an aligned table and return the row count."""
            if not rows:
                print("(no data)")
                return 0
            columns = columns or tuple(rows[0].keys())
            total_width = width * len(columns)
            if title is not None:
                print(f"{title:^{total_width}}")
            print("".join(f"{c.upper():<{width}}" for c in columns))
            print("-" * total_width)
            for row in rows:
                cells = []
                for c in columns:
                    value = row.get(c, "")
                    if isinstance(value, (int, float)) and not isinstance(value, bool):
                        cells.append(f"{value:>{width - 2}.{numbers}f}  ")
                    else:
                        cells.append(f"{str(value):<{width}}")
                print("".join(cells))
            return len(rows)

        students = [
            {"name": "Ama", "programme": "CS", "gpa": 3.71, "credits": 96},
            {"name": "Kofi", "programme": "Law", "gpa": 3.2, "credits": 64},
            {"name": "Esi", "programme": "Medicine", "gpa": 3.95, "credits": 120},
        ]
        count = print_table(students, "name", "gpa", "credits", title="Dean's list", numbers=1)
        print(count, "rows")
        print_table(students)`,
      explain: `«columns or tuple(rows[0].keys())» uses the fact that an empty tuple is falsy. «isinstance(value, (int, float))» checks against several types at once; booleans are excluded explicitly because «bool» is a subclass of «int». Nested format specs like «{value:>{width - 2}.{numbers}f}» let the caller control the layout.`
    })
  ]
});

/* ------------------------------------------------------------------ 3.3 */
lesson({
  id: 'scope-recursion', level: 'L3', title: 'Scope, the call stack and recursion', minutes: 70,
  keywords: 'scope local global nonlocal legb call stack recursion base case memoization',
  goals: ['Explain local and global scope (LEGB)', 'Know why «global» is usually a bad idea', 'Trace function calls on the call stack', 'Write recursive functions with correct base cases', 'Recognise when recursion is inefficient and fix it with memoisation'],
  body: [
    section('learn', 'Local and global scope'),
    code('Each call has its own local variables')`
      rate = 0.15                  # global variable

      def add_vat(price):
          vat = price * rate       # 'vat' and 'price' are local
          return price + vat

      print(add_vat(100))
      print(rate)                  # globals are readable everywhere
      # print(vat)                 # NameError: vat only existed during the call
    `,
    p`A variable assigned inside a function is **local**: it exists only while that call runs and is invisible outside. Python finds names using the **LEGB rule**: **L**ocal → **E**nclosing function → **G**lobal (module) → **B**uilt-in. The first match wins.`,
    code('Assignment creates a local name')`
      counter = 0

      def increment_wrong():
          # counter += 1  -> UnboundLocalError: assigning makes 'counter' local
          pass

      def increment_global():
          global counter
          counter += 1

      def increment_pure(value):
          return value + 1             # better: no hidden state

      increment_global()
      print(counter)
      counter = increment_pure(counter)
      print(counter)
    `,
    note('warn', 'Avoid global')`Functions that change global variables are hard to test and reason about, because their behaviour depends on hidden state. Pass values in as parameters and return results instead. «global» is occasionally fine in tiny scripts; in larger programs you will use classes (Level 4) to group state.`,
    section('learn', 'The call stack'),
    code('Tracing nested calls')`
      def c():
          print("    c runs and returns 3")
          return 3

      def b():
          print("  b calls c")
          value = c()
          print("  b got", value, "and returns", value * 2)
          return value * 2

      def a():
          print("a calls b")
          result = b()
          print("a got", result)

      a()
    `,
    p`When «a» calls «b», Python pauses «a», remembers where it was, and pushes a new **frame** for «b» onto the **call stack**. When «b» returns, its frame is popped and «a» resumes. Each frame holds that call's local variables. When you see a traceback after an error, it is a printout of the call stack at the moment things went wrong, read from the oldest call (top) to the newest (bottom).`,
    section('learn', 'Recursion'),
    p`A function is **recursive** when it calls itself. Every recursive function needs:

    1. a **base case**, which returns without recursing, and
    2. a **recursive case**, which calls itself on a **smaller** problem that moves toward the base case.

    If either is missing, the recursion never ends, the stack overflows and Python raises «RecursionError».`,
    code('Factorial: n! = n × (n−1)!')`
      def factorial(n):
          if n <= 1:                     # base case
              return 1
          return n * factorial(n - 1)    # recursive case

      print(factorial(5))
      print(factorial(20))
    `,
    code('Watching the stack grow and shrink')`
      def countdown(n, depth=0):
          indent = "  " * depth
          if n == 0:
              print(indent + "base case reached")
              return
          print(indent + f"countdown({n}) going down")
          countdown(n - 1, depth + 1)
          print(indent + f"countdown({n}) coming back up")

      countdown(3)
    `,
    code('Recursion on structures: sum of nested lists')`
      def deep_sum(item):
          if isinstance(item, list):
              return sum(deep_sum(x) for x in item)
          return item

      print(deep_sum([1, [2, 3], [[4], 5], [[[6]]]]))
    `,
    p`Recursion shines when the **data itself is recursive**: nested lists, folder trees, family trees, JSON, mathematical definitions. For simple counting, a loop is clearer and faster.`,
    section('learn', 'When recursion is slow: memoisation'),
    code('Fibonacci, naive vs memoised')`
      calls = 0
      def fib(n):
          global calls
          calls += 1
          if n < 2:
              return n
          return fib(n - 1) + fib(n - 2)

      print(fib(20), "computed with", calls, "calls")

      from functools import lru_cache

      @lru_cache(maxsize=None)
      def fib_fast(n):
          if n < 2:
              return n
          return fib_fast(n - 1) + fib_fast(n - 2)

      print(fib_fast(80))
      print(fib_fast.cache_info())
    `,
    note('deep', 'Going deeper · exponential vs linear')`The naive «fib(n)» recomputes the same values again and again: the number of calls grows like φⁿ (about 1.618ⁿ), which is **exponential**. «fib(40)» needs over 300 million calls. **Memoisation** stores each result the first time it is computed, so every «fib(k)» is calculated once: **O(n)** calls. This idea, solving overlapping subproblems once and reusing the answers, is the heart of **dynamic programming**, a major topic in algorithms courses. «@lru_cache» is a *decorator* (lesson 5.2). Python's default recursion limit is about 1000 frames; deep recursion in Python is usually better rewritten as a loop.`,
    quiz(
      { q: 'What does the LEGB rule describe?', o: ['Operator precedence', 'The order Python searches scopes for a name', 'How lists are sorted', 'The order of function parameters'], a: 1, why: 'Local, Enclosing, Global, Built-in.' },
      { q: 'What are the two essential parts of a recursive function?', o: ['A loop and a return', 'A base case and a recursive case moving toward it', 'A global and a local variable', 'Two parameters'], a: 1, why: 'Without a reachable base case, recursion never stops.' },
      { q: 'What error do you get from infinite recursion?', o: ['«ValueError»', '«StackError»', '«RecursionError»', 'The program hangs silently'], a: 2, why: 'Python limits the depth of the call stack.' },
      { q: 'What is printed?', code: R`
          x = 10
          def f():
              x = 5
              return x
          f()
          print(x)`, o: ['5', '10', 'An error'], a: 1, why: 'The «x» inside «f» is a separate local variable.' },
      { q: 'Memoisation improves naive recursive Fibonacci from…', o: ['O(n) to O(1)', 'exponential to O(n)', 'O(n²) to O(n log n)', 'It makes no difference'], a: 1, why: 'Each subproblem is computed once.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Recursive power', level: 'easy',
      prompt: `Write «power(base, exp)» recursively (no «**», no loops) for non-negative integer exponents.`,
      starter: R`
        def power(base, exp):
            pass

        print(power(2, 10), power(3, 0), power(5, 3))`,
      expect: `1024 1 125`,
      hints: ['Base case: «exp == 0» returns 1.', 'Recursive case: «base * power(base, exp - 1)».'],
      solution: R`
        def power(base, exp):
            if exp == 0:
                return 1
            return base * power(base, exp - 1)

        print(power(2, 10), power(3, 0), power(5, 3))`
    }),
    task({
      title: 'Reverse a string recursively', level: 'medium',
      prompt: `Write «reverse(s)» recursively: the reverse of a string is the reverse of everything after the first character, followed by the first character.`,
      starter: R`
        def reverse(s):
            pass

        print(reverse("recursion"))
        print(reverse(""))`,
      expect: `
        noisrucer
        `,
      hints: ['Base case: a string of length 0 or 1 is its own reverse.', '«return reverse(s[1:]) + s[0]»'],
      solution: R`
        def reverse(s):
            if len(s) <= 1:
                return s
            return reverse(s[1:]) + s[0]

        print(reverse("recursion"))
        print(reverse(""))`
    }),
    task({
      title: 'Binary search, recursively', level: 'hard',
      prompt: `Write «binary_search(items, target, low=0, high=None)» that returns the index of «target» in the **sorted** list, or «-1». Use recursion on the half that could contain the target.`,
      starter: R`
        def binary_search(items, target, low=0, high=None):
            pass

        data = [3, 8, 15, 23, 42, 57, 68, 91]
        for t in [3, 42, 91, 50]:
            print(t, binary_search(data, t))`,
      expect: `
        3 0
        42 4
        91 7
        50 -1`,
      hints: ['If «high is None», set it to «len(items) - 1».', 'Base case: «low > high» means not found.', 'Compare with «items[mid]» and recurse on «mid + 1 .. high» or «low .. mid - 1».'],
      solution: R`
        def binary_search(items, target, low=0, high=None):
            if high is None:
                high = len(items) - 1
            if low > high:
                return -1
            mid = (low + high) // 2
            if items[mid] == target:
                return mid
            if items[mid] < target:
                return binary_search(items, target, mid + 1, high)
            return binary_search(items, target, low, mid - 1)

        data = [3, 8, 15, 23, 42, 57, 68, 91]
        for t in [3, 42, 91, 50]:
            print(t, binary_search(data, t))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Towers of Hanoi and a folder tree',
      brief: `Two classic recursion problems. **Part A:** solve the Towers of Hanoi: move «n» discs from peg A to peg C using peg B, never placing a larger disc on a smaller one. **Part B:** a folder structure is stored as nested dictionaries (folders) whose leaves are file sizes in KB. Write a recursive function that computes the total size of any folder, and another that prints the tree with indentation.`,
      reqs: ['«hanoi(n, source, target, spare)» prints each move and returns the number of moves', 'Show that 3 discs need 7 moves, and print (without listing moves) how many 10 discs need: 2ⁿ − 1', '«folder_size(folder)» returns the total KB, recursing into sub-dictionaries', '«show(folder, name, depth=0)» prints each folder with its total and each file with its size, indented by depth', 'Write a comment stating the base case of each recursive function'],
      starter: R`
        def hanoi(n, source, target, spare):
            pass

        project = {
            "report.docx": 120,
            "data": {"survey.csv": 340, "raw": {"day1.csv": 800, "day2.csv": 760}},
            "code": {"analysis.py": 12, "plots.py": 8},
        }
        `,
      solution: R`
        def hanoi(n, source, target, spare, show_moves=True):
            # Base case: no discs, nothing to move.
            if n == 0:
                return 0
            moves = hanoi(n - 1, source, spare, target, show_moves)
            if show_moves:
                print(f"Move disc {n} from {source} to {target}")
            moves += 1
            moves += hanoi(n - 1, spare, target, source, show_moves)
            return moves

        print("Total moves:", hanoi(3, "A", "C", "B"))
        print("10 discs need", hanoi(10, "A", "C", "B", show_moves=False), "moves =", 2 ** 10 - 1)

        project = {
            "report.docx": 120,
            "data": {"survey.csv": 340, "raw": {"day1.csv": 800, "day2.csv": 760}},
            "code": {"analysis.py": 12, "plots.py": 8},
        }

        def folder_size(folder):
            # Base case: a file (a number) is just its own size.
            if not isinstance(folder, dict):
                return folder
            return sum(folder_size(child) for child in folder.values())

        def show(folder, name, depth=0):
            # Base case: files print one line and stop.
            pad = "    " * depth
            if not isinstance(folder, dict):
                print(f"{pad}{name} ({folder} KB)")
                return
            print(f"{pad}{name}/ [{folder_size(folder)} KB]")
            for child_name, child in folder.items():
                show(child, child_name, depth + 1)

        show(project, "project")`,
      explain: `To move n discs: move the top n−1 out of the way onto the spare peg, move the biggest disc to the target, then move the n−1 discs on top of it. That gives the recurrence M(n) = 2·M(n−1) + 1, whose solution is 2ⁿ − 1. The folder functions work for any depth of nesting, which a fixed number of nested loops cannot do. Real file systems are trees, and «os.walk» from the standard library walks them for you.`
    })
  ]
});

/* ------------------------------------------------------------------ 3.4 */
lesson({
  id: 'lambdas', level: 'L3', title: 'Lambdas and higher-order functions', minutes: 45,
  keywords: 'lambda map filter reduce higher order function closure first class',
  goals: ['Write short anonymous functions with «lambda»', 'Pass functions as arguments and return them from functions', 'Use «map», «filter» and «functools.reduce»', 'Build closures and function factories'],
  body: [
    section('learn', 'Functions as values'),
    code('Storing and passing functions')`
      def shout(text):
          return text.upper() + "!"

      def whisper(text):
          return text.lower() + "..."

      speak = shout                 # no brackets: the function itself
      print(speak("hello"))

      def apply_twice(func, value):
          return func(func(value))

      print(apply_twice(lambda x: x * 3, 2))

      styles = {"loud": shout, "quiet": whisper}
      for name, f in styles.items():
          print(name, "->", f("Python"))
    `,
    p`A **higher-order function** takes a function as an argument or returns one. «sorted(key=...)», «max(key=...)», «map» and «filter» are higher-order functions. A dictionary of functions, like «styles» above, is a neat replacement for long «if/elif» chains that choose an action.`,
    section('learn', 'lambda'),
    code('lambda parameters: expression')`
      square = lambda x: x ** 2           # works, but def is better for named functions
      print(square(7))

      points = [(2, 5), (-1, 3), (4, -2), (0, 0)]
      print(sorted(points, key=lambda p: p[0] ** 2 + p[1] ** 2))   # by distance from origin
      print(max(points, key=lambda p: p[1]))
    `,
    p`A **lambda** is a small anonymous function limited to a single expression. Use it for short throwaway functions passed as arguments. If you are assigning it to a name, or it needs more than one expression, write a normal «def» (PEP 8 recommends this).`,
    section('learn', 'map, filter, reduce'),
    code('Functional tools')`
      from functools import reduce

      nums = [1, 2, 3, 4, 5, 6]
      print(list(map(lambda n: n * 10, nums)))
      print(list(filter(lambda n: n % 2 == 0, nums)))
      print(reduce(lambda acc, n: acc * n, nums, 1))      # product

      # The comprehension equivalents are usually clearer in Python:
      print([n * 10 for n in nums])
      print([n for n in nums if n % 2 == 0])

      # map with a named function reads well
      print(list(map(str.title, ["ama", "kofi", "esi"])))
    `,
    section('learn', 'Closures and function factories'),
    code('Functions that build functions')`
      def make_multiplier(factor):
          def multiply(x):
              return x * factor     # 'factor' is remembered from the enclosing call
          return multiply

      double = make_multiplier(2)
      triple = make_multiplier(3)
      print(double(10), triple(10))

      def make_counter():
          count = 0
          def step():
              nonlocal count        # modify the enclosing variable
              count += 1
              return count
          return step

      c = make_counter()
      print(c(), c(), c())
    `,
    note('deep', 'Going deeper · closures')`When an inner function refers to a variable of its enclosing function, Python keeps that variable alive after the outer function returns. The inner function plus its remembered environment is a **closure**. Each call to «make_multiplier» creates a new closure with its own «factor». «nonlocal» lets the inner function rebind an enclosing variable (the E in LEGB), just as «global» does for module-level names. Closures are the mechanism behind decorators (lesson 5.2) and callbacks in event-driven programming.`,
    quiz(
      { q: 'What is «(lambda a, b: a - b)(10, 4)»?', o: ['«6»', '«-6»', '«14»', 'An error'], a: 0, why: 'The lambda is called immediately with a=10, b=4.' },
      { q: 'What does «list(filter(lambda s: len(s) > 2, ["a", "abc", "de", "fgh"]))» give?', o: ['«["abc", "fgh"]»', '«["a", "de"]»', '«[False, True, False, True]»', '«2»'], a: 0, why: '«filter» keeps the items for which the function is true.' },
      { q: 'Which is the best use of lambda?', o: ['«total = lambda x, y: x + y» for reuse everywhere', 'A short «key» function passed to «sorted»', 'A 20-line calculation', 'Replacing every function'], a: 1, why: 'Lambdas are for short inline functions.' },
      { q: 'In a closure, what is "remembered"?', o: ['Nothing', 'Variables from the enclosing function', 'All global variables', 'The return value'], a: 1, why: 'The inner function keeps access to enclosing variables.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Calculator with a dict of functions', level: 'medium',
      prompt: `Complete the «OPERATIONS» dictionary with lambdas for «+ - * /» so the loop prints the results. Division by zero should not be attempted: the loop already checks that.`,
      starter: R`
        OPERATIONS = {
            "+": None,
        }

        for a, op, b in [(6, "+", 3), (6, "-", 3), (6, "*", 3), (6, "/", 3), (6, "/", 0)]:
            if op == "/" and b == 0:
                print(f"{a} {op} {b} = undefined")
            else:
                print(f"{a} {op} {b} = {OPERATIONS[op](a, b)}")`,
      expect: `
        6 + 3 = 9
        6 - 3 = 3
        6 * 3 = 18
        6 / 3 = 2.0
        6 / 0 = undefined`,
      hints: ['«"+": lambda x, y: x + y»'],
      solution: R`
        OPERATIONS = {
            "+": lambda x, y: x + y,
            "-": lambda x, y: x - y,
            "*": lambda x, y: x * y,
            "/": lambda x, y: x / y,
        }

        for a, op, b in [(6, "+", 3), (6, "-", 3), (6, "*", 3), (6, "/", 3), (6, "/", 0)]:
            if op == "/" and b == 0:
                print(f"{a} {op} {b} = undefined")
            else:
                print(f"{a} {op} {b} = {OPERATIONS[op](a, b)}")`
    }),
    task({
      title: 'Compose functions', level: 'hard',
      prompt: `Write «compose(*funcs)» that returns a new function applying the given functions **right to left**: «compose(f, g)(x) == f(g(x))». With no functions it should return the input unchanged.`,
      starter: R`
        def compose(*funcs):
            pass

        clean = compose(str.title, str.strip)
        print(clean("   ada lovelace  "))
        inc_then_double = compose(lambda x: x * 2, lambda x: x + 1)
        print(inc_then_double(5))
        print(compose()(42))`,
      expect: `
        Ada Lovelace
        12
        42`,
      hints: ['Return an inner function «def composed(x):».', 'Inside, loop over «reversed(funcs)» and apply each one to «x».'],
      solution: R`
        def compose(*funcs):
            def composed(x):
                for f in reversed(funcs):
                    x = f(x)
                return x
            return composed

        clean = compose(str.title, str.strip)
        print(clean("   ada lovelace  "))
        inc_then_double = compose(lambda x: x * 2, lambda x: x + 1)
        print(inc_then_double(5))
        print(compose()(42))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Numerical methods toolkit',
      brief: `Many numerical methods take a **function** as input. Implement three classic ones as higher-order functions and test them on mathematical functions written as lambdas. You will meet these again in numerical analysis and engineering mathematics.`,
      reqs: ['«derivative(f, x, h=1e-6)»: central difference «(f(x+h) − f(x−h)) / 2h»', '«integrate(f, a, b, n=1000)»: trapezoidal rule with n strips', '«bisection(f, a, b, tol=1e-9)»: find a root of f in [a, b] (f(a) and f(b) must have opposite signs; raise «ValueError» otherwise)', 'Test: derivative of x³ at 2 (≈ 12); integral of sin x from 0 to π (≈ 2); root of x² − 2 in [0, 2] (≈ 1.41421356)', 'Print each result to 6 decimals'],
      starter: R`
        import math

        def derivative(f, x, h=1e-6):
            pass
        `,
      solution: R`
        import math


        def derivative(f, x, h=1e-6):
            """Approximate f'(x) with a central difference."""
            return (f(x + h) - f(x - h)) / (2 * h)


        def integrate(f, a, b, n=1000):
            """Approximate the integral of f from a to b with the trapezoidal rule."""
            width = (b - a) / n
            total = (f(a) + f(b)) / 2
            for i in range(1, n):
                total += f(a + i * width)
            return total * width


        def bisection(f, a, b, tol=1e-9):
            """Find x in [a, b] with f(x) close to 0, assuming a sign change."""
            if f(a) * f(b) > 0:
                raise ValueError("f(a) and f(b) must have opposite signs")
            while b - a > tol:
                mid = (a + b) / 2
                if f(a) * f(mid) <= 0:
                    b = mid
                else:
                    a = mid
            return (a + b) / 2


        print(f"d/dx x^3 at 2:   {derivative(lambda x: x ** 3, 2):.6f}")
        print(f"integral sin 0..pi: {integrate(math.sin, 0, math.pi):.6f}")
        print(f"root of x^2 - 2:  {bisection(lambda x: x * x - 2, 0, 2):.6f}")`,
      explain: `The bisection method is binary search applied to a continuous function: each step halves the interval known to contain a root, so it needs about log₂((b − a)/tol) ≈ 31 iterations here. The trapezoidal rule's error shrinks proportionally to 1/n², so 1,000 strips already give six correct decimals for sin x.`
    })
  ]
});

/* ------------------------------------------------------------------ 3.5 */
lesson({
  id: 'modules', level: 'L3', title: 'Modules and the standard library', minutes: 55,
  keywords: 'import module package standard library math random datetime collections counter defaultdict itertools __name__ main',
  goals: ['Import modules in different ways', 'Use key standard library modules: «math», «random», «datetime», «collections», «itertools»', 'Create your own module', 'Explain «if __name__ == "__main__":»'],
  body: [
    section('learn', 'What is a module?'),
    p`A **module** is simply a «.py» file containing definitions. A **package** is a folder of modules. Python ships with a large **standard library** ("batteries included"), and hundreds of thousands more packages are available on PyPI (lesson 5.6).`,
    code('Ways to import')`
      import math                          # use as math.sqrt
      import statistics as stats           # alias
      from random import choice, randint   # import specific names
      from collections import Counter

      print(math.sqrt(81))
      print(stats.mean([2, 4, 9]))
      print(Counter("abracadabra").most_common(2))
      print(choice(["heads", "tails"]) in ("heads", "tails"))
    `,
    p`Prefer «import module» or «from module import name». Avoid «from module import *»: it dumps every name into your program, hides where names come from, and can silently overwrite your own variables.`,
    section('learn', 'Tour of essential modules'),
    code('datetime')`
      from datetime import date, datetime, timedelta

      exam = date(2026, 12, 8)
      today = date(2026, 10, 27)              # use date.today() in real programs
      print("Days to exam:", (exam - today).days)
      print(exam.strftime("%A, %d %B %Y"))
      deadline = datetime(2026, 11, 3, 23, 59)
      print("Extension:", deadline + timedelta(days=2, hours=12))
      parsed = datetime.strptime("15/01/2027 09:30", "%d/%m/%Y %H:%M")
      print(parsed.year, parsed.hour)
    `,
    code('collections: Counter, defaultdict, namedtuple, deque')`
      from collections import Counter, defaultdict, namedtuple, deque

      votes = ["Ama", "Kofi", "Ama", "Esi", "Ama", "Kofi"]
      tally = Counter(votes)
      print(tally, tally["Ama"], tally.most_common(1))

      by_letter = defaultdict(list)          # missing keys start as []
      for name in ["Ama", "Abena", "Kofi", "Kwame", "Esi"]:
          by_letter[name[0]].append(name)
      print(dict(by_letter))

      Point = namedtuple("Point", ["x", "y"])
      p = Point(3, 4)
      print(p.x, p.y, p)

      queue = deque(["a", "b", "c"])
      queue.appendleft("z")
      print(queue.popleft(), queue.pop(), queue)
    `,
    code('itertools')`
      from itertools import combinations, permutations, product, accumulate, groupby

      print(list(combinations(["Ama", "Kofi", "Esi"], 2)))       # pairs, order irrelevant
      print(len(list(permutations(range(4)))))                     # 4! orderings
      print(list(product("AB", [1, 2])))                           # cartesian product
      print(list(accumulate([5, 3, 8, 1])))                        # running totals
      for key, group in groupby(sorted("mississippi")):
          print(key, len(list(group)), end="  ")
      print()
    `,
    table(['Module', 'Use it for'], [
      ['«math», «statistics»', 'maths functions, mean/median/stdev'],
      ['«random»', 'random numbers, choices, shuffling, simulations'],
      ['«datetime»', 'dates, times, durations, parsing and formatting'],
      ['«collections»', 'Counter, defaultdict, deque, namedtuple'],
      ['«itertools», «functools»', 'combinatorics, iteration tools, caching, reduce'],
      ['«os», «pathlib», «shutil»', 'files and folders (on your computer)'],
      ['«json», «csv»', 'data formats (lesson 3.7)'],
      ['«re»', 'regular expressions (lesson 5.5)'],
      ['«sys»', 'interpreter details, command-line arguments'],
      ['«unittest»', 'automated tests (lesson 5.7)']
    ]),
    section('learn', 'Writing your own module'),
    p`On your computer, create two files in the same folder:`,
    code('geometry.py', { run: false })`
      """Small geometry helpers."""
      import math

      PI = math.pi

      def circle_area(r):
          return PI * r ** 2

      def rectangle_area(w, h):
          return w * h

      if __name__ == "__main__":
          # runs only when this file is executed directly, not when imported
          print("Testing geometry module...")
          print(circle_area(1))
    `,
    code('main.py', { run: false, out: '78.54\n12' })`
      import geometry
      from geometry import rectangle_area

      print(round(geometry.circle_area(5), 2))
      print(rectangle_area(3, 4))
    `,
    p`Running «python main.py» imports «geometry»; the test code at the bottom of «geometry.py» does not run. Running «python geometry.py» directly does run it.`,
    note('deep', 'Going deeper · __name__ and module caching')`Every module has a variable «__name__». When a file is run directly, Python sets it to «"__main__"»; when it is imported, it is the module's name («"geometry"»). The «if __name__ == "__main__":» guard lets one file be both a reusable library and a runnable script. Python also caches modules in «sys.modules»: importing the same module twice does not run its code twice. Python searches for modules in the folders listed in «sys.path», starting with the script's own folder, which is why naming your file «random.py» breaks «import random».`,
    code('__name__ in this page')`
      print(__name__)
      import math
      print(math.__name__)
    `,
    quiz(
      { q: 'Which import lets you write «sqrt(16)» directly?', o: ['«import math»', '«from math import sqrt»', '«import sqrt»', '«math import sqrt»'], a: 1, why: '«from module import name» brings the name into your namespace.' },
      { q: 'What does «Counter("hello")["l"]» return?', o: ['1', '2', '3', '«"l"»'], a: 1, why: 'There are two l’s.' },
      { q: 'When does code under «if __name__ == "__main__":» run?', o: ['Always', 'Only when the file is run directly', 'Only when imported', 'Never'], a: 1, why: 'When imported, «__name__» is the module name instead.' },
      { q: 'Why should you not name your script «random.py»?', o: ['It is a reserved word', 'It shadows the standard library module of that name', 'Python cannot run it', 'No reason'], a: 1, why: 'Your folder is searched first, so «import random» would import your file.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Age calculator', level: 'medium',
      prompt: `Using «datetime.date», write «age_on(birth, on)» that returns the age in full years on a given date. Remember the birthday may not have happened yet in that year.`,
      starter: R`
        from datetime import date

        def age_on(birth, on):
            pass

        print(age_on(date(2005, 3, 14), date(2026, 10, 27)))
        print(age_on(date(2005, 11, 2), date(2026, 10, 27)))
        print(age_on(date(2004, 10, 27), date(2026, 10, 27)))`,
      expect: `
        21
        20
        22`,
      hints: ['Start with «on.year - birth.year».', 'Subtract 1 if «(on.month, on.day) < (birth.month, birth.day)» (tuple comparison!).'],
      solution: R`
        from datetime import date

        def age_on(birth, on):
            years = on.year - birth.year
            if (on.month, on.day) < (birth.month, birth.day):
                years -= 1
            return years

        print(age_on(date(2005, 3, 14), date(2026, 10, 27)))
        print(age_on(date(2005, 11, 2), date(2026, 10, 27)))
        print(age_on(date(2004, 10, 27), date(2026, 10, 27)))`
    }),
    task({
      title: 'Team pairings', level: 'medium',
      prompt: `Use «itertools.combinations» to print every possible pair of presenters from the list, numbered, and then the total number of pairs.`,
      starter: R`
        from itertools import combinations
        people = ["Ama", "Kofi", "Esi", "Yaw"]
        `,
      expect: `
        1. Ama & Kofi
        2. Ama & Esi
        3. Ama & Yaw
        4. Kofi & Esi
        5. Kofi & Yaw
        6. Esi & Yaw
        Total pairs: 6`,
      hints: ['«for i, (a, b) in enumerate(combinations(people, 2), start=1):»'],
      solution: R`
        from itertools import combinations
        people = ["Ama", "Kofi", "Esi", "Yaw"]
        pairs = list(combinations(people, 2))
        for i, (a, b) in enumerate(pairs, start=1):
            print(f"{i}. {a} & {b}")
        print(f"Total pairs: {len(pairs)}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Monte Carlo and the birthday paradox',
      brief: `In a class of 23 students, what is the probability that at least two share a birthday? The surprising answer is just over 50%. Estimate it by simulation with «random», compare to the exact formula, and print a table for several class sizes.`,
      reqs: ['«has_shared_birthday(n)»: generates n random birthdays (1–365) and returns whether any repeat (use a set)', '«estimate(n, trials=2000)»: fraction of trials with a shared birthday', '«exact(n)»: 1 − (365/365 × 364/365 × … × (365−n+1)/365) using a loop or «math.prod»', 'Print a table for n = 10, 20, 23, 30, 40, 50 with both values as percentages', 'Use «random.seed(1)» so results are reproducible', 'Put the table printing in «main()» behind «if __name__ == "__main__":»'],
      starter: R`
        import math
        import random
        `,
      solution: R`
        import math
        import random


        def has_shared_birthday(n):
            birthdays = [random.randint(1, 365) for _ in range(n)]
            return len(set(birthdays)) < n


        def estimate(n, trials=2000):
            hits = sum(1 for _ in range(trials) if has_shared_birthday(n))
            return hits / trials


        def exact(n):
            all_different = math.prod((365 - k) / 365 for k in range(n))
            return 1 - all_different


        def main():
            random.seed(1)
            print(f"{'n':>3}{'simulated':>12}{'exact':>10}")
            for n in [10, 20, 23, 30, 40, 50]:
                print(f"{n:>3}{estimate(n):>12.1%}{exact(n):>10.1%}")


        if __name__ == "__main__":
            main()`,
      explain: `«len(set(birthdays)) < n» is a neat duplicate test: a set drops repeats, so it is shorter exactly when something repeated. The simulated values get closer to the exact ones as «trials» increases, with error shrinking roughly like 1/√trials. Monte Carlo simulation is how you estimate probabilities that have no neat formula.`
    })
  ]
});

/* ------------------------------------------------------------------ 3.6 */
lesson({
  id: 'exceptions', level: 'L3', title: 'Errors and exceptions', minutes: 55,
  keywords: 'try except else finally raise exception custom error handling valueerror',
  goals: ['Read tracebacks and name common exception types', 'Handle errors with «try» / «except» / «else» / «finally»', 'Raise exceptions with helpful messages', 'Create custom exception classes', 'Decide when to catch and when to let errors propagate'],
  body: [
    section('learn', 'Syntax errors vs exceptions'),
    p`A **syntax error** means the code is not valid Python (a missing colon, unclosed bracket); nothing runs at all. An **exception** happens while the program runs: the code is valid, but something goes wrong, like dividing by zero or opening a missing file.`,
    table(['Exception', 'Typical cause'], [
      ['«ValueError»', 'right type, bad value: «int("abc")»'],
      ['«TypeError»', 'wrong type: «"a" + 1», calling with wrong number of arguments'],
      ['«NameError»', 'misspelt or undefined variable'],
      ['«IndexError»', 'list index out of range'],
      ['«KeyError»', 'missing dictionary key'],
      ['«ZeroDivisionError»', 'dividing by zero'],
      ['«AttributeError»', 'object has no such attribute/method: «[1].push(2)»'],
      ['«FileNotFoundError»', 'opening a file that does not exist'],
      ['«RecursionError»', 'recursion too deep']
    ]),
    section('learn', 'try / except'),
    code('Catching an exception', { input: 'abc\n0\n4' })`
      for attempt in range(3):
          text = input("Divide 100 by: ")
          try:
              result = 100 / int(text)
              print("Result:", result)
          except ValueError:
              print("  That is not a whole number.")
          except ZeroDivisionError:
              print("  Cannot divide by zero.")
    `,
    p`Python runs the «try» block. If an exception occurs, it jumps to the first matching «except» block; the rest of the «try» block is skipped. If nothing goes wrong, all «except» blocks are skipped.`,
    section('learn', 'else and finally'),
    code('The full form')`
      def safe_divide(a, b):
          try:
              result = a / b
          except ZeroDivisionError as err:
              print("  error:", err)
              return None
          else:
              print("  no error occurred")       # runs only if try succeeded
              return result
          finally:
              print("  finally always runs")     # cleanup: closing files, connections

      print(safe_divide(10, 2))
      print(safe_divide(1, 0))
    `,
    p`«except ... as err» gives you the exception object, whose message you can print or log. «else» holds the code that should run only when no exception happened, which keeps the «try» block small. «finally» runs no matter what, even after «return», which makes it ideal for cleanup.`,
    section('learn', 'Raising exceptions'),
    code('raise')`
      def set_mark(mark):
          if not isinstance(mark, (int, float)):
              raise TypeError(f"mark must be a number, got {type(mark).__name__}")
          if not 0 <= mark <= 100:
              raise ValueError(f"mark must be between 0 and 100, got {mark}")
          return mark

      for value in [85, 120, "ninety"]:
          try:
              print("OK:", set_mark(value))
          except (ValueError, TypeError) as e:
              print(f"{type(e).__name__}: {e}")
    `,
    p`Raise an exception when your function receives something it cannot sensibly handle. Choose the most fitting built-in type and write a message that says what was wrong and what was expected. The **caller** then decides what to do: ask again, use a default, or stop.`,
    section('learn', 'Custom exceptions'),
    code('Defining your own exception types')`
      class InsufficientFundsError(Exception):
          """Raised when a withdrawal exceeds the balance."""

      def withdraw(balance, amount):
          if amount > balance:
              raise InsufficientFundsError(f"balance {balance} is less than {amount}")
          return balance - amount

      try:
          withdraw(50, 80)
      except InsufficientFundsError as e:
          print("Transaction declined:", e)
    `,
    p`A custom exception is a class that inherits from «Exception» (classes and inheritance are Level 4; for now this one-line pattern is all you need). Custom types let callers catch *your* specific error without accidentally catching unrelated ones.`,
    note('warn', 'Do not swallow every error')`A bare «except:» or «except Exception: pass» hides bugs: a typo becomes a silent wrong result. Catch the **specific** exceptions you expect and can handle. Let the others propagate so you see them. "Errors should never pass silently, unless explicitly silenced." (The Zen of Python, «import this»)`,
    note('deep', 'Going deeper · EAFP vs LBYL')`Two styles exist. **LBYL** (Look Before You Leap): «if key in d: value = d[key]». **EAFP** (Easier to Ask Forgiveness than Permission): «try: value = d[key] except KeyError: ...». Python culture tends to prefer EAFP: it avoids race conditions (a file can disappear between the check and the open) and keeps the normal path uncluttered. Exceptions propagate up the call stack until something catches them; if nothing does, the program stops and prints the traceback.`,
    quiz(
      { q: 'What does «int("3.5")» raise?', o: ['«TypeError»', '«ValueError»', '«SyntaxError»', 'Nothing, it returns 3'], a: 1, why: 'The type (str) is acceptable, the value is not a valid integer literal.' },
      { q: 'When does the «else» block of a try statement run?', o: ['Always', 'When an exception occurred', 'When no exception occurred', 'Never'], a: 2, why: '«else» is for the success path.' },
      { q: 'When does «finally» run?', o: ['Only on errors', 'Only on success', 'Always', 'Only if there is no return'], a: 2, why: 'Even after a return or an unhandled exception.' },
      { q: 'Why avoid «except: pass»?', o: ['It is slow', 'It hides all errors, including bugs', 'It is a syntax error', 'It only catches ValueError'], a: 1, why: 'Silent failures are the hardest bugs to find.' },
      { q: 'What does «{"a": 1}["b"]» raise?', o: ['«IndexError»', '«KeyError»', '«ValueError»', '«NameError»'], a: 1, why: 'Missing dictionary keys raise KeyError.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Robust number input', level: 'easy',
      prompt: `Write «read_int(prompt)» that keeps asking until the user types a valid integer, then returns it. Use «try/except ValueError». The Input box contains two bad entries first.`,
      input: 'twelve\n12.5\n12',
      starter: R`
        def read_int(prompt):
            pass

        n = read_int("Number: ")
        print("Double:", n * 2)`,
      expect: `
        Number: twelve
          Not a whole number, try again.
        Number: 12.5
          Not a whole number, try again.
        Number: 12
        Double: 24`,
      hints: ['«while True:» with «return int(input(prompt))» inside «try».', 'In «except ValueError:» print «  Not a whole number, try again.».'],
      solution: R`
        def read_int(prompt):
            while True:
                try:
                    return int(input(prompt))
                except ValueError:
                    print("  Not a whole number, try again.")

        n = read_int("Number: ")
        print("Double:", n * 2)`
    }),
    task({
      title: 'Safe average', level: 'medium',
      prompt: `Write «average(values)» that raises «ValueError("no values")» for an empty list and «TypeError» (with a message) if any item is not a number. Use the test code, which catches and prints the errors.`,
      starter: R`
        def average(values):
            pass

        for data in [[4, 8, 6], [], [1, "two", 3]]:
            try:
                print(average(data))
            except (ValueError, TypeError) as e:
                print(f"{type(e).__name__}: {e}")`,
      expect: `
        6.0
        ValueError: no values
        TypeError: not a number: 'two'`,
      hints: ['Check emptiness first.', 'Loop and use «isinstance(v, (int, float))»; format the bad value with «!r» to show quotes: «f"not a number: {v!r}"».'],
      solution: R`
        def average(values):
            if not values:
                raise ValueError("no values")
            for v in values:
                if not isinstance(v, (int, float)):
                    raise TypeError(f"not a number: {v!r}")
            return sum(values) / len(values)

        for data in [[4, 8, 6], [], [1, "two", 3]]:
            try:
                print(average(data))
            except (ValueError, TypeError) as e:
                print(f"{type(e).__name__}: {e}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Bullet-proof course registration',
      brief: `Write a course registration function with full validation, and a driver that processes a batch of requests, reporting each failure clearly without crashing. This is what a real back-end does: validate everything, fail loudly with precise messages, and keep serving the other requests.`,
      reqs: ['Define custom exceptions «RegistrationError» (base), «CourseFullError», «PrerequisiteError» and «CreditLimitError» (subclasses of «RegistrationError»)', '«register(student, course_code)» raises «KeyError» for an unknown course, and the right custom error for: course full, missing prerequisite, or exceeding 18 credits', 'On success it updates the course enrolment and the student\'s registered list', 'The driver loops over requests, catches «RegistrationError» and «KeyError» separately, and prints «OK» or the reason', 'Use «finally» to count processed requests, and print a summary at the end'],
      starter: R`
        courses = {
            "CSCD201": {"credits": 3, "capacity": 2, "enrolled": 1, "prereq": "CSCD101"},
            "MATH223": {"credits": 3, "capacity": 50, "enrolled": 10, "prereq": None},
            "CSCD205": {"credits": 4, "capacity": 40, "enrolled": 5, "prereq": "CSCD201"},
            "PROJ400": {"credits": 6, "capacity": 30, "enrolled": 0, "prereq": None},
        }
        students = {
            "ama": {"passed": {"CSCD101"}, "registered": [], "credits": 9},
            "kofi": {"passed": set(), "registered": [], "credits": 15},
        }
        requests = [("ama", "CSCD201"), ("kofi", "CSCD201"), ("kofi", "MATH223"),
                    ("ama", "CSCD999"), ("kofi", "PROJ400"), ("ama", "CSCD205"), ("ama", "MATH223")]
        `,
      solution: R`
        class RegistrationError(Exception):
            """Base class for registration problems."""

        class CourseFullError(RegistrationError):
            pass

        class PrerequisiteError(RegistrationError):
            pass

        class CreditLimitError(RegistrationError):
            pass

        MAX_CREDITS = 18

        courses = {
            "CSCD201": {"credits": 3, "capacity": 2, "enrolled": 1, "prereq": "CSCD101"},
            "MATH223": {"credits": 3, "capacity": 50, "enrolled": 10, "prereq": None},
            "CSCD205": {"credits": 4, "capacity": 40, "enrolled": 5, "prereq": "CSCD201"},
            "PROJ400": {"credits": 6, "capacity": 30, "enrolled": 0, "prereq": None},
        }
        students = {
            "ama": {"passed": {"CSCD101"}, "registered": [], "credits": 9},
            "kofi": {"passed": set(), "registered": [], "credits": 15},
        }


        def register(student, code):
            course = courses[code]                       # KeyError if unknown
            if course["enrolled"] >= course["capacity"]:
                raise CourseFullError(f"{code} is full ({course['capacity']} places)")
            prereq = course["prereq"]
            if prereq and prereq not in student["passed"]:
                raise PrerequisiteError(f"{code} requires {prereq}")
            if student["credits"] + course["credits"] > MAX_CREDITS:
                raise CreditLimitError(
                    f"{code} would bring credits to {student['credits'] + course['credits']} (max {MAX_CREDITS})")
            course["enrolled"] += 1
            student["registered"].append(code)
            student["credits"] += course["credits"]


        requests = [("ama", "CSCD201"), ("kofi", "CSCD201"), ("kofi", "MATH223"),
                    ("ama", "CSCD999"), ("kofi", "PROJ400"), ("ama", "CSCD205"), ("ama", "MATH223")]

        processed = ok = 0
        for name, code in requests:
            try:
                register(students[name], code)
            except RegistrationError as e:
                print(f"{name:<5} {code:<8} FAILED  {type(e).__name__}: {e}")
            except KeyError:
                print(f"{name:<5} {code:<8} FAILED  unknown course")
            else:
                ok += 1
                print(f"{name:<5} {code:<8} OK")
            finally:
                processed += 1

        print(f"\n{processed} requests processed, {ok} succeeded")
        for name, s in students.items():
            print(f"{name}: {s['registered']} ({s['credits']} credits)")`,
      explain: `Because all three custom errors inherit from «RegistrationError», one «except RegistrationError» clause handles them all, while «type(e).__name__» still reports which one it was. Ama's request for CSCD205 fails because she has registered for CSCD201 but has not *passed* it: the rule is enforced exactly as written. This kind of precise, testable business rule is what real registration systems are made of.`
    })
  ]
});

/* ------------------------------------------------------------------ 3.7 */
lesson({
  id: 'files', level: 'L3', title: 'Files, CSV and JSON', minutes: 65,
  keywords: 'file open read write with csv json pathlib encoding',
  goals: ['Open, read and write text files safely with «with»', 'Choose the right file mode', 'Read and write CSV files with the «csv» module', 'Save and load structured data as JSON', 'Handle missing files gracefully'],
  body: [
    section('learn', 'Writing and reading text files'),
    p`Programs lose everything in variables when they stop. **Files** let data persist. The code boxes in this page use a small in-memory file system, so you can try everything here; on your computer the files appear in the folder you run the script from.`,
    code('Write, then read')`
      with open("notes.txt", "w", encoding="utf-8") as f:
          f.write("Lecture 1: variables\n")
          f.write("Lecture 2: loops\n")
          f.write("Lecture 3: functions\n")

      with open("notes.txt", "r", encoding="utf-8") as f:
          content = f.read()
      print(content)
    `,
    p`«open(path, mode)» returns a **file object**. The «with» statement guarantees the file is **closed** when the block ends, even if an error occurs. Always use «with». Always pass «encoding="utf-8"» for text, so names like «Adwoa Ɔforiwaa» or «José» are stored correctly on every operating system.`,
    table(['Mode', 'Meaning'], [
      ['«"r"»', 'read (default); error if the file does not exist'],
      ['«"w"»', 'write; **creates or empties** the file'],
      ['«"a"»', 'append to the end; creates the file if needed'],
      ['«"x"»', 'create; error if it already exists'],
      ['«"rb"», «"wb"»', 'binary mode, for images and other non-text files']
    ]),
    code('Reading line by line and appending')`
      with open("notes.txt", "a", encoding="utf-8") as f:
          f.write("Lecture 4: files\n")

      with open("notes.txt", encoding="utf-8") as f:
          for number, line in enumerate(f, start=1):
              print(number, line.rstrip("\n"))

      with open("notes.txt", encoding="utf-8") as f:
          lines = f.read().splitlines()
      print(len(lines), "lines; last:", lines[-1])
    `,
    p`Looping directly over a file object reads one line at a time, which works even for files far larger than your memory. Each line ends with «\n», so strip it with «.rstrip("\n")» or use «.read().splitlines()» for small files.`,
    code('Handling a missing file')`
      try:
          with open("missing.txt", encoding="utf-8") as f:
              print(f.read())
      except FileNotFoundError:
          print("missing.txt does not exist yet, starting with empty data")
    `,
    section('learn', 'CSV: comma-separated values'),
    p`**CSV** is the universal format for tables: every spreadsheet program can open and save it. Do not split lines on commas yourself, because values can contain commas inside quotes. Use the «csv» module.`,
    code('Writing and reading CSV')`
      import csv

      rows = [
          ["name", "programme", "gpa"],
          ["Ama Owusu", "Computer Science", 3.71],
          ["Kofi Mensah", "Law, Criminology", 3.20],     # value containing a comma
          ["Esi Boateng", "Medicine", 3.95],
      ]
      with open("students.csv", "w", newline="", encoding="utf-8") as f:
          csv.writer(f).writerows(rows)

      with open("students.csv", encoding="utf-8") as f:
          print(f.read())

      with open("students.csv", newline="", encoding="utf-8") as f:
          for record in csv.DictReader(f):       # each row becomes a dict
              print(record["name"], "|", record["programme"], "|", float(record["gpa"]))
    `,
    p`«csv.DictReader» uses the first row as keys, so you can write «record["gpa"]» instead of «record[2]». Note that **everything read from a CSV is a string**: convert numbers yourself. Pass «newline=""» when opening CSV files, as the csv documentation requires, so line endings are handled correctly on Windows.`,
    section('learn', 'JSON: structured data'),
    code('Saving and loading nested data')`
      import json

      data = {
          "student": "Ama Owusu",
          "courses": [
              {"code": "CSCD101", "mark": 88},
              {"code": "MATH121", "mark": 76},
          ],
          "graduated": False,
      }

      with open("record.json", "w", encoding="utf-8") as f:
          json.dump(data, f, indent=2)

      with open("record.json", encoding="utf-8") as f:
          loaded = json.load(f)

      print(open("record.json", encoding="utf-8").read())
      print(loaded["courses"][1]["mark"], loaded == data)

      text = json.dumps({"ok": True, "items": [1, 2]})     # to a string
      print(text, json.loads(text)["items"])
    `,
    p`**JSON** (JavaScript Object Notation) is the language of web APIs and configuration files. It maps directly to Python: objects ↔ «dict», arrays ↔ «list», strings, numbers, «true»/«false» ↔ «True»/«False», «null» ↔ «None». «dump»/«load» work with files; «dumps»/«loads» (with an s, for string) work with strings.`,
    note('deep', 'Going deeper · buffering, encodings and serialisation')`Writes go into a memory **buffer** first and are flushed to disk in chunks, which is why closing a file matters: unflushed data can be lost. Text files are bytes interpreted through an **encoding**; UTF-8 encodes every Unicode character in 1 to 4 bytes and is the standard on the web. Converting objects into a storable format is called **serialisation**. JSON is portable and human-readable but supports only basic types; tuples come back as lists and sets are not supported at all. On your computer, the modern way to handle paths is «pathlib.Path»: «Path("data") / "marks.csv"» works on Windows, macOS and Linux.`,
    quiz(
      { q: 'What happens with «open("data.txt", "w")» if the file has content?', o: ['Content is kept and new text appended', 'The file is emptied first', 'An error is raised', 'A copy is made'], a: 1, why: '«"w"» truncates. Use «"a"» to append.' },
      { q: 'Why use «with open(...) as f:»?', o: ['It is faster', 'The file is closed automatically, even on errors', 'It is required for reading', 'It encrypts the file'], a: 1, why: '«with» is a context manager (lesson 5.3) that guarantees cleanup.' },
      { q: 'What type is every value read by «csv.reader»?', o: ['Whatever was written', 'str', 'int or float', 'bytes'], a: 1, why: 'CSV has no types; convert numbers yourself.' },
      { q: 'What does «json.loads("[1, 2, null]")» return?', o: ['«[1, 2, null]»', '«[1, 2, None]»', '«"[1, 2, null]"»', 'An error'], a: 1, why: 'JSON null becomes Python None.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Count words in a file', level: 'easy',
      prompt: `The starter writes a file. Read it back and print the number of lines, words and characters (like the Unix «wc» command), in the format shown.`,
      starter: R`
        with open("poem.txt", "w", encoding="utf-8") as f:
            f.write("The sun rose over Accra\nand the city woke\nslowly, then all at once\n")
        `,
      expect: `Lines: 3, words: 14, characters: 67`,
      hints: ['Read everything with «f.read()».', 'Lines: «len(text.splitlines())»; words: «len(text.split())»; characters: «len(text)».'],
      solution: R`
        with open("poem.txt", "w", encoding="utf-8") as f:
            f.write("The sun rose over Accra\nand the city woke\nslowly, then all at once\n")

        with open("poem.txt", encoding="utf-8") as f:
            text = f.read()
        print(f"Lines: {len(text.splitlines())}, words: {len(text.split())}, characters: {len(text)}")`
    }),
    task({
      title: 'CSV to summary', level: 'medium',
      prompt: `The starter creates «sales.csv». Read it with «csv.DictReader» and print the total revenue (quantity × price) per product, in the order products first appear, with 2 decimals.`,
      starter: R`
        import csv
        with open("sales.csv", "w", newline="", encoding="utf-8") as f:
            f.write("product,quantity,price\npen,10,2.50\nbook,2,45.00\npen,4,2.50\nbag,1,120.00\nbook,1,45.00\n")
        `,
      expect: `
        pen: 35.00
        book: 135.00
        bag: 120.00`,
      hints: ['Use a dict with «.get(product, 0) + revenue».', 'Convert with «int(row["quantity"])» and «float(row["price"])».'],
      solution: R`
        import csv
        with open("sales.csv", "w", newline="", encoding="utf-8") as f:
            f.write("product,quantity,price\npen,10,2.50\nbook,2,45.00\npen,4,2.50\nbag,1,120.00\nbook,1,45.00\n")

        totals = {}
        with open("sales.csv", newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                revenue = int(row["quantity"]) * float(row["price"])
                totals[row["product"]] = totals.get(row["product"], 0) + revenue
        for product, total in totals.items():
            print(f"{product}: {total:.2f}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Persistent to-do manager',
      brief: `Build a to-do manager whose data survives between runs by saving to a JSON file. Each task has an id, a title, a due date (YYYY-MM-DD) and a done flag.`,
      reqs: ['«load_tasks(path)» returns the list from the JSON file, or an empty list if the file does not exist', '«save_tasks(path, tasks)» writes the list with «indent=2»', 'Commands: «add TITLE | YYYY-MM-DD», «done ID», «list», «export» (writes «tasks.csv»), «quit»', 'Validate the date with «datetime.strptime» and reject invalid ones', '«list» shows pending tasks sorted by due date, marking overdue ones (compared with a fixed "today" of 2026-10-27)', 'Save after every change; demonstrate persistence by loading the file again at the end and printing how many tasks it contains'],
      input: 'add Read chapter 4 | 2026-10-25\nadd Submit lab report | 2026-11-02\nadd Group meeting | 2026-13-01\nadd Revise for quiz | 2026-10-30\ndone 1\nlist\nexport\nquit',
      starter: R`
        import csv
        import json
        from datetime import datetime, date

        PATH = "tasks.json"
        TODAY = date(2026, 10, 27)
        `,
      solution: R`
        import csv
        import json
        from datetime import datetime, date

        PATH = "tasks.json"
        TODAY = date(2026, 10, 27)


        def load_tasks(path):
            try:
                with open(path, encoding="utf-8") as f:
                    return json.load(f)
            except FileNotFoundError:
                return []


        def save_tasks(path, tasks):
            with open(path, "w", encoding="utf-8") as f:
                json.dump(tasks, f, indent=2)


        def parse_date(text):
            return datetime.strptime(text.strip(), "%Y-%m-%d").date()


        def main():
            tasks = load_tasks(PATH)
            while True:
                line = input("> ").strip()
                cmd, _, rest = line.partition(" ")
                if cmd == "quit":
                    break
                elif cmd == "add":
                    title, _, due = rest.partition("|")
                    try:
                        parse_date(due)
                    except ValueError:
                        print(f"  Invalid date: {due.strip()!r} (use YYYY-MM-DD)")
                        continue
                    new_id = max((t["id"] for t in tasks), default=0) + 1
                    tasks.append({"id": new_id, "title": title.strip(), "due": due.strip(), "done": False})
                    save_tasks(PATH, tasks)
                    print(f"  Added #{new_id}")
                elif cmd == "done":
                    match = [t for t in tasks if str(t["id"]) == rest]
                    if not match:
                        print("  No such task")
                        continue
                    match[0]["done"] = True
                    save_tasks(PATH, tasks)
                    print(f"  Completed: {match[0]['title']}")
                elif cmd == "list":
                    pending = sorted((t for t in tasks if not t["done"]), key=lambda t: t["due"])
                    for t in pending:
                        flag = "OVERDUE" if parse_date(t["due"]) < TODAY else ""
                        print(f"  #{t['id']} {t['due']} {t['title']:<20} {flag}")
                elif cmd == "export":
                    with open("tasks.csv", "w", newline="", encoding="utf-8") as f:
                        writer = csv.writer(f)
                        writer.writerow(["id", "title", "due", "done"])
                        for t in tasks:
                            writer.writerow([t["id"], t["title"], t["due"], t["done"]])
                    print("  Exported to tasks.csv")
                else:
                    print("  Commands: add TITLE | DATE, done ID, list, export, quit")

            print("Saved file now holds", len(load_tasks(PATH)), "tasks")
            print(open("tasks.csv", encoding="utf-8").read())


        main()`,
      explain: `ISO dates (YYYY-MM-DD) sort correctly as plain strings, which is why «sorted(..., key=lambda t: t["due"])» works without parsing. «max(..., default=0)» handles the empty list when creating the first id. Saving after every change means a crash never loses more than the current command. Run the program on your computer twice: the second run starts with the tasks from the first.`
    })
  ]
});

/* ------------------------------------------------------------------ 3.8 */
lesson({
  id: 'project-3', level: 'L3', title: 'Level 3 project: expense tracker', minutes: 100,
  keywords: 'project expense tracker functions json csv modules review',
  goals: ['Design a program as a set of small, testable functions', 'Separate data, logic and user interface', 'Use files for persistence and the standard library for analysis', 'Review all of Level 3'],
  body: [
    section('review', 'Level 3 in one page'),
    table(['Concept', 'Key idea'], [
      ['Functions', '«def name(params):», «return» values, docstrings; print vs return'],
      ['Arguments', 'defaults, keyword args, «*args», «**kwargs», keyword-only «*»; avoid mutable defaults'],
      ['Scope', 'LEGB; avoid «global»; each call has its own frame on the call stack'],
      ['Recursion', 'base case + smaller recursive case; memoise overlapping subproblems'],
      ['Higher-order', 'functions are values; lambda; map/filter; closures'],
      ['Modules', '«import»; standard library; «if __name__ == "__main__":»'],
      ['Exceptions', '«try/except/else/finally»; «raise»; custom exception classes'],
      ['Files', '«with open(..., encoding="utf-8")»; csv; json']
    ]),
    section('build', 'Architecture: three layers'),
    p`Well-structured programs separate concerns:

    **Data layer**: loading and saving (here, a JSON file). **Logic layer**: pure functions that compute things from data and never print or ask for input. **Interface layer**: the menu that talks to the user.

    Pure logic functions are easy to test, and you could later swap the interface (menu → website → mobile app) without touching the logic. This separation is a first step toward software architecture patterns such as MVC (Model–View–Controller).`,
    code('Logic layer, tested in isolation')`
      from collections import defaultdict

      def total(expenses):
          return round(sum(e["amount"] for e in expenses), 2)

      def by_category(expenses):
          sums = defaultdict(float)
          for e in expenses:
              sums[e["category"]] += e["amount"]
          return dict(sorted(sums.items(), key=lambda kv: kv[1], reverse=True))

      def in_month(expenses, month):            # month like "2026-10"
          return [e for e in expenses if e["date"].startswith(month)]

      sample = [
          {"date": "2026-10-02", "category": "food", "amount": 45.5, "note": "groceries"},
          {"date": "2026-10-05", "category": "transport", "amount": 12.0, "note": "trotro"},
          {"date": "2026-10-09", "category": "food", "amount": 30.0, "note": "lunch"},
          {"date": "2026-11-01", "category": "books", "amount": 120.0, "note": "algorithms text"},
      ]
      assert total(sample) == 207.5
      assert by_category(in_month(sample, "2026-10")) == {"food": 75.5, "transport": 12.0}
      print("All logic tests passed")
      print(by_category(sample))
    `,
    p`«assert condition» does nothing when the condition is true and raises «AssertionError» when it is false. It is the simplest form of automated testing; lesson 5.7 builds on it.`,
    section('build', 'The complete program'),
    code('Expense tracker', { input: 'add 2026-10-02 food 45.50 groceries\nadd 2026-10-05 transport 12 trotro to campus\nadd 2026-10-09 food 30 lunch\nadd 2026-10-10 books abc textbook\nadd 2026-11-01 books 120 algorithms text\nsummary 2026-10\nbudget food 60\nsummary\nquit' })`
      import json
      from collections import defaultdict
      from datetime import datetime

      PATH = "expenses.json"

      # ---------- data layer ----------
      def load(path=PATH):
          try:
              with open(path, encoding="utf-8") as f:
                  return json.load(f)
          except FileNotFoundError:
              return {"expenses": [], "budgets": {}}

      def save(data, path=PATH):
          with open(path, "w", encoding="utf-8") as f:
              json.dump(data, f, indent=2)

      # ---------- logic layer ----------
      def make_expense(date_text, category, amount_text, note):
          datetime.strptime(date_text, "%Y-%m-%d")           # raises ValueError if invalid
          amount = float(amount_text)                         # raises ValueError if invalid
          if amount <= 0:
              raise ValueError("amount must be positive")
          return {"date": date_text, "category": category.lower(), "amount": amount, "note": note}

      def by_category(expenses):
          sums = defaultdict(float)
          for e in expenses:
              sums[e["category"]] += e["amount"]
          return dict(sorted(sums.items(), key=lambda kv: kv[1], reverse=True))

      def summary_lines(expenses, budgets):
          lines = []
          for cat, spent in by_category(expenses).items():
              limit = budgets.get(cat)
              status = "" if limit is None else ("  OVER BUDGET" if spent > limit else f"  ({limit - spent:.2f} left)")
              lines.append(f"{cat:<12}{spent:>9.2f}{status}")
          lines.append(f"{'TOTAL':<12}{sum(e['amount'] for e in expenses):>9.2f}")
          return lines

      # ---------- interface layer ----------
      def main():
          data = load()
          print("Commands: add DATE CATEGORY AMOUNT NOTE | summary [YYYY-MM] | budget CATEGORY LIMIT | quit")
          while True:
              parts = input("> ").split(maxsplit=4)
              if not parts:
                  continue
              cmd = parts[0]
              if cmd == "quit":
                  break
              try:
                  if cmd == "add" and len(parts) >= 4:
                      note = parts[4] if len(parts) == 5 else ""
                      data["expenses"].append(make_expense(parts[1], parts[2], parts[3], note))
                      save(data)
                      print("  saved")
                  elif cmd == "summary":
                      chosen = data["expenses"]
                      if len(parts) > 1:
                          chosen = [e for e in chosen if e["date"].startswith(parts[1])]
                      for line in summary_lines(chosen, data["budgets"]):
                          print("  " + line)
                  elif cmd == "budget" and len(parts) == 3:
                      data["budgets"][parts[1].lower()] = float(parts[2])
                      save(data)
                      print(f"  budget for {parts[1]} set to {float(parts[2]):.2f}")
                  else:
                      print("  unknown or incomplete command")
              except ValueError as e:
                  print(f"  error: {e}")

      if __name__ == "__main__":
          main()
    `,
    p`Trace the input: the line with amount «abc» is rejected by «float()» inside «make_expense», the «ValueError» propagates up to «main», which reports it and continues. The logic functions never print; the interface never calculates. «split(maxsplit=4)» splits at most 4 times, so the note can contain spaces.`,
    section('practice', 'Tasks'),
    task({
      title: 'Monthly totals', level: 'medium',
      prompt: `Add a logic function «monthly_totals(expenses)» that returns a dict «"YYYY-MM" → total», sorted by month. Test it with the sample data.`,
      starter: R`
        sample = [
            {"date": "2026-10-02", "category": "food", "amount": 45.5},
            {"date": "2026-11-05", "category": "transport", "amount": 12.0},
            {"date": "2026-10-09", "category": "food", "amount": 30.0},
            {"date": "2026-09-30", "category": "rent", "amount": 400.0},
        ]

        def monthly_totals(expenses):
            pass

        print(monthly_totals(sample))`,
      expect: `{'2026-09': 400.0, '2026-10': 75.5, '2026-11': 12.0}`,
      hints: ['The month is «e["date"][:7]».', 'Accumulate in a dict, then «dict(sorted(totals.items()))».'],
      solution: R`
        sample = [
            {"date": "2026-10-02", "category": "food", "amount": 45.5},
            {"date": "2026-11-05", "category": "transport", "amount": 12.0},
            {"date": "2026-10-09", "category": "food", "amount": 30.0},
            {"date": "2026-09-30", "category": "rent", "amount": 400.0},
        ]

        def monthly_totals(expenses):
            totals = {}
            for e in expenses:
                month = e["date"][:7]
                totals[month] = totals.get(month, 0) + e["amount"]
            return dict(sorted(totals.items()))

        print(monthly_totals(sample))`
    }),
    section('assignment', 'Level 3 project'),
    assignment({
      title: 'Quiz engine with question bank and high scores',
      brief: `Build a quiz program driven entirely by data files. Questions live in a CSV file; high scores live in a JSON file. The program must be split into data, logic and interface functions, handle every error gracefully, and include tests for its logic functions. This is your Level 3 capstone.`,
      reqs: ['Create «questions.csv» with columns «question,a,b,c,d,answer,topic» (at least 6 questions, 2+ topics), written by your program on first run if missing', '«load_questions(path, topic=None)» returns a list of dicts, optionally filtered by topic', '«grade(question, choice)» returns True/False, accepting upper or lower case letters', 'Ask questions in a random order (seeded for the demo); reject answers that are not a–d without counting them', 'Save the player\'s name and percentage to «scores.json», keep only the top 5, and print the leaderboard', 'Include at least three «assert» tests of your logic functions that run before the game starts'],
      input: 'Ama\nb\nx\nc\na\nd\nb\nc',
      starter: R`
        import csv
        import json
        import random
        `,
      solution: R`
        import csv
        import json
        import random

        QUESTIONS = "questions.csv"
        SCORES = "scores.json"
        FIELDS = ["question", "a", "b", "c", "d", "answer", "topic"]
        DEFAULT_BANK = [
            ["What does len('hello') return?", "4", "5", "6", "error", "b", "python"],
            ["Which type is immutable?", "list", "dict", "tuple", "set", "c", "python"],
            ["What is 7 // 2?", "3", "3.5", "4", "1", "a", "python"],
            ["Binary search runs in...", "O(n)", "O(n^2)", "O(1)", "O(log n)", "d", "algorithms"],
            ["Which structure is LIFO?", "queue", "stack", "tree", "graph", "b", "algorithms"],
            ["Average lookup in a hash table is...", "O(n)", "O(log n)", "O(1)", "O(n log n)", "c", "algorithms"],
        ]


        # ---------- data ----------
        def ensure_bank(path=QUESTIONS):
            try:
                open(path, encoding="utf-8").close()
            except FileNotFoundError:
                with open(path, "w", newline="", encoding="utf-8") as f:
                    writer = csv.writer(f)
                    writer.writerow(FIELDS)
                    writer.writerows(DEFAULT_BANK)


        def load_questions(path=QUESTIONS, topic=None):
            with open(path, newline="", encoding="utf-8") as f:
                rows = list(csv.DictReader(f))
            return [r for r in rows if topic is None or r["topic"] == topic]


        def load_scores(path=SCORES):
            try:
                with open(path, encoding="utf-8") as f:
                    return json.load(f)
            except FileNotFoundError:
                return []


        def save_score(name, percent, path=SCORES):
            scores = load_scores(path)
            scores.append({"name": name, "percent": percent})
            scores = sorted(scores, key=lambda s: s["percent"], reverse=True)[:5]
            with open(path, "w", encoding="utf-8") as f:
                json.dump(scores, f, indent=2)
            return scores


        # ---------- logic ----------
        def grade(question, choice):
            return choice.strip().lower() == question["answer"]


        def percentage(correct, total):
            return round(100 * correct / total, 1) if total else 0.0


        def run_tests():
            q = {"answer": "b"}
            assert grade(q, "B") and grade(q, " b ") and not grade(q, "a")
            assert percentage(3, 4) == 75.0 and percentage(0, 0) == 0.0
            ensure_bank()
            assert len(load_questions(topic="algorithms")) == 3
            print("Self-tests passed.\n")


        # ---------- interface ----------
        def ask(question):
            print(question["question"])
            for letter in "abcd":
                print(f"   {letter}) {question[letter]}")
            while True:
                choice = input("Your answer: ").strip().lower()
                if choice in ("a", "b", "c", "d"):
                    return choice
                print("   Please answer a, b, c or d.")


        def main():
            run_tests()
            random.seed(3)
            name = input("Your name: ").strip() or "Anonymous"
            questions = load_questions()
            random.shuffle(questions)
            correct = 0
            for i, q in enumerate(questions, start=1):
                print(f"\nQ{i}/{len(questions)}")
                if grade(q, ask(q)):
                    correct += 1
                    print("   Correct!")
                else:
                    print(f"   Wrong, the answer was {q['answer']}) {q[q['answer']]}")
            pct = percentage(correct, len(questions))
            print(f"\n{name}: {correct}/{len(questions)} = {pct}%")
            print("Leaderboard:")
            for rank, s in enumerate(save_score(name, pct), start=1):
                print(f"  {rank}. {s['name']:<10} {s['percent']}%")


        if __name__ == "__main__":
            main()`,
      explain: `The question bank is **data**, not code: adding a question means editing a CSV file, with no programming required. «run_tests» runs automatically before every game, so a broken change is noticed immediately. Because «random.seed(3)» fixes the order, the demo is repeatable; remove it for real play. Notice how short each function is: when a function needs a comment to explain *what* it does, it is often time to split it.`
    })
  ]
});
