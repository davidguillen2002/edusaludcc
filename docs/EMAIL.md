# 📧 Correo profesional EduSaludCC — guía operativa

Garantiza que **toda consulta del formulario llegue a `edusaludcc@outlook.com`** con las mejores prácticas de deliverability (Outlook y Gmail confían en el remitente, no caen en spam, hay reintentos, y el cliente recibe confirmación con número de referencia).

---

## Cómo funciona el sistema (resumen)

Cuando alguien envía el formulario en `https://edusaludcc.com/#contacto`:

1. **Rate limit** — máximo 5 envíos / 10 min por IP.
2. **Honeypot** — bots que rellenan todos los campos son aceptados silenciosamente.
3. **Validación Zod** — name/email/phone/type/message validados server-side.
4. **Email al admin (`edusaludcc@outlook.com`)** — con todos los datos, HTML + texto plano, `Reply-To: <correo-del-cliente>`. Reintentos automáticos en errores 5xx/timeout.
5. **Email de confirmación al cliente** (si dejó email) — copia de su mensaje + referencia única.
6. **Logs estructurados** en Vercel — cada envío queda registrado.
7. **Referencia única** (`YYYYMMDD-HHMM-XXXX`) — la ve el cliente, queda en logs y en ambos correos.

---

## Variables de entorno (Vercel)

`Project → Settings → Environment Variables` (Production + Preview + Development):

| Nombre | Valor | Obligatorio |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxx` (desde [resend.com/api-keys](https://resend.com/api-keys)) | ✅ Sí |
| `CONTACT_TO_EMAIL` | `edusaludcc@outlook.com` | ✅ Sí |
| `CONTACT_FROM_EMAIL` | `EduSaludCC <hola@edusaludcc.com>` *(después de verificar dominio)* | ✅ Sí |
| `NEXT_PUBLIC_SITE_URL` | `https://edusaludcc.com` | Opcional pero recomendado |

> Si `RESEND_API_KEY` no existe en producción, el formulario muestra un error claro al usuario y NO pretende haber enviado el correo (el código retorna `{ ok: false }` y loggea CRITICAL).

Después de cambiar cualquier env var: **Deployments → último deploy → ⋮ → Redeploy** (sin "Use existing build cache").

---

## Setup paso a paso

### A. Cuenta Resend (1 vez · gratis)

1. Regístrate en https://resend.com/signup con `edusaludcc@outlook.com`.
2. Plan free: 3.000 emails / mes, 100 / día. Sin tarjeta.
3. **API Keys → Create API Key** → nombre `vercel-prod`, permisos `Sending access` → copia el `re_...` y guárdalo en Vercel como `RESEND_API_KEY`.

### B. Verificación de dominio `edusaludcc.com` (1 vez · gratis · ~10 min)

Esto le dice a Outlook/Gmail "este servidor SÍ puede enviar mails firmados por `@edusaludcc.com`" — sin esto, los correos caen en spam.

1. Resend → **Domains → Add Domain** → escribe `edusaludcc.com` → Add.
2. Resend te muestra 3 registros DNS (los necesitas en Cloudflare DNS):

   | Tipo | Nombre | Contenido |
   |---|---|---|
   | `MX` | `send` (o `@` según indique) | `feedback-smtp.us-east-1.amazonses.com` · prioridad `10` |
   | `TXT` | `send._domainkey` | clave DKIM larga que Resend muestra |
   | `TXT` | `@` o `_dmarc` | políticas SPF/DMARC sugeridas |

3. Cloudflare → DNS → Records → **Add** cada uno como te indica Resend (copia/pega exactamente).
4. **⚠️ Importante con Cloudflare Email Routing activo**: ya tienes un SPF (`v=spf1 include:_spf.mx.cloudflare.net ~all`). NO dejes 2 SPF (los invalida). Combina ambos en uno:
   ```
   v=spf1 include:_spf.mx.cloudflare.net include:amazonses.com ~all
   ```
5. Resend → Domains → **Verify**. En 5-10 min queda verde.
6. Vercel → env var `CONTACT_FROM_EMAIL` → cámbialo a `EduSaludCC <hola@edusaludcc.com>`. Redeploy.

A partir de aquí, los mails al admin se ven en Outlook como provenientes de **EduSaludCC <hola@edusaludcc.com>** (no del genérico `onboarding@resend.dev`).

### C. Recibir mails a `hola@edusaludcc.com` (Cloudflare Email Routing · gratis)

