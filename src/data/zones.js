// Vérification de zone de livraison (frontend pur)
// Renvoie { zone, label, eta, message } ou null si non couvert

function clean(input) {
  // Trim, retire les accents (é → e, è → e), uppercase, et remplace les espaces par des
  // tirets pour matcher les clés du dictionnaire ville (ex: "Saint Denis" → "SAINT-DENIS").
  return String(input || '')
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/\s+/g, '-')
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
  let cp = clean(input)
  if (!cp) return null

  // Dictionnaire ville → code postal (filet de sécurité si l'utilisateur tape une ville)
  const cityMap = {
    // Paris & Petite Couronne (J+1)
    'PARIS': '75001',
    'BOULOGNE': '92100', 'BOULOGNE-BILLANCOURT': '92100',
    'NEUILLY': '92200', 'NEUILLY-SUR-SEINE': '92200',
    'LEVALLOIS': '92300', 'LEVALLOIS-PERRET': '92300',
    'ISSY': '92130', 'ISSY-LES-MOULINEAUX': '92130',
    'MONTREUIL': '93100', 'SAINT-DENIS': '93200',
    'VINCENNES': '94300', 'IVRY': '94200', 'IVRY-SUR-SEINE': '94200',
    'CRETEIL': '94000', 'NANTERRE': '92000',

    // Lyon métropole (J+1)
    'LYON': '69001', 'VILLEURBANNE': '69100',
    'CALUIRE': '69300', 'BRON': '69500',
    'OULLINS': '69600', 'VENISSIEUX': '69200',

    // Bordeaux métropole (J+1)
    'BORDEAUX': '33000', 'MERIGNAC': '33700',
    'PESSAC': '33600', 'TALENCE': '33400',
    'BEGLES': '33130', 'CENON': '33150',

    // Autres grandes villes France (J+2 / J+3)
    'MARSEILLE': '13001', 'TOULOUSE': '31000', 'NICE': '06000',
    'NANTES': '44000', 'STRASBOURG': '67000', 'MONTPELLIER': '34000',
    'LILLE': '59000', 'RENNES': '35000', 'REIMS': '51100',
    'LE-HAVRE': '76600', 'SAINT-ETIENNE': '42000', 'TOULON': '83000',
    'GRENOBLE': '38000', 'DIJON': '21000', 'ANGERS': '49000',
    'NIMES': '30000', 'BREST': '29200', 'LIMOGES': '87000',
    'TOURS': '37000', 'CLERMONT-FERRAND': '63000', 'AMIENS': '80000',
    'METZ': '57000', 'BESANCON': '25000', 'PERPIGNAN': '66000',
    'ORLEANS': '45000', 'MULHOUSE': '68100', 'CAEN': '14000',
    'NANCY': '54000', 'ROUEN': '76000', 'AVIGNON': '84000',
    'POITIERS': '86000', 'BELFORT': '90000',

    // Belgique
    'BRUXELLES': '1000', 'BRUSSELS': '1000',
    'ANVERS': '2000', 'ANTWERP': '2000',
    'LIEGE': '4000', 'GAND': '9000', 'GHENT': '9000',
    'CHARLEROI': '6000', 'BRUGES': '8000', 'NAMUR': '5000',

    // Luxembourg
    'LUXEMBOURG': 'L-1000', 'LUX': 'L-1000',
    'ESCH': 'L-4000', 'ESCH-SUR-ALZETTE': 'L-4000',

    // Suisse
    'GENEVE': 'CH-1201', 'GENEVA': 'CH-1201',
    'LAUSANNE': 'CH-1003', 'ZURICH': 'CH-8001',
    'BERNE': 'CH-3000', 'BERN': 'CH-3000',
    'BALE': 'CH-4001', 'BASEL': 'CH-4001',
    'LUGANO': 'CH-6900', 'NEUCHATEL': 'CH-2000',
  }

  // Si le texte tapé matche une ville connue, on substitue son CP
  if (cityMap[cp]) {
    cp = cityMap[cp]
  }

  // Suisse
  if (cp.startsWith('CH') || /^CH-?\d{4}$/i.test(cp)) {
    return {
      zone: 'ch',
      label: 'Suisse',
      eta: 'J+3',
      message: 'Livré en J+3, DDP — taxes et droits inclus dans le prix affiché.',
      tone: 'good',
    }
  }

  // Luxembourg
  if (cp.startsWith('L-') || /^L\d{4}$/i.test(cp)) {
    return {
      zone: 'lu',
      label: 'Luxembourg',
      eta: 'J+2',
      message: 'Livré en J+2 sur tout le Luxembourg.',
      tone: 'good',
    }
  }

  // Belgique (préfixe B- ou 4 chiffres, hors préfixes CH/L)
  if (cp.startsWith('B-') || /^\d{4}$/.test(cp)) {
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
