---
trigger: always_on
---

# Estructura del Proyecto & Arquitectura

## Estructura de Carpetas
- Seguir los patrones de Next.js con App Router.
- Estructura de carpetas:
  - `/src/app/` para las rutas y páginas de la aplicación.
  - `/src/components/` para componentes reutilizables.
  - `/src/components/ui/` para componentes de interfaz de usuario.
  - `/src/lib/` para funciones de utilidad y lógica de negocio.
  - `/src/hooks/` para hooks personalizados de React.
  - `/prisma/schema/` para el esquema de la base de datos.

## Arquitectura de Componentes
- Usar componentes del servidor por defecto y componentes del cliente ('use client') cuando sea necesario.
- Preferir componentes pequeños y reutilizables.
- Mantener la lógica de negocio separada de los componentes de UI.
