# El Humo — Site Restaurant + CMS + Réservations

Site vitrine d'un restaurant mexicain premium avec back-office intégré. Le restaurateur peut gérer son menu et ses réservations en temps réel, sans toucher au code.

## Aperçu

**Site public**
- Page d'accueil avec hero animé, menu en temps réel et formulaire de réservation
- Confirmation de réservation par email automatique (Resend)
- Affichage des ruptures de stock en temps réel

**Back-office admin** (`/elhumo-admin`)
- Authentification sécurisée via Supabase Auth
- Gestion des réservations (confirmer / annuler)
- Gestion du menu : modifier les prix et marquer un plat en rupture de stock
- Réinitialisation du mot de passe par lien magique (email)
- Protection contre le brute force (rate limiting : 10 tentatives / 15 min)

## Stack technique

| Technologie | Usage |
|------------|-------|
| Next.js 16 (App Router) | Framework fullstack |
| Tailwind CSS v4 | Styles |
| Prisma v7 | ORM |
| PostgreSQL (Supabase) | Base de données |
| Supabase Auth | Authentification admin |
| Resend | Emails de confirmation |
| Framer Motion | Animations |
| Vercel | Déploiement |

## Lancer le projet en local

### Prérequis
- Node.js 18+
- Un projet Supabase (gratuit)
- Un compte Resend (gratuit)

### Installation

```bash
git clone https://github.com/Alexpollux/ElHumo.git
cd ElHumo
npm install
```

### Variables d'environnement

Crée un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_supabase_session_pooler_url
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Crée également un fichier `.env` avec uniquement :

```env
DATABASE_URL=your_supabase_session_pooler_url
```

### Base de données

```bash
# Appliquer les migrations
npx prisma migrate dev

# Peupler le menu initial
npx prisma db seed
```

### Démarrer

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

### Compte admin

Crée un utilisateur dans **Supabase Dashboard → Authentication → Users**.
Accède au back-office sur `/elhumo-admin`.

## Structure du projet

```
app/
├── page.tsx                  # Page d'accueil publique
├── elhumo-admin/             # Back-office protégé
│   ├── page.tsx              # Login
│   ├── dashboard/            # Gestion des réservations
│   ├── menu/                 # Gestion du menu
│   ├── forgot-password/      # Mot de passe oublié
│   └── reset-password/       # Réinitialisation
├── api/
│   ├── reservation/          # POST - créer une réservation
│   ├── elhumo-admin/login/   # POST - login avec rate limiting
│   └── admin/
│       ├── reservations/     # PATCH - modifier le statut
│       └── menu/             # PATCH - modifier un plat
components/
├── home/                     # Hero, Menu, Reservation
├── layout/                   # Navbar, Footer
└── admin/                    # Sidebar, ReservationTable, MenuManager
lib/
├── prisma.ts                 # Client Prisma
├── supabase/                 # Clients Supabase (server/client)
├── admin-auth.ts             # Vérification session admin
└── rate-limit.ts             # Rate limiting in-memory
prisma/
├── schema.prisma             # Modèles : Category, MenuItem, Reservation
└── seed.ts                   # Menu initial El Humo
```
