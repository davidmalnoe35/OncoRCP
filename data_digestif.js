/* ===== Filière Oncologie Digestive — Pathologies et protocoles (OncoRCP v3.1) =====
 * Bibliographie : Thésaurus National de Cancérologie Digestive (TNCD 2025-2026 — https://www.snfge.org/tncd)
 * Codes vérifiés sur les référentiels officiels LES / AAP / AAC / CPC d'octobre 2026.
 */
(function () {
  const A = (n, d, k) => ({ n, d, c: "AUTO", k: k || [] });
  const G = n => ({ n, d: "", c: "GHS", k: [] });
  const PO = n => ({ n, d: "", c: "PO", k: [] });

  const PATHOS = [
    { id: "ccr", name: "Côlon / Rectum (CCR)", kw: "colorectal, colon, rectum, rectal, CCR, CCRm, CRC", filiere: "digestif" },
    { id: "og", name: "Œsophage / JOG / Estomac", kw: "estomac, gastrique, oesophage, jonction oesogastrique, JOG, CEO, G/JOG", filiere: "digestif" },
    { id: "pancreas", name: "Pancréas", kw: "pancreas, pancreatique", filiere: "digestif" },
    { id: "chc", name: "CHC (Foie)", kw: "hepatocellulaire, CHC, foie", filiere: "digestif" },
    { id: "vb", name: "Voies biliaires", kw: "voies biliaires, cholangiocarcinome, vesicule, CVB", filiere: "digestif" },
    { id: "anal", name: "Canal anal", kw: "canal anal, anal", filiere: "digestif" },
    { id: "gist", name: "GIST", kw: "GIST, stromale gastro-intestinale", filiere: "digestif" },
    { id: "tne-dig", name: "TNE / CNE digestives", kw: "neuroendocrine, TNE, GEP, intestinale, carcinoide", filiere: "digestif" }
  ];

  const PROTOCOLS = [
    // --- Côlon / Rectum (CCR) ---
    {
      id: "ccr-adj-oxali",
      name: "FOLFOX4 simplifié / CAPOX (Côlon adjuvant)",
      patho: "ccr",
      tags: ["Localisé", "Adjuvant"],
      line: "Côlon stade III (3 mois CAPOX si T1-3 N1 ; 6 mois FOLFOX ou CAPOX si T4 et/ou N2) et stade II haut risque pMMR — recherche déficit DPD obligatoire avant 5-FU/capécitabine",
      note: "Pas d'oxaliplatine si > 70 ans fragile ou neuropathie préexistante (LV5FU2 ou capécitabine seule 6 mois). Stade II dMMR/MSI-H : pas de chimio adjuvante.",
      mols: [
        G("Oxaliplatine + 5-FU / Acide folinique (FOLFOX)"),
        PO("Capécitabine (si schéma CAPOX)")
      ]
    },
    {
      id: "rectum-tnt",
      name: "TNT Rectum : FOLFIRINOX → RCT Capécitabine (PRODIGE 23)",
      patho: "ccr",
      tags: ["Localisé", "Néoadjuvant"],
      line: "Cancer du rectum localement avancé (cT3-T4 et/ou N+) — 6 cycles mFOLFIRINOX néoadjuvant puis RCT 50 Gy + Capécitabine, chirurgie TME puis 3 mois FOLFOX/CAPOX adjuvant",
      note: "Alternative : RT courte 5×5 Gy + 6 CAPOX ou 9 FOLFOX (RAPIDO) ou RCT standard Capécitabine seule.",
      mols: [
        G("Oxaliplatine / Irinotécan / 5-FU / Acide folinique (mFOLFIRINOX)"),
        PO("Capécitabine (concomitante RT)")
      ]
    },
    {
      id: "ccrm-msi-pembro",
      name: "Pembrolizumab monothérapie (CCRm dMMR / MSI-H — L1, KEYNOTE-177)",
      patho: "ccr",
      tags: ["Stade IV", "MSI-H / dMMR", "L1"],
      line: "1re ligne CCR métastatique non résécable d'emblée avec instabilité microsatellitaire (MSI-H / dMMR) — Pembrolizumab 200 mg / 3 sem ou 400 mg / 6 sem (2 ans max)",
      mols: [A("Pembrolizumab (Keytruda)", "PEMBROLIZUMAB", ["I000632"])]
    },
    {
      id: "ccrm-msi-nivo-ipi",
      name: "Nivolumab + Ipilimumab (CCRm dMMR / MSI-H — L1, CheckMate-8HW)",
      patho: "ccr",
      tags: ["Stade IV", "MSI-H / dMMR", "L1"],
      line: "1re ligne CCR métastatique non résécable d'emblée MSI-H / dMMR — Nivolumab + Ipilimumab (4 cycles) puis Nivolumab entretien",
      note: "Codes LES actifs : Nivolumab (I000729 ou I000727) + Ipilimumab (I000726). Privilégier en cas de forte masse tumorale ou risque d'hyperprogression sous mono-IO.",
      mols: [
        A("Nivolumab (Opdivo)", "NIVOLUMAB", ["I000729", "I000727"]),
        A("Ipilimumab (Yervoy)", "IPILIMUMAB", ["I000726"])
      ]
    },
    {
      id: "ccrm-raswt-egfr",
      name: "FOLFOX / FOLFIRI + Cétuximab ou Panitumumab (CCRm RAS/BRAF WT)",
      patho: "ccr",
      tags: ["Stade IV", "RAS WT", "L1", "L2+"],
      line: "1re ligne CCRm RAS et BRAF sauvages (à privilégier si tumeur colique gauche ou objectif de conversion résécable) ; L2 FOLFIRI + anti-EGFR ; L3+ monothérapie",
      note: "Cétuximab : I000106 (L1 + FOLFOX), I000105 (+ irinotécan), I000107 (mono). Panitumumab : I000402 (L1 + FOLFOX/FOLFIRI), I000359 (L2 + FOLFIRI), I000360 (mono). Prophylaxie cutanée (doxycycline + émollients) et suivi magnésémie.",
      mols: [
        A("Cétuximab (Erbitux)", "CETUXIMAB", ["I000106", "I000105", "I000107"]),
        A("Panitumumab (Vectibix)", "PANITUMUMAB", ["I000402", "I000359", "I000360"]),
        G("FOLFOX ou FOLFIRI")
      ]
    },
    {
      id: "ccrm-beva",
      name: "FOLFOX / FOLFIRI / FOLFIRINOX / LV5FU2 + Bévacizumab (CCRm)",
      patho: "ccr",
      tags: ["Stade IV", "RAS muté", "L1", "L2+"],
      line: "1re ou 2e ligne CCR métastatique (standard si RAS muté, côlon droit, ou après échec anti-EGFR) — association fluoropyrimidine ± oxaliplatine / irinotécan",
      note: "Bévacizumab LES (I000029). Respecter un délai de 4 à 6 semaines avant/après chirurgie majeure. Surveillance protéinurie et HTA.",
      mols: [
        A("Bévacizumab (biosimilaires / Avastin)", "BEVACIZUMAB", ["I000029"]),
        G("FOLFOX / FOLFIRI / FOLFIRINOX / LV5FU2"),
        PO("Capécitabine (si CAPOX-Béva ou Capé-Béva)")
      ]
    },
    {
      id: "ccrm-braf-l1",
      name: "Encorafénib + Cétuximab + FOLFOX (CCRm BRAF V600E — L1, BREAKWATER — AAP)",
      patho: "ccr",
      tags: ["Stade IV", "BRAF V600E", "L1"],
      line: "1re ligne CCR métastatique pMMR/MSS porteur d'une mutation BRAF V600E — Encorafénib (AAP CENCO02) + Cétuximab + mFOLFOX6",
      note: "Vérifier l'éligibilité à l'AAP CENCO02. Surveillance ECG (QTc), bilan hépatique, examen dermatologique et ophtalmologique.",
      mols: [
        A("Encorafénib (Braftovi — AAP)", "ENCORAFENIB", ["CENCO02"]),
        A("Cétuximab (Erbitux)", "CETUXIMAB", ["I000106"]),
        G("mFOLFOX6")
      ]
    },
    {
      id: "ccrm-braf-l2",
      name: "Encorafénib + Cétuximab (CCRm BRAF V600E — L2+, BEACON)",
      patho: "ccr",
      tags: ["Stade IV", "BRAF V600E", "L2+"],
      line: "2e ligne et plus CCR métastatique porteur d'une mutation BRAF V600E après traitement systémique antérieur",
      note: "Cétuximab codé en association I999997 (Braftovi) + Encorafénib 300 mg/j par voie orale.",
      mols: [
        A("Cétuximab (Erbitux)", "CETUXIMAB", ["I999997:BRAFTOVI"]),
        PO("Encorafénib (Braftovi) — 300 mg/j")
      ]
    },
    {
      id: "ccrm-l2-afli",
      name: "FOLFIRI + Aflibercept (CCRm L2 post-oxaliplatine, VELOUR)",
      patho: "ccr",
      tags: ["Stade IV", "L2+"],
      line: "2e ligne CCR métastatique résistant ou en progression après un traitement à base d'oxaliplatine",
      mols: [
        A("Aflibercept (Zaltrap)", "AFLIBERCEPT", ["I000386"]),
        G("FOLFIRI")
      ]
    },
    {
      id: "ccrm-l3",
      name: "Trifluridine/Tipiracil ± Bévacizumab (SUNLIGHT) / Régorafénib / Fruquintinib (L3+)",
      patho: "ccr",
      tags: ["Stade IV", "L2+"],
      line: "3e ligne et plus CCR métastatique réfractaire aux fluoropyrimidines, oxaliplatine, irinotécan et thérapies ciblées",
      note: "Lonsurf + Bévacizumab (I000029) : standard L3 (étude SUNLIGHT). Régorafénib (Stivarga, schéma ReDOS 80→120→160 mg) et Fruquintinib (Fruzaqla) par voie orale.",
      mols: [
        A("Bévacizumab (si schéma SUNLIGHT)", "BEVACIZUMAB", ["I000029"]),
        PO("Trifluridine/Tipiracil (Lonsurf) / Régorafénib (Stivarga) / Fruquintinib (Fruzaqla)")
      ]
    },

    // --- Œsophage / JOG / Estomac ---
    {
      id: "og-flot-durva",
      name: "FLOT ± Durvalumab péri-opératoire (Estomac / JOG résécable — AAP MATTERHORN)",
      patho: "og",
      tags: ["Localisé", "Néoadjuvant", "Adjuvant"],
      line: "Adénocarcinome gastrique ou JOG résécable (≥ cT2 ou N+) : 4 cycles FLOT pré-op + 4 FLOT post-op ; ajout Durvalumab néoadjuvant/adjuvant puis mono (AAP CDURV08)",
      note: "Prophylaxie primaire par G-CSF indispensable sous FLOT (risque de neutropénie fébrile > 20 %). Dépistage DPD obligatoire avant 5-FU.",
      mols: [
        A("Durvalumab (Imfinzi — AAP MATTERHORN)", "DURVALUMAB", ["CDURV08"]),
        G("Docétaxel / Oxaliplatine / 5-FU / Acide folinique (FLOT)")
      ]
    },
    {
      id: "og-rct-nivo",
      name: "RCT (Carbo-Paclitaxel CROSS / FOLFOX) → Nivolumab adjuvant (CheckMate-577)",
      patho: "og",
      tags: ["Localisé", "Adjuvant"],
      line: "Cancer de l'œsophage ou de la JOG avec maladie résiduelle (≥ ypT1 ou ypN1) après RCT néoadjuvante et résection R0 — Nivolumab 12 mois (début 4 à 16 sem post-chirurgie)",
      mols: [
        A("Nivolumab (Opdivo)", "NIVOLUMAB", ["I000612"]),
        G("Carboplatine-Paclitaxel hebdo (CROSS) ou FOLFOX (+ RT)")
      ]
    },
    {
      id: "og-l1-her2",
      name: "Platine-5FU/CAPOX + Trastuzumab ± Pembrolizumab (G/JOG HER2+ L1 — KEYNOTE-811)",
      patho: "og",
      tags: ["Stade IV", "HER2+", "PD-L1 CPS ≥ 1", "L1"],
      line: "1re ligne adénocarcinome gastrique ou JOG métastatique HER2+ (IHC 3+ ou 2+/FISH+) — ajout Pembrolizumab si PD-L1 CPS ≥ 1 (I000711)",
      note: "Double code LES si CPS ≥ 1 : Trastuzumab (I000167) + Pembrolizumab (I000711). Surveillance FEVG (échocardiographie) tous les 3 mois.",
      mols: [
        A("Trastuzumab (biosimilaires / Herceptin)", "TRASTUZUMAB", ["I000167"]),
        A("Pembrolizumab (Keytruda, si CPS ≥ 1)", "PEMBROLIZUMAB", ["I000711"]),
        G("Cisplatine ou Oxaliplatine + 5-FU (FOLFOX) ou Capécitabine (CAPOX)")
      ]
    },
    {
      id: "og-l1-cldn",
      name: "FOLFOX / CAPOX + Zolbétuximab (G/JOG HER2-, CLDN18.2+ — L1)",
      patho: "og",
      tags: ["Stade IV", "CLDN18.2+", "L1"],
      line: "1re ligne adénocarcinome gastrique ou JOG avancé/métastatique HER2-, Claudine 18.2 positif (≥ 75 % cellules 2+/3+) — SPOTLIGHT / GLOW",
      note: "Code LES actif I000714. Risque émétisant élevé (nausées/vomissements aigus à la perfusion) : prophylaxie antiémétique renforcée (anti-NK1 + sétron + corticoïdes) et débit de perfusion progressif.",
      mols: [
        A("Zolbétuximab (Vyloy)", "ZOLBETUXIMAB", ["I000714"]),
        G("FOLFOX ou CAPOX")
      ]
    },
    {
      id: "og-l1-io-her2neg",
      name: "Platine-5FU/CAPOX + Nivolumab (CPS ≥ 5) / Pembrolizumab (CPS ≥ 10) / Tislélizumab (TAP ≥ 5%)",
      patho: "og",
      tags: ["Stade IV", "PD-L1 CPS ≥ 5", "PD-L1 CPS ≥ 10", "L1"],
      line: "1re ligne adénocarcinome G/JOG/œsophage HER2- (Nivo I000615 CPS ≥ 5 ; Pembro I000668 CPS ≥ 10 ; Tislé I000715 TAP ≥ 5 %) ou CEO (Tislé I000716 TAP ≥ 5 %)",
      note: "Ne retenir que le code LES de l'anti-PD-1 prescrit selon l'histologie et le score PD-L1 (CPS ou TAP).",
      mols: [
        A("Nivolumab (Opdivo, CPS ≥ 5)", "NIVOLUMAB", ["I000615"]),
        A("Pembrolizumab (Keytruda, CPS ≥ 10)", "PEMBROLIZUMAB", ["I000668"]),
        A("Tislélizumab (Tevimbra, TAP ≥ 5%)", "TISLEZUMAB", ["I000715", "I000716"]),
        G("FOLFOX / CAPOX / Cisplatine-5FU")
      ]
    },
    {
      id: "og-l2-tdxd",
      name: "Trastuzumab déruxtécan (G/JOG HER2+ L2 AAP / L3+ LES)",
      patho: "og",
      tags: ["Stade IV", "HER2+", "L2+"],
      line: "Adénocarcinome gastrique ou JOG avancé HER2+ après traitement comportant le trastuzumab : L2 en AAP (CDERU05) ; L3+ en LES (I000648)",
      note: "Surveillance rapprochée du risque de pneumopathie interstitielle diffuse (PID / ILD) et de la FEVG. Prophylaxie antiémétique renforcée.",
      mols: [A("Trastuzumab déruxtécan (Enhertu)", "TRASTUZUMAB DÉRUXTÉCAN", ["CDERU05", "I000648"])]
    },
    {
      id: "og-l2-ct",
      name: "Paclitaxel ± Ramucirumab / FOLFIRI / Docétaxel (G/JOG L2+)",
      patho: "og",
      tags: ["Stade IV", "L2+"],
      line: "2e ligne adénocarcinome gastrique ou JOG métastatique (ou L3+ : Trifluridine/Tipiracil PO)",
      note: "Ramucirumab (Cyramza) non inscrit sur la LES (financement GHS / vérifier prise en charge locale).",
      mols: [
        G("Paclitaxel hebdo / FOLFIRI / Docétaxel / Irinotécan"),
        PO("Trifluridine/Tipiracil (Lonsurf — L3+)")
      ]
    },

    // --- Pancréas ---
    {
      id: "panc-adj",
      name: "mFOLFIRINOX / Gemcitabine-Capécitabine (Pancréas adjuvant)",
      patho: "pancreas",
      tags: ["Localisé", "Adjuvant"],
      line: "Adénocarcinome du pancréas réséqué (R0/R1) : mFOLFIRINOX 6 mois (standard PS 0-1, PRODIGE 24) ; Gemcitabine-Capécitabine ou Gemcitabine seule si > 75 ans / PS 2",
      note: "Dépistage DPD obligatoire avant 5-FU/capécitabine. Prophylaxie G-CSF sous mFOLFIRINOX.",
      mols: [
        G("Oxaliplatine / Irinotécan / 5-FU / Acide folinique (mFOLFIRINOX) ou Gemcitabine"),
        PO("Capécitabine (si GemCap)")
      ]
    },
    {
      id: "panc-l1-nalirifox",
      name: "NALIRIFOX (Irinotécan liposomal + 5-FU/LV + Oxaliplatine — L1, NAPOLI-3)",
      patho: "pancreas",
      tags: ["Stade IV", "L1"],
      line: "1re ligne adénocarcinome du pancréas métastatique (PS 0-1) — Irinotécan liposomal pégylé (Onivyde, LES I000719) + Oxaliplatine + 5-FU/LV",
      note: "Ne pas confondre irinotécan liposomal (Onivyde, LES I000719) et irinotécan conventionnel (GHS).",
      mols: [
        A("Irinotécan liposomal (Onivyde)", "IRINOTECAN", ["I000719"]),
        G("Oxaliplatine / 5-FU / Acide folinique")
      ]
    },
    {
      id: "panc-l1-std",
      name: "FOLFIRINOX / Gemcitabine + Nab-paclitaxel / Gemcitabine (Pancréas L1)",
      patho: "pancreas",
      tags: ["Stade IV", "L1"],
      line: "1re ligne adénocarcinome du pancréas métastatique ou localement avancé : FOLFIRINOX (PS 0-1, bili < 1,5 N) ou Gemcitabine + Nab-paclitaxel (ou Gemcitabine seule si PS 2)",
      note: "Nab-paclitaxel radié de la LES (financement GHS). En cas de mutation germinale BRCA1/2 contrôlée ≥ 4 mois sous platine : relais maintenance par Olaparib PO (POLO).",
      mols: [
        G("FOLFIRINOX ou Gemcitabine ± Nab-paclitaxel"),
        PO("Olaparib (Lynparza — maintenance si gBRCA1/2)")
      ]
    },
    {
      id: "panc-l2",
      name: "Gemcitabine ± Nab-paclitaxel / FOLFOX / FOLFIRI (Pancréas L2)",
      patho: "pancreas",
      tags: ["Stade IV", "L2+"],
      line: "2e ligne adénocarcinome du pancréas métastatique : Gemcitabine ± Nab-paclitaxel après FOLFIRINOX ; FOLFOX, FOLFIRI ou 5-FU/LV + Irinotécan liposomal après Gemcitabine",
      mols: [G("Gemcitabine ± Nab-paclitaxel / FOLFOX / FOLFIRI")]
    },

    // --- Carcinome hépatocellulaire (CHC) ---
    {
      id: "chc-l1-atezo-beva",
      name: "Atézolizumab + Bévacizumab (CHC L1 — IMbrave150)",
      patho: "chc",
      tags: ["Stade IV", "Child-Pugh A", "L1"],
      line: "1re ligne CHC avancé ou non résécable, Child-Pugh A, ECOG 0-1, non éligible ou en échec de traitement locorégional",
      note: "Double code LES : Atézolizumab (I000569) + Bévacizumab en association (I999997 Tecentriq). Endoscopie œsogastrique préalable obligatoire (< 6 mois) pour dépister et traiter les varices œsophagiennes.",
      mols: [
        A("Atézolizumab (Tecentriq)", "ATEZOLIZUMAB", ["I000569"]),
        A("Bévacizumab (biosimilaires / Avastin)", "BEVACIZUMAB", ["I999997:TECENTRIQ"])
      ]
    },
    {
      id: "chc-l1-durva-treme",
      name: "Durvalumab + Trémélimumab (CHC L1 — HIMALAYA STRIDE)",
      patho: "chc",
      tags: ["Stade IV", "Child-Pugh A", "L1"],
      line: "1re ligne CHC avancé ou non résécable, Child-Pugh A, ECOG 0-1 — 1 dose unique de Trémélimumab 300 mg + Durvalumab 1500 mg puis Durvalumab / 4 sem",
      note: "Double code LES : Durvalumab (I000661) + Trémélimumab (I000660). Alternative de choix en cas de contre-indication au bévacizumab (risque hémorragique / varices).",
      mols: [
        A("Durvalumab (Imfinzi)", "DURVALUMAB", ["I000661"]),
        A("Trémélimumab (Imjudo)", "TRÉMÉLIMUMAB", ["I000660"])
      ]
    },
    {
      id: "chc-tki",
      name: "Lenvatinib / Sorafénib (L1 si CI IO) — Régorafénib / Cabozantinib (L2+)",
      patho: "chc",
      tags: ["Stade IV", "Child-Pugh A", "L1", "L2+"],
      line: "CHC avancé Child-Pugh A : Lenvatinib ou Sorafénib en L1 si contre-indication à l'immunothérapie ; Régorafénib ou Cabozantinib en L2+ après progression",
      note: "Voie orale (ville). Surveillance HTA, syndrome main-pied, diarrhées, bilan hépatique et protéinurie.",
      mols: [PO("Lenvatinib (Lenvima) / Sorafénib (Nexavar) / Régorafénib (Stivarga) / Cabozantinib (Cabometyx)")]
    },

    // --- Voies biliaires (Cholangiocarcinome / Vésicule) ---
    {
      id: "vb-adj-cape",
      name: "Capécitabine adjuvante (Voies biliaires — BILCAP)",
      patho: "vb",
      tags: ["Localisé", "Adjuvant"],
      line: "Adjuvant après résection R0/R1 d'un cholangiocarcinome ou cancer de la vésicule biliaire — 8 cycles (6 mois)",
      note: "Dépistage DPD obligatoire avant initiation.",
      mols: [PO("Capécitabine — 1250 mg/m² × 2/j J1-J14 / 21 j (8 cycles)")]
    },
    {
      id: "vb-l1-cisgem-io",
      name: "Cisplatine-Gemcitabine + Durvalumab (TOPAZ-1) ou Pembrolizumab (KEYNOTE-966)",
      patho: "vb",
      tags: ["Stade IV", "L1"],
      line: "1re ligne cancer des voies biliaires (CVB) localement avancé non résécable ou métastatique — jusqu'à 8 cycles CisGem + IO puis maintenance IO",
      note: "Deux options LES actives : Durvalumab (I000662) ou Pembrolizumab (I000667). Penser au profilage moléculaire précoce (IDH1, FGFR2, HER2, BRAF, MSI).",
      mols: [
        A("Durvalumab (Imfinzi)", "DURVALUMAB", ["I000662"]),
        A("Pembrolizumab (Keytruda)", "PEMBROLIZUMAB", ["I000667"]),
        G("Cisplatine / Gemcitabine")
      ]
    },
    {
      id: "vb-l2-cibles",
      name: "Pémigatinib (FGFR2 — AAP) / Zanidatamab (HER2 3+ — AAP) / Ivosidénib (IDH1)",
      patho: "vb",
      tags: ["Stade IV", "FGFR2", "HER2+", "IDH1", "L2+"],
      line: "2e ligne et plus cholangiocarcinome / CVB avancé avec altération moléculaire ciblable",
      note: "Pémigatinib (AAP CPERM01, fusion FGFR2 — surveillance phosphorémie et ophtalmo) ; Zanidatamab (AAP CZANI01, HER2 IHC3+) ; Ivosidénib (Tibsovo, mutation IDH1, PO — surveillance ECG QTc).",
      mols: [
        A("Pémigatinib (Pemazyre — AAP FGFR2)", "PEMIGATINIB", ["CPERM01"]),
        A("Zanidatamab (Ziihera — AAP HER2 3+)", "ZANIDATAMAB", ["CZANI01"]),
        PO("Ivosidénib (Tibsovo — IDH1)")
      ]
    },
    {
      id: "vb-l2-folfox",
      name: "FOLFOX / FOLFIRI (Voies biliaires L2 sans cible)",
      patho: "vb",
      tags: ["Stade IV", "L2+"],
      line: "2e ligne cancer des voies biliaires avancé après Cisplatine-Gemcitabine en l'absence d'altération moléculaire ciblable (ABC-06)",
      mols: [G("FOLFOX (standard) ou FOLFIRI")]
    },

    // --- Canal anal ---
    {
      id: "anal-rct",
      name: "RCT Mitomycine C + 5-FU (ou Capécitabine) — Canal anal localisé",
      patho: "anal",
      tags: ["Localisé"],
      line: "Carcinome épidermoïde du canal anal localisé (T2-T4 ou N+) — Radiothérapie pelvienne + Mitomycine C (J1 et J29) + 5-FU IV continu ou Capécitabine",
      note: "Dépistage DPD obligatoire avant 5-FU / capécitabine.",
      mols: [
        G("Mitomycine C + 5-FU (S1 et S5)"),
        PO("Capécitabine (alternative au 5-FU)")
      ]
    },
    {
      id: "anal-meta",
      name: "DCF modifié / Carboplatine + Paclitaxel (Canal anal métastatique)",
      patho: "anal",
      tags: ["Stade IV", "L1"],
      line: "1re ligne carcinome épidermoïde du canal anal métastatique ou en récidive inopérable — DCF modifié (Epitopes-HPV02) si PS 0-1 ou Carboplatine-Paclitaxel hebdo (InterAACT)",
      mols: [G("Docétaxel / Cisplatine / 5-FU (mDCF) ou Carboplatine + Paclitaxel")]
    },

    // --- GIST ---
    {
      id: "gist-tki",
      name: "Imatinib (L1/Adj) → Sunitinib (L2) → Régorafénib (L3) → Riprétinib (L4)",
      patho: "gist",
      tags: ["Localisé", "Stade IV", "L1", "L2+"],
      line: "GIST KIT/PDGFRA muté : Imatinib 400 mg/j (adjuvant 3 ans si haut risque, ou L1 métastatique ; 800 mg/j si exon 9) ; L2 Sunitinib ; L3 Régorafénib ; L4 Riprétinib ; Avapritinib si PDGFRA D842V",
      note: "Voie orale (ville). Vérifier les interactions CYP3A4 et le bilan biologique/cardiaque. Des AAC existent pour le régorafénib en cas de situations particulières (NREGO03/NREGO06).",
      mols: [
        PO("Imatinib / Sunitinib / Régorafénib / Riprétinib / Avapritinib (D842V)")
      ]
    },

    // --- TNE / CNE digestives ---
    {
      id: "tne-dig-ass-cible",
      name: "ASS (Lanréotide / Octréotide) — Évérolimus / Sunitinib (TNE G1-G2)",
      patho: "tne-dig",
      tags: ["Stade IV", "TNE G1-G2"],
      line: "TNE gastro-entéro-pancréatique (GEP) bien différenciée G1-G2 inopérable/métastatique : ASS en L1 (antiprolifératif + antisécrétoire) ; Évérolimus ou Sunitinib (pancréas) si progression",
      note: "Validation en RCP RENATEN.",
      mols: [
        G("Lanréotide LP 120 mg SC ou Octréotide LP 30 mg IM (/ 28 j)"),
        PO("Évérolimus (Afinitor) / Sunitinib (Sutent — TNE pancréatique)")
      ]
    },
    {
      id: "tne-dig-riv",
      name: "¹⁷⁷Lu-Oxodotréotide / Lutathera (RIV TNE-GEP — LES / CPC)",
      patho: "tne-dig",
      tags: ["Stade IV", "TNE G1-G2", "L2+"],
      line: "TNE-GEP inopérable/métastatique progressive, bien différenciée G1-G2, exprimant les récepteurs de la somatostatine (TEP ⁶⁸Ga-DOTATOC+) — 4 cures / 8 sem",
      note: "LES (I000472) pour les TNE intestinales ; CPC (NLUTE04) sur avis RCP RENATEN pour les TNE hors AMM (ex : pancréatiques / primitif inconnu). Arrêt des ASS retard 4 à 6 sem avant RIV.",
      mols: [
        A("Lutécium (¹⁷⁷Lu) oxodotréotide (Lutathera — LES intestinales)", "177 LUTÉCIUM OXODOTRÉOTIDE", ["I000472"]),
        A("Lutécium (¹⁷⁷Lu) oxodotréotide (Lutathera — CPC autres TNE)", "LUTÉCIUM (¹⁷⁷LU) OXODOTRÉOTIDE", ["NLUTE04"])
      ]
    },
    {
      id: "tne-dig-ct",
      name: "CAPTEM / STZ-5FU / FOLFOX (TNE pancréatique) — Platine-Étoposide (CNE G3)",
      patho: "tne-dig",
      tags: ["Stade IV", "TNE G1-G2", "CNE G3"],
      line: "TNE pancréatique progressive/symptomatique : CAPTEM (Capécitabine-Témozolomide) ou Streptozocine-5FU ; Carcinome neuroendocrine peu différencié (CNE G3) : Cisplatine/Carboplatine + Étoposide (L1), FOLFIRI/FOLFOX (L2)",
      mols: [
        G("Platine-Étoposide (CNE G3) / Streptozocine-5FU / FOLFOX / FOLFIRI"),
        PO("CAPTEM (Capécitabine + Témozolomide)")
      ]
    }
  ];

  window.ONCORCP_MODULES = window.ONCORCP_MODULES || {};
  window.ONCORCP_MODULES.digestif = {
    id: "digestif",
    label: "Digestif",
    shortLabel: "Digestif",
    rx: /COLORECT|COLON|RECTUM|RECTAL|ESTOMAC|GASTRIQ|OESOPHAG|JONCTION OESO|PANCREA|HEPATOCELLUL|VOIES BILIAIR|CHOLANGIO|CANAL ANAL|GIST|STROMALE GASTRO|NEUROENDOCRIN|INTESTIN|DIGESTI|\bCHC\b|\bCCR\b|\bJOG\b|\bCVB\b|CLDN|CLAUDIN|FGFR2/,
    quickFilters: [
      { label: "MSI-H / dMMR", q: "MSI-H / dMMR" },
      { label: "RAS WT", q: "RAS WT" },
      { label: "RAS muté", q: "RAS muté" },
      { label: "BRAF V600E", q: "BRAF V600E" },
      { label: "HER2+", q: "HER2+" },
      { label: "CLDN18.2+", q: "CLDN18.2+" },
      { label: "FGFR2", q: "FGFR2" },
      { label: "IDH1", q: "IDH1" },
      { label: "Child-Pugh A", q: "Child-Pugh A" },
      { label: "Localisé", q: "Localisé" },
      { label: "Stade IV", q: "Stade IV" },
      { label: "L1", q: "L1" },
      { label: "L2+", q: "L2+" }
    ],
    pathos: PATHOS,
    protocols: PROTOCOLS
  };
})();
