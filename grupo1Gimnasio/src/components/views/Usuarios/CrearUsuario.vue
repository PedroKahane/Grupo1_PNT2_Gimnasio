<template>
  <div class="container mt-4 ">
    <div class="text-center">
      <h4>Registrarse</h4>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="user">
        <div class="card bg-light text-dark mb-5">
          <div class="card-body">
            <p>
              <strong>Nombre: </strong><input class="form-control" type="text" v-model="user.nombre"
                placeholder="tuNombre" />
            </p>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
              <strong>El nombre no puede contener números o estar vacío</strong>
            </h6>
            <p>
              <strong>Apellido: </strong><input class="form-control" type="text" v-model="user.apellido"
                placeholder="tuApellido" />
            </p>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorApellido">
              <strong>El apellido no puede contener números o estar vacío</strong>
            </h6>
            <p><strong>Mail: </strong><input class="form-control" type="email" v-model="user.mail"
                placeholder="tuMail@ejemplo.com" /></p>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorMailYaRegistrado">
              <strong>Error, este MAIL ya se encuentra registrado</strong>
            </h6>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-else-if="errorMail">
              <strong>Formato de mail inválido</strong>
            </h6>
            <div class="form-group row mb-3">
              <p>
                <strong>Contraseña: </strong>
              </p>
              <div class="col">
                <input :type="mostrar" class="form-control" v-model="user.password" placeholder="tuContraseña" required />
              </div>
              <div class="col-auto">
                <button class="btn btn-outline-dark" type="button" id="togglePassword" @mousedown="mostrarContraseña"
                  @mouseup="mostrarContraseña">Ver contraseña</button>
              </div>
            </div>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorContraseña">
              <strong>Error, la contraseña debe contener al menos 8 caracteres, un número y una
                mayúscula</strong>
            </h6>
            <h6 class="alert alert-success alert-sm mb-0 text-center m-2 mb-3" v-else>
              <strong>La contraseña debe contener al menos 8 caracteres, un número y una
                mayúscula</strong>
            </h6>
            <p>
              <strong>Altura: </strong><input class="form-control" type="number" v-model="user.altura"
                placeholder="180 (en cm)" />
            </p>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorAltura">
              <strong>La altura debe ser entre 1 y 300 cm</strong>
            </h6>
            <p><strong>Peso: </strong><input class="form-control" type="number" v-model="user.peso"
                placeholder="80 (en kg)" /></p>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorPeso">
              <strong>El peso debe ser entre 1 y 500 kg</strong>
            </h6>
            <p><strong>Edad: </strong><input class="form-control" type="number" v-model="user.edad"
                placeholder="45 (0 - 100)" /></p>
            <p>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorEdad">
              <strong>La edad debe ser entre 1 y 100 años</strong>
            </h6>
            <strong>Contacto: </strong><input class="form-control" type="tel" v-model="user.contacto"
              placeholder="11 12345678" />
            </p>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorContacto">
              <strong>Formato del telefono inválido</strong>
            </h6>
            <p hidden>
              <strong>Administrador: </strong><input class="form-control" type="checkbox" v-model="user.administrador" />
            </p>
            <p><strong>Dni: </strong><input class="form-control" type="number" v-model="user.dni"
                placeholder="12345678" /></p>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorDNIYaRegistrado">
              <strong>Error, este DNI ya se encuentra registrado</strong>
            </h6>
            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-else-if="errorDNI">
              <strong>Formato del dni inválido</strong>
            </h6>
            <button class="btn btn-primary mx-auto d-block" @click="createUsuario">Crear cuenta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
</template>

<script>
import { useElementStore } from "../../../stores/Store";
import { useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";

export default {
  setup() {
    const elementStore = useElementStore("usuarios")();
    elementStore.setCurrentElement({
      nombre: "",
      apellido: "",
      mail: "",
      password: "",
      altura: "",
      peso: "",
      edad: "",
      contacto: "",
      administrador: false,
      dni: "",
      ticketsRestantes: 0,
    });

    const user = computed(() => elementStore.currentElement);
    const router = useRouter();
    const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";

    onMounted(() => {
      elementStore.fetchElements(url)
    })

    const createUsuario = async () => {
      const { dniRepetido, emailRepetido } = elementStore.verificarExistencia(elementStore.currentElement);
      setearEnFalse();
      //console.log(dniRepetido, emailRepetido)
      if (dniRepetido) { errorDNIYaRegistrado.value = true }
      if (emailRepetido) { errorMailYaRegistrado.value = true }

      if (validar() && !emailRepetido && !dniRepetido && elementStore.confirm("crear", "registrado", "Usuario")) {
        await elementStore.createElement(url, user.value);
        router.push("/login");
      }
    };

    const errorNombre = ref(false);
    const errorApellido = ref(false);
    const errorMail = ref(false);
    const errorContraseña = ref(false);
    const errorAltura = ref(false);
    const errorPeso = ref(false);
    const errorEdad = ref(false);
    const errorContacto = ref(false);
    const errorDNI = ref(false);
    const errorDNIYaRegistrado = ref(false);
    const errorMailYaRegistrado = ref(false);

    function validar() {
      let resultado = true;

      const persona = elementStore.currentElement;
      if (/\d/.test(persona.nombre) || persona.nombre.trim() === '') { errorNombre.value = true; resultado = false; }
      if (/\d/.test(persona.apellido) || persona.apellido.trim() === '') { errorApellido.value = true; resultado = false; }
      if (!/@/.test(persona.mail)) { errorMail.value = true; resultado = false; }
      if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(persona.password)) { errorContraseña.value = true; resultado = false; }
      if (!(Number(persona.altura) >= 1 && Number(persona.altura) <= 300)) { errorAltura.value = true; resultado = false; }
      if (!(Number(persona.peso) >= 1 && Number(persona.peso) <= 600)) { errorPeso.value = true; resultado = false; }
      if (!(Number(persona.edad) >= 1 && Number(persona.edad) <= 100)) { errorEdad.value = true; resultado = false; }
      if (!/^\d{10}$/.test(Number(persona.contacto))) { errorContacto.value = true; resultado = false; }
      if (!/^\d{7,8}$/.test(Number(persona.dni))) { errorDNI.value = true; resultado = false; }

      if (!resultado || errorDNIYaRegistrado.value || errorMailYaRegistrado.value) { alert("Error detectado en el ingreso de campos") }
      return resultado;
    };

    function setearEnFalse() {
      errorNombre.value = false;
      errorApellido.value = false;
      errorMail.value = false;
      errorContraseña.value = false;
      errorAltura.value = false;
      errorPeso.value = false;
      errorEdad.value = false;
      errorContacto.value = false;
      errorDNI.value = false;
      errorDNIYaRegistrado.value = false;
      errorMailYaRegistrado.value = false;
    }

    return {
      createUsuario,
      user,
      errorNombre,
      errorApellido,
      errorMail,
      errorContraseña,
      errorAltura,
      errorPeso,
      errorEdad,
      errorContacto,
      errorDNI,
      errorDNIYaRegistrado,
      errorMailYaRegistrado
    };
  },
  data() {
    return {
      mostrar: "password",
      mostrarBool: true,
    };
  },
  methods: {
    mostrarContraseña() {
      if (this.mostrarBool) {
        this.mostrar = "text"
      } else this.mostrar = "password"
      this.mostrarBool = !this.mostrarBool
    }
  }
};
</script>
