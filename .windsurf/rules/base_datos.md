---
trigger: model_decision
description: Reglas para el manejo de base de datos y ORM en la aplicación ClimbUp
---

# Base de Datos & ORM

## Configuración y Entorno
- Usar Prisma como ORM para acceso a la base de datos.
- Base de datos PostgreSQL en Docker.
- Configuración de entorno a través de variables en .env.

## Estructura y Modelado
- Estructura de la base de datos centrada en organizadores, competiciones y participantes.
- Mantener el esquema de la base de datos en `/prisma/schema/`.
- Usar modelos de Prisma para definir la estructura de datos.

## Acceso a Datos
- Implementar funciones de acceso a datos en `/src/lib/db/`.
- Mantener la lógica de acceso a datos separada de los componentes de UI.
- Utilizar transacciones para operaciones que afecten a múltiples tablas.
