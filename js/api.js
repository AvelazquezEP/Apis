// #region Utilities functions

/**
 * Permite realizar la petición a un endpoint pasando como argumento un URL valida
 *
 * @param {string} url es el URL (Endpoint) a donde se realiza una petición.
 * @param {string} method GET, POST, PUT, DELETE/PATCH
 * @returns retorna el Json que el endpoint especificado regresa.
 */
async function postData(method, url = '') {
    // let data = await fetch(url);
    let data = await fetch(url, {
        method: method.toUpperCase()
    });

    var json = await data.json();

    return json;
};

/**
 * Permite modificar el valor del elemento.
 * solamente elementos que pueda usar innerHTML
 *
 * @param {string} element  El ID (del atributo ID del elemento en el HTML) del elemento a modificar.
 * @param {*} data  El Json que contiene la información a mostrar en el elemento.
 * @returns {string} genera el cambio del valor del elemento especificado en la vista.
 */
const changeValueElement = (element, data) => {
    document.getElementById(element).innerHTML = data;
}

/**
 * Obtiene el máximo de elementos del array que se le asigne,
 * crea un elemento Li y un elemento a (anchor) por cada item dentro del array
 * Asigna un Title con el Link para que el usuario pueda ver a donde lo redirige con un target _blank(nueva pestaña)
 * @param {[]} work un array de string que contiene los URL(Links) de cada publicación
 * puede que sea necesario desestructurar hasta llegar al link
 */
const addLi = (work) => {
    var link;
    var linkLabel;
    const max = work.length;

    for (i = 0; i < max; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        linkLabel = `${work[i].title}`;
        link = `${work[i].id}`;
        a.appendChild(document.createTextNode(linkLabel));
        a.href = link;
        document.querySelector("#works").appendChild(li).appendChild(a);
        a.setAttribute("title", `${link}`);
        a.setAttribute("target", `_blank`);
    }
}

/**
 * Evalúa si la información recibida es undefined.
 * 
 * @param {*} data Array string donde contenga la información que se obtiene del API asignado
 * @param {string} element El elemento donde se desplegara la información obtenida del Data
 */
const postConditional = (element, data) => {
    if (data != undefined) {
        // console.log(data);
        changeValueElement(element, data);
    } else {
        // console.log("Esta en el IF");
        changeValueElement(element, "Este ID no se encuentra registrado o no hay ninguna referencia para este elemento");
    }

}

/**
 * Evalúa si la información recibida es falsa para el Delete.
 * 
 * @param {*} data Array string donde contenga la información que se obtiene del API asignado
 * @param {string} element El elemento donde se desplegara la información obtenida del Data
 */
const postConditionalDelete = (element, data) => {
    if (data != "No se puede eliminar este Post") {
        // console.log(data);
        changeValueElement(element, data);
    } else {
        // console.log("Esta en el IF");
        changeValueElement(element, "Este ID no se encuentra registrado o no hay ninguna referencia para este elemento");
    }

}

// #endregion Utilities functions

// #region Onclick Api

/**
 * Se usa en un evento OnClick esto permite obtener todos los URL de los trabajos publicados,
 * en cada uno de estos links se encuentra toda la información de cada uno de los trabajos que estén registrados 
 */
const getUrlWorks = () => {
    // postData('https://api.crossref.org/works')
    //     .then(data => addLi(data.items));

    postData('get', 'http://127.0.0.1:8000/api/blogs')
        .then(data => addLi(data.Data));
    // .then(data => console.log(data.Data));
}

/**
 * Se usa en un evento OnClick esto permite obtener el DOI de un libro, revista, publicación científica  
 */
function getDoi() {

    const idPost = document.getElementById("idPostGet");

    if (idPost.value == null || idPost.value == "" || !isNaN(idPost)) {
        changeValueElement("doi", "Debe escribir algún ID valido");
    } else {
        postData('get', `http://127.0.0.1:8000/api/blog/${idPost.value}`)
            .then(data => postConditional("doi", data.Post.title))
            .then(idPost.value = "");

        idPost.value = ""; //Limpia el input al final del metodo
    }
}

/**
 * Se usa en un evento OnClick esto permite obtener el DOI de un libro, revista, publicación científica
 */
function deletePost() {

    const idPost = document.getElementById("idPostDelete");

    if (idPost.value == null || idPost.value == "" || !isNaN(idPost)) {
        changeValueElement("postDeleted", "Debe escribir algún ID valido");
    } else {
        postData('delete', `http://127.0.0.1:8000/api/blog/remove/${idPost.value}`)
            .then(data => postConditionalDelete("idPostDelete", data))
            // .then(data => console.log(data))
            .then(idPost.value = "");
        idPost.value = ""; //Limpia el input al final del metodo
    }
}

// #endregion Onclick Api