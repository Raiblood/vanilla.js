console.log('funciona');

// Variables globales

const formularuioUI = document.querySelector('#formulario');
const listaColeccionesUI = document.querySelector('#listaColecciones');
let ArraylistaColecciones = [];

/*let item ={
   album:'',
   estado: false;

}*/


//Funciones
 const crearItem = (album ,banda) =>{
   let item = {
      album: album,
      banda: banda,
      estado: false
     }

     ArraylistaColecciones.push(item);
     return item;
}

 //let disco = crearItem('metallica');
 //console.log(disco);
 //console.log(ArraylistaColecciones);

const GuardarDB =() =>{

    localStorage.setItem('disco' , JSON.stringify(ArraylistaColecciones));
    PintarDB();

}



const PintarDB=() =>{
  listaColeccionesUI.innerHTML='';

  ArraylistaColecciones= JSON.parse(localStorage.getItem('disco'));
  //console.log(ArraylistaColecciones);//si no hay nada en DB es null
  if (ArraylistaColecciones === null) {
  	  ArraylistaColecciones=[];

  }else{
  	ArraylistaColecciones.forEach(element => {
     //console.log(element);
     //listaColeccionesUI.innerHTML +=`<div class="alert alert-primary" role="alert"><a><i class="material-icons float-left mr-2">play_circle_outline</i></a><b>${element.album}-${element.banda}</b> -${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
     if(element.estado){
     	//console.log(element.estado)
       listaColeccionesUI.innerHTML +=`<div class="alert alert-primary" role="alert"><a><i class="material-icons float-left mr-2">play_circle_outline</i></a><b>${element.album}-${element.banda}</b> -${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
       }else{
        listaColeccionesUI.innerHTML += `<div class="alert alert-danger" role="alert"><a><i class="material-icons float-left mr-2">play_circle_outline</i></a><b>${element.album}-${element.banda}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }

  	})
  }
}

const EliminarDB =(disco) =>{
  //console.log(disco);
  let indexArray;
  ArraylistaColecciones.forEach((elemento ,index) =>{
      
      if (elemento.disco ===  disco) {
           indexArray = index;

      }

   })

  ArraylistaColecciones.splice(indexArray , 1)
  GuardarDB();

}


 
 const EditarDB = (disco) =>{
  
 let indexArray;
  ArraylistaColecciones.forEach((element ,index) =>{
       indexArray = index;
       
     ArraylistaColecciones[indexArray].estado=true;
     GuardarDB();
     
   })

 }


//EvenListener
formularuioUI.addEventListener('submit' , (e) =>{
	e.preventDefault();
	let albumUI = document.querySelector('#album').value;
	let bandaUI = document.querySelector('#banda').value;
	//console.log(albumUI ,bandaUI);
    crearItem(albumUI ,bandaUI);
    GuardarDB();

    formularuioUI.reset();
});

document.addEventListener('DOMContentLoaded' ,PintarDB);

listaColeccionesUI.addEventListener('click' ,(e)=>{

	e.preventDefault();

  //console.log(e.path[2].childNodes[1].innerHTML); //evento click papelera
  //console.log(e.path[1].childNodes[0].inputmode='url');//eventoclick del icono play
  //console.log(e);
  //console.log(e.target);
  if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete' ) {
      let titulo = e.path[2].childNodes[1].innerHTML;

    if (e.target.innerHTML === 'delete') {
        //eliminar
        EliminarDB(titulo);
        
    }
    if (e.target.innerHTML === 'done') {
       //editar
       EditarDB(titulo);

    }

   }
})