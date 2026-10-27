/* Level 2: Data structures */
level({
  id: 'L2', num: 2, title: 'Data Structures', tag: 'Beginner → Intermediate',
  blurb: 'Lists, tuples, dictionaries and sets: how to store and organise many values, and how to choose the right structure.',
  outcomes: ['Store collections in lists, tuples, dictionaries and sets', 'Understand mutability, references and copying', 'Write list, dict and set comprehensions', 'Use «enumerate», «zip», «sorted» and «key» functions', 'Model real data (students, products, matrices) with nested structures']
});

/* ------------------------------------------------------------------ 2.1 */
lesson({
  id: 'lists', level: 'L2', title: 'Lists', minutes: 65,
  keywords: 'list append insert remove pop index slice len sum min max',
  goals: ['Create lists and access items by index and slice', 'Add, change and remove items', 'Loop over lists and compute totals, minimums and maximums', 'Use the most important list methods', 'Search a list with «in» and «.index()»'],
  body: [
    section('learn', 'An ordered, changeable collection'),
    p`So far each variable held one value. A **list** holds many values in order, inside square brackets, separated by commas. Lists can grow and shrink, and their items can be changed: they are **mutable**.`,
    code('Creating lists')`
      marks = [67, 82, 74, 91, 58]
      courses = ["Calculus", "Python", "Statistics"]
      mixed = [1, "two", 3.0, True]       # allowed, but usually avoid mixing types
      empty = []

      print(marks)
      print(len(courses), "courses")
      print(courses[0], courses[-1])      # indexing works like strings
      print(marks[1:4])                   # so does slicing
    `,
    section('learn', 'Changing a list'),
    code('Add, change, remove')`
      queue = ["Ama", "Kofi"]
      queue.append("Esi")              # add to the end
      print(queue)
      queue.insert(0, "Yaw")           # insert at index 0
      print(queue)
      queue[1] = "Akua"                # replace the item at index 1
      print(queue)
      queue.remove("Kofi")             # remove the first matching value
      print(queue)
      served = queue.pop(0)            # remove AND return item at index 0
      print("Served:", served, "| Queue:", queue)
      last = queue.pop()               # no index = remove the last item
      print("Last:", last, "| Queue:", queue)
      queue.extend(["Abena", "Kwesi"]) # add several items
      print(queue)
      del queue[0]                     # delete by index
      print(queue)
    `,
    table(['Method', 'Does', 'Returns'], [
      ['«.append(x)»', 'adds x at the end', '«None»'],
      ['«.insert(i, x)»', 'inserts x before index i', '«None»'],
      ['«.extend(iterable)»', 'adds every item of another sequence', '«None»'],
      ['«.remove(x)»', 'removes the first x (ValueError if absent)', '«None»'],
      ['«.pop(i)»', 'removes item at i (default: last)', 'the removed item'],
      ['«.index(x)»', 'finds the position of the first x', 'an int'],
      ['«.count(x)»', 'counts occurrences of x', 'an int'],
      ['«.sort()»', 'sorts the list in place', '«None»'],
      ['«.reverse()»', 'reverses in place', '«None»'],
      ['«.clear()»', 'removes everything', '«None»'],
      ['«.copy()»', 'shallow copy', 'a new list']
    ]),
    note('warn', 'Methods that return None')`«.append()», «.sort()» and friends change the list **in place** and return «None». Writing «marks = marks.sort()» destroys your list (it becomes «None»). Use «marks.sort()» on its own line, or «sorted_marks = sorted(marks)» which returns a new sorted list.`,
    section('learn', 'Looping and aggregating'),
    code('Statistics on a list')`
      marks = [67, 82, 74, 91, 58, 74]
      total = 0
      for m in marks:
          total += m
      print("Total (loop):", total)

      # built-ins do the common jobs for you
      print("Total:", sum(marks))
      print("Average:", round(sum(marks) / len(marks), 2))
      print("Highest:", max(marks), "Lowest:", min(marks))
      print("Sorted:", sorted(marks))
      print("Descending:", sorted(marks, reverse=True))
      print("74 appears", marks.count(74), "times, first at index", marks.index(74))
      print("100 in marks?", 100 in marks)
    `,
    code('Building a list in a loop', { input: '3\nCalculus\nPython\nPhysics' })`
      n = int(input("How many courses? "))
      courses = []
      for i in range(n):
          courses.append(input(f"Course {i + 1}: "))
      print("You registered:", ", ".join(courses))
    `,
    p`Starting with an empty list and calling «.append()» inside a loop is one of the most common patterns in all of programming.`,
    section('learn', 'Lists inside lists'),
    code('A 2D list (matrix)')`
      grid = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
      ]
      print(grid[1])        # the second row
      print(grid[1][2])     # row 1, column 2 -> 6
      for row in grid:
          for value in row:
              print(f"{value:3}", end="")
          print()
    `,
    note('deep', 'Going deeper · how lists work in memory')`A Python list is a **dynamic array** of references. Accessing «a[i]» is **O(1)**: the address is computed directly. «.append()» is **amortised O(1)**: the array keeps spare capacity and occasionally grows by a fixed factor. But «.insert(0, x)» and «.pop(0)» are **O(n)**: every other element must shift one place. For a queue where you remove from the front a lot, use «collections.deque», which is O(1) at both ends. Searching with «x in a_list» is O(n) because it checks items one by one.`,
    quiz(
      { q: 'After «a = [1, 2, 3]; a.append([4, 5])», what is «len(a)»?', o: ['5', '4', '3', 'An error'], a: 1, why: '«append» adds one item, which here is the whole list «[4, 5]». «extend» would add 2 items.' },
      { q: 'What does «nums = nums.sort()» do?', o: ['Sorts «nums»', 'Sets «nums» to «None»', 'Raises an error', 'Returns a sorted copy'], a: 1, why: '«.sort()» sorts in place and returns «None», which is then assigned.' },
      { q: 'What is «[10, 20, 30, 40][-2:]»?', o: ['«[30, 40]»', '«[30]»', '«[20, 30, 40]»', '«40»'], a: 0, why: 'From the second-to-last item to the end.' },
      { q: 'What does «.pop()» return?', o: ['Nothing', 'The removed item', 'The new list', 'The length'], a: 1, why: '«pop» both removes and returns.' },
      { q: 'Which operation is slow (O(n)) on a large list?', o: ['«a[500]»', '«a.append(x)»', '«a.insert(0, x)»', '«len(a)»'], a: 2, why: 'Inserting at the front shifts every element.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Above the average', level: 'easy',
      prompt: `Given the list of marks, print the average (1 decimal) and then a list of the marks that are **strictly above** the average.`,
      starter: R`
        marks = [55, 78, 62, 90, 47, 81, 69]
        `,
      expect: `
        Average: 68.9
        Above average: [78, 90, 81, 69]`,
      hints: ['Compute the average first, store it in a variable.', 'Create an empty list, loop, and «append» marks that are greater than the average.'],
      solution: R`
        marks = [55, 78, 62, 90, 47, 81, 69]
        average = sum(marks) / len(marks)
        above = []
        for m in marks:
            if m > average:
                above.append(m)
        print(f"Average: {average:.1f}")
        print(f"Above average: {above}")`
    }),
    task({
      title: 'Find the maximum yourself', level: 'medium',
      prompt: `Without using «max()», «sort()» or «sorted()», find the largest number and its index in the list. Print «Max 94 at index 4».`,
      starter: R`
        data = [12, 45, 7, 33, 94, 18, 94, 2]
        `,
      expect: `Max 94 at index 4`,
      hints: ['Start with «best = data[0]» and «best_index = 0».', 'Loop over «range(1, len(data))» and update when you find something strictly bigger (so the first 94 wins).'],
      solution: R`
        data = [12, 45, 7, 33, 94, 18, 94, 2]
        best = data[0]
        best_index = 0
        for i in range(1, len(data)):
            if data[i] > best:
                best = data[i]
                best_index = i
        print(f"Max {best} at index {best_index}")`,
      explain: `This is the linear scan algorithm that «max()» uses internally. It looks at each element once: O(n). Using «>» rather than «>=» means ties keep the earliest index.`
    }),
    task({
      title: 'Remove duplicates, keep order', level: 'medium',
      prompt: `Build a new list containing each value of «names» once, in the order they first appear.`,
      starter: R`
        names = ["Ama", "Kofi", "Ama", "Esi", "Kofi", "Yaw", "Esi"]
        `,
      expect: `['Ama', 'Kofi', 'Esi', 'Yaw']`,
      hints: ['Start with «unique = []».', 'Append a name only if it is «not in unique».'],
      solution: R`
        names = ["Ama", "Kofi", "Ama", "Esi", "Kofi", "Yaw", "Esi"]
        unique = []
        for name in names:
            if name not in unique:
                unique.append(name)
        print(unique)`,
      explain: `«name not in unique» scans the list each time, so this is O(n²) overall. In lesson 2.5 you will see a faster O(n) version that uses a set to remember what has been seen.`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Class marks analyser',
      brief: `Write a program that reads marks until the user types «done», stores them in a list, and prints a full analysis. Statistics like these appear in every introductory statistics and research methods course.`,
      reqs: ['Read marks with a sentinel loop; ignore anything that is not a number between 0 and 100 (print a warning)', 'Print the count, mean, minimum and maximum', 'Print the **median**: sort a copy; for an even count, average the two middle values', 'Print the **range** (max − min)', 'Print how many students passed (≥ 50) and the pass rate as a percentage', 'Do not use the «statistics» module (implement it yourself)'],
      input: '67\n82\n45\nabc\n91\n58\n120\n74\ndone',
      sample: `
        Mark (or done): 67
        ...
        Count: 6
        Mean: 69.50
        Median: 70.5
        Min: 45  Max: 91  Range: 46
        Passed: 5 of 6 (83.3%)`,
      starter: R`
        marks = []
        `,
      solution: R`
        marks = []
        while True:
            entry = input("Mark (or done): ").strip()
            if entry == "done":
                break
            if not entry.replace(".", "", 1).isdigit():
                print("  Not a number, ignored.")
                continue
            mark = float(entry)
            if mark > 100:
                print("  Out of range, ignored.")
                continue
            marks.append(mark)

        if not marks:
            print("No marks entered.")
        else:
            n = len(marks)
            ordered = sorted(marks)
            mid = n // 2
            if n % 2 == 1:
                median = ordered[mid]
            else:
                median = (ordered[mid - 1] + ordered[mid]) / 2
            passed = 0
            for m in marks:
                if m >= 50:
                    passed += 1
            print(f"Count: {n}")
            print(f"Mean: {sum(marks) / n:.2f}")
            print(f"Median: {median}")
            print(f"Min: {min(marks):g}  Max: {max(marks):g}  Range: {max(marks) - min(marks):g}")
            print(f"Passed: {passed} of {n} ({passed / n:.1%})")`,
      explain: `«entry.replace(".", "", 1).isdigit()» accepts numbers like «67» and «67.5» but rejects text and negative numbers. The «:g» format drops a useless «.0». For the median, sorting a **copy** with «sorted()» keeps the original order of «marks» intact, which matters if other code relies on the input order.`
    })
  ]
});

