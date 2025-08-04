---
trigger: model_decision
description: Reglas para el diseño de interfaz de usuario y estilos en la aplicación ClimbUp
---

# Estilo & UI

## Frameworks y Bibliotecas
- Usar Tailwind CSS (v4.1.11) para estilos.
- Usar DaisyUI (v5.0.46) para componentes de UI.
- Usar clases de Tailwind con convenciones de DaisyUI (ej. `btn`, `btn-ghost`).

## Idioma y Localización
- Interfaz en español para todos los textos visibles al usuario.
- Mantener todos los mensajes y etiquetas en español.

## Iconos & Imágenes
- Usar @phosphor-icons/react para íconos.
- Usar el componente Image de Next.js para optimización de imágenes.

## Gestión de Estado
- Usar React Context para gestión de estado cuando sea necesario.
- Preferir props para pasar datos entre componentes cercanos.