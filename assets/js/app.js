//Construccion de la promesa
function getJSON(url) {
    return new Promise(function (resolve, reject) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                resolve(JSON.parse(ajax.responseText));
            }
        }
    })
}

//Plantilla para mostrar informacion en HTML
var plantilla = `<div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src="images/sample-1.jpg">
              <span class="card-title">__planetName</span>
            </div>
            <div class="card-content">
                <p>Fue descubierto en __descubrimiento__ </p>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>`

//Se pasa la url de la "API" como parametro a la funcion
getJSON("data/earth-like-results.json")

//Con esta primer promesa obtenemos primero cada uno de los resultados para posteriormente crear un arreglo de los objetos 'planetas'
    .then(function (response) {
        var arregloPromesas = (response.results.map(function (url) {
            //console.log(getJSON(url)) es cada uno de los objetos que van a ser para hacer el return
            return getJSON(url)
        }));
        //console.log(Promise.all(arregloPromesas)) es el array de los objetos para el return
        return Promise.all(arregloPromesas);
    })
//Con esta promesa recorremos el arreglo para obtener los que solicitamos de cada planeta
    .then(function (arrayPromises) {
        console.log(arrayPromises)
        arrayPromises.forEach(function (planeta) {
            var namePlanet = planeta.pl_name; //Nombre de planeta
            var descubierto = planeta.pl_disc; //
            console.log(namePlanet, descubierto);
        })
    })
