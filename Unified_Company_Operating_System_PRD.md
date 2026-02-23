# Product Requirements Document (PRD)

# Unified Company Operating System (HR + Projects + AI)

------------------------------------------------------------------------

## 1. Product Overview

### 1.1 Vision

Build a multi-tenant SaaS platform that acts as a unified operating
system for companies by combining:

-   HR Management
-   Payroll
-   Leave Management
-   Timesheets
-   Project Management (Kanban)
-   AI-powered project knowledge assistant (RAG)
-   Automated GitHub code review

The system will be architected as a modular monolith (frontend and
backend) to ensure fast development, maintainability, and scalability.

------------------------------------------------------------------------

## 2. Product Goals

### 2.1 MVP Goals

-   Enable companies to manage employees, payroll, and leave
-   Provide Kanban-based project management
-   Support multi-country payroll (fixed monthly salary model)
-   Deliver project-based AI assistant (RAG, read-only)
-   Provide GitHub-triggered automated code review
-   Maintain strong audit logging
-   Support multi-tenant SaaS architecture

### 2.2 Non-Goals (v1)

-   Subscription billing system
-   Microservices architecture
-   Backup & recovery system
-   Soft deletes
-   Public APIs
-   SSO / 2FA
-   Advanced reporting engine

------------------------------------------------------------------------

## 3. Target Users

### 3.1 Customer Type

-   All industries
-   Multi-country companies
-   Small to mid-sized organizations (initial focus)

### 3.2 User Roles

#### Platform Admin (Future Phase)

-   Manages entire SaaS platform
-   Controls tenants
-   Global monitoring

#### Company Sub-Admin

-   Full control within their company
-   Manages employees, payroll, projects, leave, and reports

#### Employee

-   Logs timesheets
-   Requests leave
-   Views tasks and payslips
-   Updates basic profile

------------------------------------------------------------------------

## 4. System Architecture

### 4.1 Architecture Style

-   Modular Monolithic Backend
-   Modular Monolithic Frontend
-   Single Database
-   Multi-tenant using company_id segregation

### 4.2 Backend Modules

-   Auth Module
-   Tenant (Company) Module
-   Employee Module
-   Leave Module
-   Payroll Module
-   Timesheet Module
-   Project (Kanban) Module
-   AI RAG Module
-   Code Review Module
-   Audit Log Module

------------------------------------------------------------------------

## 5. Functional Requirements

### 5.1 Authentication

-   Email + Password authentication
-   Role-based access control
-   JWT/session-based authentication
-   Multi-tenant isolation via company_id

------------------------------------------------------------------------

### 5.2 Company Registration

-   Self-registration for companies
-   On signup:
    -   Company created
    -   Creator becomes Sub-Admin
-   Sub-Admin can manually create employees

------------------------------------------------------------------------

### 5.3 Employee Management

-   Manual employee creation by Sub-Admin
-   Store:
    -   Name
    -   Email
    -   Salary (fixed monthly)
    -   Leave balance
-   Employees can update basic profile info

------------------------------------------------------------------------

### 5.4 Leave Management

-   Leave types (e.g., Annual, Sick)
-   Leave balance per employee
-   Employees request leave
-   Sub-Admin approves/rejects
-   Approved leave deducts balance automatically
-   Leave reports available to Sub-Admin

------------------------------------------------------------------------

### 5.5 Payroll

-   Fixed monthly salary model
-   Not dependent on timesheets
-   Sub-Admin runs payroll manually
-   Payslips generated automatically
-   Multi-currency support
-   Country-specific tax configuration (future extensibility)

------------------------------------------------------------------------

### 5.6 Timesheets

-   Employees log daily total working hours
-   Not task-based
-   Sub-Admin can view reports
-   Used for tracking only (not payroll calculation)

------------------------------------------------------------------------

### 5.7 Project Management (Kanban)

Structure:

-   Story
    -   Task
        -   Sub-task

Features:

-   Assigned user
-   Description
-   Status (fixed workflow: To Do → In Progress → Review → Done)
-   Created/Updated timestamps
-   No attachments
-   No comments

Multiple projects per company supported.

------------------------------------------------------------------------

### 5.8 AI-Based RAG Assistant

-   Project-knowledge-based only
-   Read-only system
-   Answers questions about:
    -   Project documentation
    -   System architecture
    -   Internal policies
-   No action execution
-   Data fed manually into knowledge base

------------------------------------------------------------------------

### 5.9 GitHub Automated Code Reviewer

-   Triggered on GitHub push event
-   Automatically reviews code
-   Provides:
    -   Quality feedback
    -   Best practice suggestions
    -   Potential bug detection

------------------------------------------------------------------------

### 5.10 Audit Logs

-   Full action-level tracking
-   Logs:
    -   User ID
    -   Company ID
    -   Role
    -   Action
    -   Timestamp
-   No detailed per-field versioning (v1)

------------------------------------------------------------------------

## 6. Technical Decisions

-   Hard delete (temporary decision for MVP)
-   Centralized error handling
-   Structured logging system
-   Web application only
-   APIs to be added in future phases

------------------------------------------------------------------------

## 7. Future Enhancements

-   Platform Admin Module
-   Subscription & Billing
-   Soft delete implementation
-   Backup & Recovery
-   Public API support
-   SSO / 2FA
-   Advanced reporting & exports
-   Entity-level change history

------------------------------------------------------------------------

## 8. Success Metrics

-   Company onboarding completion rate
-   Monthly active companies
-   Payroll processing success rate
-   Leave approval processing time
-   Task completion velocity
-   AI assistant usage rate

------------------------------------------------------------------------

End of Document
