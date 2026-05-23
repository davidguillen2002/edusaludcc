# EduSaludCC · Landing

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Lucide.
Pensado además como **plantilla fundacional reutilizable** para otros clientes:
todo el contenido vive en `lib/site.ts` y los tokens visuales en CSS variables.

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14.2 (App Router, RSC + Server Actions) |
| Lenguaje | TypeScript 5.6 |
| Estilos | Tailwind CSS 3.4 + CSS variables |
| Animación | Framer Motion 11 |
| Iconos | Lucide React |
| Tipografía | Lexend (display) + Source Sans 3 (body), vía `next/font` |
| Imágenes | `next/image` + Unsplash remoto |
| Email | Resend (Server Action) |
| Hosting target | Vercel |

## Estructura

```
app/
├── actions/contact.ts          Server Action (Resend)
├── globals.css                 Tokens + utilidades + reduced-motion
├── layout.tsx                  Fonts, Navbar, Footer, Floating WhatsApp
├── page.tsx                    /
├── nosotros/page.tsx           /nosotros
├── servicios/page.tsx          /servicios
├── metodologia/page.tsx        /metodologia
├── not-found.tsx               404 con marca
├── opengraph-image.tsx         OG dinámica 1200×630 (edge runtime)
├── robots.ts                   robots.txt
└── sitemap.ts                  sitemap.xml

components/
├── ui/                         Primitivas (Button, Container, BrandMark, SectionHeader, Reveal)
├── Navbar.tsx                  Sticky + glass + pill activo
├── Hero.tsx                    Parallax + glass card + heartbeat
├── BentoServices.tsx           4 layouts distintos
├── WhyChoose.tsx               3 cards con métrica
├── Methodology.tsx             4 pasos con conector
├── Values.tsx                  3 cards de valores
├── AboutTrajectory.tsx         Imagen + copy /nosotros
├── ServicesShowcase.tsx        3 secciones /servicios
├── QuoteBlock.tsx              Cita firmada
├── CTABanner.tsx               Banner CTA reutilizable
├── PageHero.tsx                Banner superior reutilizable
├── ContactForm.tsx             Formulario + Server Action
├── FloatingWhatsApp.tsx        Botón flotante con ping
└── Footer.tsx

lib/
├── site.ts                     Toda la copy + imágenes + valores
└── cn.ts

public/
└── logo.png                    Logo real
```

## Desarrollo local

```bash
npm install
cp .env.example .env.local      # opcional
npm run dev                     # http://localhost:3000
```

El formulario funciona sin `RESEND_API_KEY`: los envíos se loggean en consola.

## Deploy en Vercel

### 1. Subir el repo

```bash
git init
git add .
git commit -m "EduSaludCC landing"
gh repo create edusaludcc --public --source=. --push  # o crea el repo a mano
```

### 2. Crear el proyecto

