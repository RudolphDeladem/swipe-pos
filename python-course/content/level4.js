/* Level 4: Object-oriented programming */
level({
  id: 'L4', num: 4, title: 'Object-Oriented Programming', tag: 'Intermediate',
  blurb: 'Model the world with classes and objects: attributes, methods, inheritance, polymorphism, encapsulation, special methods and dataclasses.',
  outcomes: ['Design classes with attributes and methods', 'Use class attributes, class methods and static methods', 'Reuse code with inheritance and «super()»', 'Apply polymorphism and abstract base classes', 'Protect object state with properties', 'Make objects behave like built-ins with dunder methods', 'Write concise data classes and enums']
});

/* ------------------------------------------------------------------ 4.1 */
lesson({
  id: 'classes', level: 'L4', title: 'Classes and objects', minutes: 65,
  keywords: 'class object instance init self attribute method oop',
  goals: ['Explain classes, objects (instances), attributes and methods', 'Write «__init__» and understand «self»', 'Create several independent objects from one class', 'Add a readable «__str__» and «__repr__»', 'Decide when a class is better than a dictionary'],
  body: [
    section('learn', 'Why objects?'),
    p`So far data (variables, dictionaries) and behaviour (functions) have lived separately. In the Level 2 project, a student was a dictionary and the functions that worked on students were scattered around the program. Nothing stopped you from writing «student["gpaa"] = 4» by mistake.

    **Object-oriented programming** (OOP) bundles data and the functions that operate on it into one unit: an **object**. A **class** is the blueprint; an **object** (or **instance**) is a thing built from the blueprint. «str», «list» and «dict» are classes; «"hello"» is an instance of «str». You have been using objects all along: «"hello".upper()» calls the «upper» method of a string object.`,
    table(['Term', 'Meaning', 'Example'], [
      ['Class', 'a blueprint / a new type', '«Student»'],
      ['Object / instance', 'one thing made from the class', '«ama = Student("Ama", "CS")»'],
      ['Attribute', 'data stored on an object', '«ama.name»'],
      ['Method', 'a function defined in a class, called on an object', '«ama.add_mark("MATH", 78)»'],
      ['Constructor', 'the «__init__» method that sets up a new object', '«def __init__(self, name, programme):»']
    ]),
    section('learn', 'Your first class'),
    code('Defining a class')`
      class Student:
          def __init__(self, name, programme):
              self.name = name                 # instance attributes
              self.programme = programme
              self.marks = {}

          def add_mark(self, course, mark):
              self.marks[course] = mark

          def average(self):
              if not self.marks:
                  return 0.0
              return sum(self.marks.values()) / len(self.marks)

      ama = Student("Ama Owusu", "Computer Science")
      kofi = Student("Kofi Mensah", "Law")

      ama.add_mark("CSCD101", 88)
      ama.add_mark("MATH121", 76)
      kofi.add_mark("LAWS101", 70)

      print(ama.name, "-", round(ama.average(), 1))
      print(kofi.name, "-", kofi.average())
      print(type(ama))
    `,
    p`Step by step: «class Student:» creates a new type. Calling «Student("Ama Owusu", "Computer Science")» creates a new empty object and then calls «__init__» on it with those arguments. Inside «__init__», «self.name = name» stores the value **on that particular object**. Every method receives the object as its first parameter, by convention called «self».

    «ama.add_mark("CSCD101", 88)» is really «Student.add_mark(ama, "CSCD101", 88)»: Python passes «ama» as «self» automatically. That is how one method definition works for every student: «self» is whichever object the method was called on.`,
    code('Objects are independent')`
      class Counter:
          def __init__(self, start=0):
              self.value = start

          def increment(self, step=1):
              self.value += step
              return self.value

      a = Counter()
      b = Counter(100)
      a.increment()
      a.increment()
      b.increment(10)
      print(a.value, b.value)
    `,
    section('learn', 'Printing objects: __str__ and __repr__'),
    code('Without and with string methods')`
      class Course:
          def __init__(self, code, title, credits):
              self.code = code
              self.title = title
              self.credits = credits

      c = Course("CSCD101", "Intro to Programming", 3)
      print(c)                      # default: <__main__.Course object at 0x...>

      class Course:
          def __init__(self, code, title, credits):
              self.code = code
              self.title = title
              self.credits = credits

          def __str__(self):        # for end users: print(), str()
              return f"{self.code}: {self.title} ({self.credits} credits)"

          def __repr__(self):       # for developers: the REPL, lists, debugging
              return f"Course({self.code!r}, {self.title!r}, {self.credits!r})"

      c = Course("CSCD101", "Intro to Programming", 3)
      print(c)
      print([c])                    # containers use repr
      print(repr(c))
    `,
    p`«__str__» is the friendly text shown by «print». «__repr__» is the unambiguous developer view; ideally it looks like the code that would recreate the object. If you only write one, write «__repr__»: «print» falls back to it. Methods with double underscores on both sides are called **dunder** (double underscore) or **special** methods. You will write many more in lesson 4.5.`,
    section('learn', 'Class or dictionary?'),
    p`Use a **dictionary** for simple data you just look up, especially data loaded from JSON. Use a **class** when the data has **behaviour** (methods), **rules** that must always hold (a balance cannot go negative), or when you will have many objects of the same shape. A class documents its own structure: anyone reading «Student» sees exactly which attributes and operations exist.`,
    note('deep', 'Going deeper · the four pillars and objects in memory')`OOP is usually described by four ideas: **encapsulation** (bundling data with methods and controlling access, lesson 4.4), **abstraction** (exposing *what* an object does and hiding *how*), **inheritance** (building new classes from existing ones, lesson 4.3) and **polymorphism** (different classes responding to the same method call in their own way, lesson 4.3). Under the hood, each instance stores its attributes in a dictionary «obj.__dict__», and methods live once on the class, not copied into every object. Try «print(vars(ama))».`,
    quiz(
      { q: 'What is «self» in a method?', o: ['A keyword that must be typed in every call', 'The object the method was called on', 'The class itself', 'A global variable'], a: 1, why: 'Python passes the instance automatically as the first argument.' },
      { q: 'When does «__init__» run?', o: ['When the class is defined', 'Each time a new object is created', 'When the program ends', 'Only when called explicitly'], a: 1, why: '«Student(...)» creates the object and calls «__init__» on it.' },
      { q: 'What does «print(obj)» call?', o: ['«__init__»', '«__str__» (or «__repr__» if there is no «__str__»)', '«__print__»', '«__len__»'], a: 1, why: '«print» converts with «str()», which uses «__str__».' },
      { q: 'Given «class A: def __init__(self): self.x = []», do two instances share «x»?', o: ['Yes', 'No, each instance gets its own list'], a: 1, why: 'Instance attributes created in «__init__» belong to each object separately.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Rectangle class', level: 'easy',
      prompt: `Write a class «Rectangle» with attributes «width» and «height», methods «area()», «perimeter()» and «is_square()», and a «__str__» returning «Rectangle 3 x 4».`,
      starter: R`
        class Rectangle:
            pass

        r = Rectangle(3, 4)
        s = Rectangle(5, 5)
        print(r)
        print(r.area(), r.perimeter(), r.is_square())
        print(s.area(), s.is_square())`,
      expect: `
        Rectangle 3 x 4
        12 14 False
        25 True`,
      hints: ['«def __init__(self, width, height):» stores both on «self».', 'Methods use «self.width» and «self.height».'],
      solution: R`
        class Rectangle:
            def __init__(self, width, height):
                self.width = width
                self.height = height

            def area(self):
                return self.width * self.height

            def perimeter(self):
                return 2 * (self.width + self.height)

            def is_square(self):
                return self.width == self.height

            def __str__(self):
                return f"Rectangle {self.width} x {self.height}"

        r = Rectangle(3, 4)
        s = Rectangle(5, 5)
        print(r)
        print(r.area(), r.perimeter(), r.is_square())
        print(s.area(), s.is_square())`
    }),
    task({
      title: 'Shopping cart', level: 'medium',
      prompt: `Write «Cart» with an «items» dict (name → [price, qty]). Methods: «add(name, price, qty=1)» (increase qty if already present), «remove(name)», «total()». Use the test code.`,
      starter: R`
        class Cart:
            pass

        cart = Cart()
        cart.add("notebook", 12.0, 3)
        cart.add("pen", 2.5)
        cart.add("pen", 2.5, 4)
        cart.add("bag", 120.0)
        cart.remove("bag")
        print(cart.items)
        print(f"Total: {cart.total():.2f}")`,
      expect: `
        {'notebook': [12.0, 3], 'pen': [2.5, 5]}
        Total: 48.50`,
      hints: ['In «add», check «if name in self.items».', '«total» sums «price * qty» over «self.items.values()».'],
      solution: R`
        class Cart:
            def __init__(self):
                self.items = {}

            def add(self, name, price, qty=1):
                if name in self.items:
                    self.items[name][1] += qty
                else:
                    self.items[name] = [price, qty]

            def remove(self, name):
                self.items.pop(name, None)

            def total(self):
                return sum(price * qty for price, qty in self.items.values())

        cart = Cart()
        cart.add("notebook", 12.0, 3)
        cart.add("pen", 2.5)
        cart.add("pen", 2.5, 4)
        cart.add("bag", 120.0)
        cart.remove("bag")
        print(cart.items)
        print(f"Total: {cart.total():.2f}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Bank account class',
      brief: `Design a «BankAccount» class for a student bank. It must enforce the rules of a real account in its methods, so no outside code can put it into an invalid state, and keep a full transaction history.`,
      reqs: ['Attributes: «owner», «number», «balance» (starts at 0 or an opening deposit), and «history» (list of tuples «(kind, amount, balance_after)»)', '«deposit(amount)»: positive amounts only, otherwise raise «ValueError»', '«withdraw(amount)»: positive and not more than the balance, otherwise raise «ValueError» with a clear message', '«transfer(other, amount)»: withdraws from this account and deposits into the other; if the withdrawal fails nothing changes', '«statement()»: returns a multi-line string of the history', '«__repr__» showing owner, number and balance'],
      starter: R`
        class BankAccount:
            def __init__(self, owner, number, opening=0.0):
                pass
        `,
      solution: R`
        class BankAccount:
            def __init__(self, owner, number, opening=0.0):
                self.owner = owner
                self.number = number
                self.balance = 0.0
                self.history = []
                if opening:
                    self.deposit(opening)

            def deposit(self, amount):
                if amount <= 0:
                    raise ValueError("deposit must be positive")
                self.balance += amount
                self.history.append(("deposit", amount, self.balance))

            def withdraw(self, amount):
                if amount <= 0:
                    raise ValueError("withdrawal must be positive")
                if amount > self.balance:
                    raise ValueError(f"insufficient funds: balance {self.balance:.2f}, requested {amount:.2f}")
                self.balance -= amount
                self.history.append(("withdraw", amount, self.balance))

            def transfer(self, other, amount):
                self.withdraw(amount)          # raises before anything changes if invalid
                other.deposit(amount)
                self.history[-1] = ("transfer out", amount, self.balance)
                other.history[-1] = ("transfer in", amount, other.balance)

            def statement(self):
                lines = [f"Statement for {self.owner} ({self.number})"]
                for kind, amount, after in self.history:
                    lines.append(f"  {kind:<13}{amount:>9.2f}{after:>11.2f}")
                return "\n".join(lines)

            def __repr__(self):
                return f"BankAccount({self.owner!r}, {self.number!r}, balance={self.balance:.2f})"


        ama = BankAccount("Ama", "ACC-001", 500)
        kofi = BankAccount("Kofi", "ACC-002")
        ama.withdraw(120)
        ama.transfer(kofi, 200)
        for action in (lambda: kofi.withdraw(1000), lambda: ama.deposit(-5)):
            try:
                action()
            except ValueError as e:
                print("Refused:", e)
        print(ama.statement())
        print(kofi.statement())
        print([ama, kofi])`,
      explain: `The constructor reuses «deposit» for the opening balance, so validation and history happen in one place. «transfer» calls «withdraw» first: if it raises, the exception leaves «transfer» before «deposit» runs, so money is never created or lost. Making invalid states impossible through methods is what **encapsulation** means in practice. In lesson 4.4 you will also stop outside code from writing «ama.balance = 1_000_000» directly.`
    })
  ]
});

/* ------------------------------------------------------------------ 4.2 */
lesson({
  id: 'class-members', level: 'L4', title: 'Class attributes, class methods and static methods', minutes: 45,
  keywords: 'class attribute instance attribute classmethod staticmethod alternative constructor',
  goals: ['Tell class attributes from instance attributes', 'Write «@classmethod» alternative constructors', 'Use «@staticmethod» for helpers that belong to a class', 'Avoid the shared mutable class attribute bug'],
  body: [
    section('learn', 'Class attributes are shared'),
    code('Data that belongs to the class, not to one object')`
      class Student:
          university = "University of Ghana"     # class attribute: shared by all
          count = 0

          def __init__(self, name):
              self.name = name                    # instance attribute: per object
              Student.count += 1
              self.student_number = Student.count

      a = Student("Ama")
      b = Student("Kofi")
      print(a.university, b.university)
      print(Student.count, a.student_number, b.student_number)

      Student.university = "UG"                   # change for everyone
      print(a.university)
      a.university = "KNUST"                      # creates an INSTANCE attribute that hides the class one
      print(a.university, b.university, Student.university)
    `,
    p`When you read «obj.attr», Python looks on the **instance** first, then on the **class**. Assigning «obj.attr = ...» always writes to the instance. Use class attributes for constants and data genuinely shared by all objects, such as a counter of objects created.`,
    note('warn', 'Mutable class attributes')`«class Team: members = []» creates **one** list shared by every team. «team_a.members.append("Ama")» adds Ama to every team. This is the class-level version of the mutable default argument trap; create mutable attributes in «__init__» with «self.members = []».`,
    section('learn', '@classmethod: alternative constructors'),
    code('Building objects from other formats')`
      from datetime import date

      class Student:
          def __init__(self, name, birth_year):
              self.name = name
              self.birth_year = birth_year

          @classmethod
          def from_csv(cls, line):
              name, year = line.split(",")
              return cls(name.strip(), int(year))      # cls is Student (or a subclass)

          @classmethod
          def from_age(cls, name, age, today=date(2026, 10, 27)):
              return cls(name, today.year - age)

          def __repr__(self):
              return f"Student({self.name!r}, {self.birth_year})"

      print(Student.from_csv("Esi Boateng, 2005"))
      print(Student.from_age("Yaw", 20))
    `,
    p`A **class method** receives the class («cls») instead of an instance. Its main use is **alternative constructors**: different ways to build an object (from a CSV line, from JSON, from an age). The standard library does this too: «datetime.fromisoformat("2026-10-27")», «dict.fromkeys(["a", "b"], 0)».`,
    section('learn', '@staticmethod: helpers that need neither'),
    code('A related utility function')`
      class Validator:
          @staticmethod
          def is_valid_email(text):
              return "@" in text and "." in text.split("@")[-1]

          @staticmethod
          def is_valid_id(text):
              return len(text) == 8 and text.isdigit()

      print(Validator.is_valid_email("ama@st.ug.edu.gh"), Validator.is_valid_email("ama@ug"))
      print(Validator.is_valid_id("10982341"), Validator.is_valid_id("1098"))
    `,
    p`A **static method** receives neither «self» nor «cls»: it is a plain function placed inside the class because it logically belongs there. If a helper does not need the class at all, a module-level function is often just as good.`,
    table(['Kind', 'First parameter', 'Can access', 'Typical use'], [
      ['instance method', '«self»', 'the object and its class', 'most behaviour'],
      ['«@classmethod»', '«cls»', 'the class', 'alternative constructors, class-wide settings'],
      ['«@staticmethod»', 'none', 'only its arguments', 'related helper functions']
    ]),
    quiz(
      { q: 'With «class A: x = 1», «a = A()», «a.x = 5», what is «A.x»?', o: ['1', '5', 'An error'], a: 0, why: 'Assigning on the instance creates an instance attribute; the class attribute is unchanged.' },
      { q: 'What does a classmethod receive as its first argument?', o: ['The instance', 'The class', 'Nothing', 'The module'], a: 1, why: 'By convention it is named «cls».' },
      { q: 'Which is the classic use for a classmethod?', o: ['Alternative constructors', 'Private attributes', 'Operator overloading', 'Making a method faster'], a: 0, why: '«cls(...)» builds and returns an instance.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Temperature with alternative constructors', level: 'medium',
      prompt: `Write «Temperature» storing «celsius». Add class methods «from_fahrenheit(f)» and «from_kelvin(k)», and a method «fahrenheit()». Use the test code.`,
      starter: R`
        class Temperature:
            pass

        t1 = Temperature(25)
        t2 = Temperature.from_fahrenheit(98.6)
        t3 = Temperature.from_kelvin(273.15)
        print(round(t1.fahrenheit(), 1), round(t2.celsius, 1), round(t3.celsius, 1))`,
      expect: `77.0 37.0 0.0`,
      hints: ['«return cls((f - 32) * 5 / 9)»', '«return cls(k - 273.15)»'],
      solution: R`
        class Temperature:
            def __init__(self, celsius):
                self.celsius = celsius

            @classmethod
            def from_fahrenheit(cls, f):
                return cls((f - 32) * 5 / 9)

            @classmethod
            def from_kelvin(cls, k):
                return cls(k - 273.15)

            def fahrenheit(self):
                return self.celsius * 9 / 5 + 32

        t1 = Temperature(25)
        t2 = Temperature.from_fahrenheit(98.6)
        t3 = Temperature.from_kelvin(273.15)
        print(round(t1.fahrenheit(), 1), round(t2.celsius, 1), round(t3.celsius, 1))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Auto-numbered library items',
      brief: `Create a «Book» class where every book automatically receives a unique accession number like «LIB-0001», «LIB-0002»…, can be created from an ISBN-style CSV line, and validates ISBN-10 check digits with a static method.`,
      reqs: ['A class attribute counter used to generate the accession number in «__init__»', 'A class attribute «PREFIX = "LIB"» used in the number format (zero-padded to 4 digits)', '«@classmethod from_line(cls, line)» for lines like «"0-306-40615-2, Some Title, Author Name"»', '«@staticmethod valid_isbn10(isbn)»: remove hyphens; the sum of digitᵢ × (10 − i) for i = 0…9 must be divisible by 11 (an «X» as last digit means 10)', 'Raise «ValueError» for an invalid ISBN in «__init__»', 'Demonstrate with three valid books and one invalid one'],
      starter: R`
        class Book:
            PREFIX = "LIB"
            _count = 0
        `,
      solution: R`
        class Book:
            PREFIX = "LIB"
            _count = 0

            def __init__(self, isbn, title, author):
                if not Book.valid_isbn10(isbn):
                    raise ValueError(f"invalid ISBN-10: {isbn}")
                Book._count += 1
                self.accession = f"{Book.PREFIX}-{Book._count:04d}"
                self.isbn = isbn
                self.title = title
                self.author = author

            @classmethod
            def from_line(cls, line):
                isbn, title, author = (part.strip() for part in line.split(","))
                return cls(isbn, title, author)

            @staticmethod
            def valid_isbn10(isbn):
                digits = isbn.replace("-", "").upper()
                if len(digits) != 10 or not digits[:9].isdigit() or not (digits[9].isdigit() or digits[9] == "X"):
                    return False
                total = 0
                for i, ch in enumerate(digits):
                    value = 10 if ch == "X" else int(ch)
                    total += value * (10 - i)
                return total % 11 == 0

            def __repr__(self):
                return f"{self.accession} {self.title} by {self.author} [{self.isbn}]"


        lines = [
            "0-306-40615-2, A Book on Numbers, J. Smith",
            "0-19-852663-6, Oxford Science Text, A. Author",
            "0-8044-2957-X, Literature Anthology, B. Writer",
            "0-306-40615-3, Typo Edition, C. Careless",
        ]
        for line in lines:
            try:
                print(Book.from_line(line))
            except ValueError as e:
                print("Rejected:", e)
        print("Books created:", Book._count)`,
      explain: `Check digits catch common typing mistakes: a single wrong digit or two swapped adjacent digits always changes the weighted sum modulo 11. The counter only increases after validation succeeds, so a rejected book does not use up a number. The leading underscore in «_count» signals "internal, do not touch from outside", which leads into the next lesson.`
    })
  ]
});

