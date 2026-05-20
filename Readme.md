# 📅 Sistema de Gestión de Turnos

> Una aplicación web moderna y responsiva para gestionar reservas de turnos de forma sencilla y eficiente.

![Sistema de Turnos](https://img.shields.io/badge/React-18.2.0-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-5.0.0-purple?logo=vite) ![Estado](https://img.shields.io/badge/Estado-Producción-green)

## 🎯 Descripción

**Sistema de Gestión de Turnos** es una aplicación web robusta diseñada para simplificar la administración de citas y reservas. Está dividida en dos áreas principales:

- **Área Pública**: Donde los usuarios pueden consultar turnos disponibles y hacer reservas
- **Área Administrativa**: Donde los administradores gestionan turnos y controlan todas las reservas realizadas

La aplicación utiliza una arquitectura moderna con **React** en el frontend, **Dexie.js** para persistencia de datos en IndexedDB, y **React Router** para navegación entre vistas.

---

## ✨ Características Principales

### 👥 Para Usuarios (Público)

- 🔍 **Visualización de Turnos**: Lista completa de turnos disponibles con información de fecha, horario y cupos
- 🎫 **Reserva de Turnos**: Formulario simple para reservar un turno proporcionando nombre y carnet
- 🔔 **Validación de Cupos**: Sistema automático que muestra el estado de disponibilidad
- ✅ **Confirmación Instantánea**: Recibe confirmación inmediata al completar tu reserva

### 🔐 Para Administradores

- ➕ **Crear Turnos**: Formulario para crear nuevos turnos con fecha, horario y capacidad
- 📋 **Listar Turnos**: Vista de todos los turnos creados con opciones de eliminar
- 👁️ **Control de Reservas**: Panel completo con todas las reservas realizadas
- 🔍 **Búsqueda Avanzada**: Filtra reservas por nombre de cliente
- ❌ **Cancelar Reservas**: Opción para cancelar reservas cuando sea necesario
- 🔒 **Acceso Protegido**: Solo administradores autenticados pueden acceder

---

## 🏗️ Arquitectura de la Aplicación

```
src/
├── components/
│   ├── ProtectedRoute.jsx          # Componente para proteger rutas
│   └── layouts/
│       ├── AdminLayout.jsx         # Layout del panel administrativo
│       └── PublicLayout.jsx        # Layout público
├── context/
│   └── AuthContext.jsx             # Contexto de autenticación
├── db/
│   └── database.js                 # Configuración de Dexie.js
├── hooks/
│   ├── useReservas.js              # Hook para gestionar reservas
│   ├── useStorage.js               # Hook para persistencia de datos
│   └── useTurnos.js                # Hook para gestionar turnos
├── pages/
│   ├── admin/
│   │   ├── CrudTurnos.jsx          # Gestión de turnos (admin)
│   │   └── ListadoReservas.jsx     # Listado de reservas (admin)
│   └── public/
│       ├── Login.jsx               # Página de login
│       └── TurnosPublicos.jsx      # Visualización de turnos públicos
├── App.jsx                         # Componente raíz
└── main.jsx                        # Entrada de la aplicación
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **React 18.2** | Framework UI moderno |
| **Vite 5.0** | Empaquetador ultra-rápido |
| **React Router 7.14** | Enrutamiento de aplicación |
| **Dexie 4.4** | Base de datos en IndexedDB |
| **Dexie React Hooks** | Integración de Dexie con React |

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 16+ instalado
- npm o yarn como gestor de paquetes

### Pasos de Instalación

1. **Clonar o descargar** el repositorio
   ```bash
   cd "Programacion Web Avanzada/Primer Parcial/Implementacion"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**
   - Abre tu navegador y ve a: `http://localhost:5173`

### Compilar para Producción
```bash
npm run build
```

El archivo compilado estará en la carpeta `dist/`.

---

## 📖 Guía de Uso

### 🌐 Área Pública (Turnos Disponibles)

1. **Accede a la página principal** y verás una lista de todos los turnos disponibles
2. **Busca por fecha** usando la barra de búsqueda si lo necesitas
3. **Haz clic en una tarjeta de turno** para abrirte el modal de reserva
4. **Completa el formulario** con tu nombre y carnet de identidad
5. **Confirmá tu reserva** haciendo clic en el botón "Confirmar"
6. **Recibirás una confirmación** instantánea en pantalla

### 🔐 Área Administrativa

#### Acceso

1. Ve al botón **"Acceso Admin"** en la esquina superior derecha
2. Ingresa tus **credenciales** (email y contraseña)
3. Serás redirigido al **panel administrativo**

#### Gestión de Turnos

1. **Crear un Turno**:
   - Ve a la sección "Gestión de Turnos"
   - Completa el formulario con:
     - Fecha del turno
     - Hora de inicio
     - Hora de fin
     - Capacidad máxima
   - Haz clic en "Crear Turno"

2. **Eliminar un Turno**:
   - Localiza el turno en la tabla
   - Haz clic en el botón "🗑️ Eliminar"

#### Control de Reservas

1. **Ver Reservas**:
   - Ve a la sección "Gestión de Reservas"
   - Verás una tabla con todas las reservas realizadas

2. **Buscar una Reserva**:
   - Usa el campo de búsqueda para filtrar por nombre del cliente
   - Los resultados se actualizan en tiempo real

3. **Cancelar una Reserva**:
   - Localiza la reserva en la tabla
   - Si el estado es "confirmada", verás el botón "Cancelar"
   - Haz clic para cancelar la reserva

---

## 💾 Persistencia de Datos

La aplicación utiliza **Dexie.js** y **IndexedDB** para almacenar datos localmente en el navegador. Esto significa:

- ✅ Los datos persisten aunque cierres el navegador
- ✅ No se pierden los turnos y reservas
- ✅ Funciona completamente **offline** después de la primera carga
- ⚠️ Los datos se almacenan localmente por navegador (no se sincronizan entre dispositivos)

---

## 🔐 Autenticación

### Usuarios de Prueba

Para acceder al área administrativa, utiliza:

```
Email: admin@sistema.com
Contraseña: admin123
```

### Sistema de Autenticación

- ✔️ Los datos de autenticación se validan localmente
- ✔️ Sesiones persistentes usando localStorage
- ✔️ Rutas protegidas contra acceso no autorizado
- ✔️ Componente ProtectedRoute para control de acceso

---

## 🎨 Diseño y Experiencia de Usuario

### Características de UX/UI

- 🎨 **Flat Design Moderno**: Interfaz limpia y profesional
- 💫 **Animaciones Fluidas**: Transiciones suaves en toda la aplicación
- 📱 **Responsive**: Se adapta perfectamente a cualquier dispositivo
- 🎯 **Gradientes Elegantes**: Paleta de colores sofisticada
- ✨ **Efectos Hover**: Interactividad mejorada con feedback visual
- 🌈 **Iconografía Clara**: Emojis intuitivos para mejor comprensión

### Paleta de Colores

| Color | Hexadecimal | Uso |
|-------|-------------|-----|
| Azul Primario | #4A90E2 | Botones, focus, acciones |
| Texto Oscuro | #1A1A2E | Encabezados, títulos |
| Gris Neutro | #7F8FA3 | Texto secundario |
| Borde Suave | #E8EEFA | Bordes, divisores |
| Verde Éxito | #2E7D32 | Estados confirmados |
| Rojo Error | #D32F2F | Alertas, cancelaciones |

---

## 📦 Estructura de Base de Datos

### Tabla: `turnos`
```javascript
{
  id,              // ID único
  fecha,           // Fecha del turno (YYYY-MM-DD)
  horaInicio,      // Hora de inicio (HH:mm)
  horaFin,         // Hora de fin (HH:mm)
  capacidadMaxima, // Máximo número de reservas
  estado          // activo | inactivo
}
```

### Tabla: `reservas`
```javascript
{
  id,              // ID único
  turnoId,         // ID del turno asociado
  nombreCliente,   // Nombre completo del cliente
  carnetIdentidad, // Carnet/Documento del cliente
  fechaReserva,    // Fecha en que se hizo la reserva
  estado          // confirmada | cancelada
}
```

---

## 🐛 Solución de Problemas

### Los cambios no se guardan
- Verifica que la **IndexedDB esté habilitada** en tu navegador
- Intenta **limpiar caché y datos** del navegador
- Recarga la página (`Ctrl + F5`)

### No puedo acceder al área administrativa
- Verifica tus **credenciales** (email y contraseña)
- Asegúrate de estar usando el usuario de prueba correcto
- Limpia el almacenamiento local del navegador

### Los turnos no se muestran
- Asegúrate de que al menos un **turno esté activo**
- Verifica que la **fecha sea la correcta**
- Intenta **actualizar la página**

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Información del Desarrollador

- **Materia**: Programación Web Avanzada
- **Período**: Primer Parcial
- **Año**: 2026

---

## 📞 Soporte

Si encuentras problemas o tienes sugerencias:

1. Revisa esta documentación
2. Consulta los problemas conocidos
3. Abre un issue describiendo el problema en detalle

---

## 🎉 ¡Gracias por usar Sistema de Turnos!

Si te ha sido útil, considera darle una ⭐ a este proyecto.

---


