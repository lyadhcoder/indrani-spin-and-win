# 🎁 INDRANI ELECTRONICS — Spin & Win

A simple and interactive **Spin & Win promotional web application** built for **INDRANI ELECTRONICS**.

Customers can participate in a digital spin-the-wheel campaign and get a chance to win promotional gifts and offers.

---

## ✨ Features

* 🎡 Interactive Spin & Win experience
* 🎁 Promotional gift/reward system
* 📱 Responsive design for mobile, tablet, and desktop
* ⚡ Fast and lightweight frontend
* 🗄️ Supabase database integration
* 🔐 Environment-variable based configuration
* ☁️ Vercel-ready deployment
* 🎨 Customer-friendly promotional interface
* 📊 Database-backed campaign data

---

## 🛠️ Tech Stack

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| HTML       | Application structure           |
| CSS        | Styling and responsive UI       |
| JavaScript | Application logic               |
| Supabase   | Database and backend services   |
| Vercel     | Hosting and deployment          |
| GitHub     | Source code and version control |

---

## 📁 Project Structure

```text
indrani-spin-and-win/
│
├── src/
│   └── ...
│
├── index.html
├── package.json
├── supabase-schema.sql
├── .env.example
├── README.md
└── ...
```

### Important Files

#### `index.html`

Main entry point of the application.

#### `src/`

Contains the application's source code and frontend logic.

#### `supabase-schema.sql`

Contains the SQL schema required to configure the Supabase database.

#### `.env.example`

Example environment-variable configuration for local development and deployment.

#### `package.json`

Contains project dependencies and available npm scripts.

---

# 🚀 Getting Started

Follow the steps below to run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/lyadhcoder/indrani-spin-and-win.git
```

Move into the project directory:

```bash
cd indrani-spin-and-win
```

---

## 2. Install Dependencies

Install the required packages:

```bash
npm install
```

---

## 3. Configure Supabase

This project uses **Supabase** for backend/database functionality.

Create a Supabase project and obtain:

* Supabase Project URL
* Supabase Publishable Key

Then open:

```text
supabase-schema.sql
```

Copy the SQL code and run it once in the **Supabase SQL Editor**.

### Database Setup

1. Open your Supabase project.
2. Go to **SQL Editor**.
3. Create a new query.
4. Copy the contents of `supabase-schema.sql`.
5. Run the SQL query.
6. Verify that the required tables have been created.

> The database schema should normally be executed once when setting up a new Supabase project.

---

# 🔐 Environment Variables

Create a local environment file:

```text
.env
```

You can use `.env.example` as the reference.

Configure:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### Example

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxx
```

### Important

Do **not** commit your real `.env` file or private credentials to GitHub.

Use:

```text
.env.example
```

for documenting required environment variables.

---

# 💻 Run Locally

Start the development server:

```bash
npm run dev
```

After the server starts, open the local URL shown in your terminal.

Typically:

```text
http://localhost:5173
```

---

# 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

# ☁️ Deploy to Vercel

This project is designed to work with **Vercel**.

## 1. Import the Repository

Create a new project in Vercel and import:

```text
https://github.com/lyadhcoder/indrani-spin-and-win
```

## 2. Configure Environment Variables

In the Vercel project, go to:

```text
Project Settings → Environment Variables
```

Add:

```text
VITE_SUPABASE_URL
```

with your Supabase Project URL.

Add:

```text
VITE_SUPABASE_PUBLISHABLE_KEY
```

with your Supabase Publishable Key.

---

## 3. Redeploy

After adding or changing environment variables, create a new deployment/redeploy the project.

This is important because Vite environment variables are included during the build process.

---

# 🔑 Environment Variable Compatibility

The project previously used:

```text
VITE_SUPABASE_ANON_KEY
```

The current configuration uses:

```text
VITE_SUPABASE_PUBLISHABLE_KEY
```

The application also maintains fallback support for the older variable name where applicable.

For new deployments, use:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

---

# 🌐 Custom Domain

After deploying the project to Vercel, you can connect a custom domain from:

```text
Vercel
→ Project
→ Settings
→ Domains
```

Add your desired domain or subdomain and follow Vercel's DNS configuration instructions.

Example:

```text
gift.example.com
```

If the domain is managed through another provider, configure the DNS record according to the values provided by Vercel.

---

# 🔄 Deployment Workflow

A typical development workflow is:

```text
Local Development
       ↓
Git Commit
       ↓
GitHub
       ↓
Vercel
       ↓
Production
```

For example:

```bash
git add .
git commit -m "Update Spin & Win"
git push origin main
```

If Vercel is connected to the GitHub repository, the new commit can trigger a new deployment automatically.

---

# 🗄️ Supabase

The application uses Supabase for database functionality.

The database schema is provided in:

```text
supabase-schema.sql
```

When setting up the project for the first time:

```text
Supabase Project
       ↓
SQL Editor
```
