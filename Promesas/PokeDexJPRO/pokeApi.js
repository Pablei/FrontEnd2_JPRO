  document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('search-form');
    let input = document.getElementById('pokemon-name');
    let pokeTarjeta = document.getElementById('poke-tarjeta');
    let pokeFoto = document.getElementById('poke-foto');
    let pokeNombre = document.getElementById('poke-nombre');
    let estadisticas = document.getElementById('estadisticas');
    let imagenPortada = document.getElementById('imagen-portada');


    // Oculta la tarjeta al principio
    pokeTarjeta.style.display = 'none';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = input.value.trim().toLowerCase();
      if (!nombre) return;

      try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!respuesta.ok) throw new Error('Pokémon no encontrado');

        const datos = await respuesta.json();

        // Mostrar datos
        pokeFoto.src = datos.sprites.front_default || '';
        pokeNombre.textContent = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
        let tipos = datos.types.map(t => t.type.name).join(', ')
        estadisticas.innerHTML = `
          <li><strong>Tipo:</strong> ${tipos}</li>
          ${datos.stats.map(stat => `
          <li>${stat.stat.name}: ${stat.base_stat}</li>
        `).join('')}`;

        // Mostrar tarjeta, ocultar imagen de portada
        imagenPortada.style.display = 'none';
        pokeTarjeta.style.display = 'block';
      } catch (error) {
        alert('No se encontró el Pokémon. Intenta con otro nombre.');
        // Mostrar de nuevo la portada si falla
        imagenPortada.style.display = 'block';
        pokeTarjeta.style.display = 'none';
      }
    });
  });