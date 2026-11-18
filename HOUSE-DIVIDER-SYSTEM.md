# IH. House Divider System

This application interprets the [house divider reference](https://github.com/iainholmes/iainholmes.github.io/blob/master/desk/HOUSE-DIVIDER-SYSTEM.md) using its own interface colors.

Only the existing session-header boundary is refined. A 3px cap tapers to a 1px center; --border2 remains neutral and the compact terminals inherit the selected --lang color. Question, editor, output, feedback and progress elements are unchanged.

The scoped `ih-house-dividers` style block in `index.html` adds static, noninteractive geometry without changing the reserved border space. Terminal length is clamped. Forced colors use CanvasText; print retains the original ordinary rule. There are no new runtime dependencies, fonts, assets or scripts. Published source and user-data formats remain unchanged.

Pre-merge validation must use the exact source commit, compare functional/layout behavior with its base and inspect downloaded desktop/mobile screenshots. Temporary validation runs from an isolated branch in the main website repository; it is not part of this application's deployment. Record repository-specific commits, runs and deployment evidence in the PR. User/device acceptance is separate from remote review.
