# ClimbUp

Aplicación para gestionar competencias de escalada en formato de ronda americana.

## Requisitos Previos

- Node.js
- Docker y Docker Compose
- Yarn

## Configuración del Entorno

1. **Clonar el repositorio**
```bash
git clone [url-del-repositorio]
cd ClimbUp
```

2. **Instalar dependencias**
```bash
yarn install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/climbup"
POSTGRES_URL_NON_POOLING="postgresql://postgres:postgres@localhost:5432/climbup"
```

## Ejecución del Proyecto

1. **Iniciar la base de datos**

> **Nota**: Si tienes PostgreSQL corriendo localmente, necesitarás detenerlo primero ya que usa el mismo puerto (5432):
> ```bash
> sudo systemctl stop postgresql
> ```

```bash
docker compose up -d
```

2. **Ejecutar las migraciones**
```bash
npx prisma migrate dev
```

3. **Ejecutar el seed** (para crear datos iniciales):
```bash
npx prisma db seed
```

4. **Iniciar el servidor de desarrollo**
```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## Base de Datos

El proyecto utiliza PostgreSQL a través de Docker. Los detalles de conexión son:

- Host: localhost
- Puerto: 5432
- Base de datos: climbup
- Usuario: postgres
- Contraseña: postgres

### Revisar la Base de Datos

Hay varias formas de revisar los datos:

1. **Usando Prisma Studio** (interfaz visual):
```bash
npx prisma studio
```
Esto abrirá una interfaz web en `http://localhost:5555`

2. **Usando psql en el contenedor Docker**:
```bash
docker exec -it climbup_db psql -U postgres -d climbup
```

Comandos útiles de psql:
- `\dt` - Listar todas las tablas
- `\d+ nombre_tabla` - Ver estructura de una tabla
- `SELECT * FROM "Competition";` - Ver todas las competencias
- `\q` - Salir de psql

## Scripts Disponibles

- `yarn dev`: Inicia el servidor de desarrollo
- `yarn build`: Construye la aplicación para producción
- `yarn start`: Inicia la aplicación en modo producción
- `yarn lint`: Ejecuta el linter
