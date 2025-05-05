# **Commit Message Guidelines**

## **Purpose**
A well-structured commit history is crucial for understanding and maintaining a project. This document provides guidelines for writing clear and consistent commit messages, using best practices that all contributors should follow.

---

## **Commit Message Format**

Use the following format for all commit messages:

```git
<type>(optional scope): <summary>

[optional body]

[optional footer]
```

### **Format Components**
1. **`<type>`**: The type of change (see below for allowed types).
2. **`(optional scope)`**: The specific area of the codebase impacted (e.g., `parser`, `UI`). This is optional but helpful for clarity.
3. **`<summary>`**: A brief, imperative description of the change (50 characters max).
4. **`[optional body]`**: Detailed explanation (why/how), wrapped at ~72 characters per line.
5. **`[optional footer]`**: References to issues, tasks, or breaking changes.

---

## **Allowed Types**
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation updates
- **style**: Code style changes (non-functional, e.g., formatting, linting)
- **refactor**: Code changes that neither fix a bug nor add a feature
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (e.g., dependency updates, build scripts)
- **perf**: Performance improvements

---

## **Examples**

### **1. Adding a New Feature**

```
feat(auth): add OAuth 2.0 support

Implemented OAuth 2.0 authentication flow for user login. Updated the login page to redirect users to the third-party provider for secure authentication.
```

### **2. Fixing a Bug**

```
fix(cart): resolve incorrect total price calculation

Fixed an issue where discounts were not being applied correctly to the cart total, resulting in incorrect price displays.
```

### **3. Documentation Update**

```
docs: add API usage examples to README

Added detailed examples for using the API with curl and Postman to make it easier for new developers to get started.
```

### **4. Code Refactor**

```
refactor(database): optimize query performance

Rewrote database queries to reduce load time by 30%. This involved adding indexes to frequently queried columns.
```

### **5. Highlighting a Breaking Change**

```
feat(api): migrate to v2 endpoints

BREAKING CHANGE: All API endpoints now require the /v2 prefix. Update client applications to use the new versioned endpoints.
```

### **6. Updating Dependencies**

```
chore: update dependencies to address security issues

Upgraded lodash to 4.17.21 and axios to 0.21.1 to resolve vulnerabilities flagged by npm audit.
```

---

## **Guidelines for Writing Commit Messages**

1. **Be Clear and Concise**  
   - Summarize **what** the commit does in the first line.
   - Avoid details of **why/how** in the summary (save that for the body).
   - Limit the summary to **50 characters max**.

2. **Use the Imperative Mood**  
   Write as though giving a command:  
   - **Good**: `fix: resolve edge case in email parsing`
   - **Bad**: `fixed an issue in email parsing`

3. **Wrap Body Text at ~72 Characters per Line**  
   For readability, limit body text width.

4. **Reference Issues or Tasks in the Footer**  
   If the commit relates to an issue or task, include it in the footer.  
   Example:
   ```
   Resolves #123
   ```

6. **Indicate Breaking Changes Clearly**  
If a commit introduces changes that require consumers to modify their usage, include a `BREAKING CHANGE:` note in the body or footer.

---

## **Additional Notes**
- **Atomic Commits**: Each commit should represent one logical change. Avoid bundling unrelated changes.
- **Descriptive Commits**: Ensure each commit clearly communicates its purpose. Future contributors should understand the commit’s intent at a glance.

By following these guidelines, we can maintain a clean and informative commit history that benefits all collaborators and future maintainers of the project.
