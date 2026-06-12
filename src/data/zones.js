// Vérification de zone de livraison (frontend pur)
// Renvoie { zone, label, eta, message } ou null si non couvert

const RE_BELGIUM = /^(B-?)?(\d{4})$/i
const RE_LUXEMBOURG = /^(L-?)?L?\d{4}$/i
const RE_SUISSE = /^(CH-?)?(\d{4})$/i

function clean(cp) {
  return cp.trim().toUpperCase().replace(/\s+/g, '')
}

function checkFrance(cp) {
  if (!/^\d{5}$/.test(cp)) return null
  const dept = cp.substring(0, 2)
  const num = parseInt(cp, 10)

  // Paris & petite couronne
  if (['75', '92', '93', '94'].includes(dept)) {
    return {
      zone: 'idf',
      label: 'Paris & Petite Couronne',
      eta: 'J+1',
      message: 'Livré chez vous en J+1, créneau soir disponible.',
      tone: 'best',
    }
  }
  // Lyon métropole
  const lyonOk =
    (num >= 69001 && num <= 69009) ||
    num === 69100 ||
    num === 69300 ||
    num === 69500 ||
    num === 69600
  if (lyonOk) {
    return {
      zone: 'lyon',
      label: 'Lyon métropole',
      eta: 'J+1',
      message: 'Livré en J+1 sur Lyon métropole, créneau soir disponible.',
      tone: 'best',
    }
  }
  // Bordeaux métropole
  const bordeauxOk =
    num === 33000 ||
    (num >= 33100 && num <= 33800 && num % 100 === 0)
  if (bordeauxOk) {
    return {
      zone: 'bordeaux',
      label: 'Bordeaux métropole',
      eta: 'J+1',
      message: 'Livré en J+1 sur Bordeaux métropole, créneau soir disponible.',
      tone: 'best',
    }
  }
  // Reste France
  return {
    zone: 'france',
    label: 'France métropolitaine',
    eta: 'J+2 / J+3',
    message: 'Livré en J+2 / J+3 par messagerie palettisée.',
    tone: 'good',
  }
}

export function checkDeliveryZone(input) {
  const cp = clean(input)
  if (!cp) return null

  // Suisse
  if (cp.startsWith('CH') || (/^\d{4}$/.test(cp) && cp.startsWith('CH-'))) {
    const m = cp.match(RE_SUISSE)
    if (m) return {
      zone: 'ch',
      label: 'Suisse',
      eta: 'J+3',
      message: 'Livré en J+3, DDP — taxes et droits inclus dans le prix affiché.',
      tone: 'good',
    }
  }

  // Luxembourg (préfixe L- ou L1xxx-L9xxx)
  if (cp.startsWith('L-') || /^L\d{4}$/i.test(cp)) {
    return {
      zone: 'lu',
      label: 'Luxembourg',
      eta: 'J+2',
      message: 'Livré en J+2 sur tout le Luxembourg.',
      tone: 'good',
    }
  }

  // Belgique (préfixe B- ou 4 chiffres 1000-9999)
  if (cp.startsWith('B-') || (/^\d{4}$/.test(cp) && !/^(CH|L)/.test(cp))) {
    return {
      zone: 'be',
      label: 'Belgique',
      eta: 'J+2',
      message: 'Livré en J+2 sur toute la Belgique.',
      tone: 'good',
    }
  }

  // France (5 chiffres)
  if (/^\d{5}$/.test(cp)) {
    return checkFrance(cp)
  }

  return null
}

export const ZONE_STORAGE_KEY = 'futlocal_zone_cp'
