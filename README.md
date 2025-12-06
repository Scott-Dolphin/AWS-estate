# AWS-Estate (Housing Market Viewer)

A modern real estate application that allows users to search for properties, filter results by specific criteria (price, location, amenities), and manage a list of favorite homes. The application is built with a React frontend and integrates with AWS services for authentication and data management.

## Features

- **Property Search**: Filter properties by City, Price Range, Bedrooms, and Bathrooms.
- **User Authentication**: Secure login and session management using **AWS Cognito**.
- **Favorites System**: Save and retrieve favorite properties (persisted via User ID).
- **Responsive UI**: Built with **Radix UI** and **Tailwind CSS** for a polished, accessible, and mobile-friendly experience.
- **Real-time Feedback**: Loading states, error handling, and empty state feedback.

## Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: Vitest & React Testing Library

### Backend & Cloud
- **API**: AWS API Gateway
- **Authentication**: AWS Cognito
- **Infrastructure**: AWS Lambda (Serverless), DynamoDB/RDS (Implied data source)

## Project Structure

```text
AWS-estate/
├── frontend/               # Main React Application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components (HouseCard, FilterBar, etc.)
│   │   ├── styles/         # Global styles
│   │   ├── App.tsx         # Main application logic & state
│   │   └── main.tsx        # Entry point
│   ├── tests/              # Test setup
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
├── terminals/              # IDE terminal logs
└── README.md
```

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd AWS-estate
    ```

2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will typically start at `http://localhost:3000`. 

**Note on Authentication**: The app relies on an AWS Cognito token. If you are running locally without a valid token in `localStorage`, you may be redirected or see a restricted view. 

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate static files in the `frontend/build` directory, ready to be deployed to S3, Vercel, or Netlify.

### Testing

Run the test suite using Vitest:

```bash
npm test
```

## Contributing

1.  Create a feature branch (`git checkout -b feature/amazing-feature`).
2.  Commit your changes (`git commit -m 'Add some amazing feature'`).
3.  Push to the branch (`git push origin feature/amazing-feature`).
4.  Open a Pull Request.
