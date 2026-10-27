/* Level 0: Orientation. Also holds the home-page copy. */
COURSE.home = {
  lede: 'A step-by-step path from "what is a variable?" to building real programs with classes, files, tests and libraries. Every example runs right here in your browser: edit it, press Run, and see what happens.',
  how: [
    ['1 · Learn', 'Plain-language explanations with the "why", not only the "how".'],
    ['2 · Examples', 'Runnable code. Change it, break it, run it again. That is how you learn.'],
    ['3 · Quiz', 'Quick questions with instant feedback and an explanation for every answer.'],
    ['4 · Tasks', 'Small exercises with hints. Press «Check» and your output is compared to the expected output.'],
    ['5 · Assignment', 'A bigger program per lesson, with a requirement checklist and a model solution.']
  ],
  pathNote: 'Each level builds on the one before it. Do them in order the first time through. Open any level in the sidebar to jump straight to a lesson, and use the **Next** button at the bottom of the screen (or your → arrow key) to move forward.',
  planNote: 'One lesson takes 40 to 90 minutes including the tasks. Studying about one hour a day, five days a week, this schedule gets you through the whole roadmap in ten weeks. Going slower is fine. Skipping the tasks is not: the tasks are where the learning happens.',
  plan: [
    ['1', '0.1 – 1.4', 'Install Python, write your first programs, understand variables, numbers and strings.'],
    ['2', '1.5 – 1.9', 'Take input, make decisions with «if», repeat with loops. Build the Level 1 project.'],
    ['3', '2.1 – 2.4', 'Lists, tuples, dictionaries and sets: the data structures you will use every day.'],
    ['4', '2.5 – 2.7', 'Comprehensions, iteration patterns, and the Level 2 project.'],
    ['5', '3.1 – 3.4', 'Write your own functions, understand scope, recursion and lambdas.'],
    ['6', '3.5 – 3.8', 'Modules, error handling, files, and the Level 3 project.'],
    ['7', '4.1 – 4.4', 'Object-oriented programming: classes, inheritance, properties.'],
    ['8', '4.5 – 4.7, 5.1 – 5.2', 'Dunder methods, dataclasses, the OOP project, generators, decorators.'],
    ['9', '5.3 – 5.7', 'Context managers, type hints, regex, tooling and testing.'],
    ['10', '6.1 – 6.5', 'Real-world Python, the capstone project, and choosing your next path.']
  ],
  tips: [
    '**Type the code yourself** instead of only reading it. Your fingers learn the syntax faster than your eyes.',
    '**Predict before you run.** Before pressing Run, say out loud what you expect to see. When you are wrong, you have found something to learn.',
    '**Break things on purpose.** Remove a colon, misspell a name, and read the error. Errors become friendly once you have seen each one a few times.',
    '**Try the task before opening the hints**, and the hints before the solution. Being stuck for ten minutes is part of the process.',
    'Your progress, ticked requirements and the code you write in tasks are saved in this browser automatically.'
  ]
};

level({
  id: 'L0', num: 0, title: 'Orientation', tag: 'Start here',
  blurb: 'What programming is, why Python, how to install it on your own computer, and how to use this course.',
  outcomes: ['Explain what a program and an interpreter are', 'Install Python and a code editor', 'Run Python in the interactive shell and from a «.py» file']
});

