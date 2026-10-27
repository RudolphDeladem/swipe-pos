/* Level 1: Foundations */
level({
  id: 'L1', num: 1, title: 'Foundations', tag: 'Beginner',
  blurb: 'Variables, numbers, text, input, decisions and loops: the building blocks every program is made from.',
  outcomes: ['Store and change data in variables', 'Do arithmetic and work with text', 'Read input from the user and convert it', 'Make decisions with «if» / «elif» / «else»', 'Repeat work with «while» and «for» loops', 'Build a complete interactive console program']
});

/* ------------------------------------------------------------------ 1.1 */
lesson({
  id: 'variables', level: 'L1', title: 'Variables and assignment', minutes: 50,
  keywords: 'variable assignment naming f-string type',
  goals: ['Create variables and change their values', 'Follow Python naming rules and conventions', 'Understand the four basic types: «int», «float», «str», «bool»', 'Use «type()» to inspect a value', 'Print values neatly with f-strings'],
  body: [
    section('learn', 'A variable is a name for a value'),
    p`A **variable** is a name that refers to a value stored in memory. You create one with the **assignment operator** «=»:

    «age = 19»

    Read it as "age **gets** 19" or "let age refer to 19", not "age equals 19". The right-hand side is evaluated first, then the name on the left is attached to the result. That is why «count = count + 1» makes sense in programming even though it is nonsense in algebra: take the current value of «count», add one, and make «count» refer to the new value.`,
    code('Creating and using variables')`
      student = "Ama"
      age = 19
      gpa = 3.6

      print(student)
      print(age)
      print(student, "is", age, "years old and has a GPA of", gpa)
    `,
    code('Variables can change (that is why they are called variables)')`
      score = 10
      print("Start:", score)

      score = score + 5      # take 10, add 5, store 15
      print("After bonus:", score)

      score = score * 2      # 15 * 2
      print("Doubled:", score)

      score += 1             # shorthand for score = score + 1
      print("Plus one:", score)
    `,
    p`The shorthand operators «+=», «-=», «*=», «/=» combine an operation with assignment. You will use «+=» constantly, especially for counters and totals.`,
    section('learn', 'Naming rules and conventions'),
    table(['Rule', 'Valid', 'Invalid'], [
      ['Letters, digits and underscores only', '«total_marks»', '«total-marks», «total marks»'],
      ['Cannot start with a digit', '«year1»', '«1year»'],
      ['Case-sensitive', '«Name» and «name» are different variables', ''],
      ['Not a keyword', '«class_name»', '«class», «if», «for», «True»']
    ]),
    p`Beyond the rules, Python programmers follow the style guide **PEP 8**: use «lower_case_with_underscores» (called snake_case) for variables, and choose descriptive names. «hours_worked» is far better than «h» or «x1». Code is read many more times than it is written.

    Names written entirely in capitals, like «MAX_STUDENTS = 120», are a convention for **constants**: values that should not change while the program runs. Python does not enforce this; it is a signal to other programmers.`,
    section('learn', 'Basic data types'),
    p`Every value has a **type**, which decides what you can do with it. The four you need first:`,
    table(['Type', 'Meaning', 'Examples'], [
      ['«int»', 'Whole numbers, positive or negative, any size', '«0», «42», «-7», «10_000_000»'],
      ['«float»', 'Numbers with a decimal point', '«3.14», «-0.5», «2.0», «1e6»'],
      ['«str»', 'Text (a "string" of characters)', '«"hello"», «\'Kumasi\'», «""»'],
      ['«bool»', 'Truth values', '«True», «False»']
    ]),
    code('Asking Python for the type')`
      print(type(42))
      print(type(3.14))
      print(type("42"))
      print(type(True))
      print(type(2.0))
    `,
    p`Notice «"42"» is a **string**, not a number, because it is in quotes. «2.0» is a float even though it is a whole number, because it has a decimal point. These distinctions matter: «"42" + "1"» gives «"421"», while «42 + 1» gives «43».`,
    note('deep', 'Going deeper · names, objects and references')`In Python, a variable does not "contain" a value like a box. Every value is an **object** living in memory, with an identity, a type and a value. A variable is a **reference**: a label pointing at an object. After «a = 500» and «b = a», both names point at the *same* object («a is b» is «True»). Assigning «a = 7» later just moves the label «a»; «b» still points to 500. This model (names bound to objects) explains a lot of later behaviour, especially with lists in Level 2. Python is also **dynamically typed**: the type belongs to the object, not to the name, so the same name can refer to an «int» and later to a «str».`,
    code('Dynamic typing: the name can point at any type')`
      x = 10
      print(x, type(x))
      x = "ten"
      print(x, type(x))
      x = 10.0
      print(x, type(x))
    `,
    section('learn', 'Printing nicely with f-strings'),
    p`Joining text and values with commas works, but an **f-string** gives you full control. Put «f» before the opening quote and write any expression inside curly braces «{ }»:`,
    code('f-strings')`
      name = "Kwame"
      course = "Computer Science"
      year = 2

      print(f"{name} is a year {year} {course} student.")
      print(f"Next year {name} will be in year {year + 1}.")

      price = 49.5
      qty = 3
      print(f"Total: {price * qty:.2f} cedis")   # :.2f = 2 decimal places
    `,
    p`The part after the colon inside the braces is a **format specifier**. «:.2f» means "float with 2 decimal places". You will see more of these in lesson 1.3.`,
    section('learn', 'Multiple assignment and swapping'),
    code('Assigning several variables at once')`
      a, b, c = 1, 2, 3
      print(a, b, c)

      x = y = 0          # both names refer to 0
      print(x, y)

      # swap two values in one line
      first, second = "left", "right"
      first, second = second, first
      print(first, second)
    `,
    p`The swap works because Python evaluates the whole right side first («second, first» → «("right", "left")») and only then assigns. In most other languages you need a temporary third variable.`,
    quiz(
      { q: 'What is printed?', code: R`
          x = 5
          x = x + 3
          x = x * 2
          print(x)`, o: ['«10»', '«16»', '«13»', '«5»'], a: 1, why: '5 + 3 = 8, then 8 × 2 = 16. Each line uses the current value of «x».' },
      { q: 'Which is a valid variable name?', o: ['«2nd_place»', '«second-place»', '«second_place»', '«second place»'], a: 2, why: 'Only letters, digits and underscores, not starting with a digit.' },
      { q: 'What is «type("3.0")»?', o: ['«float»', '«int»', '«str»', '«bool»'], a: 2, why: 'It is in quotes, so it is a string, whatever the characters inside look like.' },
      { q: 'After «a = 1» and «b = 2» and «a, b = b, a», what are «a» and «b»?', o: ['1 and 2', '2 and 1', '2 and 2', '1 and 1'], a: 1, why: 'The right side is evaluated first to «(2, 1)», then unpacked into «a» and «b».' },
      { q: 'What does «print(f"{2 * 3} apples")» show?', o: ['«{2 * 3} apples»', '«6 apples»', '«2 * 3 apples»', 'An error'], a: 1, why: 'Inside an f-string, the braces are evaluated as Python expressions.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Student record', level: 'easy',
      prompt: `Create three variables: «name» set to «"Esi"», «programme» set to «"Economics"» and «level» set to «200». Then print exactly:

      «Esi studies Economics at level 200.»

      Use an f-string.`,
      starter: R`
        name = "Esi"
        # create programme and level, then print using an f-string
        `,
      expect: `Esi studies Economics at level 200.`,
      hints: ['An f-string starts with «f"»: «f"{name} studies ..."».', 'Do not forget the full stop at the end.'],
      solution: R`
        name = "Esi"
        programme = "Economics"
        level = 200
        print(f"{name} studies {programme} at level {level}.")`
    }),
    task({
      title: 'Running balance', level: 'easy',
      prompt: `A student's mobile money wallet starts at «120». Using **one variable** called «balance» and the operators «-=» and «+=», apply these in order and print the balance after each step:

      spend 45 on books → receive 200 allowance → spend 30 on transport.

      Print it in the form «Balance: 75».`,
      starter: R`
        balance = 120
        `,
      expect: `
        Balance: 75
        Balance: 275
        Balance: 245`,
      hints: ['After each change, call «print(f"Balance: {balance}")».'],
      solution: R`
        balance = 120
        balance -= 45
        print(f"Balance: {balance}")
        balance += 200
        print(f"Balance: {balance}")
        balance -= 30
        print(f"Balance: {balance}")`
    }),
    task({
      title: 'Swap without a temporary', level: 'medium',
      prompt: `The variables are the wrong way round. Write **one line** that swaps them so the program prints «morning» then «evening».`,
      starter: R`
        lecture = "evening"
        lab = "morning"
        # your one line here
        print(lecture)
        print(lab)`,
      expect: `
        morning
        evening`,
      hints: ['Use tuple unpacking: «a, b = b, a».'],
      solution: R`
        lecture = "evening"
        lab = "morning"
        lecture, lab = lab, lecture
        print(lecture)
        print(lab)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Semester budget summary',
      brief: `Write a program that stores a student's semester budget in well-named variables and prints a clear summary. This practises variables, arithmetic on variables, and f-string formatting.`,
      reqs: ['Variables for: student name, allowance per month, number of months, rent per month, food per week, number of weeks', 'Calculate total income, total rent, total food, total spending and money left over, each in its own variable', 'Print a formatted summary using f-strings with 2 decimal places («:.2f»)', 'Use snake_case names and at least two comments explaining what the calculations are'],
      sample: `
        Budget for Yaw Asante
        Income:      2400.00
        Rent:        1200.00
        Food:         840.00
        Spending:    2040.00
        Left over:    360.00`,
      starter: R`
        # Semester budget
        student_name = "Yaw Asante"
        `,
      solution: R`
        # Semester budget
        student_name = "Yaw Asante"
        allowance_per_month = 600
        months = 4
        rent_per_month = 300
        food_per_week = 52.5
        weeks = 16

        # totals for the whole semester
        total_income = allowance_per_month * months
        total_rent = rent_per_month * months
        total_food = food_per_week * weeks
        total_spending = total_rent + total_food

        # what remains after all costs
        left_over = total_income - total_spending

        print(f"Budget for {student_name}")
        print(f"Income:    {total_income:>9.2f}")
        print(f"Rent:      {total_rent:>9.2f}")
        print(f"Food:      {total_food:>9.2f}")
        print(f"Spending:  {total_spending:>9.2f}")
        print(f"Left over: {left_over:>9.2f}")`,
      explain: `«:>9.2f» means: right-align («>») in a field 9 characters wide, as a float with 2 decimals. Right-aligning makes the numbers line up in a column, like a real statement. Every intermediate result has its own descriptive variable, so the program reads like the budget it describes.`
    })
  ]
});

