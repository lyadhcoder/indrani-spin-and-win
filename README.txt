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
* 🔑 Simple admin access system

---

## 🛠️ Tech Stack

| Technology             | Purpose                         |
| ---------------------- | ------------------------------- |
| **HTML**               | Application structure           |
| **CSS**                | Styling and responsive UI       |
| **JavaScript / React** | Application logic and UI        |
| **Supabase**           | Database and backend services   |
| **Vercel**             | Hosting and deployment          |
| **GitHub**             | Source code and version control |

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

```bash
npm install
```

---

# 🔐 Admin Code

The **Admin Code** can be changed directly from the `main.jsx` file.

You do **not** need to change the database or environment variables to update the Admin Code.

### 📍 Where to change it

Open:

```text
src/main.jsx
```

Find the existing Admin Code in the file and replace it with your new code.

For example:

```javascript
const ADMIN_CODE = "YOUR_ADMIN_CODE";
```

Change:

```javascript
const ADMIN_CODE = "123456";
```

to:

```javascript
const ADMIN_CODE = "987654";
```

Save the file and redeploy the application.

### ⚠️ Important

After changing the Admin Code:

```text
main.jsx
    ↓
Save changes
    ↓
Git commit & push
    ↓
Vercel deployment
    ↓
New Admin Code active
```

If you are developing locally, simply restart or refresh the development server as required.

> **Tip:** Keep the Admin Code private and do not share it publicly.

---

# 🗄️ Supabase Setup

This project uses **Supabase** for database functionality.

The database structure is provided in:

```text
supabase-schema.sql
```

## First-Time Setup

1. Create a Supabase project.
2. Open the **SQL Editor**.
3. Create a new SQL query.
4. Copy the complete contents of `supabase-schema.sql`.
5. Run the SQL query.
6. Verify that the required tables have been created.

The SQL schema normally needs to be executed only once when setting up a new Supabase project.

---

# 🔑 Environment Variables

Create a local environment file:

```text
.env
```

Use `.env.example` as the reference.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### Example

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxx
```

### ⚠️ Security

**Never commit your real `.env` file to GitHub.**

Use `.env.example` only for documenting the required variables.

---

# 💻 Run Locally

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in your terminal.

Usually:

```text
http://localhost:5173
```

---

# 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# ☁️ Deploy to Vercel

This project is ready to deploy on **Vercel**.

## 1. Import the Repository

Import the GitHub repository into Vercel:

```text
https://github.com/lyadhcoder/indrani-spin-and-win
```

## 2. Add Environment Variables

Go to:

```text
Vercel
→ Project
→ Settings
→ Environment Variables
```

Add:

```text
VITE_SUPABASE_URL
```

and:

```text
VITE_SUPABASE_PUBLISHABLE_KEY
```

Use the values from your Supabase project.

---

## 3. Deploy

After configuring the environment variables, deploy the project.

Whenever you push changes to the connected GitHub branch, Vercel can automatically create a new deployment.

---

# 🌐 Custom Domain

A custom domain or subdomain can be connected from:

```text
Vercel
→ Project
→ Settings
→ Domains
```

For example:

```text
gift.example.com
```

Follow the DNS configuration provided by Vercel.

---

# 🔄 Update Workflow

For normal code changes:

```text
Edit Code
    ↓
Save
    ↓
Git Commit
    ↓
Git Push
    ↓
Vercel
    ↓
Production Update
```

Example:

```bash
git add .
git commit -m "Update Spin & Win"
git push origin main
```

---

# 📁 Project Structure

```text
indrani-spin-and-win/
│
├── src/
│   ├── main.jsx
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

**`src/main.jsx`**
Main application logic and UI. The **Admin Code is also configured here**.

**`supabase-schema.sql`**
Database schema required for Supabase setup.

**`.env.example`**
Example environment-variable configuration.

**`package.json`**
Project dependencies and npm scripts.

**`README.md`**
Project documentation and setup instructions.

---

# 🔒 Security

Never expose private credentials in source code.

### Do NOT commit:

```text
.env
```

### Safe to commit:

```text
.env.example
```

Do not place Supabase service-role keys, passwords, private API keys, or other server-side secrets inside publicly accessible frontend code.

---

# 🧪 Testing Checklist

Before publishing a new version, check:

* [ ] Website loads correctly
* [ ] Spin wheel works
* [ ] Rewards display correctly
* [ ] Admin login works
* [ ] Admin Code works
* [ ] Supabase connection works
* [ ] Data saves correctly
* [ ] Mobile layout works
* [ ] Desktop layout works
* [ ] Production build succeeds
* [ ] Vercel deployment succeeds
* [ ] Custom domain works

---

# 📱 Responsive Design

The application is designed to work across:

* 📱 Mobile phones
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop computers

Always test the production website on both mobile and desktop before using it for customers.

---

# 🏪 About INDRANI ELECTRONICS

**INDRANI ELECTRONICS**

High Road, Bus Stand, Birbhum, West Bengal, India

The Spin & Win application is designed as a digital promotional experience for customers of the showroom.

---

# 🎯 Project Purpose

The main purpose of this project is to provide customers with an engaging digital promotional experience while supporting showroom campaigns and customer offers.

The application can be adapted for different promotional campaigns by updating rewards, promotional content, and database configuration.

---

# 🛠️ Development Requirements

Before running the project, make sure you have:

* **Node.js**
* **npm**
* **Git**

Check installed versions:

```bash
node --version
npm --version
git --version
```

---

# 📦 Quick Installation

For developers who already have Supabase configured:

```bash
git clone https://github.com/lyadhcoder/indrani-spin-and-win.git

cd indrani-spin-and-win

npm install

npm run dev
```

---

# 🚀 Production Checklist

Before going live:

```text
☐ Supabase project created
☐ supabase-schema.sql executed
☐ Environment variables configured
☐ Admin Code checked
☐ Vercel project connected
☐ Production build successful
☐ Custom domain configured
☐ Mobile testing completed
☐ Desktop testing completed
☐ Spin functionality tested
☐ Database operations tested
☐ Admin functionality tested
☐ Production URL tested
```

---

# 🤝 Contributing

Contributions, improvements, and bug reports are welcome.

If you find an issue, open an Issue in the GitHub repository and include:

* Description of the issue
* Steps to reproduce
* Browser/device
* Expected behavior
* Actual behavior
* Relevant error messages
* Screenshots, if applicable

For code changes:

```bash
git checkout -b feature/your-feature
```

After making changes:

```bash
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then create a Pull Request.

---

# 🐛 Issues

If you encounter a bug or unexpected behavior, please report it through the GitHub Issues section.

Include as much relevant information as possible so the issue can be reproduced and fixed quickly.

---

# 📄 License

This project is intended for use by **INDRANI ELECTRONICS**.

Unless otherwise specified, the source code, branding, promotional content, graphics, and business-specific materials in this repository should not be reused commercially without permission from the project owner.

---

# 🔗 Repository

**GitHub Repository**

https://github.com/lyadhcoder/indrani-spin-and-win

---

# ⭐ INDRANI ELECTRONICS — Spin & Win

Built to make customer promotions more:

**Interactive • Engaging • Digital**

### INDRANI ELECTRONICS

**High Road, Bus Stand, Birbhum, West Bengal, India**