Independiente de Resend — esto es para que los emails ENTRANTES a `hola@edusaludcc.com` lleguen a tu Outlook.

1. Cloudflare → tu sitio → **Email → Email Routing → Get started**. Acepta los registros MX automáticos.
2. **Destination Addresses → Add** → `edusaludcc@outlook.com` → confirma desde el inbox de outlook.
3. **Routes → Create address** → `hola@edusaludcc.com` → forward to `edusaludcc@outlook.com`. Repite para `contacto@`, `info@`, etc.
4. (Opcional) **Catch-all** → cualquier `*@edusaludcc.com` cae al outlook (no pierdes mails con typo).

Test: manda un email desde gmail a `hola@edusaludcc.com` — debe llegar a outlook en segundos.

### D. DMARC (deliverability · 2 min)

Cloudflare → DNS → **Add Record**:
- Type: `TXT`
- Name: `_dmarc`
- Content: `v=DMARC1; p=quarantine; rua=mailto:edusaludcc@outlook.com; pct=100`

Esto le dice al mundo "los mails que dicen ser de `@edusaludcc.com` deben tener DKIM válido — los que no, mándelos a spam y avísame a esta dirección". Mejora reputación + alerta de phishing.

---

## Cómo testear que todo llega bien

### Test 1 · El correo al admin llega

1. Abre la home en incógnito → scroll hasta el form → completa con tu email personal → enviar.
2. Verás un banner verde "Mensaje enviado correctamente · Referencia: 20260525-XXXX-XXXX".
3. Outlook (`edusaludcc@outlook.com`) debería tener un correo nuevo en < 30 segundos:
   - **De**: `EduSaludCC <hola@edusaludcc.com>` (post-verificación)
   - **Asunto**: `[EduSaludCC] <tipo> · <tu nombre> · <referencia>`
   - **Reply-To**: tu email personal (al darle Reply en outlook, va directo a ti)
   - **Cuerpo**: tabla con todos los datos + mensaje

### Test 2 · El cliente recibe confirmación

1. Tu email personal (el que pusiste en el form) debería tener un correo:
   - **Asunto**: `Recibimos tu consulta · EduSaludCC · <referencia>`
   - **Cuerpo**: agradecimiento + copia de su mensaje + WhatsApp de respaldo.

### Test 3 · Verificar logs en Vercel

1. Vercel → Project → **Logs**.
2. Cada envío produce:
   - `[contact] admin sent { reference, ip, type, resendId }`
   - `[contact] user confirmation sent { reference, resendId }`
3. Si algo falla, verás `[contact] admin send FAILED` con detalle.

### Test 4 · Resend dashboard

https://resend.com/emails — verás cada envío con estado (delivered, bounced, opened) + los tags (`category: contact_form`, `audience: admin` / `user_confirmation`).

---

## Troubleshooting rápido

| Síntoma | Causa probable | Solución |
|---|---|---|
| Outlook no recibe nada | `RESEND_API_KEY` mal cargado en Vercel | Vercel → Env Vars → revisar el valor + Redeploy |
| Mails caen en **Junk / Correo no deseado** en Outlook | Dominio no verificado en Resend (envías desde `onboarding@resend.dev`) | Hacer Paso B (Verificación de dominio). Outlook desconfía de remitentes sin SPF/DKIM propio |
| Form muestra "El envío de correo no está configurado…" | `RESEND_API_KEY` ausente en prod | Añadirlo en Vercel Env Vars + Redeploy |
| El cliente no recibe la confirmación pero el admin sí | El email del cliente tiene typo / dominio no existe | Esperado — el admin ya recibió la consulta y el `Reply-To` apunta al email del cliente, así que ya tienes contexto |
| "Demasiadas consultas. Intenta de nuevo en X min." | Rate limit por IP (5 / 10 min) | Esperar o ajustar `max` en `lib/rate-limit.ts` |

---

## Costos

| Servicio | Plan | Uso típico EduSaludCC | Costo |
|---|---|---|---|
| Resend | Free | <100 emails/día | **$0** |
| Cloudflare Email Routing | Free | Ilimitado | **$0** |
| Cloudflare DNS | Free | Ilimitado | **$0** |
| Vercel Hobby | Free | <100 GB bandwidth | **$0** |

Total: **$0/mes**. Solo el dominio (`edusaludcc.com` ~$12/año).

Si EduSaludCC llega a >100 emails/día → Resend Pro ($20/mes, 50.000 emails). Para >100k consultas/mes → eso ya es otro problema feliz de tener.
