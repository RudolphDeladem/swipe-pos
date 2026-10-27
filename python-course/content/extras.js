/* Tools: playground, cheat sheet, error decoder, glossary */
extra({
  id: 'playground', title: 'Python playground', icon: '▶', short: 'P',
  render(page, { codePanel }) {
    const intro = document.createElement('div'); intro.className = 'prose';
    intro.innerHTML = '<p>A free editor for experiments. Your code is saved in this browser automatically. Use the Input box for anything your program reads with <code>input()</code>, one line per call. Press <b>Run</b> or Ctrl+Enter.</p>';
    page.appendChild(intro);
    const panel = codePanel({
      title: 'scratch.py', label: 'Playground', key: 'playground', auto: false, stdin: 'Ama\n21',
      codeText: [
        '# Try anything here. Some ideas:',
        '#  - change the greeting',
        '#  - add a loop that prints the next 5 ages',
        '#  - turn it into a function',
        '',
        'name = input("What is your name? ")',
        'age = int(input("How old are you? "))',
        'print(f"Hi {name}! In 10 years you will be {age + 10}.")',
        '',
        'for year in range(1, 4):',
        '    print(f"  in {year} year(s): {age + year}")',
      ].join('\n')
    });
    page.appendChild(panel.el);
  },
  body: [
    note('info', 'About the in-browser interpreter')`The code boxes on this site run **Brython**, a Python 3 implementation written in JavaScript, so everything works without installing anything. It supports almost all of the language and much of the standard library, but it is slower than real Python, cannot use packages such as NumPy or pandas, and cannot reach the internet. An infinite loop freezes the tab: reload the page to recover. For projects, always use real Python on your computer (lesson 0.2).`
  ]
});

extra({
  id: 'cheatsheet', title: 'Cheat sheet', icon: '≡', short: 'C',
  body: [
    p`Every concept from the course in compact, runnable form. Edit any box and press Run.`,
    section('basics', 'Values, variables and output'),
    code('Basics')`
      name, age, gpa, active = "Ama", 20, 3.71, True        # str, int, float, bool
      print(type(age), int("42"), float("2.5"), str(7), bool(""))
      print(f"{name} is {age}; GPA {gpa:.1f}; {1234567:,}; {0.756:.1%}; {7:03d}")
      print(7 / 2, 7 // 2, 7 % 2, 2 ** 10, round(3.14159, 2), abs(-3))
      x = 5; x += 2; print(x)
    `,
    section('strings', 'Strings'),
    code('Strings')`
      s = "  Python Programming  "
      t = s.strip()
      print(t.upper(), t.lower(), t.title(), len(t))
      print(t[0], t[-1], t[0:6], t[::-1])
      print(t.split(), "-".join(["a", "b", "c"]), t.replace("Python", "Py"))
      print(t.startswith("Py"), "gram" in t, t.find("P", 1), t.count("m"))
    `,
    section('control', 'Decisions and loops'),
    code('Control flow')`
      mark = 74
      grade = "A" if mark >= 80 else "B" if mark >= 70 else "C"
      if mark >= 50 and mark != 0:
          print("pass", grade)
      elif mark < 0:
          print("invalid")
      else:
          print("fail")

      for i in range(3):            # 0 1 2
          print(i, end=" ")
      print()
      n = 3
      while n > 0:
          n -= 1
          if n == 1:
              continue
          print("n =", n)
      for i, ch in enumerate("ab"):
          print(i, ch)
      for a, b in zip([1, 2], ["x", "y"]):
          print(a, b)
    `,
    section('collections', 'Lists, tuples, dicts, sets'),
    code('Collections')`
      nums = [3, 1, 4, 1, 5]
      nums.append(9); nums.insert(0, 2); nums.remove(1); last = nums.pop()
      print(nums, last, sorted(nums), sum(nums), max(nums), nums.index(4))

      point = (3, 4); x, y = point; first, *rest = nums
      print(x, y, first, rest)

      d = {"ama": 88, "kofi": 72}
      d["esi"] = 95; d["ama"] += 1
      print(d.get("yaw", 0), list(d.keys()), list(d.items())[0])
      for k, v in d.items():
          print(k, v)

      a, b = {1, 2, 3}, {2, 3, 4}
      print(a | b, a & b, a - b, a ^ b, 2 in a)

      print([n * n for n in range(5) if n % 2 == 0], {k: v for k, v in d.items() if v > 80}, sorted({c for c in "hello"}))
    `,
    section('functions', 'Functions'),
    code('Functions')`
      def area(w, h=1, *, unit="cm"):
          """Return a formatted area."""
          return f"{w * h} {unit}^2"

      def total(*nums, **opts):
          return sum(nums) * opts.get("factor", 1)

      print(area(3), area(3, 4, unit="m"), total(1, 2, 3, factor=10))
      square = lambda n: n * n
      print(sorted(["bb", "a", "ccc"], key=len), list(map(square, [1, 2, 3])))

      def fact(n):
          return 1 if n <= 1 else n * fact(n - 1)
      print(fact(5))
    `,
    section('errors', 'Errors and files'),
    code('Exceptions and files')`
      try:
          value = int("abc")
      except ValueError as e:
          print("bad:", e)
      else:
          print("ok")
      finally:
          print("always")

      import json
      with open("demo.json", "w", encoding="utf-8") as f:
          json.dump({"a": [1, 2]}, f)
      with open("demo.json", encoding="utf-8") as f:
          print(json.load(f))
    `,
    section('oop', 'Classes'),
    code('OOP')`
      from dataclasses import dataclass

      class Animal:
          def __init__(self, name):
              self.name = name
          def speak(self):
              return "..."
          def __repr__(self):
              return f"{type(self).__name__}({self.name!r})"

      class Dog(Animal):
          def speak(self):
              return super().speak() + " Woof"

      @dataclass
      class Point:
          x: float
          y: float = 0.0

      print(Dog("Rex"), Dog("Rex").speak(), Point(1.5), Point(1, 2) == Point(1, 2))
    `,
    section('advanced', 'Generators, decorators, context managers'),
    code('Advanced')`
      import functools
      from contextlib import contextmanager

      def evens(limit):
          for n in range(0, limit + 1, 2):
              yield n

      def twice(func):
          @functools.wraps(func)
          def wrapper(*args, **kwargs):
              return func(*args, **kwargs) * 2
          return wrapper

      @twice
      def three():
          return 3

      @contextmanager
      def banner(title):
          print(f"== {title} ==")
          yield
          print("=" * (len(title) + 6))

      with banner("demo"):
          print(list(evens(8)), three())
    `
  ]
});

