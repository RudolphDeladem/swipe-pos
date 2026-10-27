/* Level 6: Applied Python and next steps */
level({
  id: 'L6', num: 6, title: 'Applied Python & Next Steps', tag: 'Job-ready',
  blurb: 'Use Python on real problems: web APIs, data analysis, automation and algorithms. Then build a capstone and choose your specialisation.',
  outcomes: ['Call web APIs and handle JSON responses', 'Analyse data with NumPy and pandas', 'Automate file and command-line tasks', 'Implement and analyse classic algorithms', 'Deliver a complete, tested capstone application', 'Plan your next steps toward a career path']
});

/* ------------------------------------------------------------------ 6.1 */
lesson({
  id: 'web-apis', level: 'L6', title: 'Working with web APIs', minutes: 55,
  keywords: 'api http requests json rest status code get post headers',
  goals: ['Explain HTTP requests, responses and status codes', 'Call a REST API with the «requests» library', 'Process nested JSON responses', 'Handle network errors, timeouts and pagination responsibly'],
  body: [
    section('learn', 'How programs talk over the web'),
    p`An **API** (Application Programming Interface) is a way for one program to use another. A **web API** is used over HTTP: your program sends a **request** to a URL and receives a **response**, almost always containing JSON. Weather apps, mobile money, maps and AI services are all used through web APIs.`,
    table(['Part', 'Examples'], [
      ['Method', '«GET» read data, «POST» create, «PUT»/«PATCH» update, «DELETE» remove'],
      ['URL', '«https://api.example.com/v1/students?programme=CS&page=2»'],
      ['Headers', '«Authorization: Bearer <token>», «Accept: application/json»'],
      ['Body', 'JSON sent with POST/PUT: «{"name": "Ama"}»'],
      ['Status code', '«200» OK, «201» created, «400» bad request, «401» not authenticated, «403» forbidden, «404» not found, «429» too many requests, «500» server error']
    ]),
    section('learn', 'The requests library'),
    p`«requests» is the most popular HTTP library for Python. Install it in your virtual environment with «pip install requests». Browsers block this page from making these calls, so run the next examples on your computer.`,
    code('GET a resource', { run: false, out: '200\npython/cpython - The Python programming language\nlanguage: Python\nstars > 50k: True' })`
      import requests

      response = requests.get(
          "https://api.github.com/repos/python/cpython",
          headers={"Accept": "application/vnd.github+json"},
          timeout=10,
      )
      print(response.status_code)
      response.raise_for_status()          # raises an exception for 4xx/5xx
      repo = response.json()               # parse the JSON body into a dict
      print(repo["full_name"], "-", repo["description"])
      print("language:", repo["language"])
      print("stars > 50k:", repo["stargazers_count"] > 50_000)
    `,
    code('Query parameters, POST and error handling', { run: false })`
      import requests

      try:
          r = requests.get("https://api.example.com/v1/courses",
                           params={"programme": "CS", "level": 200},   # becomes ?programme=CS&level=200
                           timeout=5)
          r.raise_for_status()
          courses = r.json()
      except requests.exceptions.Timeout:
          print("The server took too long to answer.")
      except requests.exceptions.HTTPError as e:
          print("Server returned an error:", e.response.status_code)
      except requests.exceptions.ConnectionError:
          print("No internet connection, or the server is down.")

      new = requests.post("https://api.example.com/v1/students",
                          json={"name": "Ama", "programme": "CS"},        # sent as a JSON body
                          headers={"Authorization": "Bearer YOUR_TOKEN"},
                          timeout=5)
      print(new.status_code)        # 201 if created
    `,
    note('warn', 'Keep secrets out of code')`API keys and tokens are passwords. Never paste them into code you commit or share. Store them in environment variables and read them with «os.environ["WEATHER_API_KEY"]», or in a «.env» file listed in «.gitignore». Leaked keys on GitHub are found by bots within minutes.`,
    section('learn', 'Processing JSON responses'),
    p`Once you have the JSON, it is ordinary Python dicts and lists, so everything from Levels 2 and 3 applies. This runnable example uses a saved response from a weather-style API.`,
    code('Navigating nested JSON')`
      import json

      raw = """{
        "city": "Accra",
        "units": "metric",
        "forecast": [
          {"date": "2026-10-28", "temp": {"min": 24.1, "max": 31.6}, "rain_mm": 0.0, "summary": "Sunny"},
          {"date": "2026-10-29", "temp": {"min": 24.8, "max": 30.2}, "rain_mm": 12.4, "summary": "Thunderstorms"},
          {"date": "2026-10-30", "temp": {"min": 23.9, "max": 29.5}, "rain_mm": 3.1, "summary": "Light rain"},
          {"date": "2026-10-31", "temp": {"min": 24.5, "max": 32.0}, "rain_mm": 0.0, "summary": "Hot and sunny"}
        ]
      }"""

      data = json.loads(raw)            # with requests: data = response.json()
      print(f"Forecast for {data['city']}")
      for day in data["forecast"]:
          umbrella = "take an umbrella" if day["rain_mm"] > 1 else ""
          print(f"  {day['date']}  {day['temp']['min']:>4}-{day['temp']['max']:<5} {day['summary']:<14} {umbrella}")

      hottest = max(data["forecast"], key=lambda d: d["temp"]["max"])
      total_rain = sum(d["rain_mm"] for d in data["forecast"])
      print(f"Hottest: {hottest['date']} ({hottest['temp']['max']} C). Total rain: {total_rain:.1f} mm")
    `,
    section('learn', 'Being a good API client'),
    ul('**Always set a timeout**, otherwise a stuck server can freeze your program forever.',
       '**Respect rate limits.** If you receive «429», wait (the «Retry-After» header says how long) and use exponential backoff: wait 1 s, 2 s, 4 s, 8 s between retries.',
       '**Handle pagination.** Large results come in pages; follow the «next» link or increase «page» until no results remain.',
       '**Cache** responses you will need again instead of re-downloading them.',
       '**Read the documentation and terms of use.** Some APIs forbid storing data or require attribution.'),
    code('Pagination pattern (simulated)')`
      PAGES = {1: {"items": ["Ama", "Kofi"], "next": 2},
               2: {"items": ["Esi", "Yaw"], "next": 3},
               3: {"items": ["Akua"], "next": None}}

      def fetch_page(n):                # stands in for requests.get(url, params={"page": n}).json()
          print(f"  GET /students?page={n}")
          return PAGES[n]

      def all_students():
          page = 1
          while page is not None:
              data = fetch_page(page)
              yield from data["items"]
              page = data["next"]

      print(list(all_students()))
    `,
    note('deep', 'Going deeper · REST and statelessness')`**REST** (Representational State Transfer) is an architectural style where URLs name *resources* («/students/42») and HTTP methods name *actions*. Each request carries everything the server needs, so servers keep no per-client session memory (**statelessness**), which makes them easy to scale across many machines. «GET», «PUT» and «DELETE» should be **idempotent**: repeating them has the same effect as doing them once, which is why retries are safe for them but not always for «POST». You will build the other side, your own API, with Flask or FastAPI in a web development course.`,
    quiz(
      { q: 'Which status code means "not found"?', o: ['200', '201', '404', '500'], a: 2, why: '4xx codes are client errors; 404 means the resource does not exist.' },
      { q: 'What does «response.json()» return?', o: ['A JSON string', 'Python objects (dicts/lists) parsed from the body', 'The status code', 'The headers'], a: 1, why: 'It parses the body for you.' },
      { q: 'Why should every request have a timeout?', o: ['It makes requests faster', 'Without one, a stuck server can hang your program indefinitely', 'APIs require it', 'To save bandwidth'], a: 1, why: 'requests has no default timeout.' },
      { q: 'Where should an API key be stored?', o: ['In the source code', 'In an environment variable or untracked .env file', 'In a comment', 'In the README'], a: 1, why: 'Never commit secrets.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Exchange rate converter', level: 'medium',
      prompt: `The JSON below is a saved response from an exchange-rate API (rates relative to USD; these numbers are made up for the exercise). Write «convert(amount, src, dst, data)» that converts between any two currencies via USD, rounded to 2 decimals, raising «KeyError» for an unknown currency.`,
      starter: R`
        import json
        RESPONSE = '{"base": "USD", "date": "2026-10-27", "rates": {"USD": 1, "GHS": 15.2, "NGN": 1520.0, "EUR": 0.92, "GBP": 0.79}}'

        def convert(amount, src, dst, data):
            pass

        data = json.loads(RESPONSE)
        print(convert(100, "USD", "GHS", data))
        print(convert(1000, "GHS", "NGN", data))
        print(convert(50, "EUR", "GBP", data))`,
      expect: `
        1520.0
        100000.0
        42.93`,
      hints: ['Convert to USD first: «amount / rates[src]», then multiply by «rates[dst]».'],
      solution: R`
        import json
        RESPONSE = '{"base": "USD", "date": "2026-10-27", "rates": {"USD": 1, "GHS": 15.2, "NGN": 1520.0, "EUR": 0.92, "GBP": 0.79}}'

        def convert(amount, src, dst, data):
            rates = data["rates"]
            usd = amount / rates[src]
            return round(usd * rates[dst], 2)

        data = json.loads(RESPONSE)
        print(convert(100, "USD", "GHS", data))
        print(convert(1000, "GHS", "NGN", data))
        print(convert(50, "EUR", "GBP", data))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Country explorer with a real API',
      brief: `On your computer, use the free REST Countries API (no key needed) to build a command-line country explorer. Fetch «https://restcountries.com/v3.1/region/africa» once, cache the JSON in a file, and answer questions from the cached data. The runnable solution below works on a small saved sample, so you can test your logic here first.`,
      reqs: ['«fetch_or_load(path)»: if the cache file exists load it, otherwise request the API (with timeout and error handling) and save it', '«summarise(country)»: returns a dict with common name, capital (first one, or "—"), population, area and currency codes', 'Print the 5 most populous countries and the 3 with the highest population density', 'Let the user search by partial name (case-insensitive) and print the summary', 'Handle missing fields gracefully with «.get()», since real API data is never perfectly consistent'],
      input: 'gha\nzzz\nquit',
      starter: R`
        import json
        `,
      solution: R`
        import json

        # On your computer:
        # import requests
        # def fetch_or_load(path="africa.json"):
        #     try:
        #         with open(path, encoding="utf-8") as f:
        #             return json.load(f)
        #     except FileNotFoundError:
        #         r = requests.get("https://restcountries.com/v3.1/region/africa", timeout=15)
        #         r.raise_for_status()
        #         data = r.json()
        #         with open(path, "w", encoding="utf-8") as f:
        #             json.dump(data, f)
        #         return data

        SAMPLE = [
            {"name": {"common": "Ghana"}, "capital": ["Accra"], "population": 31072945, "area": 238533,
             "currencies": {"GHS": {"name": "Ghanaian cedi"}}},
            {"name": {"common": "Nigeria"}, "capital": ["Abuja"], "population": 206139587, "area": 923768,
             "currencies": {"NGN": {"name": "Nigerian naira"}}},
            {"name": {"common": "Rwanda"}, "capital": ["Kigali"], "population": 12952209, "area": 26338,
             "currencies": {"RWF": {"name": "Rwandan franc"}}},
            {"name": {"common": "Egypt"}, "capital": ["Cairo"], "population": 102334403, "area": 1002450,
             "currencies": {"EGP": {"name": "Egyptian pound"}}},
            {"name": {"common": "Mauritius"}, "capital": ["Port Louis"], "population": 1265740, "area": 2040,
             "currencies": {"MUR": {"name": "Mauritian rupee"}}},
            {"name": {"common": "Western Sahara"}, "population": 510713, "area": 266000},
        ]


        def summarise(c):
            area = c.get("area") or 0
            return {
                "name": c.get("name", {}).get("common", "?"),
                "capital": (c.get("capital") or ["—"])[0],
                "population": c.get("population", 0),
                "area": area,
                "density": c.get("population", 0) / area if area else 0,
                "currencies": sorted(c.get("currencies", {}).keys()),
            }


        countries = [summarise(c) for c in SAMPLE]
        print("Most populous:")
        for c in sorted(countries, key=lambda c: c["population"], reverse=True)[:5]:
            print(f"  {c['name']:<15}{c['population']:>13,}")
        print("Most densely populated:")
        for c in sorted(countries, key=lambda c: c["density"], reverse=True)[:3]:
            print(f"  {c['name']:<15}{c['density']:>9.1f} people/km2")

        while True:
            query = input("Search country (or quit): ").strip().lower()
            if query == "quit":
                break
            hits = [c for c in countries if query in c["name"].lower()]
            if not hits:
                print("  no match")
            for c in hits:
                print(f"  {c['name']}: capital {c['capital']}, population {c['population']:,}, "
                      f"currencies {', '.join(c['currencies']) or '—'}")`,
      explain: `Western Sahara has no capital or currency in the sample, just as some entries in the real API do; «c.get("capital") or ["—"]» handles both a missing key and an empty list. Caching the response means you call the API once while developing instead of hundreds of times, which is polite and much faster. The «:,» format adds thousands separators.`
    })
  ]
});

