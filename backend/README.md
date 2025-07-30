# Backend Tienda de Ropa

## Requisitos
- Node.js instalado
- MySQL en ejecución y base de datos `tiendaropa` creada

## Instalación

1. Entra a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Inicia el servidor con:
```bash
npm start
```

El backend escuchará en [http://localhost:3000](http://localhost:3000)

## Endpoints disponibles

- `POST /clientes` — Registra un cliente nuevo. Ejemplo de body JSON:
  ```json
  {
    "nombre": "Juan Perez",
    "direccion": "Calle 123",
    "telefono": "5551234567",
    "email": "juan@mail.com"
  }
  ```

Puedes agregar endpoints similares para las demás tablas. 