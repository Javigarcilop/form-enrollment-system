
 async function cargarDatos() {
    try {
      const response = await fetch("../data/data.json");
      const data = await response.json();

      const llenarSelect = (select, opciones) => {
        if (!select) return;
        select.innerHTML = '<option value="">Seleccione...</option>';
        opciones.forEach((opcion) => {
          const option = document.createElement("option");
          option.value = opcion;
          option.textContent = opcion;
          select.appendChild(option);
        });
      };

      // Llenar todos los selects necesarios
      document.querySelectorAll("select").forEach((select) => {
        if (select.id === "lengua-materna") llenarSelect(select, data.lenguasMaternas);
        if (select.id === "idiomas-conocidos") llenarSelect(select, data.idiomasConocidos);
        if (select.id === "pais") llenarSelect(select, Object.keys(data.paises));
        if (select.id === "nivel-estudios") llenarSelect(select, data.nivelesEstudios);
        if (select.id === "idiomas-estudiados") llenarSelect(select, data.idiomasConocidos);
        if (select.id === "nivel-estudio-solicitado") llenarSelect(select, data.nivelesEstudios);
        if (select.id === "alergias") llenarSelect(select, data.alergias);
      });

      // Manejo de País -> Ciudad -> Población
      const paisSelect = document.getElementById("pais");
      if (paisSelect) {
        paisSelect.addEventListener("change", function () {
          const paisValue = this.value;
          const ciudadSelect = document.getElementById("ciudad");
          llenarSelect(ciudadSelect, Object.keys(data.paises[paisValue] || {}));
          const poblacionSelect = document.getElementById("poblacion");
          llenarSelect(poblacionSelect, []);
        });
      }

      const ciudadSelect = document.getElementById("ciudad");
      if (ciudadSelect) {
        ciudadSelect.addEventListener("change", function () {
          const paisValue = paisSelect.value;
          const poblacionSelect = document.getElementById("poblacion");
          llenarSelect(poblacionSelect, data.paises[paisValue]?.[this.value] || []);
        });
      }

      // Manejo de agregar un familiar
      document.getElementById("add-familiar-btn").addEventListener("click", function () {
        const container = document.getElementById("familiares-container");
        const nuevoFamiliar = document.createElement("div");
        nuevoFamiliar.classList.add("familiar");

        nuevoFamiliar.innerHTML = `
          <label>Nombre <span class="required">*</span></label>
          <input type="text" name="familiar-nombre" required>

          <label>Apellidos <span class="required">*</span></label>
          <input type="text" name="familiar-apellidos" required>

          <label>NIF <span class="required">*</span></label>
          <input type="text" name="familiar-nif" required pattern="^[A-Z0-9]{8}[A-Z]$">

          <label for="familiar-profesion">Profesión <span class="required">*</span></label>
          <select name="familiar-profesion" class="familiar-profesion" required>
            <option value="">Seleccione...</option>
          </select>

          <label for="familiar-ciudad-nacimiento">Ciudad de Nacimiento <span class="required">*</span></label>
          <select name="familiar-ciudad-nacimiento" class="familiar-ciudad-nacimiento" required>
            <option value="">Seleccione...</option>
          </select>

          <label for="familiar-lengua-materna">Lengua Materna <span class="required">*</span></label>
          <select name="familiar-lengua-materna" class="familiar-lengua-materna" required>
            <option value="">Seleccione...</option>
          </select>

          <label for="familiar-idiomas-conocidos">Idiomas Conocidos <span class="required">*</span></label>
          <select name="familiar-idiomas-conocidos" class="familiar-idiomas-conocidos" multiple required size="5">
            <option value="">Seleccione...</option>
          </select>

          <!-- Botón de Eliminar -->
          <button type="button" class="eliminar-familiar-btn">Eliminar Familiar</button>
        `;
         // Agregar el nuevo familiar al contenedor
  container.appendChild(nuevoFamiliar);

  // Evento para eliminar un familiar
  nuevoFamiliar.querySelector(".eliminar-familiar-btn").addEventListener("click", function () {
    container.removeChild(nuevoFamiliar);
  });


        // Llenar los selects de profesiones, ciudades y demás para los familiares
        const profesionesSelect = nuevoFamiliar.querySelector(".familiar-profesion");
        llenarSelect(profesionesSelect, data.profesiones);

        const ciudadesNacimientoSelect = nuevoFamiliar.querySelector(".familiar-ciudad-nacimiento");
        llenarSelect(ciudadesNacimientoSelect, Object.keys(data.paises)); // Asegurar que esté relacionado con las ciudades

        const lenguaMaternaSelect = nuevoFamiliar.querySelector(".familiar-lengua-materna");
        llenarSelect(lenguaMaternaSelect, data.lenguasMaternas);

        const idiomasConocidosSelect = nuevoFamiliar.querySelector(".familiar-idiomas-conocidos");
        llenarSelect(idiomasConocidosSelect, data.idiomasConocidos);

        // Agregar funcionalidad al botón de eliminar
        const eliminarBtn = nuevoFamiliar.querySelector(".eliminar-familiar-btn");
        eliminarBtn.addEventListener("click", function () {
          container.removeChild(nuevoFamiliar);
        });

        container.appendChild(nuevoFamiliar);
      });

    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  }

  // Función para mostrar el modal
  function mostrarModal(datos) {
    const modal = document.getElementById("modal");
    const infoDiv = document.getElementById("alumno-info");

    // Verificar que el modal y el div de información estén definidos
    if (modal && infoDiv) {
      infoDiv.innerHTML = datos;
      modal.style.display = "block"; // Mostrar el modal cambiando su estilo de display a "block"
    }
  }

  // Esperamos a que el DOM esté cargado para añadir los eventos
  document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();

    // Enviar el formulario
    document.getElementById("inscripcion-form").addEventListener("submit", function (event) {
      event.preventDefault();

      // Crear objeto Alumno con el Builder
      const datosAlumno = new AlumnoBuilder()
        .setNombre(document.getElementById("nombre").value)
        .setApellidos(document.getElementById("apellidos").value)
        .setNif(document.getElementById("nif").value)
        .setLenguaMaterna(document.getElementById("lengua-materna").value)
        .setIdiomasConocidos(Array.from(document.getElementById("idiomas-conocidos").selectedOptions).map(option => option.value))
        .setDireccion({
          pais: document.getElementById("pais").value,
          ciudad: document.getElementById("ciudad").value,
          poblacion: document.getElementById("poblacion").value,
          direccionCompleta: document.getElementById("direccion-completa").value,
          codigoPostal: document.getElementById("codigo-postal").value
        })
        .setDatosAcademicos({
          colegioProcedencia: document.getElementById("colegio-procedencia").value,
          nivelEstudios: document.getElementById("nivel-estudios").value,
          idiomasEstudiados: Array.from(document.getElementById("idiomas-estudiados").selectedOptions).map(option => option.value)
        })
        .setInformacionMedica({
          alergias: Array.from(document.getElementById("alergias").selectedOptions).map(option => option.value),
          medicacionActual: document.getElementById("medicacion-actual").value
        })
        .setFamiliares(Array.from(document.querySelectorAll("#familiares-container .familiar")).map(familiar => ({
          nombre: familiar.querySelector("[name='familiar-nombre']").value,
          apellidos: familiar.querySelector("[name='familiar-apellidos']").value,
          nif: familiar.querySelector("[name='familiar-nif']").value,
          profesion: familiar.querySelector("[name='familiar-profesion']").value,
          ciudadNacimiento: familiar.querySelector("[name='familiar-ciudad-nacimiento']").value,
          lenguaMaterna: familiar.querySelector("[name='familiar-lengua-materna']").value,
          idiomasConocidos: Array.from(familiar.querySelector("[name='familiar-idiomas-conocidos']").selectedOptions).map(option => option.value)
        })))
        .build();

      // Crear el contenido para el modal
      let alumnoInfo = `
        <p><strong>Nombre:</strong> ${datosAlumno.nombre}</p>
        <p><strong>Apellidos:</strong> ${datosAlumno.apellidos}</p>
        <p><strong>NIF:</strong> ${datosAlumno.nif}</p>
        <p><strong>Lengua Materna:</strong> ${datosAlumno.lenguaMaterna}</p>
        <p><strong>Idiomas Conocidos:</strong> ${datosAlumno.idiomasConocidos.join(', ')}</p>
        <p><strong>País:</strong> ${datosAlumno.direccion.pais}</p>
        <p><strong>Ciudad:</strong> ${datosAlumno.direccion.ciudad}</p>
        <p><strong>Población:</strong> ${datosAlumno.direccion.poblacion}</p>
        <p><strong>Dirección Completa:</strong> ${datosAlumno.direccion.direccionCompleta}</p>
        <p><strong>Código Postal:</strong> ${datosAlumno.direccion.codigoPostal}</p>
        <p><strong>Colegio Procedencia:</strong> ${datosAlumno.datosAcademicos.colegioProcedencia}</p>
        <p><strong>Nivel Estudios:</strong> ${datosAlumno.datosAcademicos.nivelEstudios}</p>
        <p><strong>Idiomas Estudiados:</strong> ${datosAlumno.datosAcademicos.idiomasEstudiados.join(', ')}</p>
        <p><strong>Alergias:</strong> ${datosAlumno.informacionMedica.alergias.join(', ')}</p>
        <p><strong>Medicación Actual:</strong> ${datosAlumno.informacionMedica.medicacionActual}</p>
      `;

      // Mostrar el modal
      mostrarModal(alumnoInfo);
    });

    // Cerrar el modal
    document.getElementById("close-modal-btn").addEventListener("click", () => {
      document.getElementById("modal").style.display = "none";
    });

    document.querySelector(".close").addEventListener("click", () => {
      document.getElementById("modal").style.display = "none";
    });
  });

