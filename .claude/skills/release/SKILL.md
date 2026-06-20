# Skill: Release and PR Restructuring

Use this skill when preparing releases, pushing commits, or planning pull requests (PRs), particularly when changes are large or complex.

## Rules and Guidelines

1. **Large Change Strategy (PR Restructuring)**:
   - If changes exceed **10 files** or **300 lines of code (LOC)**, you MUST make a PR restructuring plan.
   - Create the plan document inside `.agents/plans/` (e.g. `.agents/plans/your-feature-restructuring.md`).
   - The plan MUST include:
     - Remote branch name
     - Commit message
     - PR Title
     - PR Description
     - List of files to upload
     - Individual plans for each sub-PR
   - **Targeting Hierarchy**: One main remote branch that merges into `main`, with other smaller remote branches that merge into that main remote branch. This keeps the PRs small (max 10 files and max 350 LOC per PR) and ensures clean sequential reviews.

2. **Integration Verification**:
   - Never push a branch or create a PR that fails linting or typechecking.
   - Run `bun run lint` and `bun run typecheck` before requesting reviews or pushing.

3. **Release Actions**:
   - Write standard PR descriptions matching the `.github/pull_request_template.md`.
   - Ensure the conventional commits syntax is strictly followed.
