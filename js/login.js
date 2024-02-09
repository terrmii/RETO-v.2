        async function login(correo, contrasena) {

            try {
                let respuesta = await fetch(urlActual + "/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: correo,
                        password: contrasena,
                        remember_me: true
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'X-Requested-With': 'XMLHttpRequest',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                let data = await respuesta.json();

                // Al logearse
                if (data["access_token"] != null) {
                    
                    ocultarModal();
                    
                    var partes = data["mail"].split("@");
                    
                    var nombre = partes[0];
                    
                    sessionStorage.setItem("AccessToken", data["access_token"]+","+data["mail"]);
                    
                    // Mostrar boton logout
                    var botonLogout = document.getElementById('botonLogout');
                    
                    botonLogout.style.display = 'inline-block';
                    
                    // Bienvenida al usuario
                    var mailLogueado = document.getElementById('mailLogueado');
                    mailLogueado.innerHTML = 'Bienvenido, <b>'+nombre+'</b>';

                    var registroModal = document.getElementById('registroModal');
                   registroModal.style.display = '';
                }
                
            } catch (error) {
                console.error(error);
            }
        }

        async function register(nombre, correo, contrasena) {

            try {
                let respuesta = await fetch(urlActual + "/api/auth/signup", {
                    method: "POST",
                    body: JSON.stringify({
                        name: nombre,
                        email: correo,
                        password: contrasena
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                let data = await respuesta.json();
                // console.log(data);

                if([data["message"] == 'Successfully created user!']){

                    login(data["mail"], data["password"]);
                    
                }

            } catch (error) {
                console.error(error);
            }
        }

        async function comprobarUsuario(){

            if(sessionStorage.getItem("AccessToken")!= null){
                var tokenEntero = sessionStorage.getItem("AccessToken").split(",");
                var token = tokenEntero[0];
                
                try {
                    let respuesta = await fetch(urlActual + "/api/auth/user", {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            'X-Requested-With': 'XMLHttpRequest',
                            'Authorization': 'Bearer ' + token
                        }
                    });
    
                    let data = await respuesta.json();
    
                    if (data.hasOwnProperty("message")) {
                        if (data.message === "Unauthenticated.") {
                            // Manejar el caso de autenticación no exitosa
                            console.log("Usuario no autenticado");
                        } else {
                            // Manejar otros posibles mensajes de error
                            console.log("Error desconocido:", data.message);
                        }
                    } else {
                        // Manejar el caso de autenticación exitosa
                        const usuario = {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            email_verified_at: data.email_verified_at,
                            created_at: data.created_at,
                            updated_at: data.updated_at
                        };
                    }
    
                } catch (error) {
                    console.error(error);
                }

                
            }


        }

        comprobarUsuario();

        async function logout(){

        var tokenEntero = sessionStorage.getItem("AccessToken").split(",");
        var token = tokenEntero[0];

            try {
                let respuesta = await fetch(urlActual + "/api/auth/logout", {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'X-Requested-With': 'XMLHttpRequest',
                        Authorization: 'Bearer ' + token
                    }
                });
                
                let data = await respuesta.json();
                console.log(data);

                sessionStorage.removeItem("AccessToken");

                mostrarModal();

                 // Ocultar el fondo del modal (modal-backdrop)
                var modalFondo = document.getElementsByClassName('modal-backdrop');
                
                // Recorre todos los elementos con la clase 'modal-backdrop'
                for (var i = 0; i < modalFondo.length; i++) {
                    ocultar(modalFondo[i]);
                }

            } catch (error) {
                console.log(error);
            }
        }

        // Si esta la sesion iniciada, carga el usuario con el token
        if (sessionStorage.getItem("AccessToken") != null) {

            var datosSS = sessionStorage.getItem("AccessToken").split(",");
            var email = datosSS[1];

            ocultarModal();

            var partes = email.split("@");

            var nombre = partes[0];
            
            // Mostrar boton logout
            var botonLogout = document.getElementById('botonLogout');
            
            botonLogout.style.display = 'inline-block';
            
            var mailLogueado = document.getElementById('mailLogueado');
            // Bienvenida al usuario
            mailLogueado.innerHTML = 'Bienvenido, <b>'+nombre+'</b>';

            
        }

        // Ocultar elementos
        function ocultar(i){
            i.style.display = 'none';
        }

        // Mostrar elementos
        function mostrar(i){
            i.style.display = 'block'
        }



        function ocultarModal(){
            console.log("Cerrando el modal");
            var modalInicioSesion = document.getElementById('inicioSesionModal');

            var modalRegistro = document.getElementById('registroModal');

            ocultar(modalInicioSesion);

            ocultar(modalRegistro);
            
            // Ocultar el fondo del modal (modal-backdrop)
            var modalFondo = document.getElementsByClassName('modal-backdrop');
            
            // Recorre todos los elementos con la clase 'modal-backdrop'
            for (var i = 0; i < modalFondo.length; i++) {
                ocultar(modalFondo[i]);
            }

            var inicioSesion = document.getElementById('botonInicioSesion');

            ocultar(inicioSesion);

            var registro = document.getElementById('botonRegistro');

            ocultar(registro);

            // Ocultar nombre de usuario
            var mailLogueado = document.getElementById('mailLogueado');
            mailLogueado.style.display = 'inline-block';
        }

        function mostrarModal(){
            console.log("Abriendo el modal");
            var modalInicioSesion = document.getElementById('inicioSesionModal');

            var modalRegistro = document.getElementById('registroModal');

            mostrar(modalInicioSesion);

            mostrar(modalRegistro);

            
            
            // Ocultar el fondo del modal (modal-backdrop)
            var modalFondo = document.getElementsByClassName('modal-backdrop');
            
            // Recorre todos los elementos con la clase 'modal-backdrop'
            for (var i = 0; i < modalFondo.length; i++) {
                mostrar(modalFondo[i]);
            }
            
            // Ocultar (modal-fade)
            var modalFade = document.getElementById('registroModal');
            ocultar(modalFade);

            // Ocultar (modal-fade)
            var modalFadeInicio = document.getElementById('inicioSesionModal');
            ocultar(modalFadeInicio);

            var inicioSesion = document.getElementById('botonInicioSesion');
            inicioSesion.style.display = '';
        

            var registro = document.getElementById('botonRegistro');
            registro.style.display = '';

            // ocultar boton logout
            var botonLogout = document.getElementById('botonLogout');
                    
            botonLogout.style.display = 'none';

            // Ocultar nombre de usuario
            var mailLogueado = document.getElementById('mailLogueado');
            mailLogueado.style.display = 'none';
        }

