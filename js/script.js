import Vehiculo, {Camioneta, Auto} from './clases.js';

var _lista = [];
window.addEventListener("load", ObtenerElementos());

function $(id)
{
        return document.getElementById(id);
}

async function ObtenerElementos()
{
    try
    {
        let respuesta = await fetch ("http://localhost:3001/vehiculos", {method:'GET', headers:{ 'Content-Type': 'application/json'}});
        
        if (respuesta.status.toString() == "200")
        {
            await respuesta.json().then(array=>CargarLista(array));
            CargarFilas(_lista);
        } 
    
    }catch
    {
        alert("Error al traer los elementos");
    }

    $("btnAlta").addEventListener("click", ()=>{$("divForm").hidden=false});
    $("btnCerrar").addEventListener("click", ()=>{$("divForm").hidden=true});
    $("btnAgregar").addEventListener("click", AgregarElemento);
    $("btnPromedio").addEventListener("click", CalcularPromedio);
    $("btnFiltrar").addEventListener("click", FiltrarTabla);
    //$("btnActualizar").addEventListener("click", ActualizarTabla);
}

function Error()
{
    alert("Error al realizar la accion");
}

function CargarLista(listaJson)
{
    let listaObjetos = new Array();
    listaJson.map(
        function(vehiculo)
        {
            if('cantidadPuertas' in vehiculo)
            {
                listaObjetos.push(new Auto(vehiculo.id, vehiculo.make, vehiculo.model, vehiculo.price, vehiculo.cantidadPuertas));
            }else
            {
                listaObjetos.push(new Camioneta(vehiculo.id, vehiculo.make, vehiculo.model, vehiculo.price, vehiculo.cuatroXcuatro));
            }
            
        }
    )
    _lista = listaObjetos;
}

function CargarFilas(lista)
{
    var tabla = $("table-body");
    vaciarTabla();
    for (let i = 0; i < lista.length; i++)
    {
        let fila = document.createElement("tr");

        let cId = document.createElement("td");
        let cMarca = document.createElement("td");
        let cModelo = document.createElement("td");
        let cPrecio = document.createElement("td");
        let cButton = document.createElement("td");

        let tId = document.createTextNode(lista[i].id);
        let tMarca = document.createTextNode(lista[i].marca);
        let tModelo = document.createTextNode(lista[i].modelo);
        let tPrecio = document.createTextNode(lista[i].precio);
        let tButton = document.createTextNode("Eliminar");
        let Button = document.createElement("button");
        Button.type = "button";
        Button.id = "btnEliminar";
        Button.appendChild(tButton);

        cId.appendChild(tId);
        cMarca.appendChild(tMarca);
        cModelo.appendChild(tModelo);
        cPrecio.appendChild(tPrecio);
        cButton.appendChild(Button);
        
        fila.appendChild(cId);
        fila.appendChild(cMarca);
        fila.appendChild(cModelo);
        fila.appendChild(cPrecio);
        fila.appendChild(cButton);

        Button.addEventListener("click", EliminarElemento);

        tabla.appendChild(fila);
    }
}

function vaciarTabla() {
    let node = document.getElementById("table-body");
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

function EliminarElemento(event)
{
    let fila = event.target.parentNode.parentNode; 
    let id = fila.childNodes[0].childNodes[0].nodeValue;
    id = parseInt(id);
    _lista = _lista.filter(element => element.id != id);
    CargarFilas(_lista);
}

function AgregarElemento()
{
    let marca = $("inputMarca").value;
    let modelo = $("inputModelo").value;
    let precio = $("inputPrecio").value;
    let tipo = $("tipos").value;

    let vehiculo_ultimoId = _lista.reduce((acum, actual)=>{ if (actual.id>acum.id){ 
            return actual
        } else
        {
            return acum
        } 
    })
    console.log(tipo);
    if(tipo == 'auto')
    {
        _lista.push(new Auto(vehiculo_ultimoId.id+1, marca, modelo, precio));
    }
    else{
        _lista.push(new Camioneta(vehiculo_ultimoId.id+1, marca, modelo, precio));
    }
    
    CargarFilas(_lista);
    $("divForm").hidden=true;

}


/*function CalculoPromedioAsync()
{
    let promise = new Promise(CalcularPromedio);
    promise.then().catch(Error)
}*/

function CalcularPromedio() {
    var total = 0;
    total = _lista.reduce((sum, act) => sum + parseInt(act.precio), 0);
    total = total / _lista.length;
    document.getElementById("promPrecio").value = total;
  }

function FiltrarTabla() {
    let filtro = document.getElementById("selectFiltros").value;
    let lista2;
    console.log(filtro);
    if(filtro == 'Auto' || filtro == 'Camioneta')
    {  
        lista2 = _lista.filter((vehiculo) => filtro == vehiculo.constructor.name);
        CargarFilas(lista2);
    }else{
        CargarFilas(_lista);
    }
}

/*function ActualizarTabla() {
    mostrar_id = $("cboxId").checked;
    mostrar_marca = $("cboxMarca").checked;
    mostrar_modelo = $("cboxModelo").checked;
    mostrar_precio = $("cboxPrecio").checked;
    console.log(mostrar_precio)

    switch (numero) {
      case 0:
        columnaID = document.getElementById("cb_id");
        break;
  
      case 1:
        columnaID = document.getElementById("cb_nombre");
        break;
  
      case 2:
        columnaID = document.getElementById("cb_apellido");
        break;
  
      case 3:
        columnaID = document.getElementById("cb_edad");
        break;
    }
    if (columnaID.checked) {
      stl = "table-cell";
    } else {
      stl = "none";
    }
    var tbl = document.getElementById("tabla");
    var th = tbl.getElementsByTagName("th");
    var rows = tbl.getElementsByTagName("tr");
    th[numero].style.display = stl;
    for (var row = 1; row < rows.length; row++) {
      var cels = rows[row].getElementsByTagName("td");
      cels[numero].style.display = stl;
    }
  }*/