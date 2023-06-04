<template>
     <div class="container mt-3">
          <h4 class="text-start me-auto">¡Gimnasio!</h4>
          <div class="d-flex justify-content-end">
               <div class="card bg-secondary text-light m-1">
                    <div class="card-body">
                         <h5><strong>Horarios</strong></h5>
                         <p>Lunes a Viernes 6h a 23h</p>
                         <p>Sábados 9h a 16h</p>
                         <hr>
                         <h5><strong>Nuestras actividades</strong></h5>
                         <ul>
                              <li>Boxeo</li>
                              <li>Yoga Funcional</li>
                              <li>Spinning</li>
                              <li>Zumba</li>
                              <li>Stretching</li>
                              <li>Crossfit</li>
                         </ul>
                         <hr>
                         <h5 class="text-center">¡No te lo pierdas!</h5>
                         <hr>
                         <p>Empezá con nuestro plan básico por solo <strong>$3500</strong></p>
                         <div class="text-center">
                              <button class="btn btn-light align-items-center">
                                   <router-link to="/paquetes" class="nav-item nav-link">¡Click aquí!</router-link>
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     </div>
     <br>
     <div class="bg-dark text-light py-4">
          <div class="container">
               <div class="text text-center">
                    <h2>¡Comenzá hoy a buscar tu mejor versión!</h2>
               </div>
          </div>
     </div>
     <!-- Carousel Start -->
     <div class="d-flex justify-content-center">
          <div id="demo" class="carousel slide" data-bs-ride="carousel" style="max-width: 100%;">
               <!-- Indicators/dots -->
               <div class="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="4"></button>
               </div>

               <!-- The slideshow/carousel -->
               <div class="carousel-inner">
                    <div class="carousel-item active">
                         <img src="../../icons/pexels-andrea-piacquadio-3838937.jpg" style="width:100%;">
                    </div>
                    <div class="carousel-item">
                         <img src="../../icons/pexels-bruno-bueno-2204196.jpg" style="width:100%;">
                    </div>
                    <div class="carousel-item">
                         <img src="../../icons/pexels-thisisengineering-3912366.jpg" style="width:100%;">
                    </div>
                    <div class="carousel-item">
                         <img src="../../icons/pexels-thisisengineering-3912953.jpg" style="width:100%;">
                    </div>
                    <div class="carousel-item">
                         <img src="../../icons/pexels-victor-freitas-2261485.jpg" style="width:100%;">
                    </div>
               </div>

               <!-- Left and right controls/icons -->
               <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
               </button>
               <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
               </button>

          </div>
     </div>
     <!-- Carousel End -->
     <footer class="bg-dark text-light py-4">
          <div class="container">
               <div class="text text-center">
                    <h2>PROYECTO GIMNASIO - GRUPO 1</h2>
               </div>
               <hr>
               <div class="text text-center">
                    <h4>¡Seguinos!</h4>
               </div>
               <div id="footer_social-media">
                    <a href="http://whatsapp.com" target="_blank">
                         <ion-icon id="logo-whatsapp" name="logo-whatsapp"></ion-icon>
                    </a>

                    <a href="http://twitter.com" target="_blank">
                         <ion-icon id="logo-twitter" name="logo-twitter"></ion-icon>
                    </a>

                    <a href="http://facebook.com" target="_blank">
                         <ion-icon id="logo-facebook" name="logo-facebook"></ion-icon>
                    </a>

                    <a href="https://github.com/PedroKahane/Grupo1_PNT2_Gimnasio" target="_blank">
                         <ion-icon id="logo-github" name="logo-github"></ion-icon>
                    </a>
               </div>
               <hr>
               <div class="text text-center">
                    <h5>Información de contacto</h5>
                    <p>Teléfono: 123-456-7890</p>
                    <p>Dirección: Calle Principal 1234, CABA</p>
                    <p>Email: info@example.com</p>
                    <hr>
                    <div class="text text-end">
                         <p>&copy; 2023 PNT2 - Gimnasio. Todos los derechos reservados.</p>
                    </div>
               </div>
          </div>
     </footer>
</template>
<script>
export default {
     mounted() {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
     },
};
</script>
<style scoped>
#footer_social-media {
     text-align: center;
}

#footer_social-media a {
     color: rgb(255, 255, 255);
     transition: color 0.2s;
     text-decoration: none;
     font-size: 40px;
     margin: 0 10px;
}

#logo-whatsapp:hover {
     color: #25d366;
}

#logo-twitter:hover {
     color: #1da1f2;
}

#logo-facebook:hover {
     color: #4267b2;
}

#logo-github:hover {
     color: #5d5dd6e5;
}
</style>