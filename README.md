## Blood Bank Donation – Setup

Features:
- Client registration (name, email, phone, password)
- Secure login via credentials
- Staff-only admin search by phone and/or full name
- Role support: CLIENT, NURSE, DOCTOR, ADMIN

### 1) Environment
Copy `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

### 2) Database (Prisma + SQLite)
Generate and migrate schema:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

This creates `dev.db` in `prisma/`.

### 3) Create a staff user (optional)
Use the simple seed script below to create an admin/nurse/doctor. You can also register a CLIENT from the UI and then update role manually via Prisma Studio.

```bash
npm run prisma:studio
```

In the `User` table, create a record with a bcrypt-hashed password. To generate a hash quickly in Node REPL:

```bash
node -e "(async()=>{const b=await import('bcryptjs');console.log(await b.default.hash('password123',10))})()"
```

Paste the hash in `password`, set `role` to `NURSE`/`DOCTOR`/`ADMIN`.

### 4) Run the app

```bash
npm run dev
```

Visit:
- `/register` – create client accounts
- `/login` – sign in
- `/admin` – staff search (requires staff role)

### API
- `POST /api/register` body: `{ name, email, phone, password }`
- `GET /api/search?phone=...&name=...` (staff-only)