/* ------------------------------------------------------------------ 6.2 */
lesson({
  id: 'data-analysis', level: 'L6', title: 'Data analysis with NumPy and pandas', minutes: 70,
  keywords: 'numpy pandas dataframe series groupby read_csv matplotlib data science jupyter',
  goals: ['Explain why NumPy arrays are faster than lists for numbers', 'Load, inspect, filter and group tabular data with pandas', 'Clean missing values and create derived columns', 'Plot results and work in Jupyter notebooks'],
  body: [
    section('learn', 'The scientific Python stack'),
    p`Python dominates data science because of a few libraries built on each other: **NumPy** (fast numeric arrays), **pandas** (tables called DataFrames), **Matplotlib**/**seaborn** (charts), **scikit-learn** (machine learning) and **Jupyter** notebooks (code, output and notes in one document). Install them in a virtual environment: «pip install numpy pandas matplotlib jupyter», then start a notebook with «jupyter lab». These libraries contain compiled C code, so run this lesson's examples on your computer; the outputs shown were produced by real runs.`,
    section('learn', 'NumPy: vectorised arithmetic'),
    code('Arrays', { run: false, out: '69.5 15.15 91\n[72 87 50 96 63 79]\n[67 82 91 74]\n[[ 7 10]\n [15 22]]\n[0.   0.25 0.5  0.75 1.  ]' })`
      import numpy as np

      marks = np.array([67, 82, 45, 91, 58, 74])
      print(marks.mean(), marks.std().round(2), marks.max())
      print(marks + 5)                  # vectorised: applied to every element
      print(marks[marks >= 60])         # boolean filtering
      matrix = np.array([[1, 2], [3, 4]])
      print(matrix @ matrix)            # matrix multiplication
      print(np.linspace(0, 1, 5))
    `,
    p`A NumPy array stores numbers of one type in a single contiguous block of memory, and operations like «marks + 5» run as a single loop in C instead of a Python loop. That makes them typically 10–100× faster than equivalent list code. Compare «marks + 5» with the list version «[m + 5 for m in marks]».`,
    section('learn', 'pandas: DataFrames'),
    code('Creating, inspecting, filtering and grouping', { run: false, out: '   name programme  level   gpa\n0   Ama        CS    200  3.71\n1  Kofi       Law    300  3.20\n2   Esi        CS    200  3.95\n(6, 4)\n3.368\n  name   gpa\n0  Ama  3.71\n2  Esi  3.95\n3  Yaw  3.40\n           count  mean\nprogramme             \nCS             3  3.59\nLaw            2  3.03\nMedicine       1  3.40\n[\'Esi\', \'Ama\']' })`
      import pandas as pd

      df = pd.DataFrame({
          "name": ["Ama", "Kofi", "Esi", "Yaw", "Akua", "Kwame"],
          "programme": ["CS", "Law", "CS", "Medicine", "Law", "CS"],
          "level": [200, 300, 200, 400, 100, 300],
          "gpa": [3.71, 3.20, 3.95, 3.40, 2.85, 3.10],
      })
      print(df.head(3))
      print(df.shape)
      print(df["gpa"].mean().round(3))
      print(df[df["gpa"] >= 3.4][["name", "gpa"]])
      print(df.groupby("programme")["gpa"].agg(["count", "mean"]).round(2))
      print(df.sort_values("gpa", ascending=False).head(2)["name"].tolist())
    `,
    p`A **DataFrame** is a table: labelled columns (each a **Series**) and an index for the rows. «df["gpa"]» selects a column; «df[condition]» selects rows (the condition is a boolean Series, like NumPy filtering); «groupby» splits rows into groups, applies an aggregate to each, and combines the results. That last pattern, **split–apply–combine**, is the same grouping you wrote by hand with dictionaries in lesson 2.4, now in one line.`,
    code('Real data: load, clean, derive, summarise', { run: false, out: '1 missing quantity\n        revenue\nregion         \nAccra     701.0\nKumasi    102.0\nTamale    960.0\ndate\nThursday    752.0\nFriday      640.0\nName: revenue, dtype: float64' })`
      import pandas as pd
      from io import StringIO

      csv_text = """date,region,product,qty,price
      2026-10-01,Accra,laptop,1,650
      2026-10-01,Kumasi,mouse,4,25.5
      2026-10-02,Accra,phone,,300
      2026-10-02,Tamale,laptop,1,640
      2026-10-03,Accra,mouse,2,25.5
      2026-10-04,Tamale,phone,1,320"""

      sales = pd.read_csv(StringIO(csv_text), parse_dates=["date"])   # on your computer: pd.read_csv("sales.csv")
      print(sales.isna().sum()["qty"], "missing quantity")
      sales = sales.dropna(subset=["qty"])
      sales["revenue"] = sales["qty"] * sales["price"]
      summary = sales.pivot_table(index="region", values="revenue", aggfunc="sum")
      print(summary)
      print(sales.groupby(sales["date"].dt.day_name())["revenue"].sum().sort_values(ascending=False).head(2))
    `,
    table(['Task', 'pandas'], [
      ['Read / write files', '«pd.read_csv»,  «pd.read_excel»,  «df.to_csv("out.csv", index=False)»'],
      ['Inspect', '«df.head()», «df.info()», «df.describe()», «df.shape», «df.dtypes»'],
      ['Select', '«df["col"]», «df[["a", "b"]]», «df.loc[row_labels, cols]», «df.iloc[0:5]»'],
      ['Filter', '«df[(df.gpa > 3) & (df.level == 200)]» (use «&», «|», «~» with brackets)'],
      ['Missing data', '«df.isna().sum()», «df.dropna()», «df.fillna(0)»'],
      ['New columns', '«df["total"] = df.qty * df.price», «df["grade"] = df.mark.apply(letter)»'],
      ['Group', '«df.groupby("col")["x"].agg(["mean", "max"])», «pivot_table»'],
      ['Sort / rank', '«df.sort_values("gpa", ascending=False)», «df.nlargest(5, "gpa")»'],
      ['Combine', '«pd.merge(students, results, on="sid")», «pd.concat([df1, df2])»']
    ]),
    section('learn', 'Plotting'),
    code('A chart with Matplotlib', { run: false })`
      import matplotlib.pyplot as plt

      programmes = ["CS", "Law", "Medicine"]
      mean_gpa = [3.59, 3.03, 3.40]

      fig, ax = plt.subplots(figsize=(6, 4))
      ax.bar(programmes, mean_gpa)
      ax.set_title("Mean GPA by programme")
      ax.set_ylabel("GPA")
      ax.set_ylim(0, 4)
      plt.tight_layout()
      plt.savefig("gpa.png", dpi=150)      # or plt.show() in a notebook
    `,
    p`Always label axes, include units, start bar charts at zero, and title the chart with what the reader should learn from it. With pandas you can plot directly: «df.groupby("programme")["gpa"].mean().plot(kind="bar")».`,
    note('deep', 'Going deeper · vectorisation and reproducible analysis')`Vectorised operations are fast for two reasons: the loop runs in compiled C instead of the Python interpreter, and contiguous arrays make good use of the CPU cache and SIMD instructions that process several numbers per cycle. For your coursework and research, aim for **reproducible analysis**: keep raw data read-only, do all cleaning in code (never by hand in a spreadsheet), fix random seeds, record package versions (lesson 5.6), and make the notebook run top to bottom without errors. Then anyone, including your supervisor, can regenerate every number and chart.`,
    quiz(
      { q: 'Why is «arr * 2» on a NumPy array faster than a list comprehension?', o: ['It uses multiple computers', 'The loop runs in compiled C over contiguous memory', 'It skips some elements', 'It caches the result'], a: 1, why: 'Vectorised operations avoid the per-element interpreter overhead.' },
      { q: 'How do you select rows where gpa > 3.5 in pandas?', o: ['«df.gpa > 3.5»', '«df[df["gpa"] > 3.5]»', '«df.select(gpa > 3.5)»', '«df.filter(3.5)»'], a: 1, why: 'Index the DataFrame with a boolean Series.' },
      { q: 'What does «groupby(...).mean()» implement?', o: ['Sorting', 'Split–apply–combine', 'Merging', 'Plotting'], a: 1, why: 'Split rows into groups, apply an aggregate, combine results.' },
      { q: 'How do you combine two conditions in a pandas filter?', o: ['«and»', '«&» with brackets around each condition', '«+»', '«,»'], a: 1, why: '«and» does not work element-wise; use «&», «|» and «~».' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Split–apply–combine by hand', level: 'medium',
      prompt: `Before relying on pandas, make sure you can do it yourself. Given rows of «(programme, gpa)», print the count, mean (2 decimals) and max GPA per programme, sorted by programme name.`,
      starter: R`
        rows = [("CS", 3.71), ("Law", 3.20), ("CS", 3.95), ("Medicine", 3.40), ("Law", 2.85), ("CS", 3.10)]
        `,
      expect: `
        CS: count=3 mean=3.59 max=3.95
        Law: count=2 mean=3.03 max=3.2
        Medicine: count=1 mean=3.40 max=3.4`,
      hints: ['Split: group into a dict of lists. Apply: compute count/mean/max per list. Combine: print sorted.'],
      solution: R`
        rows = [("CS", 3.71), ("Law", 3.20), ("CS", 3.95), ("Medicine", 3.40), ("Law", 2.85), ("CS", 3.10)]
        groups = {}
        for programme, gpa in rows:
            groups.setdefault(programme, []).append(gpa)
        for programme in sorted(groups):
            g = groups[programme]
            print(f"{programme}: count={len(g)} mean={sum(g) / len(g):.2f} max={max(g)}")`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Exploratory data analysis report',
      brief: `On your computer, in a Jupyter notebook, perform an exploratory data analysis (EDA) on a real dataset. Good public sources: Kaggle, your country's open data portal, or the World Bank (data.worldbank.org). A good first choice is any CSV with at least 500 rows and a mix of numeric and text columns. The runnable code below performs the same kind of analysis without pandas on a small sample, so you can check your reasoning.`,
      reqs: ['State 3 questions you want the data to answer before you look at it', 'Load the data with «pd.read_csv»; report shape, column types and missing values', 'Clean it: handle missing values, fix types, remove duplicates; explain each decision in a markdown cell', 'Answer each question with a grouped summary or filter, plus one clearly labelled chart', 'Write a short conclusion: what did you find, and what are the limitations of this data?', 'Restart the kernel and run all cells to confirm the notebook is reproducible'],
      starter: R`
        # A pure-Python version of an EDA on a tiny sample
        `,
      solution: R`
        import statistics as st

        rows = [
            {"name": "Ama", "programme": "CS", "level": 200, "gpa": 3.71, "hours_study": 18},
            {"name": "Kofi", "programme": "Law", "level": 300, "gpa": 3.20, "hours_study": 12},
            {"name": "Esi", "programme": "CS", "level": 200, "gpa": 3.95, "hours_study": 22},
            {"name": "Yaw", "programme": "Medicine", "level": 400, "gpa": 3.40, "hours_study": None},
            {"name": "Akua", "programme": "Law", "level": 100, "gpa": 2.85, "hours_study": 8},
            {"name": "Kwame", "programme": "CS", "level": 300, "gpa": 3.10, "hours_study": 10},
            {"name": "Esi", "programme": "CS", "level": 200, "gpa": 3.95, "hours_study": 22},
        ]

        print("Q1: Does study time relate to GPA?  Q2: Which programme has the highest GPA?  Q3: How many rows are bad?")
        print("Rows:", len(rows))
        missing = sum(1 for r in rows if r["hours_study"] is None)
        unique = list({(r["name"], r["programme"], r["level"]): r for r in rows}.values())
        print("Missing study hours:", missing, "| duplicates removed:", len(rows) - len(unique))
        clean = [r for r in unique if r["hours_study"] is not None]

        hours = [r["hours_study"] for r in clean]
        gpas = [r["gpa"] for r in clean]
        r = st.correlation(hours, gpas)
        print(f"Q1: Pearson correlation between study hours and GPA: {r:.2f}")

        by_prog = {}
        for row in unique:
            by_prog.setdefault(row["programme"], []).append(row["gpa"])
        means = {p: round(st.mean(v), 2) for p, v in by_prog.items()}
        print("Q2: mean GPA by programme:", dict(sorted(means.items(), key=lambda kv: -kv[1])))
        print("Q3: 1 duplicate and 1 missing value in", len(rows), "rows")
        print("Limitation: 6 students is far too small a sample, and correlation does not imply causation.")`,
      explain: `The duplicate is removed by building a dictionary keyed on identifying fields: later duplicates overwrite earlier ones, leaving one per key. A correlation near 1 here would be meaningless with so few points, which is exactly the kind of limitation a good conclusion states. In pandas the same steps are «df.drop_duplicates()», «df.dropna(subset=["hours_study"])», «df["hours_study"].corr(df["gpa"])» and «df.groupby("programme")["gpa"].mean()».`
    })
  ]
});

