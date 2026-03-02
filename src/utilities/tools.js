export async function imageUrlToBase64(url){
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

export function getMarkerIcon(color = 'blue') {
    return L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 24 24">
            <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`,
        iconSize: [100, 60],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
    })
}

export function getAddNewMarker(){
    return L.divIcon({
        className: '',
        html: `<img src="${addNewMarkerImg}" style="width: 50px; height: 50px;">`,
        iconSize: [100, 60],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
    })
}