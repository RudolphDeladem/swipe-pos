/* Level 5: Advanced Python */
level({
  id: 'L5', num: 5, title: 'Advanced Python', tag: 'Advanced',
  blurb: 'The features that separate scripts from professional code: generators, decorators, context managers, type hints, regular expressions, tooling and testing.',
  outcomes: ['Write iterators and memory-efficient generators', 'Create and apply decorators', 'Manage resources with context managers', 'Annotate code with type hints and check them', 'Search and validate text with regular expressions', 'Set up virtual environments, install packages and structure a project', 'Write automated tests with «unittest» and «pytest»']
});

/* ------------------------------------------------------------------ 5.1 */
lesson({
  id: 'generators', level: 'L5', title: 'Iterators and generators', minutes: 60,
  keywords: 'iterator iterable generator yield next lazy pipeline itertools',
  goals: ['Explain the iterator protocol («__iter__», «__next__», «StopIteration»)', 'Write generator functions with «yield»', 'Build lazy data pipelines', 'Use generator expressions and «itertools» for infinite and large sequences'],
  body: [
    section('learn', 'What a for loop really does'),
    p`An **iterable** is anything you can loop over (a list, a string, a file, a dict). An **iterator** is the object that produces the items one at a time. A «for» loop calls «iter()» on the iterable to get an iterator, then calls «next()» repeatedly until the iterator raises «StopIteration».`,
    code('The iterator protocol by hand')`
      courses = ["Calculus", "Python", "Physics"]
      it = iter(courses)
      print(next(it))
      print(next(it))
      print(next(it))
      try:
          next(it)
      except StopIteration:
          print("StopIteration: the loop ends here")

      # this is what   for c in courses: print(c)   does:
      it = iter(courses)
      while True:
          try:
              c = next(it)
          except StopIteration:
              break
          print(" ", c)
    `,
    code('A class-based iterator')`
      class Countdown:
          def __init__(self, start):
              self.current = start

          def __iter__(self):
              return self

          def __next__(self):
              if self.current <= 0:
                  raise StopIteration
              value = self.current
              self.current -= 1
              return value

      for n in Countdown(5):
          print(n, end=" ")
      print()
    `,
    section('learn', 'Generators: iterators the easy way'),
    code('yield')`
      def countdown(start):
          while start > 0:
              yield start          # hand out a value and PAUSE here
              start -= 1

      gen = countdown(3)
      print(gen)
      print(next(gen), next(gen), next(gen))
      print(list(countdown(5)))

      def fibonacci():
          a, b = 0, 1
          while True:              # infinite, but lazy: only computes what is asked for
              yield a
              a, b = b, a + b

      for i, f in zip(range(10), fibonacci()):
          print(f, end=" ")
      print()
    `,
    p`A function containing «yield» is a **generator function**. Calling it does not run the body; it returns a **generator** object. Each «next()» runs the body until the next «yield», hands out that value and **pauses**, keeping all local variables. When the function ends, «StopIteration» is raised automatically. Twenty lines of iterator class become five lines.`,
    section('learn', 'Why lazy evaluation matters'),
    code('Memory: list vs generator', { run: false, out: 'list bytes: 800984\ngenerator bytes: 200\n333328333350000' })`
      import sys

      squares_list = [n * n for n in range(100_000)]
      squares_gen = (n * n for n in range(100_000))
      print("list bytes:", sys.getsizeof(squares_list))
      print("generator bytes:", sys.getsizeof(squares_gen))
      print(sum(squares_gen))
    `,
    code('Lazy: work happens only when a value is requested')`
      def noisy_squares(n):
          for i in range(n):
              print(f"  computing {i}^2")
              yield i * i

      gen = noisy_squares(1_000_000)      # nothing computed yet
      print("generator created")
      print("first:", next(gen))
      print("second:", next(gen))         # only 2 of a million values were computed

      # a generator can only be consumed once
      g = (x for x in range(3))
      print(list(g), list(g))
    `,
    p`A list stores every element at once. A generator stores only its current state, so it uses the same small amount of memory whether it produces ten items or ten billion. The trade-off: a generator can be consumed only once and has no length or indexing.`,
    section('learn', 'Pipelines'),
    code('Chaining generators like an assembly line')`
      log = """2026-10-27 09:01 INFO  login ama
      2026-10-27 09:03 ERROR db timeout
      2026-10-27 09:04 INFO  login kofi
      2026-10-27 09:07 ERROR disk full
      2026-10-27 09:09 WARN  slow query
      2026-10-27 09:12 ERROR db timeout"""

      def read_lines(text):
          for line in text.splitlines():
              yield line.strip()

      def only(level, lines):
          for line in lines:
              if line.split()[2] == level:
                  yield line

      def messages(lines):
          for line in lines:
              yield " ".join(line.split()[3:])

      pipeline = messages(only("ERROR", read_lines(log)))
      for msg in pipeline:
          print(msg)

      from collections import Counter
      print(Counter(messages(only("ERROR", read_lines(log)))).most_common(1))
    `,
    p`Each stage pulls one item at a time from the previous stage. Nothing is read or processed until the final loop asks for it, and no intermediate lists are built. With «read_lines» replaced by a function that reads a real file line by line, the same pipeline could process a 50 GB log file using a few kilobytes of memory.`,
    code('yield from and itertools')`
      from itertools import count, islice, takewhile, chain, cycle

      def flatten(nested):
          for item in nested:
              if isinstance(item, list):
                  yield from flatten(item)     # delegate to a sub-generator
              else:
                  yield item

      print(list(flatten([1, [2, [3, 4]], 5])))
      print(list(islice(count(10, 5), 4)))              # first 4 of an infinite sequence
      print(list(takewhile(lambda x: x < 40, (n * n for n in count(1)))))
      print(list(chain("ab", [1, 2])))
      print(list(islice(cycle(["Mon", "Tue", "Wed"]), 7)))
    `,
    note('deep', 'Going deeper · coroutines')`Generators are a form of **coroutine**: functions that can suspend and resume. «value = yield x» can even *receive* values sent with «gen.send(v)». This idea of suspendable functions evolved into Python's «async»/«await» syntax, which lets one thread handle thousands of network connections concurrently by suspending each task while it waits for data. If you study operating systems or web servers, you will meet the same concept as cooperative multitasking.`,
    quiz(
      { q: 'What does calling a generator function return?', o: ['The first yielded value', 'A list', 'A generator object; the body has not run yet', '«None»'], a: 2, why: 'The body runs only when «next()» is called.' },
      { q: 'What happens when a generator function finishes?', o: ['It returns None to the loop', 'It raises «StopIteration»', 'It restarts', 'It raises «GeneratorExit»'], a: 1, why: 'That is how a for loop knows to stop.' },
      { q: 'What does «list(g), list(g)» print for «g = (x for x in [1, 2])»?', o: ['«[1, 2] [1, 2]»', '«[1, 2] []»', '«[] []»', 'An error'], a: 1, why: 'Generators are exhausted after one pass.' },
      { q: 'Main advantage of a generator pipeline over lists?', o: ['It is always faster', 'It uses constant memory and processes items lazily', 'It can be indexed', 'It sorts automatically'], a: 1, why: 'Items flow through one at a time.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Even numbers generator', level: 'easy',
      prompt: `Write a generator «evens(limit)» that yields even numbers from 0 up to and including «limit».`,
      starter: R`
        def evens(limit):
            pass

        print(list(evens(10)))
        print(sum(evens(100)))`,
      expect: `
        [0, 2, 4, 6, 8, 10]
        2550`,
      hints: ['Loop with «range(0, limit + 1, 2)» and «yield» each value.'],
      solution: R`
        def evens(limit):
            for n in range(0, limit + 1, 2):
                yield n

        print(list(evens(10)))
        print(sum(evens(100)))`
    }),
    task({
      title: 'Primes forever', level: 'medium',
      prompt: `Write an infinite generator «primes()» and use «itertools.islice» to print the first 15 primes, and «next» with a generator expression to find the first prime above 1000.`,
      starter: R`
        from itertools import islice

        def primes():
            pass

        print(list(islice(primes(), 15)))
        print(next(p for p in primes() if p > 1000))`,
      expect: `
        [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
        1009`,
      hints: ['Start «n = 2» and loop forever; yield «n» when no prime found so far divides it.', 'Keep a list of found primes and only test divisors «p» with «p * p <= n».'],
      solution: R`
        from itertools import islice

        def primes():
            found = []
            n = 2
            while True:
                if all(n % p for p in found if p * p <= n):
                    found.append(n)
                    yield n
                n += 1

        print(list(islice(primes(), 15)))
        print(next(p for p in primes() if p > 1000))`,
      explain: `«all(n % p for p ...)» is true when no remainder is zero. The inner generator is filtered by «p * p <= n», but note it still scans the whole «found» list each time; a «break» once «p * p > n» would be faster. For large ranges the Sieve of Eratosthenes is the classic efficient algorithm.`
    }),
    task({
      title: 'Sliding window', level: 'hard',
      prompt: `Write a generator «windows(seq, size)» that yields tuples of each consecutive window. Then use it to compute the 3-day moving average of the temperatures, rounded to 1 decimal.`,
      starter: R`
        def windows(seq, size):
            pass

        temps = [30, 32, 31, 35, 36, 33, 29]
        print(list(windows("abcd", 2)))
        print([round(sum(w) / 3, 1) for w in windows(temps, 3)])`,
      expect: `
        [('a', 'b'), ('b', 'c'), ('c', 'd')]
        [31.0, 32.7, 34.0, 34.7, 32.7]`,
      hints: ['Loop «for i in range(len(seq) - size + 1):» and yield «tuple(seq[i:i + size])».'],
      solution: R`
        def windows(seq, size):
            for i in range(len(seq) - size + 1):
                yield tuple(seq[i:i + size])

        temps = [30, 32, 31, 35, 36, 33, 29]
        print(list(windows("abcd", 2)))
        print([round(sum(w) / 3, 1) for w in windows(temps, 3)])`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Streaming sales analytics',
      brief: `Build a generator pipeline that processes sales records as a stream, the way real data-engineering jobs handle files too big for memory. The data is provided as CSV text here; on your computer, replace the first stage with a function that reads a real file line by line.`,
      reqs: ['«parse(lines)»: skips the header and blank lines, yields dicts with typed fields (date, region, product, qty as int, price as float)', '«valid(records)»: yields only records with qty > 0 and price > 0; counts rejected ones in a mutable counter passed in', '«with_revenue(records)»: yields records with an added «revenue» field', '«running_total(records)»: yields «(record, cumulative_revenue)» pairs', 'Consume the pipeline once to compute revenue per region (dict) and the date on which cumulative revenue first exceeded 1000', 'Print how many records were rejected'],
      starter: R`
        DATA = """date,region,product,qty,price
        2026-10-01,Accra,laptop,1,650.00
        2026-10-01,Kumasi,mouse,4,25.50
        2026-10-02,Accra,phone,0,300.00
        2026-10-02,Tamale,laptop,1,640.00

        2026-10-03,Kumasi,charger,3,-10.00
        2026-10-03,Accra,mouse,2,25.50
        2026-10-04,Tamale,phone,1,320.00"""
        `,
      solution: R`
        DATA = """date,region,product,qty,price
        2026-10-01,Accra,laptop,1,650.00
        2026-10-01,Kumasi,mouse,4,25.50
        2026-10-02,Accra,phone,0,300.00
        2026-10-02,Tamale,laptop,1,640.00

        2026-10-03,Kumasi,charger,3,-10.00
        2026-10-03,Accra,mouse,2,25.50
        2026-10-04,Tamale,phone,1,320.00"""


        def parse(lines):
            lines = iter(lines)
            header = next(lines).strip().split(",")
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                row = dict(zip(header, line.split(",")))
                row["qty"] = int(row["qty"])
                row["price"] = float(row["price"])
                yield row


        def valid(records, stats):
            for r in records:
                if r["qty"] > 0 and r["price"] > 0:
                    yield r
                else:
                    stats["rejected"] += 1


        def with_revenue(records):
            for r in records:
                yield {**r, "revenue": r["qty"] * r["price"]}


        def running_total(records):
            total = 0.0
            for r in records:
                total += r["revenue"]
                yield r, total


        stats = {"rejected": 0}
        pipeline = running_total(with_revenue(valid(parse(DATA.splitlines()), stats)))

        by_region = {}
        crossed = None
        for record, cumulative in pipeline:
            by_region[record["region"]] = by_region.get(record["region"], 0) + record["revenue"]
            if crossed is None and cumulative > 1000:
                crossed = record["date"]

        print("Revenue by region:", {k: round(v, 2) for k, v in by_region.items()})
        print("Cumulative revenue passed 1000 on:", crossed)
        print("Rejected records:", stats["rejected"])`,
      explain: `«{**r, "revenue": ...}» builds a new dictionary from the old one plus a new key, leaving the input untouched. The «stats» dictionary is passed into the generator so it can report rejections without breaking the stream; a plain integer could not be updated from inside the generator. Every stage handles one record at a time, so memory use stays constant no matter how many rows the source has.`
    })
  ]
});

