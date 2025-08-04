---
trigger: model_decision
description: Reglas para la autenticación y autorización en la aplicación ClimbUp
---

# Autenticación & Autorización

## Configuración
- Usar NextAuth para autenticación.
- Configurar NextAuth en `/src/lib/auth.ts`.
- Utilizar el adaptador de Prisma para NextAuth (@next-auth/prisma-adapter).

## Roles y Permisos
- Implementar roles de usuario (Admin, SuperAdmin).
- Verificar permisos de usuario antes de permitir acciones restringidas.
- Usar middleware para proteger rutas que requieren autenticación.

## Seguridad
- Almacenar contraseñas hasheadas con bcrypt.
- Implementar protección CSRF en formularios.
- Usar tokens JWT para sesiones de usuario.
