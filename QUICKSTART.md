# ⚡ LinguaLive - Quick Start Checklist

## ✅ Immediate Actions (Do These First)

### Step 1: Install Dependencies (5 min)
- [ ] Open terminal in `lingualive` folder
- [ ] Run: `npm install --legacy-peer-deps`
- [ ] Wait for completion

### Step 2: Get API Keys (15 min)
Create free accounts and get credentials:

#### Neon Database
- [ ] Go to https://neon.tech
- [ ] Sign up
- [ ] Create project
- [ ] Copy **Connection String** → `DATABASE_URL` in `.env.local`

#### Google Gemini API  
- [ ] Go to https://aistudio.google.com/app/apikey
- [ ] Click "Create API Key"
- [ ] Copy key → `GOOGLE_GEMINI_API_KEY` in `.env.local`

#### Cloudinary
- [ ] Go to https://cloudinary.com
- [ ] Sign up
- [ ] Go to Dashboard
- [ ] Copy **Cloud Name** → `CLOUDINARY_CLOUD_NAME`
- [ ] Copy **API Key** → `CLOUDINARY_API_KEY`
- [ ] Copy **API Secret** → `CLOUDINARY_API_SECRET`

#### Redis (Optional but Recommended)
- [ ] Go to https://upstash.com
- [ ] Sign up
- [ ] Create Redis DB
- [ ] Copy URL → `REDIS_URL`

### Step 3: Setup Environment (5 min)
```bash
# Copy template
cp .env.example .env.local

# Edit .env.local with your credentials
# On Windows: notepad .env.local
# On Mac: open .env.local
```

Generate NextAuth secret:
```bash
# On Windows (in PowerShell):
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -Count 32 | ForEach-Object {[byte]$_} | Out-String).Trim())) 

# Or just use any 32-char random string
# Example: "abc123xyz789abc123xyz789abc123xy"
```

### Step 4: Initialize Database (5 min)
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 5: Run App (2 min)
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🧪 Testing Checklist

- [ ] App opens at localhost:3000
- [ ] Landing page visible
- [ ] Can sign up at /signup
- [ ] Can sign in at /signin
- [ ] See dashboard after login
- [ ] Camera button works
- [ ] Camera opens with browser permission
- [ ] Can capture photo
- [ ] Translation API responds
- [ ] See results with vocabulary
- [ ] See +50 XP notification
- [ ] Dashboard shows updated XP

---

## 📦 Project Structure at a Glance

```
lingualive/
├── src/app/api/        ← All API endpoints
├── src/app/            ← All pages (camera, dashboard, etc)
├── src/components/     ← UI components
├── src/lib/            ← Services (Gemini, Cloudinary, etc)
├── prisma/             ← Database schema
└── .env.local          ← Your secrets (COPY FROM .env.example)
```

---

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# View/edit database
npx prisma studio

# Generate Prisma client
npx prisma generate

# Reset database (careful!)
npx prisma migrate reset

# Lint code
npm run lint
```

---

## ⚠️ If Something Breaks

**"Module not found"**
```bash
npx prisma generate
npm install
```

**"Database connection error"**
- Check DATABASE_URL in .env.local
- Verify IP in Neon dashboard

**"Gemini API error"**
- Verify API key is correct
- Check Google Cloud console for API enabled

**"Image upload fails"**
- Verify Cloudinary credentials
- Check image size < 8MB

---

## 🚀 Next: Customize & Deploy

After everything works:

1. **Customize** features in `src/lib/gemini.ts` and `src/app/api/translate/image/route.ts`
2. **Deploy** to Vercel
3. **Add more languages** by tweaking Gemini prompts
4. **Build more features** - conversation practice, leaderboards, etc.

---

## 📞 Need Help?

1. Check [COMPLETE_GUIDE.md](../COMPLETE_GUIDE.md) for detailed info
2. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for troubleshooting
3. Review the code comments in:
   - `src/app/api/translate/image/route.ts` - main pipeline
   - `src/lib/gemini.ts` - AI integration
   - `prisma/schema.prisma` - database

---

**Good luck! 🎉 You've got this!**
