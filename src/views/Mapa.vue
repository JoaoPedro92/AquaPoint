<template>
    <h1>Mapa</h1>

    <div id="mapa" style="height: 500px; width: 100%"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import L, { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const iconeVerde = L.divIcon({
    className: '',
    html: `<div style="
        background-color: green;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.5)
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
})

onMounted(() => {
    const mapa = L.map('mapa').setView([38.781558, -9.102584], 13)

   L.tileLayer('https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    attribution: '© Jawg Maps',
    accessToken: 'BumVzniBYxFsvv2lUwvsZ8fQMn6WdPC2sS5bAqyeSyDrROwuULnZrt0lE1uKPHrT'
}).addTo(mapa)

    L.marker([38.781558, -9.102584], { icon: getIcone('green') })
        .addTo(mapa)
        .bindPopup('Aquapoint 1')
        .openPopup()
})

function getIcone(cor = 'blue') {
    return L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 24 24">
            <path fill="${cor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`,
        iconSize: [100, 60],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
    })
}

</script>