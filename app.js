document.getElementsByTagName('body')[0].onload=inicio;
  var datos=[];
function inicio() {
  console.log("incio");
  document.getElementById('enviar').onclick=procesar;
  cargarDatos();
  imprimirFilas();
}
function procesar(){
      console.log("procesando...");
      if (document.getElementById('idx').value==""){
      datos.push([document.getElementById('apellido').value,document.getElementById('nombre').value,document.getElementById('fenac').value]);
    } else {
      var idx=document.getElementById('idx').value;
      datos[idx][0]=document.getElementById('apellido').value;
      datos[idx][1]=document.getElementById('nombre').value;
      datos[idx][2]=document.getElementById('fenac').value;
    }
      almacenar();
      imprimirFilas();
      limpiarForm();
    }
function imprimirFilas(){
    var salida="";
    datos.forEach((item, i) => {
      salida=salida+"<div class='card'><div class='card-header'>"+item[0]+","+item[1]+"</div><p>Id:"+i+"</p><p>Fecha de nacimiento: "+item[2]+"</p><p><button type='button' class='btEditar  btn btn-warning' data-id='"+i+"'>Editar</button> <button type='button' class='btBorrar btn btn-danger' data-id='"+i+"'>Borrar</button> </p></p>"
    });
    document.getElementById('datos').innerHTML=salida;
    btTablas();
    }
function cargarDatos(){
  console.log(JSON.parse(localStorage.datos));
  datos=JSON.parse(localStorage.datos);
}

function limpiarForm(){
  document.getElementById('idx').value="";
  document.getElementById('apellido').value="";
  document.getElementById('nombre').value="";
  document.getElementById('fenac').value="";
  document.getElementById('apellido').focus();
}
function btTablas(){
    var btedit=document.getElementsByClassName('btEditar');
    for (var i = 0; i < btedit.length; i++) {
      btedit[i].onclick=editar;
    }
    var btborrar=document.getElementsByClassName('btBorrar');
    for (var i = 0; i < btborrar.length; i++) {
      btborrar[i].onclick=borrar;
    }
  }
function editar(e){
console.log("editando");
var fila=e.target;
var idx=fila.attributes["data-id"].value;
document.getElementById('idx').value=idx;
document.getElementById('apellido').value=datos[idx][0];
document.getElementById('nombre').value=datos[idx][1];
document.getElementById('fenac').value=datos[idx][2];
document.getElementById('apellido').focus();
}
function borrar(e){
    var fila=e.target;
    var idx=fila.attributes["data-id"].value;
    datos.splice(idx,1);
    almacenar();
    imprimirFilas();
}
function almacenar(){
  console.log("almacenado");
  localStorage.setItem("datos", JSON.stringify(datos));
}