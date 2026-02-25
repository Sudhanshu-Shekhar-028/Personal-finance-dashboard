# Personal Finance Dashboard

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Sudhanshu-Shekhar-028/Personal-finance-dashboard)

A modern, responsive personal finance dashboard designed to help you track your income, expenses, savings goals, and account balances with ease. This application is built with Next.js, TypeScript, and Tailwind CSS, and it uses local storage for data persistence, making it a completely client-side solution.

## Features

-   **Interactive Dashboard:** Get a quick overview of your financial health with key metrics like total income, expenses, and net savings.
-   **Visual Charts:** Analyze your income sources and expense breakdowns with interactive bar and doughnut charts powered by Chart.js.
-   **Transaction Management:** Log income and expenses with descriptions, categories, and dates. View, edit, and delete transactions on a dedicated page with powerful search and filtering capabilities.
-   **Wallet Tracking:** Add and manage multiple cards or bank accounts, each with its own balance and visual representation.
-   **Savings Goals:** Set financial goals, track your progress with visual indicators, and stay motivated to achieve your targets.
-   **Dark & Light Modes:** Seamlessly switch between themes for optimal viewing comfort, day or night.
-   **Client-Side Storage:** All your data is securely stored in your browser's local storage, ensuring privacy and immediate access without needing a backend server.
-   **Responsive Design:** Fully responsive layout that works beautifully on desktops, tablets, and mobile devices.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **State Management:** React Context API
-   **Charting:** [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Make sure you have Node.js (version 20 or later) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sudhanshu-Shekhar-028/Personal-finance-dashboard.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Personal-finance-dashboard
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The application comes with pre-seeded default categories and accounts to get you started.

## Project Structure

The codebase is organized into logical directories to maintain clarity and scalability.

```
.
├── app/                  # Next.js App Router pages and main layout
├── components/           # Reusable React components
│   ├── features/         # Feature-specific components (e.g., TransactionItem, WalletCard)
│   ├── layout/           # Layout components (Sidebar, Header)
│   └── ui/               # Generic UI components (Button, Card, Modal)
├── context/              # Global state management with React Context
├── services/             # Services like local storage interaction
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
