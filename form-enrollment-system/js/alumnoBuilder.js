// Clase Alumno
class Alumno {
  constructor() {
    this.nombre = "";
    this.apellidos = "";
    this.nif = "";
    this.lenguaMaterna = "";
    this.idiomasConocidos = [];
    this.direccion = {};
    this.datosAcademicos = {};
    this.informacionMedica = {};
    this.familiares = [];
  }
}

// Clase AlumnoBuilder para construir el objeto Alumno
class AlumnoBuilder {
  constructor() {
    this.alumno = new Alumno();
  }

  setNombre(nombre) {
    this.alumno.nombre = nombre;
    return this;
  }

  setApellidos(apellidos) {
    this.alumno.apellidos = apellidos;
    return this;
  }

  setNif(nif) {
    this.alumno.nif = nif;
    return this;
  }

  setLenguaMaterna(lenguaMaterna) {
    this.alumno.lenguaMaterna = lenguaMaterna;
    return this;
  }

  setIdiomasConocidos(idiomasConocidos) {
    this.alumno.idiomasConocidos = idiomasConocidos;
    return this;
  }

  setDireccion(direccion) {
    this.alumno.direccion = direccion;
    return this;
  }

  setDatosAcademicos(datosAcademicos) {
    this.alumno.datosAcademicos = datosAcademicos;
    return this;
  }

  setInformacionMedica(informacionMedica) {
    this.alumno.informacionMedica = informacionMedica;
    return this;
  }

  setFamiliares(familiares) {
    this.alumno.familiares = familiares;
    return this;
  }

  build() {
    return this.alumno;
  }
}
