Creative Upaay - Task Management Dashboard
This is a feature-rich, Kanban-style task management dashboard built as a full-stack development assignment for Creative Upaay. The application is a single-page application (SPA) built with React and Redux, designed to replicate a Figma design and includes a range of functionalities from basic task management to more advanced features.

Live Demo URL: https://assignment-nine-xi-70.vercel.app/

Video Demonstration: https://drive.google.com/file/d/10eq-XLsRVdWg3w5MiC5qyzoapvK7RKj4/view?usp=drive_link

Features Implemented
This project successfully implements all compulsory Level 1 features and several optional Level 2 features for a competitive advantage.

✅ Level 1 Functionalities (Compulsory)
UI Replication: The user interface is a close replica of the provided Figma design, built using Tailwind CSS for a clean and responsive layout.

Task Management (CRUD):

Add Tasks: Users can add new tasks with a dynamic title, description, and priority via a modal.

Edit Tasks: Existing tasks can be modified through an edit modal.

Delete Tasks: Tasks can be permanently deleted with a confirmation prompt.

Drag & Drop: Tasks can be seamlessly moved between columns ("To Do", "In Progress", "Done") and reordered within the same column using a drag-and-drop interface.

State Management: All application state is centrally managed using Redux Toolkit, ensuring a predictable and scalable state container.

State Persistence: The application state is automatically saved to the browser's Local Storage, meaning all tasks and their statuses remain intact even after a page refresh.

Task Filtering: A filter button allows users to view tasks based on their priority status ('All', 'Low', 'High', 'Completed').

✅ Level 2 Functionalities (Optional)
Due Date & Reminder:

Users can add and edit a due date for each task.

A visual alert banner appears at the top of the dashboard for tasks that are due within 24 hours or are already overdue.

Task cards display the due date with special styling (red for overdue/due today, yellow for due soon).

Activity Log:

Every task maintains a detailed log of its history, including creation, edits, priority changes, and moves between columns.

The activity log can be viewed in a dedicated modal for each task.

Subtasks:

Each task can have a list of nested subtasks.

Users can add new subtasks and mark them as complete directly on the task card.

A progress bar on the task card visually represents the completion of subtasks.

Tech Stack
Framework: React.js (with Vite)

Language: TypeScript

State Management: Redux Toolkit

Styling: Tailwind CSS

Drag & Drop: @hello-pangea/dnd

Icons: Lucide React

Getting Started
To run this project locally, follow these steps:

Clone the repository:

git clone [YOUR_REPOSITORY_URL]
cd [YOUR_REPOSITORY_FOLDER]

Install dependencies:

npm install

Run the development server:

npm run dev

The application will be available at http://localhost:5173 (or another port if 5173 is in use).

Approach & Assumptions
Approach
My approach was to build the application feature by feature, starting with the core UI and state management foundation.

UI First: I began by scaffolding the main components (Sidebar, TaskBoard, TaskCard) using Tailwind CSS to closely match the Figma design.

Redux Integration: Redux Toolkit was integrated early on to manage the task state. The slice (tasksSlice.ts) was designed to handle all CRUD (Create, Read, Update, Delete) and move operations.

Feature Implementation: Core functionalities like drag-and-drop, adding, editing, and deleting were implemented and connected to the Redux store.

Level 2 Enhancements: After completing the compulsory features, I added optional features like Due Dates, Subtasks, and the Activity Log, extending the Redux slice and UI components as needed.

Assumptions
The application is a self-contained frontend application; no backend was built, as state persistence is handled by Local Storage.

User-specific data like the user's name ("Palak Jain") and project members are hardcoded placeholders, as full authentication was a separate Level 2 feature.

The "Today" button in the filter bar is a UI element as per the design but does not have filtering logic attached, as the primary filtering criteria chosen was "Priority".
