# Branch Naming Guidelines

## Purpose
This document outlines the branch naming conventions to ensure consistency and clarity across the repository.

---

## Master Branch
Protected central branch 

---

## Feature Branches
For feature development:
- **Format**: `feature_{feature-name}`
- Examples:
  - `feature_login-ui`
  - `feature_payment-gateway`

---

## Bug Fix Branches
For fixing reported bugs:
- **Format**: `fix_{issue-number-description}`
- Examples:
  - `fix_1234-null-pointer`
  - `fix_5678-payment-error`

---

## Hotfix Branches
For urgent production issues:
- **Format**: `hotfix_{critical-bug-name}`
- Examples:
  - `hotfix_login-crash`
  - `hotfix_payment-timeout`

---

## Experimental Branches
For experimental or WIP development:
- **Format**: `experiment_{experiment-name}`
- Examples:
  - `experiment_graphql-integration`
  - `experiment_chatbot-ui`

---

## Notes
1. Always ensure branch names are descriptive and concise.
2. Avoid using spaces or forwardslashes('/'); use hyphens (`-`) instead.
3. Delete branches after merging to keep the repository clean.
