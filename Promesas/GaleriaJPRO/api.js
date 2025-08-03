const apiKey = "LZA0Gzhwjcqn6aiIpALxrJ0NiSzOIyxD1yF9QS2dHcIQ8z3oPhjjz8G1";
const tematica = "green"
const URL = `https://api.pexels.com/v1/search?query=${tematica}&per_page=12`;

const galeria = document.getElementById("galeria");

async function fetchImagenes() {
    try {
        const respuesta = await fetch (URL,{
            headers: {Authorization: apiKey}
        })
        if(!respuesta.ok) {throw new Error (`HTTP error! status: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        const fotos = datos.photos  
        mostrarImagenes(fotos);
    } catch (error){
        console.error("Error:",error)
        galeria.innerHTML = `<div class="alert alert-danger">Hubo un problema: ${error.message}</div>`;
    }
}

function mostrarImagenes (fotos){
    galeria.innerHTML = "";
    fotos.forEach(foto =>{
     galeria.innerHTML += `
      <div class="col-md-4">
        <div class="card">
          <img src="${foto.src.medium}" class="card-img-top" alt="Imagen de ${foto.photographer}">
          <div class="card-body">
            <p class="card-text">Foto por <strong>${foto.photographer}</strong></p>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", fetchImagenes);