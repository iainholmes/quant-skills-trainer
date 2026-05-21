const CURRICULUM = {
  python: [
    {
      tier: "Core Econometrics",
      modules: [
        {
          id: 'glm_bridge',
          title: 'GLM Bridge (Logit, Poisson, Tobit)',
          desc: 'Moving from linear OLS to discrete and censored outcomes',
          lesson: `<h3>The GLM Syntax Bridge</h3><p>You have been routed here because your research design involves a non-linear outcome (binary, count, or censored). While your data-wrangling and workflow remain identical to OLS, you must swap your estimation function.</p><h3>R (fixest)</h3><p>Replace <code>feols(y ~ x1 + x2)</code> with <code>feglm(y ~ x1 + x2, family=binomial('logit'))</code>.</p><h3>Stata</h3><p>Replace <code>regress y x1 x2</code> with <code>logit y x1 x2</code> or <code>poisson y x1 x2</code>.</p><h3>Python (statsmodels)</h3><p>Replace <code>smf.ols(formula='y ~ x1 + x2', data=df).fit()</code> with <code>smf.logit(formula='y ~ x1 + x2', data=df).fit()</code>.</p><div class="watchout"><strong>Watch out:</strong> Interpretation changes. OLS coefficients are linear effects; Logit coefficients are log-odds. Always report Average Marginal Effects (AMEs) for interpretation.</div>`,
          exercise: 'Run a Logit or Poisson model on your dataset. Identify the marginal effect of your treatment variable.'
        },
        {
          id: 'py_ols',
          title: 'OLS with statsmodels',
          desc: 'Linear regression, robust SEs, and formula API',
          lesson: '<h3>Overview</h3><p>statsmodels is the primary library for econometric modeling in Python.</p>',
          exercise: 'Run a standard OLS regression.'
        },
        {
          id: 'py_iv',
          title: 'Instrumental Variables',
          desc: 'Handling endogeneity using two-stage least squares',
          lesson: '<h3>Overview</h3><p>Use IV when your treatment is correlated with the error term.</p>',
          exercise: 'Estimate a 2SLS model.'
        }
      ]
    }
  ]
};
