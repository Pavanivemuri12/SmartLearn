

# SmartLearn - A Full-Stack LMS Platform

![SmartLearn Banner](https://via.placeholder.com/1200x630/6366F1/FFFFFF?text=SmartLearn%20LMS)

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.dev/)

</div>

---

## 📖 Description

**SmartLearn** is a feature-rich, full-stack Learning Management System (LMS) built with modern web technologies. It provides a platform for instructors to create, manage, and sell online courses, and for students to browse, purchase, and consume educational content.

The application features a comprehensive teacher dashboard with analytics, course and chapter creation workflows, video processing, and payment integration. Students can enjoy a seamless learning experience with progress tracking, course enrollment, and a dedicated dashboard for their purchased courses.

### ✨ Key Features

-   **Browse & Discover:** Search and filter courses by category and title.
-   **Student Dashboard:** View your enrolled courses and track your progress.
-   **Course Landing Pages:** Detailed pages for each course with curriculum and purchase options.
-   **Video Player:** Integrated Mux video streaming for a smooth viewing experience.
-   **Progress Tracking:** Mark chapters as complete and see your overall course progress.
-   **User Authentication:** Secure sign-in and sign-up powered by Clerk.
-   **Teacher Mode:** A dedicated interface for instructors to manage their content.
-   **Course Creation & Management:** A step-by-step wizard to create courses, add chapters, upload videos and attachments, set prices, and publish.
-   **Drag-and-Drop Reordering:** Easily reorder chapters within a course.
-   **Rich Text Editor:** A Notion-style editor for chapter descriptions.
-   **Stripe Integration:** Secure and reliable payment processing for course sales.
-   **Teacher Analytics:** A dashboard showing total revenue and sales count for instructors.
-   **Responsive Design:** Fully responsive UI for a great experience on any device.

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Database:** [MySQL](https://www.mysql.com/) (on PlanetScale)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
-   **Authentication:** [Clerk](https://clerk.dev/)
-   **File & Video Uploads:** [UploadThing](https://uploadthing.com/)
-   **Video Processing & Streaming:** [Mux](https://www.mux.com/)
-   **Payment Gateway:** [Stripe](https://stripe.com/)
-   **UI State Management:** [Zustand](https://zustand-demo.pmnd.rs/)

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later)
-   `npm`, `yarn`, or `pnpm`
-   A MySQL database (e.g., from [PlanetScale](https://planetscale.com/))
-   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/SmartLearn.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd SmartLearn/lms-tutorial
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `lms-tutorial` root directory by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Populate the `.env` file with your credentials from the services listed in the Tech Stack (PlanetScale, Clerk, UploadThing, Mux, Stripe).

    ```env
    # Database
    DATABASE_URL="..."

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
    CLERK_SECRET_KEY="..."
    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

    # Uploadthing
    UPLOADTHING_SECRET="..."
    UPLOADTHING_APP_ID="..."

    # Mux
    MUX_TOKEN_ID="..."
    MUX_TOKEN_SECRET="..."

    # Stripe
    STRIPE_API_KEY="..."
    STRIPE_WEBHOOK_SECRET="..."
    NEXT_PUBLIC_APP_URL="http://localhost:3000"

    # Other
    NEXT_PUBLIC_TEACHER_ID="..." # (Optional) Set your Clerk user ID for teacher access
    ```

5.  **Push the database schema:**
    This command will sync your Prisma schema with your database.
    ```bash
    npx prisma db push
    ```

6.  **(Optional) Seed the database:**
    To populate the database with initial data (like course categories), run the seed script.
    ```bash
    node scripts/seed.js
    ```

7.  **Run the development server:**
    ```bash
    npm run dev
    ```

8.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🕹️ Usage

Once the application is running, you can:

1.  **Sign up** for a new account.
2.  Navigate to the **Search** page to browse existing courses.
3.  Click the **"Teacher mode"** button in the navbar to switch to the instructor view.
4.  In Teacher mode, you can:
    -   Click **"New Course"** to start creating a new course.
    -   Follow the on-screen steps to add a title, description, image, category, chapters, and price.
    -   Upload videos for each chapter.
    -   Publish your course to make it available for purchase.
    -   View your sales and revenue in the **Analytics** dashboard.
5.  As a student, you can purchase a course using the Stripe checkout and start learning.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the project, please feel free to open an issue or submit a pull request.

1.  **Fork the repository**
2.  **Create a new branch:** `git checkout -b feature/your-feature-name`
3.  **Make your changes**
4.  **Commit your changes:** `git commit -m 'Add some amazing feature'`
5.  **Push to the branch:** `git push origin feature/your-feature-name`
6.  **Open a Pull Request**

Please make sure to update tests as appropriate.

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---
_This README was generated based on the project structure and is intended as a comprehensive starting point._</pre>