/* ------------------------------------------------------------------ 6.3 */
lesson({
  id: 'automation', level: 'L6', title: 'Automation and command-line tools', minutes: 50,
  keywords: 'automation os pathlib shutil argparse sys argv glob rename scheduling cli',
  goals: ['Work with files and folders using «pathlib» and «shutil»', 'Build command-line tools with «argparse»', 'Write scripts that automate repetitive tasks safely', 'Schedule scripts to run automatically'],
  body: [
    section('learn', 'Let the computer do the boring work'),
    p`Renaming 300 photos, sorting a downloads folder, merging 40 CSV files, generating personalised certificates, checking a website every morning: tasks like these take hours by hand and a few seconds with a script. The book title "Automate the Boring Stuff with Python" captures one of the most immediately useful things Python can do for you as a student. This lesson's file-system code must run on your computer.`,
    section('learn', 'pathlib: paths as objects'),
    code('Exploring and organising a folder', { run: false })`
      from pathlib import Path
      import shutil

      downloads = Path.home() / "Downloads"          # works on Windows, macOS, Linux
      print(downloads.exists(), downloads.is_dir())

      for path in downloads.iterdir():
          if path.is_file():
              print(path.name, path.suffix, path.stat().st_size, "bytes")

      # sort files into sub-folders by extension
      GROUPS = {".pdf": "Documents", ".docx": "Documents", ".jpg": "Images",
                ".png": "Images", ".zip": "Archives", ".py": "Code"}
      for path in downloads.iterdir():
          if path.is_file() and path.suffix.lower() in GROUPS:
              target = downloads / GROUPS[path.suffix.lower()]
              target.mkdir(exist_ok=True)
              shutil.move(str(path), target / path.name)

      for pdf in downloads.rglob("*.pdf"):            # recursive search
          print(pdf.relative_to(downloads))
    `,
    table(['Operation', 'Code'], [
      ['Build a path', '«Path("data") / "2026" / "marks.csv"»'],
      ['Parts', '«p.name», «p.stem», «p.suffix», «p.parent»'],
      ['Test', '«p.exists()», «p.is_file()», «p.is_dir()»'],
      ['List', '«p.iterdir()», «p.glob("*.csv")», «p.rglob("*.py")»'],
      ['Create', '«p.mkdir(parents=True, exist_ok=True)»'],
      ['Read / write quickly', '«p.read_text(encoding="utf-8")», «p.write_text(...)»'],
      ['Rename / move / copy / delete', '«p.rename(new)», «shutil.move», «shutil.copy2», «p.unlink()»']
    ]),
    note('warn', 'Scripts that change files: dry run first')`A loop that renames or deletes files can destroy hours of work in a second. Always add a **dry-run** mode that only *prints* what would happen, test on a copy of the folder, and never delete without a backup. Be extra careful with recursive operations such as «shutil.rmtree».`,
    code('Path manipulation that works in this page')`
      from pathlib import PurePosixPath as Path      # on your computer: from pathlib import Path

      files = ["IMG_2041.JPG", "lecture notes week 3.PDF", "Final_Report_v2_FINAL.docx", "data.csv"]
      for name in files:
          p = Path("downloads") / name
          clean_stem = p.stem.lower().replace(" ", "-").replace("_", "-")
          new = p.with_name(clean_stem + p.suffix.lower())
          print(f"{str(p):<45} -> {new}")
    `,
    section('learn', 'Command-line interfaces with argparse'),
    code('A real CLI tool')`
      import argparse

      parser = argparse.ArgumentParser(prog="grades", description="Summarise a marks file.")
      parser.add_argument("file", help="CSV file with name,mark columns")
      parser.add_argument("--pass-mark", type=int, default=50, help="minimum mark to pass (default 50)")
      parser.add_argument("-v", "--verbose", action="store_true", help="print every student")
      parser.add_argument("--format", choices=["text", "json"], default="text")

      # On your computer this reads the real command line: args = parser.parse_args()
      # e.g.  python grades.py marks.csv --pass-mark 60 -v
      args = parser.parse_args(["marks.csv", "--pass-mark", "60", "-v"])
      print(args)
      print(args.file, args.pass_mark, args.verbose, args.format)
      print(parser.format_usage())
    `,
    p`«argparse» parses the command line, converts types, provides defaults, generates «--help» text automatically and prints clear errors for wrong usage. A dash in an option name becomes an underscore in the attribute («--pass-mark» → «args.pass_mark»).`,
    section('learn', 'Running scripts automatically'),
    ul('**Windows**: Task Scheduler → Create Basic Task → action "Start a program" → «python.exe» with your script path as the argument.',
       '**macOS / Linux**: «crontab -e» and add a line like «30 7 * * 1-5 /path/to/.venv/bin/python /path/to/script.py» (7:30 every weekday).',
       '**In the cloud**: GitHub Actions can run a script on a schedule for free in public repositories.',
       'Log what the script did to a file, so you can check it worked while you were not watching.'),
    note('deep', 'Going deeper · the shell, processes and exit codes')`Every program run from a terminal is a **process** that receives arguments («sys.argv»), environment variables («os.environ») and three streams (stdin, stdout, stderr). When it finishes it returns an **exit code**: 0 for success, anything else for failure («sys.exit(1)»). Shell scripts and CI systems chain programs using these codes, for example «pytest && deploy» only deploys when tests pass. «subprocess.run(["git", "status"], capture_output=True, text=True)» lets Python start and control other programs.`,
    quiz(
      { q: 'Which is the cross-platform way to build a path?', o: ['«"data\\\\marks.csv"»', '«"data/" + "marks.csv"»', '«Path("data") / "marks.csv"»', '«os.path"data"»'], a: 2, why: 'pathlib picks the right separator for the OS.' },
      { q: 'What does «--pass-mark» become as an attribute?', o: ['«args.pass-mark»', '«args.pass_mark»', '«args.passmark»', '«args["pass-mark"]»'], a: 1, why: 'Dashes are converted to underscores.' },
      { q: 'What should a file-renaming script have before being used on real files?', o: ['A GUI', 'A dry-run mode and a test on a copy', 'Type hints', 'A database'], a: 1, why: 'Mistakes in bulk file operations are hard to undo.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Plan a batch rename (dry run)', level: 'medium',
      prompt: `Lecture recordings have messy names. Produce a **dry-run plan** that renames each to «week-NN-topic.mp4» (zero-padded week, lowercase topic with hyphens), keeping the original order. Use a regex to extract the week number and topic.`,
      starter: R`
        import re
        files = ["Week 3 - Loops.MP4", "week10_Classes.mp4", "WEEK 1 - Intro to Python.mp4", "Week 7 - Files and JSON.mp4"]
        `,
      expect: `
        Week 3 - Loops.MP4 -> week-03-loops.mp4
        WEEK 1 - Intro to Python.mp4 -> week-01-intro-to-python.mp4
        week10_Classes.mp4 -> week-10-classes.mp4
        Week 7 - Files and JSON.mp4 -> week-07-files-and-json.mp4`,
      hints: ['Pattern: «r"week\\s*(\\d+)[-\\s_]*(.+)\\.mp4"» with «re.IGNORECASE».', 'Topic: «re.sub(r"[\\s_]+", "-", topic.strip().lower())».'],
      solution: R`
        import re
        files = ["Week 3 - Loops.MP4", "week10_Classes.mp4", "WEEK 1 - Intro to Python.mp4", "Week 7 - Files and JSON.mp4"]
        pattern = re.compile(r"week\s*(\d+)[-\s_]*(.+)\.mp4", re.IGNORECASE)
        plan = []
        for name in files:
            m = pattern.fullmatch(name)
            week, topic = int(m.group(1)), m.group(2)
            new = f"week-{week:02d}-{re.sub(r'[\s_]+', '-', topic.strip().lower())}.mp4"
            plan.append((name, new))
        for old, new in plan:
            print(f"{old} -> {new}")`,
      explain: `Building the full plan before touching any file is what makes a dry run possible: print it, check it, and only then perform the renames. To list the plan by week instead, sort it with «plan.sort(key=lambda pair: pair[1])», since the zero-padded week numbers make the new names sort correctly as text.`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Coursework submission organiser',
      brief: `A lecturer receives submissions named inconsistently, like «10982341_Ama Owusu_assignment2.py» or «assignment2-10977120.PY». Build a command-line tool that validates, renames and organises them into a clean folder structure, with a report. Develop it here with a list of names, then on your computer swap the list for «Path(args.folder).iterdir()» and the prints for real «shutil» moves.`,
      reqs: ['«argparse» options: «folder», «--assignment» (required, e.g. 2), «--dry-run» (flag)', 'Extract the 8-digit student ID with a regex; files without exactly one valid ID go to an «unmatched» list', 'Only «.py» files (any case) are accepted; others go to «rejected»', 'Target name: «A2/10982341.py»; if two files map to the same student, keep the later one in sorted order and report the duplicate', 'Print a final report with counts per category; return exit code 1 if anything needed attention'],
      starter: R`
        import argparse
        import re
        from pathlib import PurePosixPath as Path

        INCOMING = ["10982341_Ama Owusu_assignment2.py", "assignment2-10977120.PY", "notes.docx",
                    "kofi_assignment2.py", "10982341_Ama_assignment2_v2.py", "10955555 and 10966666.py"]
        `,
      solution: R`
        import argparse
        import re
        import sys
        from pathlib import PurePosixPath as Path

        INCOMING = ["10982341_Ama Owusu_assignment2.py", "assignment2-10977120.PY", "notes.docx",
                    "kofi_assignment2.py", "10982341_Ama_assignment2_v2.py", "10955555 and 10966666.py"]
        ID = re.compile(r"(?<!\d)\d{8}(?!\d)")


        def plan(names, assignment):
            moves, unmatched, rejected, duplicates = {}, [], [], []
            for name in sorted(names):
                p = Path(name)
                if p.suffix.lower() != ".py":
                    rejected.append(name)
                    continue
                ids = ID.findall(p.stem)
                if len(ids) != 1:
                    unmatched.append(name)
                    continue
                target = Path(f"A{assignment}") / f"{ids[0]}.py"
                if target in moves:
                    duplicates.append((moves[target], name))
                moves[target] = name
            return moves, unmatched, rejected, duplicates


        def main(argv):
            parser = argparse.ArgumentParser(prog="organise")
            parser.add_argument("folder")
            parser.add_argument("--assignment", type=int, required=True)
            parser.add_argument("--dry-run", action="store_true")
            args = parser.parse_args(argv)

            moves, unmatched, rejected, duplicates = plan(INCOMING, args.assignment)
            verb = "would move" if args.dry_run else "moved"
            for target, source in moves.items():
                print(f"{verb}: {source} -> {target}")
                # real run: shutil.move(Path(args.folder) / source, Path(args.folder) / target)
            for old, new in duplicates:
                print(f"duplicate: kept {new}, replaced {old}")
            print(f"\n{len(moves)} organised, {len(unmatched)} unmatched {unmatched}, "
                  f"{len(rejected)} rejected {rejected}, {len(duplicates)} duplicate(s)")
            return 1 if unmatched or rejected or duplicates else 0


        code = main(["submissions", "--assignment", "2", "--dry-run"])
        print("exit code:", code)
        # on your computer: sys.exit(main(sys.argv[1:]))`,
      explain: `The lookarounds «(?<!\d)» and «(?!\d)» make sure the 8 digits are not part of a longer number. Separating «plan» (pure logic, easy to test) from the part that touches the file system follows the same layered design as lesson 3.8, and makes the dry-run mode trivial. Returning an exit code lets the lecturer chain the tool in scripts.`
    })
  ]
});

