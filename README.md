# Form/Enrollment-System

## Descripción
Este proyecto es un formulario web diseñado para recopilar y gestionar los datos de inscripción de estudiantes en instituciones educativas. Incluye secciones dinámicas para ingresar datos personales, antecedentes académicos, información de familiares, dirección actual e información médica. Utiliza JavaScript para validaciones, generación dinámica de contenido y un modal que muestra un resumen de los datos enviados.

## Características
- **Datos personales**: Captura de nombre, apellidos y validación del NIF.
- **Antecedentes académicos**: Opciones para seleccionar lenguas, niveles educativos y solicitud de estudios.
- **Familiares asociados**: Permite añadir varios familiares de forma dinámica.
- **Dirección actual**: Selección de país, ciudad y población con listas desplegables dinámicas.
- **Información médica**: Campos opcionales para alergias y medicación actual.
- **Validación**: Validación en tiempo real de campos obligatorios y formatos específicos (e.g., NIF, código postal).
- **Código modular**: Archivos JavaScript organizados para facilitar el mantenimiento y escalabilidad.

## Tecnologías utilizadas
- **HTML5**: Estructura del formulario y contenido semántico.
- **CSS3**: Estilos visuales para una experiencia de usuario atractiva.
- **JavaScript**: Funcionalidades dinámicas, validaciones y gestión de eventos.
- **JSON**: Fuente de datos dinámica para opciones del formulario.

## Estructura del Proyecto

project/
├── css/
│   └── styles.css          # Estilos de la aplicación
├── js/
│   ├── alumnoBuilder.js    # Clase para construir objetos de alumnos
│   ├── gestionFormulario.js# Lógica del formulario
├── data/
│   └── data.json           # Archivo con datos para los selects
├── html/
│   └── form.html           # Archivo HTML principal

## Cómo ejecutar el proyecto
1. Clona este repositorio:
   ```bash
   git clone https://github.com/Javigarcilop/Form-Enrollment-System.git
