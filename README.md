# Cashi API — Finanzas Personales

> API REST robusta para gestionar ingresos, egresos y categorías. Construida con **Hono**, **Prisma** y **PostgreSQL** siguiendo arquitectura **N-Layer**.

---

## Stack y versiones

| Herramienta | Versión | ¿Para qué? |
|---|---|---|
| **Hono** | Latest | Framework ultra rápido para Node.js |
| **Prisma** | 7.x | ORM type-safe con migrations automáticas |
| **PostgreSQL** | 16 | Base de datos relacional |
| **TypeScript** | ~5.x | Tipado estricto en todas las capas |
| **Zod** | 4.x | Validación de esquemas en runtime |
| **Docker** | — | Orquestación de PostgreSQL |

---

## Cómo empezar

### 1. Instalar dependencias

```bash
yarn install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

### 3. Levantar base de datos

```bash
docker compose up -d
```

### 4. Migraciones y cliente Prisma

```bash
yarn prisma:generate
yarn prisma:migrate
```

### 5. Iniciar servidor

```bash
yarn dev
```

Disponible en `http://localhost:3000`.

---

## Arquitectura N-Layer

- **Routes:** Mapeo de URLs a controllers
- **Controllers:** Validación (Zod) y lógica HTTP
- **Repositories:** Acceso a datos (Prisma)
- **Schemas:** Validación y tipos

---

## Endpoints

### Transacciones

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/transactions` | Lista todas |
| GET | `/transactions/:id` | Detalle |
| POST | `/transactions` | Crea |
| PATCH | `/transactions/:id` | Actualiza |
| DELETE | `/transactions/:id` | Elimina |
| GET | `/transactions/balance` | Balance general |

### Categorías

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/categories` | Lista todas |
| GET | `/categories/:id` | Detalle |
| POST | `/categories` | Crea |
| PATCH | `/categories/:id` | Actualiza |
| DELETE | `/categories/:id` | Elimina |

---

## Video demostrativo

[Ver en Loom](https://www.loom.com/share/2bf5a40fcc9e4418b44dd2bfa73b375a)

---

## Desafíos técnicos resueltos

### Desfase de tipos en Prisma Client

El cliente generado no reconocía el modelo `Transaction`. Se corrigió la importación en `lib/prisma.ts` para apuntar al index principal del cliente generado.

**Solución:** Ejecutar `yarn prisma:generate` cada vez que se modifique el schema.

### Validación de relaciones

Se implementó manejo de errores de FK para asegurar que transacciones solo se creen con categorías válidas.

---

## Scripts

```bash
yarn dev                 # Desarrollo
yarn build              # Compilar
yarn prisma:generate    # Regenerar cliente
yarn prisma:migrate     # Migraciones
yarn prisma:studio     # Visual BD
```

---

## Uso de IA

Este proyecto fue desarrollado con asistencia de Claude. Se utilizó para scaffolding, boilerplate de repositories/controllers y validación de schemas. El código fue probado y validado manualmente.

---

**Entrega:** 16 de mayo, 2026