/* ------------------------------------------------------------------ 6.4 */
lesson({
  id: 'algorithms', level: 'L6', title: 'Algorithms and complexity in Python', minutes: 75,
  keywords: 'algorithm big o complexity sorting searching bubble merge quick stack queue graph bfs dynamic programming',
  goals: ['Analyse running time with Big-O notation', 'Implement and compare classic sorting algorithms', 'Use stacks, queues, heaps and graphs', 'Solve problems with breadth-first search and dynamic programming', 'Measure performance empirically'],
  body: [
    section('learn', 'Big-O in one table'),
    p`You have met Big-O throughout the course. Here it is in one place. Big-O describes how the number of steps grows as the input size *n* grows, ignoring constant factors. It answers the question: "if I have 10 times more data, how much slower will this be?"`,
    table(['Complexity', 'Name', 'Example', 'n = 1,000 → 1,000,000'], [
      ['O(1)', 'constant', 'dict lookup, list index', 'same time'],
      ['O(log n)', 'logarithmic', 'binary search', '10 → 20 steps'],
      ['O(n)', 'linear', 'one loop, «max()», «x in list»', '1,000× slower'],
      ['O(n log n)', 'linearithmic', '«sorted()», merge sort', '~2,000× slower'],
      ['O(n²)', 'quadratic', 'nested loops over the data, bubble sort', '1,000,000× slower'],
      ['O(2ⁿ)', 'exponential', 'naive Fibonacci, all subsets', 'impossible']
    ]),
    section('learn', 'Sorting: three algorithms'),
    code('Bubble sort, merge sort and quicksort')`
      def bubble_sort(items):
          a = list(items)
          for end in range(len(a) - 1, 0, -1):
              swapped = False
              for i in range(end):
                  if a[i] > a[i + 1]:
                      a[i], a[i + 1] = a[i + 1], a[i]
                      swapped = True
              if not swapped:            # already sorted: stop early
                  break
          return a

      def merge_sort(items):
          if len(items) <= 1:
              return list(items)
          mid = len(items) // 2
          left, right = merge_sort(items[:mid]), merge_sort(items[mid:])
          merged, i, j = [], 0, 0
          while i < len(left) and j < len(right):
              if left[i] <= right[j]:
                  merged.append(left[i]); i += 1
              else:
                  merged.append(right[j]); j += 1
          return merged + left[i:] + right[j:]

      def quick_sort(items):
          if len(items) <= 1:
              return list(items)
          pivot = items[len(items) // 2]
          return (quick_sort([x for x in items if x < pivot])
                  + [x for x in items if x == pivot]
                  + quick_sort([x for x in items if x > pivot]))

      data = [38, 27, 43, 3, 9, 82, 10, 27]
      for sort in (bubble_sort, merge_sort, quick_sort, sorted):
          print(f"{sort.__name__:<12}{sort(data)}")
    `,
    p`**Bubble sort** repeatedly swaps neighbours that are out of order: simple, O(n²). **Merge sort** splits the list in half, sorts each half recursively and merges them: O(n log n) always, and stable. **Quicksort** partitions around a pivot: O(n log n) on average but O(n²) in the worst case. Python's built-in «sorted» (Timsort) is O(n log n), stable, and much faster than anything you write in pure Python, so in real code always use it; implementing these yourself is for understanding.`,
    code('Measuring the difference')`
      import random
      import time

      def bubble_sort(a):
          a = list(a)
          for end in range(len(a) - 1, 0, -1):
              for i in range(end):
                  if a[i] > a[i + 1]:
                      a[i], a[i + 1] = a[i + 1], a[i]
          return a

      def merge_sort(items):
          if len(items) <= 1:
              return list(items)
          mid = len(items) // 2
          left, right = merge_sort(items[:mid]), merge_sort(items[mid:])
          out, i, j = [], 0, 0
          while i < len(left) and j < len(right):
              if left[i] <= right[j]:
                  out.append(left[i]); i += 1
              else:
                  out.append(right[j]); j += 1
          return out + left[i:] + right[j:]

      random.seed(0)
      for n in (250, 500, 1000):
          data = [random.random() for _ in range(n)]
          row = [f"n={n:<5}"]
          for f in (bubble_sort, merge_sort, sorted):
              t0 = time.perf_counter()
              f(data)
              row.append(f"{f.__name__} {1000 * (time.perf_counter() - t0):7.1f} ms")
          print("  ".join(row))
    `,
    p`Watch the bubble sort column: doubling *n* roughly **quadruples** its time (quadratic), while merge sort roughly doubles. Absolute times depend on the machine and on this in-browser interpreter, which is slower than real Python, but the growth pattern is what Big-O predicts.`,
    section('learn', 'Data structures for algorithms'),
    code('Stack, queue, heap')`
      from collections import deque
      import heapq

      # Stack (LIFO): balanced brackets checker
      def balanced(text):
          pairs = {")": "(", "]": "[", "}": "{"}
          stack = []
          for ch in text:
              if ch in "([{":
                  stack.append(ch)
              elif ch in pairs:
                  if not stack or stack.pop() != pairs[ch]:
                      return False
          return not stack

      print(balanced("{[()()]}"), balanced("([)]"), balanced("(("))

      # Queue (FIFO): serve in arrival order
      queue = deque(["Ama", "Kofi"])
      queue.append("Esi")
      print("served:", queue.popleft(), "| waiting:", list(queue))

      # Heap (priority queue): always get the smallest quickly
      tasks = []
      heapq.heappush(tasks, (2, "write report"))
      heapq.heappush(tasks, (1, "fix exam clash"))
      heapq.heappush(tasks, (3, "update website"))
      while tasks:
          print(heapq.heappop(tasks))
    `,
    section('learn', 'Graphs and breadth-first search'),
    code('Shortest route on a campus map')`
      from collections import deque

      campus = {
          "Main Gate": ["Library", "Bus Stop"],
          "Library": ["Main Gate", "Science Block", "Cafeteria"],
          "Bus Stop": ["Main Gate", "Hostel"],
          "Science Block": ["Library", "Lab"],
          "Cafeteria": ["Library", "Hostel"],
          "Hostel": ["Bus Stop", "Cafeteria"],
          "Lab": ["Science Block"],
      }

      def shortest_path(graph, start, goal):
          queue = deque([[start]])
          visited = {start}
          while queue:
              path = queue.popleft()
              node = path[-1]
              if node == goal:
                  return path
              for neighbour in graph[node]:
                  if neighbour not in visited:
                      visited.add(neighbour)
                      queue.append(path + [neighbour])
          return None

      print(" -> ".join(shortest_path(campus, "Hostel", "Lab")))
      print(" -> ".join(shortest_path(campus, "Main Gate", "Cafeteria")))
    `,
    p`**Breadth-first search** (BFS) explores all places one step away, then two steps, and so on, using a queue. The first time it reaches the goal, it has found a path with the fewest steps. With weighted edges (distances) you would use **Dijkstra's algorithm**, which replaces the queue with a heap.`,
    section('learn', 'Dynamic programming'),
    code('Minimum coins for change')`
      def min_coins(amount, coins):
          INF = float("inf")
          best = [0] + [INF] * amount          # best[a] = fewest coins to make a
          choice = [None] * (amount + 1)
          for a in range(1, amount + 1):
              for c in coins:
                  if c <= a and best[a - c] + 1 < best[a]:
                      best[a] = best[a - c] + 1
                      choice[a] = c
          if best[amount] == INF:
              return None
          used, a = [], amount
          while a > 0:
              used.append(choice[a])
              a -= choice[a]
          return used

      print(min_coins(63, [1, 5, 10, 20, 50]))
      print(min_coins(6, [1, 3, 4]))      # greedy would give 4+1+1; optimal is 3+3
      print(min_coins(7, [2, 4]))
    `,
    p`**Dynamic programming** solves a problem by combining answers to smaller subproblems, computing each one once and storing it in a table (here, «best»). The greedy approach "always take the biggest coin" works for most real currencies but fails for coins «[1, 3, 4]»; DP always finds the optimum in O(amount × number of coins).`,
    note('deep', 'Going deeper · P, NP and the limits of computation')`Some problems have no known efficient algorithm at all. The travelling salesperson problem, timetabling with many constraints, and the knapsack problem are **NP-hard**: no polynomial-time algorithm is known, and finding one (or proving none exists) is the **P vs NP** problem, one of the great open questions in mathematics. In practice we use heuristics, approximation algorithms and solvers. Other problems, like deciding whether an arbitrary program halts, are provably **undecidable**: no algorithm can solve them for all inputs (Turing, 1936).`,
    quiz(
      { q: 'An algorithm takes 1 second for n = 1000 and is O(n²). Roughly how long for n = 2000?', o: ['2 s', '4 s', '1 s', '8 s'], a: 1, why: 'Doubling n multiplies n² by 4.' },
      { q: 'Which data structure does BFS use?', o: ['Stack', 'Queue', 'Heap', 'Set only'], a: 1, why: 'First in, first out ensures nodes are explored in order of distance.' },
      { q: 'What does a stack do?', o: ['First in, first out', 'Last in, first out', 'Always returns the smallest item', 'Keeps items sorted'], a: 1, why: 'LIFO, like a stack of plates.' },
      { q: 'Merge sort worst-case complexity?', o: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], a: 1, why: 'It always splits in half and merges in linear time.' },
      { q: 'What makes a problem suitable for dynamic programming?', o: ['It uses strings', 'Overlapping subproblems with optimal substructure', 'It needs a GUI', 'It has no loops'], a: 1, why: 'Sub-answers are reused to build the full answer.' }
    ),
    section('practice', 'Tasks'),
    task({
      title: 'Two-sum in O(n)', level: 'medium',
      prompt: `Given a list of prices and a budget, return the indices of the two items whose prices add up exactly to the budget, using **one pass and a dictionary** (O(n)) instead of nested loops (O(n²)). Return «None» if there is no such pair.`,
      starter: R`
        def two_sum(prices, budget):
            pass

        print(two_sum([45, 12, 80, 33, 67, 20], 100))
        print(two_sum([5, 10, 15], 100))`,
      expect: `
        (3, 4)
        None`,
      hints: ['For each price, the needed partner is «budget - price».', 'Keep a dict «seen» of price → index; check it before adding the current price.'],
      solution: R`
        def two_sum(prices, budget):
            seen = {}
            for i, price in enumerate(prices):
                need = budget - price
                if need in seen:
                    return seen[need], i
                seen[price] = i
            return None

        print(two_sum([45, 12, 80, 33, 67, 20], 100))
        print(two_sum([5, 10, 15], 100))`,
      explain: `The dictionary trades memory for time: O(n) extra space buys an O(n) algorithm instead of O(n²). This exact problem is the most famous coding interview question; the expected answer is this dictionary approach.`
    }),
    task({
      title: 'Longest common subsequence', level: 'hard',
      prompt: `Write «lcs(a, b)» returning the length of the longest common subsequence of two strings (characters in order, not necessarily adjacent) using dynamic programming. LCS underlies «diff» tools and DNA sequence comparison.`,
      starter: R`
        def lcs(a, b):
            pass

        print(lcs("ABCBDAB", "BDCABA"))
        print(lcs("python", "typhoon"))
        print(lcs("", "abc"))`,
      expect: `
        4
        4
        0`,
      hints: ['Make a table «dp» of size «(len(a)+1) × (len(b)+1)» filled with 0.', 'If «a[i-1] == b[j-1]», then «dp[i][j] = dp[i-1][j-1] + 1», else the max of the cell above and the cell to the left.'],
      solution: R`
        def lcs(a, b):
            dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
            for i in range(1, len(a) + 1):
                for j in range(1, len(b) + 1):
                    if a[i - 1] == b[j - 1]:
                        dp[i][j] = dp[i - 1][j - 1] + 1
                    else:
                        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            return dp[len(a)][len(b)]

        print(lcs("ABCBDAB", "BDCABA"))
        print(lcs("python", "typhoon"))
        print(lcs("", "abc"))`
    }),
    section('assignment', 'Assignment'),
    assignment({
      title: 'Algorithm benchmark report',
      brief: `Empirically verify Big-O predictions. Implement linear search and binary search, and insertion sort and merge sort, run them on growing input sizes, and present a table showing how time grows. Then explain the results in a few sentences, as you would in a lab report.`,
      reqs: ['Implement «linear_search», «binary_search» (iterative), «insertion_sort», «merge_sort»', 'Verify correctness first with «assert» against Python\'s built-ins on random data', 'For n = 200, 400, 800, 1600: time each algorithm (searches: 200 lookups each; sorts: one run) with «time.perf_counter»', 'Print a table, plus the ratio between consecutive sizes for each algorithm', 'Print a conclusion comparing observed ratios with the expected ones (≈2 for O(n), ≈1 for O(log n), ≈4 for O(n²), ≈2.2 for O(n log n))'],
      starter: R`
        import random
        import time
        `,
      solution: R`
        import random
        import time


        def linear_search(items, target):
            for i, x in enumerate(items):
                if x == target:
                    return i
            return -1


        def binary_search(items, target):
            lo, hi = 0, len(items) - 1
            while lo <= hi:
                mid = (lo + hi) // 2
                if items[mid] == target:
                    return mid
                if items[mid] < target:
                    lo = mid + 1
                else:
                    hi = mid - 1
            return -1


        def insertion_sort(items):
            a = list(items)
            for i in range(1, len(a)):
                key, j = a[i], i - 1
                while j >= 0 and a[j] > key:
                    a[j + 1] = a[j]
                    j -= 1
                a[j + 1] = key
            return a


        def merge_sort(items):
            if len(items) <= 1:
                return list(items)
            mid = len(items) // 2
            left, right = merge_sort(items[:mid]), merge_sort(items[mid:])
            out, i, j = [], 0, 0
            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    out.append(left[i]); i += 1
                else:
                    out.append(right[j]); j += 1
            return out + left[i:] + right[j:]


        random.seed(42)
        sample = [random.randint(0, 999) for _ in range(300)]
        ordered = sorted(sample)
        assert insertion_sort(sample) == ordered and merge_sort(sample) == ordered
        for t in random.sample(sample, 20):
            assert ordered[binary_search(ordered, t)] == t and sample[linear_search(sample, t)] == t
        print("Correctness checks passed\n")


        def timed(f, *args, repeat=1):
            t0 = time.perf_counter()
            for _ in range(repeat):
                f(*args)
            return (time.perf_counter() - t0) * 1000


        sizes = [200, 400, 800, 1600]
        results = {name: [] for name in ["linear", "binary", "insertion", "merge"]}
        for n in sizes:
            data = [random.random() for _ in range(n)]
            ordered = sorted(data)
            targets = random.sample(data, 50)
            results["linear"].append(sum(timed(linear_search, data, t, repeat=4) for t in targets))
            results["binary"].append(sum(timed(binary_search, ordered, t, repeat=4) for t in targets))
            results["insertion"].append(timed(insertion_sort, data))
            results["merge"].append(timed(merge_sort, data))

        print(f"{'algorithm':<11}" + "".join(f"{'n=' + str(n):>11}" for n in sizes) + "   ratios")
        for name, times in results.items():
            ratios = [times[i + 1] / times[i] if times[i] else 0 for i in range(len(times) - 1)]
            print(f"{name:<11}" + "".join(f"{t:>9.1f}ms" for t in times) + "   " + " ".join(f"{r:.1f}" for r in ratios))

        print("\nExpected ratios when n doubles: linear ~2, binary ~1, insertion ~4, merge ~2.2.")
        print("Small inputs are noisy; the trend becomes clearer as n grows.")`,
      explain: `Timing measurements are noisy (other programs, caching, the interpreter warming up), which is why searches are repeated and why the ratios, not the absolute numbers, are what you analyse. Insertion sort is O(n²) on random data but O(n) on data that is already sorted, a reminder that Big-O usually refers to the worst or average case. Run the solution a few times and note how much the numbers vary; reporting variability is part of an honest experimental write-up.`
    })
  ]
});