lesson({
  id: 'what-is-python', level: 'L0', title: 'What programming and Python are', minutes: 30,
  keywords: 'introduction interpreter why python',
  goals: ['Describe what a program is in your own words', 'Explain what the Python interpreter does', 'Name the things people build with Python', 'Run your very first line of code in this page'],
  body: [
    section('learn', 'A program is a list of instructions'),
    p`A computer is extremely fast and extremely literal. It does exactly what it is told, in exactly the order it is told, and nothing else. A **program** is a written list of those instructions. **Programming** is the skill of breaking a problem into steps small and precise enough for a computer to follow.

    Think of a recipe. "Make tea" is too vague for a computer. "Fill the kettle with 500 ml of water, switch it on, wait until it boils, put one tea bag in a cup, pour the water, wait 3 minutes, remove the bag" is closer. Programming is mostly this kind of thinking. The typing is the easy part.`,
    p`Computers only understand machine code: long sequences of numbers. Humans write in **programming languages** that are easier to read, and a tool translates them. Python's translator is called the **interpreter**. It reads your code one statement at a time, from top to bottom, and carries each one out.`,
    section('learn', 'Why Python?'),
    ul('**Readable.** Python code looks close to plain English. «if age >= 18: print("adult")» is understandable even before you learn Python.',
       '**General purpose.** One language for websites (Django, Flask, FastAPI), data analysis (pandas), machine learning and AI (PyTorch, scikit-learn), automation scripts, games, science and finance.',
       '**Huge ecosystem.** Over 500,000 free packages on PyPI, the Python Package Index. Someone has usually already solved the boring part of your problem.',
       '**In demand.** Python is consistently one of the most used and most taught languages in the world.',
       '**Forgiving for beginners.** No semicolons, no curly braces, no type declarations. You focus on the logic.'),
    note('deep', 'Going deeper · compiled vs interpreted')`Strictly speaking, CPython (the standard Python) first **compiles** your source code into **bytecode**, a compact set of instructions for a virtual machine, and then the **Python Virtual Machine** interprets that bytecode. You can see the bytecode with the «dis» module («import dis; dis.dis("x = 1 + 2")»). Languages like C are compiled ahead of time into machine code, which is why they usually run faster. Python trades raw speed for development speed and readability, and gets speed back by calling fast C libraries (NumPy, for example) for heavy work. Expect this distinction in an exam question on programming paradigms.`,
    note('info', 'Python 2 vs Python 3')`Python 3 is the only version you should learn. Python 2 reached end of life in 2020. If you see «print "hello"» without brackets in an old tutorial, that is Python 2. This course uses modern Python 3 throughout.`,
    section('try it', 'Your first line of code'),
    p`Below is a code box. It is a real Python interpreter running inside this page. The code already ran once when the page loaded. Change the text between the quotes, then press **▶ Run** (or Ctrl+Enter while typing in the box).`,
    code('Hello, world')`
      print("Hello, world!")
      print("I am learning Python.")
    `,
    p`«print» is a **function**: a named action that Python already knows. The brackets hold what you give to it, and the quotes mark the text as text. Each «print» call writes one line of output.`,
    code('Python can do maths too')`
      print(2 + 3)
      print(10 * 365)
      print("The year has", 365 * 24, "hours")
    `,
    p`Notice the difference: «2 + 3» without quotes is calculated, giving «5». Text in quotes is shown exactly as written. You can pass several things to «print» separated by commas, and it puts a space between them.`,
    section('learn', 'How code runs: top to bottom'),
    p`The interpreter runs your program line by line. If line 3 has an error, lines 1 and 2 have already run, and lines 4 and onward never run. Try it: the third line below has a typo.`,
    code('An error stops the program', { err: true })`
      print("Line one runs")
      print("Line two runs")
      prnt("Line three has a typo")
      print("Line four never runs")
    `,
    p`The red text is an **error message** (also called an exception). Read it from the bottom: «NameError: name 'prnt' is not defined» means Python does not know any word «prnt». Fix the spelling and run again. Reading error messages calmly is one of the most important skills you will build.`,
    quiz(
      { q: 'What does the Python interpreter do?', o: ['Turns your computer on', 'Reads your Python code and carries out each instruction', 'Checks your spelling in documents', 'Downloads Python packages'], a: 1, why: 'The interpreter reads and executes Python code statement by statement.' },
      { q: 'What does this print?', code: 'print(4 * 5)', o: ['«4 * 5»', '«20»', '«45»', 'An error'], a: 1, why: 'Without quotes, «4 * 5» is an expression and is calculated first.' },
      { q: 'What does this print?', code: 'print("4 * 5")', o: ['«4 * 5»', '«20»', '«"4 * 5"»', 'An error'], a: 0, why: 'Inside quotes it is text, printed exactly as written (the quotes themselves are not printed).' },
      { q: 'A program has an error on line 5 of 10. What happens?', o: ['Nothing runs at all', 'Lines 1–4 run, then the program stops with an error', 'Python skips line 5 and continues', 'Python fixes the error automatically'], a: 1, why: 'Python runs top to bottom and stops at the first error it hits while running. (Syntax errors are different: they are found before anything runs. You will meet them soon.)' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Introduce yourself', level: 'easy',
      prompt: `Write a program that prints exactly these three lines:

      «My name is Python Learner»
      «I am starting today»
      «Goal: build real programs»`,
      starter: `# Use three print() calls
      `,
      expect: `
        My name is Python Learner
        I am starting today
        Goal: build real programs`,
      hints: ['Each line of output needs its own «print(...)».', 'Text must be inside quotes: «print("I am starting today")».'],
      solution: `
        print("My name is Python Learner")
        print("I am starting today")
        print("Goal: build real programs")`
    }),
    task({
      title: 'Minutes in a week', level: 'easy',
      prompt: `Use Python as a calculator. Print the number of minutes in a week, as a single number. There are 60 minutes in an hour, 24 hours in a day and 7 days in a week.`,
      expect: `10080`,
      hints: ['Multiply the three numbers together inside «print()».', 'Do not put the calculation in quotes, or Python will print the text instead of the answer.'],
      solution: `print(60 * 24 * 7)`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'A business card in the terminal',
      brief: `Programs often produce formatted text. Print a small "business card" made of characters. It must have a top and bottom border, your name, a job title you would like to have one day, and a line with a calculation inside it (for example how many days until you finish this course, if you study 5 days a week for 10 weeks).`,
      reqs: ['A border line at the top and bottom made of a repeated character such as «=» or «*»', 'Your name on its own line', 'A dream job title on its own line', 'One line that mixes text and a calculated number using commas in «print»', 'At least 5 lines of output in total'],
      sample: `
        ==============================
          Ama Mensah
          Future Python Developer
          Days of study planned: 50
        ==============================`,
      starter: `# Print your business card here
      print("==============================")
      `,
      solution: `
        print("==============================")
        print("  Ama Mensah")
        print("  Future Python Developer")
        print("  Days of study planned:", 5 * 10)
        print("==============================")`,
      explain: `Each line is one «print». The calculated line passes two things to «print», a piece of text and the expression «5 * 10»; «print» evaluates the expression, then separates the two values with a space. In the next level you will learn a shorter way to repeat the border: «print("=" * 30)».`
    })
  ]
});

