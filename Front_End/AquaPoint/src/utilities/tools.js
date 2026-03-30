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

export function GetPointStateStyleFromList(statesList, stateName){
    if (!statesList || statesList.length === 0) return { background: '#ccc', color: 'white' }

    const state = statesList.find(e => e.state_name === stateName)
    return { backgroundColor: state.backgroundColor || '#ccc', color: state.color }
}

export function GetPointStateStyles(state) {
    const styles = {
        'Funcional': { backgroundColor: '#166534', color: '#c1ebbc' },
        'Pendente': { backgroundColor: '#fef9c3', color: '#854d0e' },
        'Necessita manutenção': { backgroundColor: '#f97316', color: '#ffff' },
        'Inativo': { backgroundColor: '#b91c1c', color: '#fee2e2' }
    }
    return styles[state] || {}
}

export function GetPointStateColor(state){
    const styles = {
        'Funcional': '#166534',
        'Pendente': '#fef9c3',
        'Necessita manutenção': '#f97316',
        'Inativo': '#b91c1c'
    }
    return styles[state] || {}
}

export function GetPointStateIcon(state, changeBgColor = false){
    const icons = {
        'Inativo': 'bi-slash-circle-fill',
        'Necessita manutenção': 'bi-exclamation-triangle-fill text-warning',
        'Funcional': 'bi-check2',
        'Pendente': 'bi-clock-fill'
    }

    const colors = {
        'Inativo': 'text-danger',
        'Funcional': 'text-success',
        'Pendente': 'text-warning'
    }

    const baseIcon = icons[state] || 'bi-question-circle'
    const colorClass = changeBgColor ? (colors[state] || '') : ''

    return `bi ${baseIcon} ${colorClass}`.trim()
}

export function GetTrustLevelIcon(trust){
    const trustLevel = {
        'Alta': 'bi bi-check-circle-fill text-success',
        'Média': 'bi bi-clock-fill text-warning',
        'Baixa': 'bi bi-slash-circle-fill text-danger',
        'Apagado': 'bi bi-x-octagon'
    }

    return trustLevel[trust] || ''
}

export function GetAquapointGoogleMapsDirections(latitude, longitude){
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=walking`
}

export function OpenGoogleMapsInOtherTabWithDirections(latitude, longitude){
    window.open(GetAquapointGoogleMapsDirections(latitude, longitude), '_blank')
}

export function formatDateExtense(date) {
  return new Date(date).toLocaleDateString('pt-PT', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-PT', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}