/* ------------------------------------------------------------------ 6.5 */
lesson({
  id: 'capstone', level: 'L6', title: 'Capstone: student results management system', minutes: 180,
  keywords: 'capstone final project portfolio oop testing json csv regex cli',
  goals: ['Plan, build, test and document a complete application', 'Combine OOP, files, validation, error handling, generators and testing', 'Produce a portfolio-quality project'],
  body: [
    section('brief', 'The brief'),
    p`Build a **student results management system** for a university department, the kind of tool a faculty administrator could actually use. You have learned everything required. This lesson gives you a specification, a recommended architecture, a working reference core you can run and study, and a marking rubric. Build your own version on your computer as a proper project (lesson 5.6), then put it on GitHub.`,
    section('brief', 'Functional requirements'),
    ol('Import students and courses from CSV files; validate every row (ID format, names, credits) and report rejected rows with reasons.',
       'Record marks for a student in a course; validate the range 0–100; prevent duplicates unless explicitly updated.',
       'Compute each student\'s grades, grade points, semester GPA and cumulative GPA (credit-weighted).',
       'Classify students: First Class (≥ 3.6), Second Upper (≥ 3.0), Second Lower (≥ 2.5), Third (≥ 2.0), Pass (≥ 1.5), Fail.',
       'Produce reports: a transcript for one student, a ranked class list, course statistics (mean, median, pass rate, grade distribution) and a list of students on probation (GPA < 2.0).',
       'Save and load all data as JSON; export reports as CSV.',
       'A command-line interface with «argparse» sub-commands or an interactive menu.',
       'An automated test suite with at least 20 tests.'),
    section('brief', 'Recommended architecture'),
    code('Project layout', { run: false })`
      results-system/
      ├── src/results/
      │   ├── models.py        # Student, Course, Enrolment dataclasses; Grade scale
      │   ├── grading.py       # pure functions: letter grade, GPA, classification
      │   ├── validation.py    # regex validators, custom exceptions
      │   ├── repository.py    # Department class: holds data, enforces rules
      │   ├── storage.py       # JSON load/save, CSV import/export
      │   ├── reports.py       # transcript, rankings, course statistics
      │   └── cli.py           # argparse / menu: the only module that prints/inputs
      ├── tests/
      │   ├── test_grading.py
      │   ├── test_validation.py
      │   └── test_repository.py
      ├── data/sample_students.csv
      ├── pyproject.toml
      └── README.md
    `,
    section('reference', 'Reference core (runnable)'),
    p`Here is a compact, working version of the core logic in one file so you can run and study it. Your project should split it into the modules above, add persistence and a full CLI, and include proper tests.`,
    code('Results system core')`
      import csv
      import io
      import re
      import statistics
      from dataclasses import dataclass, field

      # ---------- validation ----------
      class ValidationError(ValueError):
          pass

      ID_RE = re.compile(r"\d{8}")
      CODE_RE = re.compile(r"[A-Z]{4}\d{3}")

      def check_id(sid):
          if not ID_RE.fullmatch(sid):
              raise ValidationError(f"student ID must be 8 digits: {sid!r}")
          return sid

      # ---------- grading (pure functions) ----------
      SCALE = [(80, "A", 4.0), (75, "B+", 3.5), (70, "B", 3.0), (65, "C+", 2.5),
               (60, "C", 2.0), (55, "D+", 1.5), (50, "D", 1.0), (0, "F", 0.0)]
      CLASSES = [(3.6, "First Class"), (3.0, "Second Class Upper"), (2.5, "Second Class Lower"),
                 (2.0, "Third Class"), (1.5, "Pass"), (0.0, "Fail")]

      def grade(mark):
          for minimum, letter, point in SCALE:
              if mark >= minimum:
                  return letter, point

      def classify(gpa):
          return next(name for minimum, name in CLASSES if gpa >= minimum)

      # ---------- models ----------
      @dataclass
      class Course:
          code: str
          title: str
          credits: int

      @dataclass
      class Student:
          sid: str
          name: str
          marks: dict = field(default_factory=dict)      # course code -> mark

      # ---------- repository ----------
      class Department:
          def __init__(self):
              self.students, self.courses = {}, {}

          def import_students(self, csv_text):
              rejected = []
              for n, row in enumerate(csv.DictReader(io.StringIO(csv_text)), start=2):
                  try:
                      sid = check_id(row["id"].strip())
                      name = row["name"].strip()
                      if not name:
                          raise ValidationError("name is empty")
                      if sid in self.students:
                          raise ValidationError(f"duplicate ID {sid}")
                      self.students[sid] = Student(sid, name.title())
                  except ValidationError as e:
                      rejected.append(f"line {n}: {e}")
              return rejected

          def add_course(self, code, title, credits):
              if not CODE_RE.fullmatch(code):
                  raise ValidationError(f"bad course code {code!r}")
              self.courses[code] = Course(code, title, credits)

          def record(self, sid, code, mark):
              if code not in self.courses:
                  raise ValidationError(f"unknown course {code}")
              if not 0 <= mark <= 100:
                  raise ValidationError(f"mark out of range: {mark}")
              self.students[sid].marks[code] = mark

          def gpa(self, student):
              total_credits = sum(self.courses[c].credits for c in student.marks)
              if total_credits == 0:
                  return 0.0
              points = sum(grade(m)[1] * self.courses[c].credits for c, m in student.marks.items())
              return round(points / total_credits, 2)

          def ranked(self):
              return sorted(self.students.values(), key=lambda s: (-self.gpa(s), s.name))

          def course_stats(self, code):
              marks = [s.marks[code] for s in self.students.values() if code in s.marks]
              dist = {}
              for m in marks:
                  dist[grade(m)[0]] = dist.get(grade(m)[0], 0) + 1
              return {"n": len(marks), "mean": round(statistics.mean(marks), 1),
                      "median": statistics.median(marks),
                      "pass_rate": round(100 * sum(m >= 50 for m in marks) / len(marks), 1),
                      "grades": dict(sorted(dist.items()))}

          def transcript(self, sid):
              s = self.students[sid]
              lines = [f"TRANSCRIPT  {s.name} ({s.sid})"]
              for code, mark in sorted(s.marks.items()):
                  c = self.courses[code]
                  letter, point = grade(mark)
                  lines.append(f"  {code}  {c.title:<24}{c.credits:>2} cr  {mark:>5.1f}  {letter:<2} {point}")
              g = self.gpa(s)
              lines.append(f"  GPA {g}  -  {classify(g)}")
              return "\n".join(lines)

      # ---------- demo ----------
      dept = Department()
      bad = dept.import_students("""id,name
      10982341,ama owusu
      10977120,kofi mensah
      1234,broken id
      10955501,esi boateng
      10982341,duplicate ama
      10966002,
      """)
      print("Rejected rows:", *bad, sep="\n  ")
      for code, title, cr in [("CSCD101", "Intro to Programming", 3), ("MATH121", "Calculus I", 3),
                              ("STAT111", "Statistics", 2)]:
          dept.add_course(code, title, cr)
      marks = {"10982341": [88, 76, 69], "10977120": [54, 47, 71], "10955501": [92, 85, 80]}
      for sid, values in marks.items():
          for code, m in zip(["CSCD101", "MATH121", "STAT111"], values):
              dept.record(sid, code, m)

      print()
      print(dept.transcript("10982341"))
      print("\nClass ranking:")
      for rank, s in enumerate(dept.ranked(), start=1):
          print(f"  {rank}. {s.name:<12} {dept.gpa(s):.2f}  {classify(dept.gpa(s))}")
      print("\nMATH121:", dept.course_stats("MATH121"))
      try:
          dept.record("10977120", "PHYS999", 70)
      except ValidationError as e:
          print("\nError:", e)
    `,
    p`Study how the pieces fit: validation raises a specific exception type, the importer collects errors with line numbers instead of stopping at the first bad row, grading is pure functions over a data table, and every report is built from the same «gpa» and «grade» functions, so the numbers can never disagree.`,
    section('rubric', 'Marking rubric (100 marks)'),
    table(['Criterion', 'Marks', 'Excellent work'], [
      ['Functionality', '30', 'All 8 requirements work correctly, including edge cases'],
      ['Design', '20', 'Clear modules with single responsibilities; logic separated from I/O; sensible classes'],
      ['Validation & errors', '15', 'Every input validated; precise messages; program never crashes on bad data'],
      ['Testing', '15', '20+ meaningful tests incl. boundaries and failure paths; all pass'],
      ['Code quality', '10', 'PEP 8, descriptive names, docstrings, type hints, linter clean'],
      ['Documentation & git', '10', 'README with setup/usage/examples; regular, meaningful commits']
    ]),
    section('practice', 'Warm-up tasks'),
    task({
      title: 'Cumulative GPA across semesters', level: 'medium',
      prompt: `A transcript has several semesters, each a list of «(credits, grade_point)». Print each semester GPA and the cumulative GPA (credit-weighted over everything so far), all to 2 decimals.`,
      starter: R`
        semesters = {
            "Year 1 Sem 1": [(3, 4.0), (3, 3.5), (2, 3.0)],
            "Year 1 Sem 2": [(3, 2.5), (3, 3.0), (3, 4.0)],
            "Year 2 Sem 1": [(4, 3.5), (3, 3.5)],
        }
        `,
      expect: `
        Year 1 Sem 1: semester 3.56, cumulative 3.56
        Year 1 Sem 2: semester 3.17, cumulative 3.35
        Year 2 Sem 1: semester 3.50, cumulative 3.40`,
      hints: ['Keep running totals of credits and credit × points across semesters.'],
      solution: R`
        semesters = {
            "Year 1 Sem 1": [(3, 4.0), (3, 3.5), (2, 3.0)],
            "Year 1 Sem 2": [(3, 2.5), (3, 3.0), (3, 4.0)],
            "Year 2 Sem 1": [(4, 3.5), (3, 3.5)],
        }
        total_credits = total_points = 0
        for name, courses in semesters.items():
            credits = sum(c for c, _ in courses)
            points = sum(c * p for c, p in courses)
            total_credits += credits
            total_points += points
            print(f"{name}: semester {points / credits:.2f}, cumulative {total_points / total_credits:.2f}")`,
      explain: `Note that the cumulative GPA is **not** the average of the semester GPAs: semesters with more credits weigh more. (3.56 + 3.17 + 3.50) / 3 = 3.41, but the correct credit-weighted value is 3.40.`
    }),
    section('assignment', 'Capstone assignment'),
    assignment({
      title: 'Build and publish your results management system',
      brief: `Implement the full system described above on your computer as a structured, tested, documented project, and publish it to GitHub as a portfolio piece. Use the reference core as a starting point, not the finished product. Mark yourself against the rubric before you call it finished.`,
      reqs: ['Project structure as in the recommended architecture, in a virtual environment, under git', 'All 8 functional requirements implemented', 'Data persists between runs (JSON) and reports export to CSV', 'At least 20 passing tests (pytest or unittest), including failure paths', 'README with screenshots or example terminal output, and setup instructions', 'Code is formatted and linted; every public function has a docstring and type hints', 'Pushed to a public GitHub repository with at least 10 meaningful commits'],
      run: false,
      starter: R`
        # cli.py (sketch)
        import argparse

        def main(argv=None):
            parser = argparse.ArgumentParser(prog="results")
            sub = parser.add_subparsers(dest="command", required=True)
            sub.add_parser("import").add_argument("csv_file")
            t = sub.add_parser("transcript"); t.add_argument("student_id")
            sub.add_parser("ranking")
            c = sub.add_parser("course"); c.add_argument("code")
            args = parser.parse_args(argv)
            ...
        `,
      solution: R`
        # A capstone has many valid solutions. Use the reference core above for the
        # logic, and check your project against this list before submitting:
        #
        # [ ] python -m venv .venv && pip install -e . && results --help   works on a fresh machine
        # [ ] results import data/sample_students.csv   reports rejected rows with line numbers
        # [ ] results transcript 10982341   matches a hand calculation of the GPA
        # [ ] results ranking / results course MATH121 / results probation   all work
        # [ ] restarting the program keeps all data (JSON)
        # [ ] pytest   -> 20+ passed, including boundary marks 49.99/50/79.99/80
        # [ ] ruff check . && ruff format --check .   clean
        # [ ] README explains what, why, install, usage, design, and known limitations
        # [ ] git log shows small commits with clear messages`,
      explain: `Employers and admissions panels look at GitHub projects. What impresses them is not size but evidence of good habits: a README that explains decisions, tests, clean commits, and code another person can run in five minutes. A finished, well-documented project is worth more than an ambitious unfinished one.`
    })
  ]
});

