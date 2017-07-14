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
        <div class="col s12 m5">
          <div class="card">
            <div class="card-image">
              <img class="circle" src="https://dummyimage.com/150x150/000/fff.jpg">
              <span class="card-title">__planetName__</span>
            </div>
            <div class="card-content">
                <p>__planetName__ fue descubierto en __descubrimiento__, __metodo__ fue el método por el cual fue descubierto. Tarda __orbitDays__ días en dar la vuelata a su orbita. Se encuentra a __pc__ parsecs de la tierra.
                </p>
            </div>
            <div class="card-action">
              <a href="#">Más información</a>
            <a href="__sitio1__">exoplanets.org</a>
            <a href="__sitio2__">exoplanet.eu</a>    
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
            var contenedorPlaneta = document.getElementById("planetas");
            var pantillaFinal = ' ';
            
            plantillaFinal = plantilla.replace('__planetName__', planeta.pl_name)
            .replace('__planetName__', planeta.pl_name)
            .replace('__descubrimiento__',planeta.pl_disc)
            .replace('__metodo__', planeta.pl_discmethod)
            .replace('__orbitDays__', planeta.pl_orbper)
            .replace('__pc__',planeta.st_dist)
            .replace('__sitio1__', planeta.pl_edelink)
            .replace('__sitio2__', planeta.pl_pelink);
            contenedorPlaneta.insertAdjacentHTML( 'beforeend', plantillaFinal);
        })
    })
