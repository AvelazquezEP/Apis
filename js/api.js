/**
 * Permite realizar la petición a un endpoint pasando como argumento un URL valida
 *
 * @param   url  es el URL (Endpoint) a donde se realiza una petición.
 * @returns retorna el Json que el endpoint especificado regresa.
 */
async function postData(url = '') {
    let data = await fetch(url);
    var json = await data.json();

    return json.message;
};

/**
 * Permite modificar el valor del elemento.
 * solamente elementos que pueda usar innerHTML
 *
 * @param   element  El ID (del atributo ID del elemento en el HTML) del elemento a modificar.
 * @param   data  El Json que contiene la información a mostrar en el elemento.
 * @returns genera el cambio del valor del elemento especificado en la vista.
 */
const changeValueElement = (element, data) => {
    document.getElementById(element).innerHTML = data;
}

/**
 * Se usa en un evento OnClick esto permite obtener todos los URL de los trabajos publicados,
 * en cada uno de estos links se encuentra toda la información de cada uno de los trabajos que estén registrados 
 */
const getUrlWorks = () => {
    postData('https://api.crossref.org/works')
        .then(data => addLi(data.items));
}

/**
 * Obtiene el máximo de elementos del array que se le asigne,
 * crea un elemento Li y un elemento a (anchor) por cada item dentro del array
 * Asigna un Title con el Link para que el usuario pueda ver a donde lo redirige con un target _blank(nueva pestaña)
 * @param work un array de string que contiene los URL(Links) de cada publicación
 * puede que sea necesario desestructurar hasta llegar al link
 */
const addLi = (work) => {
    var link;
    var linkLabel;
    const max = work.length;

    for (i = 0; i < max; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        linkLabel = `${[i]} - Link`;
        link = `${work[i].URL}`;
        a.appendChild(document.createTextNode(linkLabel))
        a.href = link;
        document.querySelector("#works").appendChild(li).appendChild(a);
        a.setAttribute("title", `${link}`);
        a.setAttribute("target", `_blank`);
    }
}

/**
 * Se usa en un evento OnClick esto permite obtener el DOI de un libro, revista, publicación científica  
 */
function getDoi() {
    postData('https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency')
        .then(data => changeValueElement("doi", data.DOI));
}