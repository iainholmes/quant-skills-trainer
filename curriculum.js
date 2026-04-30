// curriculum.js — Quant Skills Trainer content
// All lesson and exercise content is hardcoded here.
// API is used only for code feedback in the Practice tab.

const CURRICULUM = {
  python: [
    { tier: "Foundations", modules: [
      {
        id: "py_env",
        title: "Environment & project setup",
        desc: "venv, pip, Jupyter, folder layout",
        lesson: `<h3>Overview</h3>
<p>A reproducible Python environment is the foundation of credible quantitative work. In consulting, your code must run identically on your machine, a colleague's machine, and months later — so environment discipline is non-negotiable.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Virtual environments</strong> isolate project dependencies so package versions don't conflict across projects.</li>
<li><strong>pip</strong> is Python's package installer; always install inside an activated venv, never globally.</li>
<li><strong>requirements.txt</strong> records exact package versions for reproducibility.</li>
<li><strong>Jupyter notebooks</strong> are ideal for exploratory analysis; <code>.py</code> scripts for reusable code.</li>
<li><strong>Project structure</strong>: keep <code>data/</code>, <code>notebooks/</code>, <code>src/</code>, and <code>outputs/</code> separate from day one.</li>
</ul>
<h3>Worked example</h3>
<pre># Terminal — create and activate a virtual environment
python -m venv econ_env
source econ_env/bin/activate        # Mac/Linux
# econ_env\\Scripts\\activate        # Windows

pip install numpy pandas statsmodels linearmodels matplotlib seaborn jupyter
pip freeze > requirements.txt
jupyter notebook</pre>
<p>Recommended project layout:</p>
<pre>my_project/
├── data/
│   ├── raw/          # never modify raw data
│   └── processed/
├── notebooks/
├── src/
├── outputs/
└── requirements.txt</pre>
<div class="watchout"><strong>Watch out:</strong> Never use <code>sudo pip install</code> or install globally. Always activate your venv first. If packages are installing to system Python, something is wrong.</div>`,
        exercise: `<h3>Exercise — Environment setup</h3>
<p><strong>Scenario:</strong> You're starting a new consulting project on US wage determinants. Set up a clean, reproducible environment.</p>
<h3>Tasks</h3>
<ul>
<li><strong>1.</strong> Create a virtual environment called <code>wage_project</code> and activate it.</li>
<li><strong>2.</strong> Install: <code>numpy</code>, <code>pandas</code>, <code>statsmodels</code>, <code>matplotlib</code>, <code>jupyter</code>.</li>
<li><strong>3.</strong> Create a <code>requirements.txt</code> from your installed packages.</li>
<li><strong>4.</strong> Write a Python script that creates the folders <code>data/raw</code>, <code>data/processed</code>, <code>notebooks</code>, <code>outputs</code> using <code>os.makedirs</code>, then prints each path and confirms it exists.</li>
</ul>
<p><strong>Expected output:</strong> Terminal commands for steps 1–3; a Python script for step 4 that prints e.g. <code>data/raw — exists: True</code> for each folder.</p>`
      },
      {
        id: "py_types",
        title: "Data types, structures & functions",
        desc: "lists, dicts, loops, comprehensions",
        lesson: `<h3>Overview</h3>
<p>Before you touch a DataFrame, you need fluency in Python's core structures. Economic data manipulation — constructing instruments, reshaping panels, applying transformations — all reduces to list and dictionary operations under the hood.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Lists</strong> are ordered, mutable sequences — use for sequences of observations or variable names.</li>
<li><strong>Dictionaries</strong> are key-value stores — ideal for mapping variable labels, parameter grids, or results.</li>
<li><strong>List comprehensions</strong> replace loops for concise data transformations.</li>
<li><strong>Functions</strong> should do one thing; use <code>def</code> with clear docstrings for any logic you'll reuse.</li>
<li><strong>f-strings</strong> are the modern way to format output — essential for readable printed summaries.</li>
</ul>
<h3>Worked example</h3>
<pre>gdp = [21.4, 20.9, 21.7, 23.0, 25.5]   # USD trillions
years = list(range(2019, 2024))

growth = [(gdp[i] - gdp[i-1]) / gdp[i-1] * 100
          for i in range(1, len(gdp))]

results = dict(zip(years[1:], growth))

def summarize(data: dict, label: str) -> None:
    """Print mean and range of a year-keyed dict."""
    vals = list(data.values())
    print(f"{label}: mean={sum(vals)/len(vals):.2f}%, "
          f"range=[{min(vals):.2f}, {max(vals):.2f}]")

summarize(results, "GDP growth")</pre>
<div class="watchout"><strong>Watch out:</strong> Mutable default arguments are a classic Python trap. Never write <code>def f(x, results=[])</code> — the list persists across calls. Use <code>None</code> as default and initialize inside.</div>`,
        exercise: `<h3>Exercise — Data structures</h3>
<p><strong>Scenario:</strong> You have quarterly unemployment rates for three US regions. Compute basic statistics using only core Python — no NumPy or pandas yet.</p>
<pre>data = {
    "Northeast": [4.1, 4.3, 3.9, 4.0, 4.2, 4.5, 4.3, 4.1],
    "Midwest":   [3.8, 4.0, 3.7, 3.9, 4.1, 4.4, 4.2, 3.9],
    "South":     [4.5, 4.6, 4.4, 4.3, 4.5, 4.7, 4.6, 4.4],
}</pre>
<ul>
<li><strong>1.</strong> Write <code>region_stats(rates)</code> returning a dict with <code>mean</code>, <code>min</code>, <code>max</code>, <code>std</code> (compute std manually).</li>
<li><strong>2.</strong> Apply it to each region using a dict comprehension.</li>
<li><strong>3.</strong> Print a formatted table: region name, mean, std — aligned with f-strings.</li>
<li><strong>4.</strong> Find which region had the highest single-quarter unemployment and in which quarter index.</li>
</ul>
<p><strong>Expected output:</strong> A printed table with region stats and a line identifying the peak unemployment region and quarter index.</p>`
      },
      {
        id: "py_numpy",
        title: "NumPy fundamentals",
        desc: "arrays, broadcasting, linear algebra",
        lesson: `<h3>Overview</h3>
<p>NumPy is the computational backbone of Python's scientific stack. Econometric estimators — OLS, GLS, GMM — are matrix operations at their core. Understanding NumPy array mechanics makes you a much more effective user of statsmodels and linearmodels.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>ndarray</strong>: NumPy's core object — fixed-type, operates in C under the hood.</li>
<li><strong>Broadcasting</strong>: arrays of different shapes operate together without loops.</li>
<li><strong>Vectorization</strong>: always prefer array operations over Python loops.</li>
<li><strong><code>np.linalg</code></strong>: matrix operations central to econometrics — <code>solve</code>, <code>inv</code>, <code>lstsq</code>, <code>eig</code>.</li>
<li><strong>Random seeds</strong>: always set <code>np.random.seed()</code> for reproducible simulations.</li>
</ul>
<h3>Worked example — OLS by hand</h3>
<pre>import numpy as np
np.random.seed(42)

n = 200
X = np.column_stack([
    np.ones(n),
    np.random.uniform(8, 20, n),    # education
    np.random.uniform(0, 40, n),    # experience
])
beta_true = np.array([2.0, 0.8, 0.05])
y = X @ beta_true + np.random.normal(0, 1, n)

# beta_hat = (X'X)^{-1} X'y
beta_hat = np.linalg.solve(X.T @ X, X.T @ y)
print("True:     ", beta_true)
print("Estimated:", np.round(beta_hat, 4))</pre>
<div class="watchout"><strong>Watch out:</strong> Use <code>np.linalg.solve(A, b)</code> instead of <code>np.linalg.inv(A) @ b</code> — numerically more stable. Inverting matrices explicitly is rarely correct in applied work.</div>`,
        exercise: `<h3>Exercise — NumPy matrix operations</h3>
<p><strong>Scenario:</strong> Simulate a labor economics dataset and compute OLS manually using matrix algebra.</p>
<pre>import numpy as np
np.random.seed(99)
n = 300</pre>
<ul>
<li><strong>1.</strong> Generate: <code>educ ~ Uniform(8,18)</code>, <code>exper ~ Uniform(0,35)</code>, <code>female ~ Bernoulli(0.5)</code>. Stack with a constant column into design matrix <code>X</code>.</li>
<li><strong>2.</strong> Set true betas <code>[1.5, 0.10, 0.03, -0.15]</code> and generate <code>y = X @ beta + N(0, 0.5)</code>.</li>
<li><strong>3.</strong> Compute <code>beta_hat</code> via <code>np.linalg.solve</code>. Print estimated vs true coefficients.</li>
<li><strong>4.</strong> Compute residuals, then R² = 1 − SS_res/SS_tot. Print it.</li>
</ul>
<p><strong>Expected output:</strong> Coefficient estimates close to <code>[1.5, 0.10, 0.03, -0.15]</code> and R² in the range 0.25–0.45.</p>`
      },
      {
        id: "py_pd1",
        title: "Pandas — loading & inspection",
        desc: "DataFrames, dtypes, describe, missings",
        lesson: `<h3>Overview</h3>
<p>Before running a single regression, you must understand your dataset's structure, coverage, and quirks. Skipping this step is the most common source of incorrect empirical results.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>DataFrame</strong>: 2D labeled table; <strong>Series</strong>: single column — both share an index.</li>
<li><strong>dtypes</strong>: always check numeric columns aren't stored as <code>object</code> — a silent killer of regression results.</li>
<li><strong><code>df.info()</code></strong>: shape, dtype, non-null counts. <strong><code>df.describe()</code></strong>: distributional summary.</li>
<li><strong><code>pd.read_stata()</code></strong>: reads <code>.dta</code> files directly — useful for Stata datasets from economic journals.</li>
<li><strong>Index alignment</strong>: pandas aligns on index — understand this before merging or computing differences.</li>
</ul>
<h3>Worked example</h3>
<pre>import pandas as pd
import numpy as np
np.random.seed(1)

n = 500
df = pd.DataFrame({
    "wage":   np.random.lognormal(2.8, 0.4, n),
    "educ":   np.random.randint(8, 20, n),
    "exper":  np.random.randint(0, 40, n),
    "female": np.random.binomial(1, 0.48, n),
    "region": np.random.choice(["NE","MW","S","W"], n),
})
df.loc[df.sample(20).index, "wage"] = np.nan

print(df.info())
print(df.describe())
print("\\nMissing:\\n", df.isnull().sum())
print("\\nRegions:\\n", df["region"].value_counts())</pre>
<div class="watchout"><strong>Watch out:</strong> <code>df["wage"].mean()</code> silently skips NaN — so a mean computed on data with missing wages is already on a selected sample. Always inspect missingness patterns before computing statistics.</div>`,
        exercise: `<h3>Exercise — Data inspection</h3>
<p><strong>Scenario:</strong> You receive a county-level economic dataset. Your first task is understanding what you actually have.</p>
<pre>import pandas as pd
import numpy as np
np.random.seed(7)

n = 400
df = pd.DataFrame({
    "county_id":   range(1, n+1),
    "state":       np.random.choice(["CA","TX","NY","FL","IL"], n),
    "unemp_rate":  np.random.uniform(2.5, 12.0, n).round(1),
    "med_income":  np.random.lognormal(10.8, 0.3, n).round(0),
    "pop_density": np.random.exponential(200, n).round(1),
    "year":        np.random.choice([2019,2020,2021,2022], n),
})
df.loc[df.sample(30, random_state=1).index, "unemp_rate"] = np.nan
df["med_income"] = df["med_income"].astype(str)  # intentionally broken</pre>
<ul>
<li><strong>1.</strong> Run <code>info()</code> and <code>describe()</code>. Identify the dtype problem and fix it.</li>
<li><strong>2.</strong> Report total rows, missing counts per column, and % missing for <code>unemp_rate</code>.</li>
<li><strong>3.</strong> Compute mean unemployment by state.</li>
<li><strong>4.</strong> Find the county with the highest population density — report its state and unemployment rate.</li>
</ul>
<p><strong>Expected output:</strong> Fixed dtypes, a missing value report, a state-level mean table, and the max-density county's details.</p>`
      },
      {
        id: "py_pd2",
        title: "Pandas — cleaning & reshaping",
        desc: "merge, melt, pivot, groupby",
        lesson: `<h3>Overview</h3>
<p>In consulting, raw data is almost never analysis-ready. You'll spend the majority of your time cleaning: handling missings, merging datasets, constructing variables, and reshaping between wide and long formats.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>merge</strong>: SQL-style joins — always specify <code>how</code> and <code>validate</code>; use <code>indicator=True</code> to diagnose merge quality.</li>
<li><strong>melt</strong>: wide → long (panel format); <strong>pivot_table</strong>: long → wide.</li>
<li><strong>groupby</strong>: split-apply-combine — the workhorse of panel summary statistics.</li>
<li><strong>apply / map</strong>: row or element-wise transformations; prefer vectorized operations when possible.</li>
<li><strong>fillna strategies</strong>: forward fill, group mean fill, or explicit missingness indicator — the choice has empirical implications.</li>
</ul>
<h3>Worked example</h3>
<pre>import pandas as pd, numpy as np
np.random.seed(3)

persons = pd.DataFrame({
    "pid":    range(1, 201),
    "region": np.random.choice(["NE","MW","S","W"], 200),
    "wage":   np.random.lognormal(3.0, 0.4, 200),
})
regions = pd.DataFrame({
    "region":     ["NE","MW","S","W"],
    "cost_index": [1.25, 1.00, 0.90, 1.15],
})

# Merge and validate
df = persons.merge(regions, on="region", how="left", validate="m:1")
df["real_wage"] = df["wage"] / df["cost_index"]

# Wide → long
df["wage_t2"] = df["wage"] * np.random.uniform(1.0, 1.1, 200)
long = df[["pid","wage","wage_t2"]].melt(
    id_vars="pid", var_name="period", value_name="wage_obs"
)
print(long.head())</pre>
<div class="watchout"><strong>Watch out:</strong> Always check <code>len()</code> before and after a merge. A left join that produces more rows than the left dataset means many-to-many matching — this will corrupt your panel structure silently.</div>`,
        exercise: `<h3>Exercise — Cleaning & reshaping</h3>
<p><strong>Scenario:</strong> You have wide-format GDP data (one column per year) and a separate country metadata file. Clean, merge, and reshape for panel analysis.</p>
<pre>import pandas as pd, numpy as np
np.random.seed(5)

countries = ['USA','GBR','DEU','FRA','JPN','CAN','AUS','KOR']
gdp_wide = pd.DataFrame({
    'country': countries,
    '2018': np.random.uniform(1.0, 22.0, 8).round(2),
    '2019': np.random.uniform(1.0, 22.0, 8).round(2),
    '2020': np.random.uniform(0.8, 21.0, 8).round(2),
    '2021': np.random.uniform(1.0, 23.0, 8).round(2),
    '2022': np.random.uniform(1.2, 25.0, 8).round(2),
})
gdp_wide.loc[2, '2020'] = np.nan

meta = pd.DataFrame({
    'country': countries,
    'region':  ['Americas','Europe','Europe','Europe',
                'Asia','Americas','Oceania','Asia'],
})</pre>
<ul>
<li><strong>1.</strong> Melt <code>gdp_wide</code> to long format: columns <code>country</code>, <code>year</code>, <code>gdp</code>.</li>
<li><strong>2.</strong> Merge with <code>meta</code> on <code>country</code>, validating many-to-one.</li>
<li><strong>3.</strong> Fill the missing GDP value with that country's mean across other years.</li>
<li><strong>4.</strong> Compute mean GDP by region and year. Pivot to a wide table (regions as rows, years as columns).</li>
</ul>
<p><strong>Expected output:</strong> Clean long panel with no missings; a region × year pivot of mean GDP.</p>`
      },
    ]},
    { tier: "Core Econometrics", modules: [
      {
        id: "py_ols",
        title: "OLS regression with statsmodels",
        desc: "formula API, robust SEs, interpretation",
        lesson: `<h3>Overview</h3>
<p>OLS is the workhorse of applied econometrics. Before reaching for IV or panel methods, you should be completely fluent with OLS specification, estimation, and output interpretation in Python.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Formula API</strong>: <code>smf.ols("y ~ x1 + x2", data=df)</code> — readable, handles categoricals with <code>C()</code>.</li>
<li><strong>Robust SEs</strong>: always use <code>cov_type='HC3'</code> in applied work.</li>
<li><strong>Clustered SEs</strong>: <code>cov_type='cluster', cov_kwds={'groups': df['group']}</code>.</li>
<li><strong>Reading output</strong>: coefficient, std error, t-stat, p-value, confidence interval.</li>
<li><strong>Adjusted R²</strong> penalizes for extra regressors — use for model comparison.</li>
</ul>
<h3>Worked example</h3>
<pre>import pandas as pd, numpy as np
import statsmodels.formula.api as smf
np.random.seed(42)

n = 500
df = pd.DataFrame({
    "educ":   np.random.randint(8, 20, n),
    "exper":  np.random.randint(0, 40, n),
    "female": np.random.binomial(1, 0.48, n),
    "region": np.random.choice(["NE","MW","S","W"], n),
})
df["lwage"] = (1.2 + 0.09*df["educ"] + 0.03*df["exper"]
               - 0.18*df["female"] + np.random.normal(0, 0.4, n))

model = smf.ols(
    "lwage ~ educ + exper + female + C(region)", data=df
).fit(cov_type="HC3")
print(model.summary())</pre>
<div class="watchout"><strong>Watch out:</strong> The default <code>.fit()</code> uses non-robust standard errors. In virtually all economic applications, use HC3 or cluster-robust SEs. The difference can be substantial in practice.</div>`,
        exercise: `<h3>Exercise — OLS regression</h3>
<p><strong>Scenario:</strong> Estimate a Mincer earnings equation using simulated CPS-style data.</p>
<pre>import pandas as pd, numpy as np
import statsmodels.formula.api as smf
np.random.seed(21)

n = 800
df = pd.DataFrame({
    "educ":   np.random.randint(8, 20, n),
    "exper":  np.random.randint(0, 42, n),
    "female": np.random.binomial(1, 0.50, n),
    "union":  np.random.binomial(1, 0.14, n),
    "sector": np.random.choice(["mfg","services","govt","retail"], n),
})
df["exper2"] = df["exper"]**2
df["lwage"] = (0.8 + 0.11*df["educ"] + 0.04*df["exper"]
               - 0.0005*df["exper2"] + 0.15*df["union"]
               - 0.20*df["female"] + np.random.normal(0, 0.45, n))</pre>
<ul>
<li><strong>1.</strong> Run OLS of <code>lwage</code> on <code>educ</code>, <code>exper</code>, <code>exper2</code>, <code>female</code>, <code>union</code>, sector dummies. Use HC3 SEs.</li>
<li><strong>2.</strong> Print the summary. Which coefficient is largest in magnitude? Which is insignificant at 5%?</li>
<li><strong>3.</strong> Compute the return to one additional year of education in percentage terms.</li>
<li><strong>4.</strong> Compute the experience level that maximizes predicted wages from the quadratic term.</li>
</ul>
<p><strong>Expected output:</strong> Regression table with HC3 SEs; ~11% return to education; peak experience ~40.</p>`
      },
      {
        id: "py_diag",
        title: "Regression diagnostics",
        desc: "heteroskedasticity, multicollinearity, specification tests",
        lesson: `<h3>Overview</h3>
<p>Running a regression is easy. Knowing whether you can trust the results requires diagnostics. In consulting, a deliverable that fails basic specification checks is a credibility risk.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Heteroskedasticity</strong>: non-constant residual variance. Breusch-Pagan and White tests; fix with robust SEs.</li>
<li><strong>Multicollinearity</strong>: high correlation among regressors inflates standard errors. Detect with VIF (Variance Inflation Factor); VIF > 10 is a concern.</li>
<li><strong>Omitted variable bias</strong>: the most dangerous form of misspecification — Ramsey RESET test checks functional form.</li>
<li><strong>Residual plots</strong>: fitted vs residuals should show no pattern; Q-Q plot checks normality of residuals.</li>
<li><strong>Outliers / leverage</strong>: influence plots, Cook's distance.</li>
</ul>
<h3>Worked example</h3>
<pre>import numpy as np, pandas as pd
import statsmodels.formula.api as smf
from statsmodels.stats.outliers_influence import variance_inflation_factor
from statsmodels.stats.diagnostic import het_breuschpagan
import matplotlib.pyplot as plt
np.random.seed(7)

n = 400
df = pd.DataFrame({
    "educ":   np.random.randint(8,20,n),
    "exper":  np.random.randint(0,40,n),
    "female": np.random.binomial(1,0.5,n),
})
df["lwage"] = 1.0 + 0.1*df["educ"] + 0.02*df["exper"] - 0.15*df["female"]

model = smf.ols("lwage ~ educ + exper + female", data=df).fit()
resid = model.resid
fitted = model.fittedvalues

# Breusch-Pagan test
bp_stat, bp_p, _, _ = het_breuschpagan(resid, model.model.exog)
print(f"Breusch-Pagan p-value: {bp_p:.4f}")

# VIF
X = df[["educ","exper","female"]].assign(const=1)
vif = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
print("VIF:", dict(zip(X.columns, vif)))

# Residual plot
plt.scatter(fitted, resid, alpha=0.4)
plt.axhline(0, color='red')
plt.xlabel("Fitted values"); plt.ylabel("Residuals")
plt.title("Fitted vs Residuals")
plt.tight_layout(); plt.savefig("resid_plot.png")</pre>
<div class="watchout"><strong>Watch out:</strong> Passing the Breusch-Pagan test doesn't mean you can use OLS SEs — it only means you failed to detect heteroskedasticity with that particular test. Always use robust SEs as a default practice.</div>`,
        exercise: `<h3>Exercise — Regression diagnostics</h3>
<p><strong>Scenario:</strong> You've been handed a wage regression. Run a full diagnostic suite.</p>
<pre>import numpy as np, pandas as pd
import statsmodels.formula.api as smf
from statsmodels.stats.outliers_influence import variance_inflation_factor
from statsmodels.stats.diagnostic import het_breuschpagan, linear_reset
np.random.seed(55)

n = 600
df = pd.DataFrame({
    "educ":   np.random.randint(8, 20, n),
    "exper":  np.random.randint(0, 45, n),
    "tenure": np.random.randint(0, 20, n),
    "female": np.random.binomial(1, 0.5, n),
})
# Introduce heteroskedasticity: variance scales with educ
sigma = 0.2 + 0.04 * df["educ"]
df["lwage"] = (1.0 + 0.10*df["educ"] + 0.02*df["exper"]
               + 0.01*df["tenure"] - 0.18*df["female"]
               + np.random.normal(0, sigma, n))</pre>
<ul>
<li><strong>1.</strong> Estimate OLS. Run the Breusch-Pagan test. Interpret the result.</li>
<li><strong>2.</strong> Compute VIF for each regressor. Are any concerning?</li>
<li><strong>3.</strong> Run the Ramsey RESET test. What does it test and what do you conclude?</li>
<li><strong>4.</strong> Produce a fitted-vs-residuals plot. Does it show the heteroskedasticity pattern?</li>
</ul>
<p><strong>Expected output:</strong> BP test with low p-value (reject homoskedasticity); low VIFs; RESET interpretation; scatter plot showing fan-shaped residuals.</p>`
      },
      {
        id: "py_iv",
        title: "Instrumental variables",
        desc: "2SLS, weak instrument tests, linearmodels",
        lesson: `<h3>Overview</h3>
<p>IV estimation addresses endogeneity — when a regressor is correlated with the error term, OLS is biased. Classic applications in economics include using distance to college as an instrument for education (Card 1995) or rainfall as an instrument for income in conflict studies.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Endogeneity</strong>: <code>Cov(x, u) ≠ 0</code> — can arise from omitted variables, reverse causality, or measurement error.</li>
<li><strong>Valid instrument</strong>: (1) relevant — correlated with endogenous regressor; (2) exogenous — uncorrelated with the error.</li>
<li><strong>First stage F-statistic</strong>: rule of thumb F > 10 (Stock-Yogo); below this, you have a weak instrument problem.</li>
<li><strong>2SLS</strong>: Two-Stage Least Squares — the standard IV estimator.</li>
<li><strong>Hausman test</strong>: tests whether OLS and IV estimates differ significantly (endogeneity test).</li>
</ul>
<h3>Worked example</h3>
<pre>import numpy as np, pandas as pd
from linearmodels.iv import IV2SLS
np.random.seed(13)

n = 1000
# Instrument: distance to nearest 4-year college
distance = np.random.uniform(0, 100, n)
ability  = np.random.normal(0, 1, n)  # unobserved

# Endogenous: education depends on distance and ability
educ = 14 - 0.05*distance + 0.8*ability + np.random.normal(0, 1, n)

# Outcome: wages depend on educ and ability (confounded)
lwage = 1.0 + 0.12*educ + 0.5*ability + np.random.normal(0, 0.5, n)

df = pd.DataFrame({"lwage":lwage, "educ":educ, "distance":distance})
df["const"] = 1

model = IV2SLS(
    dependent=df["lwage"],
    exog=df["const"],
    endog=df["educ"],
    instruments=df["distance"]
).fit(cov_type="robust")
print(model.summary)</pre>
<div class="watchout"><strong>Watch out:</strong> A high first-stage R² does not guarantee a strong instrument — report the first-stage F-statistic. Also, you can never fully test instrument exogeneity (it requires an untestable exclusion restriction). Be transparent about this in any write-up.</div>`,
        exercise: `<h3>Exercise — IV estimation</h3>
<p><strong>Scenario:</strong> Estimate the return to education using a supply-side instrument (proximity to college).</p>
<pre>import numpy as np, pandas as pd
from linearmodels.iv import IV2SLS
np.random.seed(88)

n = 1200
proximity = np.random.uniform(0, 80, n)   # miles to nearest college
ability   = np.random.normal(0, 1, n)     # unobserved
educ = 12 + -0.04*proximity + 0.6*ability + np.random.normal(0, 1.5, n)
lwage = 0.5 + 0.15*educ + 0.4*ability + np.random.normal(0, 0.5, n)
df = pd.DataFrame({"lwage":lwage, "educ":educ, "proximity":proximity})
df["const"] = 1</pre>
<ul>
<li><strong>1.</strong> Run OLS of <code>lwage</code> on <code>educ</code>. Note the estimated coefficient.</li>
<li><strong>2.</strong> Run 2SLS using <code>proximity</code> as instrument. Compare the IV coefficient to OLS — which is larger and why?</li>
<li><strong>3.</strong> Estimate the first stage manually (OLS of <code>educ</code> on <code>proximity</code>). Report the F-statistic. Is the instrument strong?</li>
<li><strong>4.</strong> Explain in 2–3 sentences why OLS overestimates or underestimates the return to education here.</li>
</ul>
<p><strong>Expected output:</strong> OLS ~0.20 (biased up due to ability), IV ~0.15 (true value); first-stage F well above 10.</p>`
      },
      {
        id: "py_panel",
        title: "Panel data & fixed effects",
        desc: "entity/time FE, within estimator, linearmodels",
        lesson: `<h3>Overview</h3>
<p>Panel data — multiple observations per unit over time — is extremely common in applied economics. Fixed effects estimation controls for all time-invariant unobserved heterogeneity across units, which is one of the most powerful identification strategies available without an experiment.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Pooled OLS</strong>: ignores panel structure — biased if unobserved unit effects are correlated with regressors.</li>
<li><strong>Entity (individual) fixed effects</strong>: absorb all time-invariant unit-level confounders.</li>
<li><strong>Time fixed effects</strong>: absorb all unit-invariant time shocks (recessions, policy changes).</li>
<li><strong>Two-way FE</strong>: entity + time — the standard in modern applied work.</li>
<li><strong>Within estimator</strong>: equivalent to demeaning data within each unit before OLS.</li>
</ul>
<h3>Worked example</h3>
<pre>import numpy as np, pandas as pd
from linearmodels.panel import PanelOLS
np.random.seed(20)

N, T = 200, 8
ids   = np.repeat(np.arange(1, N+1), T)
times = np.tile(np.arange(1, T+1), N)
alpha = np.repeat(np.random.normal(0, 1, N), T)  # unit FE
df = pd.DataFrame({
    "id": ids, "t": times,
    "x":  np.random.normal(0, 1, N*T) + 0.3*alpha,
    "alpha": alpha,
})
df["y"] = 0.5 + 1.5*df["x"] + df["alpha"] + np.random.normal(0, 0.5, N*T)

df = df.set_index(["id","t"])
model = PanelOLS(
    df["y"], df[["x"]],
    entity_effects=True, time_effects=True
).fit(cov_type="clustered", cluster_entity=True)
print(model.summary)</pre>
<div class="watchout"><strong>Watch out:</strong> Fixed effects absorb all time-invariant variables — so you cannot estimate the effect of race, gender, or any other constant characteristic in a unit-FE model. Also, always cluster standard errors at the entity level in panel regressions.</div>`,
        exercise: `<h3>Exercise — Panel fixed effects</h3>
<p><strong>Scenario:</strong> Estimate the effect of minimum wage changes on teen employment using a state-year panel.</p>
<pre>import numpy as np, pandas as pd
from linearmodels.panel import PanelOLS
np.random.seed(33)

states, years = 50, 10
N = states * years
state_id = np.repeat(np.arange(1, states+1), years)
year_id  = np.tile(np.arange(2010, 2010+years), states)
state_fe = np.repeat(np.random.normal(0, 2, states), years)

df = pd.DataFrame({
    "state": state_id, "year": year_id,
    "min_wage":  5.0 + np.random.uniform(0, 7, N),
    "state_fe":  state_fe,
})
df["teen_emp"] = (30 - 0.8*df["min_wage"] + df["state_fe"]
                  + np.random.normal(0, 2, N))</pre>
<ul>
<li><strong>1.</strong> Set the panel index. Run pooled OLS (no FE). Report the min_wage coefficient.</li>
<li><strong>2.</strong> Run two-way FE (entity + time) with clustered SEs at the state level.</li>
<li><strong>3.</strong> Compare coefficients. Does pooled OLS overestimate the employment effect? Why?</li>
<li><strong>4.</strong> How would you interpret the coefficient if it equals -0.8?</li>
</ul>
<p><strong>Expected output:</strong> Pooled OLS biased; TWFE recovers ~-0.8; clear written interpretation of the coefficient.</p>`
      },
      {
        id: "py_ts",
        title: "Time series analysis",
        desc: "stationarity, ARIMA, autocorrelation",
        lesson: `<h3>Overview</h3>
<p>Time series data requires special treatment because observations are ordered and correlated in time. Regressing non-stationary series on each other produces spurious results — a notorious trap in macroeconomic analysis.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Stationarity</strong>: mean, variance, and autocorrelation don't change over time. Required for most time series models.</li>
<li><strong>Unit root tests</strong>: Augmented Dickey-Fuller (ADF) — null hypothesis is unit root (non-stationary).</li>
<li><strong>Differencing</strong>: take first differences to achieve stationarity. Typical for GDP, prices, employment levels.</li>
<li><strong>ACF / PACF</strong>: autocorrelation and partial autocorrelation plots guide ARIMA order selection.</li>
<li><strong>ARIMA(p,d,q)</strong>: p = AR order, d = differencing order, q = MA order.</li>
</ul>
<h3>Worked example</h3>
<pre>import numpy as np, pandas as pd
import statsmodels.api as sm
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import matplotlib.pyplot as plt
np.random.seed(10)

# Simulate AR(1) process
n = 200
e = np.random.normal(0, 1, n)
y = np.zeros(n)
for t in range(1, n):
    y[t] = 0.7*y[t-1] + e[t]

# ADF test
adf_result = adfuller(y, autolag='AIC')
print(f"ADF stat: {adf_result[0]:.4f}, p={adf_result[1]:.4f}")

# Fit ARIMA(1,0,0)
model = sm.tsa.ARIMA(y, order=(1,0,0)).fit()
print(model.summary())</pre>
<div class="watchout"><strong>Watch out:</strong> Spurious regression: if two non-stationary series both trend upward, OLS will find a "relationship" with high R² and significant t-stats — even if they're completely unrelated. Always test for stationarity before regressing time series on each other.</div>`,
        exercise: `<h3>Exercise — Time series modeling</h3>
<p><strong>Scenario:</strong> Analyze and model a simulated GDP growth series.</p>
<pre>import numpy as np, pandas as pd
import statsmodels.api as sm
from statsmodels.tsa.stattools import adfuller
np.random.seed(77)

n = 120  # 10 years of monthly data
# Simulate GDP level (non-stationary) then growth (stationary)
gdp_level = np.cumsum(np.random.normal(0.3, 1.5, n)) + 100
gdp_growth = np.diff(gdp_level) / gdp_level[:-1] * 100</pre>
<ul>
<li><strong>1.</strong> Run ADF on <code>gdp_level</code>. Can you reject the unit root? What does this mean?</li>
<li><strong>2.</strong> Run ADF on <code>gdp_growth</code>. What changes?</li>
<li><strong>3.</strong> Plot the ACF and PACF of <code>gdp_growth</code>. What ARIMA order do they suggest?</li>
<li><strong>4.</strong> Fit an ARIMA(1,0,0) to <code>gdp_growth</code>. Report the AR(1) coefficient and its interpretation.</li>
</ul>
<p><strong>Expected output:</strong> Unit root in levels, stationarity in growth; ACF/PACF plots; AR(1) estimate with interpretation of persistence.</p>`
      },
    ]},
    { tier: "Advanced Methods", modules: [
      {
        id: "py_did",
        title: "Difference-in-differences",
        desc: "parallel trends, event study, TWFE",
        lesson: `<h3>Overview</h3>
<p>DiD is the most widely used quasi-experimental method in applied economics. It compares the change in outcomes for a treated group relative to a control group across a policy change. Clean DiD requires the parallel trends assumption.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Parallel trends</strong>: absent treatment, treated and control groups would have followed the same trend. This is untestable for post-treatment periods.</li>
<li><strong>Classic 2×2 DiD</strong>: two groups, two periods — estimate = (treated post − treated pre) − (control post − control pre).</li>
<li><strong>TWFE with interaction</strong>: <code>y ~ post*treated + entity_FE + time_FE</code> generalizes to multiple groups/periods.</li>
<li><strong>Event study</strong>: interact treatment with time dummies to inspect pre-trends and dynamic treatment effects.</li>
<li><strong>Staggered adoption</strong>: when units adopt treatment at different times — recent work (Callaway-Sant'Anna) shows TWFE can be severely biased.</li>
</ul>
<h3>Worked example</h3>
<pre>import numpy as np, pandas as pd
import statsmodels.formula.api as smf
np.random.seed(42)

N, T = 100, 6    # 100 firms, 6 periods
treated_ids = np.random.choice(N, 50, replace=False)
rows = []
for i in range(N):
    treat = int(i in treated_ids)
    for t in range(T):
        post = int(t >= 3)
        y = (2.0 + 0.5*t + treat*0.3
             + 1.5*treat*post           # true ATT
             + np.random.normal(0, 0.5))
        rows.append({"firm":i,"t":t,"treated":treat,"post":post,"y":y})

df = pd.DataFrame(rows)
model = smf.ols(
    "y ~ treated*post + C(firm) + C(t)", data=df
).fit(cov_type="cluster", cov_kwds={"groups":df["firm"]})
print(model.params[["treated:post"]])</pre>
<div class="watchout"><strong>Watch out:</strong> Pre-trend testing doesn't prove parallel trends — it only checks pre-period patterns. Also, with staggered treatment, TWFE can give negative weights to some treatment effects, potentially reversing the sign of your estimate. Use Callaway-Sant'Anna or Sun-Abraham for staggered designs.</div>`,
        exercise: `<h3>Exercise — Difference-in-differences</h3>
<p><strong>Scenario:</strong> Evaluate the effect of a state-level minimum wage increase on restaurant employment using a DiD design.</p>
<pre>import numpy as np, pandas as pd
import statsmodels.formula.api as smf
np.random.seed(11)

states, periods = 40, 8
N = states * periods
state_id  = np.repeat(np.arange(states), periods)
period_id = np.tile(np.arange(periods), states)
treated   = (state_id >= 20).astype(int)   # states 20+ treated
post      = (period_id >= 4).astype(int)   # periods 4+ are post

state_fe = np.repeat(np.random.normal(0, 2, states), periods)
df = pd.DataFrame({
    "state": state_id, "period": period_id,
    "treated": treated, "post": post,
    "state_fe": state_fe,
})
df["emp"] = (50 + 2*df["period"] + df["state_fe"]
             - 3.0*df["treated"]*df["post"]
             + np.random.normal(0, 2, N))</pre>
<ul>
<li><strong>1.</strong> Compute the simple 2×2 DiD estimate by hand using group means.</li>
<li><strong>2.</strong> Run TWFE: <code>emp ~ treated*post + C(state) + C(period)</code> with state-clustered SEs.</li>
<li><strong>3.</strong> How close is the TWFE estimate to the true ATT of -3.0?</li>
<li><strong>4.</strong> Describe what pre-trends test you would run and what pattern you'd look for in the coefficients.</li>
</ul>
<p><strong>Expected output:</strong> Hand-computed DiD close to -3; TWFE estimate ~-3 with tight CIs; written pre-trends description.</p>`
      },
      {
        id: "py_rd",
        title: "Regression discontinuity",
        desc: "sharp RD, bandwidth, McCrary density test",
        lesson: `<h3>Overview</h3>
<p>RD design exploits a threshold rule that assigns treatment based on whether a running variable crosses a cutoff. Near the cutoff, treated and untreated units are nearly identical — providing quasi-random variation in treatment.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Running variable</strong>: the variable that determines treatment based on a cutoff (e.g., age, test score, income).</li>
<li><strong>Sharp RD</strong>: treatment switches from 0 to 1 exactly at the cutoff.</li>
<li><strong>Fuzzy RD</strong>: treatment probability jumps at the cutoff but not to 0/1 — estimate as IV with cutoff as instrument.</li>
<li><strong>Bandwidth selection</strong>: tradeoff between bias (wider = more confounded) and variance (narrower = fewer obs). Optimal bandwidth via Imbens-Kalyanaraman/CCT.</li>
<li><strong>McCrary density test</strong>: checks whether agents manipulate the running variable to select into treatment.</li>
</ul>
<h3>Worked example</h3>
<pre>import numpy as np, pandas as pd
import statsmodels.formula.api as smf
np.random.seed(5)

n = 2000
x = np.random.uniform(-1, 1, n)    # running variable, centered at 0
d = (x >= 0).astype(int)           # sharp treatment
y = (1.5 + 2.0*x + 1.8*d          # true jump = 1.8
     + np.random.normal(0, 0.5, n))

df = pd.DataFrame({"y":y, "x":x, "d":d})
df["x_pos"] = df["x"] * df["d"]   # slope on treated side

# Local linear regression with bandwidth h=0.3
bw = 0.3
sub = df[df["x"].abs() <= bw]
model = smf.ols("y ~ x + d + x_pos", data=sub).fit(cov_type="HC3")
print(model.params[["d"]])         # RD estimate</pre>
<div class="watchout"><strong>Watch out:</strong> Always plot your data before running RD regressions — plot the outcome against the running variable with a clear discontinuity visible at the cutoff. If you can't see it in the plot, the effect may not be credible regardless of the regression output.</div>`,
        exercise: `<h3>Exercise — Regression discontinuity</h3>
<p><strong>Scenario:</strong> Estimate the effect of a scholarship program (awarded to students with GPA ≥ 3.0) on future earnings.</p>
<pre>import numpy as np, pandas as pd
import statsmodels.formula.api as smf
import matplotlib.pyplot as plt
np.random.seed(22)

n = 3000
gpa = np.random.uniform(1.5, 4.0, n)
scholarship = (gpa >= 3.0).astype(int)
# True effect: $8,000 jump in earnings at cutoff
earnings = (25000 + 8000*scholarship + 5000*(gpa - 3.0)
            + np.random.normal(0, 3000, n))
df = pd.DataFrame({"gpa":gpa,"scholarship":scholarship,"earnings":earnings})
df["gpa_c"] = df["gpa"] - 3.0   # center at cutoff</pre>
<ul>
<li><strong>1.</strong> Plot earnings vs GPA with a vertical line at the cutoff. Do you see a jump?</li>
<li><strong>2.</strong> Estimate the RD using local linear regression in bandwidth ±0.5 around 3.0. Allow separate slopes on each side.</li>
<li><strong>3.</strong> Try bandwidths ±0.25 and ±1.0. How do the estimates and standard errors change?</li>
<li><strong>4.</strong> What assumption is critical for this RD to be valid? What would a McCrary density test check?</li>
</ul>
<p><strong>Expected output:</strong> Visible jump in scatter plot; RD estimate ~8000; bandwidth sensitivity analysis; written validity discussion.</p>`
      },
      {
        id: "py_ml",
        title: "Machine learning for causal inference",
        desc: "LASSO, double ML, partialling out",
        lesson: `<h3>Overview</h3>
<p>Modern econometrics increasingly incorporates ML tools — not for prediction per se, but for controlling high-dimensional confounders while preserving valid inference. The key is combining ML's flexibility with econometric discipline around standard errors and causal interpretation.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>LASSO</strong>: L1-penalized regression — shrinks irrelevant coefficients to exactly zero. Useful for variable selection when you have many potential controls.</li>
<li><strong>Post-LASSO OLS</strong>: run LASSO to select controls, then OLS on selected variables — recovers valid inference.</li>
<li><strong>Double/Debiased ML (DML)</strong>: partial out both Y and D on controls using ML, then regress partialled Y on partialled D. Valid even when ML is used for nuisance estimation.</li>
<li><strong>Cross-fitting</strong>: split sample to avoid overfitting bias in DML.</li>
<li><strong>econml library</strong>: Microsoft's package implementing DML, causal forests, and other methods.</li>
</ul>
<h3>Worked example</h3>
<pre>import numpy as np, pandas as pd
from sklearn.linear_model import LassoCV, LinearRegression
from sklearn.model_selection import cross_val_predict
np.random.seed(99)

n, p = 500, 50
X = np.random.normal(0, 1, (n, p))    # many controls
d = X[:, 0] + X[:, 1] + np.random.normal(0, 1, n)  # treatment
y = 2.0*d + X @ np.random.normal(0, 0.5, p) + np.random.normal(0, 1, n)

# Double ML: partial out d and y on X
lasso = LassoCV(cv=5)
d_hat = cross_val_predict(lasso, X, d, cv=5)
y_hat = cross_val_predict(lasso, X, y, cv=5)

d_res = d - d_hat
y_res = y - y_hat

# Final OLS of residualized y on residualized d
theta = np.linalg.lstsq(d_res.reshape(-1,1), y_res, rcond=None)[0]
print(f"DML estimate: {theta[0]:.4f} (true: 2.0)")</pre>
<div class="watchout"><strong>Watch out:</strong> Using ML for selection and then running OLS on selected variables without correction leads to invalid inference (post-selection bias). Always use cross-fitting or explicit bias-correction methods like DML for valid standard errors.</div>`,
        exercise: `<h3>Exercise — Double ML</h3>
<p><strong>Scenario:</strong> Estimate the effect of job training on wages while controlling for 30 potential confounders using DML.</p>
<pre>import numpy as np, pandas as pd
from sklearn.linear_model import LassoCV
from sklearn.model_selection import cross_val_predict
np.random.seed(44)

n, p = 800, 30
X = np.random.normal(0, 1, (n, p))
beta_x = np.random.normal(0, 0.3, p)
# Treatment: training (binary, endogenous)
d_star = X @ beta_x + np.random.normal(0, 1, n)
d = (d_star > 0).astype(float)
# Outcome: wages
lwage = (1.5 + 0.20*d + X @ beta_x * 0.5
         + np.random.normal(0, 0.5, n))</pre>
<ul>
<li><strong>1.</strong> Run naive OLS of <code>lwage</code> on <code>d</code> only (omitting X). Report the estimate.</li>
<li><strong>2.</strong> Run OLS of <code>lwage</code> on <code>d</code> plus all 30 X columns. Compare to naive.</li>
<li><strong>3.</strong> Implement DML: partial out both <code>d</code> and <code>lwage</code> on X using <code>LassoCV</code> with 5-fold cross-fitting. Regress residuals. Report the estimate.</li>
<li><strong>4.</strong> Which estimate is closest to the true effect of 0.20? Explain why DML is preferred.</li>
</ul>
<p><strong>Expected output:</strong> Naive OLS biased; DML estimate ~0.20; written comparison of the three approaches.</p>`
      },
      {
        id: "py_viz",
        title: "Research visualization",
        desc: "coefficient plots, event studies, publication figures",
        lesson: `<h3>Overview</h3>
<p>In consulting and academic work, visualizations are how your empirical findings get communicated and remembered. A well-designed coefficient plot conveys more than a regression table. Publication-quality figures are a professional differentiator.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Coefficient plots</strong>: plot point estimates with confidence intervals — far more readable than regression tables for comparing specifications.</li>
<li><strong>Event study plots</strong>: plot DiD coefficients over time to show pre-trends and dynamic treatment effects.</li>
<li><strong>matplotlib + seaborn</strong>: matplotlib gives you full control; seaborn handles statistical plot types.</li>
<li><strong>Figure standards</strong>: always label axes, include units, use colorblind-friendly palettes, set DPI ≥ 150 for print.</li>
<li><strong>Saving figures</strong>: <code>plt.savefig("fig.pdf", bbox_inches="tight")</code> for publication-ready output.</li>
</ul>
<h3>Worked example — Coefficient plot</h3>
<pre>import numpy as np, matplotlib.pyplot as plt

# Simulated regression results across 4 specifications
specs  = ["Baseline","+ Controls","+ State FE","TWFE"]
coefs  = [0.42, 0.31, 0.22, 0.18]
ses    = [0.08, 0.06, 0.05, 0.04]
ci_lo  = [c - 1.96*s for c, s in zip(coefs, ses)]
ci_hi  = [c + 1.96*s for c, s in zip(coefs, ses)]

fig, ax = plt.subplots(figsize=(7, 3.5))
y_pos = range(len(specs))
ax.errorbar(coefs, y_pos, xerr=[
    [c-l for c,l in zip(coefs,ci_lo)],
    [h-c for c,h in zip(coefs,ci_hi)]
], fmt='o', color='#2e4a7d', capsize=4, linewidth=1.5, markersize=7)
ax.axvline(0, color='gray', linewidth=0.8, linestyle='--')
ax.set_yticks(list(y_pos)); ax.set_yticklabels(specs)
ax.set_xlabel("Estimated coefficient"); ax.set_title("Robustness across specifications")
plt.tight_layout(); plt.savefig("coef_plot.pdf", bbox_inches="tight")</pre>
<div class="watchout"><strong>Watch out:</strong> Truncating the y-axis to exaggerate an effect is a common misleading practice. Always start confidence interval plots at a scale that shows economic as well as statistical significance — a tiny, precisely estimated effect is not necessarily important.</div>`,
        exercise: `<h3>Exercise — Research visualization</h3>
<p><strong>Scenario:</strong> You've run an event study DiD. Visualize the pre-trends and treatment effects to include in a policy memo.</p>
<pre>import numpy as np, pandas as pd, matplotlib.pyplot as plt

np.random.seed(60)
periods = list(range(-4, 5))   # -4 to +4, treatment at 0
# Simulate event study coefficients (pre-trends ~0, post effects grow)
coefs = [np.random.normal(0, 0.1) if t < 0
         else np.random.normal(1.2*t, 0.15) for t in periods]
ses   = [0.12]*4 + [0.0] + [0.15]*4  # period -1 is reference (se=0)</pre>
<ul>
<li><strong>1.</strong> Plot the event study: time period on x-axis, coefficient on y-axis, with 95% CI bands. Mark period 0 with a vertical dashed line. Reference period (-1) should be at 0 with no CI bar.</li>
<li><strong>2.</strong> Add a horizontal reference line at 0. Use a clean, professional style with labeled axes and a title.</li>
<li><strong>3.</strong> Add a second panel showing a simple bar chart of mean outcomes for treated vs control by pre/post period.</li>
<li><strong>4.</strong> Save to <code>event_study.pdf</code> at 150 DPI with tight layout.</li>
</ul>
<p><strong>Expected output:</strong> A two-panel publication-quality figure: event study with CIs and a pre/post bar comparison.</p>`
      },
    ]},
  ],

  r: [
    { tier: "Foundations", modules: [
      {
        id: "r_env",
        title: "Environment & project setup",
        desc: "renv, here, RStudio projects",
        lesson: `<h3>Overview</h3>
<p>Reproducible R work requires disciplined project management. Unlike Python, where venv is standard, R's package management has historically been fragmented — <code>renv</code> is now the gold standard for lockfiles and reproducibility.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>RStudio Projects</strong>: always work inside a <code>.Rproj</code> file — sets the working directory automatically and avoids <code>setwd()</code> chaos.</li>
<li><strong>renv</strong>: creates a project-local library and <code>renv.lock</code> that records exact package versions. Run <code>renv::restore()</code> to replicate the environment.</li>
<li><strong>here package</strong>: construct file paths relative to the project root — works regardless of where R is opened from.</li>
<li><strong>Project structure</strong>: <code>data/</code>, <code>R/</code>, <code>output/</code>, <code>docs/</code> — keep raw data immutable.</li>
</ul>
<h3>Worked example</h3>
<pre># In RStudio — create a project first (File > New Project)
# Then in the R console:

install.packages("renv")
renv::init()

# Install project packages
install.packages(c("tidyverse","fixest","modelsummary","here"))

# Take a snapshot to lock versions
renv::snapshot()

# Use here() for all file paths
library(here)
data_path <- here("data", "raw", "wages.csv")
df <- read.csv(data_path)</pre>
<p>Restore on a new machine: <code>renv::restore()</code></p>
<div class="watchout"><strong>Watch out:</strong> Never use <code>setwd()</code> in a script you share with others — it hardcodes your personal file path. Use RStudio Projects + <code>here()</code> so paths work for anyone who opens the <code>.Rproj</code> file.</div>`,
        exercise: `<h3>Exercise — Project setup</h3>
<p><strong>Scenario:</strong> Initialize a reproducible R project for a labor economics analysis.</p>
<ul>
<li><strong>1.</strong> Create an RStudio project called <code>labor_analysis</code>. Initialize renv.</li>
<li><strong>2.</strong> Install and snapshot: <code>tidyverse</code>, <code>fixest</code>, <code>modelsummary</code>, <code>here</code>.</li>
<li><strong>3.</strong> Create the folder structure using <code>dir.create(here("data","raw"), recursive=TRUE)</code> etc. for: <code>data/raw</code>, <code>data/processed</code>, <code>output/figures</code>, <code>output/tables</code>.</li>
<li><strong>4.</strong> Write a script that: loads all four packages, confirms the folder structure exists using <code>dir.exists()</code>, and prints a confirmation message for each path.</li>
</ul>
<p><strong>Expected output:</strong> Script runs with no errors; prints <code>data/raw: TRUE</code> for each folder path.</p>`
      },
      {
        id: "r_base",
        title: "Base R & data structures",
        desc: "vectors, lists, functions, apply",
        lesson: `<h3>Overview</h3>
<p>Fluency in base R makes you much more effective with tidyverse and econometric packages — most function outputs are base R lists and vectors. Understanding these structures is essential for extracting regression results programmatically.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Vectors</strong>: the fundamental R data type — all elements must be same type. Recycling rules can cause silent errors.</li>
<li><strong>Lists</strong>: can hold mixed types — lm objects, fixest results, and model summaries are all lists.</li>
<li><strong>Functions</strong>: first-class objects in R. Use <code>function(x) {...}</code> syntax; prefer pure functions without side effects.</li>
<li><strong>apply family</strong>: <code>lapply</code> → list output, <code>sapply</code> → simplified output, <code>vapply</code> → type-safe.</li>
<li><strong>Formula objects</strong>: <code>y ~ x1 + x2</code> — R's native way to specify model formulas.</li>
</ul>
<h3>Worked example</h3>
<pre># Vectors and recycling
wages <- c(45, 52, 38, 61, 29, 55)
educ  <- c(12, 16, 10, 18, 9, 14)

growth <- diff(wages) / head(wages, -1) * 100

# Functions
describe_vec <- function(x, label = "x") {
  cat(sprintf("%s: mean=%.2f, sd=%.2f, n=%d\\n",
              label, mean(x, na.rm=TRUE),
              sd(x, na.rm=TRUE), length(x)))
}
describe_vec(wages, "wages")

# lapply over a list of vectors
data_list <- list(wages=wages, educ=educ)
lapply(data_list, function(x) c(mean=mean(x), sd=sd(x)))</pre>
<div class="watchout"><strong>Watch out:</strong> R's vector recycling silently repeats the shorter vector to match the longer one. <code>c(1,2,3,4) + c(10,20)</code> gives <code>c(11,22,13,24)</code> with no error. This can produce incorrect results when combining mismatched datasets.</div>`,
        exercise: `<h3>Exercise — Base R</h3>
<p><strong>Scenario:</strong> Compute regional wage statistics and extract model output using base R.</p>
<pre>set.seed(42)
n <- 300
wages  <- rlnorm(n, meanlog=3.2, sdlog=0.4)
educ   <- sample(8:20, n, replace=TRUE)
region <- sample(c("NE","MW","S","W"), n, replace=TRUE)</pre>
<ul>
<li><strong>1.</strong> Write a function <code>region_stats(df, region_name)</code> that filters to a region and returns a named list with <code>mean</code>, <code>median</code>, <code>sd</code>, and <code>n</code>.</li>
<li><strong>2.</strong> Use <code>lapply</code> over the vector of region names to apply this function to each region. Print the results.</li>
<li><strong>3.</strong> Run <code>lm(log(wages) ~ educ + region)</code>. Store the result and use <code>coef()</code>, <code>confint()</code>, and <code>summary()$r.squared</code> to extract key statistics.</li>
<li><strong>4.</strong> Use <code>sapply</code> to compute the mean wage for each unique education level.</li>
</ul>
<p><strong>Expected output:</strong> Regional stats list; lm output with key extracted values; education-level means.</p>`
      },
      {
        id: "r_tidy",
        title: "Tidyverse data manipulation",
        desc: "dplyr, tidyr, pipes, joins",
        lesson: `<h3>Overview</h3>
<p>The tidyverse is the dominant data manipulation framework in R for a reason — readable, composable, and consistent. In economic research, you'll use dplyr for summarizing and transforming data, and tidyr for reshaping panels.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Pipe operator</strong>: <code>|></code> (base R 4.1+) or <code>%>%</code> — passes LHS as first argument to RHS. Makes code read as a sequence of transformations.</li>
<li><strong>Core dplyr verbs</strong>: <code>filter</code>, <code>select</code>, <code>mutate</code>, <code>summarise</code>, <code>group_by</code>, <code>arrange</code>.</li>
<li><strong>Joins</strong>: <code>left_join</code>, <code>inner_join</code>, <code>anti_join</code> — always specify <code>by =</code> explicitly.</li>
<li><strong>tidyr reshaping</strong>: <code>pivot_longer</code> (wide → long) and <code>pivot_wider</code> (long → wide).</li>
<li><strong>across()</strong>: apply the same transformation to multiple columns simultaneously.</li>
</ul>
<h3>Worked example</h3>
<pre>library(tidyverse)
set.seed(7)

n <- 500
df <- tibble(
  id     = 1:n,
  wage   = rlnorm(n, 3.0, 0.4),
  educ   = sample(8:20, n, replace=TRUE),
  female = rbinom(n, 1, 0.5),
  state  = sample(state.abb[1:10], n, replace=TRUE),
)

# Summarize by state and gender
df |>
  group_by(state, female) |>
  summarise(
    mean_wage = mean(wage),
    n = n(),
    .groups = "drop"
  ) |>
  arrange(desc(mean_wage)) |>
  print(n = 20)</pre>
<div class="watchout"><strong>Watch out:</strong> <code>group_by()</code> is sticky — the grouping persists in subsequent operations. Always use <code>.groups = "drop"</code> in <code>summarise()</code> or explicitly call <code>ungroup()</code> when you're done with grouped operations.</div>`,
        exercise: `<h3>Exercise — Tidyverse data manipulation</h3>
<p><strong>Scenario:</strong> Clean and summarize a state-year employment dataset using the tidyverse.</p>
<pre>library(tidyverse)
set.seed(9)

n <- 600
emp_df <- tibble(
  state  = rep(state.abb[1:15], each=40),
  year   = rep(2010:2023, times=15) |> sample(n, replace=FALSE),
  emp    = rnorm(n, 50, 10),
  unemp  = runif(n, 3, 12),
  policy = rbinom(n, 1, 0.3),
)
# Introduce missings
emp_df$unemp[sample(n, 25)] <- NA</pre>
<ul>
<li><strong>1.</strong> Report missing counts per column using <code>summarise(across(everything(), ~sum(is.na(.))))</code>.</li>
<li><strong>2.</strong> Filter to years 2015–2023. Replace missing <code>unemp</code> with each state's mean <code>unemp</code> within that window.</li>
<li><strong>3.</strong> Compute mean employment and unemployment by state, arrange by mean employment descending.</li>
<li><strong>4.</strong> Create a wide table: states as rows, years as columns, <code>emp</code> as values using <code>pivot_wider</code>.</li>
</ul>
<p><strong>Expected output:</strong> Missing value report; cleaned dataset; state-level summary table; wide pivot of employment.</p>`
      },
      {
        id: "r_clean",
        title: "Data cleaning & variable construction",
        desc: "recoding, factors, outliers, janitor",
        lesson: `<h3>Overview</h3>
<p>Raw economic data is messy. Wages coded as character strings, categories with inconsistent capitalization, and outliers that are data entry errors rather than real observations — all require careful handling before any analysis.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>janitor package</strong>: <code>clean_names()</code> standardizes column names; <code>tabyl()</code> produces frequency tables with proportions.</li>
<li><strong>Factors</strong>: use <code>forcats</code> functions — <code>fct_relevel</code> to change reference category, <code>fct_lump</code> to collapse rare levels.</li>
<li><strong>Winsorizing</strong>: cap extreme values at a percentile (e.g., 1st/99th) rather than dropping them outright.</li>
<li><strong>case_when()</code></strong>: vectorized conditional logic for creating categorical variables from continuous ones.</li>
<li><strong>Labeling</strong>: use the <code>labelled</code> package to preserve variable and value labels from Stata files.</li>
</ul>
<h3>Worked example</h3>
<pre>library(tidyverse)
library(janitor)
set.seed(3)

n <- 400
df <- tibble(
  WAGE       = c(rlnorm(390, 3.0, 0.4), rep(999999, 10)), # outliers
  Education  = sample(c("high school","bachelor's",
                         "master's","phd"), n, replace=TRUE),
  Female     = rbinom(n, 1, 0.5),
)
df <- df |>
  clean_names() |>
  mutate(
    # Winsorize wages at 99th percentile
    wage_w = pmin(wage, quantile(wage, 0.99)),
    # Ordinal factor with correct ordering
    educ_f = factor(education,
                    levels=c("high school","bachelor's","master's","phd"),
                    ordered=TRUE),
    # Education groups
    educ_group = case_when(
      education == "high school" ~ "HS or less",
      education %in% c("bachelor's") ~ "College",
      TRUE ~ "Graduate"
    )
  )
janitor::tabyl(df, educ_group)</pre>
<div class="watchout"><strong>Watch out:</strong> When merging Stata datasets into R with <code>haven::read_dta()</code>, numeric variables with value labels come in as <code>haven_labelled</code> class — not standard factors. Use <code>haven::as_factor()</code> to convert them, or your <code>lm()</code> calls will error or silently use numeric codes.</div>`,
        exercise: `<h3>Exercise — Data cleaning</h3>
<p><strong>Scenario:</strong> Clean a raw CPS-style microdata extract before analysis.</p>
<pre>library(tidyverse); library(janitor)
set.seed(15)

n <- 500
raw <- tibble(
  HOURLY_WAGE = c(rlnorm(480, 3.1, 0.5), rep(c(-99, 9999), 10)),
  EDUC_LVL    = sample(c("lt_hs","hs","some_col","ba","grad"),
                        n, replace=TRUE),
  AGE         = c(sample(22:65, 480, replace=TRUE), rep(NA, 20)),
  INDUSTRY    = sample(c("mfg","retail","services","govt",
                          "finance","other"), n, replace=TRUE),
  Female      = rbinom(n, 1, 0.5),
)</pre>
<ul>
<li><strong>1.</strong> Apply <code>clean_names()</code>. Replace coded missing values (-99, 9999) with <code>NA</code> in <code>hourly_wage</code>.</li>
<li><strong>2.</strong> Winsorize <code>hourly_wage</code> at the 1st and 99th percentile.</li>
<li><strong>3.</strong> Convert <code>educ_lvl</code> to an ordered factor with correct ordering. Create a <code>college_grad</code> binary for BA or higher.</li>
<li><strong>4.</strong> Impute missing age values with the median age. Produce a <code>tabyl</code> of industry and a summary of the cleaned wage variable.</li>
</ul>
<p><strong>Expected output:</strong> Clean dataset with no implausible values, proper factor levels, imputed ages, and a frequency table of industry.</p>`
      },
    ]},
    { tier: "Core Econometrics", modules: [
      {
        id: "r_ols",
        title: "OLS with fixest & modelsummary",
        desc: "feols, robust/clustered SEs, output tables",
        lesson: `<h3>Overview</h3>
<p>The <code>fixest</code> package has become the standard for OLS and FE estimation in R — it's dramatically faster than <code>lm</code> for large datasets and has native support for robust and clustered SEs. <code>modelsummary</code> produces publication-quality regression tables.</p>
<h3>Key concepts</h3>
<ul>
<li><strong><code>feols(y ~ x1 + x2, data=df)</code></strong>: main estimation function — works for OLS, IV, and panel FE.</li>
<li><strong>Standard errors</strong>: <code>vcov="HC1"</code> for robust; <code>cluster="state"</code> for cluster-robust.</li>
<li><strong>modelsummary</strong>: <code>modelsummary(list(m1,m2,m3))</code> produces side-by-side regression tables with coef_map for relabeling.</li>
<li><strong>etable()</strong>: fixest's own output function — very fast for quick inspection.</li>
<li><strong>coefplot()</strong>: fixest coefficient plots — easy event study visualization.</li>
</ul>
<h3>Worked example</h3>
<pre>library(fixest)
library(modelsummary)
set.seed(42)

n <- 800
df <- data.frame(
  lwage  = rnorm(n, 3.0, 0.5),
  educ   = sample(8:20, n, replace=TRUE),
  exper  = sample(0:40, n, replace=TRUE),
  female = rbinom(n, 1, 0.5),
  state  = sample(paste0("S",1:10), n, replace=TRUE)
)
df$lwage <- with(df, 1.0 + 0.10*educ + 0.03*exper
                     - 0.18*female + rnorm(n, 0, 0.4))

m1 <- feols(lwage ~ educ + exper + female, df, vcov="HC1")
m2 <- feols(lwage ~ educ + exper + female, df, cluster=~state)
m3 <- feols(lwage ~ educ + exper + female | state, df, cluster=~state)

modelsummary(list("OLS-HC1"=m1,"Cluster"=m2,"State FE"=m3),
             stars=TRUE, gof_omit="IC|Log|F")</pre>
<div class="watchout"><strong>Watch out:</strong> fixest's default standard errors changed between versions — always explicitly specify <code>vcov=</code> or <code>cluster=</code> rather than relying on defaults. State this explicitly in any methods section.</div>`,
        exercise: `<h3>Exercise — OLS with fixest</h3>
<p><strong>Scenario:</strong> Estimate a Mincer equation across multiple specifications, producing a publication table.</p>
<pre>library(fixest); library(modelsummary)
set.seed(30)

n <- 1000
df <- data.frame(
  educ   = sample(8:20, n, replace=TRUE),
  exper  = sample(0:42, n, replace=TRUE),
  female = rbinom(n, 1, 0.5),
  union  = rbinom(n, 1, 0.15),
  state  = sample(paste0("S",1:20), n, replace=TRUE),
  sector = sample(c("mfg","svc","govt"), n, replace=TRUE)
)
df$exper2 <- df$exper^2
df$lwage <- with(df, 0.8 + 0.11*educ + 0.04*exper - 0.0006*exper2
                     + 0.14*union - 0.20*female + rnorm(n, 0, 0.45))</pre>
<ul>
<li><strong>1.</strong> Run three models: (1) baseline OLS with HC1 SEs; (2) add sector dummies; (3) add state FE, cluster by state.</li>
<li><strong>2.</strong> Use <code>modelsummary()</code> to display all three side by side. Rename coefficients nicely.</li>
<li><strong>3.</strong> Calculate and report the experience level that maximizes log wages from model 3's quadratic.</li>
<li><strong>4.</strong> Use <code>coefplot(m3)</code> to visualize the point estimates with confidence intervals.</li>
</ul>
<p><strong>Expected output:</strong> Three-column regression table; peak experience ~33; coefficient plot.</p>`
      },
      {
        id: "r_diag",
        title: "Regression diagnostics in R",
        desc: "heteroskedasticity, VIF, specification tests",
        lesson: `<h3>Overview</h3>
<p>After estimating a model, diagnostic checking validates your assumptions. R has excellent diagnostic tools through <code>lmtest</code>, <code>car</code>, and base R's <code>plot.lm</code>.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Breusch-Pagan test</strong>: <code>lmtest::bptest(model)</code> — tests for heteroskedasticity.</li>
<li><strong>VIF</strong>: <code>car::vif(model)</code> — variance inflation factors; values > 10 signal multicollinearity.</li>
<li><strong>RESET test</strong>: <code>lmtest::resettest(model)</code> — Ramsey's test for omitted nonlinearities.</li>
<li><strong>Durbin-Watson</strong>: <code>lmtest::dwtest(model)</code> — serial correlation in residuals (time series context).</li>
<li><strong>plot(model)</strong>: base R produces 4 diagnostic plots — residuals vs fitted, Q-Q, scale-location, leverage.</li>
</ul>
<h3>Worked example</h3>
<pre>library(lmtest); library(car)
set.seed(8)

n <- 500
x1 <- rnorm(n); x2 <- rnorm(n); x3 <- rnorm(n)
# Heteroskedastic error
sigma <- exp(0.5 * x1)
y <- 1 + 0.5*x1 + 0.3*x2 + 0.2*x3 + rnorm(n, 0, sigma)
df <- data.frame(y, x1, x2, x3)

model <- lm(y ~ x1 + x2 + x3, df)

# Tests
bptest(model)       # Breusch-Pagan
vif(model)          # VIF
resettest(model)    # RESET

# Diagnostic plots (produces 4-panel output)
par(mfrow=c(2,2)); plot(model)</pre>
<div class="watchout"><strong>Watch out:</strong> The base R <code>plot(model)</code> diagnostic plots use non-robust standard errors. A model that looks fine diagnostically can still have very different inference under heteroskedasticity. Run the BP test regardless of whether the residual plot looks clean.</div>`,
        exercise: `<h3>Exercise — Diagnostics</h3>
<p><strong>Scenario:</strong> You inherit a wage regression. Run a full diagnostic check and report findings.</p>
<pre>library(lmtest); library(car)
set.seed(55)

n <- 600
educ  <- sample(8:20, n, replace=TRUE)
exper <- sample(0:40, n, replace=TRUE)
sigma <- 0.15 + 0.04*educ   # heteroskedastic: variance grows with education
lwage <- 0.8 + 0.10*educ + 0.02*exper + rnorm(n, 0, sigma)
df <- data.frame(lwage, educ, exper)</pre>
<ul>
<li><strong>1.</strong> Fit OLS. Run the Breusch-Pagan test. Report and interpret the result.</li>
<li><strong>2.</strong> Compute VIF. Are any variables problematic?</li>
<li><strong>3.</strong> Run the RESET test. What is the null hypothesis and what do you conclude?</li>
<li><strong>4.</strong> Produce the four base R diagnostic plots. Which plot most clearly reveals the heteroskedasticity pattern?</li>
</ul>
<p><strong>Expected output:</strong> BP test with low p-value; VIFs; RESET interpretation; four diagnostic plots with written commentary.</p>`
      },
      {
        id: "r_iv",
        title: "Instrumental variables with fixest",
        desc: "feols IV syntax, first stage, Sargan test",
        lesson: `<h3>Overview</h3>
<p>IV estimation in R is elegantly handled by <code>fixest::feols</code> using a pipe-separated formula syntax. This integrates seamlessly with fixed effects and clustered standard errors.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>fixest IV syntax</strong>: <code>y ~ controls | FE | endog ~ instrument</code> — the third pipe section specifies the IV.</li>
<li><strong>First stage F-stat</strong>: available from <code>fitstat(model, "ivf")</code> — Stock-Yogo critical values: F > 10 for single instrument.</li>
<li><strong>Sargan-Hansen test</strong>: over-identification test when you have more instruments than endogenous variables.</li>
<li><strong>Wu-Hausman test</strong>: tests endogeneity — is OLS actually inconsistent here?</li>
</ul>
<h3>Worked example</h3>
<pre>library(fixest)
set.seed(13)

n <- 1000
proximity <- runif(n, 0, 100)    # instrument
ability   <- rnorm(n)            # unobserved
educ <- 14 - 0.05*proximity + 0.8*ability + rnorm(n, 0, 1)
lwage <- 1.0 + 0.12*educ + 0.5*ability + rnorm(n, 0, 0.5)
df <- data.frame(lwage, educ, proximity, ability)

# OLS (biased)
m_ols <- feols(lwage ~ educ, df, vcov="HC1")

# IV: educ instrumented by proximity
m_iv <- feols(lwage ~ 1 | educ ~ proximity, df, vcov="HC1")

etable(m_ols, m_iv)
fitstat(m_iv, "ivf")  # first stage F</pre>
<div class="watchout"><strong>Watch out:</strong> The fixest IV formula <code>y ~ controls | endog ~ instrument</code> (without FE) differs from <code>y ~ controls | FE | endog ~ instrument</code> (with FE). Getting these pipes wrong silently changes your specification — always check the printed formula in the summary output.</div>`,
        exercise: `<h3>Exercise — IV with fixest</h3>
<p><strong>Scenario:</strong> Estimate returns to schooling using distance to college as instrument, with state fixed effects.</p>
<pre>library(fixest)
set.seed(88)

n <- 1500
state <- sample(paste0("S",1:30), n, replace=TRUE)
proximity <- runif(n, 0, 80)
ability   <- rnorm(n)
educ  <- 12 - 0.04*proximity + 0.6*ability + rnorm(n, 0, 1.5)
lwage <- 0.5 + 0.15*educ + 0.4*ability + rnorm(n, 0, 0.5)
df <- data.frame(lwage, educ, proximity, state)</pre>
<ul>
<li><strong>1.</strong> Run pooled OLS. Run IV using proximity as instrument. Compare coefficients.</li>
<li><strong>2.</strong> Add state fixed effects to the IV specification. How do results change?</li>
<li><strong>3.</strong> Report the first stage F-statistic using <code>fitstat()</code>. Is the instrument strong?</li>
<li><strong>4.</strong> Use <code>etable()</code> to display OLS, IV, and IV+FE side by side.</li>
</ul>
<p><strong>Expected output:</strong> OLS biased upward; IV ~0.15; state FE IV robust; strong first stage (F > 10).</p>`
      },
      {
        id: "r_panel",
        title: "Panel data & fixed effects",
        desc: "TWFE with fixest, clustered SEs",
        lesson: `<h3>Overview</h3>
<p>R's <code>fixest</code> package is among the fastest implementations of high-dimensional fixed effects in any statistical software. It handles two-way FE with clustered SEs — the standard specification in applied panel econometrics — efficiently and with excellent output.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>fixest FE syntax</strong>: <code>y ~ x | entity + time</code> — fixed effects go after the pipe, not as dummies.</li>
<li><strong>Clustering</strong>: <code>cluster=~entity</code> or multi-way <code>cluster=~entity+time</code>.</li>
<li><strong>Within R²</strong>: fixest reports within-group R² — more meaningful than overall R² in FE models.</li>
<li><strong>sunab()</strong>: fixest's implementation of the Sun-Abraham (2021) estimator for staggered DiD.</li>
</ul>
<h3>Worked example</h3>
<pre>library(fixest)
set.seed(20)

N <- 100; T <- 10
panel <- data.frame(
  id   = rep(1:N, each=T),
  year = rep(2010:(2009+T), N),
  x    = rnorm(N*T) + rep(rnorm(N)*0.3, each=T),  # correlated with FE
  fe   = rep(rnorm(N), each=T)
)
panel$y <- 1.5*panel$x + panel$fe + rnorm(N*T, 0, 0.5)

# Pooled OLS (biased)
m_pool <- feols(y ~ x, panel, vcov="HC1")
# Entity FE
m_fe   <- feols(y ~ x | id, panel, cluster=~id)
# Two-way FE
m_twfe <- feols(y ~ x | id + year, panel, cluster=~id)

etable(m_pool, m_fe, m_twfe)</pre>
<div class="watchout"><strong>Watch out:</strong> Including time FE removes common macro shocks from all units — this is almost always the right choice in a panel with multiple years. Forgetting time FE when treatment varies over time can badly confound your estimates.</div>`,
        exercise: `<h3>Exercise — Panel fixed effects</h3>
<p><strong>Scenario:</strong> Estimate the effect of state corporate tax rates on investment using a firm-state-year panel.</p>
<pre>library(fixest)
set.seed(40)

firms  <- 80; states <- 20; years <- 8
N <- firms * years
firm_id  <- rep(1:firms, each=years)
year_id  <- rep(2015:(2014+years), firms)
state_id <- rep(sample(1:states, firms, replace=TRUE), each=years)
firm_fe  <- rep(rnorm(firms, 0, 3), each=years)

df <- data.frame(
  firm=firm_id, year=year_id, state=state_id,
  tax_rate = 5 + rnorm(N, 0, 2),
  firm_fe  = firm_fe
)
df$investment <- 20 - 0.8*df$tax_rate + df$firm_fe + rnorm(N, 0, 2)</pre>
<ul>
<li><strong>1.</strong> Run pooled OLS. Run firm FE. Run firm + year FE (TWFE). Display with <code>etable()</code>.</li>
<li><strong>2.</strong> Cluster standard errors at the firm level in the TWFE spec.</li>
<li><strong>3.</strong> How does the tax_rate coefficient change across specifications? Why?</li>
<li><strong>4.</strong> What additional fixed effects might you want to add and why?</li>
</ul>
<p><strong>Expected output:</strong> Three-column table; pooled OLS attenuated; TWFE close to -0.8; written discussion of FE choices.</p>`
      },
      {
        id: "r_ts",
        title: "Time series in R",
        desc: "ts objects, ADF, ARIMA, fpp3",
        lesson: `<h3>Overview</h3>
<p>R has excellent time series support through the base <code>ts</code> class, <code>tseries</code> for unit root tests, and the <code>fpp3</code> ecosystem (Hyndman) for modern tidy time series analysis.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>ts object</strong>: <code>ts(data, start=c(2000,1), frequency=4)</code> for quarterly data — carries temporal metadata.</li>
<li><strong>ADF test</strong>: <code>tseries::adf.test()</code> — null is unit root; small p-value means stationary.</li>
<li><strong>auto.arima()</strong>: from <code>forecast</code> package — automatically selects optimal ARIMA order via AIC.</li>
<li><strong>ACF / PACF</strong>: <code>acf()</code> and <code>pacf()</code> — guide manual ARIMA order selection.</li>
<li><strong>Cointegration</strong>: when two I(1) series share a long-run equilibrium — test with Engle-Granger or Johansen.</li>
</ul>
<h3>Worked example</h3>
<pre>library(tseries); library(forecast)
set.seed(10)

n <- 120
# Simulate AR(2) process
y <- arima.sim(model=list(ar=c(0.6, -0.2)), n=n)
ts_y <- ts(y, start=c(2010,1), frequency=12)

# Unit root test
adf.test(ts_y)

# ACF/PACF
par(mfrow=c(1,2))
acf(ts_y, main="ACF"); pacf(ts_y, main="PACF")

# Fit ARIMA
fit <- auto.arima(ts_y)
summary(fit)
plot(forecast(fit, h=12))</pre>
<div class="watchout"><strong>Watch out:</strong> <code>auto.arima()</code> is a useful starting point but not always optimal. Always inspect the ACF/PACF of residuals after fitting — if they still show significant autocorrelation, the model order needs adjustment. Check residuals with <code>checkresiduals(fit)</code>.</div>`,
        exercise: `<h3>Exercise — Time series modeling</h3>
<p><strong>Scenario:</strong> Analyze quarterly GDP growth and build a short-horizon forecast model.</p>
<pre>library(tseries); library(forecast)
set.seed(25)

# Simulate quarterly GDP: non-stationary level, stationary growth
gdp_level <- cumsum(c(100, rnorm(79, 0.5, 1.5)))
gdp_growth <- diff(gdp_level) / head(gdp_level, -1) * 100
ts_level  <- ts(gdp_level, start=c(2005,1), frequency=4)
ts_growth <- ts(gdp_growth, start=c(2005,2), frequency=4)</pre>
<ul>
<li><strong>1.</strong> Run ADF on <code>ts_level</code> and <code>ts_growth</code>. Interpret both results.</li>
<li><strong>2.</strong> Plot ACF and PACF of <code>ts_growth</code>. What ARIMA order do they suggest?</li>
<li><strong>3.</strong> Fit <code>auto.arima(ts_growth)</code>. Check residuals with <code>checkresiduals()</code>. Is the fit adequate?</li>
<li><strong>4.</strong> Produce a 4-quarter ahead forecast with 80% and 95% prediction intervals. Plot it.</li>
</ul>
<p><strong>Expected output:</strong> ADF results with interpretation; ACF/PACF plots; ARIMA fit; forecast plot with intervals.</p>`
      },
    ]},
    { tier: "Advanced Methods", modules: [
      {
        id: "r_did",
        title: "Difference-in-differences in R",
        desc: "TWFE, Sun-Abraham, Callaway-Sant'Anna",
        lesson: `<h3>Overview</h3>
<p>R has become the leading environment for modern DiD methods. The <code>did</code> package implements Callaway-Sant'Anna (2021), which handles staggered treatment adoption without TWFE's bias. fixest's <code>sunab()</code> implements Sun-Abraham (2021).</p>
<h3>Key concepts</h3>
<ul>
<li><strong>TWFE DiD</strong>: <code>feols(y ~ treated*post | entity + time)</code> — valid only for simultaneous adoption.</li>
<li><strong>Staggered adoption problem</strong>: with different treatment timing, TWFE uses already-treated units as controls — can give wrong sign.</li>
<li><strong>Sun-Abraham</strong>: <code>feols(y ~ sunab(cohort, time) | entity + time)</code> — heterogeneity-robust.</li>
<li><strong>Event study plots</strong>: <code>iplot(model)</code> from fixest — plots dynamic treatment effects with CIs.</li>
<li><strong>Pre-trends test</strong>: coefficients for pre-treatment periods should be statistically and economically zero.</li>
</ul>
<h3>Worked example</h3>
<pre>library(fixest)
set.seed(42)

N <- 100; T <- 8
panel <- expand.grid(id=1:N, t=1:T)
panel$treated <- as.integer(panel$id > 50)
panel$post    <- as.integer(panel$t > 4)
panel$fe_i    <- rep(rnorm(N), each=T)
panel$y <- (2 + 0.5*panel$t + panel$fe_i
            + 1.5*panel$treated*panel$post
            + rnorm(N*T, 0, 0.5))

m_twfe <- feols(y ~ treated:i(t, ref=4) | id + t,
                panel, cluster=~id)
iplot(m_twfe, main="Event study: treatment effect by period")</pre>
<div class="watchout"><strong>Watch out:</strong> For staggered adoption designs, always use Sun-Abraham, Callaway-Sant'Anna, or similar heterogeneity-robust estimators instead of TWFE. TWFE can produce estimates with the wrong sign if treatment effect heterogeneity is large. Report sensitivity checks in any applied paper.</div>`,
        exercise: `<h3>Exercise — DiD event study</h3>
<p><strong>Scenario:</strong> Evaluate the impact of a state-level job training program rolled out in different years across states.</p>
<pre>library(fixest)
set.seed(11)

states <- 60; periods <- 10
panel <- expand.grid(state=1:states, t=1:periods)
panel <- panel[order(panel$state, panel$t), ]
# Treatment cohorts: some states treated in period 5, some in 7, never-treated
panel$cohort <- ifelse(panel$state <= 20, 5,
                ifelse(panel$state <= 40, 7, 0))
panel$treated <- as.integer(panel$cohort > 0 & panel$t >= panel$cohort)
panel$state_fe <- rep(rnorm(states, 0, 2), each=periods)
panel$y <- (10 + 0.5*panel$t + panel$state_fe
            + 2.0*panel$treated + rnorm(nrow(panel), 0, 1))</pre>
<ul>
<li><strong>1.</strong> Run a standard TWFE DiD. Report the treatment coefficient.</li>
<li><strong>2.</strong> Run an event study using <code>i(t, treated, ref=4)</code>. Plot with <code>iplot()</code>.</li>
<li><strong>3.</strong> Do the pre-period coefficients support parallel trends?</li>
<li><strong>4.</strong> Discuss in 2–3 sentences why staggered adoption complicates TWFE interpretation here.</li>
</ul>
<p><strong>Expected output:</strong> TWFE estimate; event study plot with pre-trend coefficients near zero; written discussion of staggered adoption issues.</p>`
      },
      {
        id: "r_rd",
        title: "Regression discontinuity in R",
        desc: "rdrobust, rddensity, rdplot",
        lesson: `<h3>Overview</h3>
<p>The <code>rdrobust</code> package provides state-of-the-art RD estimation in R — optimal bandwidth selection (CCT), bias-corrected estimates, and robust confidence intervals. It's the standard tool for applied RD work.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>rdrobust</strong>: <code>rdrobust(y, x, c=0)</code> — estimates local polynomial RD with CCT optimal bandwidth.</li>
<li><strong>Bias correction</strong>: rdrobust reports conventional, bias-corrected, and robust CIs — use robust for inference.</li>
<li><strong>rdplot</strong>: <code>rdplot(y, x)</code> — plots binned means with fitted polynomial on each side of cutoff.</li>
<li><strong>rddensity</strong>: McCrary-style density test for manipulation of the running variable.</li>
<li><strong>Bandwidth sensitivity</strong>: always report estimates at half and double the optimal bandwidth.</li>
</ul>
<h3>Worked example</h3>
<pre>library(rdrobust)
set.seed(5)

n <- 2000
x <- runif(n, -1, 1)     # running variable
d <- as.integer(x >= 0)  # sharp treatment at 0
y <- 1.5 + 2.0*x + 1.8*d + rnorm(n, 0, 0.5)

# RD plot
rdplot(y, x, title="RD Plot", x.label="Score", y.label="Outcome")

# Main estimate
out <- rdrobust(y, x, c=0)
summary(out)

# Density test (manipulation check)
library(rddensity)
rdd <- rddensity(x, c=0)
summary(rdd)</pre>
<div class="watchout"><strong>Watch out:</strong> rdrobust uses a local polynomial of order 1 by default on each side of the cutoff. The bandwidth is chosen optimally for the main coefficient — not for pre-specified values. Always report bandwidth-sensitivity results alongside your main estimate.</div>`,
        exercise: `<h3>Exercise — RD design</h3>
<p><strong>Scenario:</strong> Estimate the effect of Head Start eligibility (county poverty rate below 59.2% cutoff) on child outcomes.</p>
<pre>library(rdrobust); library(rddensity)
set.seed(22)

n <- 3000
poverty_rate <- runif(n, 40, 80)
eligible     <- as.integer(poverty_rate <= 59.2)
# True effect: +5 points on child development index
child_dev <- (60 - 0.3*(poverty_rate - 59.2) + 5*eligible
              + rnorm(n, 0, 4))</pre>
<ul>
<li><strong>1.</strong> Produce an <code>rdplot()</code> of <code>child_dev</code> vs <code>poverty_rate</code> with cutoff at 59.2. Do you see a discontinuity?</li>
<li><strong>2.</strong> Run <code>rdrobust(child_dev, poverty_rate, c=59.2)</code>. Report the bias-corrected robust estimate and its 95% CI.</li>
<li><strong>3.</strong> Test for density discontinuity at the cutoff using <code>rddensity</code>. What would a significant result imply?</li>
<li><strong>4.</strong> Run the estimator at bandwidths h=5 and h=15 (use <code>h=</code> argument). How sensitive is the estimate?</li>
</ul>
<p><strong>Expected output:</strong> rdplot with visible jump; main estimate ~5; rddensity non-significant; bandwidth sensitivity table.</p>`
      },
      {
        id: "r_viz",
        title: "Publication visualization with ggplot2",
        desc: "ggplot themes, coefficient plots, saving",
        lesson: `<h3>Overview</h3>
<p>ggplot2 is the gold standard for statistical visualization in R. Publication-quality figures for journals and consulting reports require attention to typography, color, axes, and layout. The <code>modelsummary</code> ecosystem integrates well for model plots.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Grammar of graphics</strong>: ggplot builds plots as layers — <code>aes()</code>, <code>geom_*()</code>, <code>scale_*()</code>, <code>theme_*()</code>.</li>
<li><strong>theme_minimal()</code></strong> or <code>theme_bw()</code>: clean base themes — customize with <code>theme()</code>.</li>
<li><strong>modelplot()</strong>: from modelsummary — coefficient plots from fitted models, ggplot-compatible.</li>
<li><strong>patchwork</strong>: combine multiple ggplot objects into multi-panel figures.</li>
<li><strong>ggsave()</strong>: <code>ggsave("fig.pdf", width=7, height=4, dpi=300)</code> for print-quality output.</li>
</ul>
<h3>Worked example — coefficient plot</h3>
<pre>library(tidyverse)
library(modelsummary)
library(fixest)
set.seed(42)

n <- 500
df <- data.frame(
  y   = rnorm(n),
  x1  = rnorm(n), x2 = rnorm(n),
  x3  = rnorm(n), x4 = rnorm(n),
  grp = sample(letters[1:5], n, replace=TRUE)
)
df$y <- with(df, 0.4*x1 - 0.2*x2 + 0.15*x3 + rnorm(n, 0, 0.8))

models <- list(
  "Spec 1" = feols(y ~ x1 + x2, df, vcov="HC1"),
  "Spec 2" = feols(y ~ x1 + x2 + x3 + x4, df, vcov="HC1"),
  "Spec 3" = feols(y ~ x1 + x2 + x3 + x4 | grp, df, cluster=~grp)
)
modelplot(models, coef_omit="Intercept") +
  geom_vline(xintercept=0, linetype="dashed", color="gray50") +
  theme_minimal(base_size=12) +
  labs(title="Coefficient estimates across specifications")

ggsave("coef_plot.pdf", width=7, height=3.5, bbox_inches="tight")</pre>
<div class="watchout"><strong>Watch out:</strong> ggplot's default colors and themes are recognizable as defaults — in consulting deliverables, always customize the theme. A consistent visual style across your outputs signals professionalism. Define a custom <code>theme_report()</code> function and reuse it across all figures in a project.</div>`,
        exercise: `<h3>Exercise — Publication figures</h3>
<p><strong>Scenario:</strong> Produce a two-panel publication figure: a coefficient plot and an event study, for a policy memo.</p>
<pre>library(tidyverse); library(fixest); library(patchwork)
set.seed(60)

# Event study data
N <- 80; T <- 8
panel <- expand.grid(id=1:N, t=1:T)
panel$treated <- as.integer(panel$id > 40)
panel$post    <- as.integer(panel$t > 4)
panel$fe_i    <- rep(rnorm(N), each=T)
panel$y <- (5 + 0.5*panel$t + panel$fe_i
            + 1.8*panel$treated*panel$post
            + rnorm(N*T, 0, 0.8))

m_es <- feols(y ~ treated:i(t, ref=4) | id + t, panel, cluster=~id)</pre>
<ul>
<li><strong>1.</strong> Use <code>iplot(m_es)</code> to check the event study. Then manually extract coefficients and CIs using <code>coeftable(m_es)</code> to recreate it as a ggplot with a clean publication theme.</li>
<li><strong>2.</strong> Create a second panel: a scatter of <code>y</code> by period for treated vs control, with <code>geom_smooth(method="lm")</code> lines for each group.</li>
<li><strong>3.</strong> Combine both panels using <code>patchwork</code> with panel labels (A) and (B).</li>
<li><strong>4.</strong> Save as a PDF at 300 DPI, 9 × 4 inches.</li>
</ul>
<p><strong>Expected output:</strong> Two-panel PDF figure: ggplot event study with clean theme and pre-trend near zero; scatter comparison panel.</p>`
      },
    ]},
  ],

  stata: [
    { tier: "Foundations", modules: [
      {
        id: "st_env",
        title: "Stata environment & workflow",
        desc: "do-files, log files, directory setup",
        lesson: `<h3>Overview</h3>
<p>Stata's strength is its integration of analysis and documentation. A disciplined Stata workflow — with do-files, log files, and a clean directory structure — produces fully reproducible work that others can verify and extend.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Do-files</strong>: all analysis goes in <code>.do</code> files — never just the command window. This is your reproducibility guarantee.</li>
<li><strong>Log files</strong>: <code>log using "analysis.log", replace</code> captures all output. Close with <code>log close</code>.</li>
<li><strong>Global macros</strong>: <code>global data "C:/project/data"</code> — define root paths once, use <code>$data</code> everywhere.</li>
<li><strong>Comments</strong>: <code>*</code> for full-line comments, <code>//</code> for inline, <code>/* */</code> for blocks — comment everything.</li>
<li><strong>version</strong>: put <code>version 17</code> at the top of every do-file to ensure future compatibility.</li>
</ul>
<h3>Worked example — master do-file structure</h3>
<pre>* master.do — Project: Wage Analysis
version 17
clear all
set more off

* Directory globals
global root   "C:/wage_project"
global data   "$root/data"
global output "$root/output"

* Log everything
log using "$output/analysis.log", replace text

* Run scripts in order
do "$root/1_import.do"
do "$root/2_clean.do"
do "$root/3_analysis.do"

log close</pre>
<div class="watchout"><strong>Watch out:</strong> Never use absolute paths like <code>C:/Users/yourname/...</code> in shared do-files. Define all paths using global macros at the top — this is the one place where paths appear. Everyone else just changes the <code>global root</code> line.</div>`,
        exercise: `<h3>Exercise — Stata workflow setup</h3>
<p><strong>Scenario:</strong> Set up a professional Stata project structure for a minimum wage study.</p>
<ul>
<li><strong>1.</strong> Write a <code>master.do</code> that: sets <code>version 17</code>, <code>clear all</code>, <code>set more off</code>; defines globals for root, data, and output directories.</li>
<li><strong>2.</strong> Open a log file that saves to your output folder. Include the date in the filename using <code>%td</code> format.</li>
<li><strong>3.</strong> Write a short do-file that creates a simulated dataset: 500 observations, variables <code>wage</code> (lognormal), <code>educ</code> (uniform integer 8–20), <code>female</code> (Bernoulli 0.5). Use <code>set seed 42</code>.</li>
<li><strong>4.</strong> Save the dataset to your <code>data/raw</code> folder and close the log.</li>
</ul>
<p><strong>Expected output:</strong> A working <code>master.do</code>, a simulated dataset saved as <code>.dta</code>, and a log file with all output captured.</p>`
      },
      {
        id: "st_import",
        title: "Importing & inspecting data",
        desc: "import delimited, use, codebook, describe",
        lesson: `<h3>Overview</h3>
<p>Stata can read most data formats directly. Before any analysis, always inspect your data systematically — variable types, missings, distributions, and plausibility checks. Stata's codebook and tabulate commands make this fast.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>import delimited</strong>: reads CSV files — always check <code>varnames(1)</code> and <code>encoding("utf-8")</code>.</li>
<li><strong>use</strong>: loads Stata <code>.dta</code> files. Use <code>clear</code> or <code>use ..., clear</code>.</li>
<li><strong>describe</strong>: variable names, types, labels, and format — your first stop after loading.</li>
<li><strong>codebook</strong>: detailed info per variable — range, missing count, unique values.</li>
<li><strong>tabulate</strong>: frequency tables for categorical variables; add <code>missing</code> option to see missings as a category.</li>
</ul>
<h3>Worked example</h3>
<pre>clear all
set seed 1

* Generate a sample dataset
set obs 500
gen wage   = exp(rnormal(3.0, 0.4))
gen educ   = round(8 + runiform()*12)
gen female = rbinomial(1, 0.48)
gen region = ceil(runiform()*4)
label define reg 1 "NE" 2 "MW" 3 "S" 4 "W"
label values region reg

* Replace some wages as missing
replace wage = . if _n <= 20 & runiform() < 0.5

* Inspect
describe
codebook wage educ female
tabulate region, missing
summarize wage educ, detail</pre>
<div class="watchout"><strong>Watch out:</strong> Stata codes missing values as <code>.</code> (numeric) or <code>""</code> (string). In conditional logic, <code>. > any_positive_number</code> is TRUE — so <code>if wage > 50000</code> will silently include missing observations. Always add <code>& !missing(wage)</code> to conditionals.</div>`,
        exercise: `<h3>Exercise — Data inspection</h3>
<p><strong>Scenario:</strong> You receive a county-level economic dataset as a CSV. Inspect it before any analysis.</p>
<pre>* Generate the dataset programmatically for this exercise
clear all
set seed 7
set obs 400
gen county_id   = _n
gen state       = ceil(runiform()*5)
gen unemp_rate  = 2.5 + runiform()*9.5
gen med_income  = exp(rnormal(10.8, 0.3))
gen pop_density = rexponential(200)
gen year        = 2018 + ceil(runiform()*4)
* Introduce missings
replace unemp_rate = . if runiform() < 0.075</pre>
<ul>
<li><strong>1.</strong> Run <code>describe</code> and <code>codebook</code> on all variables. How many missing values does <code>unemp_rate</code> have?</li>
<li><strong>2.</strong> Run <code>summarize, detail</code> on <code>wage</code> and <code>med_income</code>. Note any suspicious values.</li>
<li><strong>3.</strong> Tabulate <code>state</code> and <code>year</code> with the <code>missing</code> option.</li>
<li><strong>4.</strong> Find the county with the highest <code>pop_density</code>. What are its <code>state</code> and <code>unemp_rate</code> values?</li>
</ul>
<p><strong>Expected output:</strong> Codebook output; missing count for unemp_rate; tabulations; the max-density county's attributes.</p>`
      },
      {
        id: "st_clean",
        title: "Data cleaning in Stata",
        desc: "replace, recode, egen, reshape",
        lesson: `<h3>Overview</h3>
<p>Stata's data cleaning commands are concise and powerful. The combination of <code>generate</code>, <code>replace</code>, <code>recode</code>, and <code>egen</code> handles most cleaning tasks without loops. Reshaping between wide and long is essential for panel work.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>generate / replace</strong>: create and modify variables — <code>gen lwage = log(wage)</code>.</li>
<li><strong>recode</strong>: efficiently recode values — <code>recode educ (1/11=1)(12=2)(13/15=3)(16/20=4), gen(educ_cat)</code>.</li>
<li><strong>egen</strong>: extended generate — <code>egen mean_wage = mean(wage), by(state)</code> for group statistics.</li>
<li><strong>reshape long/wide</strong>: reshape long for panel analysis; reshape wide for comparison tables.</li>
<li><strong>merge</strong>: 1:1, m:1, 1:m — Stata enforces that you declare the match type; always check <code>_merge</code>.</li>
</ul>
<h3>Worked example</h3>
<pre>clear all; set seed 3; set obs 400
gen wage   = exp(rnormal(3.0, 0.4))
gen educ   = round(8 + runiform()*12)
gen female = rbinomial(1, 0.5)
gen state  = ceil(runiform()*10)

* Variable construction
gen lwage = log(wage)
gen exper = round(runiform()*40)
gen exper2 = exper^2

* Group means via egen
egen state_mean_wage = mean(wage), by(state)
gen rel_wage = wage / state_mean_wage

* Reshape: wide → long (for panel)
* Imagine 2 period wages
gen wage_t1 = wage
gen wage_t2 = wage * (1 + rnormal(0.05, 0.1))
reshape long wage_t, i(state female educ) j(period)
list in 1/5</pre>
<div class="watchout"><strong>Watch out:</strong> After <code>merge</code>, always <code>tab _merge</code> before dropping the merge indicator. <code>_merge==1</code> means unmatched from master (left); <code>_merge==2</code> means unmatched from using (right); <code>_merge==3</code> means matched. Silently proceeding without checking can mean you're analyzing an incomplete dataset.</div>`,
        exercise: `<h3>Exercise — Cleaning & reshaping</h3>
<p><strong>Scenario:</strong> Clean a raw CPS extract and reshape for panel analysis.</p>
<pre>clear all; set seed 15; set obs 500
gen hourly_wage = exp(rnormal(3.1, 0.5))
* Introduce bad codings
replace hourly_wage = -99  if _n <= 10
replace hourly_wage = 9999 if _n >= 491
gen educ_code = ceil(runiform()*5)
gen age       = round(22 + runiform()*43)
replace age   = . if _n >= 481
gen industry  = ceil(runiform()*6)
gen female    = rbinomial(1, 0.5)</pre>
<ul>
<li><strong>1.</strong> Replace coded missing values (-99 and 9999) with <code>.</code> in <code>hourly_wage</code>.</li>
<li><strong>2.</strong> Winsorize <code>hourly_wage</code> at the 1st and 99th percentiles using <code>_pctile</code> and <code>replace</code>.</li>
<li><strong>3.</strong> Use <code>recode</code> to create an ordered education category from <code>educ_code</code> (1=LT HS, 2=HS, 3=Some College, 4=BA, 5=Graduate). Label the values.</li>
<li><strong>4.</strong> Impute missing <code>age</code> with the sample median. Generate <code>lwage = log(hourly_wage)</code>. Save the cleaned data.</li>
</ul>
<p><strong>Expected output:</strong> Clean dataset with no implausible wages, proper education categories, labeled values, and imputed ages.</p>`
      },
    ]},
    { tier: "Core Econometrics", modules: [
      {
        id: "st_ols",
        title: "OLS regression in Stata",
        desc: "regress, robust, outreg2, coefplot",
        lesson: `<h3>Overview</h3>
<p>Stata's <code>regress</code> command is the foundation of empirical work. It integrates cleanly with robust and clustered standard errors, and with output tools like <code>outreg2</code> and <code>estout</code> for publication tables.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>regress y x1 x2</strong>: base OLS — always follow with <code>, robust</code> in applied work.</li>
<li><strong>vce(cluster varname)</strong>: cluster-robust standard errors — standard for panel and grouped data.</li>
<li><strong>i. prefix</strong>: creates dummy variables automatically — <code>i.state</code>, <code>i.year</code>.</li>
<li><strong>outreg2</strong>: export regression tables to Word or LaTeX — requires installation (<code>ssc install outreg2</code>).</li>
<li><strong>eststo / esttab</strong>: store estimates and produce tables — more flexible than outreg2 for complex tables.</li>
</ul>
<h3>Worked example</h3>
<pre>clear all; set seed 42; set obs 800
gen educ   = round(8 + runiform()*12)
gen exper  = round(runiform()*42)
gen female = rbinomial(1, 0.5)
gen union  = rbinomial(1, 0.14)
gen sector = ceil(runiform()*4)
gen lwage  = 0.8 + 0.11*educ + 0.04*exper - 0.20*female ///
             + 0.15*union + rnormal(0, 0.45)

* Baseline OLS
regress lwage educ exper female union, robust

* With sector fixed effects
regress lwage educ exper female union i.sector, robust

* Store and export
eststo m1: regress lwage educ exper female, robust
eststo m2: regress lwage educ exper female union i.sector, robust
esttab m1 m2, star(* 0.1 ** 0.05 *** 0.01) se r2</pre>
<div class="watchout"><strong>Watch out:</strong> Stata's <code>regress</code> without <code>, robust</code> uses homoskedastic standard errors. In practice, always use <code>, robust</code> or <code>, vce(cluster id)</code>. Forgetting this is one of the most common errors in student-produced empirical work.</div>`,
        exercise: `<h3>Exercise — OLS regression</h3>
<p><strong>Scenario:</strong> Estimate a Mincer equation across specifications and produce a regression table.</p>
<pre>clear all; set seed 21; set obs 1000
gen educ   = round(8 + runiform()*12)
gen exper  = round(runiform()*42)
gen exper2 = exper^2
gen female = rbinomial(1, 0.5)
gen union  = rbinomial(1, 0.14)
gen sector = ceil(runiform()*4)
label define sec 1 "Mfg" 2 "Services" 3 "Govt" 4 "Retail"
label values sector sec
gen lwage = 0.8 + 0.11*educ + 0.04*exper - 0.0005*exper2 ///
            + 0.14*union - 0.20*female + rnormal(0, 0.45)</pre>
<ul>
<li><strong>1.</strong> Run OLS with robust SEs: (1) baseline with educ + exper + exper2; (2) add female and union; (3) add sector dummies.</li>
<li><strong>2.</strong> Use <code>eststo</code> and <code>esttab</code> to display all three side by side with standard errors and stars.</li>
<li><strong>3.</strong> Calculate the return to education (%) from model 3 and the peak experience level.</li>
<li><strong>4.</strong> Run <code>coefplot</code> for model 3 (install via <code>ssc install coefplot</code> if needed).</li>
</ul>
<p><strong>Expected output:</strong> Three-column regression table; ~11% return to education; ~40 peak experience; coefficient plot.</p>`
      },
      {
        id: "st_diag",
        title: "Regression diagnostics in Stata",
        desc: "estat hettest, ovtest, vif",
        lesson: `<h3>Overview</h3>
<p>Stata provides post-estimation commands (<code>estat</code>) that run diagnostic tests on the most recently estimated model. These should be a standard part of any regression workflow.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>estat hettest</strong>: Breusch-Pagan test for heteroskedasticity — run after <code>regress</code>.</li>
<li><strong>estat ovtest</strong>: Ramsey RESET test for omitted nonlinearities.</li>
<li><strong>estat vif</strong>: variance inflation factors — available after <code>regress</code>.</li>
<li><strong>rvfplot</strong>: residual-vs-fitted plot — first visual check for heteroskedasticity.</li>
<li><strong>predict, resid</strong>: save residuals for manual diagnostic checks.</li>
</ul>
<h3>Worked example</h3>
<pre>clear all; set seed 8; set obs 500
gen educ  = round(8 + runiform()*12)
gen exper = round(runiform()*40)
* Heteroskedastic: variance scales with educ
gen sigma = 0.2 + 0.04*educ
gen lwage = 1.0 + 0.10*educ + 0.02*exper + rnormal(0, sigma)

regress lwage educ exper

* Diagnostic tests
estat hettest            // Breusch-Pagan
estat ovtest             // RESET
estat vif                // VIF

* Residual plot
rvfplot, yline(0) title("Residuals vs Fitted")</pre>
<div class="watchout"><strong>Watch out:</strong> <code>estat hettest</code> only works after OLS without the <code>robust</code> option — Stata will error if you try it after <code>regress ..., robust</code>. Run diagnostics on the non-robust model first, then re-estimate with robust SEs for inference.</div>`,
        exercise: `<h3>Exercise — Regression diagnostics</h3>
<p><strong>Scenario:</strong> Run a full diagnostic suite on a wage regression with built-in heteroskedasticity.</p>
<pre>clear all; set seed 55; set obs 600
gen educ  = round(8 + runiform()*12)
gen exper = round(runiform()*45)
gen tenure= round(runiform()*20)
gen female= rbinomial(1, 0.5)
gen sigma = 0.15 + 0.04*educ
gen lwage = 1.0 + 0.10*educ + 0.02*exper + 0.01*tenure ///
            - 0.18*female + rnormal(0, sigma)</pre>
<ul>
<li><strong>1.</strong> Estimate OLS (without robust). Run <code>estat hettest</code>. Interpret the result.</li>
<li><strong>2.</strong> Run <code>estat ovtest</code>. What is the null hypothesis?</li>
<li><strong>3.</strong> Run <code>estat vif</code>. Are any variables above 10?</li>
<li><strong>4.</strong> Produce an <code>rvfplot</code>. Does it show the fan-shaped pattern expected from heteroskedasticity?</li>
</ul>
<p><strong>Expected output:</strong> BP test rejection; RESET interpretation; VIF table; rvfplot with fan pattern.</p>`
      },
      {
        id: "st_iv",
        title: "Instrumental variables in Stata",
        desc: "ivregress, first stage, estat firststage",
        lesson: `<h3>Overview</h3>
<p>Stata's <code>ivregress</code> command implements 2SLS, LIML, and GMM estimation. It's the standard tool for IV in applied microeconomics and integrates seamlessly with <code>estat firststage</code> for first-stage diagnostics.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>ivregress 2sls y controls (endog = instruments)</strong>: core IV syntax — endogenous variables in parentheses, instrumented by what follows <code>=</code>.</li>
<li><strong>estat firststage</strong>: reports first-stage F-statistics with Stock-Yogo critical values.</li>
<li><strong>estat endogenous</strong>: Wu-Hausman test — tests whether OLS is inconsistent (is the variable actually endogenous?).</li>
<li><strong>estat overid</strong>: Sargan-Hansen over-identification test — only available with more instruments than endogenous variables.</li>
<li><strong>robust and vce(cluster)</strong>: available with <code>ivregress</code> just like <code>regress</code>.</li>
</ul>
<h3>Worked example</h3>
<pre>clear all; set seed 13; set obs 1000
gen proximity = runiform()*100     // instrument
gen ability   = rnormal()          // unobserved
gen educ  = 14 - 0.05*proximity + 0.8*ability + rnormal(0,1)
gen lwage = 1.0 + 0.12*educ + 0.5*ability + rnormal(0,0.5)

* OLS (biased)
regress lwage educ, robust

* 2SLS
ivregress 2sls lwage (educ = proximity), robust

* First-stage diagnostics
estat firststage     // F-stat and Stock-Yogo critical values
estat endogenous     // Wu-Hausman endogeneity test</pre>
<div class="watchout"><strong>Watch out:</strong> <code>estat firststage</code> reports the F-statistic testing all excluded instruments in the first stage. With multiple instruments, a high joint F doesn't mean each instrument is individually strong — individual t-statistics in the first stage matter too.</div>`,
        exercise: `<h3>Exercise — IV estimation</h3>
<p><strong>Scenario:</strong> Estimate returns to education using proximity to college as instrument, with state-level controls.</p>
<pre>clear all; set seed 88; set obs 1500
gen proximity = runiform()*80
gen ability   = rnormal()
gen state     = ceil(runiform()*30)
gen educ  = 12 - 0.04*proximity + 0.6*ability + rnormal(0,1.5)
gen lwage = 0.5 + 0.15*educ + 0.4*ability + rnormal(0,0.5)</pre>
<ul>
<li><strong>1.</strong> Run OLS. Run 2SLS with <code>proximity</code> as instrument. Compare coefficients.</li>
<li><strong>2.</strong> Run <code>estat firststage</code>. Report the F-stat and state whether it passes the Stock-Yogo threshold.</li>
<li><strong>3.</strong> Run <code>estat endogenous</code>. Can you reject the null that OLS is consistent?</li>
<li><strong>4.</strong> Re-run 2SLS adding <code>i.state</code> controls. How do results change? Use <code>esttab</code> to display OLS, IV, and IV+state side by side.</li>
</ul>
<p><strong>Expected output:</strong> OLS biased upward; 2SLS ~0.15; strong first stage (F>10); endogeneity rejection; table with three specifications.</p>`
      },
      {
        id: "st_panel",
        title: "Panel data in Stata",
        desc: "xtset, xtreg, reghdfe, clustered SEs",
        lesson: `<h3>Overview</h3>
<p>Stata is the dominant environment for panel econometrics in applied economics. <code>xtset</code> declares the panel structure, and <code>reghdfe</code> (community-contributed) handles high-dimensional fixed effects efficiently.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>xtset id time</strong>: declares panel structure — required before all xt commands.</li>
<li><strong>xtreg, fe</strong>: within estimator (entity FE). <code>xtreg, re</code>: random effects — test which is appropriate with Hausman.</li>
<li><strong>reghdfe</strong>: handles two-way and high-dimensional FE efficiently — use instead of absorbing many dummies manually.</li>
<li><strong>absorb(id year)</strong>: absorbs entity and time fixed effects without adding dummy columns.</li>
<li><strong>Clustering</strong>: <code>vce(cluster id)</code> — standard for panel data.</li>
</ul>
<h3>Worked example</h3>
<pre>* Install reghdfe if needed: ssc install reghdfe
clear all; set seed 20
set obs 1000    // 100 firms x 10 years
gen id   = ceil(_n/10)
gen year = mod(_n-1, 10) + 2010
gen fe_i = rnormal() if !missing(id)
bysort id: replace fe_i = fe_i[1]
gen x    = rnormal() + 0.3*fe_i
gen y    = 1.5*x + fe_i + rnormal(0, 0.5)

xtset id year

* Pooled OLS (biased)
regress y x, robust

* Entity FE
xtreg y x, fe vce(cluster id)

* Two-way FE with reghdfe
reghdfe y x, absorb(id year) vce(cluster id)</pre>
<div class="watchout"><strong>Watch out:</strong> <code>xtreg, fe</code> absorbs entity effects but not time effects. For two-way FE (the standard in most modern applied work), use <code>reghdfe</code> with <code>absorb(id year)</code>. Forgetting time FE when there are aggregate time trends will confound your treatment effect.</div>`,
        exercise: `<h3>Exercise — Panel fixed effects</h3>
<p><strong>Scenario:</strong> Estimate the effect of minimum wage on employment using a state-year panel.</p>
<pre>clear all; set seed 33
set obs 500   // 50 states x 10 years
gen state  = ceil(_n/10)
gen year   = mod(_n-1,10) + 2013
gen fe_s   = rnormal(0,2) if state != state[_n-1] | _n==1
bysort state: replace fe_s = fe_s[1]
gen min_wage = 5 + runiform()*7
gen teen_emp = 30 - 0.8*min_wage + fe_s + rnormal(0,2)

xtset state year</pre>
<ul>
<li><strong>1.</strong> Run pooled OLS with robust SEs. Run <code>xtreg, fe</code> with clustered SEs. Run <code>reghdfe</code> with state and year FE.</li>
<li><strong>2.</strong> Use <code>eststo</code> and <code>esttab</code> to display all three estimates.</li>
<li><strong>3.</strong> How does the <code>min_wage</code> coefficient change? Which specification do you trust most and why?</li>
<li><strong>4.</strong> Run the Hausman test comparing FE vs RE. Interpret the result.</li>
</ul>
<p><strong>Expected output:</strong> Three-column table; TWFE estimate ~-0.8; Hausman test favoring FE; written explanation of specification choice.</p>`
      },
      {
        id: "st_ts",
        title: "Time series in Stata",
        desc: "tsset, dfuller, arima, ac/pac",
        lesson: `<h3>Overview</h3>
<p>Stata's time series capabilities are comprehensive. After declaring the time structure with <code>tsset</code>, all time series operators (<code>L.</code>, <code>D.</code>, <code>F.</code>) become available, and specialized commands like <code>dfuller</code> and <code>arima</code> handle standard diagnostics and modeling.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>tsset time</strong>: declares time series structure — enables time operators and ts commands.</li>
<li><strong>L.x</strong>: one lag of x; <strong>D.x</strong>: first difference; <strong>F.x</strong>: one lead.</li>
<li><strong>dfuller</strong>: augmented Dickey-Fuller test — <code>dfuller y, lags(4) trend regress</code>.</li>
<li><strong>ac / pac</strong>: autocorrelation and partial autocorrelation plots — guide ARIMA order selection.</li>
<li><strong>arima</strong>: fits ARIMA models — <code>arima y, arima(1,1,0)</code> for ARIMA(1,1,0).</li>
</ul>
<h3>Worked example</h3>
<pre>clear all; set seed 10
set obs 120
gen t = _n
tsset t

* AR(1) process
gen e = rnormal()
gen y = 0 in 1
replace y = 0.7*L.y + e if _n > 1

* Unit root test
dfuller y, lags(2) trend

* ACF and PACF
ac y, lags(20)
pac y, lags(20)

* Fit ARIMA(1,0,0)
arima y, arima(1,0,0)
predict resid_ar1, resid
ac resid_ar1, lags(20)</pre>
<div class="watchout"><strong>Watch out:</strong> Regressing levels of non-stationary time series on each other produces spurious results — high R², significant t-stats, but economically meaningless relationships. Always test for stationarity with <code>dfuller</code> (or <code>dfgls</code>) before any time series regression. If in doubt, difference the data.</div>`,
        exercise: `<h3>Exercise — Time series modeling</h3>
<p><strong>Scenario:</strong> Analyze and model a quarterly GDP growth series.</p>
<pre>clear all; set seed 77
set obs 80
gen quarter = _n
tsset quarter
* Non-stationary GDP level
gen gdp_level = sum(rnormal(0.3, 1.5)) + 100
gen gdp_growth = (gdp_level - L.gdp_level) / L.gdp_level * 100</pre>
<ul>
<li><strong>1.</strong> Run <code>dfuller gdp_level, trend lags(4)</code>. Can you reject the unit root?</li>
<li><strong>2.</strong> Run <code>dfuller gdp_growth, lags(4)</code>. What changes?</li>
<li><strong>3.</strong> Plot ACF and PACF of <code>gdp_growth</code>. What ARIMA order do they suggest?</li>
<li><strong>4.</strong> Fit <code>arima gdp_growth, arima(1,0,0)</code>. Report the AR(1) coefficient. Check residual ACF. Is the model adequate?</li>
</ul>
<p><strong>Expected output:</strong> ADF results (unit root in level, stationary in growth); ACF/PACF plots; ARIMA fit; residual ACF with no significant lags.</p>`
      },
    ]},
    { tier: "Advanced Methods", modules: [
      {
        id: "st_did",
        title: "Difference-in-differences in Stata",
        desc: "DiD regression, event study, parallel trends",
        lesson: `<h3>Overview</h3>
<p>DiD is ubiquitous in policy evaluation. Stata's community-contributed <code>csdid</code> package implements Callaway-Sant'Anna (2021) for staggered adoption, while TWFE with interaction terms handles the classic 2×2 case.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>Classic DiD</strong>: <code>regress y treated##post, vce(cluster id)</code> — the <code>##</code> syntax creates the interaction and main effects automatically.</li>
<li><strong>Event study</strong>: replace <code>post</code> with period dummies and interact with <code>treated</code>.</li>
<li><strong>reghdfe with interactions</strong>: efficient TWFE DiD with high-dimensional FE.</li>
<li><strong>csdid</strong>: <code>ssc install csdid</code> — implements Callaway-Sant'Anna for staggered designs.</li>
<li><strong>Pre-trends</strong>: F-test that all pre-period interaction coefficients are jointly zero.</li>
</ul>
<h3>Worked example</h3>
<pre>* Install if needed: ssc install reghdfe
clear all; set seed 42
set obs 800   // 100 firms x 8 periods
gen firm   = ceil(_n/8)
gen period = mod(_n-1,8) + 1
gen treated= (firm > 50)
gen post   = (period > 4)
gen fe_i   = rnormal(0,1) if firm != firm[_n-1] | _n==1
bysort firm: replace fe_i = fe_i[1]
gen y = 2 + 0.5*period + fe_i + 1.5*treated*post + rnormal(0,0.5)

* TWFE DiD
reghdfe y treated#post, absorb(firm period) vce(cluster firm)

* Event study: interact treated with period dummies
forvalues p = 1/8 {
  gen tp\`p' = treated*(period==\`p')
}
reghdfe y tp1-tp8, absorb(firm period) vce(cluster firm)
* Period 4 is reference — check pre-period coefficients</pre>
<div class="watchout"><strong>Watch out:</strong> When specifying an event study in Stata, always omit one pre-treatment period as the reference (usually the period just before treatment). If you forget to omit a period, Stata will drop one automatically but may not choose the intuitive reference period.</div>`,
        exercise: `<h3>Exercise — DiD event study</h3>
<p><strong>Scenario:</strong> Evaluate a state job training program on employment using DiD.</p>
<pre>clear all; set seed 11
set obs 400   // 40 states x 10 periods
gen state  = ceil(_n/10)
gen period = mod(_n-1,10) + 1
gen treated= (state > 20)
gen post   = (period > 5)
gen fe_s   = rnormal(0,2) if state != state[_n-1] | _n==1
bysort state: replace fe_s = fe_s[1]
gen emp = 50 + 2*period + fe_s - 3*treated*post + rnormal(0,2)

xtset state period</pre>
<ul>
<li><strong>1.</strong> Run TWFE DiD using <code>reghdfe emp treated#post, absorb(state period) vce(cluster state)</code>. How close is the estimate to the true ATT of -3?</li>
<li><strong>2.</strong> Generate period interaction terms. Omit period 5 as reference. Run the event study regression.</li>
<li><strong>3.</strong> Use <code>coefplot</code> to plot the event study coefficients with confidence intervals. Do pre-period coefficients support parallel trends?</li>
<li><strong>4.</strong> Run an F-test that all pre-treatment coefficients are jointly zero (<code>test</code> command).</li>
</ul>
<p><strong>Expected output:</strong> TWFE estimate ~-3; event study plot; pre-period F-test non-significant; coefplot showing zero pre-trends.</p>`
      },
      {
        id: "st_rd",
        title: "Regression discontinuity in Stata",
        desc: "rdrobust, rdplot, rddensity",
        lesson: `<h3>Overview</h3>
<p>Stata's <code>rdrobust</code>, <code>rdplot</code>, and <code>rddensity</code> packages (available via SSC) provide a complete RD toolkit. These are the same algorithms used in R's rdrobust package — developed by the same authors.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>rdrobust</strong>: <code>rdrobust y x, c(cutoff)</code> — optimal bandwidth, bias correction, robust inference.</li>
<li><strong>rdplot</strong>: binned scatter plot around the cutoff — essential first visual check.</li>
<li><strong>rddensity</strong>: density continuity test (McCrary test successor) — checks for manipulation.</li>
<li><strong>Bandwidth sensitivity</strong>: use <code>h()</code> option to test alternative bandwidths.</li>
<li><strong>Covariates</strong>: add <code>covs(x1 x2)</code> to rdrobust for covariate-adjusted RD.</li>
</ul>
<h3>Worked example</h3>
<pre>* Install: ssc install rdrobust; ssc install rddensity
clear all; set seed 5; set obs 2000
gen x = runiform(-1,1)   // running variable
gen d = (x >= 0)
gen y = 1.5 + 2.0*x + 1.8*d + rnormal(0, 0.5)

* Visualization
rdplot y x, c(0) graph_options(title("RD Plot"))

* Main RD estimate
rdrobust y x, c(0)

* Density test for manipulation
rddensity x, c(0)</pre>
<div class="watchout"><strong>Watch out:</strong> rdrobust by default uses a triangular kernel and local linear regression. The default output shows conventional, bias-corrected, and robust confidence intervals — use the <strong>robust</strong> row for inference, not the conventional row. This is a common misreading of rdrobust output.</div>`,
        exercise: `<h3>Exercise — RD design</h3>
<p><strong>Scenario:</strong> Estimate the effect of a scholarship program on earnings. Scholarship awarded to students with test score ≥ 70.</p>
<pre>clear all; set seed 22; set obs 3000
gen score      = 50 + runiform()*50
gen scholarship= (score >= 70)
gen earnings   = 25000 + 8000*scholarship + 400*(score-70) + rnormal(0,3000)</pre>
<ul>
<li><strong>1.</strong> Run <code>rdplot earnings score, c(70)</code>. Does the plot show a clear discontinuity?</li>
<li><strong>2.</strong> Run <code>rdrobust earnings score, c(70)</code>. Report the robust estimate and 95% CI.</li>
<li><strong>3.</strong> Run at <code>h(5)</code> and <code>h(15)</code>. Does the estimate change substantially?</li>
<li><strong>4.</strong> Run <code>rddensity score, c(70)</code>. Interpret the result — is there evidence of manipulation?</li>
</ul>
<p><strong>Expected output:</strong> rdplot with clear jump at 70; rdrobust estimate ~8000; bandwidth robustness; rddensity interpretation.</p>`
      },
      {
        id: "st_viz",
        title: "Visualization & output in Stata",
        desc: "twoway, coefplot, outreg2, LaTeX export",
        lesson: `<h3>Overview</h3>
<p>Professional output in Stata combines publication-quality graphs with structured regression tables. The combination of Stata's <code>twoway</code> graphing system, <code>coefplot</code>, and <code>esttab</code> covers most applied research needs.</p>
<h3>Key concepts</h3>
<ul>
<li><strong>twoway</strong>: Stata's main graphing command — combine multiple plot types with <code>(scatter ...) (line ...)</code>.</li>
<li><strong>scheme</strong>: graph color schemes — <code>set scheme s2color</code> or download custom schemes like <code>blindschemes</code>.</li>
<li><strong>coefplot</strong>: coefficient plots with CIs from stored estimates — highly customizable.</li>
<li><strong>esttab / outreg2</strong>: export regression tables to LaTeX, RTF, or CSV for Word.</li>
<li><strong>graph export</strong>: <code>graph export "fig.pdf", replace</code> — always export to PDF or EPS for publication.</li>
</ul>
<h3>Worked example — event study plot with twoway</h3>
<pre>clear all; set seed 60
* Event study coefficients
set obs 9
gen period = _n - 5     // periods -4 to +4
gen coef   = cond(period < 0, rnormal(0,0.1), rnormal(1.2*period, 0.15))
gen se     = cond(period==0, 0, 0.15)
gen ci_lo  = coef - 1.96*se
gen ci_hi  = coef + 1.96*se

twoway ///
  (rcap ci_lo ci_hi period, lcolor(navy) lwidth(thin)) ///
  (scatter coef period, mcolor(navy) msymbol(circle)) ///
  , xline(0, lpattern(dash) lcolor(gray)) ///
    yline(0, lpattern(dash) lcolor(gray)) ///
    xlabel(-4(1)4) xtitle("Period relative to treatment") ///
    ytitle("Estimated effect") title("Event Study") ///
    legend(off) scheme(s2color)

graph export "event_study.pdf", replace</pre>
<div class="watchout"><strong>Watch out:</strong> Stata graphs default to the <code>s2color</code> scheme which has a gray background — for most journal submissions, switch to <code>s1mono</code> (black and white) or a clean custom scheme. Always check journal figure requirements before submission.</div>`,
        exercise: `<h3>Exercise — Research visualization</h3>
<p><strong>Scenario:</strong> Produce a two-panel figure for a policy memo: a coefficient plot and a parallel trends visualization.</p>
<pre>clear all; set seed 42; set obs 400
gen state  = ceil(_n/10)
gen period = mod(_n-1,10)+1
gen treated= (state > 20)
gen fe_s   = rnormal(0,2) if state!=state[_n-1]|_n==1
bysort state: replace fe_s = fe_s[1]
gen y = 5 + 0.5*period + fe_s + 1.8*treated*(period>5) + rnormal(0,0.8)
xtset state period</pre>
<ul>
<li><strong>1.</strong> Store estimates from three specifications: pooled OLS, state FE, and TWFE. Use <code>coefplot</code> to plot the <code>treated</code> interaction coefficient across all three with CIs.</li>
<li><strong>2.</strong> Compute mean <code>y</code> by period and treated group using <code>collapse (mean) y, by(period treated)</code>. Plot both series as connected lines using <code>twoway</code>. Add a vertical line at period 5.</li>
<li><strong>3.</strong> Export both plots as PDFs and combine them into a labeled two-graph output using <code>graph combine</code>.</li>
<li><strong>4.</strong> Export a regression table of all three specifications to RTF using <code>esttab</code>.</li>
</ul>
<p><strong>Expected output:</strong> Coefficient comparison plot; parallel trends plot with treatment timing; combined PDF; RTF regression table.</p>`
      },
    ]},
  ],
};
