# Sales Dashboard

A basic sales dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Recharts. The application uses an atomic component structure and displays mocked sales data for 2024, 2023, and 2022.

## What Was Built

- Dashboard page at `/dashboard`
- Root page redirect from `/` to `/dashboard`
- Atomic component structure:
  - `atoms`: small UI building blocks such as icon buttons, metric cards, and inputs
  - `molecules`: grouped controls such as year selection, chart type switching, and the threshold filter
  - `organisms`: composed dashboard features such as the sales chart and dashboard controller
  - `templates`: dashboard page shell
- Local API route at `/api/sales`
- Mock sales dataset for 2024, 2023, and 2022
- Custom sales threshold input
- Multiple chart types with Recharts:
  - Bar chart
  - Line chart
  - Pie chart
- Responsive dashboard layout with Tailwind CSS

## Data Source Note

The project references the public Kaggle-style sales dataset pattern from [Kaggle Sample Sales Data](https://www.kaggle.com/datasets/kyanyoga/sample-sales-data). The app uses mocked 2022-2024 figures shaped after retail sales data so it can run locally without Kaggle account credentials or API keys.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts
- Lucide React
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000/dashboard
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## API

The dashboard fetches data from:

```text
/api/sales?year=2024&threshold=90000
```

Query parameters:

- `year`: `2024`, `2023`, or `2022`
- `threshold`: minimum monthly sales value to show

## GitHub Setup

Create a new GitHub repository, then connect and push this project:

```bash
git remote add origin https://github.com/<your-username>/sales-dashboard.git
git branch -M main
git push -u origin main
```

This workspace does not include my own GitHub credentials, so pushing requires a remote that you own or have permission to use.
