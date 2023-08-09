document.addEventListener('DOMContentLoaded', function() {

    const emailCompleto = {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    }

    console.log(emailCompleto);
    //Seleccionar los elementos de la interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //Asignar eventos
    inputNombre.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        resetFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-center', 'p-2', 'text-white', 'rounded-lg',
            'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }
    function validar(e) {

        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            emailCompleto [e.target.name] = '';
            comprobarEmailCompleto();
            return;
        } 

        if(e.target.id === 'email' && !validarEmail (e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            emailCompleto [e.target.name] = '';
            comprobarEmailCompleto();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        emailCompleto [e.target.name] = e.target.value.trim().toLowerCase();

        //Comprobar el objeto de email
        comprobarEmailCompleto();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        

        //Inyectar el error en el HTML
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        console.log(resultado);
        return resultado;

    }

    function comprobarEmailCompleto() {
        if(Object.values(emailCompleto).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        //reiniciar el objeto
        emailCompleto.nombre = '';
        emailCompleto.email = '';
        emailCompleto.asunto = '';
        emailCompleto.mensaje = '';
        formulario.reset();
        comprobarEmailCompleto();
    }
});