1. Entra a [vercel.com/new](https://vercel.com/new) y conecta el repo de GitHub.
2. Vercel detecta Next.js automáticamente — deja el preset.
3. Antes de pulsar **Deploy**, abre **Environment Variables** y añade:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.edusaludcc.com` (tu dominio final) |
| `RESEND_API_KEY` | tu key de [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | `edusaludcc@outlook.com` |
| `CONTACT_FROM_EMAIL` | `EduSaludCC <onboarding@resend.dev>` (o tu dominio verificado) |

4. **Deploy**. En ~90 s queda en `https://<nombre>.vercel.app`.

### 3. Resend (formulario real)

1. Crea cuenta gratis en [resend.com](https://resend.com).
2. **API Keys → Create** → copia el `re_...` a `RESEND_API_KEY` en Vercel.
3. Para enviar desde tu dominio (recomendado a medio plazo):
   - **Domains → Add Domain** → `edusaludcc.com`.
   - Vercel necesita 3 registros DNS (SPF/DKIM/MX). Resend te los muestra.
   - Cuando se verifique, cambia `CONTACT_FROM_EMAIL` a `EduSaludCC <hola@edusaludcc.com>`.
4. Mientras tanto, `onboarding@resend.dev` funciona para tests reales.

### 4. Dominio propio

#### ¿Qué TLD usar?

| Opción | Estado | Recomendación |
|---|---|---|
| `edusaludcc.com` | Ya lo tienes (apunta al sitio Wix actual) | ⭐ **Usar este.** Solo hay que migrar el DNS de Wix a Vercel. |
| `edusaludcc.ec` | El TLD nacional de Ecuador. Disponibilidad en [nic.ec](https://nic.ec). | Buen complemento (~$30/año) — refuerza el SEO local en Ecuador. Lo apuntas como redirect 301 a `.com`. |
| `edusaludcc.edu` | Restringido por EDUCAUSE a **instituciones educativas acreditadas de EE. UU.** | ❌ No aplica para una empresa privada ecuatoriana. |
| `edusaludcc.edu.ec` | Subdominio académico de Ecuador, restringido a **universidades reconocidas por CES**. | ❌ No aplica para una empresa privada (sí para una universidad). |

**Conclusión**: quédate con `edusaludcc.com`. Si quieres reforzar presencia local, agrega `edusaludcc.ec` como dominio secundario.

#### Migrar `edusaludcc.com` de Wix a Vercel (sin caídas)

Tu dominio sigue siendo tuyo — solo cambia a quién apunta. El sitio Wix sigue vivo hasta que tú lo bajes.

**Paso 1 — Añadir el dominio a Vercel**
1. Vercel → tu proyecto `edusaludcc` → **Settings → Domains**.
2. Clic en **Add Domain** → escribe `edusaludcc.com` → **Add**.
3. Repite con `www.edusaludcc.com` (Vercel los enlaza automáticamente).
4. Vercel te mostrará los registros DNS que necesitas. Cópialos.

**Paso 2 — Actualizar DNS en Wix**

Vercel pedirá uno de estos dos (depende de cómo tengas el dominio):

*Opción A — si el dominio está **registrado** en Wix (no solo conectado):*
1. Wix Dashboard → **Domains → Manage** sobre `edusaludcc.com` → **Advanced** → **Edit DNS**.
2. Cambia el registro **A** del apex `@` a `76.76.21.21` (la IP de Vercel).
3. Cambia el **CNAME** de `www` a `cname.vercel-dns.com`.
4. Borra los registros A/CNAME viejos que apuntaban a Wix.
5. Guarda.

*Opción B — si el dominio está **conectado** desde otro registrar (GoDaddy, Namecheap, etc.):*
1. Entra al panel de tu registrar → DNS de `edusaludcc.com`.
2. Aplica los mismos registros del paso A directamente ahí.
3. Wix dejará de servir el sitio cuando los DNS apunten a Vercel.

**Paso 3 — Verificar**
- En Vercel verás un check verde en ~5–60 minutos.
- Propagación global completa: hasta 24h.
- SSL/HTTPS se emite automático (Let's Encrypt vía Vercel).
- Verifica en https://dnschecker.org/#A/edusaludcc.com — debe mostrar `76.76.21.21`.

**Paso 4 — Cerrar el sitio Wix (cuando confirmes que Vercel sirve bien)**
- Wix Dashboard → desactiva la suscripción del sitio o sigue manteniéndolo como backup unos días.

**Tiempo total real**: 15–60 minutos de trabajo activo, hasta 24h de propagación.

#### Bonus: dominio secundario `edusaludcc.ec`

1. Compra en https://nic.ec (registrar oficial de Ecuador) — ~$30/año.
2. Vercel → Domains → Add `edusaludcc.ec` → Vercel te da DNS records.
3. Marca el redirect: Add Domain → en el modal elige **"Redirect to edusaludcc.com"** (308 permanent).
4. Resultado: cualquiera que teclee `edusaludcc.ec` cae en `edusaludcc.com` con SEO transferido.

#### Email profesional `hola@edusaludcc.com`

Una vez en Vercel:
1. **Cloudflare Email Routing** (gratis): si Cloudflare maneja tu DNS, redirige `hola@edusaludcc.com` → tu Outlook actual.
2. O **Resend Domains**: verificas el dominio en Resend (3 registros DNS: SPF + DKIM + DMARC) y ahora puedes enviar emails desde `hola@edusaludcc.com` (no solo `onboarding@resend.dev`).

### 5. Verificar SEO

- `https://tu-dominio/sitemap.xml` debe listar las 4 URLs.
- `https://tu-dominio/robots.txt` debe apuntar al sitemap.
- `https://tu-dominio/opengraph-image` debe servir un PNG 1200×630.
- [Search Console](https://search.google.com/search-console) → añade la propiedad y envía el sitemap.

## Costos esperados

| Servicio | Plan | Costo |
|----------|------|-------|
| Vercel Hobby | Personal / pre-launch | **Gratis** |
| Vercel Pro | Uso comercial real | $20/mes |
| Resend Free | Hasta 3.000 emails/mes (100/día) | **Gratis** |
| Dominio `.com` | Namecheap / Cloudflare | ~$12/año |
| Cloudflare Email Routing | Forwarding hola@…→outlook | **Gratis** |

Para arrancar y validar: **$0–12/año**. Vercel Pro recién cuando el negocio facture.

## Re-skinear esta plantilla a otro cliente

1. Cambia los tokens en `app/globals.css` (`--brand-*`, `--coral-*`).
2. Reemplaza `public/logo.png` por el logo del nuevo cliente.
3. Edita `lib/site.ts` con la nueva copy, contactos y URLs de imágenes.
4. Ajusta metadatos en `app/layout.tsx`.
5. Sin tocar componentes la marca queda re-skinada en minutos.

## Comandos útiles

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # serve production locally
npm run lint     # next lint
```

## Stack de licencias

- Next.js / React / Tailwind / Framer Motion / Lucide / Resend SDK: MIT.
- Fuentes Lexend y Source Sans 3: SIL Open Font License.
- Imágenes de demo: Unsplash License (uso comercial gratis).
- Logo `public/logo.png`: propiedad de EduSaludCC.
