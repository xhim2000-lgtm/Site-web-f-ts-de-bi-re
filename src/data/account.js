// Compte démo Claire Moreau — façade pour l'espace client
export const demoAccount = {
  prenom: 'Claire',
  nom: 'Moreau',
  email: 'claire.moreau@example.fr',
  membreDepuis: 'mars 2025',
  statut: 'Particulier',
  walletSolde: 27,
  walletBonus: 31, // +15% si conversion en crédit boutique
  futsEnCours: [
    {
      nom: 'Lager classique parisienne 20L',
      livreLe: '03/06/2026',
      statut: 'À retourner avant le 03/07',
      tone: 'pending',
    },
    {
      nom: 'Blonde alsacienne 5L',
      livreLe: '28/05/2026',
      statut: 'Retour scanné',
      tone: 'success',
    },
    {
      nom: 'IPA bretonne 5L',
      livreLe: '15/05/2026',
      statut: 'Crédité 5€',
      tone: 'done',
    },
  ],
  impact: {
    bouteilles: 47,
    co2: '12,3 kg',
    futsRestants: 3,
    statutFutur: 'Ambassadeur Local',
  },
  commandes: [
    { date: '03/06/2026', produits: '1× Lager 20L', montant: 95, statut: 'Livrée' },
    { date: '21/05/2026', produits: '1× Blonde 5L · 1× IPA 5L', montant: 62, statut: 'Livrée' },
    { date: '28/04/2026', produits: '1× Saison 20L', montant: 110, statut: 'Livrée' },
    { date: '12/04/2026', produits: '2× Ambrée 6L', montant: 78, statut: 'Livrée' },
    { date: '02/04/2026', produits: '1× Stout 5L', montant: 35, statut: 'Livrée' },
  ],
  adresse: {
    rue: '42 rue des Vignerons',
    cp: '75011',
    ville: 'Paris',
  },
  creneaux: 'Soir (18h-21h)',
  newsletters: {
    selections: true,
    promos: false,
  },
}

export const ACCOUNT_STORAGE_KEY = 'futlocal_account_logged_in'

// Trust signals B2B
export const legalInfo = {
  siret: '932 145 678 00012',
  tva: 'FR48 932145678',
  capital: '50 000 €',
  siege: '18 rue de Turenne, 75003 Paris',
  licence: 'Licence IV de distribution n°FR-2024-PAR-00847',
}

export const commerciaux = [
  {
    nom: 'Thomas Bernard',
    initiales: 'TB',
    role: 'Responsable Île-de-France',
    email: 'thomas.bernard@futlocal.fr',
  },
  {
    nom: 'Léa Marchetti',
    initiales: 'LM',
    role: 'Responsable Rhône-Alpes',
    email: 'lea.marchetti@futlocal.fr',
  },
  {
    nom: 'Karim Said',
    initiales: 'KS',
    role: 'Responsable Sud-Ouest & événementiel',
    email: 'karim.said@futlocal.fr',
  },
]

export const testimonialsPro = [
  {
    texte: 'Depuis qu\'on est passés sur FutLocal, zéro rupture en 8 mois. Et la cagnotte consigne nous fait économiser 200€/mois en BFR.',
    auteur: 'Camille R.',
    role: 'Gérante du bar Le Comptoir Nord, Paris 18e',
  },
  {
    texte: 'Le quick order, c\'est le matin avant l\'ouverture, en 2 minutes c\'est commandé. Game changer.',
    auteur: 'Yannis P.',
    role: 'Brasserie de la Confluence, Lyon',
  },
  {
    texte: 'Pour notre festival on a commandé 40 fûts en urgence un jeudi pour le samedi. Livré, installé, et reprise des vides incluse. Imbattable.',
    auteur: 'Sophie M.',
    role: 'Les Vendanges du Sud, Bordeaux',
  },
]