/* ------------------------------------------------------------------ 6.6 */
lesson({
  id: 'next-steps', level: 'L6', title: 'Where to go next', minutes: 30,
  keywords: 'career path web development django flask fastapi data science machine learning automation devops resources portfolio',
  goals: ['Compare the main Python career paths', 'Choose the libraries to learn next for your path', 'Build a portfolio and keep practising effectively'],
  body: [
    section('learn', 'You finished the roadmap'),
    p`You started from «print("Hello, world!")» and now know variables, control flow, data structures, functions, recursion, files, OOP, generators, decorators, testing, regular expressions, APIs, data analysis and core algorithms. That is the complete foundation of professional Python. From here, depth comes from **specialising** and from **building real projects**.`,
    section('paths', 'Choose a path'),
    table(['Path', 'Learn next', 'First project idea'], [
      ['**Web back-end**', 'HTTP, SQL & databases (PostgreSQL), **Django** or **FastAPI**/**Flask**, authentication, deployment', 'A course-registration web app with login and a REST API'],
      ['**Data science / analytics**', 'pandas, NumPy, **Matplotlib**/seaborn, statistics, SQL, Jupyter', 'Analyse a public dataset from your country and publish the notebook'],
      ['**Machine learning / AI**', 'Linear algebra, probability, **scikit-learn**, then **PyTorch**; calling LLM APIs', 'Predict exam outcomes from study data; build a document Q&A tool'],
      ['**Automation / DevOps**', 'Bash, Linux, git, Docker, CI/CD (GitHub Actions), cloud basics', 'A script that backs up and reports on your files every night'],
      ['**Scientific computing / engineering**', 'NumPy, SciPy, SymPy, Matplotlib, numerical methods', 'Simulate projectile motion or a circuit; fit a model to lab data'],
      ['**Cybersecurity**', 'Networking, Linux, «socket», «scapy», cryptography basics, CTF challenges', 'A log analyser that flags suspicious login patterns']
    ]),
    section('learn', 'How to keep improving'),
    ul('**Build, do not only watch.** Each new concept should end in something you made. Tutorials give recognition; projects give skill.',
       '**Practise problem-solving** regularly on sites such as Exercism (with mentor feedback), Advent of Code (every December), HackerRank or LeetCode (for interview preparation).',
       '**Read good code.** Browse the source of the standard library or small open-source projects; notice how experienced programmers structure things.',
       '**Contribute to open source.** Start with documentation fixes or issues labelled "good first issue".',
       '**Learn your tools.** Your editor\'s debugger (breakpoints, stepping) will save you countless hours over print statements.',
       '**Teach.** Explaining a concept to a classmate, or writing a short blog post, reveals what you do not yet fully understand.'),
    section('learn', 'Recommended free resources'),
    table(['Resource', 'Good for'], [
      ['docs.python.org (the official tutorial and library reference)', 'the definitive reference; learn to read it'],
      ['"Automate the Boring Stuff with Python" (free online)', 'practical automation projects'],
      ['"Think Python" by Allen Downey (free online)', 'a CS-oriented second pass through the fundamentals'],
      ['CS50P (Harvard, free on edX)', 'video lectures and problem sets'],
      ['Real Python (realpython.com)', 'in-depth tutorials on specific topics'],
      ['"Fluent Python" by Luciano Ramalho', 'deep understanding once you are comfortable (advanced)']
    ]),
    note('tip', 'Your portfolio checklist')`By the end of your next semester, aim to have on GitHub: (1) the capstone from lesson 6.5; (2) one project in your chosen path; (3) one small tool that solves a real problem for you or your classmates. Pin them to your profile, give each a clear README, and link your GitHub on your CV and LinkedIn.`,
    quiz(
      { q: 'Which combination fits web back-end development?', o: ['pandas + Matplotlib', 'Django or FastAPI + SQL databases', 'PyTorch + CUDA', 'SymPy + SciPy'], a: 1, why: 'Web frameworks plus databases are the core of back-end work.' },
      { q: 'What is the most effective way to turn knowledge into skill?', o: ['Watching more tutorials', 'Building projects and solving problems', 'Memorising syntax', 'Reading only'], a: 1, why: 'Active practice builds real skill.' }
    ),
    section('practice', 'Final task'),
    task({
      title: 'Your learning plan', level: 'reflection',
      prompt: `Write a small program that stores your own plan for the next 8 weeks as data and prints it neatly: your chosen path, 3 skills to learn, 1 project, and a weekly schedule. Edit the values to make it yours, then run it. Printing your plan is the easy part; following it is the real assignment.`,
      starter: R`
        plan = {
            "path": "Data science",
            "skills": ["pandas", "SQL", "statistics"],
            "project": "Analyse national exam results by region",
            "weekly_hours": 6,
        }
        weeks = [
            "Revise Level 2 and 3, install Jupyter",
            "pandas basics: load, filter, group",
            "SQL fundamentals with SQLite",
            "Statistics: distributions and correlation",
            "Find and clean the project dataset",
            "Analysis and charts",
            "Write up findings in the notebook",
            "Publish on GitHub, share for feedback",
        ]
        `,
      solution: R`
        plan = {
            "path": "Data science",
            "skills": ["pandas", "SQL", "statistics"],
            "project": "Analyse national exam results by region",
            "weekly_hours": 6,
        }
        weeks = [
            "Revise Level 2 and 3, install Jupyter",
            "pandas basics: load, filter, group",
            "SQL fundamentals with SQLite",
            "Statistics: distributions and correlation",
            "Find and clean the project dataset",
            "Analysis and charts",
            "Write up findings in the notebook",
            "Publish on GitHub, share for feedback",
        ]

        print(f"My path: {plan['path']} ({plan['weekly_hours']} hours/week, {plan['weekly_hours'] * len(weeks)} hours total)")
        print("Skills:", ", ".join(plan["skills"]))
        print("Project:", plan["project"])
        for number, goal in enumerate(weeks, start=1):
            print(f"  Week {number}: {goal}")
        print("Start date: today.")`
    })
  ]
});