extra({
  id: 'errors', title: 'Error message decoder', icon: '!', short: 'E',
  body: [
    p`Errors are messages, not failures. Read the **last line** first: it names the error type and gives the reason. The line above it shows where it happened. Find yours below.`,
    table(['Error', 'What it means', 'Typical fix'], [
      ['«SyntaxError: invalid syntax» / «expected \':\'»', 'The code is not valid Python', 'Check the line shown and the one before it: missing «:», unclosed bracket or quote, «=» instead of «==»'],
      ['«IndentationError: expected an indented block»', 'A block after «:» has no indented lines, or indentation is inconsistent', 'Indent the block with 4 spaces; do not mix tabs and spaces'],
      ['«NameError: name \'x\' is not defined»', 'You used a name Python does not know', 'Check spelling and capitals; make sure the variable is assigned before use; import modules'],
      ['«TypeError: can only concatenate str (not "int") to str»', 'Mixing text and numbers with «+»', 'Use an f-string, or «str(n)»'],
      ['«TypeError: \'NoneType\' object is not subscriptable»', 'A variable is «None», often from a function that does not return, or «x = list.sort()»', 'Add the missing «return»; do not assign the result of in-place methods'],
      ['«TypeError: f() takes 2 positional arguments but 3 were given»', 'Wrong number of arguments', 'Check the function signature; in a class, did you forget «self»?'],
      ['«ValueError: invalid literal for int() with base 10»', '«int()» got text that is not a whole number', 'Validate input; use «try/except ValueError»; use «float()» for decimals'],
      ['«IndexError: list index out of range»', 'Index ≥ length (remember indexes start at 0)', 'Loop with «for item in items» or «range(len(items))»; check for empty lists'],
      ['«KeyError: \'name\'»', 'The dictionary has no such key', 'Check spelling; use «d.get(key, default)» or «if key in d»'],
      ['«AttributeError: \'list\' object has no attribute \'push\'»', 'That type has no such method/attribute', 'Check the method name with «dir(obj)» (lists use «append»)'],
      ['«ZeroDivisionError: division by zero»', 'Dividing by 0', 'Check the divisor first, e.g. «if count:»'],
      ['«UnboundLocalError: cannot access local variable»', 'You assign to a variable inside a function that you also read from the outer scope', 'Pass it in as a parameter and return the new value'],
      ['«RecursionError: maximum recursion depth exceeded»', 'A recursive function never reaches its base case', 'Check the base case and that each call gets closer to it'],
      ['«FileNotFoundError»', 'The path does not exist from where the script runs', 'Check the current folder («os.getcwd()»), spelling and extension'],
      ['«ModuleNotFoundError: No module named \'x\'»', 'The package is not installed in this environment', 'Activate your venv, then «pip install x»; check you did not name your file like the module']
    ]),
    section('practice', 'Fix these programs'),
    code('Each of these has one bug. Fix them one at a time.', { err: true })`
      # 1. Fix the f-string so it prints: Total: 15
      a = 5
      b = 10
      print("Total: {a + b}")

      # 2. Fix the TypeError
      age = 20
      print("Next year: " + age + 1)

      # 3. Fix the IndexError (print the last item)
      items = ["pen", "book", "bag"]
      print(items[3])
    `,
    note('tip', 'A debugging routine that always works')`1. Read the last line of the error. 2. Go to the line number it gives. 3. Print the values of the variables on that line just before it («print(repr(x), type(x))»). 4. Compare what you see with what you expected. 5. Change one thing at a time and run again. When that is not enough, explain the code line by line to someone else, or to a rubber duck: this works surprisingly often.`
  ]
});