/* ------------------------------------------------------------------ 5.2 */
lesson({
  id: 'decorators', level: 'L5', title: 'Decorators', minutes: 55,
  keywords: 'decorator wrapper functools wraps timing caching logging arguments',
  goals: ['Explain a decorator as a function that wraps a function', 'Write decorators with «*args, **kwargs» and «functools.wraps»', 'Write decorators that take arguments', 'Recognise built-in decorators in real code'],
  body: [
    section('learn', 'Functions that wrap functions'),
    p`You have used decorators already: «@property», «@classmethod», «@dataclass», «@lru_cache». A **decorator** is a function that takes a function and returns a new function (usually one that adds behaviour before and/or after calling the original). It relies on two ideas from lesson 3.4: functions are objects, and closures remember their enclosing variables.`,
    code('Building a decorator step by step')`
      def shout(func):
          def wrapper():
              result = func()
              return result.upper() + "!"
          return wrapper

      def greet():
          return "hello"

      loud_greet = shout(greet)      # manual decoration
      print(loud_greet())

      @shout                         # same thing: greet2 = shout(greet2)
      def greet2():
          return "good morning"

      print(greet2())
    `,
    p`«@shout» above a definition is just shorthand for «greet2 = shout(greet2)». After decoration, the name «greet2» refers to «wrapper», which calls the original function and modifies the result.`,
    section('learn', 'A reusable, well-behaved decorator'),
    code('*args, **kwargs and functools.wraps')`
      import functools

      def log_calls(func):
          @functools.wraps(func)                   # copy name, docstring, etc.
          def wrapper(*args, **kwargs):
              arguments = ", ".join([repr(a) for a in args] + [f"{k}={v!r}" for k, v in kwargs.items()])
              print(f"-> {func.__name__}({arguments})")
              result = func(*args, **kwargs)
              print(f"<- {func.__name__} returned {result!r}")
              return result
          return wrapper

      @log_calls
      def add(a, b):
          """Add two numbers."""
          return a + b

      @log_calls
      def greet(name, punctuation="."):
          return f"Hello {name}{punctuation}"

      add(2, 3)
      greet("Ama", punctuation="!")
      print(add.__name__, "-", add.__doc__)
    `,
    p`«*args, **kwargs» lets the wrapper accept any arguments and pass them through unchanged, so one decorator works for every function. «@functools.wraps(func)» copies the original's name and docstring onto the wrapper; without it, every decorated function would be called «wrapper» in tracebacks and «help()».`,
    section('learn', 'Practical decorators'),
    code('Timing, counting and validation')`
      import functools
      import time

      def timer(func):
          @functools.wraps(func)
          def wrapper(*args, **kwargs):
              start = time.perf_counter()
              result = func(*args, **kwargs)
              elapsed = time.perf_counter() - start
              print(f"{func.__name__} took {elapsed * 1000:.1f} ms")
              return result
          return wrapper

      def count_calls(func):
          @functools.wraps(func)
          def wrapper(*args, **kwargs):
              wrapper.calls += 1
              return func(*args, **kwargs)
          wrapper.calls = 0                     # functions can have attributes
          return wrapper

      @timer
      def slow_sum(n):
          return sum(i * i for i in range(n))

      @count_calls
      def fib(n):
          return n if n < 2 else fib(n - 1) + fib(n - 2)

      slow_sum(200_000)
      fib(15)
      print("fib was called", fib.calls, "times")
    `,
    section('learn', 'Decorators with arguments'),
    code('A decorator factory')`
      import functools

      def retry(times):
          """Return a decorator that retries a function up to 'times' times."""
          def decorator(func):
              @functools.wraps(func)
              def wrapper(*args, **kwargs):
                  for attempt in range(1, times + 1):
                      try:
                          return func(*args, **kwargs)
                      except ConnectionError as e:
                          print(f"  attempt {attempt} failed: {e}")
                  raise ConnectionError(f"gave up after {times} attempts")
              return wrapper
          return decorator

      responses = iter([ConnectionError("timeout"), ConnectionError("reset"), "200 OK"])

      @retry(times=3)
      def fetch():
          r = next(responses)
          if isinstance(r, Exception):
              raise r
          return r

      print(fetch())
    `,
    p`«@retry(times=3)» first *calls* «retry(3)», which returns the real decorator, which is then applied to «fetch». That gives three nested functions: the factory (takes the settings), the decorator (takes the function), and the wrapper (takes the call's arguments).`,
    note('deep', 'Going deeper · aspect-oriented ideas')`Logging, timing, caching, retrying, access control and input validation are **cross-cutting concerns**: they apply to many functions but are not part of any function's main job. Decorators keep them separate from business logic. Web frameworks use them heavily: in Flask, «@app.route("/students")» registers a function as the handler for a URL; in FastAPI, «@app.get(...)» does the same; «@login_required» protects pages in Django. Decorators can also be applied to classes («@dataclass» is one).`,
    quiz(
      { q: '«@deco» above «def f():» is equivalent to…', o: ['«deco = f(deco)»', '«f = deco(f)»', '«f = deco»', '«deco(f())»'], a: 1, why: 'The decorator receives the function and its return value replaces it.' },
      { q: 'Why use «functools.wraps»?', o: ['It makes the function faster', 'It preserves the original function\'s name and docstring', 'It is required syntax', 'It adds caching'], a: 1, why: 'Otherwise the decorated function looks like «wrapper».' },
      { q: 'Why does a wrapper usually take «*args, **kwargs»?', o: ['To accept and forward any arguments', 'To make it a generator', 'Because Python requires it', 'To avoid returning'], a: 0, why: 'This makes the decorator work with any function signature.' },
      { q: 'How many levels of nested functions does a decorator with arguments need?', o: ['1', '2', '3', '4'], a: 2, why: 'Factory → decorator → wrapper.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Uppercase result decorator', level: 'easy',
      prompt: `Write a decorator «uppercase» that converts the string returned by any function to upper case, keeping the original function's name.`,
      starter: R`
        import functools

        def uppercase(func):
            pass

        @uppercase
        def greet(name):
            return f"hello {name}"

        print(greet("ama"))
        print(greet.__name__)`,
      expect: `
        HELLO AMA
        greet`,
      hints: ['Use the standard template with «@functools.wraps(func)» and «def wrapper(*args, **kwargs):».'],
      solution: R`
        import functools

        def uppercase(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                return func(*args, **kwargs).upper()
            return wrapper

        @uppercase
        def greet(name):
            return f"hello {name}"

        print(greet("ama"))
        print(greet.__name__)`
    }),
    task({
      title: 'Validate positive arguments', level: 'medium',
      prompt: `Write a decorator «positive» that raises «ValueError("all arguments must be positive")» if any positional argument is a number less than or equal to zero.`,
      starter: R`
        import functools

        def positive(func):
            pass

        @positive
        def rectangle_area(w, h):
            return w * h

        print(rectangle_area(3, 4))
        try:
            rectangle_area(3, -1)
        except ValueError as e:
            print(e)`,
      expect: `
        12
        all arguments must be positive`,
      hints: ['In the wrapper: «if any(a <= 0 for a in args if isinstance(a, (int, float))): raise ...».'],
      solution: R`
        import functools

        def positive(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                if any(a <= 0 for a in args if isinstance(a, (int, float))):
                    raise ValueError("all arguments must be positive")
                return func(*args, **kwargs)
            return wrapper

        @positive
        def rectangle_area(w, h):
            return w * h

        print(rectangle_area(3, 4))
        try:
            rectangle_area(3, -1)
        except ValueError as e:
            print(e)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Build your own memoize and access control',
      brief: `Implement two decorators used in real systems: a cache (like «functools.lru_cache») and a role-based access check (like web frameworks provide).`,
      reqs: ['«memoize»: stores results in a dict keyed by the positional arguments; exposes «cache_hits» and «cache_misses» counters as function attributes, and a «clear_cache()» function attribute', 'Apply it to a recursive «ways(n)» that counts the ways to climb n stairs taking 1 or 2 steps; show the hit/miss counts for «ways(30)»', '«requires(role)»: a decorator factory; the decorated function\'s first argument is a «user» dict with a «"roles"» set; raise «PermissionError» if the role is missing', 'Protect «view_grades(user, student)» with «student» or «lecturer» roles (accept either), and «change_grade(user, student, grade)» with «lecturer»', 'Demonstrate allowed and refused calls'],
      starter: R`
        import functools
        `,
      solution: R`
        import functools


        def memoize(func):
            cache = {}

            @functools.wraps(func)
            def wrapper(*args):
                if args in cache:
                    wrapper.cache_hits += 1
                else:
                    wrapper.cache_misses += 1
                    cache[args] = func(*args)
                return cache[args]

            def clear_cache():
                cache.clear()
                wrapper.cache_hits = wrapper.cache_misses = 0

            wrapper.cache_hits = 0
            wrapper.cache_misses = 0
            wrapper.clear_cache = clear_cache
            return wrapper


        @memoize
        def ways(n):
            """Ways to climb n stairs taking 1 or 2 steps at a time."""
            if n <= 1:
                return 1
            return ways(n - 1) + ways(n - 2)


        print("ways(30) =", ways(30))
        print("hits:", ways.cache_hits, "misses:", ways.cache_misses)
        ways.clear_cache()
        print("after clear:", ways.cache_hits, ways.cache_misses)


        def requires(*roles):
            def decorator(func):
                @functools.wraps(func)
                def wrapper(user, *args, **kwargs):
                    if not user["roles"] & set(roles):
                        raise PermissionError(f"{user['name']} needs one of {sorted(roles)} to call {func.__name__}")
                    return func(user, *args, **kwargs)
                return wrapper
            return decorator


        grades = {"ama": "B+"}


        @requires("student", "lecturer")
        def view_grades(user, student):
            return f"{student}: {grades[student]}"


        @requires("lecturer")
        def change_grade(user, student, grade):
            grades[student] = grade
            return f"{student} -> {grade}"


        ama = {"name": "Ama", "roles": {"student"}}
        dr_boateng = {"name": "Dr Boateng", "roles": {"lecturer"}}
        visitor = {"name": "Visitor", "roles": set()}

        calls = [lambda: view_grades(ama, "ama"), lambda: change_grade(ama, "ama", "A"),
                 lambda: change_grade(dr_boateng, "ama", "A"), lambda: view_grades(visitor, "ama")]
        for call in calls:
            try:
                print("OK:", call())
            except PermissionError as e:
                print("Denied:", e)`,
      explain: `The cache dictionary lives in the closure, private to each decorated function. Without memoisation «ways(30)» would make about 2.7 million calls; with it there are only 31 misses. «ways» counts the same thing as Fibonacci numbers, a nice example of one recurrence modelling different problems. «user["roles"] & set(roles)» is a set intersection: an empty result (falsy) means no required role is present.`
    })
  ]
});

/* ------------------------------------------------------------------ 5.3 */
lesson({
  id: 'context-managers', level: 'L5', title: 'Context managers', minutes: 40,
  keywords: 'context manager with enter exit contextmanager resource cleanup suppress',
  goals: ['Explain what «with» guarantees', 'Write context managers as classes («__enter__», «__exit__»)', 'Write them as generators with «@contextmanager»', 'Use standard ones such as «suppress» and «redirect_stdout»'],
  body: [
    section('learn', 'Setup and guaranteed cleanup'),
    p`Many tasks have the shape "acquire a resource, use it, release it": open/close a file, connect/disconnect a database, lock/unlock, start/stop a timer. Forgetting the release step, or skipping it because an exception happened, causes leaks and corrupted data. The «with» statement guarantees the release runs, whatever happens inside the block.`,
    code('A class-based context manager')`
      class Timer:
          def __enter__(self):
              import time
              self._time = time
              self.start = time.perf_counter()
              print("timer started")
              return self                     # bound to the name after 'as'

          def __exit__(self, exc_type, exc_value, traceback):
              self.elapsed = self._time.perf_counter() - self.start
              print(f"timer stopped ({'error: ' + exc_type.__name__ if exc_type else 'no error'})")
              return False                    # False: do not swallow exceptions

      with Timer() as t:
          total = sum(range(100_000))
      print("total", total, "elapsed is a float:", isinstance(t.elapsed, float))

      try:
          with Timer():
              1 / 0
      except ZeroDivisionError:
          print("the exception still reached us, and the timer was stopped first")
    `,
    p`«with X() as v:» calls «X().__enter__()» and binds the result to «v». When the block ends, normally or because of an exception, Python calls «__exit__» with the exception details (or three «None»s). If «__exit__» returns «True», the exception is suppressed; usually you return «False» and let it propagate.`,
    section('learn', 'The easy way: @contextmanager'),
    code('Generator-based context managers')`
      from contextlib import contextmanager

      @contextmanager
      def tag(name):
          print(f"<{name}>")
          try:
              yield                     # the with-block runs here
          finally:
              print(f"</{name}>")

      with tag("ul"):
          for item in ["Python", "SQL"]:
              with tag("li"):
                  print("  " + item)

      @contextmanager
      def temporary_setting(settings, key, value):
          old = settings[key]
          settings[key] = value
          try:
              yield settings
          finally:
              settings[key] = old       # always restored

      config = {"debug": False, "theme": "light"}
      with temporary_setting(config, "debug", True):
          print("inside:", config)
      print("after:", config)
    `,
    p`Code before «yield» is the setup, code after is the cleanup. The «try/finally» around «yield» makes sure cleanup runs even if the block raises.`,
    section('learn', 'Useful standard context managers'),
    code('suppress and redirect_stdout')`
      from contextlib import suppress, redirect_stdout
      import io

      data = {"a": 1}
      with suppress(KeyError):
          del data["missing"]           # ignored on purpose
      print("still running")

      buffer = io.StringIO()
      with redirect_stdout(buffer):
          print("captured, not shown")
      print("captured text:", buffer.getvalue().strip())
    `,
    note('deep', 'Going deeper · RAII and transactions')`The pattern of tying a resource's lifetime to a scope is called **RAII** (Resource Acquisition Is Initialisation) in C++. Database libraries use context managers for **transactions**: «with connection:» commits if the block succeeds and rolls back if it raises, so the database never ends up half-updated. Locks in concurrent programs («with lock:») use it to guarantee that a lock is always released, which prevents deadlocks caused by forgotten unlocks.`,
    quiz(
      { q: 'When does «__exit__» run?', o: ['Only if no exception occurred', 'Only if an exception occurred', 'Always, when the with-block ends', 'Never automatically'], a: 2, why: 'That guarantee is the whole point of «with».' },
      { q: 'What does returning «True» from «__exit__» do?', o: ['Re-raises the exception', 'Suppresses the exception', 'Restarts the block', 'Nothing'], a: 1, why: 'Return False (or None) to let exceptions propagate.' },
      { q: 'In a «@contextmanager» generator, where does the with-block run?', o: ['Before the function', 'At the «yield»', 'After return', 'In a separate thread'], a: 1, why: 'Setup before, cleanup after the yield.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Indented printing', level: 'medium',
      prompt: `Write a context manager «indent()» using «@contextmanager» and a module-level «level» counter, plus a function «say(text)» that prints text indented by 2 spaces per level. Nested «with indent():» blocks should increase the indentation.`,
      starter: R`
        from contextlib import contextmanager
        level = 0

        def say(text):
            print("  " * level + text)

        # write indent() here

        say("Course")
        with indent():
            say("Level 1")
            with indent():
                say("Variables")
                say("Loops")
            say("Level 2")
        say("End")`,
      expect: `
        Course
          Level 1
            Variables
            Loops
          Level 2
        End`,
      hints: ['Use «global level», increase it before «yield» and decrease it in a «finally» after.'],
      solution: R`
        from contextlib import contextmanager
        level = 0

        def say(text):
            print("  " * level + text)

        @contextmanager
        def indent():
            global level
            level += 1
            try:
                yield
            finally:
                level -= 1

        say("Course")
        with indent():
            say("Level 1")
            with indent():
                say("Variables")
                say("Loops")
            say("Level 2")
        say("End")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'A transactional in-memory database',
      brief: `Implement a tiny key-value store with **transactions**: changes made inside «with db.transaction():» are applied only if the block finishes without an exception; otherwise every change is rolled back.`,
      reqs: ['«Store» class with «set(key, value)», «get(key, default=None)», «delete(key)» and «__repr__»', '«transaction()» implemented with «@contextmanager»: take a snapshot (copy) before «yield», restore it if an exception happens, then re-raise', 'Nested transactions should work (an inner failure must not undo the outer transaction\'s earlier successful changes unless it propagates)', 'Keep a log of «COMMIT» / «ROLLBACK» events', 'Demonstrate a successful transfer of credits between two students and a failed one that rolls back'],
      starter: R`
        from contextlib import contextmanager
        import copy

        class Store:
            def __init__(self):
                self._data = {}
                self.log = []
        `,
      solution: R`
        from contextlib import contextmanager
        import copy


        class Store:
            def __init__(self):
                self._data = {}
                self.log = []

            def set(self, key, value):
                self._data[key] = value

            def get(self, key, default=None):
                return self._data.get(key, default)

            def delete(self, key):
                del self._data[key]

            @contextmanager
            def transaction(self):
                snapshot = copy.deepcopy(self._data)
                try:
                    yield self
                except Exception:
                    self._data = snapshot
                    self.log.append("ROLLBACK")
                    raise
                else:
                    self.log.append("COMMIT")

            def __repr__(self):
                return f"Store({self._data})"


        def transfer(db, src, dst, amount):
            with db.transaction():
                db.set(src, db.get(src) - amount)
                if db.get(src) < 0:
                    raise ValueError(f"{src} would go negative")
                db.set(dst, db.get(dst) + amount)


        db = Store()
        db.set("ama_credits", 10)
        db.set("kofi_credits", 4)

        transfer(db, "ama_credits", "kofi_credits", 3)
        print("after transfer 1:", db)
        try:
            transfer(db, "kofi_credits", "ama_credits", 50)
        except ValueError as e:
            print("failed:", e)
        print("after transfer 2:", db)

        with db.transaction():
            db.set("esi_credits", 6)
            try:
                with db.transaction():
                    db.set("esi_credits", 999)
                    raise RuntimeError("inner problem")
            except RuntimeError:
                pass
        print("nested:", db)
        print("log:", db.log)`,
      explain: `A deep copy is needed because values could be mutable (lists, dicts); a shallow copy would share them with the live data. In the nested demo, the inner transaction rolls back to its own snapshot (esi = 6) and the outer one still commits because the inner exception was caught. Real databases implement the same behaviour with savepoints, and the guarantee "all or nothing" is the A (atomicity) in **ACID**, which you will study in database courses.`
    })
  ]
});

/* ------------------------------------------------------------------ 5.4 */
lesson({
  id: 'type-hints', level: 'L5', title: 'Type hints', minutes: 40,
  keywords: 'type hints annotations mypy typing optional union list dict callable protocol typeddict',
  goals: ['Annotate variables, parameters and return values', 'Use generic types such as «list[int]» and «dict[str, float]»', 'Express optional values, unions and callables', 'Run a static type checker (mypy) and read its errors'],
  body: [
    section('learn', 'Annotations document and check intent'),
    p`Python is dynamically typed, so a function like «def total(prices):» says nothing about what «prices» should be. **Type hints** add that information. Python itself **ignores them at run time**, but editors use them for autocompletion and error highlighting, and static checkers such as **mypy** or **pyright** analyse your whole program for type errors before you run it. In large codebases this catches whole classes of bugs.`,
    code('Basic annotations')`
      def total(prices: list[float], discount: float = 0.0) -> float:
          return sum(prices) * (1 - discount)

      name: str = "Ama"
      credits: int = 96
      scores: dict[str, int] = {"math": 78, "python": 91}
      point: tuple[float, float] = (5.6, -0.2)
      tags: set[str] = {"cs", "year2"}

      print(total([10.0, 20.0], 0.1))
      print(total.__annotations__)
      print(total((5, 5)))          # a tuple of ints, not list[float]: Python does not enforce hints
    `,
    section('learn', 'Optional, union and None'),
    code('Values that may be missing or have several types')`
      def find_student(sid: str, db: dict[str, str]) -> str | None:
          return db.get(sid)                    # may return None

      def parse_mark(value: str | int | float) -> float:
          return float(value)

      db = {"S1": "Ama"}
      result = find_student("S2", db)
      if result is not None:                    # a type checker requires this check
          print(result.upper())
      else:
          print("not found")
      print(parse_mark("72.5"), parse_mark(80))
    `,
    p`«str | None» (Python 3.10+) means "a string or None"; older code writes «Optional[str]» from the «typing» module. A checker will complain if you call «result.upper()» without first ruling out «None», which is exactly the bug behind many «AttributeError: 'NoneType' object has no attribute ...» crashes.`,
    section('learn', 'Callables, aliases and protocols'),
    code('More expressive hints')`
      from typing import Callable, Iterable, Protocol, TypedDict

      Grade = tuple[str, float]                    # a type alias

      def apply_all(values: Iterable[float], f: Callable[[float], float]) -> list[float]:
          return [f(v) for v in values]

      class StudentRecord(TypedDict):              # the shape of a dict
          name: str
          gpa: float

      class HasArea(Protocol):                     # anything with an area() method
          def area(self) -> float: ...

      class Square:
          def __init__(self, s: float) -> None:
              self.s = s
          def area(self) -> float:
              return self.s ** 2

      def total_area(shapes: list[HasArea]) -> float:
          return sum(s.area() for s in shapes)

      rec: StudentRecord = {"name": "Esi", "gpa": 3.9}
      g: Grade = ("CSCD101", 88.0)
      print(apply_all([1, 2, 3], lambda x: x * 10), rec["gpa"], g, total_area([Square(2), Square(3)]))
    `,
    p`A «Protocol» describes behaviour rather than ancestry: «Square» never inherits from «HasArea», but it matches because it has the right method. This is called **structural typing** (the type-checked version of Python's "duck typing": if it walks like a duck and quacks like a duck…).`,
    section('learn', 'Running mypy on your computer'),
    code('Install and run mypy', { run: false, out: 'grades.py:4: error: Argument 1 to "average" has incompatible type "list[str]"; expected "list[float]"  [arg-type]\nFound 1 error in 1 file (checked 1 source file)' })`
      # grades.py
      def average(marks: list[float]) -> float:
          return sum(marks) / len(marks)
      print(average(["70", "80"]))

      # in the terminal:
      #   pip install mypy
      #   mypy grades.py
    `,
    note('deep', 'Going deeper · gradual typing')`Python uses **gradual typing**: you can add hints to part of a codebase and leave the rest dynamic; unannotated code is treated as type «Any». Type theory distinguishes **nominal** typing (compatibility by declared class, as in Java) from **structural** typing (compatibility by shape, as with «Protocol»). Hints are also used at run time by libraries such as **pydantic** and **FastAPI** to validate incoming JSON automatically, and by dataclasses to discover fields.`,
    quiz(
      { q: 'Does Python raise an error at run time if you pass a str to a parameter annotated «int»?', o: ['Yes, always', 'No, hints are not enforced at run time', 'Only in Python 3.12+', 'Only inside classes'], a: 1, why: 'Hints are checked by tools such as mypy, not by the interpreter.' },
      { q: 'How do you write "a list of strings or None"?', o: ['«list[str] | None»', '«list(str) or None»', '«[str] | None»', '«Optional(list)»'], a: 0, why: '«X | None» means optional.' },
      { q: 'What does «Callable[[int, int], bool]» describe?', o: ['A list of ints', 'A function taking two ints and returning a bool', 'A class', 'A tuple'], a: 1, why: 'Argument types in a list, then the return type.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Annotate and implement', level: 'medium',
      prompt: `Implement «group_by_grade(marks: dict[str, int]) -> dict[str, list[str]]» returning names grouped by letter grade (A ≥ 80, B ≥ 70, C ≥ 60, else F), with names sorted and grades in the order A, B, C, F (omit empty ones). Keep the annotations.`,
      starter: R`
        def group_by_grade(marks: dict[str, int]) -> dict[str, list[str]]:
            pass

        print(group_by_grade({"Kofi": 72, "Ama": 85, "Yaw": 45, "Esi": 91, "Akua": 70}))`,
      expect: `{'A': ['Ama', 'Esi'], 'B': ['Akua', 'Kofi'], 'F': ['Yaw']}`,
      hints: ['Write a small helper «def letter(mark: int) -> str:».', 'Build the result by looping over «"ABCF"» and keeping non-empty lists.'],
      solution: R`
        def letter(mark: int) -> str:
            if mark >= 80:
                return "A"
            if mark >= 70:
                return "B"
            if mark >= 60:
                return "C"
            return "F"

        def group_by_grade(marks: dict[str, int]) -> dict[str, list[str]]:
            result: dict[str, list[str]] = {}
            for g in "ABCF":
                names = sorted(n for n, m in marks.items() if letter(m) == g)
                if names:
                    result[g] = names
            return result

        print(group_by_grade({"Kofi": 72, "Ama": 85, "Yaw": 45, "Esi": 91, "Akua": 70}))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Fully typed module with a run-time checker',
      brief: `Annotate an existing untyped module completely, then write a small decorator that **does** check simple annotations at run time (the way validation libraries do), to understand how hints can be read programmatically.`,
      reqs: ['Annotate every function, parameter and return value in the provided code, including «str | None» where appropriate', 'Write a decorator «checked» that uses «inspect.signature(func).bind(*args, **kwargs)» and the function\'s «__annotations__» to verify that each argument is an instance of its annotated type (only for plain classes like «int», «str», «float»; skip others)', 'Raise «TypeError» with a message naming the parameter, the expected and the actual type', 'Apply it to the module functions and demonstrate one good and two bad calls', 'On your computer, run «mypy» on the annotated module and fix anything it reports'],
      starter: R`
        def make_username(first, last, year=None):
            base = (first[0] + last).lower()
            return base if year is None else f"{base}{year % 100:02d}"

        def credits_needed(completed, required=120):
            return max(0, required - completed)
        `,
      solution: R`
        import functools
        import inspect


        def checked(func):
            sig = inspect.signature(func)
            hints = func.__annotations__

            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                bound = sig.bind(*args, **kwargs)
                for name, value in bound.arguments.items():
                    expected = hints.get(name)
                    if isinstance(expected, type) and not isinstance(value, expected):
                        raise TypeError(f"{func.__name__}(): '{name}' must be {expected.__name__}, "
                                        f"got {type(value).__name__}")
                return func(*args, **kwargs)
            return wrapper


        @checked
        def make_username(first: str, last: str, year: int | None = None) -> str:
            base = (first[0] + last).lower()
            return base if year is None else f"{base}{year % 100:02d}"


        @checked
        def credits_needed(completed: int, required: int = 120) -> int:
            return max(0, required - completed)


        print(make_username("Ama", "Owusu"), make_username("Kofi", "Mensah", 2026))
        print(credits_needed(96))
        for call in (lambda: make_username("Ama", 42), lambda: credits_needed("96")):
            try:
                call()
            except TypeError as e:
                print("TypeError:", e)`,
      explain: `«int | None» is not a plain class, so «isinstance(expected, type)» is false and the check is skipped for «year»; handling unions properly would use «typing.get_args». «sig.bind» maps positional and keyword arguments to parameter names exactly as Python does when calling the function. Libraries like pydantic build on these same building blocks with full support for nested and generic types.`
    })
  ]
});

/* ------------------------------------------------------------------ 5.5 */
lesson({
  id: 'regex', level: 'L5', title: 'Regular expressions', minutes: 60,
  keywords: 're regex pattern match search findall sub groups validation',
  goals: ['Write patterns with character classes, quantifiers and anchors', 'Use «re.search», «re.findall», «re.fullmatch», «re.sub» and «re.split»', 'Extract data with groups and named groups', 'Validate input formats and know the limits of regex'],
  body: [
    section('learn', 'A language for text patterns'),
    p`A **regular expression** (regex) describes a pattern of text: "two to four capital letters followed by three digits" or "something that looks like an email address". Python's «re» module lets you search for, extract, validate and replace text matching a pattern. Always write patterns as raw strings («r"..."») so backslashes reach the regex engine unchanged.`,
    table(['Pattern', 'Matches', 'Example'], [
      ['«.»', 'any character except newline', '«c.t» → cat, cot, c9t'],
      ['«\\d», «\\w», «\\s»', 'digit; word char (letter, digit, _); whitespace', '«\\d\\d» → 42'],
      ['«\\D», «\\W», «\\S»', 'the opposites', ''],
      ['«[abc]», «[a-z]», «[^0-9]»', 'one of; a range; NOT one of', '«[aeiou]» → a vowel'],
      ['«*», «+», «?»', '0 or more; 1 or more; 0 or 1', '«colou?r» → color, colour'],
      ['«{3}», «{2,4}»', 'exactly 3; between 2 and 4', '«\\d{4}» → 2026'],
      ['«^», «$»', 'start / end of string (or line with MULTILINE)', '«^Hello»'],
      ['«\\b»', 'word boundary', '«\\bcat\\b» does not match "concat"'],
      ['«( )», «(?P<name> )»', 'group; named group', '«(\\d+)-(\\d+)»'],
      ['«a|b»', 'a or b', '«cat|dog»']
    ]),
    code('The main functions')`
      import re

      text = "Courses: CSCD101 (3 credits), MATH121 (3 credits), UGRC110 (2 credits)."

      print(re.search(r"\d+", text).group())          # first match anywhere
      print(re.findall(r"[A-Z]{4}\d{3}", text))        # all matches as a list
      print(re.findall(r"\((\d) credits\)", text))     # with a group: only the group
      print(re.sub(r"\d{3}", "###", text))             # replace
      print(re.split(r",\s*", "a, b,c ,  d"))          # split on a pattern
      print(re.fullmatch(r"[A-Z]{4}\d{3}", "CSCD101") is not None)
      print(re.fullmatch(r"[A-Z]{4}\d{3}", "CSCD1010") is not None)
    `,
    p`«search» finds the first match anywhere and returns a **match object** (or «None»). «fullmatch» requires the **whole** string to match, which is what you want for validation. «findall» returns all matches; if the pattern has groups, it returns the groups.`,
    section('learn', 'Groups: extracting structured data'),
    code('Named groups and finditer')`
      import re

      log = """2026-10-27 09:01:44 user=ama action=login status=ok
      2026-10-27 09:03:12 user=kofi action=upload status=failed
      2026-10-27 09:05:30 user=ama action=logout status=ok"""

      pattern = re.compile(r"(?P<date>\d{4}-\d{2}-\d{2}) (?P<time>[\d:]+) user=(?P<user>\w+) action=(?P<action>\w+) status=(?P<status>\w+)")
      for m in pattern.finditer(log):
          print(m["time"], m["user"].ljust(5), m["action"].ljust(7), m["status"])

      first = pattern.search(log)
      print(first.groupdict())

      # rearranging with backreferences in the replacement
      print(re.sub(r"(\d{4})-(\d{2})-(\d{2})", r"\3/\2/\1", "Due 2026-11-03"))
    `,
    p`«re.compile» turns a pattern into a reusable object, which is clearer when you use it many times. «finditer» yields match objects one at a time (a generator!). In a replacement string, «\1», «\2»… refer to the captured groups.`,
    section('learn', 'Validation'),
    code('Checking input formats')`
      import re

      PATTERNS = {
          "student_id": r"\d{8}",
          "ghana_phone": r"(\+233|0)[235]\d{8}",
          "email": r"[\w.+-]+@[\w-]+(\.[\w-]+)+",
          "strong_password": r"(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}",
      }

      tests = {
          "student_id": ["10982341", "1098234", "1098234a"],
          "ghana_phone": ["+233241234567", "0501234567", "0811234567"],
          "email": ["ama.owusu@st.ug.edu.gh", "kofi@", "esi+news@gmail.com"],
          "strong_password": ["Passw0rd!", "password", "Sh0rt!"],
      }
      for kind, values in tests.items():
          for v in values:
              ok = re.fullmatch(PATTERNS[kind], v) is not None
              print(f"{kind:<16}{v:<26}{'valid' if ok else 'invalid'}")
    `,
    p`The password pattern uses **lookaheads** «(?=...)»: each one checks that something appears somewhere ahead without consuming characters, so several independent conditions can be combined. Regex is powerful but becomes unreadable quickly. For complicated rules, several simple checks in Python code are often clearer.`,
    note('warn', 'Know the limits')`Do not parse HTML, JSON or programming languages with regular expressions; use a real parser («html.parser», «json»). Real email validation is famously complex; the pattern above catches typos but the only true test is sending a confirmation email. Some patterns with nested quantifiers like «(a+)+$» can take exponential time on certain inputs (**catastrophic backtracking**), a real cause of website outages.`,
    note('deep', 'Going deeper · regular languages and automata')`In theory of computation, **regular expressions** describe exactly the **regular languages**, the ones recognisable by a **finite automaton** (a machine with finitely many states and no memory stack). That is why classic regexes cannot match balanced brackets to arbitrary depth: counting nesting needs unbounded memory (a pushdown automaton, i.e. a context-free grammar). Python's «re» adds extensions such as backreferences and lookarounds that go beyond the theory, which is also why it uses a backtracking engine that can be slow on adversarial patterns.`,
    quiz(
      { q: 'What does «\\d{3}» match?', o: ['Any 3 characters', 'Exactly three digits', 'The letter d three times', 'Up to three digits'], a: 1, why: '«\\d» is a digit; «{3}» means exactly three.' },
      { q: 'Which function should you use to validate that an entire string is a phone number?', o: ['«re.search»', '«re.findall»', '«re.fullmatch»', '«re.sub»'], a: 2, why: '«search» would accept extra text around the number.' },
      { q: 'What does «re.findall(r"(\\w+)@", "a@x b@y")» return?', o: ['«["a@", "b@"]»', '«["a", "b"]»', '«["x", "y"]»', '«[("a", "x")]»'], a: 1, why: 'With one group, findall returns the group contents.' },
      { q: 'Why use raw strings for patterns?', o: ['They are faster', 'So backslashes are not interpreted by Python before reaching re', 'They are required for groups', 'To ignore case'], a: 1, why: 'In a normal string «"\\b"» would be a backspace character.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Extract course codes', level: 'easy',
      prompt: `Find all course codes (4 capital letters, 3 digits, as whole words) and print them sorted without duplicates.`,
      starter: R`
        import re
        text = "Register for MATH121 and CSCD101. CSCD101 needs no prereq; STAT1111 is invalid, PHYS105 is fine."
        `,
      expect: `['CSCD101', 'MATH121', 'PHYS105']`,
      hints: ['Use «\\b» at both ends: «r"\\b[A-Z]{4}\\d{3}\\b"».', 'Remove duplicates with «set», then «sorted».'],
      solution: R`
        import re
        text = "Register for MATH121 and CSCD101. CSCD101 needs no prereq; STAT1111 is invalid, PHYS105 is fine."
        print(sorted(set(re.findall(r"\b[A-Z]{4}\d{3}\b", text))))`
    }),
    task({
      title: 'Normalise phone numbers', level: 'medium',
      prompt: `Convert every Ghanaian mobile number in the text to the international format «+233XXXXXXXXX». Numbers appear as «0241234567», «024 123 4567» or «+233 24 123 4567».`,
      starter: R`
        import re
        text = "Call 0241234567 or 050 987 6543, office +233 20 111 2222."
        `,
      expect: `Call +233241234567 or +233509876543, office +233201112222.`,
      hints: ['Match an optional prefix «(?:\\+233\\s?|0)», then the digits with optional spaces: «(\\d{2})\\s?(\\d{3})\\s?(\\d{4})».', 'Replace with «r"+233\\1\\2\\3"».'],
      solution: R`
        import re
        text = "Call 0241234567 or 050 987 6543, office +233 20 111 2222."
        print(re.sub(r"(?:\+233\s?|0)(\d{2})\s?(\d{3})\s?(\d{4})", r"+233\1\2\3", text))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Server log analyser',
      brief: `Parse a web server access log in the Common Log Format with a single compiled regular expression with named groups, then produce the kind of report a system administrator needs.`,
      reqs: ['One compiled pattern with named groups for: IP address, timestamp, HTTP method, path, status code and response size', 'Skip (and count) lines that do not match', 'Report: requests per status class (2xx, 3xx, 4xx, 5xx), the top 3 paths, the IP with the most errors (status ≥ 400), and the total bytes served', 'Find all paths that look like attempted attacks: containing «..», «/etc/» or «<script» (case-insensitive) and the IPs that sent them'],
      starter: R`
        import re
        from collections import Counter

        LOG = """192.168.1.10 - - [27/Oct/2026:09:01:44 +0000] "GET /index.html HTTP/1.1" 200 5120
        192.168.1.11 - - [27/Oct/2026:09:01:50 +0000] "GET /courses HTTP/1.1" 200 8432
        10.0.0.5 - - [27/Oct/2026:09:02:10 +0000] "POST /login HTTP/1.1" 401 210
        10.0.0.5 - - [27/Oct/2026:09:02:12 +0000] "POST /login HTTP/1.1" 401 210
        192.168.1.10 - - [27/Oct/2026:09:03:01 +0000] "GET /courses HTTP/1.1" 304 0
        this line is corrupted
        203.0.113.9 - - [27/Oct/2026:09:04:33 +0000] "GET /../../etc/passwd HTTP/1.1" 404 153
        192.168.1.12 - - [27/Oct/2026:09:05:00 +0000] "GET /results HTTP/1.1" 500 98
        203.0.113.9 - - [27/Oct/2026:09:05:40 +0000] "GET /search?q=<SCRIPT>alert(1)</script> HTTP/1.1" 400 120
        192.168.1.11 - - [27/Oct/2026:09:06:15 +0000] "GET /courses HTTP/1.1" 200 8432"""
        `,
      solution: R`
        import re
        from collections import Counter

        LOG = """192.168.1.10 - - [27/Oct/2026:09:01:44 +0000] "GET /index.html HTTP/1.1" 200 5120
        192.168.1.11 - - [27/Oct/2026:09:01:50 +0000] "GET /courses HTTP/1.1" 200 8432
        10.0.0.5 - - [27/Oct/2026:09:02:10 +0000] "POST /login HTTP/1.1" 401 210
        10.0.0.5 - - [27/Oct/2026:09:02:12 +0000] "POST /login HTTP/1.1" 401 210
        192.168.1.10 - - [27/Oct/2026:09:03:01 +0000] "GET /courses HTTP/1.1" 304 0
        this line is corrupted
        203.0.113.9 - - [27/Oct/2026:09:04:33 +0000] "GET /../../etc/passwd HTTP/1.1" 404 153
        192.168.1.12 - - [27/Oct/2026:09:05:00 +0000] "GET /results HTTP/1.1" 500 98
        203.0.113.9 - - [27/Oct/2026:09:05:40 +0000] "GET /search?q=<SCRIPT>alert(1)</script> HTTP/1.1" 400 120
        192.168.1.11 - - [27/Oct/2026:09:06:15 +0000] "GET /courses HTTP/1.1" 200 8432"""

        LINE = re.compile(
            r'(?P<ip>\d{1,3}(?:\.\d{1,3}){3}) \S+ \S+ '
            r'\[(?P<time>[^\]]+)\] '
            r'"(?P<method>[A-Z]+) (?P<path>\S+) HTTP/[\d.]+" '
            r'(?P<status>\d{3}) (?P<size>\d+|-)'
        )
        SUSPICIOUS = re.compile(r"\.\.|/etc/|<script", re.IGNORECASE)

        records, bad_lines = [], 0
        for line in LOG.splitlines():
            m = LINE.search(line)
            if m is None:
                bad_lines += 1
                continue
            r = m.groupdict()
            r["status"] = int(r["status"])
            r["size"] = 0 if r["size"] == "-" else int(r["size"])
            records.append(r)

        classes = Counter(f"{r['status'] // 100}xx" for r in records)
        paths = Counter(r["path"] for r in records)
        errors = Counter(r["ip"] for r in records if r["status"] >= 400)
        attacks = [(r["ip"], r["path"]) for r in records if SUSPICIOUS.search(r["path"])]

        print("Parsed:", len(records), "Skipped:", bad_lines)
        print("By status class:", dict(sorted(classes.items())))
        print("Top paths:", paths.most_common(3))
        print("Most errors from:", errors.most_common(1)[0])
        print("Bytes served:", sum(r["size"] for r in records))
        print("Suspicious requests:")
        for ip, path in attacks:
            print(f"  {ip:<14}{path}")`,
      explain: `Adjacent string literals inside brackets are joined automatically, which lets a long pattern be split over several commented lines (the «re.VERBOSE» flag is another option). «\d{1,3}(?:\.\d{1,3}){3}» uses a non-capturing group «(?:...)» to repeat ".digits" three times without creating an extra group. Log analysis like this is the first step of intrusion detection; tools such as fail2ban block IPs based on exactly these patterns.`
    })
  ]
});

/* ------------------------------------------------------------------ 5.6 */
lesson({
  id: 'tooling', level: 'L5', title: 'Virtual environments, packages and project structure', minutes: 45,
  keywords: 'venv pip pypi requirements packages project structure git linting ruff black',
  goals: ['Create and activate a virtual environment', 'Install, freeze and reproduce dependencies with pip', 'Structure a Python project professionally', 'Use a formatter, a linter and version control'],
  body: [
    section('learn', 'Why virtual environments?'),
    p`Project A needs version 1 of a library; project B needs version 2. If both install into the same global Python, one of them breaks. A **virtual environment** ("venv") is a self-contained folder with its own Python interpreter link and its own installed packages, one per project. This lesson happens in your terminal, not in this page: follow along on your computer.`,
    code('Create and use a virtual environment', { run: false })`
      # 1. go to your project folder
      cd python-course/expense-tracker

      # 2. create a venv called .venv
      python -m venv .venv            # macOS/Linux: python3 -m venv .venv

      # 3. activate it
      .venv\Scripts\activate          # Windows (Command Prompt / PowerShell)
      source .venv/bin/activate       # macOS / Linux

      # your prompt now starts with (.venv); 'python' and 'pip' are the project's own

      # 4. leave it when done
      deactivate
    `,
    section('learn', 'Installing packages with pip'),
    code('pip basics', { run: false })`
      pip install requests                 # latest version
      pip install "pandas>=2.2,<3"         # a version range
      pip list                             # what is installed
      pip show requests                    # details of one package
      pip uninstall requests
      pip freeze > requirements.txt        # record exact versions
      pip install -r requirements.txt      # recreate the environment elsewhere
    `,
    p`**PyPI** (pypi.org) hosts the packages. «requirements.txt» is how teammates, servers and future-you recreate the exact same environment. Never commit the «.venv» folder itself to version control; commit «requirements.txt» (or «pyproject.toml»).`,
    note('warn', 'Install only what you trust')`Anyone can upload to PyPI. Attackers publish packages with names one typo away from popular ones («reqeusts»). Check the spelling, the project page, the download count and the repository before installing, especially on a machine with access to sensitive data.`,
    section('learn', 'A professional project layout'),
    code('Recommended structure', { run: false })`
      expense-tracker/
      ├── .venv/                 # virtual environment (not committed)
      ├── src/
      │   └── expenses/
      │       ├── __init__.py    # makes 'expenses' a package
      │       ├── models.py      # dataclasses: Expense, Budget
      │       ├── storage.py     # load/save JSON
      │       ├── reports.py     # pure logic functions
      │       └── cli.py         # the menu / command-line interface
      ├── tests/
      │   ├── test_reports.py
      │   └── test_storage.py
      ├── pyproject.toml         # project metadata, dependencies, tool settings
      ├── requirements.txt
      ├── README.md              # what it is, how to install and run it
      └── .gitignore             # .venv/, __pycache__/, *.pyc, data files
    `,
    p`Each module has one responsibility (the three-layer idea from lesson 3.8, now in separate files). Tests live in their own folder. The «README» tells others how to install and run the project; for a student, a good README on GitHub is part of your portfolio.`,
    section('learn', 'Code quality tools'),
    table(['Tool', 'What it does', 'Command'], [
      ['**ruff** / flake8 / pylint', 'linter: finds bugs, unused imports, style problems', '«ruff check .»'],
      ['**black** / ruff format', 'formatter: rewrites code into one consistent style', '«black .» or «ruff format .»'],
      ['**mypy** / pyright', 'static type checker (lesson 5.4)', '«mypy src»'],
      ['**pytest**', 'test runner (lesson 5.7)', '«pytest»'],
      ['**git**', 'version control: history, branches, collaboration', '«git commit -m "..."»']
    ]),
    code('A first git workflow', { run: false })`
      git init                         # start tracking this folder
      git add .                        # stage all files (respecting .gitignore)
      git commit -m "Initial expense tracker"
      # ... edit files ...
      git status                       # what changed?
      git diff                         # show the changes
      git add src/expenses/reports.py
      git commit -m "Add monthly report"
      git log --oneline                # history
      # publish on GitHub: create an empty repo there, then
      git remote add origin https://github.com/<you>/expense-tracker.git
      git push -u origin main
    `,
    note('deep', 'Going deeper · dependency resolution and reproducibility')`Installing a package also installs **its** dependencies, forming a dependency graph. A resolver must find versions that satisfy every constraint at once, which is a constraint-satisfaction problem (NP-hard in general). Modern tools such as **uv** and **Poetry** produce **lock files** that pin every package, including indirect ones, with cryptographic hashes, so builds are reproducible and tampering is detectable. Reproducibility matters in research too: a results section is only trustworthy if others can recreate the exact software environment.`,
    quiz(
      { q: 'What problem do virtual environments solve?', o: ['Slow code', 'Conflicting package versions between projects', 'Syntax errors', 'Internet access'], a: 1, why: 'Each project gets its own isolated set of packages.' },
      { q: 'How do you record exact installed versions?', o: ['«pip list > versions»', '«pip freeze > requirements.txt»', '«python --version»', '«pip save»'], a: 1, why: '«freeze» outputs «package==version» lines.' },
      { q: 'Should the «.venv» folder be committed to git?', o: ['Yes, always', 'No, commit requirements/pyproject instead', 'Only on Windows', 'Only if it is small'], a: 1, why: 'It is large, machine-specific and can be recreated.' },
      { q: 'What does a linter do?', o: ['Runs the program faster', 'Analyses code for likely bugs and style issues', 'Installs packages', 'Encrypts code'], a: 1, why: 'Linters catch problems without running the code.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Read a requirements file', level: 'easy',
      prompt: `Practise the format: parse the «requirements.txt» content below into a dict of package → version specifier, ignoring comments and blank lines. Packages without a specifier map to «"any"».`,
      starter: R`
        REQS = """# web
        requests==2.32.3
        flask>=3.0

        # data
        pandas>=2.2,<3
        rich
        """
        `,
      expect: `{'requests': '==2.32.3', 'flask': '>=3.0', 'pandas': '>=2.2,<3', 'rich': 'any'}`,
      hints: ['Skip lines that are empty or start with «#».', 'Use a regex: «re.match(r"([A-Za-z0-9_.-]+)(.*)", line)».'],
      solution: R`
        import re

        REQS = """# web
        requests==2.32.3
        flask>=3.0

        # data
        pandas>=2.2,<3
        rich
        """

        result = {}
        for line in REQS.splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            name, spec = re.match(r"([A-Za-z0-9_.-]+)(.*)", line).groups()
            result[name] = spec.strip() or "any"
        print(result)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Turn your Level 3 project into a real project',
      brief: `Take your expense tracker or quiz engine from lesson 3.8 and restructure it into a professional project on your computer, under version control. This assignment is done in your editor and terminal. The code box below shows a minimal «__init__.py» and «pyproject.toml» for reference.`,
      reqs: ['A project folder with a «.venv» created and activated', 'Code split into a package under «src/» with at least three modules (models/storage/logic/cli)', 'A «requirements.txt» (or «pyproject.toml») and a «.gitignore» that excludes «.venv» and «__pycache__»', 'A README with: description, installation steps, how to run, example output', '«ruff check» and «ruff format» (or black) run with no remaining issues', 'A git repository with at least 3 meaningful commits; optionally pushed to GitHub'],
      run: false,
      starter: R`
        # src/expenses/__init__.py
        """Expense tracking package."""
        __version__ = "0.1.0"
        `,
      solution: R`
        # ---------- pyproject.toml ----------
        [project]
        name = "expenses"
        version = "0.1.0"
        description = "A command-line expense tracker"
        requires-python = ">=3.10"
        dependencies = []

        [project.scripts]
        expenses = "expenses.cli:main"

        [tool.ruff]
        line-length = 100

        # ---------- .gitignore ----------
        .venv/
        __pycache__/
        *.pyc
        expenses.json

        # ---------- terminal ----------
        python -m venv .venv
        source .venv/bin/activate            # Windows: .venv\Scripts\activate
        pip install ruff pytest
        pip install -e .                     # install your own package in editable mode
        expenses                             # runs expenses.cli:main
        ruff check . && ruff format .
        git init && git add . && git commit -m "Restructure into a package"`,
      explain: `«pip install -e .» installs your project in **editable** mode: Python imports it from your «src» folder, so edits take effect immediately, and the «[project.scripts]» entry creates an «expenses» command. This is how professional Python applications and libraries are packaged and distributed.`
    })
  ]
});

/* ------------------------------------------------------------------ 5.7 */
lesson({
  id: 'testing', level: 'L5', title: 'Automated testing', minutes: 60,
  keywords: 'testing unittest pytest assert test driven development tdd fixtures edge cases coverage',
  goals: ['Explain why automated tests matter', 'Write tests with «unittest» and «pytest»', 'Choose good test cases: normal, edge and error cases', 'Practise test-driven development (TDD)'],
  body: [
    section('learn', 'Why test?'),
    p`Every time you change code you risk breaking something that used to work (a **regression**). Checking everything by hand after every change is slow and unreliable. **Automated tests** are small programs that check your code and run in seconds. They let you refactor with confidence, document how code is supposed to behave, and catch bugs before your users (or your lecturer) do.`,
    table(['Test level', 'Checks', 'Example'], [
      ['Unit test', 'one function or class in isolation', '«letter_grade(79.9) == "B+"»'],
      ['Integration test', 'several parts working together', 'save then load returns the same data'],
      ['End-to-end test', 'the whole program as a user would use it', 'run the CLI with input, check output']
    ]),
    section('learn', 'unittest (built in)'),
    code('A test case class')`
      import unittest

      def letter_grade(mark):
          if not 0 <= mark <= 100:
              raise ValueError("mark out of range")
          for minimum, letter in [(80, "A"), (75, "B+"), (70, "B"), (65, "C+"), (60, "C"), (50, "D")]:
              if mark >= minimum:
                  return letter
          return "F"

      class TestLetterGrade(unittest.TestCase):
          def test_typical_values(self):
              self.assertEqual(letter_grade(92), "A")
              self.assertEqual(letter_grade(72), "B")

          def test_boundaries(self):
              self.assertEqual(letter_grade(80), "A")
              self.assertEqual(letter_grade(79.99), "B+")
              self.assertEqual(letter_grade(50), "D")
              self.assertEqual(letter_grade(49.99), "F")

          def test_extremes(self):
              self.assertEqual(letter_grade(0), "F")
              self.assertEqual(letter_grade(100), "A")

          def test_invalid(self):
              with self.assertRaises(ValueError):
                  letter_grade(101)
              with self.assertRaises(ValueError):
                  letter_grade(-1)

      # On your computer: python -m unittest   (discovers test_*.py files)
      import sys
      suite = unittest.TestLoader().loadTestsFromTestCase(TestLetterGrade)
      result = unittest.TextTestRunner(stream=sys.stdout, verbosity=2).run(suite)
    `,
    p`Each method whose name starts with «test_» is one test. «assertEqual», «assertTrue», «assertIn», «assertAlmostEqual» (for floats) and «assertRaises» check results; a failed assertion reports the expected and actual values. Tests should be independent of each other and of the order they run in.`,
    section('learn', 'pytest (the popular choice)'),
    code('test_grades.py with pytest', { run: false, out: '============ test session starts ============\ncollected 6 items\n\ntest_grades.py ......                 [100%]\n\n============ 6 passed in 0.02s ============' })`
      # test_grades.py      (install with: pip install pytest, run with: pytest)
      import pytest
      from grades import letter_grade

      def test_typical():
          assert letter_grade(92) == "A"

      @pytest.mark.parametrize("mark, expected", [
          (80, "A"), (79.99, "B+"), (50, "D"), (49.99, "F"), (0, "F"),
      ])
      def test_boundaries(mark, expected):
          assert letter_grade(mark) == expected

      def test_invalid():
          with pytest.raises(ValueError, match="out of range"):
              letter_grade(101)
    `,
    p`pytest uses plain «assert» statements and plain functions, and shows detailed explanations when an assertion fails. «@pytest.mark.parametrize» runs one test function with many inputs, which makes boundary testing very compact. Most professional Python projects use pytest.`,
    section('learn', 'Choosing test cases'),
    ul('**Typical cases**: ordinary inputs that should work.',
       '**Boundaries**: just below, at, and just above every threshold (79.99, 80, 80.01).',
       '**Edge cases**: empty list, zero, one element, very large values, negative numbers, empty strings, Unicode names.',
       '**Error cases**: invalid input must raise the right exception with a useful message.',
       '**Regression tests**: when you fix a bug, first write a test that reproduces it, so it can never silently come back.'),
    section('learn', 'Test-driven development'),
    p`**TDD** reverses the usual order: write a failing test first («red»), write the simplest code that makes it pass («green»), then clean up the code while keeping the tests green («refactor»). Repeat in small steps. It forces you to decide what the code should do before deciding how, and it leaves you with a full test suite as a side effect.`,
    code('TDD in miniature: a password strength checker')`
      # Step 1 (red): the tests, written first
      def run_tests(strength):
          cases = [("", "weak"), ("abc", "weak"), ("abcdefgh", "medium"),
                   ("abcdefg1", "medium"), ("Abcdefg1!", "strong"), ("A1!aaaaaaaaaaaa", "strong")]
          failures = [(pw, want, strength(pw)) for pw, want in cases if strength(pw) != want]
          print("all passed" if not failures else f"FAILED: {failures}")

      # Step 2 (green): simplest code that satisfies the tests
      def strength(pw):
          if len(pw) < 8:
              return "weak"
          kinds = sum([any(c.islower() for c in pw), any(c.isupper() for c in pw),
                       any(c.isdigit() for c in pw), any(not c.isalnum() for c in pw)])
          return "strong" if kinds >= 4 else "medium"

      run_tests(strength)
    `,
    note('deep', 'Going deeper · what tests can and cannot prove')`"Program testing can be used to show the presence of bugs, but never to show their absence." (Edsger Dijkstra). Tests sample a tiny fraction of possible inputs. **Coverage** tools («pytest --cov») measure which lines your tests execute, but 100% line coverage still does not mean every behaviour is checked. **Property-based testing** (the «hypothesis» library) generates hundreds of random inputs and checks general properties, for example "sorting twice gives the same result as sorting once". Formal verification goes further and proves correctness mathematically. **Continuous integration** (CI) services run your test suite automatically on every commit.`,
    quiz(
      { q: 'What is a regression?', o: ['A statistics model', 'A previously working feature that broke after a change', 'A slow test', 'A syntax error'], a: 1, why: 'Regression tests prevent old bugs from returning.' },
      { q: 'For a rule "pass if mark ≥ 50", which inputs are boundary tests?', o: ['10 and 90', '49.99, 50 and 50.01', 'Only 50', '0 and 100'], a: 1, why: 'Test just below, at and just above the threshold.' },
      { q: 'In TDD, what comes first?', o: ['The implementation', 'A failing test', 'Refactoring', 'Documentation'], a: 1, why: 'Red, green, refactor.' },
      { q: 'How do you test that a function raises «ValueError» with pytest?', o: ['«assert raises(ValueError)»', '«with pytest.raises(ValueError):»', '«try: ... except: assert True»', '«@pytest.error»'], a: 1, why: 'The context manager fails the test if no exception is raised.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Find the bug with tests', level: 'medium',
      prompt: `The function «median» has a bug. Write assertions (in the given list of cases) that expose it, then fix the function so all cases pass. Expected final output: «All 5 tests passed».`,
      starter: R`
        def median(values):
            s = sorted(values)
            mid = len(s) // 2
            return s[mid]

        cases = [
            ([3, 1, 2], 2),
            ([5], 5),
            # add a case that exposes the bug, and two more edge cases
        ]
        failed = [(v, want, median(v)) for v, want in cases if median(v) != want]
        print(f"All {len(cases)} tests passed" if not failed else f"Failed: {failed}")`,
      expect: `All 5 tests passed`,
      hints: ['Try a list with an even number of elements, e.g. «[4, 1, 3, 2]» whose median is 2.5.', 'Fix: if the length is even, average the two middle values.', 'Other edge cases: negative numbers, duplicates, unsorted floats.'],
      solution: R`
        def median(values):
            s = sorted(values)
            mid = len(s) // 2
            if len(s) % 2 == 0:
                return (s[mid - 1] + s[mid]) / 2
            return s[mid]

        cases = [
            ([3, 1, 2], 2),
            ([5], 5),
            ([4, 1, 3, 2], 2.5),
            ([-5, -1, -3], -3),
            ([2, 2, 2, 9], 2.0),
        ]
        failed = [(v, want, median(v)) for v, want in cases if median(v) != want]
        print(f"All {len(cases)} tests passed" if not failed else f"Failed: {failed}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Test suite for the bank account',
      brief: `Write a thorough «unittest» test suite for the encapsulated «BankAccount» from lesson 4.4 (provided in the starter). Aim to test every rule, including the failure paths, and check that failed operations leave the account unchanged.`,
      reqs: ['Use «setUp» to create a fresh account before each test', 'Test deposits: positive works, zero and negative raise «ValueError», balance unchanged after a failure', 'Test withdrawals within the balance, using the overdraft, and exceeding the limit', 'Test read-only properties: assigning «balance» raises «AttributeError»', 'Test the owner validation and «transaction_count»', 'At least 10 test methods; all pass; run with a verbose runner and print the summary'],
      starter: R`
        import sys
        import unittest

        class BankAccount:
            def __init__(self, owner, overdraft_limit=0):
                if not owner or not owner.strip():
                    raise ValueError("owner name cannot be empty")
                if overdraft_limit < 0:
                    raise ValueError("overdraft limit cannot be negative")
                self.owner = owner.strip()
                self._overdraft = overdraft_limit
                self._balance = 0.0
                self._history = []

            @property
            def balance(self):
                return self._balance

            @property
            def transaction_count(self):
                return len(self._history)

            def deposit(self, amount):
                if amount <= 0:
                    raise ValueError("deposit must be positive")
                self._balance += amount
                self._history.append(("deposit", amount))

            def withdraw(self, amount):
                if amount <= 0:
                    raise ValueError("withdrawal must be positive")
                if amount > self._balance + self._overdraft:
                    raise ValueError("insufficient funds")
                self._balance -= amount
                self._history.append(("withdraw", amount))

        class TestBankAccount(unittest.TestCase):
            def setUp(self):
                self.acc = BankAccount("Ama", overdraft_limit=100)
        `,
      solution: R`
        import sys
        import unittest

        class BankAccount:
            def __init__(self, owner, overdraft_limit=0):
                if not owner or not owner.strip():
                    raise ValueError("owner name cannot be empty")
                if overdraft_limit < 0:
                    raise ValueError("overdraft limit cannot be negative")
                self.owner = owner.strip()
                self._overdraft = overdraft_limit
                self._balance = 0.0
                self._history = []

            @property
            def balance(self):
                return self._balance

            @property
            def transaction_count(self):
                return len(self._history)

            def deposit(self, amount):
                if amount <= 0:
                    raise ValueError("deposit must be positive")
                self._balance += amount
                self._history.append(("deposit", amount))

            def withdraw(self, amount):
                if amount <= 0:
                    raise ValueError("withdrawal must be positive")
                if amount > self._balance + self._overdraft:
                    raise ValueError("insufficient funds")
                self._balance -= amount
                self._history.append(("withdraw", amount))


        class TestBankAccount(unittest.TestCase):
            def setUp(self):
                self.acc = BankAccount("Ama", overdraft_limit=100)

            def test_new_account_is_empty(self):
                self.assertEqual(self.acc.balance, 0)
                self.assertEqual(self.acc.transaction_count, 0)

            def test_deposit_increases_balance(self):
                self.acc.deposit(250)
                self.assertEqual(self.acc.balance, 250)

            def test_deposit_zero_or_negative_rejected(self):
                for bad in (0, -10):
                    with self.assertRaises(ValueError):
                        self.acc.deposit(bad)
                self.assertEqual(self.acc.balance, 0)
                self.assertEqual(self.acc.transaction_count, 0)

            def test_withdraw_within_balance(self):
                self.acc.deposit(100)
                self.acc.withdraw(40)
                self.assertEqual(self.acc.balance, 60)

            def test_withdraw_into_overdraft(self):
                self.acc.deposit(50)
                self.acc.withdraw(150)
                self.assertEqual(self.acc.balance, -100)

            def test_withdraw_beyond_overdraft_rejected_and_unchanged(self):
                self.acc.deposit(50)
                with self.assertRaises(ValueError):
                    self.acc.withdraw(150.01)
                self.assertEqual(self.acc.balance, 50)
                self.assertEqual(self.acc.transaction_count, 1)

            def test_withdraw_non_positive_rejected(self):
                with self.assertRaises(ValueError):
                    self.acc.withdraw(0)

            def test_balance_is_read_only(self):
                with self.assertRaises(AttributeError):
                    self.acc.balance = 1_000_000

            def test_owner_is_stripped(self):
                self.assertEqual(BankAccount("  Kofi  ").owner, "Kofi")

            def test_empty_owner_rejected(self):
                for bad in ("", "   "):
                    with self.assertRaises(ValueError):
                        BankAccount(bad)

            def test_negative_overdraft_rejected(self):
                with self.assertRaises(ValueError):
                    BankAccount("Esi", overdraft_limit=-1)

            def test_transaction_count_counts_only_successes(self):
                self.acc.deposit(10)
                self.acc.withdraw(5)
                try:
                    self.acc.withdraw(1000)
                except ValueError:
                    pass
                self.assertEqual(self.acc.transaction_count, 2)


        suite = unittest.TestLoader().loadTestsFromTestCase(TestBankAccount)
        result = unittest.TextTestRunner(stream=sys.stdout, verbosity=2).run(suite)
        print("Passed" if result.wasSuccessful() else "Some tests failed")`,
      explain: `Good tests check **state after failure**: a withdrawal that raises must not have changed the balance or the history. Test names describe behaviour («test_withdraw_beyond_overdraft_rejected_and_unchanged») so a failure report reads like a sentence. Try introducing a bug into the class (for example change «>» to «>=» in «withdraw») and watch exactly which tests fail.`
    })
  ]
});
