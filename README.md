# API REST: Finanzas Personales

API RESTful para gestionar transacciones financieras personales (ingresos y egresos).

## 🎯 Descripción

Esta API permite crear, leer, actualizar y eliminar transacciones financieras. Implementa todos los verbos HTTP (GET, POST, PUT, DELETE) con validación básica y códigos HTTP correctos.

**Stack:** Hono + TypeScript + Node.js

## 📋 Requerimientos previos

- Node.js 20+ (instalado con nvm)
- yarn (gestor de dependencias)
- Bruno (cliente HTTP para probar endpoints)
- Git

## 🚀 Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/dvx-daphnae/api-finanzas-ipss.git
cd api-finanzas-ipss

# 2. Instalar dependencias
yarn install

# 3. Ejecutar en modo desarrollo
yarn dev

# El servidor estará disponible en http://localhost:3000
```

## 📡 Endpoints

### GET /transactions
Obtiene todas las transacciones.

**Respuesta:** `200 OK`
```json
[
  {
    "id": 1,
    "description": "Salario",
    "amount": 2500,
    "type": "income"
  }
]
```

### GET /transactions/:id
Obtiene una transacción específica por ID.

**Respuesta éxito:** `200 OK`
**Respuesta error:** `404 Not Found`

### POST /transactions
Crea una nueva transacción.

**Body requerido:**
```json
{
  "description": "Compra café",
  "amount": 5.50,
  "type": "expense"
}
```

**Respuesta éxito:** `201 Created`
**Respuesta error:** `400 Bad Request` (campos faltantes o inválidos)

### PUT /transactions/:id
Actualiza una transacción existente.

**Body (campos opcionales):**
```json
{
  "description": "Compra actualizada",
  "amount": 10,
  "type": "income"
}
```

**Respuesta éxito:** `200 OK`
**Respuesta error:** `404 Not Found`

### DELETE /transactions/:id
Elimina una transacción.

**Respuesta éxito:** `200 OK` (con datos eliminados)
**Respuesta error:** `404 Not Found`

## 🧪 Testeo con Bruno

1. Abre Bruno
2. Crea una nueva colección llamada "Finanzas API"
3. Agrega requests para cada endpoint:
   - GET http://localhost:3000/transactions
   - POST http://localhost:3000/transactions
   - PUT http://localhost:3000/transactions/:id
   - DELETE http://localhost:3000/transactions/:id

## 🤖 Uso de IA en este proyecto

**Herramienta:** Claude (Anthropic)

**¿Qué fue generado con IA?**
- Scaffolding y estructura base del proyecto
- Implementación de los 5 endpoints CRUD
- Tipado de TypeScript
- Configuración de eslint y tsconfig

**¿Qué fue hecho manualmente?**
- Prueba funcional de todos los endpoints en Bruno
- Validación y debugging de respuestas HTTP
- Ajustes de lógica y manejo de errores
- Commits al repositorio con mensajes semánticos

**Aprendizaje:**
El proceso permitió entender cómo Hono maneja contextos, cómo TypeScript tipado previene errores en runtime, y la importancia de validar datos en entrada (POST/PUT) antes de procesarlos. El uso de IA acelera el boilerplate, pero la comprensión de qué hace cada línea es crítica para debugging y futuras modificaciones.

## 📝 Notas técnicas

- Los datos se almacenan **en memoria**, no persisten entre reinicios del servidor.
- El `nextId` incrementa automáticamente al crear nuevas transacciones.
- Todos los errores retornan JSON con campo `error` y el código HTTP apropiado.
- Soporta validación básica: campos requeridos y tipos correctos.

## 🔗 Video demostrativo  

https://www.loom.com/share/40fffc1396bb4e32a98dbbb648206e30  

## 📦 Estructura del proyecto

```
api-finanzas-ipss/
├── src/
│   └── index.ts           # API principal con todos los endpoints
├── .eslintrc.json         # Configuración de ESLint
├── .gitignore             # Archivos a ignorar en Git
├── package.json           # Dependencias
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Este archivo
```

## 🛠️ Comandos útiles

```bash
# Modo desarrollo (con hot reload)
yarn dev

# Build para producción
yarn build

# Ejecutar build compilado
yarn start

# Lint del código
yarn lint
```

---

**Fecha de creación:** 16 de abril de 2026
**Evaluación:** Desarrollo de Software - IPSS