extra({
  id: 'glossary', title: 'Glossary', icon: 'A', short: 'G',
  body: [
    p`Key terms from the course, in alphabetical order.`,
    table(['Term', 'Meaning', 'Lesson'], [
      ['Algorithm', 'A precise, finite sequence of steps that solves a problem', '6.4'],
      ['Argument / parameter', 'Value passed in a call / name that receives it in a definition', '3.1'],
      ['Attribute', 'A value stored on an object, accessed with a dot', '4.1'],
      ['Big-O', 'How an algorithm\'s work grows with input size', '1.8, 6.4'],
      ['Boolean', 'The type with values «True» and «False»', '1.5'],
      ['Class / instance', 'A blueprint for objects / one object built from it', '4.1'],
      ['Closure', 'An inner function that remembers variables of its enclosing function', '3.4'],
      ['Comprehension', 'Compact syntax that builds a list/dict/set from an iterable', '2.6'],
      ['Context manager', 'Object used with «with» that guarantees setup and cleanup', '5.3'],
      ['Decorator', 'A function that takes and returns a function, applied with «@»', '5.2'],
      ['Dictionary', 'Mapping from unique keys to values (a hash table)', '2.4'],
      ['Docstring', 'String literal at the start of a function/class/module that documents it', '3.1'],
      ['Dunder method', 'Special method like «__init__» or «__add__» that Python calls for you', '4.5'],
      ['Encapsulation', 'Bundling data with methods and controlling how it changes', '4.4'],
      ['Exception', 'An error raised while a program runs; can be caught with «try»', '3.6'],
      ['Expression / statement', 'Code that produces a value / code that performs an action', '1.1'],
      ['f-string', 'String literal with «{expressions}» inside, prefixed by «f»', '1.1'],
      ['Generator', 'Function using «yield» that produces values lazily, one at a time', '5.1'],
      ['Hashable', 'Has a fixed hash value; can be a dict key or set member', '2.3'],
      ['Immutable', 'Cannot be changed after creation (str, int, tuple)', '1.3, 2.2'],
      ['Inheritance', 'Creating a class that reuses and extends another class', '4.3'],
      ['Interpreter', 'The program that executes Python code', '0.1'],
      ['Iterable / iterator', 'Something you can loop over / the object producing its items', '5.1'],
      ['JSON', 'Text format for structured data used by web APIs and config files', '3.7'],
      ['Lambda', 'Small anonymous function written in one expression', '3.4'],
      ['List', 'Ordered, mutable sequence', '2.1'],
      ['Method', 'A function defined in a class and called on an object', '4.1'],
      ['Module / package', 'A «.py» file / a folder of modules', '3.5'],
      ['Mutable', 'Can be changed in place (list, dict, set)', '2.2'],
      ['Polymorphism', 'Different types responding to the same operation in their own way', '4.3'],
      ['Property', 'Attribute whose reads/writes run methods, defined with «@property»', '4.4'],
      ['Recursion', 'A function calling itself on a smaller version of the problem', '3.3'],
      ['Reference', 'A name pointing to an object in memory', '1.1, 2.2'],
      ['Regular expression', 'Pattern language for matching text', '5.5'],
      ['REPL', 'Read–Eval–Print Loop: the interactive «>>>» prompt', '0.2'],
      ['Scope', 'The region of code where a name is visible (LEGB)', '3.3'],
      ['Set', 'Unordered collection of unique items', '2.5'],
      ['Slice', '«seq[start:stop:step]»: a portion of a sequence', '1.3'],
      ['Tuple', 'Ordered, immutable sequence', '2.3'],
      ['Type hint', 'Annotation describing expected types, checked by tools', '5.4'],
      ['Virtual environment', 'Isolated per-project Python installation', '5.6']
    ])
  ]
});
