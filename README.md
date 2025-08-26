# 🏭 Formulario de Control de Silos y Materiales

Sistema completo en React para el control y registro de mediciones de silos, camiones y estanques de planta ARL.

## 📋 Características del Formulario

### 1. **Datos del Operador**
- Nombre del operador
- Fecha y hora del registro

### 2. **Silos de Materias Primas (8 silos en formato 3x3)**
- **Fila 1:** C1 Matriz, B1 Matriz, A1 Matriz
- **Fila 2:** C2 Matriz, B2 Nitrato, A1 Nitrato  
- **Fila 3:** C3 Nitrato, Sin Silo, A3 Nitrato
- Cada silo registra: tipo de material y medición en metros

### 3. **Camiones Fábrica (hasta 14 camiones)**
- ID del camión
- Tipo y kilos de nitrato
- Tipo y kilos de matriz

### 4. **Recepción de Camiones**
- ID del camión
- Tipo de material
- Kilos recibidos

### 5. **Planta ARL (3 estanques)**
- Estanque 1: Petróleo (20 m³)
- Estanque 2: Mezcla (30 m³)
- Estanque 3: Aceite (20 m³)

### 6. **Control de Stock**
- Recepción de petróleo/aceite
- Fabricación de mezcla
- Litros de petróleo y aceite
- Porcentajes

## 🚀 Instalación y Uso

### Paso 1: Crear el proyecto
```bash
# Crear carpeta del proyecto
mkdir formulario-silos
cd formulario-silos

# Copiar todos los archivos descargados a esta carpeta
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Ejecutar el proyecto
```bash
npm run dev
```

### Paso 4: Abrir en el navegador
Abre tu navegador en: `http://localhost:5173`

## 📁 Estructura del Proyecto

```
formulario-silos/
├── src/
│   ├── FormularioSilos.jsx    # Componente principal del formulario
│   ├── FormularioSilos.css    # Estilos del formulario
│   ├── App.jsx                # Componente raíz
│   ├── App.css                # Estilos generales
│   └── main.jsx               # Punto de entrada
├── index.html                 # HTML base
├── package.json               # Dependencias del proyecto
├── vite.config.js            # Configuración de Vite
└── README.md                 # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **React Hook Form** - Manejo de formularios
- **Vite** - Herramienta de desarrollo
- **CSS Grid/Flexbox** - Layout responsivo

## ✨ Funcionalidades

- ✅ **Formulario dinámico** con secciones organizadas
- ✅ **Validaciones** en campos obligatorios
- ✅ **Camiones dinámicos** (agregar/eliminar hasta 14)
- ✅ **Layout responsivo** para móviles y desktop
- ✅ **Interfaz intuitiva** con colores diferenciados por sección
- ✅ **Datos estructurados** listos para enviar a API

## 📱 Responsive Design

El formulario se adapta automáticamente a:
- 📱 **Móviles** (menos de 768px)
- 💻 **Tablets** (768px - 1024px)
- 🖥️ **Desktop** (más de 1024px)

## 🔧 Personalización

### Agregar nuevos tipos de materiales:
Edita las opciones en `FormularioSilos.jsx`:

```jsx
<option value="nuevo_material">Nuevo Material</option>
```

### Cambiar colores:
Modifica las variables CSS en `FormularioSilos.css`:

```css
/* Cambiar color principal */
background: linear-gradient(135deg, #TU_COLOR 0%, #TU_COLOR2 100%);
```

## 📊 Datos de Salida

Al enviar el formulario, obtienes un objeto JSON estructurado con:

```json
{
  "operador": "Juan Pérez",
  "fecha": "2024-01-15",
  "hora": "14:30",
  "silos": {
    "c1_matriz": { "tipo": "matriz_a", "medicion": "15.5" },
    // ... más silos
  },
  "camionesFabrica": [
    {
      "idCamion": "CAM001",
      "tipoNitrato": "nitrato_amonio",
      "kilosNitrato": "1000",
      // ... más datos
    }
  ],
  // ... más secciones
}
```

## 🆘 Soporte

Si tienes problemas:

1. **Verifica que Node.js esté instalado** (versión 16+)
2. **Ejecuta `npm install`** para instalar dependencias
3. **Revisa la consola** del navegador para errores
4. **Asegúrate de que todos los archivos** estén en la carpeta correcta

## 🎯 Próximas Mejoras

- [ ] Conexión con base de datos
- [ ] Exportar datos a Excel/PDF
- [ ] Historial de registros
- [ ] Gráficos de tendencias
- [ ] Notificaciones automáticas

---

**¡Listo para usar! 🚀**