/* ------------------------------------------------------------------ 4.3 */
lesson({
  id: 'inheritance', level: 'L4', title: 'Inheritance and polymorphism', minutes: 70,
  keywords: 'inheritance subclass super override polymorphism abstract base class abc isinstance mro composition',
  goals: ['Create subclasses that inherit and extend behaviour', 'Override methods and call the parent with «super()»', 'Use polymorphism to treat different objects uniformly', 'Define abstract base classes', 'Choose between inheritance and composition'],
  body: [
    section('learn', 'Is-a relationships'),
    p`**Inheritance** creates a new class (the **subclass** or child) from an existing one (the **superclass**, parent or base). The child automatically has all the parent's attributes and methods, and can add new ones or **override** existing ones. Use it for genuine "is-a" relationships: a «Lecturer» **is a** «Person»; a «SavingsAccount» **is a** «BankAccount».`,
    code('Inheriting and extending')`
      class Person:
          def __init__(self, name, email):
              self.name = name
              self.email = email

          def describe(self):
              return f"{self.name} <{self.email}>"

      class Student(Person):                       # Student inherits from Person
          def __init__(self, name, email, programme):
              super().__init__(name, email)        # let Person set name and email
              self.programme = programme

          def describe(self):                      # override
              return super().describe() + f", studies {self.programme}"

      class Lecturer(Person):
          def __init__(self, name, email, department):
              super().__init__(name, email)
              self.department = department

          def describe(self):
              return f"Dr {self.name} ({self.department})"

      people = [Student("Ama", "ama@st.ug.edu.gh", "CS"),
                Lecturer("Boateng", "kboateng@ug.edu.gh", "Computer Science"),
                Person("Visitor", "guest@example.com")]
      for p in people:
          print(p.describe())

      s = people[0]
      print(isinstance(s, Student), isinstance(s, Person), isinstance(s, Lecturer))
      print(issubclass(Lecturer, Person))
    `,
    p`«super()» returns a proxy to the parent class, so «super().__init__(name, email)» runs the parent's constructor on this object. Always call it when the child has its own «__init__», otherwise the parent's attributes are never set. Calling «super().describe()» inside an override **extends** the parent's behaviour instead of replacing it.`,
    section('learn', 'Polymorphism'),
    p`In the loop above, «p.describe()» calls a *different* method depending on the object's actual class. The loop does not check types; it just asks every object to describe itself. This is **polymorphism** ("many forms"): one interface, many implementations. It lets you add new kinds of objects without changing the code that uses them.`,
    code('Shapes: one interface, many forms')`
      import math

      class Shape:
          def area(self):
              raise NotImplementedError("subclasses must implement area()")

          def __str__(self):
              return f"{type(self).__name__} with area {self.area():.2f}"

      class Circle(Shape):
          def __init__(self, r):
              self.r = r
          def area(self):
              return math.pi * self.r ** 2

      class Rectangle(Shape):
          def __init__(self, w, h):
              self.w, self.h = w, h
          def area(self):
              return self.w * self.h

      class Square(Rectangle):              # a Square is a Rectangle
          def __init__(self, side):
              super().__init__(side, side)

      shapes = [Circle(1), Rectangle(2, 3), Square(4)]
      for s in shapes:
          print(s)
      print("Total area:", round(sum(s.area() for s in shapes), 2))
      print(Square.__mro__)
    `,
    section('learn', 'Abstract base classes'),
    code('Forcing subclasses to implement methods')`
      from abc import ABC, abstractmethod

      class PaymentMethod(ABC):
          @abstractmethod
          def pay(self, amount):
              """Pay the amount and return a receipt string."""

          def checkout(self, amount):
              print("Processing...", self.pay(amount))

      class MobileMoney(PaymentMethod):
          def __init__(self, number):
              self.number = number
          def pay(self, amount):
              return f"{amount:.2f} paid from MoMo {self.number}"

      class Card(PaymentMethod):
          def __init__(self, last4):
              self.last4 = last4
          def pay(self, amount):
              return f"{amount:.2f} charged to card ending {self.last4}"

      for method in [MobileMoney("024xxxx567"), Card("4821")]:
          method.checkout(150)

      try:
          PaymentMethod()
      except TypeError:
          print("Cannot create an abstract PaymentMethod directly")
    `,
    p`An **abstract base class** (ABC) defines an interface: methods marked «@abstractmethod» must be implemented by every concrete subclass, or creating an instance fails with «TypeError». This catches the mistake early instead of when the missing method is finally called.`,
    section('learn', 'Composition: has-a'),
    code('Building objects out of other objects')`
      class Engine:
          def __init__(self, horsepower):
              self.horsepower = horsepower
          def start(self):
              return f"{self.horsepower} hp engine started"

      class Car:
          def __init__(self, model, engine):
              self.model = model
              self.engine = engine           # a Car HAS an Engine
          def drive(self):
              return f"{self.model}: {self.engine.start()}, driving"

      print(Car("Corolla", Engine(130)).drive())
    `,
    p`**Composition** means an object holds other objects as attributes. A car **has an** engine; it is not a kind of engine. A common design principle is "favour composition over inheritance": inheritance couples classes tightly, while composition lets you swap parts (an electric engine) without changing the car class. Use inheritance for true is-a hierarchies, composition for everything else.`,
    note('deep', 'Going deeper · MRO and the Liskov substitution principle')`Python supports **multiple inheritance** («class C(A, B):»). It decides which parent's method to use with the **Method Resolution Order** (MRO), computed by the C3 linearisation algorithm and visible as «Class.__mro__». «super()» follows the MRO, not simply "the parent", which is what makes cooperative multiple inheritance work. The **Liskov Substitution Principle** (the L in SOLID) says that anywhere a parent object is used, a child object should work without surprises. The classic violation is a «Square» subclass of a mutable «Rectangle»: setting the width of a square must also change its height, breaking code that expects rectangles' sides to be independent.`,
    quiz(
      { q: 'What does «super().__init__(...)» do?', o: ['Creates a new parent object', 'Runs the parent class constructor on the current object', 'Deletes the parent', 'Calls «__init__» of every class'], a: 1, why: 'It initialises the inherited part of this object.' },
      { q: 'What is polymorphism?', o: ['Having many attributes', 'Different classes responding to the same method call in their own way', 'A class with many parents', 'Copying objects'], a: 1, why: 'Same interface, different implementations.' },
      { q: 'What happens when you instantiate an ABC with an unimplemented abstract method?', o: ['It works', '«TypeError»', '«NotImplementedError» when the method is called', '«AttributeError»'], a: 1, why: 'ABCs refuse to create incomplete objects.' },
      { q: 'A «Library» contains many «Book»s. Best design?', o: ['«Library(Book)» inheritance', '«Book(Library)»', 'Composition: Library has a list of Books', 'Multiple inheritance'], a: 2, why: 'A library is not a kind of book: it has books.' },
      { q: 'If «Square(Rectangle)» does not override «area», what runs for «Square(3).area()»?', o: ['An error', 'Rectangle.area', 'Shape.area', 'Nothing'], a: 1, why: 'Methods are looked up along the MRO.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Employees and pay', level: 'medium',
      prompt: `Create «Employee(name)» with abstract-style «monthly_pay()», and subclasses «Salaried(name, annual)» (annual / 12) and «Hourly(name, rate, hours)» (rate × hours, with hours above 160 paid at 1.5×). Print each employee's pay with the loop given.`,
      starter: R`
        class Employee:
            pass

        staff = [Salaried("Ama", 96000), Hourly("Kofi", 50, 150), Hourly("Esi", 40, 180)]
        for e in staff:
            print(f"{e.name}: {e.monthly_pay():.2f}")`,
      expect: `
        Ama: 8000.00
        Kofi: 7500.00
        Esi: 7600.00`,
      hints: ['Define the base class and both subclasses above the test code.', 'Overtime: «extra = max(0, hours - 160)», pay = «rate * (hours - extra) + rate * 1.5 * extra».'],
      solution: R`
        class Employee:
            def __init__(self, name):
                self.name = name

            def monthly_pay(self):
                raise NotImplementedError

        class Salaried(Employee):
            def __init__(self, name, annual):
                super().__init__(name)
                self.annual = annual

            def monthly_pay(self):
                return self.annual / 12

        class Hourly(Employee):
            def __init__(self, name, rate, hours):
                super().__init__(name)
                self.rate = rate
                self.hours = hours

            def monthly_pay(self):
                extra = max(0, self.hours - 160)
                return self.rate * (self.hours - extra) + self.rate * 1.5 * extra

        staff = [Salaried("Ama", 96000), Hourly("Kofi", 50, 150), Hourly("Esi", 40, 180)]
        for e in staff:
            print(f"{e.name}: {e.monthly_pay():.2f}")`
    }),
    task({
      title: 'Savings account', level: 'medium',
      prompt: `Extend the given «Account» with «SavingsAccount(owner, rate)» that adds «add_interest()» (balance × rate) and overrides «withdraw» to refuse withdrawals that leave less than a minimum balance of 50, by printing «Minimum balance is 50». Otherwise it calls the parent's «withdraw».`,
      starter: R`
        class Account:
            def __init__(self, owner):
                self.owner = owner
                self.balance = 0

            def deposit(self, amount):
                self.balance += amount

            def withdraw(self, amount):
                self.balance -= amount

        # your SavingsAccount here

        s = SavingsAccount("Ama", 0.05)
        s.deposit(1000)
        s.add_interest()
        s.withdraw(1000)
        s.withdraw(980)
        print(s.balance)`,
      expect: `
        Minimum balance is 50
        50.0`,
      hints: ['«if self.balance - amount < 50: print(...)», else «super().withdraw(amount)».'],
      solution: R`
        class Account:
            def __init__(self, owner):
                self.owner = owner
                self.balance = 0

            def deposit(self, amount):
                self.balance += amount

            def withdraw(self, amount):
                self.balance -= amount

        class SavingsAccount(Account):
            MINIMUM = 50

            def __init__(self, owner, rate):
                super().__init__(owner)
                self.rate = rate

            def add_interest(self):
                self.balance += self.balance * self.rate

            def withdraw(self, amount):
                if self.balance - amount < self.MINIMUM:
                    print(f"Minimum balance is {self.MINIMUM}")
                else:
                    super().withdraw(amount)

        s = SavingsAccount("Ama", 0.05)
        s.deposit(1000)
        s.add_interest()
        s.withdraw(1000)
        s.withdraw(980)
        print(s.balance)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'University people management',
      brief: `Model the people of a university department with an inheritance hierarchy and composition, and use polymorphism to produce reports without any «if type == ...» checks.`,
      reqs: ['Abstract base class «Member(ABC)» with «name», «email» and abstract methods «role()» and «monthly_cost()»', '«Student» (fees paid per semester → monthly cost negative, i.e. income: −fees / 6), «Lecturer» (salary / 12), «TeachingAssistant(Student)» (a student who also receives a stipend; cost = stipend − fees / 6)', '«Department» **has** a list of members (composition) with «add(member)», «payroll()» (sum of monthly costs) and «by_role()» (dict role → names)', '«Department.report()» prints every member using only «role()» and «monthly_cost()» (no type checks)', 'Show the MRO of «TeachingAssistant»'],
      starter: R`
        from abc import ABC, abstractmethod

        class Member(ABC):
            def __init__(self, name, email):
                self.name = name
                self.email = email
        `,
      solution: R`
        from abc import ABC, abstractmethod


        class Member(ABC):
            def __init__(self, name, email):
                self.name = name
                self.email = email

            @abstractmethod
            def role(self):
                ...

            @abstractmethod
            def monthly_cost(self):
                ...


        class Student(Member):
            def __init__(self, name, email, fees):
                super().__init__(name, email)
                self.fees = fees

            def role(self):
                return "Student"

            def monthly_cost(self):
                return -self.fees / 6


        class Lecturer(Member):
            def __init__(self, name, email, salary):
                super().__init__(name, email)
                self.salary = salary

            def role(self):
                return "Lecturer"

            def monthly_cost(self):
                return self.salary / 12


        class TeachingAssistant(Student):
            def __init__(self, name, email, fees, stipend):
                super().__init__(name, email, fees)
                self.stipend = stipend

            def role(self):
                return "Teaching assistant"

            def monthly_cost(self):
                return self.stipend + super().monthly_cost()


        class Department:
            def __init__(self, name):
                self.name = name
                self.members = []

            def add(self, member):
                self.members.append(member)
                return self

            def payroll(self):
                return sum(m.monthly_cost() for m in self.members)

            def by_role(self):
                groups = {}
                for m in self.members:
                    groups.setdefault(m.role(), []).append(m.name)
                return groups

            def report(self):
                print(f"Department of {self.name}")
                for m in sorted(self.members, key=lambda m: m.role()):
                    print(f"  {m.role():<20}{m.name:<10}{m.monthly_cost():>10.2f}")
                print(f"  {'Net monthly cost':<30}{self.payroll():>10.2f}")


        cs = Department("Computer Science")
        cs.add(Lecturer("Boateng", "kb@ug.edu.gh", 144000)) \
          .add(Student("Ama", "ama@st.ug.edu.gh", 4800)) \
          .add(Student("Kofi", "kofi@st.ug.edu.gh", 4800)) \
          .add(TeachingAssistant("Esi", "esi@st.ug.edu.gh", 3600, 1500))
        cs.report()
        print(cs.by_role())
        print([c.__name__ for c in TeachingAssistant.__mro__])`,
      explain: `«TeachingAssistant.monthly_cost» reuses the student calculation through «super()», so the fee rule lives in exactly one place. «add» returns «self», which allows **method chaining** («.add(...).add(...)»); the backslashes continue the statement onto the next line. The report and payroll work for any future member type (say «Administrator») without a single change: this is polymorphism paying off.`
    })
  ]
});

/* ------------------------------------------------------------------ 4.4 */
lesson({
  id: 'encapsulation', level: 'L4', title: 'Encapsulation and properties', minutes: 45,
  keywords: 'encapsulation private underscore property getter setter validation name mangling',
  goals: ['Follow Python\'s conventions for internal attributes', 'Use «@property» for computed and validated attributes', 'Write setters that enforce invariants', 'Understand name mangling with double underscores'],
  body: [
    section('learn', 'Public, internal and "private"'),
    p`Python has no truly private attributes. Instead it uses naming conventions that every Python programmer respects:`,
    table(['Name', 'Meaning'], [
      ['«balance»', 'public: part of the class\'s interface, use freely'],
      ['«_balance»', 'internal: an implementation detail; outside code should not touch it'],
      ['«__balance»', 'name-mangled to «_ClassName__balance» to avoid clashes in subclasses'],
      ['«__init__»', 'special (dunder) method: defined by Python, not private']
    ]),
    p`Python's philosophy is "we are all consenting adults": the underscore tells others "this may change, rely on it at your own risk". The real protection comes from designing a good public interface.`,
    section('learn', 'Properties: attributes with logic'),
    code('A computed, read-only property')`
      class Circle:
          def __init__(self, radius):
              self.radius = radius

          @property
          def area(self):                 # accessed like an attribute, computed each time
              return 3.14159 * self.radius ** 2

      c = Circle(2)
      print(c.area)                       # no brackets
      c.radius = 3
      print(c.area)                       # always up to date
      try:
          c.area = 10
      except AttributeError:
          print("area is read-only")
    `,
    code('Validation with a setter')`
      class Student:
          def __init__(self, name, gpa):
              self.name = name
              self.gpa = gpa              # goes through the setter below!

          @property
          def gpa(self):
              return self._gpa

          @gpa.setter
          def gpa(self, value):
              if not 0.0 <= value <= 4.0:
                  raise ValueError(f"GPA must be between 0 and 4, got {value}")
              self._gpa = round(value, 2)

      s = Student("Ama", 3.456)
      print(s.gpa)
      s.gpa = 3.9
      print(s.gpa)
      for bad in [4.5, -1]:
          try:
              s.gpa = bad
          except ValueError as e:
              print("Rejected:", e)
      try:
          Student("Kofi", 7)
      except ValueError as e:
          print("Rejected at creation:", e)
    `,
    p`The value is stored in «_gpa»; the public name «gpa» is a property whose getter and setter run code. Because «__init__» assigns «self.gpa», even the constructor is validated. Callers just write «s.gpa = 3.9», exactly as with a plain attribute. You can start with a plain attribute and turn it into a property later **without changing any calling code**, which is why Python does not need Java-style «get_gpa()»/«set_gpa()» methods.`,
    section('learn', 'Name mangling'),
    code('Double underscores')`
      class Account:
          def __init__(self):
              self.__pin = "2580"

          def check(self, pin):
              return pin == self.__pin

      a = Account()
      print(a.check("2580"))
      try:
          print(a.__pin)
      except AttributeError as e:
          print("AttributeError:", e)
      print(a._Account__pin)     # still reachable: mangling is not security
    `,
    note('deep', 'Going deeper · invariants and information hiding')`An **invariant** is a condition that must always be true for an object, for example "0 ≤ gpa ≤ 4" or "balance ≥ 0". Encapsulation means every path that changes the state goes through code that preserves the invariants. **Information hiding** (David Parnas, 1972) is the related idea that modules should hide design decisions likely to change behind a stable interface. Properties are Python's tool for this; under the hood they are **descriptors**, objects that customise attribute access, the same mechanism behind methods, «staticmethod» and «classmethod».`,
    quiz(
      { q: 'What does a leading single underscore («_x») mean?', o: ['Python makes it private', 'Convention: internal, do not use from outside', 'It is a constant', 'It is a class attribute'], a: 1, why: 'It is a convention only; Python does not enforce it.' },
      { q: 'How do you read a property called «area»?', o: ['«obj.area()»', '«obj.area»', '«obj.get_area()»', '«obj["area"]»'], a: 1, why: 'Properties look like attributes.' },
      { q: 'What happens when you assign to a property without a setter?', o: ['A new attribute is created', '«AttributeError»', 'The value is ignored', 'The getter is replaced'], a: 1, why: 'Without a setter the property is read-only.' },
      { q: 'Why validate in «__init__» via «self.gpa = gpa» rather than «self._gpa = gpa»?', o: ['It is faster', 'So the setter\'s checks also apply to new objects', 'It is required syntax', 'No difference'], a: 1, why: 'Assigning the property runs the validation.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Validated product price', level: 'medium',
      prompt: `Write «Product(name, price)» where «price» is a property that rejects negative values with «ValueError("price cannot be negative")», and a read-only property «price_with_vat» (price × 1.15, rounded to 2 decimals).`,
      starter: R`
        class Product:
            pass

        p = Product("Headphones", 200)
        print(p.price, p.price_with_vat)
        p.price = 150
        print(p.price_with_vat)
        try:
            p.price = -5
        except ValueError as e:
            print(e)
        print(p.price)`,
      expect: `
        200 230.0
        172.5
        price cannot be negative
        150`,
      hints: ['Store the value in «self._price».', 'Remember to assign «self.price = price» in «__init__».'],
      solution: R`
        class Product:
            def __init__(self, name, price):
                self.name = name
                self.price = price

            @property
            def price(self):
                return self._price

            @price.setter
            def price(self, value):
                if value < 0:
                    raise ValueError("price cannot be negative")
                self._price = value

            @property
            def price_with_vat(self):
                return round(self._price * 1.15, 2)

        p = Product("Headphones", 200)
        print(p.price, p.price_with_vat)
        p.price = 150
        print(p.price_with_vat)
        try:
            p.price = -5
        except ValueError as e:
            print(e)
        print(p.price)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Encapsulated bank account',
      brief: `Upgrade the bank account from lesson 4.1 so its balance can **only** change through deposits, withdrawals and transfers. Use properties for read-only and computed values.`,
      reqs: ['Store the balance in «_balance»; expose a read-only «balance» property (assigning to it raises «AttributeError»)', 'Add a read-only «transaction_count» property computed from the history', 'Make «owner» a property whose setter rejects empty or whitespace-only names', 'Add an «overdraft_limit» property (default 0, cannot be negative); withdrawals may take the balance down to «−overdraft_limit»', 'Add a computed «available» property = balance + overdraft_limit', 'Demonstrate each rule, including the failed attempt to assign «acc.balance = 1_000_000»'],
      starter: R`
        class BankAccount:
            def __init__(self, owner, overdraft_limit=0):
                pass
        `,
      solution: R`
        class BankAccount:
            def __init__(self, owner, overdraft_limit=0):
                self.owner = owner
                self.overdraft_limit = overdraft_limit
                self._balance = 0.0
                self._history = []

            @property
            def owner(self):
                return self._owner

            @owner.setter
            def owner(self, value):
                if not value or not value.strip():
                    raise ValueError("owner name cannot be empty")
                self._owner = value.strip()

            @property
            def overdraft_limit(self):
                return self._overdraft_limit

            @overdraft_limit.setter
            def overdraft_limit(self, value):
                if value < 0:
                    raise ValueError("overdraft limit cannot be negative")
                self._overdraft_limit = value

            @property
            def balance(self):
                return self._balance

            @property
            def available(self):
                return self._balance + self._overdraft_limit

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
                if amount > self.available:
                    raise ValueError(f"only {self.available:.2f} available")
                self._balance -= amount
                self._history.append(("withdraw", amount))


        acc = BankAccount("  Ama Owusu ", overdraft_limit=100)
        acc.deposit(250)
        acc.withdraw(300)
        print(acc.owner, acc.balance, acc.available, acc.transaction_count)

        attempts = [
            ("set balance", lambda: setattr(acc, "balance", 1_000_000)),
            ("withdraw too much", lambda: acc.withdraw(100)),
            ("empty owner", lambda: setattr(acc, "owner", "   ")),
            ("negative overdraft", lambda: setattr(acc, "overdraft_limit", -1)),
        ]
        for label, action in attempts:
            try:
                action()
                print(label, "-> allowed?!")
            except (AttributeError, ValueError) as e:
                print(f"{label} -> {type(e).__name__}: {e}")
        print("Balance still", acc.balance)`,
      explain: `«setattr(obj, "name", value)» does the same as «obj.name = value», which lets the demo put assignments inside lambdas. Every rule is enforced at a single point, so it is impossible to create an account that breaks them. The «owner» setter also tidies the value («strip»), a common use of setters.`
    })
  ]
});

/* ------------------------------------------------------------------ 4.5 */
lesson({
  id: 'dunder', level: 'L4', title: 'Special (dunder) methods', minutes: 55,
  keywords: 'dunder magic methods operator overloading eq lt add len getitem iter call hash',
  goals: ['Make objects comparable with «__eq__» and «__lt__»', 'Overload operators such as «+» and «*»', 'Make containers that support «len», indexing, «in» and iteration', 'Understand the link between «__eq__» and «__hash__»'],
  body: [
    section('learn', 'Python calls dunder methods for you'),
    p`Every operator and many built-in functions are shortcuts for special methods. «a + b» calls «a.__add__(b)»; «len(x)» calls «x.__len__()»; «x[i]» calls «x.__getitem__(i)»; «a == b» calls «a.__eq__(b)». By defining these methods, your own classes work with Python's syntax as naturally as lists and numbers. This is called **operator overloading**, and it is a big part of what makes libraries like NumPy and pandas feel natural.`,
    table(['You write', 'Python calls'], [
      ['«str(x)», «print(x)»', '«x.__str__()»'],
      ['«repr(x)»', '«x.__repr__()»'],
      ['«a == b», «a < b»', '«a.__eq__(b)», «a.__lt__(b)»'],
      ['«a + b», «a * b», «-a»', '«a.__add__(b)», «a.__mul__(b)», «a.__neg__()»'],
      ['«len(x)»', '«x.__len__()»'],
      ['«x[i]», «x[i] = v»', '«x.__getitem__(i)», «x.__setitem__(i, v)»'],
      ['«item in x»', '«x.__contains__(item)»'],
      ['«for i in x»', '«x.__iter__()»'],
      ['«x()»', '«x.__call__()»'],
      ['«bool(x)», «if x:»', '«x.__bool__()» (or «__len__»)'],
      ['«hash(x)», dict keys', '«x.__hash__()»']
    ]),
    section('learn', 'A vector class'),
    code('Arithmetic and comparison')`
      import math

      class Vector:
          def __init__(self, x, y):
              self.x, self.y = x, y

          def __repr__(self):
              return f"Vector({self.x}, {self.y})"

          def __add__(self, other):
              return Vector(self.x + other.x, self.y + other.y)

          def __sub__(self, other):
              return Vector(self.x - other.x, self.y - other.y)

          def __mul__(self, scalar):              # v * 3
              return Vector(self.x * scalar, self.y * scalar)

          def __rmul__(self, scalar):             # 3 * v
              return self * scalar

          def __neg__(self):
              return Vector(-self.x, -self.y)

          def __abs__(self):                      # abs(v) = length
              return math.hypot(self.x, self.y)

          def __eq__(self, other):
              return isinstance(other, Vector) and (self.x, self.y) == (other.x, other.y)

          def __bool__(self):
              return bool(self.x or self.y)

      a, b = Vector(1, 2), Vector(3, 4)
      print(a + b, b - a, a * 3, 2 * a, -a)
      print(abs(b), a == Vector(1, 2), a == b)
      print(bool(Vector(0, 0)), bool(a))
    `,
    p`«__rmul__» handles «3 * v»: Python first tries «int.__mul__(3, v)», which returns «NotImplemented» because integers know nothing about vectors, and then tries the reflected «v.__rmul__(3)».`,
    section('learn', 'Ordering'),
    code('Sorting your own objects')`
      from functools import total_ordering

      @total_ordering                      # fills in <=, >, >= from == and <
      class Grade:
          ORDER = ["F", "D", "D+", "C", "C+", "B", "B+", "A"]

          def __init__(self, letter):
              self.letter = letter

          def __eq__(self, other):
              return self.letter == other.letter

          def __lt__(self, other):
              return Grade.ORDER.index(self.letter) < Grade.ORDER.index(other.letter)

          def __repr__(self):
              return self.letter

      grades = [Grade("B"), Grade("A"), Grade("F"), Grade("C+")]
      print(sorted(grades), max(grades), Grade("B") >= Grade("C"))
    `,
    section('learn', 'Container protocol'),
    code('A playlist that behaves like a list')`
      class Playlist:
          def __init__(self, name, songs=None):
              self.name = name
              self._songs = list(songs or [])

          def __len__(self):
              return len(self._songs)

          def __getitem__(self, index):          # also enables slicing and iteration
              return self._songs[index]

          def __contains__(self, song):
              return song.lower() in (s.lower() for s in self._songs)

          def __iter__(self):
              return iter(self._songs)

          def __add__(self, other):
              return Playlist(f"{self.name} + {other.name}", self._songs + other._songs)

          def __repr__(self):
              return f"Playlist({self.name!r}, {len(self)} songs)"

      study = Playlist("Study", ["Lo-fi beats", "Rain sounds", "Piano"])
      gym = Playlist("Gym", ["Afrobeats mix", "Drill"])
      print(len(study), study[0], study[-1], study[1:])
      print("piano" in study, "Jazz" in study)
      for song in study + gym:
          print(" -", song)
      print(study + gym)
    `,
    note('deep', 'Going deeper · __eq__ and __hash__')`Objects that are equal **must** have equal hashes, otherwise sets and dicts break. So when you define «__eq__», Python sets «__hash__» to «None», making instances unhashable, unless you also define «__hash__». A safe recipe: hash a tuple of the same fields used in «__eq__», e.g. «return hash((self.x, self.y))», and only do it for objects whose fields never change after creation (immutable value objects). Frozen dataclasses (next lesson) do this for you.`,
    quiz(
      { q: 'Which method makes «len(obj)» work?', o: ['«__length__»', '«__len__»', '«__size__»', '«len»'], a: 1, why: '«len()» calls «__len__».' },
      { q: 'Why define «__rmul__»?', o: ['For «v * 3»', 'For «3 * v» when the left operand does not know your class', 'For matrix multiplication', 'It is required for «__mul__»'], a: 1, why: 'Reflected operators handle the reversed order.' },
      { q: 'What does «@total_ordering» need you to define?', o: ['All six comparisons', '«__eq__» and one of «__lt__», «__le__», «__gt__», «__ge__»', 'Only «__hash__»', '«__cmp__»'], a: 1, why: 'It derives the rest.' },
      { q: 'You defined «__eq__» but not «__hash__». What happens with «{obj}»?', o: ['Works normally', '«TypeError: unhashable type»', 'Uses «id(obj)»', 'Uses «__eq__» only'], a: 1, why: 'Defining __eq__ sets __hash__ to None.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Money class', level: 'medium',
      prompt: `Write «Money(amount, currency)» supporting «+» (only for the same currency, otherwise raise «ValueError»), «==», «<», and «__repr__» like «GHS 12.50». Use integer pesewas/cents internally to avoid float errors: store «round(amount * 100)».`,
      starter: R`
        class Money:
            pass

        a = Money(10.10, "GHS")
        b = Money(20.20, "GHS")
        print(a + b, a + b == Money(30.30, "GHS"), a < b)
        try:
            a + Money(5, "USD")
        except ValueError as e:
            print(e)`,
      expect: `
        GHS 30.30 True True
        cannot add GHS and USD`,
      hints: ['Store «self.cents = round(amount * 100)».', 'In «__add__», build the result with «Money((self.cents + other.cents) / 100, self.currency)».', '«__repr__»: «f"{self.currency} {self.cents / 100:.2f}"».'],
      solution: R`
        class Money:
            def __init__(self, amount, currency):
                self.cents = round(amount * 100)
                self.currency = currency

            def _check(self, other):
                if self.currency != other.currency:
                    raise ValueError(f"cannot add {self.currency} and {other.currency}")

            def __add__(self, other):
                self._check(other)
                return Money((self.cents + other.cents) / 100, self.currency)

            def __eq__(self, other):
                return (self.cents, self.currency) == (other.cents, other.currency)

            def __lt__(self, other):
                self._check(other)
                return self.cents < other.cents

            def __repr__(self):
                return f"{self.currency} {self.cents / 100:.2f}"

        a = Money(10.10, "GHS")
        b = Money(20.20, "GHS")
        print(a + b, a + b == Money(30.30, "GHS"), a < b)
        try:
            a + Money(5, "USD")
        except ValueError as e:
            print(e)`,
      explain: `With floats, «10.10 + 20.20 == 30.30» is «False» (it is 30.299999999999997). Integer cents make the comparison exact. This is exactly how real payment systems store money.`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'A Matrix class',
      brief: `Linear algebra appears in engineering, economics, computer graphics and machine learning. Implement a «Matrix» class with operator overloading so that matrix expressions read like maths.`,
      reqs: ['Construct from a list of rows; validate that all rows have the same length', '«__repr__» prints the rows aligned on separate lines', '«__add__» and «__sub__» (same shape required, else «ValueError»)', '«__mul__»: a number gives scalar multiplication; another Matrix gives the matrix product (inner dimensions must match)', '«__eq__», «__getitem__» with «m[i, j]» (a tuple index), a «shape» property and a «transpose()» method', '«identity(n)» as a class method; show «A * identity == A»'],
      starter: R`
        class Matrix:
            def __init__(self, rows):
                pass
        `,
      solution: R`
        class Matrix:
            def __init__(self, rows):
                if not rows or any(len(r) != len(rows[0]) for r in rows):
                    raise ValueError("all rows must have the same, non-zero length")
                self.rows = [list(r) for r in rows]

            @classmethod
            def identity(cls, n):
                return cls([[1 if i == j else 0 for j in range(n)] for i in range(n)])

            @property
            def shape(self):
                return len(self.rows), len(self.rows[0])

            def __getitem__(self, pos):
                i, j = pos
                return self.rows[i][j]

            def transpose(self):
                return Matrix([list(col) for col in zip(*self.rows)])

            def _same_shape(self, other):
                if self.shape != other.shape:
                    raise ValueError(f"shapes {self.shape} and {other.shape} differ")

            def __add__(self, other):
                self._same_shape(other)
                return Matrix([[a + b for a, b in zip(r1, r2)] for r1, r2 in zip(self.rows, other.rows)])

            def __sub__(self, other):
                self._same_shape(other)
                return Matrix([[a - b for a, b in zip(r1, r2)] for r1, r2 in zip(self.rows, other.rows)])

            def __mul__(self, other):
                if isinstance(other, (int, float)):
                    return Matrix([[x * other for x in r] for r in self.rows])
                if self.shape[1] != other.shape[0]:
                    raise ValueError(f"cannot multiply {self.shape} by {other.shape}")
                cols = list(zip(*other.rows))
                return Matrix([[sum(a * b for a, b in zip(row, col)) for col in cols] for row in self.rows])

            def __rmul__(self, scalar):
                return self * scalar

            def __eq__(self, other):
                return isinstance(other, Matrix) and self.rows == other.rows

            def __repr__(self):
                width = max(len(str(x)) for r in self.rows for x in r)
                return "\n".join("[" + " ".join(f"{x:>{width}}" for x in r) + "]" for r in self.rows)


        A = Matrix([[1, 2], [3, 4]])
        B = Matrix([[5, 6], [7, 8]])
        C = Matrix([[1, 0, 2], [0, 1, 3]])
        print(A + B, end="\n\n")
        print(A * B, end="\n\n")
        print(2 * A, end="\n\n")
        print(A * C, end="\n\n")
        print(C.transpose(), C.shape, C.transpose().shape, C[1, 2])
        print("A * I == A:", A * Matrix.identity(2) == A)
        print("AB == BA:", A * B == B * A)
        try:
            C * A
        except ValueError as e:
            print("Error:", e)`,
      explain: `«zip(*self.rows)» transposes: it pairs up the first elements of all rows, then the second elements, and so on. Each entry of the product is the dot product of a row of the left matrix with a column of the right. The output confirms that matrix multiplication is **not commutative** (AB ≠ BA). In real projects you would use NumPy, whose arrays implement exactly these dunder methods in fast C code.`
    })
  ]
});

/* ------------------------------------------------------------------ 4.6 */
lesson({
  id: 'dataclasses', level: 'L4', title: 'Dataclasses and enums', minutes: 40,
  keywords: 'dataclass field default_factory frozen order enum auto namedtuple',
  goals: ['Replace boilerplate with «@dataclass»', 'Use defaults, «field(default_factory=...)», «frozen» and «order»', 'Add validation with «__post_init__»', 'Model fixed sets of choices with «Enum»'],
  body: [
    section('learn', 'Less boilerplate'),
    p`Many classes exist mainly to hold data. Writing «__init__», «__repr__» and «__eq__» for each one is repetitive. The «@dataclass» decorator generates them from **type-annotated** class attributes.`,
    code('A dataclass')`
      from dataclasses import dataclass, field

      @dataclass
      class Course:
          code: str
          title: str
          credits: int = 3                                 # default value
          prerequisites: list = field(default_factory=list)  # a NEW list per object

      c1 = Course("CSCD101", "Intro to Programming")
      c2 = Course("CSCD201", "Data Structures", 4, ["CSCD101"])
      print(c1)
      print(c2)
      print(c1 == Course("CSCD101", "Intro to Programming"))
      c1.credits = 4                                   # still mutable by default
      print(c1.credits)
    `,
    p`The annotations («code: str») declare the fields and their intended types. Python does **not** enforce these types at run time; they document intent and help tools (lesson 5.4). «field(default_factory=list)» avoids the shared mutable default problem: dataclasses actually refuse a plain «= []» default.`,
    section('learn', 'Options: frozen, order and __post_init__'),
    code('Immutable, orderable, validated')`
      from dataclasses import dataclass, field, asdict

      @dataclass(frozen=True, order=True)
      class Version:
          major: int
          minor: int = 0
          patch: int = 0

          def __str__(self):
              return f"{self.major}.{self.minor}.{self.patch}"

      versions = [Version(3, 12), Version(3, 9, 7), Version(2, 7, 18), Version(3, 12, 4)]
      print([str(v) for v in sorted(versions)])
      print(max(versions), {Version(1), Version(1)})      # frozen -> hashable
      try:
          versions[0].major = 4
      except Exception as e:
          print(type(e).__name__)

      @dataclass
      class Score:
          student: str
          mark: float
          grade: str = field(init=False)                  # computed, not passed in

          def __post_init__(self):
              if not 0 <= self.mark <= 100:
                  raise ValueError("mark out of range")
              self.grade = "A" if self.mark >= 80 else "B" if self.mark >= 70 else "C" if self.mark >= 60 else "F"

      s = Score("Ama", 84)
      print(s, asdict(s))
    `,
    p`«order=True» compares objects field by field like tuples, so versions sort correctly. «frozen=True» makes instances immutable and hashable. «__post_init__» runs right after the generated «__init__», which is the place for validation and computed fields. «asdict» converts to a dictionary, ready for «json.dumps».`,
    section('learn', 'Enums: a fixed set of named values'),
    code('Enum')`
      from enum import Enum, auto

      class Level(Enum):
          FRESHER = 100
          SOPHOMORE = 200
          JUNIOR = 300
          SENIOR = 400

      class Status(Enum):
          ACTIVE = auto()
          DEFERRED = auto()
          GRADUATED = auto()

      level = Level.JUNIOR
      print(level, level.name, level.value)
      print(Level(400), Level(400) is Level.SENIOR)
      for l in Level:
          print(f"  {l.name.title():<10} {l.value}")

      status = Status.ACTIVE
      if status is Status.ACTIVE:
          print("Can register for courses")
    `,
    p`Using «Status.ACTIVE» instead of the string «"active"» means a typo («Status.ACTVE») is an immediate error rather than a silent bug, editors can autocomplete the options, and the set of valid values is defined in one place. Look members up by value with «Level(400)», or by name with «Level["SENIOR"]» on your computer.`,
    note('deep', 'Going deeper · value objects and namedtuple')`A frozen dataclass is a **value object**: identity does not matter, only its values (two «Version(3, 12)» are interchangeable). Value objects are safe to share, hash and cache. «collections.namedtuple» and «typing.NamedTuple» are older, lighter alternatives that are real tuples (immutable, indexable, unpackable). Dataclasses are more flexible; choose namedtuples when you need tuple behaviour.`,
    quiz(
      { q: 'What does «@dataclass» generate automatically?', o: ['Only «__init__»', '«__init__», «__repr__» and «__eq__» (and more with options)', 'Getter and setter methods', 'A database table'], a: 1, why: 'Plus ordering methods with «order=True» and «__hash__» with «frozen=True».' },
      { q: 'How do you give a dataclass field an empty list as default?', o: ['«tags: list = []»', '«tags: list = field(default_factory=list)»', '«tags = list»', '«tags: list = None» only'], a: 1, why: 'A factory creates a new list for each object.' },
      { q: 'Are dataclass type annotations enforced at run time?', o: ['Yes, always', 'No, they are hints for humans and tools', 'Only for int', 'Only when frozen'], a: 1, why: 'Use «__post_init__» or a validation library to enforce them.' },
      { q: 'What does «Level(300)» return for the enum above?', o: ['«300»', '«Level.JUNIOR»', '«"JUNIOR"»', 'An error'], a: 1, why: 'Calling the enum class looks a member up by value.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Inventory item dataclass', level: 'easy',
      prompt: `Write a dataclass «Item» with «name: str», «price: float», «qty: int = 0», and a property «value» (price × qty). Sort the items by value descending and print their names.`,
      starter: R`
        from dataclasses import dataclass

        items = [Item("pen", 2.5, 40), Item("bag", 120.0, 2), Item("book", 45.0, 3), Item("ruler", 4.0)]
        print([i.name for i in sorted(items, key=lambda i: i.value, reverse=True)])`,
      expect: `['bag', 'book', 'pen', 'ruler']`,
      hints: ['Define the class between the import and the list.', '«@property def value(self): return self.price * self.qty»'],
      solution: R`
        from dataclasses import dataclass

        @dataclass
        class Item:
            name: str
            price: float
            qty: int = 0

            @property
            def value(self):
                return self.price * self.qty

        items = [Item("pen", 2.5, 40), Item("bag", 120.0, 2), Item("book", 45.0, 3), Item("ruler", 4.0)]
        print([i.name for i in sorted(items, key=lambda i: i.value, reverse=True)])`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Hostel room allocation',
      brief: `Model a university hostel with dataclasses and enums, and implement an allocation algorithm that respects capacity and gender rules and prioritises final-year and first-year students.`,
      reqs: ['«Gender» and «Level» enums', '«@dataclass Student» with name, id, gender, level and a «room: str | None = None» field', '«@dataclass Room» with number, block gender, capacity and «occupants: list» (default factory); a «free» property', '«allocate(students, rooms)»: sort students by priority (level 400 first, then 100, then others; ties by id), then place each in the first room of the matching gender with space; return the list of students who could not be placed', 'Validate in «__post_init__» that room capacity is between 1 and 4', 'Print the final allocation per room and the unplaced students'],
      starter: R`
        from dataclasses import dataclass, field
        from enum import Enum
        `,
      solution: R`
        from dataclasses import dataclass, field
        from enum import Enum


        class Gender(Enum):
            FEMALE = "F"
            MALE = "M"


        class Level(Enum):
            L100 = 100
            L200 = 200
            L300 = 300
            L400 = 400


        @dataclass
        class Student:
            name: str
            sid: str
            gender: Gender
            level: Level
            room: str | None = None


        @dataclass
        class Room:
            number: str
            gender: Gender
            capacity: int
            occupants: list = field(default_factory=list)

            def __post_init__(self):
                if not 1 <= self.capacity <= 4:
                    raise ValueError(f"room {self.number}: capacity must be 1-4")

            @property
            def free(self):
                return self.capacity - len(self.occupants)


        PRIORITY = {Level.L400: 0, Level.L100: 1, Level.L300: 2, Level.L200: 2}


        def allocate(students, rooms):
            unplaced = []
            for s in sorted(students, key=lambda s: (PRIORITY[s.level], s.sid)):
                room = next((r for r in rooms if r.gender is s.gender and r.free > 0), None)
                if room is None:
                    unplaced.append(s)
                else:
                    room.occupants.append(s)
                    s.room = room.number
            return unplaced


        F, M = Gender.FEMALE, Gender.MALE
        rooms = [Room("A101", F, 2), Room("A102", F, 1), Room("B201", M, 2)]
        students = [
            Student("Ama", "S07", F, Level.L200), Student("Esi", "S02", F, Level.L400),
            Student("Akua", "S05", F, Level.L100), Student("Abena", "S01", F, Level.L300),
            Student("Kofi", "S04", M, Level.L100), Student("Yaw", "S03", M, Level.L400),
            Student("Kwame", "S06", M, Level.L200),
        ]
        left = allocate(students, rooms)
        for r in rooms:
            names = ", ".join(f"{s.name} ({s.level.value})" for s in r.occupants)
            print(f"{r.number} [{r.gender.value}] {len(r.occupants)}/{r.capacity}: {names}")
        print("Unplaced:", [f"{s.name} ({s.level.value})" for s in left])
        try:
            Room("C301", M, 6)
        except ValueError as e:
            print("Error:", e)`,
      explain: `The priority dictionary turns a business rule into data, and the sort key «(priority, id)» encodes "level first, then id". «next((... for ...), None)» returns the first matching room, or «None» if there is none, without building a list. This greedy algorithm (always take the first room that fits) is simple and fair here; more complex constraints (roommate preferences) would turn this into a matching or optimisation problem.`
    })
  ]
});

/* ------------------------------------------------------------------ 4.7 */
lesson({
  id: 'project-4', level: 'L4', title: 'Level 4 project: library management system', minutes: 110,
  keywords: 'project oop design uml classes responsibilities review',
  goals: ['Design a system of cooperating classes before coding', 'Assign clear responsibilities to each class', 'Combine inheritance, composition, properties, dunder methods, dataclasses and enums', 'Review all of Level 4'],
  body: [
    section('review', 'Level 4 in one page'),
    table(['Concept', 'Remember'], [
      ['Class / instance', 'blueprint vs object; «__init__» sets up each new object; «self» is the object'],
      ['Class members', 'class attributes are shared; «@classmethod» gets «cls»; «@staticmethod» gets nothing'],
      ['Inheritance', '«class Child(Parent)»; «super()»; override to specialise; is-a only'],
      ['Polymorphism', 'same method name, different behaviour; no type checks needed'],
      ['ABC', '«@abstractmethod» forces subclasses to implement an interface'],
      ['Composition', 'has-a: objects holding objects; often better than inheritance'],
      ['Encapsulation', '«_internal» names; «@property» for computed and validated attributes'],
      ['Dunder methods', 'make your objects work with operators, «len», «in», «for», sorting'],
      ['Dataclasses / Enum', 'less boilerplate; frozen value objects; named constants']
    ]),
    section('build', 'Object-oriented design'),
    p`Before writing code, list the **nouns** in the problem (candidates for classes) and the **verbs** (candidates for methods), then decide which class is **responsible** for each piece of data and each rule. A simple sketch:`,
    code('Class sketch (UML-style, not Python)', { run: false })`
      LibraryItem (abstract)       Member                    Library
      - item_id, title             - member_id, name         - items: dict
      - loan_days() [abstract]     - loans: list[Loan]       - members: dict
      - daily_fine() [abstract]    - can_borrow()            - checkout(member, item, day)
           ^                                                 - return_item(item, day) -> fine
           |                       Loan (dataclass)          - overdue(day)
       Book, DVD, Journal          - item, member, due_day
    `,
    p`Responsibilities: an **item** knows its own loan period and fine rate (polymorphism). A **member** knows their limit and current loans. The **library** coordinates: it is the only class that creates loans, so the rules live in one place.`,
    section('build', 'The implementation'),
    code('Library management system')`
      from abc import ABC, abstractmethod
      from dataclasses import dataclass


      class LibraryError(Exception):
          pass


      class LibraryItem(ABC):
          def __init__(self, item_id, title):
              self.item_id = item_id
              self.title = title
              self.on_loan = False

          @abstractmethod
          def loan_days(self): ...

          @abstractmethod
          def daily_fine(self): ...

          def __repr__(self):
              return f"{type(self).__name__}({self.item_id}: {self.title})"


      class Book(LibraryItem):
          def loan_days(self): return 14
          def daily_fine(self): return 0.50


      class DVD(LibraryItem):
          def loan_days(self): return 3
          def daily_fine(self): return 2.00


      class ReferenceBook(Book):
          def loan_days(self): return 0          # cannot be borrowed


      @dataclass
      class Loan:
          item: LibraryItem
          member: "Member"
          due_day: int


      class Member:
          LIMIT = 3

          def __init__(self, member_id, name):
              self.member_id = member_id
              self.name = name
              self.loans = []

          def can_borrow(self):
              return len(self.loans) < self.LIMIT

          def __repr__(self):
              return f"Member({self.name}, {len(self.loans)} loans)"


      class Library:
          def __init__(self):
              self.items = {}
              self.members = {}
              self.fines_collected = 0.0

          def add(self, obj):
              target = self.items if isinstance(obj, LibraryItem) else self.members
              key = obj.item_id if isinstance(obj, LibraryItem) else obj.member_id
              target[key] = obj
              return obj

          def checkout(self, member_id, item_id, day):
              member, item = self.members[member_id], self.items[item_id]
              if item.loan_days() == 0:
                  raise LibraryError(f"{item.title} is reference only")
              if item.on_loan:
                  raise LibraryError(f"{item.title} is already on loan")
              if not member.can_borrow():
                  raise LibraryError(f"{member.name} has reached the limit of {member.LIMIT}")
              item.on_loan = True
              loan = Loan(item, member, day + item.loan_days())
              member.loans.append(loan)
              return loan

          def return_item(self, item_id, day):
              item = self.items[item_id]
              for member in self.members.values():
                  for loan in member.loans:
                      if loan.item is item:
                          member.loans.remove(loan)
                          item.on_loan = False
                          fine = max(0, day - loan.due_day) * item.daily_fine()
                          self.fines_collected += fine
                          return fine
              raise LibraryError(f"{item.title} is not on loan")

          def overdue(self, day):
              return [(l.member.name, l.item.title, day - l.due_day)
                      for m in self.members.values() for l in m.loans if day > l.due_day]


      lib = Library()
      lib.add(Book("B1", "Clean Code"))
      lib.add(Book("B2", "Things Fall Apart"))
      lib.add(DVD("D1", "Python Lectures"))
      lib.add(ReferenceBook("R1", "Oxford Dictionary"))
      lib.add(Member("M1", "Ama"))
      lib.add(Member("M2", "Kofi"))

      actions = [("checkout", "M1", "B1", 1), ("checkout", "M1", "D1", 1), ("checkout", "M2", "B1", 2),
                 ("checkout", "M2", "R1", 2), ("checkout", "M2", "B2", 3)]
      for action, mid, iid, day in actions:
          try:
              loan = lib.checkout(mid, iid, day)
              print(f"day {day}: {loan.member.name} borrowed {loan.item.title}, due day {loan.due_day}")
          except LibraryError as e:
              print(f"day {day}: refused - {e}")

      print("Overdue on day 10:", lib.overdue(10))
      print("Fine for D1 on day 10:", lib.return_item("D1", 10))
      print("Fine for B1 on day 15:", lib.return_item("B1", 15))
      print(lib.members, f"fines collected {lib.fines_collected:.2f}")
    `,
    p`Notice how small the item subclasses are: each one only states what makes it different. «return_item» calculates the fine with «item.daily_fine()» and never asks what kind of item it is. Adding a «Magazine» type tomorrow would not touch «Library» at all; this is the **open/closed principle** (open for extension, closed for modification).`,
    section('practice', 'Tasks'),
    task({
      title: 'Add a premium member', level: 'medium',
      prompt: `Using the classes from the example above (copied in the starter in shortened form), add «PremiumMember(Member)» with a limit of 5 and print whether a premium member with 4 loans can borrow, and whether a normal member with 3 loans can.`,
      starter: R`
        class Member:
            LIMIT = 3
            def __init__(self, member_id, name):
                self.member_id = member_id
                self.name = name
                self.loans = []
            def can_borrow(self):
                return len(self.loans) < self.LIMIT

        # add PremiumMember here

        p = PremiumMember("M9", "Esi"); p.loans = ["x"] * 4
        n = Member("M8", "Yaw"); n.loans = ["x"] * 3
        print(p.can_borrow(), n.can_borrow())`,
      expect: `True False`,
      hints: ['Only the class attribute needs to change: «LIMIT = 5».', '«can_borrow» uses «self.LIMIT», which finds the subclass value first.'],
      solution: R`
        class Member:
            LIMIT = 3
            def __init__(self, member_id, name):
                self.member_id = member_id
                self.name = name
                self.loans = []
            def can_borrow(self):
                return len(self.loans) < self.LIMIT

        class PremiumMember(Member):
            LIMIT = 5

        p = PremiumMember("M9", "Esi"); p.loans = ["x"] * 4
        n = Member("M8", "Yaw"); n.loans = ["x"] * 3
        print(p.can_borrow(), n.can_borrow())`,
      explain: `Because «can_borrow» reads «self.LIMIT» rather than «Member.LIMIT», a subclass can change the limit just by overriding the class attribute. Writing «Member.LIMIT» would have hard-coded the parent's value and defeated inheritance.`
    }),
    section('assignment', 'Level 4 project'),
    assignment({
      title: 'Food delivery platform',
      brief: `Design and implement the core of a campus food-delivery app with object-oriented design. Sketch your classes (nouns, verbs, responsibilities) in a comment block first, then implement and demonstrate them. This is your Level 4 capstone.`,
      reqs: ['A design comment listing each class and its responsibility', '«MenuItem» frozen dataclass (name, price) and a «Restaurant» that has a menu (composition) and an «is_open» flag', '«Order» with a status «Enum» (PLACED → PREPARING → OUT_FOR_DELIVERY → DELIVERED, or CANCELLED); a method «advance()» that only allows valid transitions and raises otherwise', 'Order supports «len(order)» (number of items), iteration over lines, and a «total» property including a delivery fee', 'An abstract «DeliveryFee» strategy with at least two implementations (flat fee; distance-based) passed into the order: polymorphism through composition', 'A «Customer» that can place orders only at open restaurants; custom exceptions for errors; a demo covering success and failure cases'],
      starter: R`
        # DESIGN
        # MenuItem   - ...
        # Restaurant - ...
        # Order      - ...
        # Customer   - ...

        from abc import ABC, abstractmethod
        from dataclasses import dataclass, field
        from enum import Enum, auto
        `,
      solution: R`
        # DESIGN
        # MenuItem      - immutable name + price
        # Restaurant    - owns a menu, knows whether it is open, looks up items
        # DeliveryFee   - strategy interface: computes the fee for an order
        #   FlatFee, DistanceFee - concrete strategies
        # Status        - the allowed states of an order
        # Order         - lines of (item, qty), status transitions, totals
        # Customer      - places orders, keeps their order history

        from abc import ABC, abstractmethod
        from dataclasses import dataclass
        from enum import Enum, auto


        class DeliveryError(Exception):
            pass


        @dataclass(frozen=True)
        class MenuItem:
            name: str
            price: float


        class Restaurant:
            def __init__(self, name, items, is_open=True):
                self.name = name
                self.menu = {i.name: i for i in items}
                self.is_open = is_open

            def item(self, name):
                try:
                    return self.menu[name]
                except KeyError:
                    raise DeliveryError(f"{self.name} has no '{name}'") from None


        class DeliveryFee(ABC):
            @abstractmethod
            def fee(self, subtotal): ...


        class FlatFee(DeliveryFee):
            def __init__(self, amount):
                self.amount = amount

            def fee(self, subtotal):
                return 0.0 if subtotal >= 100 else self.amount


        class DistanceFee(DeliveryFee):
            def __init__(self, km, per_km=1.5, base=3.0):
                self.km, self.per_km, self.base = km, per_km, base

            def fee(self, subtotal):
                return round(self.base + self.km * self.per_km, 2)


        class Status(Enum):
            PLACED = auto()
            PREPARING = auto()
            OUT_FOR_DELIVERY = auto()
            DELIVERED = auto()
            CANCELLED = auto()


        NEXT = {Status.PLACED: Status.PREPARING,
                Status.PREPARING: Status.OUT_FOR_DELIVERY,
                Status.OUT_FOR_DELIVERY: Status.DELIVERED}


        class Order:
            def __init__(self, restaurant, fee_strategy):
                self.restaurant = restaurant
                self.fee_strategy = fee_strategy
                self.lines = []
                self.status = Status.PLACED

            def add(self, name, qty=1):
                self.lines.append((self.restaurant.item(name), qty))
                return self

            def __len__(self):
                return sum(qty for _, qty in self.lines)

            def __iter__(self):
                return iter(self.lines)

            @property
            def subtotal(self):
                return sum(item.price * qty for item, qty in self.lines)

            @property
            def total(self):
                return round(self.subtotal + self.fee_strategy.fee(self.subtotal), 2)

            def advance(self):
                if self.status not in NEXT:
                    raise DeliveryError(f"cannot advance an order that is {self.status.name}")
                self.status = NEXT[self.status]

            def cancel(self):
                if self.status is not Status.PLACED:
                    raise DeliveryError(f"too late to cancel: order is {self.status.name}")
                self.status = Status.CANCELLED


        class Customer:
            def __init__(self, name):
                self.name = name
                self.orders = []

            def order_from(self, restaurant, fee_strategy):
                if not restaurant.is_open:
                    raise DeliveryError(f"{restaurant.name} is closed")
                order = Order(restaurant, fee_strategy)
                self.orders.append(order)
                return order


        jollof_spot = Restaurant("Jollof Spot", [MenuItem("jollof", 35.0), MenuItem("waakye", 25.0),
                                                 MenuItem("sobolo", 8.0)])
        night_grill = Restaurant("Night Grill", [MenuItem("kebab", 15.0)], is_open=False)
        ama = Customer("Ama")

        order = ama.order_from(jollof_spot, DistanceFee(km=2.4)).add("jollof", 2).add("sobolo", 3)
        for item, qty in order:
            print(f"  {qty} x {item.name:<8}{item.price * qty:>8.2f}")
        print(f"  {len(order)} items, subtotal {order.subtotal:.2f}, total {order.total:.2f}")
        while order.status is not Status.DELIVERED:
            order.advance()
            print("  status ->", order.status.name)

        big = ama.order_from(jollof_spot, FlatFee(10)).add("waakye", 4)
        print(f"Free delivery over 100? total {big.total:.2f}")

        tests = [lambda: order.advance(),
                 lambda: ama.order_from(night_grill, FlatFee(5)),
                 lambda: big.add("pizza"),
                 lambda: (big.advance(), big.cancel())]
        for t in tests:
            try:
                t()
            except DeliveryError as e:
                print("Error:", e)`,
      explain: `«DeliveryFee» is the **strategy pattern**: the algorithm for computing a fee is an object you plug into the order, so new pricing rules never touch «Order». The valid status transitions live in the «NEXT» table, which makes illegal jumps (DELIVERED → PREPARING) impossible. «raise ... from None» hides the internal «KeyError» so the user only sees the meaningful «DeliveryError». Design patterns like strategy are covered in software engineering courses; you have now used one for a real reason.`
    })
  ]
});
