// ==UserScript==
// @name         Descifrar IDs de Divs y Letras Mayúsculas
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Descifra los IDs de los divs cifrados con 3DES utilizando las letras mayúsculas como clave, y muestra los resultados en la consola y en la página.
// @author       opa
// @match        https://cripto.tiiny.site/
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Función para extraer letras mayúsculas de un texto y utilizarlas como clave
    function extraerMayusculasYClave(texto) {
        const letrasMayusculas = texto.match(/[A-Z]/g).join('');
        return letrasMayusculas;
    }

    // Función para descifrar un mensaje cifrado con 3DES
    function descifrarMensaje(mensaje, clave) {
        var key = CryptoJS.enc.Utf8.parse(clave);
        var decrypted = CryptoJS.TripleDES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(mensaje)
        }, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    // Obtiene el texto de la página (puedes personalizarlo)
    const textoEnPagina = document.body.textContent;

    // Utiliza las letras mayúsculas como clave
    const clave3DES = extraerMayusculasYClave(textoEnPagina);

    // Extrae los IDs de los divs en la página y cuenta su cantidad
    const divs = document.querySelectorAll('div');
    const cantidadDeIds = divs.length;

    // Muestra el mensaje en la consola con la cantidad total de IDs de divs
    console.log('Los mensajes cifrados son: ' + cantidadDeIds);

    // Muestra las letras mayúsculas utilizadas como clave en la consola
    console.log('La llave es: ' + clave3DES);

    // Descifra y muestra los IDs de los divs en la consola y en la página
    divs.forEach((div, index) => {
        const ciphertext = div.id;
        const decryptedId = descifrarMensaje(ciphertext, clave3DES);
        console.log(`ID ${index + 1}: ${decryptedId}`);

        // Agregar el ID descifrado en la página web
        const divResultado = document.createElement('div');
        divResultado.textContent = decryptedId;
        document.body.appendChild(divResultado);
    });
})();