/* ------------------------------------------------------------------ 2.2 */
lesson({
  id: 'list-references', level: 'L2', title: 'Mutability, references and copying', minutes: 45,
  keywords: 'mutable immutable reference alias copy deepcopy is identity',
  goals: ['Predict what happens when two names refer to the same list', 'Copy lists correctly (shallow and deep copies)', 'Use «is» versus «==» correctly', 'Avoid the most common list bugs'],
  body: [
    section('learn', 'Two names, one list'),
    p`Remember from lesson 1.1 that variables are references. With immutable values (numbers, strings) this rarely matters. With **mutable** objects like lists it matters a lot.`,
    code('Aliasing')`
      a = [1, 2, 3]
      b = a              # b is another name for the SAME list
      b.append(4)
      print("a:", a)
      print("b:", b)
      print("same object?", a is b)
    `,
    p`«b = a» does **not** copy the list. It makes «b» point to the same list object. Changing the list through either name changes it for both. This is called **aliasing**.`,
    code('Copying')`
      original = [1, 2, 3]
      copy1 = original.copy()
      copy2 = original[:]          # slice of everything
      copy3 = list(original)
      copy1.append(99)
      print("original:", original)
      print("copy1:", copy1)
      print(original == copy2, original is copy2)
    `,
    p`«==» asks "do they have equal contents?". «is» asks "are they the very same object?". Use «==» to compare values. Use «is» only for identity checks, almost always «x is None».`,
    section('learn', 'Shallow vs deep copies'),
    code('Nested lists need a deep copy')`
      import copy
      grid = [[0, 0], [0, 0]]
      shallow = grid.copy()
      deep = copy.deepcopy(grid)

      grid[0][0] = 5
      print("grid:   ", grid)
      print("shallow:", shallow)   # inner lists are shared!
      print("deep:   ", deep)
    `,
    p`A **shallow copy** creates a new outer list but still points to the same inner lists. A **deep copy** recursively copies everything. You need a deep copy whenever a structure contains mutable objects and you want full independence.`,
    section('learn', 'The famous [[0] * n] * m bug'),
    code('Creating a grid the wrong and right way')`
      wrong = [[0] * 3] * 3       # three references to ONE row
      wrong[0][0] = 1
      print(wrong)

      right = []
      for _ in range(3):
          right.append([0] * 3)   # a new row each time
      right[0][0] = 1
      print(right)
    `,
    note('deep', 'Going deeper · mutable arguments')`When you pass a list to a function (Level 3), the function receives a reference to the same list. If the function modifies it, the caller sees the change. Python's argument passing is sometimes called **call by object reference** (or "call by sharing"). This is efficient, since no copying happens, but it is a common source of bugs. Good functions either clearly say they modify their argument (like «list.sort()») or work on a copy and return a new object (like «sorted()»).`,
    code('Strings are safe because they are immutable')`
      s = "hello"
      t = s
      t = t.upper()      # creates a NEW string; s is unaffected
      print(s, t)
    `,
    quiz(
      { q: 'What is printed?', code: R`
          x = [1, 2]
          y = x
          y += [3]
          print(x)`, o: ['«[1, 2]»', '«[1, 2, 3]»', 'An error'], a: 1, why: '«+=» on a list modifies it in place; «x» and «y» are the same list.' },
      { q: 'Which creates an independent copy of a flat list «a»?', o: ['«b = a»', '«b = a[:]»', '«b is a»', '«b == a»'], a: 1, why: 'The full slice creates a new list.' },
      { q: 'When is «copy.deepcopy» needed?', o: ['Always', 'When the list contains other mutable objects that must not be shared', 'Only for strings', 'Never in Python'], a: 1, why: 'Shallow copies share inner objects.' },
      { q: 'What is the recommended way to test for «None»?', o: ['«x == None»', '«x is None»', '«not x»', '«type(x) == None»'], a: 1, why: '«None» is a singleton; identity is the precise test. «not x» would also be true for 0 and empty strings.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Fix the aliasing bug', level: 'easy',
      prompt: `The program wants to keep the original price list unchanged and create a discounted version, but both lists end up discounted. Fix it by changing only the line that creates «discounted».`,
      starter: R`
        prices = [100, 250, 80]
        discounted = prices
        for i in range(len(discounted)):
            discounted[i] = discounted[i] * 0.9
        print("Original:", prices)
        print("Discounted:", discounted)`,
      expect: `
        Original: [100, 250, 80]
        Discounted: [90.0, 225.0, 72.0]`,
      hints: ['Make «discounted» a copy: «prices.copy()» or «prices[:]».'],
      solution: R`
        prices = [100, 250, 80]
        discounted = prices.copy()
        for i in range(len(discounted)):
            discounted[i] = discounted[i] * 0.9
        print("Original:", prices)
        print("Discounted:", discounted)`
    }),
    task({
      title: 'Seating plan grid', level: 'medium',
      prompt: `Create a 3 × 4 seating grid of «"."» characters **correctly** (independent rows). Then mark seat row 1, column 2 with «"X"» and print the grid one row per line with the seats joined by spaces.`,
      expect: `
        . . . .
        . . X .
        . . . .`,
      hints: ['Build the rows in a loop: «grid.append(["."] * 4)».', 'Print each row with «" ".join(row)».'],
      solution: R`
        grid = []
        for _ in range(3):
            grid.append(["."] * 4)
        grid[1][2] = "X"
        for row in grid:
            print(" ".join(row))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Undo history',
      brief: `Text editors keep a history of states so you can undo. Implement a tiny version for a list of to-do items. Each time the list changes, save a **snapshot** of it in a «history» list. The «undo» command restores the previous snapshot. Getting the copying right is the whole point of this assignment.`,
      reqs: ['Commands: «add <item>», «remove <item>», «undo», «show», «quit»', 'Before every change, append a **copy** of the current list to «history»', '«undo» restores the last snapshot (or prints «Nothing to undo»)', 'Print the list after every command', 'Explain in a comment why «history.append(todos)» without copying would be wrong'],
      input: 'add read chapter 3\nadd lab report\nadd gym\nremove gym\nundo\nundo\nshow\nquit',
      starter: R`
        todos = []
        history = []
        `,
      solution: R`
        todos = []
        history = []
        # history.append(todos) would store a reference to the SAME list, so every
        # "snapshot" would change along with todos and undo would restore nothing.

        while True:
            command = input("> ").strip()
            if command == "quit":
                break
            elif command.startswith("add "):
                history.append(todos.copy())
                todos.append(command[4:])
            elif command.startswith("remove "):
                item = command[7:]
                if item in todos:
                    history.append(todos.copy())
                    todos.remove(item)
                else:
                    print(f"  '{item}' is not in the list")
            elif command == "undo":
                if history:
                    todos = history.pop()
                else:
                    print("  Nothing to undo")
            elif command != "show":
                print("  Unknown command")
            print("  ", todos)`,
      explain: `The history list works like a **stack**: snapshots are pushed with «append» and taken off with «pop». Stacks (last in, first out) power undo systems, the browser back button and the function call stack you will meet in lesson 3.3.`
    })
  ]
});

/* ------------------------------------------------------------------ 2.3 */
lesson({
  id: 'tuples', level: 'L2', title: 'Tuples and unpacking', minutes: 35,
  keywords: 'tuple immutable unpacking packing star',
  goals: ['Create tuples and know when to use them instead of lists', 'Unpack tuples into variables, including with «*»', 'Return several values from an expression', 'Understand why tuples can be dictionary keys'],
  body: [
    section('learn', 'An immutable sequence'),
    p`A **tuple** is like a list, but **immutable**: once created, it cannot change. Tuples are written with round brackets (in fact the commas make the tuple; the brackets are often optional).`,
    code('Tuples')`
      point = (3, 4)
      rgb = (255, 128, 0)
      single = ("only",)          # a one-item tuple needs a trailing comma
      not_a_tuple = ("only")      # this is just a string in brackets
      print(point[0], point[1])
      print(len(rgb), max(rgb))
      print(type(single), type(not_a_tuple))
      # point[0] = 10             # TypeError: tuples are immutable
    `,
    section('learn', 'When to use a tuple'),
    ul('**Fixed records** where position has meaning: «(latitude, longitude)», «(day, month, year)», «(name, student_id)».', '**Data that must not change by accident**: constants such as «DAYS = ("Mon", "Tue", ...)».', '**Dictionary keys and set members**: tuples of immutable values are hashable; lists are not.', '**Returning several values** from a function (lesson 3.1).'),
    p`A rule of thumb: a **list** holds many things of the same kind (a list of marks); a **tuple** holds a fixed group of different things that belong together (one student's name, age and programme).`,
    section('learn', 'Unpacking'),
    code('Packing and unpacking')`
      student = ("Adwoa", 21, "Biochemistry")    # packing
      name, age, programme = student             # unpacking
      print(f"{name} ({age}) studies {programme}")

      first, *middle, last = [10, 20, 30, 40, 50]
      print(first, middle, last)

      head, *rest = "Python"
      print(head, rest)

      for name, score in [("Ama", 88), ("Kofi", 72)]:
          print(f"{name:>6}: {score}")
    `,
    p`The number of names on the left must match the number of items, unless one name has a «*», which collects "everything else" into a list. Unpacking directly in a «for» loop is extremely common.`,
    code('divmod returns a tuple')`
      q, r = divmod(17, 5)
      print("quotient", q, "remainder", r)
      result = divmod(17, 5)
      print(result, type(result))
    `,
    note('deep', 'Going deeper · hashability')`Dictionaries and sets locate items using a **hash**: an integer computed from the value. If a value could change after being stored, its hash would change and it would be "lost" inside the table. So only **immutable** (more precisely, *hashable*) objects can be dict keys or set members: numbers, strings, and tuples containing only hashable items. «hash((1, 2))» works; «hash([1, 2])» raises «TypeError: unhashable type: 'list'».`,
    quiz(
      { q: 'Which is a one-item tuple?', o: ['«(5)»', '«(5,)»', '«[5]»', '«tuple 5»'], a: 1, why: 'The trailing comma makes it a tuple.' },
      { q: 'What is «middle» after «a, *middle, b = (1, 2, 3, 4)»?', o: ['«(2, 3)»', '«[2, 3]»', '«2»', 'An error'], a: 1, why: 'Star-unpacking always produces a list.' },
      { q: 'Why can a tuple be a dictionary key but a list cannot?', o: ['Tuples are faster', 'Tuples are immutable and hashable', 'Lists are too long', 'Tuples are sorted'], a: 1, why: 'Keys must have a stable hash.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Distance between points', level: 'easy',
      prompt: `Two points are stored as tuples. Unpack them and print the Euclidean distance with 2 decimals: «Distance: 5.00».`,
      starter: R`
        import math
        p1 = (1, 2)
        p2 = (4, 6)
        `,
      expect: `Distance: 5.00`,
      hints: ['«x1, y1 = p1».', '«math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)».'],
      solution: R`
        import math
        p1 = (1, 2)
        p2 = (4, 6)
        x1, y1 = p1
        x2, y2 = p2
        print(f"Distance: {math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2):.2f}")`
    }),
    task({
      title: 'Top scorer from records', level: 'medium',
      prompt: `Each record is a tuple «(name, score)». Loop with unpacking to find the top scorer and print «Top: Efua with 93».`,
      starter: R`
        records = [("Kwame", 78), ("Efua", 93), ("Nana", 85), ("Kojo", 90)]
        `,
      expect: `Top: Efua with 93`,
      hints: ['Keep «best_name» and «best_score» variables, starting from the first record.'],
      solution: R`
        records = [("Kwame", 78), ("Efua", 93), ("Nana", 85), ("Kojo", 90)]
        best_name, best_score = records[0]
        for name, score in records[1:]:
            if score > best_score:
                best_name, best_score = name, score
        print(f"Top: {best_name} with {best_score}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Timetable clash detector',
      brief: `A lecture slot is a tuple «(course, day, start_hour, end_hour)». Given a student's list of slots, find every pair of courses that clash (same day and overlapping times). Two intervals [s1, e1) and [s2, e2) overlap when «s1 < e2 and s2 < e1».`,
      reqs: ['Store the timetable as a list of 4-tuples', 'Use nested loops so each pair is compared exactly once (inner loop starts at «i + 1»)', 'Unpack each tuple into named variables', 'Print each clash clearly, or «No clashes» if there are none', 'Print how many comparisons were made (it should be n(n−1)/2)'],
      starter: R`
        timetable = [
            ("MATH 121", "Mon", 8, 10),
            ("CSCD 101", "Mon", 9, 11),
            ("PHYS 105", "Tue", 13, 15),
            ("STAT 111", "Mon", 10, 12),
            ("ECON 101", "Tue", 14, 16),
        ]
        `,
      solution: R`
        timetable = [
            ("MATH 121", "Mon", 8, 10),
            ("CSCD 101", "Mon", 9, 11),
            ("PHYS 105", "Tue", 13, 15),
            ("STAT 111", "Mon", 10, 12),
            ("ECON 101", "Tue", 14, 16),
        ]

        clashes = 0
        comparisons = 0
        for i in range(len(timetable)):
            c1, d1, s1, e1 = timetable[i]
            for j in range(i + 1, len(timetable)):
                c2, d2, s2, e2 = timetable[j]
                comparisons += 1
                if d1 == d2 and s1 < e2 and s2 < e1:
                    clashes += 1
                    print(f"Clash on {d1}: {c1} ({s1}-{e1}) and {c2} ({s2}-{e2})")
        if clashes == 0:
            print("No clashes")
        print(f"{comparisons} comparisons for {len(timetable)} slots")`,
      explain: `MATH 121 (8–10) and STAT 111 (10–12) do **not** clash, because one ends exactly when the other starts. Using half-open intervals [start, end) makes this come out right automatically. Comparing every pair is O(n²); sorting slots by day and start time first would let you only compare neighbours, an O(n log n) approach.`
    })
  ]
});

/* ------------------------------------------------------------------ 2.4 */
lesson({
  id: 'dictionaries', level: 'L2', title: 'Dictionaries', minutes: 70,
  keywords: 'dict key value get items keys values update counting',
  goals: ['Create dictionaries and look up values by key', 'Add, update and delete entries', 'Loop over keys, values and items', 'Use «.get()» and «.setdefault()» safely', 'Count things and group things with dictionaries', 'Model records with nested dictionaries'],
  body: [
    section('learn', 'Key → value'),
    p`A **dictionary** («dict») maps **keys** to **values**, like a real dictionary maps a word to its definition, or a phone book maps a name to a number. You look things up by key instead of by position.`,
    code('Creating and using a dictionary')`
      student = {
          "name": "Akosua Darko",
          "id": "10982341",
          "programme": "Computer Engineering",
          "level": 300,
      }
      print(student["name"])
      print(student["level"])
      student["level"] = 400               # update
      student["gpa"] = 3.71                # add a new key
      print(student)
      print(len(student), "fields")
      print("email" in student)            # 'in' checks KEYS
    `,
    section('learn', 'Safe lookups'),
    code('KeyError and .get()', { err: false })`
      prices = {"bread": 15, "milk": 22, "eggs": 3}
      print(prices.get("milk"))            # 22
      print(prices.get("rice"))            # None instead of an error
      print(prices.get("rice", 0))         # default value
      # print(prices["rice"])              # KeyError: 'rice'

      if "eggs" in prices:
          print("Eggs cost", prices["eggs"])
    `,
    section('learn', 'Removing entries'),
    code('del, pop')`
      stock = {"pens": 40, "books": 12, "bags": 5}
      del stock["bags"]
      sold = stock.pop("pens")          # remove and return the value
      print(sold, stock)
      print(stock.pop("rulers", 0))     # default avoids KeyError
    `,
    section('learn', 'Looping over a dictionary'),
    code('keys, values, items')`
      credits = {"Calculus": 3, "Python": 4, "Physics": 3, "Writing": 2}
      for course in credits:                # loops over keys
          print(course, end=" | ")
      print()
      print(list(credits.keys()))
      print(list(credits.values()))
      print("Total credits:", sum(credits.values()))
      for course, cr in credits.items():    # (key, value) pairs
          print(f"{course:<10} {cr} credits")
    `,
    p`Since Python 3.7, dictionaries **remember insertion order**. «.items()» gives «(key, value)» tuples, which you unpack directly in the loop. This is the most common way to loop over a dictionary.`,
    section('learn', 'Pattern: counting'),
    code('Word frequencies')`
      text = "the cat sat on the mat the end"
      counts = {}
      for word in text.split():
          counts[word] = counts.get(word, 0) + 1
      print(counts)

      # find the most common word
      best = max(counts, key=counts.get)
      print("Most common:", best, counts[best])
    `,
    p`«counts.get(word, 0) + 1» reads "the current count, or 0 if this is the first time, plus one". This idiom is worth memorising. The standard library also has «collections.Counter» which does this for you; you will use it in lesson 3.5.`,
    section('learn', 'Pattern: grouping'),
    code('Group students by programme')`
      students = [
          ("Ama", "CS"), ("Kofi", "Maths"), ("Esi", "CS"),
          ("Yaw", "Physics"), ("Abena", "Maths"), ("Kwesi", "CS"),
      ]
      groups = {}
      for name, programme in students:
          groups.setdefault(programme, []).append(name)
      for programme, names in groups.items():
          print(f"{programme}: {', '.join(names)}")
    `,
    p`«d.setdefault(key, default)» returns the value for «key», first inserting «default» if the key is missing. Here it creates an empty list the first time a programme appears, then we append to it.`,
    section('learn', 'Nested dictionaries'),
    code('A small database')`
      students = {
          "UG10982341": {"name": "Akosua", "marks": {"MATH": 78, "CSCD": 88}},
          "UG10977120": {"name": "Kwabena", "marks": {"MATH": 64, "CSCD": 71}},
      }
      for sid, info in students.items():
          marks = info["marks"]
          avg = sum(marks.values()) / len(marks)
          print(f"{sid} {info['name']:<8} average {avg:.1f}")

      students["UG10982341"]["marks"]["STAT"] = 82     # reach in and add
      print(students["UG10982341"]["marks"])
    `,
    p`This shape (dictionaries of dictionaries and lists) is exactly what **JSON** data looks like, the format almost every web API uses. You will read and write JSON in lesson 3.7.`,
    note('deep', 'Going deeper · hash tables')`A dictionary is a **hash table**. To store a key, Python computes «hash(key)», uses it to pick a slot in an internal array, and stores the key and value there. Lookups repeat the computation and jump straight to the slot. That is why «key in d» and «d[key]» take **O(1)** time on average, regardless of the size of the dictionary, while «x in a_list» is O(n). Choosing a dict instead of a list for lookups is one of the biggest easy performance wins in Python.`,
    quiz(
      { q: 'What is «{"a": 1, "b": 2}.get("c", 5)»?', o: ['«None»', '«5»', 'KeyError', '«"c"»'], a: 1, why: 'The key is missing, so the default is returned.' },
      { q: 'What does «"Ama" in d» check?', o: ['Whether "Ama" is a value', 'Whether "Ama" is a key', 'Both', 'Neither'], a: 1, why: '«in» on a dictionary checks keys.' },
      { q: 'Which can be a dictionary key?', o: ['«[1, 2]»', '«{"a": 1}»', '«(1, 2)»', 'All of them'], a: 2, why: 'Keys must be hashable; lists and dicts are mutable.' },
      { q: 'What does this print?', code: R`
          d = {}
          for ch in "banana":
              d[ch] = d.get(ch, 0) + 1
          print(d["a"])`, o: ['1', '2', '3', '6'], a: 2, why: 'There are three a’s in banana.' },
      { q: 'Average time to look up a key in a dict with a million entries?', o: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], a: 0, why: 'Hash tables give constant average lookup time.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Letter frequency', level: 'easy',
      prompt: `Count how many times each letter appears in «"mississippi"» and print the dictionary.`,
      expect: `{'m': 1, 'i': 4, 's': 4, 'p': 2}`,
      hints: ['Use the «d[k] = d.get(k, 0) + 1» idiom.'],
      solution: R`
        counts = {}
        for ch in "mississippi":
            counts[ch] = counts.get(ch, 0) + 1
        print(counts)`
    }),
    task({
      title: 'GPA calculator', level: 'medium',
      prompt: `Using the grade-point scale below and the dictionary of «course: (grade, credits)», compute the GPA as «sum(points × credits) / sum(credits)». Print «GPA: 3.18».`,
      starter: R`
        POINTS = {"A": 4.0, "B+": 3.5, "B": 3.0, "C+": 2.5, "C": 2.0, "D+": 1.5, "D": 1.0, "F": 0.0}
        results = {
            "MATH 121": ("A", 3),
            "CSCD 101": ("B+", 3),
            "PHYS 105": ("C+", 3),
            "ENGL 101": ("B", 2),
            "STAT 111": ("A", 3),
            "ECON 101": ("C", 3),
        }
        `,
      expect: `GPA: 3.18`,
      hints: ['Loop with «for course, (grade, credits) in results.items():» (nested unpacking).', 'Keep two accumulators: weighted points and total credits.'],
      solution: R`
        POINTS = {"A": 4.0, "B+": 3.5, "B": 3.0, "C+": 2.5, "C": 2.0, "D+": 1.5, "D": 1.0, "F": 0.0}
        results = {
            "MATH 121": ("A", 3),
            "CSCD 101": ("B+", 3),
            "PHYS 105": ("C+", 3),
            "ENGL 101": ("B", 2),
            "STAT 111": ("A", 3),
            "ECON 101": ("C", 3),
        }
        weighted = 0
        total_credits = 0
        for course, (grade, credits) in results.items():
            weighted += POINTS[grade] * credits
            total_credits += credits
        print(f"GPA: {weighted / total_credits:.2f}")`
    }),
    task({
      title: 'Invert a dictionary', level: 'medium',
      prompt: `Given a dictionary of «student: programme», build the inverse: «programme: list of students», with the students in their original order.`,
      starter: R`
        enrolled = {"Ama": "CS", "Kofi": "Law", "Esi": "CS", "Yaw": "Medicine", "Akua": "Law"}
        `,
      expect: `{'CS': ['Ama', 'Esi'], 'Law': ['Kofi', 'Akua'], 'Medicine': ['Yaw']}`,
      hints: ['Loop over «.items()» and use «setdefault(programme, []).append(student)».'],
      solution: R`
        enrolled = {"Ama": "CS", "Kofi": "Law", "Esi": "CS", "Yaw": "Medicine", "Akua": "Law"}
        by_programme = {}
        for student, programme in enrolled.items():
            by_programme.setdefault(programme, []).append(student)
        print(by_programme)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Campus shop inventory',
      brief: `Build an interactive inventory manager for a campus shop. The inventory is a dictionary: «item name → {"price": float, "qty": int}». The program reads commands in a loop.`,
      reqs: ['«add <name> <price> <qty>»: add a new item, or increase the quantity if it exists (keep the new price)', '«sell <name> <qty>»: reduce stock; refuse if the item does not exist or there is not enough stock; keep a running sales total', '«report»: print every item, its price, quantity and stock value in an aligned table, then the total stock value', '«low»: list items with fewer than 5 in stock', '«quit»: print total sales and stop'],
      input: 'add pen 2.5 40\nadd notebook 12 10\nadd stapler 30 3\nsell pen 15\nsell notebook 20\nsell ruler 1\nadd notebook 12 5\nreport\nlow\nquit',
      starter: R`
        inventory = {}
        sales = 0.0
        `,
      solution: R`
        inventory = {}
        sales = 0.0

        while True:
            parts = input("> ").split()
            if not parts:
                continue
            cmd = parts[0]
            if cmd == "quit":
                print(f"Total sales: {sales:.2f}")
                break
            elif cmd == "add" and len(parts) == 4:
                name, price, qty = parts[1], float(parts[2]), int(parts[3])
                if name in inventory:
                    inventory[name]["qty"] += qty
                    inventory[name]["price"] = price
                else:
                    inventory[name] = {"price": price, "qty": qty}
                print(f"  {name}: {inventory[name]['qty']} in stock")
            elif cmd == "sell" and len(parts) == 3:
                name, qty = parts[1], int(parts[2])
                item = inventory.get(name)
                if item is None:
                    print(f"  No such item: {name}")
                elif item["qty"] < qty:
                    print(f"  Only {item['qty']} {name}(s) in stock")
                else:
                    item["qty"] -= qty
                    sales += qty * item["price"]
                    print(f"  Sold {qty} {name}(s)")
            elif cmd == "report":
                total = 0
                print(f"  {'Item':<10}{'Price':>8}{'Qty':>6}{'Value':>10}")
                for name, item in inventory.items():
                    value = item["price"] * item["qty"]
                    total += value
                    print(f"  {name:<10}{item['price']:>8.2f}{item['qty']:>6}{value:>10.2f}")
                print(f"  {'Total stock value':<24}{total:>10.2f}")
            elif cmd == "low":
                low = [name for name, item in inventory.items() if item["qty"] < 5]
                print("  Low stock:", ", ".join(low) if low else "none")
            else:
                print("  Unknown or malformed command")`,
      explain: `«item = inventory.get(name)» followed by «if item is None» looks the item up once and then works with the inner dictionary directly. Because «item» refers to the same dict that lives inside «inventory», «item["qty"] -= qty» updates the inventory: aliasing used on purpose. The «low» branch uses a list comprehension, which is the next lesson but one.`
    })
  ]
});

/* ------------------------------------------------------------------ 2.5 */
lesson({
  id: 'sets', level: 'L2', title: 'Sets', minutes: 35,
  keywords: 'set union intersection difference membership unique',
  goals: ['Create sets and remove duplicates', 'Use union, intersection, difference and symmetric difference', 'Use sets for fast membership tests', 'Know when a set is the right structure'],
  body: [
    section('learn', 'Unordered, unique items'),
    p`A **set** is an unordered collection with **no duplicates**. It is written with curly braces, like a dict without values. Sets come straight from mathematics, and they support the same operations you learn in discrete maths.`,
    code('Creating sets')`
      fruits = {"apple", "banana", "apple", "mango"}
      print(len(fruits))             # duplicates removed
      print("mango" in fruits)
      nums = set([3, 1, 3, 2, 1])
      print(sorted(nums))            # sets have no order; sort to display predictably
      empty = set()                  # NOT {} - that is an empty dict
      empty.add("x")
      empty.add("x")
      print(empty)
      fruits.discard("kiwi")         # no error if missing (remove() would raise)
    `,
    section('learn', 'Set operations'),
    table(['Operation', 'Operator', 'Method', 'Meaning'], [
      ['Union', '«A | B»', '«A.union(B)»', 'in A or B (or both)'],
      ['Intersection', '«A & B»', '«A.intersection(B)»', 'in both'],
      ['Difference', '«A - B»', '«A.difference(B)»', 'in A but not B'],
      ['Symmetric difference', '«A ^ B»', '«A.symmetric_difference(B)»', 'in exactly one'],
      ['Subset', '«A <= B»', '«A.issubset(B)»', 'every item of A is in B']
    ]),
    code('Students in two courses')`
      python = {"Ama", "Kofi", "Esi", "Yaw"}
      stats = {"Kofi", "Akua", "Yaw", "Kwame"}

      print("Both:", sorted(python & stats))
      print("Either:", sorted(python | stats))
      print("Only Python:", sorted(python - stats))
      print("Exactly one:", sorted(python ^ stats))
      print({"Kofi", "Yaw"} <= python)
    `,
    section('learn', 'Fast "have I seen this?" checks'),
    code('Duplicates with a seen-set (O(n))')`
      names = ["Ama", "Kofi", "Ama", "Esi", "Kofi", "Yaw", "Esi"]
      seen = set()
      unique = []
      duplicates = set()
      for name in names:
          if name in seen:
              duplicates.add(name)
          else:
              seen.add(name)
              unique.append(name)
      print("Unique in order:", unique)
      print("Duplicated:", sorted(duplicates))
    `,
    p`Compare with lesson 2.1: «name in unique» on a list is O(n), so the whole algorithm was O(n²). «name in seen» on a set is O(1) on average, making the whole algorithm O(n). For a list of a million names that is the difference between seconds and hours.`,
    note('deep', 'Going deeper · frozenset')`Sets are mutable, so a set cannot be put inside another set or used as a dict key. «frozenset» is the immutable version: «frozenset({1, 2})» is hashable. This is useful for representing, for example, an unordered pair of friends «frozenset({"Ama", "Kofi"})» where «("Ama", "Kofi")» and «("Kofi", "Ama")» should count as the same.`,
    quiz(
      { q: 'What is «len({1, 2, 2, 3, 3, 3})»?', o: ['6', '3', '1', 'An error'], a: 1, why: 'Duplicates are removed.' },
      { q: 'How do you create an empty set?', o: ['«{}»', '«set()»', '«[]»', '«()»'], a: 1, why: '«{}» is an empty dictionary.' },
      { q: 'What is «{1, 2, 3} - {2, 3, 4}»?', o: ['«{1}»', '«{4}»', '«{1, 4}»', '«{2, 3}»'], a: 0, why: 'Items in the first set but not the second.' },
      { q: 'Which is a reason to choose a set over a list?', o: ['You need items in a fixed order', 'You need duplicates', 'You need fast membership tests and unique items', 'You need indexing'], a: 2, why: 'Sets are unordered and unique, with O(1) average membership.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Common and missing', level: 'easy',
      prompt: `The «required» set lists courses needed to graduate; «taken» lists those completed. Print the sorted list of courses still missing, and «Complete: False».`,
      starter: R`
        required = {"MATH 121", "CSCD 101", "CSCD 201", "STAT 111", "UGRC 110"}
        taken = {"MATH 121", "STAT 111", "UGRC 110", "ECON 101"}
        `,
      expect: `
        Missing: ['CSCD 101', 'CSCD 201']
        Complete: False`,
      hints: ['Missing is «required - taken».', 'Complete means «required <= taken».'],
      solution: R`
        required = {"MATH 121", "CSCD 101", "CSCD 201", "STAT 111", "UGRC 110"}
        taken = {"MATH 121", "STAT 111", "UGRC 110", "ECON 101"}
        print("Missing:", sorted(required - taken))
        print("Complete:", required <= taken)`
    }),
    task({
      title: 'Unique words', level: 'medium',
      prompt: `Count the number of **distinct** words in the sentence, ignoring case and the full stop. Print «Distinct words: 7».`,
      starter: R`
        text = "The more you practise the more you learn and the more you remember."
        `,
      expect: `Distinct words: 7`,
      hints: ['Lowercase, remove «"."», split, then convert to a set.'],
      solution: R`
        text = "The more you practise the more you learn and the more you remember."
        words = set(text.lower().replace(".", "").split())
        print(f"Distinct words: {len(words)}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Social network analysis',
      brief: `A small social network is stored as a dictionary mapping each person to the **set** of their friends. Analyse it with set operations. Graph problems like this are a big topic in a CS degree (graph theory, discrete structures).`,
      reqs: ['Print each person and their number of friends, sorted alphabetically', 'Print the mutual friends of Ama and Kofi', 'Suggest new friends for Esi: friends of her friends who are not already her friends and not Esi herself', 'Check the network is **symmetric** (if A lists B, B must list A) and report any one-sided friendships', 'Find the person with the most friends'],
      starter: R`
        network = {
            "Ama":   {"Kofi", "Esi", "Yaw"},
            "Kofi":  {"Ama", "Yaw", "Akua"},
            "Esi":   {"Ama", "Kwame"},
            "Yaw":   {"Ama", "Kofi", "Akua"},
            "Akua":  {"Kofi", "Yaw"},
            "Kwame": {"Esi", "Ama"},
        }
        `,
      solution: R`
        network = {
            "Ama":   {"Kofi", "Esi", "Yaw"},
            "Kofi":  {"Ama", "Yaw", "Akua"},
            "Esi":   {"Ama", "Kwame"},
            "Yaw":   {"Ama", "Kofi", "Akua"},
            "Akua":  {"Kofi", "Yaw"},
            "Kwame": {"Esi", "Ama"},
        }

        for person in sorted(network):
            print(f"{person:<6} {len(network[person])} friends")

        print("Mutual (Ama, Kofi):", sorted(network["Ama"] & network["Kofi"]))

        suggestions = set()
        for friend in network["Esi"]:
            suggestions |= network[friend]
        suggestions -= network["Esi"]
        suggestions.discard("Esi")
        print("Suggestions for Esi:", sorted(suggestions))

        one_sided = []
        for person, friends in network.items():
            for f in friends:
                if person not in network.get(f, set()):
                    one_sided.append((person, f))
        print("One-sided:", one_sided if one_sided else "none")

        most = max(network, key=lambda p: len(network[p]))
        print("Most friends:", most)`,
      explain: `Kwame lists Ama, but Ama does not list Kwame, so the solution reports «('Kwame', 'Ama')». In graph terms, the network is an **adjacency list**; a symmetric adjacency list represents an undirected graph. «max(network, key=lambda p: ...)» picks the key with the largest friend count; «lambda» is a tiny inline function, explained properly in lesson 3.4. When there is a tie, «max» returns the first one it met.`
    })
  ]
});

/* ------------------------------------------------------------------ 2.6 */
lesson({
  id: 'comprehensions', level: 'L2', title: 'Comprehensions', minutes: 45,
  keywords: 'list comprehension dict comprehension set comprehension filter generator expression',
  goals: ['Rewrite "build a list in a loop" as a list comprehension', 'Filter with «if» inside a comprehension', 'Write dict and set comprehensions', 'Use generator expressions with «sum», «any», «all»', 'Know when a comprehension hurts readability'],
  body: [
    section('learn', 'The pattern you keep writing'),
    code('Loop version vs comprehension')`
      # loop version
      squares = []
      for n in range(1, 6):
          squares.append(n ** 2)
      print(squares)

      # comprehension: [expression for item in iterable]
      squares = [n ** 2 for n in range(1, 6)]
      print(squares)
    `,
    p`A **list comprehension** builds a new list from an iterable in one expression. Read it as "the list of «n ** 2» for each «n» in «range(1, 6)»". It mirrors set-builder notation from maths: { n² | n ∈ {1,…,5} }.`,
    section('learn', 'Filtering'),
    code('[expression for item in iterable if condition]')`
      marks = [45, 82, 67, 39, 91, 58]
      passed = [m for m in marks if m >= 50]
      print(passed)

      names = ["ama", "KOFI", "esi", "yaw"]
      tidy = [n.title() for n in names if len(n) == 3]
      print(tidy)

      # if/else goes BEFORE the for (it is part of the expression)
      labels = ["pass" if m >= 50 else "fail" for m in marks]
      print(labels)
    `,
    note('warn', 'Two different "if"s')`A filter «if» comes **after** the «for» and decides which items are included. A conditional expression «a if cond else b» comes **before** the «for» and decides what value each item becomes. You can use both at once.`,
    section('learn', 'Dict and set comprehensions'),
    code('{key: value for ...} and {value for ...}')`
      names = ["Ama", "Kofi", "Esi"]
      lengths = {name: len(name) for name in names}
      print(lengths)

      prices = {"pen": 2.5, "book": 40, "bag": 120}
      with_vat = {item: round(p * 1.15, 2) for item, p in prices.items()}
      print(with_vat)

      expensive = {item for item, p in prices.items() if p > 10}
      print(sorted(expensive))

      initials = {name[0] for name in ["Ama", "Abena", "Kofi", "Kwame"]}
      print(sorted(initials))
    `,
    section('learn', 'Nested comprehensions'),
    code('Flatten and build grids')`
      matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      flat = [x for row in matrix for x in row]      # loops in the same order as nested for
      print(flat)

      transposed = [[row[i] for row in matrix] for i in range(3)]
      print(transposed)

      table = [[r * c for c in range(1, 4)] for r in range(1, 4)]
      print(table)
    `,
    p`In «[x for row in matrix for x in row]», the «for» clauses are in the same order you would write them as nested loops. If a comprehension needs more than two «for»s, or a long condition, use regular loops: clarity beats cleverness.`,
    section('learn', 'Generator expressions'),
    code('No brackets needed inside a function call')`
      marks = [45, 82, 67, 39, 91, 58]
      print(sum(m for m in marks if m >= 50))
      print(any(m < 40 for m in marks))      # is there at least one?
      print(all(m >= 30 for m in marks))     # are they all?
      print(max(len(w) for w in "a short sentence here".split()))
    `,
    note('deep', 'Going deeper · lazy evaluation')`«(m for m in marks)» is a **generator expression**. It does not build a list in memory; it produces items one at a time when asked. «sum(x * x for x in range(10_000_000))» uses almost no memory, while the list version would hold ten million numbers at once. «any» and «all» also stop early (short-circuit) as soon as the answer is known. Generators are covered in depth in lesson 5.1.`,
    quiz(
      { q: 'What is «[x * 2 for x in range(4)]»?', o: ['«[0, 2, 4, 6]»', '«[2, 4, 6, 8]»', '«[0, 1, 2, 3, 0, 1, 2, 3]»', '«8»'], a: 0, why: 'range(4) is 0..3, each doubled.' },
      { q: 'What is «[c for c in "hello" if c not in "aeiou"]»?', o: ['«["e", "o"]»', '«["h", "l", "l"]»', '«"hll"»', '«["h", "l"]»'], a: 1, why: 'Consonants kept, as a list of characters, duplicates included.' },
      { q: 'What type does «{n % 3 for n in range(10)}» produce?', o: ['list', 'dict', 'set', 'tuple'], a: 2, why: 'Curly braces with a single expression make a set: {0, 1, 2}.' },
      { q: 'Where does «else» go in a comprehension that labels each item?', o: ['After the «for»', 'Before the «for», as part of «a if c else b»', 'Comprehensions cannot use else', 'At the end after «if»'], a: 1, why: 'Only the conditional expression form allows «else».' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Celsius to Fahrenheit', level: 'easy',
      prompt: `Use one list comprehension to convert the temperatures, rounding to 1 decimal.`,
      starter: R`
        celsius = [0, 21.5, 30, 37, -5]
        `,
      expect: `[32.0, 70.7, 86.0, 98.6, 23.0]`,
      hints: ['«F = C × 9/5 + 32», use «round(..., 1)».'],
      solution: R`
        celsius = [0, 21.5, 30, 37, -5]
        print([round(c * 9 / 5 + 32, 1) for c in celsius])`
    }),
    task({
      title: 'Word lengths dictionary', level: 'medium',
      prompt: `Build a dictionary mapping each **distinct lowercase** word of the sentence to its length, only for words longer than 3 letters. Print it sorted by key using «dict(sorted(d.items()))».`,
      starter: R`
        sentence = "Python makes data analysis and automation simple and fun"
        `,
      expect: `{'analysis': 8, 'automation': 10, 'data': 4, 'makes': 5, 'python': 6, 'simple': 6}`,
      hints: ['«{w: len(w) for w in sentence.lower().split() if len(w) > 3}»'],
      solution: R`
        sentence = "Python makes data analysis and automation simple and fun"
        lengths = {w: len(w) for w in sentence.lower().split() if len(w) > 3}
        print(dict(sorted(lengths.items())))`
    }),
    task({
      title: 'Pythagorean triples', level: 'hard',
      prompt: `Using a single list comprehension with three «for» clauses, find all triples «(a, b, c)» with «a < b < c <= 20» and «a² + b² = c²».`,
      expect: `[(3, 4, 5), (5, 12, 13), (6, 8, 10), (8, 15, 17), (9, 12, 15), (12, 16, 20)]`,
      hints: ['«for a in range(1, 21) for b in range(a + 1, 21) for c in range(b + 1, 21)»', 'Add «if a*a + b*b == c*c» at the end.'],
      solution: R`
        triples = [(a, b, c)
                   for a in range(1, 21)
                   for b in range(a + 1, 21)
                   for c in range(b + 1, 21)
                   if a * a + b * b == c * c]
        print(triples)`,
      explain: `This is about the limit of what is readable as a comprehension. Spreading it over several lines inside the brackets helps. It checks about 1,140 combinations (it is O(n³)); a faster method would compute «c» from «a» and «b» directly and check whether it is a whole number.`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Data cleaning pipeline',
      brief: `Real data is messy. You receive survey responses as raw strings «"name,age,programme,satisfaction"». Write a cleaning pipeline using comprehensions wherever they make the code clearer.`,
      reqs: ['Split each line into fields and strip whitespace from every field', 'Discard rows that do not have exactly 4 fields, or whose age or satisfaction is not a number', 'Normalise names to title case and programmes to upper case', 'Keep only satisfaction scores between 1 and 5', 'Print the number of valid rows, the average satisfaction per programme (dict comprehension) and the names of everyone who gave a 5'],
      starter: R`
        raw = [
            "ama owusu, 20, cs, 4",
            "KOFI mensah,22,law,5",
            "esi, nineteen, cs, 3",
            "yaw boateng, 21, Medicine, 9",
            "akua, 23, law, 2",
            "kwame asare,20,cs,5",
            "broken line",
            "  abena  , 19 ,  medicine , 4 ",
        ]
        `,
      solution: R`
        raw = [
            "ama owusu, 20, cs, 4",
            "KOFI mensah,22,law,5",
            "esi, nineteen, cs, 3",
            "yaw boateng, 21, Medicine, 9",
            "akua, 23, law, 2",
            "kwame asare,20,cs,5",
            "broken line",
            "  abena  , 19 ,  medicine , 4 ",
        ]

        rows = [[field.strip() for field in line.split(",")] for line in raw]
        rows = [r for r in rows if len(r) == 4 and r[1].isdigit() and r[3].isdigit()]
        clean = [(name.title(), int(age), prog.upper(), int(score))
                 for name, age, prog, score in rows]
        clean = [row for row in clean if 1 <= row[3] <= 5]

        print("Valid rows:", len(clean))
        for row in clean:
            print("  ", row)

        programmes = {prog for _, _, prog, _ in clean}
        averages = {
            prog: round(sum(s for _, _, p, s in clean if p == prog)
                        / sum(1 for _, _, p, _ in clean if p == prog), 2)
            for prog in sorted(programmes)
        }
        print("Average satisfaction:", averages)
        print("Gave 5:", [name for name, _, _, s in clean if s == 5])`,
      explain: `Each stage of the pipeline is one comprehension with a single job: split, validate, convert, filter. The «averages» comprehension is at the edge of readability; it loops over «clean» twice per programme. With the grouping pattern from lesson 2.4 (a dict of lists) you could do it in one pass. In Level 6 you will see the same pipeline done in a few lines with pandas.`
    })
  ]
});

/* ------------------------------------------------------------------ 2.7 */
lesson({
  id: 'iteration-patterns', level: 'L2', title: 'Iteration patterns: enumerate, zip, sorted', minutes: 45,
  keywords: 'enumerate zip sorted key lambda reversed any all itertools',
  goals: ['Get indices with «enumerate»', 'Walk several sequences together with «zip»', 'Sort by any criterion with «key=»', 'Pick the right built-in for common loop jobs'],
  body: [
    section('learn', 'enumerate: index and value together'),
    code('Stop writing range(len(...))')`
      courses = ["Calculus", "Python", "Physics"]

      # clumsy
      for i in range(len(courses)):
          print(i, courses[i])

      # Pythonic
      for i, course in enumerate(courses, start=1):
          print(f"{i}. {course}")
    `,
    section('learn', 'zip: walk sequences in parallel'),
    code('zip')`
      names = ["Ama", "Kofi", "Esi"]
      scores = [88, 72, 95]
      grades = ["A", "B", "A"]
      for name, score, grade in zip(names, scores, grades):
          print(f"{name:<5} {score:>3} {grade}")

      lookup = dict(zip(names, scores))       # build a dict from two lists
      print(lookup)

      pairs = [(1, "a"), (2, "b"), (3, "c")]
      numbers, letters = zip(*pairs)          # "unzip"
      print(numbers, letters)
    `,
    p`«zip» stops at the **shortest** input. If lengths should be equal and a mismatch is a bug, use «zip(a, b, strict=True)» (Python 3.10+) to get an error instead of silently losing data.`,
    section('learn', 'Sorting with a key'),
    code('sorted(iterable, key=function, reverse=bool)')`
      words = ["banana", "Apple", "cherry", "date"]
      print(sorted(words))                    # uppercase first
      print(sorted(words, key=str.lower))     # case-insensitive
      print(sorted(words, key=len))           # by length

      students = [("Ama", 3.4), ("Kofi", 3.9), ("Esi", 3.4), ("Yaw", 2.8)]
      by_gpa = sorted(students, key=lambda s: s[1], reverse=True)
      print(by_gpa)

      # several criteria: GPA descending, then name ascending
      ranked = sorted(students, key=lambda s: (-s[1], s[0]))
      for rank, (name, gpa) in enumerate(ranked, start=1):
          print(rank, name, gpa)
    `,
    p`The «key» function is called once per item, and items are sorted by what it returns. «lambda s: s[1]» is a tiny anonymous function that takes «s» and returns «s[1]». Returning a **tuple** sorts by the first element, then breaks ties with the second, and so on. Negating a number sorts it descending while the rest stays ascending.`,
    note('deep', 'Going deeper · Timsort and stability')`Python's sort is **Timsort**, a hybrid of merge sort and insertion sort designed for real-world data that is often partly ordered. It runs in **O(n log n)** worst case and is **stable**: items with equal keys keep their original relative order. Stability lets you sort by several criteria in passes: sort by name first, then by GPA, and students with the same GPA remain alphabetical.`,
    section('learn', 'Other handy built-ins'),
    table(['Built-in', 'Use'], [
      ['«reversed(seq)»', 'iterate backwards without copying'],
      ['«min / max(it, key=...)»', 'smallest/largest by a criterion'],
      ['«sum(it)»', 'total; «sum(1 for x in it if cond)» counts'],
      ['«any(it) / all(it)»', 'is at least one / is every item true?'],
      ['«map(f, it)»', 'apply «f» to each item (a comprehension is often clearer)'],
      ['«filter(f, it)»', 'keep items where «f» is true']
    ]),
    code('Putting them together')`
      temps = {"Mon": 31, "Tue": 29, "Wed": 34, "Thu": 33, "Fri": 28}
      hottest = max(temps, key=temps.get)
      print("Hottest:", hottest, temps[hottest])
      print("Any day above 33?", any(t > 33 for t in temps.values()))
      print("Days above 30:", sum(1 for t in temps.values() if t > 30))
      for day in reversed(list(temps)):
          print(day, end=" ")
      print()
    `,
    quiz(
      { q: 'What does «list(enumerate("ab"))» give?', o: ['«[(0, "a"), (1, "b")]»', '«["a", "b"]»', '«[(1, "a"), (2, "b")]»', '«{0: "a", 1: "b"}»'], a: 0, why: 'Pairs of (index, item), starting at 0 by default.' },
      { q: 'What is «list(zip([1, 2, 3], "ab"))»?', o: ['«[(1, "a"), (2, "b"), (3, None)]»', '«[(1, "a"), (2, "b")]»', 'An error', '«[1, "a", 2, "b"]»'], a: 1, why: '«zip» stops at the shortest input.' },
      { q: 'How do you sort words by length, longest first?', o: ['«sorted(w, key=len)»', '«sorted(w, key=len, reverse=True)»', '«sorted(len(w))»', '«w.sort(len)»'], a: 1, why: '«key» picks the criterion; «reverse» flips the order.' },
      { q: 'What does "stable sort" mean?', o: ['It never crashes', 'Equal items keep their original relative order', 'It is always O(n)', 'It sorts in place'], a: 1, why: 'Stability preserves the input order among ties.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Numbered leaderboard', level: 'easy',
      prompt: `Sort the players by score (highest first) and print a numbered leaderboard using «enumerate». Format: «1. Esi 95».`,
      starter: R`
        scores = {"Ama": 88, "Kofi": 72, "Esi": 95, "Yaw": 81}
        `,
      expect: `
        1. Esi 95
        2. Ama 88
        3. Yaw 81
        4. Kofi 72`,
      hints: ['«sorted(scores.items(), key=lambda kv: kv[1], reverse=True)»', 'Then «for rank, (name, score) in enumerate(..., start=1):»'],
      solution: R`
        scores = {"Ama": 88, "Kofi": 72, "Esi": 95, "Yaw": 81}
        ranking = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
        for rank, (name, score) in enumerate(ranking, start=1):
            print(f"{rank}. {name} {score}")`
    }),
    task({
      title: 'Dot product', level: 'medium',
      prompt: `Compute the dot product of two vectors (sum of the products of matching elements) in one line using «zip» and a generator expression. Print «Dot product: 32».`,
      starter: R`
        u = [1, 2, 3]
        v = [4, 5, 6]
        `,
      expect: `Dot product: 32`,
      hints: ['«sum(a * b for a, b in zip(u, v))»'],
      solution: R`
        u = [1, 2, 3]
        v = [4, 5, 6]
        print(f"Dot product: {sum(a * b for a, b in zip(u, v))}")`
    }),
    task({
      title: 'Sort by surname then first name', level: 'medium',
      prompt: `Sort the full names by surname, then by first name for equal surnames, and print one per line.`,
      starter: R`
        people = ["Kofi Mensah", "Ama Owusu", "Esi Mensah", "Yaw Boateng", "Abena Owusu"]
        `,
      expect: `
        Yaw Boateng
        Esi Mensah
        Kofi Mensah
        Abena Owusu
        Ama Owusu`,
      hints: ['For a name «n», «n.split()» gives «[first, surname]».', 'Use «key=lambda n: (n.split()[1], n.split()[0])».'],
      solution: R`
        people = ["Kofi Mensah", "Ama Owusu", "Esi Mensah", "Yaw Boateng", "Abena Owusu"]
        for person in sorted(people, key=lambda n: (n.split()[1], n.split()[0])):
            print(person)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Exam results report card',
      brief: `You have parallel lists of student names, IDs and marks for three courses. Combine them with «zip», compute each student's average, and produce a ranked report.`,
      reqs: ['Combine the lists with «zip» into a list of records (tuples or dicts)', 'Compute each student\'s average across the three courses', 'Rank by average descending; break ties alphabetically by name', 'Print a numbered, aligned table using «enumerate»', 'Print the best student per course using «max» with a «key»', 'Print how many students scored at least 50 in **all** courses (use «all»)'],
      starter: R`
        names = ["Ama", "Kofi", "Esi", "Yaw", "Akua"]
        ids = ["1001", "1002", "1003", "1004", "1005"]
        math = [78, 65, 92, 48, 70]
        python = [88, 72, 95, 61, 80]
        stats = [69, 81, 77, 55, 74]
        `,
      solution: R`
        names = ["Ama", "Kofi", "Esi", "Yaw", "Akua"]
        ids = ["1001", "1002", "1003", "1004", "1005"]
        math = [78, 65, 92, 48, 70]
        python = [88, 72, 95, 61, 80]
        stats = [69, 81, 77, 55, 74]

        records = []
        for name, sid, m, p, s in zip(names, ids, math, python, stats, strict=True):
            records.append({"name": name, "id": sid, "marks": (m, p, s), "avg": (m + p + s) / 3})

        ranked = sorted(records, key=lambda r: (-r["avg"], r["name"]))
        print(f"{'#':<3}{'Name':<7}{'ID':<6}{'Math':>5}{'Py':>5}{'Stat':>5}{'Avg':>7}")
        for rank, r in enumerate(ranked, start=1):
            m, p, s = r["marks"]
            print(f"{rank:<3}{r['name']:<7}{r['id']:<6}{m:>5}{p:>5}{s:>5}{r['avg']:>7.1f}")

        for i, course in enumerate(["Math", "Python", "Stats"]):
            best = max(records, key=lambda r: r["marks"][i])
            print(f"Best in {course}: {best['name']} ({best['marks'][i]})")

        passed_all = sum(1 for r in records if all(mark >= 50 for mark in r["marks"]))
        print(f"Passed all courses: {passed_all} of {len(records)}")`,
      explain: `«strict=True» makes «zip» raise an error if one list is shorter, protecting you from silently dropping a student. Each record is a dictionary, so the code says «r["avg"]» instead of a mysterious «r[4]». In Level 4 you will replace these dictionaries with a «Student» class.`
    })
  ]
});

/* ------------------------------------------------------------------ 2.8 */
lesson({
  id: 'project-2', level: 'L2', title: 'Level 2 project: student records system', minutes: 90,
  keywords: 'project records menu crud review data structures',
  goals: ['Choose appropriate data structures for a real problem', 'Implement create, read, update and delete (CRUD) operations', 'Combine dicts, lists, sets, comprehensions and sorting', 'Review all of Level 2'],
  body: [
    section('review', 'Choosing a data structure'),
    table(['Structure', 'Ordered', 'Mutable', 'Duplicates', 'Lookup', 'Use for'], [
      ['«list»', 'yes', 'yes', 'yes', 'by index O(1); search O(n)', 'sequences of similar items'],
      ['«tuple»', 'yes', 'no', 'yes', 'by index O(1)', 'fixed records, dict keys'],
      ['«dict»', 'insertion', 'yes', 'unique keys', 'by key O(1)', 'mapping / records / counting'],
      ['«set»', 'no', 'yes', 'no', 'membership O(1)', 'uniqueness, set algebra']
    ]),
    p`Ask yourself: Do I look things up by position or by name? Does order matter? Can there be duplicates? Will the data change? The answers pick the structure for you.`,
    section('build', 'Designing the records system'),
    p`We will keep all students in a dictionary keyed by student ID (fast lookup, unique IDs). Each student is a dictionary with a name, a programme and a dictionary of course marks. The program runs a menu loop (like the ATM in lesson 1.7) and supports CRUD: **C**reate, **R**ead, **U**pdate and **D**elete. These four operations are the core of nearly every business application and database.`,
    code('Data model')`
      students = {
          "S1001": {"name": "Ama Owusu", "programme": "CS", "marks": {"CSCD101": 88, "MATH121": 76}},
          "S1002": {"name": "Kofi Mensah", "programme": "Maths", "marks": {"MATH121": 91}},
      }
      # Read
      print(students["S1001"]["name"])
      # Update
      students["S1002"]["marks"]["STAT111"] = 67
      # Create
      students["S1003"] = {"name": "Esi Boateng", "programme": "CS", "marks": {}}
      # Delete
      del students["S1003"]
      # Query: everyone in CS
      print([s["name"] for s in students.values() if s["programme"] == "CS"])
    `,
    section('build', 'The complete program'),
    code('Student records system', { input: 'add S1003 Esi Boateng|CS\nmark S1003 CSCD101 93\nmark S1001 STAT111 64\nlist\nfind owusu\ntop\ndelete S1002\nlist\nquit' })`
      students = {
          "S1001": {"name": "Ama Owusu", "programme": "CS", "marks": {"CSCD101": 88, "MATH121": 76}},
          "S1002": {"name": "Kofi Mensah", "programme": "Maths", "marks": {"MATH121": 91}},
      }

      def average(marks):
          return sum(marks.values()) / len(marks) if marks else 0.0

      HELP = "Commands: add ID NAME|PROGRAMME, mark ID COURSE SCORE, list, find TEXT, top, delete ID, quit"
      print(HELP)
      while True:
          line = input("> ").strip()
          cmd, _, rest = line.partition(" ")
          if cmd == "quit":
              break
          elif cmd == "add":
              sid, _, details = rest.partition(" ")
              name, _, programme = details.partition("|")
              if sid in students:
                  print("  ID already exists")
              else:
                  students[sid] = {"name": name.strip(), "programme": programme.strip(), "marks": {}}
                  print(f"  Added {name.strip()}")
          elif cmd == "mark":
              parts = rest.split()
              if len(parts) != 3 or parts[0] not in students or not parts[2].isdigit():
                  print("  Usage: mark ID COURSE SCORE (existing ID, whole-number score)")
              else:
                  sid, course, score = parts
                  students[sid]["marks"][course.upper()] = int(score)
                  print(f"  {course.upper()} = {score} for {students[sid]['name']}")
          elif cmd == "list":
              for sid, s in sorted(students.items()):
                  print(f"  {sid} {s['name']:<14}{s['programme']:<7}avg {average(s['marks']):5.1f}  {s['marks']}")
          elif cmd == "find":
              hits = [f"{sid} {s['name']}" for sid, s in students.items() if rest.lower() in s["name"].lower()]
              print("  " + ("; ".join(hits) if hits else "no match"))
          elif cmd == "top":
              sid = max(students, key=lambda k: average(students[k]["marks"]))
              print(f"  Top student: {students[sid]['name']} ({average(students[sid]['marks']):.1f})")
          elif cmd == "delete":
              removed = students.pop(rest, None)
              print(f"  Deleted {removed['name']}" if removed else "  No such ID")
          else:
              print("  " + HELP)
    `,
    p`Two new things appear here. «str.partition(" ")» splits a string at the first separator into exactly three parts «(before, sep, after)», which is handy for commands. And «def average(marks):» defines a **function**, a reusable named block of code. Functions are the whole of Level 3; here we just needed one to avoid repeating the average calculation three times.`,
    section('practice', 'Tasks'),
    task({
      title: 'Programme statistics', level: 'medium',
      prompt: `Given the «students» dictionary, print for each programme (alphabetically) the number of students and the set of courses taken by anyone in it, sorted. Expected output below.`,
      starter: R`
        students = {
            "S1001": {"name": "Ama", "programme": "CS", "marks": {"CSCD101": 88, "MATH121": 76}},
            "S1002": {"name": "Kofi", "programme": "Maths", "marks": {"MATH121": 91, "STAT111": 70}},
            "S1003": {"name": "Esi", "programme": "CS", "marks": {"CSCD101": 93, "STAT111": 64}},
        }
        `,
      expect: `
        CS: 2 student(s), courses ['CSCD101', 'MATH121', 'STAT111']
        Maths: 1 student(s), courses ['MATH121', 'STAT111']`,
      hints: ['Group with a dict: programme → {"count": 0, "courses": set()}.', 'Use «courses |= set(s["marks"])» or «.update(...)».'],
      solution: R`
        students = {
            "S1001": {"name": "Ama", "programme": "CS", "marks": {"CSCD101": 88, "MATH121": 76}},
            "S1002": {"name": "Kofi", "programme": "Maths", "marks": {"MATH121": 91, "STAT111": 70}},
            "S1003": {"name": "Esi", "programme": "CS", "marks": {"CSCD101": 93, "STAT111": 64}},
        }
        stats = {}
        for s in students.values():
            entry = stats.setdefault(s["programme"], {"count": 0, "courses": set()})
            entry["count"] += 1
            entry["courses"].update(s["marks"])
        for programme in sorted(stats):
            e = stats[programme]
            print(f"{programme}: {e['count']} student(s), courses {sorted(e['courses'])}")`
    }),
    section('assignment', 'Level 2 project'),
    assignment({
      title: 'Library lending system',
      brief: `Build a library lending system using only the data structures from Level 2. Books are identified by ISBN; members by ID. This is your Level 2 capstone: think carefully about which structure fits each piece of data before you write code.`,
      reqs: ['A catalogue «dict»: ISBN → {"title", "author", "copies"}', 'Members as a «dict»: member ID → {"name", "borrowed": set of ISBNs}', '«borrow MEMBER ISBN»: only if copies are available, the member has fewer than 3 books, and does not already have this book', '«return MEMBER ISBN»: only if they actually borrowed it', '«available»: list books with copies > 0, sorted by title', '«report»: each member with the titles they hold; and the most borrowed book so far (keep a counter dict)', 'Clear error messages for every invalid command'],
      input: 'borrow m1 111\nborrow m1 222\nborrow m2 111\nborrow m2 111\nborrow m3 111\nreturn m2 222\nreturn m1 111\nborrow m3 111\navailable\nreport\nquit',
      starter: R`
        catalogue = {
            "111": {"title": "Clean Code", "author": "Robert Martin", "copies": 2},
            "222": {"title": "Python Crash Course", "author": "Eric Matthes", "copies": 1},
            "333": {"title": "Introduction to Algorithms", "author": "Cormen et al.", "copies": 1},
        }
        members = {
            "m1": {"name": "Ama", "borrowed": set()},
            "m2": {"name": "Kofi", "borrowed": set()},
            "m3": {"name": "Esi", "borrowed": set()},
        }
        `,
      solution: R`
        catalogue = {
            "111": {"title": "Clean Code", "author": "Robert Martin", "copies": 2},
            "222": {"title": "Python Crash Course", "author": "Eric Matthes", "copies": 1},
            "333": {"title": "Introduction to Algorithms", "author": "Cormen et al.", "copies": 1},
        }
        members = {
            "m1": {"name": "Ama", "borrowed": set()},
            "m2": {"name": "Kofi", "borrowed": set()},
            "m3": {"name": "Esi", "borrowed": set()},
        }
        times_borrowed = {}
        MAX_BOOKS = 3

        while True:
            parts = input("> ").split()
            if not parts:
                continue
            cmd = parts[0]
            if cmd == "quit":
                break
            if cmd in ("borrow", "return"):
                if len(parts) != 3:
                    print(f"  Usage: {cmd} MEMBER ISBN")
                    continue
                mid, isbn = parts[1], parts[2]
                if mid not in members:
                    print("  Unknown member")
                    continue
                if isbn not in catalogue:
                    print("  Unknown ISBN")
                    continue
                member, book = members[mid], catalogue[isbn]
                if cmd == "borrow":
                    if isbn in member["borrowed"]:
                        print(f"  {member['name']} already has {book['title']}")
                    elif len(member["borrowed"]) >= MAX_BOOKS:
                        print(f"  {member['name']} has reached the limit of {MAX_BOOKS}")
                    elif book["copies"] == 0:
                        print(f"  No copies of {book['title']} left")
                    else:
                        book["copies"] -= 1
                        member["borrowed"].add(isbn)
                        times_borrowed[isbn] = times_borrowed.get(isbn, 0) + 1
                        print(f"  {member['name']} borrowed {book['title']}")
                else:
                    if isbn not in member["borrowed"]:
                        print(f"  {member['name']} did not borrow {book['title']}")
                    else:
                        member["borrowed"].remove(isbn)
                        book["copies"] += 1
                        print(f"  {member['name']} returned {book['title']}")
            elif cmd == "available":
                books = sorted((b for b in catalogue.values() if b["copies"] > 0), key=lambda b: b["title"])
                for b in books:
                    print(f"  {b['title']} by {b['author']} ({b['copies']} left)")
            elif cmd == "report":
                for mid, m in members.items():
                    titles = sorted(catalogue[i]["title"] for i in m["borrowed"])
                    print(f"  {m['name']}: {', '.join(titles) if titles else '-'}")
                if times_borrowed:
                    top = max(times_borrowed, key=times_borrowed.get)
                    print(f"  Most borrowed: {catalogue[top]['title']} ({times_borrowed[top]}x)")
            else:
                print("  Commands: borrow, return, available, report, quit")`,
      explain: `Each structure was chosen for a reason: the catalogue and members are dicts because we look them up by ID; each member's borrowed books is a set because a member cannot hold two copies of the same book and we need fast «in» checks; «times_borrowed» is the counting pattern. Validation happens first with «continue», which keeps the main logic unindented and readable. This program is getting long: Level 3 will show you how to split it into functions.`
    })
  ]
});