lesson({
  id: 'setup', level: 'L0', title: 'Installing Python and running scripts', minutes: 45,
  keywords: 'install vs code editor terminal repl script',
  goals: ['Install Python 3 on Windows, macOS or Linux', 'Use the interactive shell (REPL)', 'Write a «.py» file in VS Code and run it', 'Know when to use this page versus your own computer'],
  body: [
    section('learn', 'Two ways to run Python'),
    p`You can use this page for almost the whole course: it runs Python in your browser. But real projects run on your own computer, and a few lessons (files, packages, virtual environments) need it. Set it up now so it is ready when you need it.

    There are two ways to run Python on a computer:`,
    ul('**The interactive shell (REPL).** You type one line, press Enter, and see the result immediately. REPL stands for Read, Evaluate, Print, Loop. Great for quick experiments.',
       '**Scripts.** You write many lines into a file ending in «.py», save it, and run the whole file. This is how real programs are made.'),
    section('setup', 'Install Python'),
    table(['System', 'Steps'], [
      ['Windows', 'Go to python.org → Downloads → download the latest Python 3 installer. Run it and **tick "Add python.exe to PATH"** on the first screen, then click Install Now. Open the Start menu → "Command Prompt" and type «python --version».'],
      ['macOS', 'Download the macOS installer from python.org and run it. Open the Terminal app and type «python3 --version». (On a Mac, use «python3» and «pip3» in every command.)'],
      ['Linux', 'Python 3 is usually installed. Open a terminal and type «python3 --version». If missing, on Ubuntu/Debian: «sudo apt install python3 python3-pip python3-venv».'],
      ['Phone / tablet', 'Use this page, or an app such as Pydroid 3 (Android) or Pyto (iOS).']
    ]),
    p`If the version command prints something like «Python 3.12.4», you are ready. Any version 3.10 or newer works for this course.`,
    note('warn', 'The most common install problem')`On Windows, if «python» is "not recognized as an internal or external command", Python was installed without ticking **Add to PATH**. Run the installer again, choose **Modify**, and tick the PATH option (or reinstall and tick it on the first screen).`,
    section('setup', 'Use the interactive shell'),
    p`In your terminal type «python» (Windows) or «python3» (macOS/Linux) and press Enter. You will see the prompt «>>>». That prompt means "Python is waiting for you". Try these, pressing Enter after each:`,
    code('In the REPL (on your computer)', { run: false, out: '5\nHello\n3.5' })`
      >>> 2 + 3
      >>> print("Hello")
      >>> 7 / 2
      >>> exit()
    `,
    p`In the REPL you do not even need «print» for expressions: typing «2 + 3» shows «5». «exit()» (or Ctrl+D on macOS/Linux, Ctrl+Z then Enter on Windows) leaves the shell.`,
    section('setup', 'Install an editor: VS Code'),
    ol('Download Visual Studio Code from code.visualstudio.com and install it.',
       'Open VS Code → Extensions (the four squares icon on the left) → search **Python** → install the one by Microsoft.',
       'Create a folder for the course, for example «python-course» in your Documents. In VS Code choose File → Open Folder and pick it.',
       'Create a new file called «hello.py». The «.py» ending tells everyone it is Python.',
       'Type the code below, save with Ctrl+S (Cmd+S on Mac), then click the ▶ button at the top right, or open a terminal (View → Terminal) and type «python hello.py».'),
    code('hello.py')`
      # hello.py — my first script
      # Lines that start with # are comments. Python ignores them.
      name = "Python learner"
      print("Hello,", name)
      print("This file was run as a script.")
    `,
    p`Other good editors: **PyCharm Community** (a full Python IDE), **Thonny** (very simple, made for beginners), or **IDLE** (installed together with Python). Pick one and stick with it.`,
    section('learn', 'Comments'),
    p`A **comment** starts with «#». Everything after it on that line is ignored by Python. Comments are notes for humans: what the code is for, why you did something unusual. They are also handy for "switching off" a line while testing.`,
    code('Comments are ignored')`
      # This whole line is a comment
      print("This runs")   # a comment after code is fine too
      # print("This does not run, it is commented out")
    `,
    note('tip', 'Good comments explain why')`«x = x + 1  # add one to x» adds nothing: the code already says that. «retries = retries + 1  # the server sometimes drops the first request» explains something the code cannot.`,
    quiz(
      { q: 'What does the «>>>» prompt mean?', o: ['An error happened', 'The interactive Python shell is waiting for input', 'The script finished', 'You need to install Python'], a: 1, why: 'The triple chevron is the REPL prompt.' },
      { q: 'Which file name is a Python script?', o: ['«game.txt»', '«game.python»', '«game.py»', '«game.exe»'], a: 2, why: 'Python files end in «.py».' },
      { q: 'What does Python do with «# total = 5»?', o: ['Creates a variable', 'Ignores it, it is a comment', 'Prints it', 'Raises an error'], a: 1, why: 'Everything after «#» is a comment.' },
      { q: 'On Windows, «python» is "not recognized". The most likely cause?', o: ['Python 2 is installed', 'Python was not added to PATH', 'The computer needs more memory', 'You must use «py.exe» only'], a: 1, why: 'Without PATH, the terminal cannot find the python program. (Windows also offers the «py» launcher, which is a valid workaround.)' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Comment it out', level: 'easy',
      prompt: `The program below prints four lines. Without deleting anything, use comments so that it prints only the lines «Keep me» and «Keep me too».`,
      starter: `
        print("Keep me")
        print("Remove me")
        print("Keep me too")
        print("Remove me as well")`,
      expect: `
        Keep me
        Keep me too`,
      hints: ['Put a «#» at the very start of each line you want Python to ignore.'],
      solution: `
        print("Keep me")
        # print("Remove me")
        print("Keep me too")
        # print("Remove me as well")`
    }),
    task({
      title: 'Your setup checklist', level: 'practice',
      prompt: `On your own computer: install Python, open the REPL and calculate «2 ** 10» (this is 2 to the power of 10). Then create «setup_check.py» containing the code below and run it as a script. Paste the code here too and press Run to compare.`,
      starter: `
        import sys
        print("Python version:", sys.version.split()[0])
        print("2 to the power of 10 is", 2 ** 10)`,
      solution: `
        import sys
        print("Python version:", sys.version.split()[0])
        print("2 to the power of 10 is", 2 ** 10)`,
      explain: `«import sys» loads a built-in module that knows about the running interpreter. On your computer you will see your real version number. In this page it shows the version of the in-browser interpreter.`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Set up your learning folder',
      brief: `Create a proper workspace you will use for the rest of the course. This is real-world practice: programmers keep each project in its own folder.`,
      reqs: ['Python 3.10+ installed; «python --version» (or «python3 --version») works in a terminal', 'VS Code (or another editor) installed with the Python extension', 'A folder named «python-course» with a sub-folder «level0»', 'A script «level0/about_me.py» that prints at least four lines about you, with at least two comments', 'You ran the script from the terminal with «python about_me.py» (after «cd» into the folder)'],
      starter: `
        # about_me.py
        # Author: your name
        print("...")`,
      solution: `
        # about_me.py
        # Author: Kofi Boateng
        # Purpose: practise running a script from the terminal

        print("Name: Kofi Boateng")
        print("City: Accra")
        print("Why Python: I want to automate boring work")
        print("Hours per week I can study:", 5)`,
      explain: `To run it: open a terminal, move into the folder with «cd Documents/python-course/level0» (adjust the path), then run «python about_me.py» (or «python3 about_me.py»). If you get "No such file", the terminal is in the wrong folder: type «dir» (Windows) or «ls» (Mac/Linux) to see where you are.`
    })
  ]
});
