document.getElementById('clima-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  let ciudadInput = document.getElementById('ciudad');
  let ciudad = ciudadInput.value.trim();
  const formatoValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const temperaturaDiv = document.getElementById('temperatura');

  if (!formatoValido.test(ciudad)) {
    console.log('❌ Formato inválido. Solo retras y espacios');
    temperaturaDiv.textContent = 'Formato inválido. Solo letras y espacios';
    return;
  }
  console.log('✔ Ciudad ingresada correctamente:', ciudad);
  temperaturaDiv.textContent = 'Cargando...';

  const apiKey = '945b3258ec2eda61502a07264b871239'

  try {
    let respuesta = await fetch (
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`  
    );
    if(!respuesta.ok){
        throw new Error('Ciudad no enconctrada o mal escrita');        
    }

    const data = await respuesta.json();
    let temperatura = data.main.temp;
    let descripcion = data.weather[0].description;
    let nombreCiudad = data.name;
    let pais = data.sys.country;

    console.log(`${nombreCiudad}, ${pais}: ${temperatura}°C - ${descripcion}`)
    temperaturaDiv.innerHTML =
      `${temperatura}°C <br><small class="text-primary">${descripcion}</small>`
  }catch(error){
    console.error('Error al obtener el clima:', error.message);
    temperaturaDiv.textContent = 'Error al obtener datos. Verifica la ciudad.'; 
  }
});