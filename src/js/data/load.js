// let weaponsData = [];

// async function loadWeapons() {
//     const response = await fetch('./data/Weapons.json');
//     const data = await response.json();

//     weaponsData = data.ExportWeapons;

//     mostrarArmas(weaponsData);
// }

// function mostrarArmas(lista) {
//     const container = document.getElementById('weapons');
//     container.innerHTML = '';

//     for (const weapon of lista) {
//         const p = document.createElement('p');
//         p.textContent = `${weapon.name} - Dano: ${weapon.totalDamage}`;
//         container.appendChild(p);
//     }
// }

// function buscar() {
//     const texto = document.getElementById('search').value.toLowerCase();

//     const filtradas = weaponsData.filter(w =>
//         w.name.toLowerCase().includes(texto)
//     );

//     mostrarArmas(filtradas);
// }

// loadWeapons();