/* ------------------------------------------------------------------ 1.2 */
lesson({
  id: 'numbers', level: 'L1', title: 'Numbers and arithmetic', minutes: 55,
  keywords: 'int float division modulo power math round operator precedence',
  goals: ['Use all seven arithmetic operators', 'Explain the difference between «/» and «//»', 'Use «%» (modulo) to solve real problems', 'Apply operator precedence correctly', 'Understand why «0.1 + 0.2» is not exactly «0.3»'],
  body: [
    section('learn', 'The arithmetic operators'),
    table(['Operator', 'Name', 'Example', 'Result'], [
      ['«+»', 'addition', '«7 + 2»', '«9»'],
      ['«-»', 'subtraction', '«7 - 2»', '«5»'],
      ['«*»', 'multiplication', '«7 * 2»', '«14»'],
      ['«/»', 'true division (always a float)', '«7 / 2»', '«3.5»'],
      ['«//»', 'floor division (rounds down)', '«7 // 2»', '«3»'],
      ['«%»', 'modulo (remainder)', '«7 % 2»', '«1»'],
      ['«**»', 'exponent (power)', '«7 ** 2»', '«49»']
    ]),
    code('All operators')`
      a = 17
      b = 5
      print("a + b  =", a + b)
      print("a - b  =", a - b)
      print("a * b  =", a * b)
      print("a / b  =", a / b)
      print("a // b =", a // b)
      print("a % b  =", a % b)
      print("a ** b =", a ** b)
    `,
    p`Two facts surprise beginners. First, «/» **always** gives a float, even «10 / 2» is «5.0». Second, «//» and «%» are partners: «17 // 5» is 3 (how many whole fives fit) and «17 % 5» is 2 (what is left over). Together they satisfy «a == (a // b) * b + a % b».`,
    section('learn', 'Why modulo is so useful'),
    ul('**Even or odd:** «n % 2 == 0» is true for even numbers.',
       '**Divisibility:** «n % 7 == 0» means 7 divides n exactly.',
       '**Last digit:** «n % 10» gives the last digit of a positive integer; «n // 10» removes it.',
       '**Wrapping around:** clock arithmetic, «(hour + 5) % 24».',
       '**Unit conversion:** seconds into minutes and seconds.'),
    code('Converting seconds with // and %')`
      total_seconds = 4000
      hours = total_seconds // 3600
      remaining = total_seconds % 3600
      minutes = remaining // 60
      seconds = remaining % 60
      print(f"{total_seconds} s = {hours} h {minutes} min {seconds} s")

      # Clock arithmetic: 9 hours after 20:00
      print("Time:", (20 + 9) % 24, ":00")
    `,
    section('learn', 'Operator precedence'),
    p`Python follows the mathematical order you learned at school (often remembered as PEMDAS/BODMAS):`,
    ol('«( )» brackets first', '«**» exponent (evaluated right to left: «2 ** 3 ** 2» is «2 ** 9»)', 'unary minus «-x»', '«*», «/», «//», «%» left to right', '«+», «-» left to right'),
    code('Precedence in action')`
      print(2 + 3 * 4)        # 14, not 20
      print((2 + 3) * 4)      # 20
      print(10 - 4 - 3)       # 3: left to right
      print(2 ** 3 ** 2)      # 512: right to left
      print(-3 ** 2)          # -9: ** binds tighter than unary minus
      print((-3) ** 2)        # 9
    `,
    note('tip', 'When in doubt, add brackets')`Brackets cost nothing and make your intention obvious to the reader. «(a + b) / 2» is clearer than relying on anyone remembering precedence rules.`,
    section('learn', 'int, float and conversions'),
    code('Mixing ints and floats')`
      print(3 + 2.0)          # int + float -> float
      print(int(7.9))         # int() truncates towards zero
      print(int(-7.9))
      print(float(3))
      print(round(7.5), round(8.5))   # banker's rounding to the even number
      print(round(3.14159, 2))
      print(abs(-12))
    `,
    p`«round()» uses **round-half-to-even** (also called banker's rounding): an exact .5 goes to the nearest even number, so «round(7.5)» is 8 and «round(8.5)» is 8. This avoids a systematic upward bias when rounding many values, which matters in statistics and finance.`,
    note('deep', 'Going deeper · integers are unbounded, floats are not')`Python «int»s have **arbitrary precision**: «2 ** 1000» is computed exactly, limited only by memory. Floats are 64-bit **IEEE 754** binary floating point numbers, with about 15–17 significant decimal digits. Most decimal fractions such as 0.1 cannot be represented exactly in binary (just as 1/3 cannot be written exactly in decimal), so tiny errors appear: «0.1 + 0.2» is «0.30000000000000004». Never compare floats with «==»; compare with a tolerance using «math.isclose(a, b)». For money, use integer cents or the «decimal» module.`,
    code('Float precision')`
      import math
      print(0.1 + 0.2)
      print(0.1 + 0.2 == 0.3)
      print(math.isclose(0.1 + 0.2, 0.3))
      print(2 ** 100)
    `,
    section('learn', 'The math module'),
    code('Useful functions from math')`
      import math
      print(math.sqrt(144))
      print(math.pi)
      print(math.floor(3.7), math.ceil(3.2))
      print(math.gcd(84, 36))
      print(math.factorial(6))
      r = 4
      print(f"Area of a circle with r={r}: {math.pi * r ** 2:.3f}")
    `,
    p`«import math» loads the **math module** (a library of ready-made functions). You use its functions with the dot syntax «math.sqrt(...)». Modules are covered properly in Level 3.`,
    quiz(
      { q: 'What is «17 // 4»?', o: ['«4.25»', '«4»', '«1»', '«5»'], a: 1, why: 'Floor division: 4 whole fours fit in 17.' },
      { q: 'What is «17 % 4»?', o: ['«4»', '«1»', '«0.25»', '«13»'], a: 1, why: '17 = 4 × 4 + 1, remainder 1.' },
      { q: 'What is «10 / 2»?', o: ['«5»', '«5.0»', '«2»', 'An error'], a: 1, why: 'True division always returns a float.' },
      { q: 'What is «2 + 3 ** 2 * 2»?', o: ['«50»', '«20»', '«38»', '«22»'], a: 1, why: '3 ** 2 = 9, 9 × 2 = 18, 2 + 18 = 20.' },
      { q: 'How should you check whether two floats are "equal"?', o: ['«a == b»', '«a is b»', '«math.isclose(a, b)»', '«int(a) == int(b)»'], a: 2, why: 'Floating point rounding errors make «==» unreliable. Compare within a tolerance.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Digit sum of a 3-digit number', level: 'medium',
      prompt: `Given «n = 472», use only «//» and «%» (no strings) to extract the hundreds, tens and units digits and print their sum. The output should be «Sum of digits: 13».`,
      starter: R`
        n = 472
        `,
      expect: `Sum of digits: 13`,
      hints: ['The units digit is «n % 10».', 'The tens digit is «(n // 10) % 10».', 'The hundreds digit is «n // 100».'],
      solution: R`
        n = 472
        hundreds = n // 100
        tens = (n // 10) % 10
        units = n % 10
        print(f"Sum of digits: {hundreds + tens + units}")`
    }),
    task({
      title: 'Exam timetable conversion', level: 'medium',
      prompt: `A set of exams lasts «12345» minutes in total. Print how many days, hours and minutes that is, in this exact format: «8 days, 13 hours, 45 minutes».`,
      starter: R`
        total = 12345
        `,
      expect: `8 days, 13 hours, 45 minutes`,
      hints: ['One day has 24 × 60 = 1440 minutes.', 'Use «//» to get the days, then «%» to get what is left.'],
      solution: R`
        total = 12345
        days = total // 1440
        rest = total % 1440
        hours = rest // 60
        minutes = rest % 60
        print(f"{days} days, {hours} hours, {minutes} minutes")`
    }),
    task({
      title: 'Compound interest', level: 'medium',
      prompt: `A savings account holds «1000» at «12%» annual interest compounded monthly for «3» years. The formula is «A = P * (1 + r / n) ** (n * t)» where «r» is the rate as a decimal and «n» the number of compounding periods per year. Print «Amount after 3 years: 1430.77».`,
      expect: `Amount after 3 years: 1430.77`,
      hints: ['«r = 0.12», «n = 12», «t = 3».', 'Format with «:.2f».'],
      solution: R`
        P = 1000
        r = 0.12
        n = 12
        t = 3
        A = P * (1 + r / n) ** (n * t)
        print(f"Amount after {t} years: {A:.2f}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Physics and geometry calculator',
      brief: `Write one program that solves four separate problems using variables, operators and the «math» module. Print each answer with a label and sensible rounding. This is the kind of calculation script engineering and science students write all the time.`,
      reqs: ['Hypotenuse of a right triangle with sides 7.5 and 10 (Pythagoras, «math.sqrt»)', 'Volume of a sphere of radius 6 cm: «4/3 · π · r³», rounded to 2 decimals', 'Distance travelled by a car accelerating from rest at 3 m/s² for 12 s: «s = ½ a t²»', 'Convert 98.6 °F to Celsius: «C = (F − 32) × 5/9», 1 decimal', 'Every value stored in a named variable before printing'],
      sample: `
        Hypotenuse: 12.50
        Sphere volume: 904.78 cm^3
        Distance: 216.0 m
        98.6 F = 37.0 C`,
      starter: R`
        import math
        `,
      solution: R`
        import math

        # 1. Pythagoras
        a, b = 7.5, 10
        hypotenuse = math.sqrt(a ** 2 + b ** 2)
        print(f"Hypotenuse: {hypotenuse:.2f}")

        # 2. Sphere volume
        r = 6
        volume = 4 / 3 * math.pi * r ** 3
        print(f"Sphere volume: {volume:.2f} cm^3")

        # 3. Uniform acceleration from rest
        accel, time = 3, 12
        distance = 0.5 * accel * time ** 2
        print(f"Distance: {distance:.1f} m")

        # 4. Temperature
        fahrenheit = 98.6
        celsius = (fahrenheit - 32) * 5 / 9
        print(f"{fahrenheit} F = {celsius:.1f} C")`,
      explain: `Notice that precedence does the right thing in «4 / 3 * math.pi * r ** 3»: «r ** 3» is evaluated first, then the multiplications and division left to right. In the Fahrenheit formula the brackets are essential: without them only 32 would be multiplied by 5/9.`
    })
  ]
});

/* ------------------------------------------------------------------ 1.3 */
lesson({
  id: 'strings', level: 'L1', title: 'Strings in depth', minutes: 70,
  keywords: 'string text index slice methods format escape upper split join',
  goals: ['Create strings with single, double and triple quotes', 'Use escape sequences such as «\\n»', 'Index and slice strings, including negative indices', 'Use the most important string methods', 'Format output precisely with f-string specifiers', 'Explain why strings are immutable'],
  body: [
    section('learn', 'Creating strings'),
    code('Quotes and escape sequences')`
      single = 'Hello'
      double = "It's easy"            # use double quotes when the text has '
      inner = 'She said "yes"'          # or single quotes when it has "
      escaped = "Line one\nLine two"    # \n is a newline
      tabbed = "Name:\tKofi"            # \t is a tab
      path = "C:\\Users\\kofi"          # \\ is one backslash
      raw = r"C:\Users\kofi"            # raw string: backslashes kept as-is
      multi = """This string
      spans several
      lines."""
      print(single); print(double); print(inner)
      print(escaped); print(tabbed); print(path); print(raw)
      print(multi)
    `,
    p`A **string** is a sequence of characters. Single and double quotes are equivalent; pick one style and use the other only when the text contains a quote. Triple quotes allow line breaks inside the string and are also used for documentation (docstrings) later.

    The backslash starts an **escape sequence**: «\n» newline, «\t» tab, «\\» a real backslash, «\"» a quote. A raw string («r"..."») turns escapes off, which is handy for Windows paths and regular expressions (Level 5).`,
    section('learn', 'Joining, repeating and measuring'),
    code('Concatenation, repetition and len')`
      first = "Ada"
      last = "Lovelace"
      full = first + " " + last      # + joins strings
      print(full)
      print("=" * 20)                # * repeats
      print(len(full))               # number of characters, including spaces
      print("love" in full.lower())  # membership test
      # print("Age: " + 36)          # TypeError! cannot add str and int
      print("Age: " + str(36))       # convert first
    `,
    section('learn', 'Indexing and slicing'),
    p`Each character has a position called an **index**, starting at **0**. Negative indices count from the end: «-1» is the last character.`,
    table(['Character', 'P', 'y', 't', 'h', 'o', 'n'], [
      ['Index', '0', '1', '2', '3', '4', '5'],
      ['Negative index', '-6', '-5', '-4', '-3', '-2', '-1']
    ]),
    code('Indexing and slicing')`
      word = "Python"
      print(word[0])      # P
      print(word[5])      # n
      print(word[-1])     # n (last)
      print(word[-2])     # o

      # slicing: word[start:stop]  stop is NOT included
      print(word[0:2])    # Py
      print(word[2:])     # thon (to the end)
      print(word[:4])     # Pyth (from the start)
      print(word[-3:])    # hon (last three)
      print(word[::2])    # Pto (every 2nd character)
      print(word[::-1])   # nohtyP (reversed)
    `,
    p`The slice «s[start:stop:step]» takes characters from «start» up to **but not including** «stop». A good mental model: indices point *between* characters, so «s[0:2]» is the first 2 characters and the length of «s[a:b]» is always «b - a». Slicing never raises an error for out-of-range values; indexing does: «word[10]» raises «IndexError».`,
    note('deep', 'Going deeper · immutability')`Strings are **immutable**: once created, an individual string object never changes. «word[0] = "J"» raises a «TypeError». Methods like «.upper()» do not modify the original; they **return a new string**. Immutability makes strings safe to share between parts of a program and lets Python use them as dictionary keys (Level 2). The price: building a long string with «+=» inside a loop creates many temporary strings. The idiomatic way to build big strings is to collect pieces in a list and call «"".join(pieces)» once.`,
    section('learn', 'String methods'),
    table(['Method', 'What it returns', 'Example → result'], [
      ['«.upper()» / «.lower()»', 'all upper / lower case', '«"Hi".upper()» → «"HI"»'],
      ['«.title()» / «.capitalize()»', 'Each Word Capitalised / First only', '«"ada lovelace".title()» → «"Ada Lovelace"»'],
      ['«.strip()»', 'removes whitespace at both ends', '«"  hi  ".strip()» → «"hi"»'],
      ['«.replace(a, b)»', 'every «a» replaced with «b»', '«"2024-01-05".replace("-", "/")»'],
      ['«.split(sep)»', 'a list of pieces', '«"a,b,c".split(",")» → «["a", "b", "c"]»'],
      ['«sep.join(list)»', 'pieces joined with «sep»', '«"-".join(["a", "b"])» → «"a-b"»'],
      ['«.find(x)»', 'index of first «x», or -1', '«"banana".find("n")» → «2»'],
      ['«.count(x)»', 'number of occurrences', '«"banana".count("a")» → «3»'],
      ['«.startswith(x)» / «.endswith(x)»', '«True»/«False»', '«"report.pdf".endswith(".pdf")»'],
      ['«.isdigit()», «.isalpha()», «.isalnum()»', 'character class tests', '«"2024".isdigit()» → «True»']
    ]),
    code('Methods in action')`
      raw_name = "   kwame NKRUMAH  "
      clean = raw_name.strip().title()
      print(f"[{clean}]")

      email = "Student@UG.edu.gh"
      print(email.lower())
      print(email.split("@"))
      user, domain = email.lower().split("@")
      print("User:", user, "| Domain:", domain)

      sentence = "the quick brown fox jumps over the lazy dog"
      print(sentence.count("the"))
      print(sentence.find("fox"))
      words = sentence.split()        # split on any whitespace
      print(len(words), "words")
      print(" ".join(words[::-1]))    # words in reverse order
      print("_".join(words[:3]).upper())
    `,
    p`Methods can be **chained**: «raw_name.strip().title()» first strips, then title-cases the result. Read chains left to right.`,
    section('learn', 'Formatting with f-strings in depth'),
    table(['Spec', 'Meaning', 'Example → result'], [
      ['«:.2f»', 'fixed point, 2 decimals', '«f"{3.14159:.2f}"» → «3.14»'],
      ['«:,»', 'thousands separator', '«f"{1234567:,}"» → «1,234,567»'],
      ['«:>10»', 'right-align, width 10', '«f"{"hi":>10}"» → «        hi»'],
      ['«:<10» / «:^10»', 'left-align / centre', '«f"{"hi":^10}"» → «    hi    »'],
      ['«:05d»', 'zero-pad integer to width 5', '«f"{42:05d}"» → «00042»'],
      ['«:.1%»', 'percentage', '«f"{0.756:.1%}"» → «75.6%»'],
      ['«=»', 'show expression and value (debugging)', '«f"{x=}"» → «x=10»']
    ]),
    code('A formatted table')`
      print(f"{'Course':<12}{'Credits':>8}{'Score':>8}")
      print("-" * 28)
      print(f"{'Calculus':<12}{3:>8}{78.456:>8.1f}")
      print(f"{'Python':<12}{4:>8}{91.0:>8.1f}")
      print(f"{'Statistics':<12}{3:>8}{65.25:>8.1f}")
      x = 10
      print(f"{x=}, {x * 2=}")
    `,
    quiz(
      { q: 'What is «"Python"[1:4]»?', o: ['«"Pyt"»', '«"yth"»', '«"ytho"»', '«"ython"»'], a: 1, why: 'Indices 1, 2, 3. The stop index 4 is excluded.' },
      { q: 'What is «"banana"[-2]»?', o: ['«"a"»', '«"n"»', '«"b"»', 'An error'], a: 1, why: '-1 is the last «a», -2 is the «n» before it.' },
      { q: 'What happens with «s = "cat"; s[0] = "b"»?', o: ['«s» becomes «"bat"»', 'TypeError: strings are immutable', 'A new variable is created', 'Nothing'], a: 1, why: 'You cannot change a string in place. Use «s = "b" + s[1:]» to build a new one.' },
      { q: 'What does «"a-b-c".split("-")» return?', o: ['«"abc"»', '«["a", "b", "c"]»', '«("a", "b", "c")»', '«["a-b-c"]»'], a: 1, why: '«split» returns a list of the pieces between separators.' },
      { q: 'Which gives «007»?', o: ['«f"{7:3}"»', '«f"{7:03d}"»', '«f"{7:.3f}"»', '«"7" * 3»'], a: 1, why: '«03d» means zero-pad an integer to width 3.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Clean up a name', level: 'easy',
      prompt: `The variable «raw» contains a badly typed name. Print it stripped of surrounding spaces and in title case, then print how many characters the clean version has, exactly like this:

      «Abena Owusu-Ansah»
      «17»`,
      starter: R`
        raw = "    aBENA owusu-ANSAH   "
        `,
      expect: `
        Abena Owusu-Ansah
        17`,
      hints: ['Chain «.strip()» and «.title()».', 'Store the clean name in a variable so you can call «len()» on it.'],
      solution: R`
        raw = "    aBENA owusu-ANSAH   "
        clean = raw.strip().title()
        print(clean)
        print(len(clean))`
    }),
    task({
      title: 'Generate a student username', level: 'medium',
      prompt: `University usernames are made of: the first letter of the first name, the full surname, and the last 2 digits of the ID number, all lowercase. For «first = "Kofi"», «surname = "Mensah"», «student_id = "10984523"», print «kmensah23».`,
      starter: R`
        first = "Kofi"
        surname = "Mensah"
        student_id = "10984523"
        `,
      expect: `kmensah23`,
      hints: ['«first[0]» is the first letter.', '«student_id[-2:]» gives the last two characters.', 'Lowercase the whole thing at the end with «.lower()».'],
      solution: R`
        first = "Kofi"
        surname = "Mensah"
        student_id = "10984523"
        username = (first[0] + surname + student_id[-2:]).lower()
        print(username)`
    }),
    task({
      title: 'Palindrome check (no loops)', level: 'medium',
      prompt: `A palindrome reads the same backwards. Ignoring case and spaces, check the phrase «"Never odd or even"». Print the cleaned text, then «True» or «False».

      Expected:
      «neveroddoreven»
      «True»`,
      starter: R`
        phrase = "Never odd or even"
        `,
      expect: `
        neveroddoreven
        True`,
      hints: ['Remove spaces with «.replace(" ", "")» and lowercase with «.lower()».', 'Reverse with the slice «[::-1]» and compare with «==».'],
      solution: R`
        phrase = "Never odd or even"
        cleaned = phrase.replace(" ", "").lower()
        print(cleaned)
        print(cleaned == cleaned[::-1])`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Text statistics report',
      brief: `Given a paragraph of text, produce a statistics report using only string operations and methods (no loops yet). This is a miniature version of what a word processor's "word count" feature does.`,
      reqs: ['Number of characters, with and without spaces', 'Number of words (use «split()»)', 'How many times the word "data" appears (case-insensitive)', 'The first and last word', 'The paragraph converted to a URL "slug": lowercase, with spaces replaced by hyphens and the full stops removed', 'Output neatly aligned using f-string width specifiers'],
      sample: `
        Characters (with spaces):     94
        Characters (no spaces):       79
        Words:                        16
        'data' occurrences:            3
        First word:                 Data
        Last word:                 data.
        Slug: data-science-turns-raw-data-into-...`,
      starter: R`
        text = "Data science turns raw data into insight. Good analysts question every source of data."
        `,
      solution: R`
        text = "Data science turns raw data into insight. Good analysts question every source of data."

        chars_with = len(text)
        chars_without = len(text.replace(" ", ""))
        words = text.split()
        data_count = text.lower().count("data")
        slug = text.lower().replace(".", "").replace(" ", "-")

        print(f"{'Characters (with spaces):':<26}{chars_with:>6}")
        print(f"{'Characters (no spaces):':<26}{chars_without:>6}")
        print(f"{'Words:':<26}{len(words):>6}")
        print(f"{'data occurrences:':<26}{data_count:>6}")
        print(f"{'First word:':<26}{words[0]:>6}")
        print(f"{'Last word:':<26}{words[-1]:>6}")
        print(f"Slug: {slug}")`,
      explain: `«.count("data")» counts substrings, so it would also count "database". Counting whole words properly needs a loop or a comprehension, which you will learn soon. Revisit this assignment after lesson 2.5 and improve it.`
    })
  ]
});

/* ------------------------------------------------------------------ 1.4 */
lesson({
  id: 'input', level: 'L1', title: 'Input and type conversion', minutes: 45,
  keywords: 'input int float str conversion casting valueerror',
  goals: ['Read text from the user with «input()»', 'Convert between «str», «int», «float» and «bool»', 'Recognise and understand «ValueError»', 'Write programs that compute with user input'],
  body: [
    section('learn', 'Reading input'),
    p`«input(prompt)» shows the prompt, waits for the user to type a line and press Enter, and **returns what they typed as a string**. Always a string, even if they typed digits.

    In this page there is no keyboard prompt, so each code box that uses «input()» has an **Input** field underneath. Each line in that field is one answer, used in order. Change the values and run again.`,
    code('Asking for a name', { input: 'Akosua' })`
      name = input("What is your name? ")
      print(f"Welcome, {name}!")
      print("Your name has", len(name), "letters.")
    `,
    section('learn', 'The classic beginner bug'),
    code('Input is always text', { input: '20\n5' })`
      a = input("First number: ")
      b = input("Second number: ")
      print("a + b =", a + b)       # joins two strings!
      print(type(a))
    `,
    p`«"20" + "5"» is «"205"»: string concatenation, not addition. To do arithmetic, **convert** the strings first.`,
    section('learn', 'Type conversion (casting)'),
    table(['Function', 'Converts to', 'Examples'], [
      ['«int(x)»', 'integer', '«int("42")» → 42, «int(3.99)» → 3, «int("3.5")» → ValueError'],
      ['«float(x)»', 'float', '«float("3.5")» → 3.5, «float(2)» → 2.0'],
      ['«str(x)»', 'string', '«str(42)» → «"42"»'],
      ['«bool(x)»', 'True/False', '«bool(0)» → False, «bool("")» → False, anything else → True']
    ]),
    code('Converting input', { input: '20\n5' })`
      a = int(input("First number: "))
      b = int(input("Second number: "))
      print(f"{a} + {b} = {a + b}")
      print(f"{a} / {b} = {a / b}")
    `,
    p`Wrapping the call, «int(input(...))», converts immediately. Read it inside-out: first «input» returns a string, then «int» converts it.`,
    code('Floats from input', { input: '1.75\n68' })`
      height = float(input("Height in metres: "))
      weight = float(input("Weight in kg: "))
      bmi = weight / height ** 2
      print(f"Your BMI is {bmi:.1f}")
    `,
    section('learn', 'When conversion fails'),
    code('ValueError', { input: 'twenty', err: true })`
      age = int(input("Age: "))
      print("Next year you will be", age + 1)
    `,
    p`«int("twenty")» cannot work, so Python raises «ValueError: invalid literal for int() with base 10: 'twenty'». For now, accept that bad input crashes the program. In lesson 3.6 you will learn «try» / «except» to handle it gracefully, and in lesson 1.7 how to keep asking until the input is valid.`,
    note('deep', 'Going deeper · truthiness')`Every value in Python has a truth value. These are **falsy**: «False», «None», «0», «0.0», empty string «""», and empty collections («[]», «{}», «()», «set()»). Everything else is **truthy**. A common surprise: «bool("False")» is «True» because the string is not empty. To turn user input such as "yes"/"no" into a boolean, compare explicitly: «answer.strip().lower() == "yes"».`,
    quiz(
      { q: 'The user types «7». What is «type(input())»?', o: ['«int»', '«float»', '«str»', 'It depends on what was typed'], a: 2, why: '«input()» always returns a string.' },
      { q: 'What is «int("8") + int("2")»?', o: ['«"82"»', '«10»', '«82»', 'An error'], a: 1, why: 'Both are converted to integers first, then added.' },
      { q: 'What does «int(9.99)» return?', o: ['«10»', '«9»', '«9.99»', 'ValueError'], a: 1, why: '«int()» truncates toward zero; it does not round.' },
      { q: 'What is «bool("0")»?', o: ['«False»', '«True»', '«0»', 'An error'], a: 1, why: 'It is a non-empty string, so it is truthy. Only the number 0 is falsy.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Rectangle area from input', level: 'easy',
      prompt: `Ask for a width and a height (they may be decimals), then print the area and the perimeter, each with 2 decimals. Use the prompts «Width: » and «Height: ». With inputs 4.5 and 2 the output must be exactly as shown (the Input box already contains them).`,
      input: '4.5\n2',
      starter: R`
        width = float(input("Width: "))
        `,
      expect: `
        Width: 4.5
        Height: 2
        Area: 9.00
        Perimeter: 13.00`,
      hints: ['Area is width × height, perimeter is 2 × (width + height).'],
      solution: R`
        width = float(input("Width: "))
        height = float(input("Height: "))
        print(f"Area: {width * height:.2f}")
        print(f"Perimeter: {2 * (width + height):.2f}")`
    }),
    task({
      title: 'Split the bill', level: 'medium',
      prompt: `Friends share a restaurant bill. Ask for the bill total, the tip percentage and the number of people. Print what each person pays, with 2 decimals. Prompts: «Bill: », «Tip %: », «People: ».`,
      input: '360\n10\n4',
      expect: `
        Bill: 360
        Tip %: 10
        People: 4
        Each person pays 99.00`,
      hints: ['Total with tip = bill × (1 + tip / 100).', 'The number of people should be an «int».'],
      solution: R`
        bill = float(input("Bill: "))
        tip = float(input("Tip %: "))
        people = int(input("People: "))
        total = bill * (1 + tip / 100)
        print(f"Each person pays {total / people:.2f}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Course grade calculator',
      brief: `At many universities a final course mark combines continuous assessment and the final exam. Write a program that asks for a student's name, their assignment mark (out of 100), mid-semester mark (out of 100) and final exam mark (out of 100), then calculates the weighted final mark: assignments 20%, mid-semester 20%, exam 60%.`,
      reqs: ['Prompt for the name and three marks; convert the marks to «float»', 'Store the weights as constants in capital letters', 'Calculate the weighted total', 'Print a summary with the name in upper case and the final mark to 1 decimal place', 'Print how many marks the student was away from 100 (also 1 decimal)'],
      input: 'Kojo\n72\n65\n81',
      sample: `
        Student name: Kojo
        Assignment mark: 72
        Mid-semester mark: 65
        Exam mark: 81
        ----------------------------
        KOJO
        Final mark: 75.0 / 100
        Marks dropped: 25.0`,
      starter: R`
        ASSIGNMENT_WEIGHT = 0.20
        `,
      solution: R`
        ASSIGNMENT_WEIGHT = 0.20
        MIDSEM_WEIGHT = 0.20
        EXAM_WEIGHT = 0.60

        name = input("Student name: ")
        assignment = float(input("Assignment mark: "))
        midsem = float(input("Mid-semester mark: "))
        exam = float(input("Exam mark: "))

        final = (assignment * ASSIGNMENT_WEIGHT
                 + midsem * MIDSEM_WEIGHT
                 + exam * EXAM_WEIGHT)

        print("-" * 28)
        print(name.upper())
        print(f"Final mark: {final:.1f} / 100")
        print(f"Marks dropped: {100 - final:.1f}")`,
      explain: `The calculation is wrapped in brackets so it can span several lines. Inside brackets Python allows line breaks freely, which keeps long formulas readable. In lesson 1.6 you will extend this program to award a letter grade.`
    })
  ]
});

/* ------------------------------------------------------------------ 1.5 */
lesson({
  id: 'booleans', level: 'L1', title: 'Booleans, comparisons and logic', minutes: 45,
  keywords: 'boolean comparison and or not truth table short circuit',
  goals: ['Use the six comparison operators', 'Combine conditions with «and», «or», «not»', 'Read and build truth tables', 'Use chained comparisons like «0 <= x < 10»', 'Explain short-circuit evaluation'],
  body: [
    section('learn', 'Comparison operators'),
    p`A **comparison** produces a boolean: «True» or «False». Booleans are what decisions and loops are built on.`,
    table(['Operator', 'Meaning', 'Example', 'Result'], [
      ['«==»', 'equal to', '«5 == 5»', '«True»'],
      ['«!=»', 'not equal to', '«5 != 3»', '«True»'],
      ['«<»', 'less than', '«3 < 2»', '«False»'],
      ['«>»', 'greater than', '«3 > 2»', '«True»'],
      ['«<=»', 'less than or equal', '«2 <= 2»', '«True»'],
      ['«>=»', 'greater than or equal', '«1 >= 2»', '«False»']
    ]),
    note('warn', '= is not ==')`«=» assigns a value. «==» compares two values. Writing «if score = 50:» is a syntax error in Python (which is a kindness: in some languages it silently does the wrong thing).`,
    code('Comparisons')`
      age = 20
      print(age >= 18)
      print(age == 21)
      print(age != 21)
      print("apple" < "banana")     # strings compare alphabetically
      print("Zebra" < "apple")      # capitals come before lowercase!
      print(0 <= age < 30)          # chained comparison
    `,
    p`Strings are compared **lexicographically** by the code numbers of their characters (Unicode code points), so every uppercase letter sorts before every lowercase one. Compare «a.lower() < b.lower()» when you want dictionary order.

    **Chained comparisons** like «0 <= x < 30» mean «0 <= x and x < 30». This is a Python nicety that reads just like maths.`,
    section('learn', 'Logical operators'),
    table(['A', 'B', 'A and B', 'A or B', 'not A'], [
      ['True', 'True', 'True', 'True', 'False'],
      ['True', 'False', 'False', 'True', 'False'],
      ['False', 'True', 'False', 'True', 'True'],
      ['False', 'False', 'False', 'False', 'True']
    ]),
    ul('«and» is true only when **both** sides are true.', '«or» is true when **at least one** side is true.', '«not» flips a boolean.'),
    code('Combining conditions')`
      gpa = 3.4
      credits = 96
      has_fees_arrears = False

      can_graduate = credits >= 120 and gpa >= 2.0
      deans_list = gpa >= 3.5 or (gpa >= 3.3 and credits >= 90)
      can_register = not has_fees_arrears

      print("Can graduate:", can_graduate)
      print("Dean's list:", deans_list)
      print("Can register:", can_register)
    `,
    p`Precedence: «not» binds tightest, then «and», then «or». So «a or b and c» means «a or (b and c)». Use brackets to make your intent clear.`,
    note('deep', "Going deeper · short-circuit evaluation and De Morgan's laws")`Python evaluates «and»/«or» lazily. In «A and B», if «A» is false, «B» is never evaluated. In «A or B», if «A» is true, «B» is skipped. This lets you write guards like «count != 0 and total / count > 50» without ever dividing by zero. Also, «and»/«or» actually return one of their operands, not necessarily a bool: «"" or "default"» is «"default"».

    **De Morgan's laws** let you push a «not» inside: «not (A and B)» equals «(not A) or (not B)», and «not (A or B)» equals «(not A) and (not B)». You will meet these in discrete mathematics; they are very practical for simplifying conditions.`,
    code('Short-circuit protects you')`
      count = 0
      total = 0
      # Without short-circuit this would divide by zero
      print(count != 0 and total / count > 50)

      name = ""
      display = name or "Anonymous"
      print(display)
    `,
    quiz(
      { q: 'What is «not (5 > 3 and 2 > 4)»?', o: ['«True»', '«False»'], a: 0, why: '5 > 3 is True, 2 > 4 is False, so the «and» is False, and «not False» is True.' },
      { q: 'What is «True or False and False»?', o: ['«True»', '«False»'], a: 0, why: '«and» first: «False and False» is False; then «True or False» is True.' },
      { q: 'Which is equivalent to «not (a or b)»?', o: ['«not a or not b»', '«not a and not b»', '«a and b»', '«not a and b»'], a: 1, why: "De Morgan's law." },
      { q: 'What is «"Banana" < "apple"»?', o: ['«True»', '«False»', 'An error'], a: 0, why: 'Uppercase letters have smaller code points than lowercase ones.' },
      { q: 'What is «1 < 5 < 3»?', o: ['«True»', '«False»'], a: 1, why: 'It means «1 < 5 and 5 < 3»; the second part is False.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Leap year rule', level: 'medium',
      prompt: `A year is a leap year if it is divisible by 4, **except** years divisible by 100, **unless** they are also divisible by 400. Write a single boolean expression stored in «is_leap» and print it for each of the years given. Expected output: «2024 True», «1900 False», «2000 True», «2023 False».`,
      starter: R`
        for year in [2024, 1900, 2000, 2023]:
            is_leap = False   # replace False with your expression
            print(year, is_leap)`,
      expect: `
        2024 True
        1900 False
        2000 True
        2023 False`,
      hints: ['The loop (lesson 1.8) runs your line once for each year. Only change the expression.', '«year % 4 == 0 and year % 100 != 0» covers most years.', 'Add «or year % 400 == 0» for the exception to the exception.'],
      solution: R`
        for year in [2024, 1900, 2000, 2023]:
            is_leap = (year % 4 == 0 and year % 100 != 0) or year % 400 == 0
            print(year, is_leap)`
    }),
    task({
      title: 'Scholarship eligibility', level: 'medium',
      prompt: `A student qualifies for a scholarship if their GPA is at least 3.5 **and** their family income is below 50000, **or** if they are a national sports representative regardless of the other two. Print «Eligible: True» for the given values.`,
      starter: R`
        gpa = 3.2
        income = 30000
        sports_rep = True
        `,
      expect: `Eligible: True`,
      hints: ['«(gpa >= 3.5 and income < 50000) or sports_rep»'],
      solution: R`
        gpa = 3.2
        income = 30000
        sports_rep = True
        eligible = (gpa >= 3.5 and income < 50000) or sports_rep
        print(f"Eligible: {eligible}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Truth table generator',
      brief: `In logic and digital systems courses you constantly need truth tables. Write a program that prints the complete truth table for the expression «(A and not B) or C» for all 8 combinations of A, B and C. Then, in the same program, verify one of De Morgan's laws by printing a table of «not (A and B)» next to «(not A) or (not B)» for all four combinations of A and B.`,
      reqs: ['Print a header row and 8 rows for «(A and not B) or C»', 'Use the provided nested loops (you only need to write the expressions and the print lines)', 'Align the columns with f-string widths', "Print the De Morgan table and a final line confirming whether both columns always match"],
      starter: R`
        print(f"{'A':<7}{'B':<7}{'C':<7}{'(A and not B) or C'}")
        for A in [False, True]:
            for B in [False, True]:
                for C in [False, True]:
                    pass  # compute and print the row
        `,
      solution: R`
        print(f"{'A':<7}{'B':<7}{'C':<7}{'(A and not B) or C'}")
        for A in [False, True]:
            for B in [False, True]:
                for C in [False, True]:
                    result = (A and not B) or C
                    print(f"{A!s:<7}{B!s:<7}{C!s:<7}{result!s}")

        print()
        print(f"{'A':<7}{'B':<7}{'not(A and B)':<15}{'not A or not B'}")
        always_equal = True
        for A in [False, True]:
            for B in [False, True]:
                left = not (A and B)
                right = (not A) or (not B)
                always_equal = always_equal and (left == right)
                print(f"{A!s:<7}{B!s:<7}{left!s:<15}{right!s}")
        print("De Morgan holds:", always_equal)`,
      explain: `«!s» inside an f-string converts the value with «str()» before formatting. Booleans are a subclass of «int», so without «!s» the width specifier would format them as the numbers 0 and 1. The variable «always_equal» starts as «True» and is combined with each row's comparison; one mismatch would make it «False» for good. This "accumulator" pattern appears again in the loops lessons.`
    })
  ]
});

/* ------------------------------------------------------------------ 1.6 */
lesson({
  id: 'conditionals', level: 'L1', title: 'Decisions with if, elif and else', minutes: 60,
  keywords: 'if elif else conditional indentation nested ternary match',
  goals: ['Write «if», «if/else» and «if/elif/else» statements', 'Understand that indentation defines code blocks', 'Order «elif» conditions correctly', 'Nest conditions and know when to flatten them', 'Use the conditional expression and «match»'],
  body: [
    section('learn', 'The if statement'),
    code('if / else', { input: '17' })`
      age = int(input("Age: "))
      if age >= 18:
          print("You can vote.")
          print("Remember to register.")
      else:
          print("You cannot vote yet.")
          print(f"Wait {18 - age} more year(s).")
      print("This line always runs.")
    `,
    p`Anatomy of an «if»: the keyword, a condition, a **colon**, then an **indented block**. Python uses indentation (4 spaces by convention) to know which lines belong to the block. All lines indented under the «if» run only when the condition is true. The «else» block runs otherwise. The final unindented line is outside both blocks and always runs.`,
    note('warn', 'Indentation is syntax')`In most languages indentation is only style. In Python it is meaning. Mixing tabs and spaces or misaligning a line gives «IndentationError». Use 4 spaces (the editor here inserts 4 spaces when you press Tab).`,
    section('learn', 'Several choices: elif'),
    code('Grade bands with elif', { input: '74' })`
      mark = int(input("Mark: "))
      if mark >= 80:
          grade = "A"
      elif mark >= 75:
          grade = "B+"
      elif mark >= 70:
          grade = "B"
      elif mark >= 65:
          grade = "C+"
      elif mark >= 60:
          grade = "C"
      elif mark >= 50:
          grade = "D"
      else:
          grade = "F"
      print(f"Mark {mark} -> grade {grade}")
    `,
    p`Python checks the conditions **top to bottom** and runs the **first** block whose condition is true, then skips the rest. That is why we don't need «mark >= 75 and mark < 80» for B+: if we reach that line we already know «mark < 80». Order matters: if you put «mark >= 50» first, every passing student would get a D.`,
    section('learn', 'Nested conditions'),
    code('Nested if', { input: 'yes\n2.8' })`
      registered = input("Registered for the semester? (yes/no) ").strip().lower() == "yes"
      gpa = float(input("GPA: "))

      if registered:
          if gpa >= 2.0:
              print("Good standing.")
          else:
              print("Academic probation.")
      else:
          print("Please register first.")
    `,
    p`Nesting is fine, but deep nesting (three or more levels) gets hard to read. Often you can flatten with «and» or by handling the special case first and stopping early (you will see "early return" with functions).`,
    section('learn', 'Conditional expressions'),
    code('One-line if/else expression')`
      temperature = 31
      advice = "Stay hydrated" if temperature > 30 else "Normal day"
      print(advice)

      n = 7
      print(f"{n} is {'even' if n % 2 == 0 else 'odd'}")
    `,
    p`«X if condition else Y» is an **expression**: it produces a value. Use it for short choices between two values. For anything longer, use a normal «if» statement.`,
    section('learn', 'Pattern matching with match (Python 3.10+)'),
    code('match / case', { input: '3' })`
      choice = input("Menu: 1) Register 2) Results 3) Fees 4) Exit\nChoose: ")
      match choice:
          case "1":
              print("Opening course registration...")
          case "2":
              print("Showing your results...")
          case "3" | "fees":
              print("Fees balance: 0.00")
          case "4":
              print("Goodbye")
          case _:
              print("Invalid choice")
    `,
    p`«match» compares a value against **patterns** in order. «|» means "or", and «_» is the wildcard that matches anything (like «else»). Structural pattern matching can also destructure lists and objects; for menus like this one, an «if/elif» chain is equally good.`,
    note('deep', 'Going deeper · control flow and testing every branch')`An «if/elif/else» chain with *n* branches creates *n* possible paths. Good testing means choosing inputs that exercise **every** branch, including the **boundary values** (here 79, 80, 49, 50). Off-by-one mistakes («>» instead of «>=») hide exactly at the boundaries. Software engineering courses call this boundary value analysis.`,
    quiz(
      { q: 'With «x = 15», what prints?', code: R`
          if x > 10:
              print("A")
          elif x > 5:
              print("B")
          else:
              print("C")`, o: ['«A»', '«B»', '«A» and «B»', '«C»'], a: 0, why: 'Only the first true branch runs; the rest are skipped.' },
      { q: 'Why does the order of «elif» branches matter?', o: ['It does not matter', 'Python runs the first branch whose condition is true', 'Python runs all true branches', 'Python sorts conditions automatically'], a: 1, why: 'Once a branch runs, the chain is finished.' },
      { q: 'What is «"hot" if 25 > 30 else "mild"»?', o: ['«"hot"»', '«"mild"»', '«True»', 'An error'], a: 1, why: 'The condition is false, so the else value is used.' },
      { q: 'What causes «IndentationError»?', o: ['Too many «elif»s', 'Inconsistent or missing indentation in a block', 'Using «else» without «elif»', 'A missing «print»'], a: 1, why: 'Blocks are defined by indentation; it must be consistent.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Even, odd, or zero', level: 'easy',
      prompt: `Read an integer. Print «zero» if it is 0, otherwise «even» or «odd». The Input box contains «-7».`,
      input: '-7',
      starter: R`
        n = int(input("Number: "))
        `,
      expect: `
        Number: -7
        odd`,
      hints: ['Check for zero first.', '«-7 % 2» is «1» in Python, so the usual test works for negatives too.'],
      solution: R`
        n = int(input("Number: "))
        if n == 0:
            print("zero")
        elif n % 2 == 0:
            print("even")
        else:
            print("odd")`
    }),
    task({
      title: 'Triangle classifier', level: 'medium',
      prompt: `Read three side lengths. First check they can form a triangle (each side must be less than the sum of the other two); if not, print «not a triangle». Otherwise print «equilateral», «isosceles» or «scalene». Input: 5, 5, 8.`,
      input: '5\n5\n8',
      starter: R`
        a = float(input("a: "))
        b = float(input("b: "))
        c = float(input("c: "))
        `,
      expect: `
        a: 5
        b: 5
        c: 8
        isosceles`,
      hints: ['Triangle check: «a < b + c and b < a + c and c < a + b».', 'Equilateral: all three equal. Isosceles: any two equal.'],
      solution: R`
        a = float(input("a: "))
        b = float(input("b: "))
        c = float(input("c: "))
        if not (a < b + c and b < a + c and c < a + b):
            print("not a triangle")
        elif a == b == c:
            print("equilateral")
        elif a == b or b == c or a == c:
            print("isosceles")
        else:
            print("scalene")`
    }),
    task({
      title: 'Electricity bill tiers', level: 'hard',
      prompt: `A utility charges in tiers: the first 50 kWh cost 0.80 each, the next 100 kWh (51–150) cost 1.20 each, and everything above 150 kWh costs 1.50 each. Read the units used and print the bill with 2 decimals. Input: 210 → «Bill: 250.00».`,
      input: '210',
      starter: R`
        units = int(input("Units: "))
        `,
      expect: `
        Units: 210
        Bill: 250.00`,
      hints: ['Calculate each tier separately. For 210 units: 50 × 0.80 + 100 × 1.20 + 60 × 1.50.', 'Use «elif units <= 150:» for the middle tier.'],
      solution: R`
        units = int(input("Units: "))
        if units <= 50:
            bill = units * 0.80
        elif units <= 150:
            bill = 50 * 0.80 + (units - 50) * 1.20
        else:
            bill = 50 * 0.80 + 100 * 1.20 + (units - 150) * 1.50
        print(f"Bill: {bill:.2f}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Grade calculator, part 2',
      brief: `Extend the course grade calculator from lesson 1.4. After computing the weighted mark, assign a letter grade and grade point using this scale, and print a remark.

      A 80–100 (4.0) · B+ 75–79 (3.5) · B 70–74 (3.0) · C+ 65–69 (2.5) · C 60–64 (2.0) · D+ 55–59 (1.5) · D 50–54 (1.0) · F below 50 (0.0)`,
      reqs: ['Reject marks outside 0–100 with an error message instead of computing a grade', 'Use an «if/elif/else» chain ordered from highest to lowest band', 'Set both a letter grade and a grade point in each branch', 'Print «Distinction» for A, «Pass» for B+ to D, and «Fail – resit required» for F', 'Test your program with the boundary values 80, 79.9, 50 and 49.9'],
      input: 'Kojo\n72\n65\n81',
      sample: `
        Student name: Kojo
        Assignment mark: 72
        Mid-semester mark: 65
        Exam mark: 81
        KOJO: 75.0 -> B+ (3.5) Pass`,
      starter: R`
        name = input("Student name: ")
        assignment = float(input("Assignment mark: "))
        midsem = float(input("Mid-semester mark: "))
        exam = float(input("Exam mark: "))
        `,
      solution: R`
        name = input("Student name: ")
        assignment = float(input("Assignment mark: "))
        midsem = float(input("Mid-semester mark: "))
        exam = float(input("Exam mark: "))

        if not (0 <= assignment <= 100 and 0 <= midsem <= 100 and 0 <= exam <= 100):
            print("Error: every mark must be between 0 and 100.")
        else:
            final = assignment * 0.2 + midsem * 0.2 + exam * 0.6
            if final >= 80:
                grade, point = "A", 4.0
            elif final >= 75:
                grade, point = "B+", 3.5
            elif final >= 70:
                grade, point = "B", 3.0
            elif final >= 65:
                grade, point = "C+", 2.5
            elif final >= 60:
                grade, point = "C", 2.0
            elif final >= 55:
                grade, point = "D+", 1.5
            elif final >= 50:
                grade, point = "D", 1.0
            else:
                grade, point = "F", 0.0

            if grade == "A":
                remark = "Distinction"
            elif grade == "F":
                remark = "Fail – resit required"
            else:
                remark = "Pass"
            print(f"{name.upper()}: {final:.1f} -> {grade} ({point}) {remark}")`,
      explain: `The validation happens first, so the grading code only ever sees valid marks. A useful habit: deal with bad input at the edge of the program and keep the main logic simple. Note the boundary at 79.9: because the chain uses «>=», 79.9 correctly falls into B+.`
    })
  ]
});

/* ------------------------------------------------------------------ 1.7 */
lesson({
  id: 'while-loops', level: 'L1', title: 'Repetition with while loops', minutes: 55,
  keywords: 'while loop break continue sentinel infinite validation counter accumulator',
  goals: ['Write «while» loops with a correct stopping condition', 'Use counters and accumulators', 'Validate input by asking again', 'Use «break», «continue» and the loop «else»', 'Recognise and avoid infinite loops'],
  body: [
    section('learn', 'Repeat while a condition is true'),
    code('Counting with while')`
      count = 1
      while count <= 5:
          print("Count is", count)
          count += 1
      print("Done. count is now", count)
    `,
    p`A «while» loop checks its condition; if true, it runs the block, then goes back and checks again. The loop stops the first time the condition is false. Three parts must be right: **initialise** the variable before the loop («count = 1»), **test** it in the condition, and **update** it inside the loop («count += 1»).`,
    note('warn', 'Infinite loops')`If the update is missing, the condition never becomes false and the loop runs forever. On your computer, press **Ctrl+C** to stop it. In this page an infinite loop freezes the tab, so reload the page if that happens. Always check: "what makes this condition false eventually?"`,
    section('learn', 'Accumulators'),
    code('Sum and product of 1..n')`
      n = 10
      total = 0          # accumulator for a sum starts at 0
      product = 1        # accumulator for a product starts at 1
      i = 1
      while i <= n:
          total += i
          product *= i
          i += 1
      print(f"Sum of 1..{n} = {total}")
      print(f"{n}! = {product}")
    `,
    section('learn', 'Sentinel loops: stop on a special value'),
    code('Average of marks until "done"', { input: '67\n82\n74\ndone' })`
      total = 0
      count = 0
      entry = input("Mark (or 'done'): ")
      while entry != "done":
          total += float(entry)
          count += 1
          entry = input("Mark (or 'done'): ")

      if count > 0:
          print(f"{count} marks, average {total / count:.2f}")
      else:
          print("No marks entered.")
    `,
    p`A **sentinel** is a special value that signals the end of the data. Notice the pattern: read once before the loop, then read again at the **end** of the loop body. Also note the guard against dividing by zero.`,
    section('learn', 'Input validation'),
    code('Keep asking until valid', { input: '150\n-3\n42' })`
      age = int(input("Enter age (0-120): "))
      while age < 0 or age > 120:
          print("That is not a valid age, try again.")
          age = int(input("Enter age (0-120): "))
      print("Thank you, age", age, "recorded.")
    `,
    section('learn', 'break, continue and while True'),
    code('break and continue', { input: 'hello\n\nworld\nquit' })`
      while True:                       # loop "forever"...
          text = input("Say something (quit to stop): ")
          if text == "quit":
              break                     # ...until break exits the loop
          if text == "":
              print("  (empty, skipped)")
              continue                  # jump back to the top of the loop
          print("  You said:", text.upper())
      print("Bye!")
    `,
    p`«break» leaves the loop immediately. «continue» skips the rest of the current iteration and goes back to the condition. The «while True: ... break» pattern is common when the exit decision is easiest to make in the middle of the loop body.`,
    code('The loop else clause')`
      n = 97
      d = 2
      while d * d <= n:
          if n % d == 0:
              print(n, "is divisible by", d)
              break
          d += 1
      else:
          print(n, "is prime")
    `,
    p`A loop's «else» block runs only if the loop finished **without** hitting «break». It is perfect for search loops: "if we never found a divisor, the number is prime".`,
    note('deep', 'Going deeper · why d * d <= n?')`If «n» has a divisor larger than √n, it must also have one smaller than √n (they come in pairs, «d × (n/d)»). So checking up to √n is enough. This turns the work from about *n* steps into about √n steps: for n = 1,000,000 that is 1,000 checks instead of a million. Thinking about how the number of steps grows with input size is **algorithm analysis**, written in Big-O notation: this primality test is O(√n). You will use this idea throughout a CS degree.`,
    quiz(
      { q: 'How many times does this print?', code: R`
          i = 0
          while i < 5:
              print(i)
              i += 2`, o: ['5', '3', '2', 'Forever'], a: 1, why: 'i takes the values 0, 2, 4; then 6 fails the condition.' },
      { q: 'What does «continue» do?', o: ['Exits the loop', 'Skips to the next iteration', 'Pauses the program', 'Restarts the program'], a: 1, why: 'The rest of the body is skipped and the condition is checked again.' },
      { q: 'When does a «while ... else» block run?', o: ['Always', 'When the loop ends without «break»', 'Only after a «break»', 'When the condition is initially false only'], a: 1, why: 'The else clause is skipped if the loop was exited with «break».' },
      { q: 'What is the starting value of an accumulator for a product?', o: ['0', '1', '-1', 'None'], a: 1, why: 'Multiplying by 0 would make every result 0.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Countdown', level: 'easy',
      prompt: `Use a «while» loop to print the numbers from 5 down to 1, each on its own line, then «Lift off!».`,
      expect: `
        5
        4
        3
        2
        1
        Lift off!`,
      hints: ['Start at 5 and use «-= 1».'],
      solution: R`
        n = 5
        while n > 0:
            print(n)
            n -= 1
        print("Lift off!")`
    }),
    task({
      title: 'Digits of a number', level: 'medium',
      prompt: `Read a positive integer and print how many digits it has and the sum of its digits, **using a while loop with // and %**, not strings. Input: 90417 → «Digits: 5» and «Sum: 21».`,
      input: '90417',
      starter: R`
        n = int(input("n: "))
        `,
      expect: `
        n: 90417
        Digits: 5
        Sum: 21`,
      hints: ['Loop while «n > 0».', 'In each iteration add «n % 10» to the sum, then do «n //= 10».'],
      solution: R`
        n = int(input("n: "))
        digits = 0
        total = 0
        while n > 0:
            total += n % 10
            n //= 10
            digits += 1
        print(f"Digits: {digits}")
        print(f"Sum: {total}")`
    }),
    task({
      title: 'Collatz sequence', level: 'hard',
      prompt: `The Collatz rule: if n is even, halve it; if odd, make it «3n + 1». Repeat until n is 1. Starting from «n = 6», print the sequence on one line separated by spaces, then the number of steps. Expected: «6 3 10 5 16 8 4 2 1» and «Steps: 8».`,
      starter: R`
        n = 6
        `,
      expect: `
        6 3 10 5 16 8 4 2 1
        Steps: 8`,
      hints: ['Use «print(n, end=" ")» to stay on the same line. «end» replaces the default newline.', 'Print the final 1 after the loop, then use «print()» for a newline if needed.'],
      solution: R`
        n = 6
        steps = 0
        while n != 1:
            print(n, end=" ")
            if n % 2 == 0:
                n = n // 2
            else:
                n = 3 * n + 1
            steps += 1
        print(n)
        print(f"Steps: {steps}")`,
      explain: `Nobody has proved that this loop ends for every starting number. The Collatz conjecture is a famous unsolved problem in mathematics, and an example of why proving termination of loops is hard in general.`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'ATM simulator',
      brief: `Build a simple menu-driven ATM. The account starts with a balance of 500 and PIN 2580. The user gets 3 attempts to enter the right PIN. After logging in, they see a menu repeatedly until they choose to exit.`,
      reqs: ['PIN check with at most 3 attempts; after 3 wrong attempts print «Card blocked» and end', 'Menu: 1 Balance, 2 Deposit, 3 Withdraw, 4 Exit, shown in a loop', 'Deposits must be positive; withdrawals must be positive and not exceed the balance', 'Print the balance with 2 decimals after every transaction', 'Count the transactions and print the total when the user exits'],
      input: '1111\n2580\n1\n2\n250\n3\n1000\n3\n100\n4',
      sample: `
        PIN: 1111
        Wrong PIN. 2 attempt(s) left.
        PIN: 2580
        1) Balance 2) Deposit 3) Withdraw 4) Exit
        Choice: 1
        Balance: 500.00
        ...`,
      starter: R`
        balance = 500.0
        PIN = "2580"
        `,
      solution: R`
        balance = 500.0
        PIN = "2580"

        attempts = 3
        logged_in = False
        while attempts > 0:
            if input("PIN: ") == PIN:
                logged_in = True
                break
            attempts -= 1
            if attempts > 0:
                print(f"Wrong PIN. {attempts} attempt(s) left.")

        if not logged_in:
            print("Card blocked")
        else:
            transactions = 0
            while True:
                print("1) Balance 2) Deposit 3) Withdraw 4) Exit")
                choice = input("Choice: ")
                if choice == "1":
                    print(f"Balance: {balance:.2f}")
                elif choice == "2":
                    amount = float(input("Deposit amount: "))
                    if amount <= 0:
                        print("Amount must be positive.")
                    else:
                        balance += amount
                        transactions += 1
                        print(f"Deposited. Balance: {balance:.2f}")
                elif choice == "3":
                    amount = float(input("Withdraw amount: "))
                    if amount <= 0:
                        print("Amount must be positive.")
                    elif amount > balance:
                        print("Insufficient funds.")
                    else:
                        balance -= amount
                        transactions += 1
                        print(f"Withdrawn. Balance: {balance:.2f}")
                elif choice == "4":
                    print(f"Goodbye. {transactions} transaction(s) made.")
                    break
                else:
                    print("Invalid choice.")`,
      explain: `Two loops with different jobs: the first is a bounded retry loop (at most 3 iterations, with «break» on success); the second is the main menu loop («while True» with «break» on exit). The «logged_in» flag carries the result of the first loop to the rest of the program. Try changing the Input box to three wrong PINs and run the solution again.`
    })
  ]
});

/* ------------------------------------------------------------------ 1.8 */
lesson({
  id: 'for-loops', level: 'L1', title: 'for loops and range', minutes: 60,
  keywords: 'for loop range iterate nested loop pattern',
  goals: ['Iterate over strings and ranges with «for»', 'Master «range(start, stop, step)»', 'Choose between «for» and «while»', 'Write nested loops to produce tables and patterns', 'Reason about how many times a loop body runs'],
  body: [
    section('learn', 'Looping over a sequence'),
    p`A «for» loop takes each item of a sequence in turn and runs the block once per item. You do not manage a counter yourself, so «for» loops cannot accidentally become infinite.`,
    code('for over a string')`
      for letter in "Python":
          print(letter, end=" ")
      print()

      vowels = 0
      for ch in "Computer Science":
          if ch.lower() in "aeiou":
              vowels += 1
      print("Vowels:", vowels)
    `,
    section('learn', 'range()'),
    table(['Call', 'Produces', 'Notes'], [
      ['«range(5)»', '0, 1, 2, 3, 4', 'starts at 0, stops before 5'],
      ['«range(2, 6)»', '2, 3, 4, 5', 'start included, stop excluded'],
      ['«range(0, 20, 5)»', '0, 5, 10, 15', 'third argument is the step'],
      ['«range(10, 0, -2)»', '10, 8, 6, 4, 2', 'negative step counts down'],
      ['«range(5, 5)»', '(nothing)', 'empty: the loop body never runs']
    ]),
    code('range in loops')`
      for i in range(5):
          print("Iteration", i)

      print(list(range(1, 11, 3)))      # list() shows all values at once

      total = 0
      for n in range(1, 101):
          total += n
      print("1 + 2 + ... + 100 =", total)

      for k in range(10, 0, -3):
          print(k, end=" ")
      print()
    `,
    p`«range(n)» runs exactly **n** times. The stop value is excluded for the same reason slicing excludes it: «range(a, b)» has exactly «b - a» values.`,
    section('learn', 'for or while?'),
    ul('Use **for** when you know what you are iterating over: each character, each item, each number in a range.', 'Use **while** when you repeat until something happens and you do not know in advance how many times: valid input, a sentinel, a game ending.'),
    section('learn', 'Nested loops'),
    code('Multiplication table')`
      for row in range(1, 6):
          for col in range(1, 6):
              print(f"{row * col:4}", end="")
          print()
    `,
    p`The inner loop runs completely for **each** iteration of the outer loop. Here the outer loop runs 5 times and the inner loop 5 times each, so the body runs 5 × 5 = 25 times.`,
    code('Patterns')`
      n = 5
      for i in range(1, n + 1):
          print("*" * i)

      print()
      for i in range(1, n + 1):
          print(" " * (n - i) + "*" * (2 * i - 1))
    `,
    note('deep', 'Going deeper · counting iterations (time complexity)')`A single loop over n items does about n units of work: **O(n)**. Two nested loops each over n items do n² units: **O(n²)**. For n = 1,000 that is a million steps; for n = 100,000 it is ten billion, which takes far too long. Whenever you write nested loops over large data, ask whether there is a way to avoid the inner loop (often a set or dictionary, Level 2).`,
    code('Using break in a for loop: first match')`
      word = "programming"
      for i in range(len(word)):
          if word[i] == "g":
              print("First 'g' at index", i)
              break
      else:
          print("No 'g' found")
    `,
    quiz(
      { q: 'What does «list(range(3, 12, 4))» give?', o: ['«[3, 7, 11]»', '«[3, 7, 11, 15]»', '«[4, 8]»', '«[3, 4, 5, ..., 11]»'], a: 0, why: 'Start 3, add 4 each time, stop before 12.' },
      { q: 'How many times does the inner print run?', code: R`
          for i in range(4):
              for j in range(3):
                  print(i, j)`, o: ['7', '12', '3', '4'], a: 1, why: '4 outer iterations × 3 inner iterations.' },
      { q: 'What does «print("a", end="")» do differently?', o: ['Prints nothing', 'Does not move to a new line afterwards', 'Prints «a» twice', 'Raises an error'], a: 1, why: '«end» replaces the default newline character.' },
      { q: 'Which loop fits "keep asking for a password until it is correct"?', o: ['«for»', '«while»'], a: 1, why: 'You do not know in advance how many attempts will be needed.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'FizzBuzz', level: 'medium',
      prompt: `The classic interview question. For numbers 1 to 15: print «Fizz» for multiples of 3, «Buzz» for multiples of 5, «FizzBuzz» for multiples of both, otherwise the number itself.`,
      expect: `
        1
        2
        Fizz
        4
        Buzz
        Fizz
        7
        8
        Fizz
        Buzz
        11
        Fizz
        13
        14
        FizzBuzz`,
      hints: ['Check the "both" case first, or it will never be reached.', 'Multiple of both 3 and 5 means multiple of 15.'],
      solution: R`
        for n in range(1, 16):
            if n % 15 == 0:
                print("FizzBuzz")
            elif n % 3 == 0:
                print("Fizz")
            elif n % 5 == 0:
                print("Buzz")
            else:
                print(n)`
    }),
    task({
      title: 'Primes up to 30', level: 'medium',
      prompt: `Print all prime numbers from 2 to 30 on one line separated by spaces. Use a nested loop with «for ... else».`,
      expect: `2 3 5 7 11 13 17 19 23 29`,
      hints: ['Outer loop over «n» in «range(2, 31)».', 'Inner loop over «d» in «range(2, n)»; «break» if «n % d == 0».', 'In the inner loop\'s «else», print «n» with «end=" "». To avoid a trailing space, collect the primes in a string and print it at the end.'],
      solution: R`
        result = ""
        for n in range(2, 31):
            for d in range(2, n):
                if n % d == 0:
                    break
            else:
                result += str(n) + " "
        print(result.strip())`
    }),
    task({
      title: 'Number pyramid', level: 'medium',
      prompt: `Print this pattern for «n = 4» using nested loops (no trailing spaces on any line):

      «1»
      «1 2»
      «1 2 3»
      «1 2 3 4»`,
      expect: `
        1
        1 2
        1 2 3
        1 2 3 4`,
      hints: ['Build each line as a string inside the outer loop.', 'Or use «" ".join(...)», which you met in the strings lesson.'],
      solution: R`
        n = 4
        for row in range(1, n + 1):
            line = ""
            for k in range(1, row + 1):
                line += str(k) + " "
            print(line.strip())`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Loan repayment schedule',
      brief: `Produce a month-by-month amortisation schedule for a loan, a calculation used in finance and economics courses. A loan of 12,000 is repaid over 12 months at 18% annual interest. The fixed monthly payment is «P = L · r / (1 − (1 + r)^(−n))» where «r» is the monthly rate (annual / 12) and «n» the number of months.`,
      reqs: ['Compute the monthly payment with the formula', 'Use a «for» loop over months 1 to 12', 'Each month: interest = balance × r; principal = payment − interest; balance decreases by principal', 'Print a table with columns Month, Payment, Interest, Principal, Balance, aligned with f-strings', 'After the loop print the total interest paid'],
      sample: `
        Monthly payment: 1100.16
        Month   Payment  Interest Principal   Balance
            1   1100.16    180.00    920.16  11079.84
            2   1100.16    166.20    933.96  10145.88
        ...
           12   1100.16     16.26   1083.90      0.00
        Total interest: 1201.92`,
      starter: R`
        loan = 12000
        annual_rate = 0.18
        months = 12
        `,
      solution: R`
        loan = 12000
        annual_rate = 0.18
        months = 12

        r = annual_rate / 12
        payment = loan * r / (1 - (1 + r) ** -months)
        print(f"Monthly payment: {payment:.2f}")
        print(f"{'Month':>5}{'Payment':>10}{'Interest':>10}{'Principal':>10}{'Balance':>10}")

        balance = loan
        total_interest = 0
        for month in range(1, months + 1):
            interest = balance * r
            principal = payment - interest
            balance -= principal
            total_interest += interest
            print(f"{month:>5}{payment:>10.2f}{interest:>10.2f}{principal:>10.2f}{abs(balance):>10.2f}")

        print(f"Total interest: {total_interest:.2f}")`,
      explain: `«abs(balance)» hides a tiny negative value like «-0.0000001» that floating point rounding can leave in the final month. In real banking software money is stored as integers (cents) or «Decimal» to avoid this entirely.`
    })
  ]
});

/* ------------------------------------------------------------------ 1.9 */
lesson({
  id: 'project-1', level: 'L1', title: 'Level 1 project: number guessing game', minutes: 90,
  keywords: 'project random game guessing review',
  goals: ['Plan a program before writing it', 'Combine variables, input, conditions and loops in one program', 'Use the «random» module', 'Test a program systematically', 'Review everything in Level 1'],
  body: [
    section('review', 'Level 1 in one page'),
    table(['Concept', 'Syntax', 'Remember'], [
      ['Variable', '«x = 10»', 'A name bound to an object; snake_case'],
      ['Types', '«int float str bool»', '«type(x)», conversions «int() float() str()»'],
      ['Arithmetic', '«+ - * / // % **»', '«/» always float; «//» and «%» are partners'],
      ['Strings', '«s[i] s[a:b] s.upper()»', 'Immutable; methods return new strings'],
      ['f-strings', '«f"{x:.2f}"»', 'Width, alignment, decimals'],
      ['Input', '«int(input("? "))»', 'Always returns a string'],
      ['Logic', '«== != < and or not»', 'Short-circuit; De Morgan'],
      ['Decisions', '«if / elif / else»', 'First true branch wins'],
      ['Loops', '«while cond:», «for x in seq:»', '«break», «continue», loop «else»']
    ]),
    section('learn', 'Step 1: plan before coding'),
    p`Professional programmers rarely start by typing. Write the steps in plain language first, as **pseudocode**:`,
    code('Pseudocode (not Python)', { run: false })`
      pick a secret number between 1 and 100
      set attempts to 0
      repeat:
          ask the player for a guess
          if the guess is not a valid number: tell them and ask again
          add one to attempts
          if guess is too low: say "higher"
          if guess is too high: say "lower"
          if guess is correct: congratulate, show attempts, stop
    `,
    section('learn', 'Step 2: random numbers'),
    code('The random module')`
      import random
      print(random.randint(1, 6))          # a dice roll: 1..6 inclusive
      print(random.choice("ABCD"))         # random element
      print(round(random.random(), 3))     # float in [0.0, 1.0)
      random.seed(42)                      # fixed seed = same "random" sequence each run
      print(random.randint(1, 100), random.randint(1, 100))
    `,
    p`Computers generate **pseudo-random** numbers with a deterministic formula started from a **seed**. Setting the seed makes results reproducible, which is essential for testing and for scientific experiments.`,
    section('build', 'Step 3: the program'),
    code('Number guessing game', { input: '50\n25\nabc\n37\n31\n34' })`
      import random

      secret = 34            # replace with random.randint(1, 100) to play for real
      attempts = 0
      MAX_ATTEMPTS = 7

      print("I am thinking of a number between 1 and 100.")
      while attempts < MAX_ATTEMPTS:
          text = input(f"Guess #{attempts + 1}: ")
          if not text.isdigit():
              print("  Please type a whole number.")
              continue
          guess = int(text)
          attempts += 1
          if guess < secret:
              print("  Higher!")
          elif guess > secret:
              print("  Lower!")
          else:
              print(f"  Correct! You needed {attempts} attempt(s).")
              break
      else:
          print(f"Out of attempts. The number was {secret}.")
    `,
    p`Walk through it with the inputs above. «"abc"» fails «isdigit()», so «continue» skips the rest and does not count the attempt. The loop «else» only runs if the player never guessed right. Change the Input box and explore other paths: guess right first time, or use up all 7 attempts.`,
    note('deep', 'Going deeper · why 7 attempts is enough')`The best strategy is **binary search**: always guess the middle of the remaining range. Each guess halves the possibilities: 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1. Because 2⁷ = 128 ≥ 100, seven guesses always suffice. In general binary search needs about log₂(n) steps: O(log n). It is one of the most important algorithms you will study, and it only works because the "higher/lower" answers tell you which half to keep.`,
    section('practice', 'Tasks'),
    task({
      title: 'Binary search bot', level: 'hard',
      prompt: `Write a program that plays the game **itself**. The secret is 73. The bot keeps a range «low = 1», «high = 100», guesses the middle «(low + high) // 2» each time, and narrows the range based on whether the guess was too low or too high. Print each guess and the result, like this:`,
      starter: R`
        secret = 73
        low, high = 1, 100
        `,
      expect: `
        Guess 50: higher
        Guess 75: lower
        Guess 62: higher
        Guess 68: higher
        Guess 71: higher
        Guess 73: correct in 6 guesses`,
      hints: ['Loop «while low <= high».', 'If the guess is too low, set «low = guess + 1»; if too high, «high = guess - 1».'],
      solution: R`
        secret = 73
        low, high = 1, 100
        count = 0
        while low <= high:
            guess = (low + high) // 2
            count += 1
            if guess < secret:
                print(f"Guess {guess}: higher")
                low = guess + 1
            elif guess > secret:
                print(f"Guess {guess}: lower")
                high = guess - 1
            else:
                print(f"Guess {guess}: correct in {count} guesses")
                break`
    }),
    task({
      title: 'Dice statistics', level: 'medium',
      prompt: `Simulate rolling a die 6000 times using «random.randint». Count how many sixes appear and print the percentage with 1 decimal. Because it is random, there is no fixed expected output; you should see something close to 16.7%. Run it several times and notice how the result varies.`,
      starter: R`
        import random
        `,
      solution: R`
        import random
        sixes = 0
        ROLLS = 6000
        for _ in range(ROLLS):
            if random.randint(1, 6) == 6:
                sixes += 1
        print(f"Sixes: {sixes} ({sixes / ROLLS:.1%})")`,
      explain: `«_» is the conventional name for a loop variable you do not use. The variation between runs shrinks as the number of rolls grows: this is the law of large numbers, and simulations like this are called Monte Carlo methods.`
    }),
    section('assignment', 'Level 1 project'),
    assignment({
      title: 'Rock, paper, scissors championship',
      brief: `Build a complete console game: the player plays rock, paper, scissors against the computer in a best-of-5 match (first to 3 wins). This is your Level 1 capstone; it should use everything from this level.`,
      reqs: ['Accept «r», «p», «s» (and full words, case-insensitive); re-ask on invalid input without counting the round', 'Computer picks randomly with «random.choice»', 'Decide each round with clear rules, including draws (which do not count)', 'Show the running score after every round', 'End when someone reaches 3 wins and announce the champion', 'Ask «Play again? (y/n)» and restart the match if the player says y'],
      input: 'r\np\nx\ns\nr\np\nr\ns\nn',
      sample: `
        Your move (r/p/s): r
          Computer chose s. You win this round!
          Score: You 1 - 0 Computer
        ...
        You are the champion!
        Play again? (y/n): n`,
      starter: R`
        import random
        `,
      solution: R`
        import random

        random.seed(7)   # remove this line for a real game; it makes the demo repeatable
        MOVES = {"r": "rock", "p": "paper", "s": "scissors"}

        play = True
        while play:
            you = 0
            cpu = 0
            while you < 3 and cpu < 3:
                text = input("Your move (r/p/s): ").strip().lower()
                if text in ("rock", "paper", "scissors"):
                    text = text[0]
                if text not in MOVES:
                    print("  Please type r, p or s.")
                    continue
                comp = random.choice("rps")
                print(f"  Computer chose {MOVES[comp]}.", end=" ")
                if text == comp:
                    print("Draw.")
                elif (text, comp) in (("r", "s"), ("p", "r"), ("s", "p")):
                    you += 1
                    print("You win this round!")
                else:
                    cpu += 1
                    print("Computer wins this round.")
                print(f"  Score: You {you} - {cpu} Computer")
            print("You are the champion!" if you == 3 else "The computer wins the match.")
            play = input("Play again? (y/n): ").strip().lower() == "y"`,
      explain: `The solution peeks ahead at two Level 2 ideas: «MOVES» is a **dictionary** mapping letters to names, and «("r", "s")» is a **tuple**. Checking «(text, comp) in (...)» replaces three separate conditions with one membership test. Rewrite the win check using only «if/elif» and «and/or» as an extra exercise; then you will appreciate the shorter version.`
    })
  ]
});
