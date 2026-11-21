/* ===== Filière Oncologie Thoracique — Pathologies et protocoles (OncoRCP v3.0) =====
 * Bibliographie : Référentiels Auvergne-Rhône-Alpes en Oncologie Thoracique 2026 (https://referentiels-aristot.com/)
 * Codes vérifiés sur les référentiels officiels LES / AAP / AAC / CPC d'octobre 2026.
 */
(function () {
  const A = (n, d, k) => ({ n, d, c: "AUTO", k: k || [] });
  const G = n => ({ n, d: "", c: "GHS", k: [] });
  const PO = n => ({ n, d: "", c: "PO", k: [] });

  const PATHOS = [
    { id: "cbnpc", name: "CBNPC", kw: "cancer bronchique non a petites cellules, CBNPC, non epidermoide, epidermoide, adenocarcinome bronchique, poumon", filiere: "thorax" },
    { id: "cbpc", name: "CBPC", kw: "petites cellules, CBPC, SCLC", filiere: "thorax" },
    { id: "meso", name: "Mésothéliome pleural", kw: "mesotheliome, pleural, MPM", filiere: "thorax" },
    { id: "nne-thorax", name: "NNE / Carcinoïdes", kw: "neuroendocrine, carcinoide, CNEGC, TNE bronchique, TNE thymique", filiere: "thorax" }
  ];

  const PROTOCOLS = [
    // --- CBNPC : Stades localisés / résécables (II à IIIB TNM9) ---
    {
      id: "cbnpc-neoadj-nivo",
      name: "Nivolumab + Platine-Chimiothérapie (néoadjuvant)",
      patho: "cbnpc",
      tags: ["Stade II-III", "PD-L1 ≥ 1%", "Néoadjuvant"],
      line: "CBNPC résécable stades II à IIIB (TNM9), PD-L1 ≥ 1 %, EGFR/ALK WT — 3 cycles néoadjuvants avant chirurgie (CheckMate-816)",
      note: "Non-épidermoïde : platine + pémétrexed + nivolumab (tracer I000674 + I999997 pémétrexed). Épidermoïde : cisplatine-gemcitabine ou carboplatine-paclitaxel + nivolumab.",
      mols: [
        A("Nivolumab (Opdivo)", "NIVOLUMAB", ["I000674"]),
        A("Pémétrexed (si non-épidermoïde)", "PEMETREXED", ["I999997:NIVOLUMAB"]),
        G("Cisplatine / Carboplatine + Paclitaxel ou Gemcitabine")
      ]
    },
    {
      id: "cbnpc-adj-ct",
      name: "Cisplatine + Vinorelbine (ou Pémétrexed) — Adjuvant",
      patho: "cbnpc",
      tags: ["Stade II-III", "PD-L1 < 1%", "Adjuvant"],
      line: "CBNPC opéré stades pII-pIII sans néoadjuvant (notamment PD-L1 < 1 %) — 4 cycles débutés 4 à 8 semaines post-chirurgie",
      note: "Option non-épidermoïde : cisplatine-pémétrexed (hors AMM en adjuvant). Si contre-indication au cisplatine : carboplatine-paclitaxel après avis RCP.",
      mols: [
        G("Cisplatine / Vinorelbine (IV ou PO) — 4 cycles"),
        A("Pémétrexed (option non-épidermoïde, hors AMM)", "PEMETREXED")
      ]
    },
    {
      id: "cbnpc-adj-osi",
      name: "Osimertinib adjuvant (ADAURA)",
      patho: "cbnpc",
      tags: ["Stade I-III", "EGFR", "Adjuvant"],
      line: "CBNPC réséqué stades pIB à pIIIA/IIIB (T4N2) avec mutation EGFR Del19 ou L858R — 3 ans (après chimio adjuvante si indiquée)",
      note: "Voie orale (80 mg/j). Vérifier ECG (QTc), interactions CYP3A4 et bilan hépatique.",
      mols: [PO("Osimertinib (Tagrisso) — 80 mg/j pendant 3 ans")]
    },
    {
      id: "cbnpc-adj-alec",
      name: "Alectinib adjuvant (ALINA)",
      patho: "cbnpc",
      tags: ["Stade II-III", "ALK", "Adjuvant"],
      line: "CBNPC réséqué stades pII à pIIIB avec réarrangement ALK — 2 ans après chirurgie complète, sans chimiothérapie adjuvante préalable",
      note: "Voie orale (600 mg × 2/j au cours des repas). Surveillance bilan hépatique, CPK, NFS, bradycardie.",
      mols: [PO("Alectinib (Alecensa) — 600 mg × 2/j pendant 2 ans")]
    },

    // --- CBNPC : Stades III non résécables ---
    {
      id: "cbnpc-st3-durva",
      name: "RCT + Durvalumab consolidation (PACIFIC)",
      patho: "cbnpc",
      tags: ["Stade III", "PD-L1 ≥ 1%", "PD-L1 < 1%"],
      line: "CBNPC stade III non résécable, EGFR WT, non progressif après radiochimiothérapie — Durvalumab 12 mois (début ≤ 42 j post-RT)",
      note: "LES (I000499) si PD-L1 ≥ 1 % ; CPC (I000541) si PD-L1 < 1 % ou inconnu. Chimio concomitante sans gemcitabine (cisplatine-vinorelbine ou carboplatine-paclitaxel).",
      mols: [
        A("Durvalumab (Imfinzi)", "DURVALUMAB", ["I000499", "I000541"]),
        G("Cisplatine-Vinorelbine ou Carboplatine-Paclitaxel (+ RT 66 Gy)")
      ]
    },
    {
      id: "cbnpc-st3-osi",
      name: "RCT + Osimertinib consolidation (LAURA)",
      patho: "cbnpc",
      tags: ["Stade III", "EGFR"],
      line: "CBNPC stade III non résécable avec mutation EGFR Del19 ou L858R, non progressif après RCT — Osimertinib jusqu'à progression ou toxicité",
      note: "Ne pas prescrire de durvalumab chez les patients mutés EGFR (absence de bénéfice et sur-risque de PID sévère si séquence IO → osimertinib < 3 mois).",
      mols: [
        PO("Osimertinib (Tagrisso) — 80 mg/j en continu"),
        G("Radiochimiothérapie préalable à base de platine")
      ]
    },

    // --- CBNPC : Stade IV sans addiction oncogénique (1re ligne) ---
    {
      id: "cbnpc-l1-pembro-pem",
      name: "Platine + Pémétrexed + Pembrolizumab (KEYNOTE-189)",
      patho: "cbnpc",
      tags: ["Stade IV", "Non-épidermoïde", "PD-L1 < 50%", "PD-L1 ≥ 50%"],
      line: "1re ligne CBNPC non-épidermoïde métastatique, EGFR/ALK/ROS1 WT, tout PD-L1, PS 0-1 — 4 cycles puis maintenance Pémétrexed + Pembrolizumab (2 ans)",
      note: "Deux codes LES : pembrolizumab (I000476) et pémétrexed en association (I999997 Keytruda). Supplémentation B9/B12 obligatoire.",
      mols: [
        A("Pembrolizumab (Keytruda)", "PEMBROLIZUMAB", ["I000476"]),
        A("Pémétrexed", "PEMETREXED", ["I999997:KEYTRUDA"]),
        G("Cisplatine ou Carboplatine (4 cycles)")
      ]
    },
    {
      id: "cbnpc-l1-pembro-pacli",
      name: "Carboplatine + Paclitaxel + Pembrolizumab (KEYNOTE-407)",
      patho: "cbnpc",
      tags: ["Stade IV", "Épidermoïde", "PD-L1 < 50%", "PD-L1 ≥ 50%"],
      line: "1re ligne CBNPC épidermoïde métastatique, tout PD-L1, PS 0-1 — 4 cycles puis maintenance Pembrolizumab (2 ans)",
      note: "Option > 70 ans sélectionné (avis RCP) : carboplatine AUC 6 J1-29 + paclitaxel 90 mg/m² J1/J8/J15 + pembrolizumab. Aussi option dans les formes sarcomatoïdes / SMARCA4 / NUT.",
      mols: [
        A("Pembrolizumab (Keytruda)", "PEMBROLIZUMAB", ["I000501"]),
        G("Carboplatine / Paclitaxel (4 cycles)")
      ]
    },
    {
      id: "cbnpc-l1-io-mono",
      name: "Pembrolizumab / Atézolizumab / Cémiplimab (mono L1, PD-L1 ≥ 50%)",
      patho: "cbnpc",
      tags: ["Stade IV", "PD-L1 ≥ 50%"],
      line: "1re ligne CBNPC métastatique (toutes histologies), PD-L1 ≥ 50 %, EGFR/ALK/ROS1 WT, PS 0-1 (option PS 2 en RCP) — jusqu'à 2 ans",
      note: "Vérifier l'absence de mutation EGFR, ALK, ROS1 avant initiation (IO délétère si addiction). Atézolizumab disponible en forme SC (1875 mg / 3 sem).",
      mols: [
        A("Pembrolizumab (Keytruda)", "PEMBROLIZUMAB", ["I000392"]),
        A("Atézolizumab (Tecentriq IV/SC)", "ATEZOLIZUMAB", ["I000589"]),
        A("Cémiplimab (Libtayo)", "CEMIPLIMAB", ["I000608"])
      ]
    },
    {
      id: "cbnpc-l1-ct-beva",
      name: "Doublet Platine ± Bévacizumab (CI IO / PS 2 / > 70 ans)",
      patho: "cbnpc",
      tags: ["Stade IV", "Non-épidermoïde", "Épidermoïde"],
      line: "1re ligne CBNPC stade IV si contre-indication à l'immunothérapie, PS 2 ou > 70 ans (4 à 6 cycles ± maintenance pemetrexed / bévacizumab si non-épidermoïde)",
      note: "Bévacizumab réservé aux non-épidermoïdes (I000030). Sujet > 70 ans ou PS 2 : carboplatine + paclitaxel hebdomadaire privilégié.",
      mols: [
        A("Pémétrexed (non-épidermoïde)", "PEMETREXED", ["I000011", "I000012"]),
        A("Bévacizumab (non-épidermoïde)", "BEVACIZUMAB", ["I000030"]),
        G("Cisplatine ou Carboplatine + Paclitaxel / Vinorelbine / Gemcitabine / Docétaxel")
      ]
    },

    // --- CBNPC : Stade IV sans addiction (2e ligne et +) ---
    {
      id: "cbnpc-l2-post-ctio",
      name: "Docétaxel / Pémétrexed / Paclitaxel-Bévacizumab (L2 post-chimio-IO)",
      patho: "cbnpc",
      tags: ["Stade IV", "L2+"],
      line: "2e ligne CBNPC métastatique après chimio-immunothérapie de 1re ligne",
      note: "Pémétrexed (I000013) si non-épidermoïde naïf de pémétrexed. Paclitaxel hebdomadaire + bévacizumab (non-épidermoïde) : bévacizumab hors AMM en L2.",
      mols: [
        A("Pémétrexed (si non-épidermoïde naïf)", "PEMETREXED", ["I000013"]),
        A("Bévacizumab (avec paclitaxel, hors AMM L2)", "BEVACIZUMAB"),
        G("Docétaxel / Paclitaxel hebdo / Gemcitabine / Vinorelbine")
      ]
    },
    {
      id: "cbnpc-l2-io",
      name: "Atézolizumab / Nivolumab / Pembrolizumab (L2 post-chimio seule)",
      patho: "cbnpc",
      tags: ["Stade IV", "L2+", "PD-L1 ≥ 1%"],
      line: "2e ligne CBNPC métastatique après chimiothérapie sans immunothérapie en 1re ligne",
      note: "Pembrolizumab (I000211) nécessite PD-L1 ≥ 1 %. Nivolumab : I000265 (épidermoïde) ou I000266 (non-épidermoïde). Atézolizumab (I000454) : tout PD-L1, IV ou SC.",
      mols: [
        A("Atézolizumab (Tecentriq IV/SC)", "ATEZOLIZUMAB", ["I000454"]),
        A("Nivolumab (Opdivo)", "NIVOLUMAB", ["I000265", "I000266"]),
        A("Pembrolizumab (Keytruda, si PD-L1 ≥ 1%)", "PEMBROLIZUMAB", ["I000211"])
      ]
    },
    {
      id: "cbnpc-l3-aac",
      name: "Télisotuzumab védotine (c-MET 3+) / OSE2101 Tedopi (HLA-A2) — AAC",
      patho: "cbnpc",
      tags: ["Stade IV", "L2+", "MET"],
      line: "Lignes ultérieures CBNPC métastatique sans mutation EGFR : Teliso-V (non-épi, IHC c-MET 3+ ≥ 25 %, ≥ L3) ou OSE2101 (HLA-A2 post-IO)",
      note: "Accès compassionnels (AAC) actifs : NTELI01 (télisotuzumab védotine) et NOSE201 (OSE2101).",
      mols: [
        A("Télisotuzumab védotine (c-MET 3+)", "TELISOTUZUMAB VEDOTI", ["NTELI01"]),
        A("OSE2101 / Tedopi (HLA-A2)", "OSE2101 (MÉLANGE DE 10 PEPTIDES)", ["NOSE201"])
      ]
    },

    // --- CBNPC : Stade IV avec addiction oncogénique ---
    {
      id: "cbnpc-egfr-l1",
      name: "Osimertinib ± Platine-Pémétrexed (EGFR Del19 / L858R — L1)",
      patho: "cbnpc",
      tags: ["Stade IV", "EGFR"],
      line: "1re ligne CBNPC métastatique avec mutation EGFR commune (Del19 ou L858R) — Osimertinib 80 mg/j seul (FLAURA) ou + platine-pémétrexed (FLAURA-2)",
      note: "Vérifier prise en charge de l'extension FLAURA-2 (pémétrexed + osimertinib). Amivantamab + lazertinib (MARIPOSA) non disponible en France à date.",
      mols: [
        PO("Osimertinib (Tagrisso) — 80 mg/j"),
        A("Pémétrexed (si schéma FLAURA-2)", "PEMETREXED"),
        G("Cisplatine ou Carboplatine (si schéma FLAURA-2)")
      ]
    },
    {
      id: "cbnpc-egfr-l2-ami",
      name: "Amivantamab + Carboplatine-Pémétrexed (EGFR L2 post-osimertinib — AAP)",
      patho: "cbnpc",
      tags: ["Stade IV", "EGFR", "L2+"],
      line: "2e ligne CBNPC avancé EGFR Del19 / L858R après progression sous osimertinib (MARIPOSA-2)",
      note: "Deux codes : amivantamab en AAP (CAMIV03) + pémétrexed en association (I999997 Amivantamab). Prémédication J1/J2 (corticoïdes J-2/J-1), prophylaxie cutanée (doxycycline) et risque thromboembolique.",
      mols: [
        A("Amivantamab (Rybrevant)", "AMIVANTAMAB", ["CAMIV03"]),
        A("Pémétrexed", "PEMETREXED", ["I999997:AMIVANTAMAB"]),
        G("Carboplatine AUC 5")
      ]
    },
    {
      id: "cbnpc-egfr-ex20",
      name: "Amivantamab + Carboplatine-Pémétrexed (EGFR exon 20 — AAP) / Sunvozertinib (AAC)",
      patho: "cbnpc",
      tags: ["Stade IV", "EGFR"],
      line: "1re ligne CBNPC avancé avec insertion exon 20 de l'EGFR (PAPILLON — AAP CAMIV02) ; option Sunvozertinib en AAC (centres WUKONG)",
      note: "1re dose d'amivantamab fractionnée C1J1/C1J2 sur VVP. Tracer CAMIV02 + I999997 Rybrevant pour le pémétrexed.",
      mols: [
        A("Amivantamab (Rybrevant)", "AMIVANTAMAB", ["CAMIV02"]),
        A("Pémétrexed", "PEMETREXED", ["I999997:RYBREVANT"]),
        A("Sunvozertinib (option AAC centres WUKONG)", "SUNVOZERTINIB", ["NSUNV01"]),
        G("Carboplatine AUC 5")
      ]
    },
    {
      id: "cbnpc-egfr-rare",
      name: "Afatinib / Osimertinib (mutations EGFR rares)",
      patho: "cbnpc",
      tags: ["Stade IV", "EGFR"],
      line: "1re ligne CBNPC métastatique avec mutation EGFR rare (G719X, L861Q, S768I) ou combinée (ACHILLES / RCP)",
      note: "Afatinib 40 mg/j à distance des repas (suivi FEVG/3 mois, toxicité cutanée/digestive). Osimertinib en option (notamment mutations combinées avec Del19/L858R).",
      mols: [PO("Afatinib (Giotrif) — ou Osimertinib (Tagrisso)")]
    },
    {
      id: "cbnpc-alk",
      name: "Lorlatinib / Alectinib / Brigatinib (ALK+) — Néladalkib (AAC)",
      patho: "cbnpc",
      tags: ["Stade IV", "ALK"],
      line: "1re ligne CBNPC métastatique ALK+ : Lorlatinib standard (CROWN) ; Alectinib ou Brigatinib en alternative. L2+ : autre ITK selon mutation de résistance ou Néladalkib (AAC)",
      note: "Lorlatinib : surveillance bilan lipidique, neuropsychologique, PR (ECG). Néladalkib (NNELA01) en AAC après ≥ 2 ITK ou intolérance lorlatinib (centres ALKOVE-1). Pas d'immunothérapie chez les ALK+.",
      mols: [
        PO("Lorlatinib (Lorviqua) / Alectinib (Alecensa) / Brigatinib (Alunbrig)"),
        A("Néladalkib (L3+ AAC centres ALKOVE-1)", "NELADALKIB", ["NNELA01"])
      ]
    },
    {
      id: "cbnpc-ros1",
      name: "Crizotinib (ROS1+ L1) / Zidésamtinib (AAC L2+)",
      patho: "cbnpc",
      tags: ["Stade IV", "ROS1"],
      line: "1re ligne CBNPC métastatique avec réarrangement ROS1 : Crizotinib (250 mg × 2/j) ou essai clinique ; L2+ : Zidésamtinib en AAC (centres ARROS-1)",
      note: "Crizotinib : ECG (QTc, bradycardie), bilan hépatique, troubles visuels. Chimiothérapie platine-pémétrexed active ; éviter IO en monothérapie.",
      mols: [
        PO("Crizotinib (Xalkori) — 250 mg × 2/j"),
        A("Zidésamtinib (AAC post-ITK ROS1)", "ZIDESAMTINIB", ["NZIDE01"])
      ]
    },
    {
      id: "cbnpc-ret",
      name: "Selpercatinib (fusion RET+)",
      patho: "cbnpc",
      tags: ["Stade IV", "RET"],
      line: "1re ligne (et L2+ naïf d'anti-RET) CBNPC avancé avec fusion du gène RET (LIBRETTO-431)",
      note: "160 mg × 2/j PO (au cours du repas si IPP associé). Surveillance HTA, ECG (QTc), bilan hépatique, risque d'hypersensibilité post-IO et de chylothorax.",
      mols: [PO("Selpercatinib (Retsevmo) — 160 mg × 2/j")]
    },
    {
      id: "cbnpc-braf",
      name: "Dabrafénib + Tramétinib / Encorafénib + Binimétinib (BRAF V600E)",
      patho: "cbnpc",
      tags: ["Stade IV", "BRAF", "L2+"],
      line: "2e ligne et plus CBNPC avancé avec mutation BRAF V600E après chimiothérapie et/ou immunothérapie",
      note: "En L1, privilégier chimio-immunothérapie (notamment fumeurs) car les anti-BRAF/MEK ne sont pas remboursés en L1. Suivi FEVG, ECG, ophtalmo et examen dermatologique.",
      mols: [PO("Dabrafénib + Tramétinib (ou Encorafénib + Binimétinib)")]
    },
    {
      id: "cbnpc-met14",
      name: "Crizotinib (mutation MET exon 14 — CPC)",
      patho: "cbnpc",
      tags: ["Stade IV", "MET", "L2+"],
      line: "CBNPC avancé ou métastatique avec saut de l'exon 14 de MET après ≥ 1 ligne à base de doublet de platine ± immunothérapie (CPC I001000)",
      note: "Privilégier également l'inclusion en essai clinique dédié (ex : IFCT-2404 COMET). Ne concerne pas les amplifications de MET.",
      mols: [A("Crizotinib (Xalkori — CPC MET ex14)", "CRIZOTINIB", ["I001000"])]
    },
    {
      id: "cbnpc-nrg1-her2",
      name: "Zénocutuzumab (NRG1 — AAC) / Zongertinib (HER2 — AAC / essais)",
      patho: "cbnpc",
      tags: ["Stade IV", "NRG1", "HER2", "KRAS"],
      line: "Altérations rares CBNPC métastatique : fusion NRG1 (Zénocutuzumab AAC NZENO01) ; mutation HER2 ex20 (essais cliniques / Zongertinib AAC) ; KRAS G12C (essais cliniques)",
      note: "Sotorasib, adagrasib (KRAS G12C) et trastuzumab-déruxtécan (HER2) ne sont pas disponibles/remboursés en initiation en France dans le CBNPC.",
      mols: [
        A("Zénocutuzumab (fusion NRG1)", "ZENOCUTUZUMAB-ZBCO", ["NZENO01"]),
        A("Zongertinib (mutation HER2 — vérifier conditions AAC)", "ZONGERTINIB ( BI 1810631)", ["NZONG03", "NZONG02"])
      ]
    },

    // --- CBPC (Cancer bronchique à petites cellules) ---
    {
      id: "cbpc-st13-durva",
      name: "Platine-Étoposide + RT puis Durvalumab 2 ans (Stades I-III, ADRIATIC)",
      patho: "cbpc",
      tags: ["Stade I-III", "Consolidation"],
      line: "CBPC limité stades I à III : 4 cycles Platine-Étoposide + RT thoracique concomitante puis consolidation Durvalumab 1500 mg / 4 sem pendant 24 mois (début ≤ 42 j post-RT)",
      note: "Code LES actif I000723 (CBPC stade limité). Discuter ICP en cas de réponse complète/partielle (sans chimio concomitante).",
      mols: [
        A("Durvalumab (Imfinzi)", "DURVALUMAB", ["I000723"]),
        G("Cisplatine (ou Carboplatine) + Étoposide — 4 cycles (+ RT ≥ 60 Gy)")
      ]
    },
    {
      id: "cbpc-st4-l1",
      name: "Platine-Étoposide + Atézolizumab / Durvalumab / Serplulimab (L1 stade IV)",
      patho: "cbpc",
      tags: ["Stade IV", "L1"],
      line: "1re ligne CBPC stade étendu (IV ou III non irradiable) : 4 cycles Platine-Étoposide + anti-PD-(L)1 puis maintenance IO",
      note: "Trois options LES actives : Atézolizumab (I000590, IV ou SC), Durvalumab (I000637), Serplulimab (I000720). Ne pas dépasser 400 mg/m² de carboplatine.",
      mols: [
        A("Atézolizumab (Tecentriq IV/SC)", "ATEZOLIZUMAB", ["I000590"]),
        A("Durvalumab (Imfinzi)", "DURVALUMAB", ["I000637"]),
        A("Serplulimab (Hetronifly)", "SERPLULIMAB", ["I000720"]),
        G("Carboplatine (ou Cisplatine) + Étoposide — 4 cycles")
      ]
    },
    {
      id: "cbpc-imforte",
      name: "Maintenance Atézolizumab + Lurbinectédine (IMforte — AAC)",
      patho: "cbpc",
      tags: ["Stade IV", "Maintenance"],
      line: "Double maintenance CBPC étendu, PS 0-1, sans métastase cérébrale, stable/répondeur après 4 cycles Carboplatine-Étoposide-Atézolizumab",
      note: "Lurbinectédine 3,2 mg/m² IV / 3 sem en AAC (NLURB03) + Atézolizumab 1200 mg IV / 3 sem (I000590). Risque hématologique accru (prophylaxie G-CSF à évaluer).",
      mols: [
        A("Atézolizumab (Tecentriq)", "ATEZOLIZUMAB", ["I000590"]),
        A("Lurbinectédine (Zepzelca — AAC)", "LURBINECTEDIN-PM1183", ["NLURB03"])
      ]
    },
    {
      id: "cbpc-l2-tarla",
      name: "Tarlatamab (L2+ CBPC étendu — AAP DeLLphi-304)",
      patho: "cbpc",
      tags: ["Stade IV", "L2+"],
      line: "2e ligne et plus CBPC stade étendu (quel que soit le délai de rechute, y compris métastases cérébrales asymptomatiques) — AAP CTARL01",
      note: "Anticorps bispécifique DLL3×CD3 : C1J1 1 mg IV, C1J8 10 mg IV, C1J15 10 mg IV puis 10 mg / 2 sem. Surveillance CRS (56 %) et ICANS (6 %) — tocilizumab / dexaméthasone.",
      mols: [A("Tarlatamab (Imdelltra — AAP)", "TARLATAMAB", ["CTARL01"])]
    },
    {
      id: "cbpc-l2-ct",
      name: "Rechallenge Platine-Étoposide / Topotécan / CAV / Lurbinectédine (L2+)",
      patho: "cbpc",
      tags: ["Stade IV", "L2+"],
      line: "2e ligne CBPC : rechute sensible (> 3 mois) = reprise Platine-Étoposide ; rechute résistante (< 3 mois) = Topotécan (IV ou PO), CAV, Carbo-Paclitaxel ou Lurbinectédine (AAC)",
      note: "Risque de neutropénie fébrile > 20 % (Topotécan IV, Platine-Étoposide, CAV) : discuter prophylaxie primaire par G-CSF.",
      mols: [
        A("Lurbinectédine (option AAC)", "LURBINECTEDIN-PM1183", ["NLURB03"]),
        G("Carboplatine-Étoposide / Topotécan (IV ou PO) / CAV / Carboplatine-Paclitaxel")
      ]
    },

    // --- Mésothéliome pleural ---
    {
      id: "meso-l1-nivo-ipi",
      name: "Nivolumab + Ipilimumab (Mésothéliome L1, CheckMate 743)",
      patho: "meso",
      tags: ["L1", "Non-épithélioïde", "Épithélioïde"],
      line: "1re ligne Mésothéliome pleural non résécable (standard non-épithélioïde et option majeure épithélioïde) — Nivolumab 360 mg / 3 sem + Ipilimumab 1 mg/kg / 6 sem",
      note: "Présentation obligatoire en RCP NETMESO. Double code LES : Nivolumab (I000580) + Ipilimumab (I000582). Déclaration maladie professionnelle / FIVA.",
      mols: [
        A("Nivolumab (Opdivo)", "NIVOLUMAB", ["I000580"]),
        A("Ipilimumab (Yervoy)", "IPILIMUMAB", ["I000582"])
      ]
    },
    {
      id: "meso-l1-ct-beva",
      name: "Platine + Pémétrexed ± Bévacizumab (Mésothéliome L1, MAPS)",
      patho: "meso",
      tags: ["L1", "Épithélioïde"],
      line: "1re ligne Mésothéliome pleural épithélioïde (ou CI IO) — 6 cycles max sans maintenance pémétrexed (± bévacizumab 15 mg/kg si < 75 ans éligible)",
      note: "Pémétrexed LES (I000014) avec supplémentation B9/B12 ≥ 7 j avant C1. Bévacizumab hors AMM dans le mésothéliome (étude MAPS). RCP NETMESO.",
      mols: [
        A("Pémétrexed", "PEMETREXED", ["I000014"]),
        A("Bévacizumab (option MAPS, hors AMM)", "BEVACIZUMAB"),
        G("Cisplatine 75 mg/m² (ou Carboplatine AUC 5) — 6 cycles max")
      ]
    },
    {
      id: "meso-l2-io",
      name: "Nivolumab ± Ipilimumab (Mésothéliome L2 post-chimio — CPC MAPS2)",
      patho: "meso",
      tags: ["L2+"],
      line: "2e ligne Mésothéliome pleural en progression après chimiothérapie de 1re ligne — Nivolumab 3 mg/kg / 2 sem ± Ipilimumab 1 mg/kg / 6 sem",
      note: "CPC actifs : I001005 (nivolumab seul) ou I001003 + I001004 (nivolumab + ipilimumab). Validation en RCP NETMESO requise. Réévaluation précoce à 6 sem (risque d'hyperprogression).",
      mols: [
        A("Nivolumab (Opdivo — CPC)", "NIVOLUMAB", ["I001005", "I001003"]),
        A("Ipilimumab (Yervoy — CPC si bithérapie)", "IPILIMUMAB", ["I001004"])
      ]
    },

    // --- Néoplasies neuroendocrines pulmonaires (CNEGC & Carcinoïdes) ---
    {
      id: "cnegc-ct",
      name: "Platine + Étoposide (ou type CBNPC si RB1 sauvage) — CNEGC",
      patho: "nne-thorax",
      tags: ["CNEGC", "Stade I-III", "Stade IV"],
      line: "Carcinome neuroendocrine à grandes cellules : adjuvant (stades IB-IIIA, 4 cycles), RCT (stades III non résécables) ou L1 métastatique",
      note: "Ne pas utiliser de pémétrexed dans les CNEGC. Option platine + taxane ou gemcitabine si RB1 sauvage / KRAS-STK11-KEAP1 muté. En L2 : rechallenge ou essais (ex : TARLANEC).",
      mols: [G("Cisplatine ou Carboplatine + Étoposide (option Taxane / Gemcitabine si RB1 WT)")]
    },
    {
      id: "tne-ass-cible",
      name: "Analogues de la somatostatine / Évérolimus / Cabozantinib (Carcinoïdes)",
      patho: "nne-thorax",
      tags: ["TNE / Carcinoïde", "Stade IV"],
      line: "TNE pulmonaire (carcinoïde typique/atypique) métastatique — ASS (syndrome carcinoïde ou maladie lentement évolutive) ; Évérolimus ou Cabozantinib si maladie progressive (RADIANT-4 / CABINET)",
      note: "Validation en RCP RENATEN. ASS (Lanréotide LP 120 mg SC / Octréotide LP 30 mg IM) hors AMM à visée antitumorale. Évérolimus et cabozantinib disposent d'une AMM.",
      mols: [
        PO("Évérolimus (Afinitor) / Cabozantinib (Cabometyx)"),
        G("Lanréotide LP 120 mg SC ou Octréotide LP 30 mg IM (/ 28 j)")
      ]
    },
    {
      id: "tne-riv",
      name: "¹⁷⁷Lu-Oxodotréotide / Lutathera (RIV Carcinoïde bronchique — CPC)",
      patho: "nne-thorax",
      tags: ["TNE / Carcinoïde", "Stade IV", "L2+"],
      line: "Carcinoïde bronchique métastatique/inopérable progressif ou sécrétant non contrôlé, positif au TEP ⁶⁸Ga-DOTATOC, après échec/CI évérolimus — 4 cures / 8 sem",
      note: "CPC actif NLUTE02 sur proposition RCP nationale RENATEN. Néphroprotection par acides aminés ; arrêt des ASS retard 6 semaines avant la RIV.",
      mols: [A("Lutécium (¹⁷⁷Lu) oxodotréotide (Lutathera — CPC)", "LUTÉCIUM (¹⁷⁷LU) OXODOTRÉOTIDE", ["NLUTE02"])]
    },
    {
      id: "tne-ct",
      name: "GEMOX / FOLFOX / CAPTEM (Chimiothérapie TNE pulmonaire)",
      patho: "nne-thorax",
      tags: ["TNE / Carcinoïde", "Stade IV"],
      line: "TNE pulmonaire métastatique rapidement évolutive ou après échec ASS / thérapies ciblées (discussion RCP RENATEN)",
      note: "Statut MGMT : GEMOX ou FOLFOX si MGMT proficient (8 cycles max d'oxaliplatine) ; CAPTEM (capécitabine + témozolomide) ou dacarbazine-LV5FU2 si MGMT déficient. Ne pas utiliser cisplatine-étoposide.",
      mols: [
        G("GEMOX (Gemcitabine + Oxaliplatine) / FOLFOX / Dacarbazine-LV5FU2"),
        PO("CAPTEM (Capécitabine + Témozolomide)")
      ]
    }
  ];

  window.ONCORCP_MODULES = window.ONCORCP_MODULES || {};
  window.ONCORCP_MODULES.thorax = {
    id: "thorax",
    label: "Thoracique",
    shortLabel: "Thorax",
    rx: /BRONCH|POUMON|PULMON|CBNPC|CBPC|MESOTHELIOM|PLEUR|NEUROENDOCRIN|CARCINOID|THORAC|\bEGFR\b|\bALK\b|\bROS1\b|\bRET\b|\bKRAS\b|\bNRG1\b|\bMET\b/,
    quickFilters: [
      { label: "PD-L1 ≥ 50%", q: "PD-L1 ≥ 50%" },
      { label: "PD-L1 ≥ 1%", q: "PD-L1 ≥ 1%" },
      { label: "EGFR", q: "EGFR" },
      { label: "ALK", q: "ALK" },
      { label: "ROS1", q: "ROS1" },
      { label: "RET", q: "RET" },
      { label: "BRAF", q: "BRAF" },
      { label: "MET", q: "MET" },
      { label: "NRG1 / HER2", q: "NRG1" },
      { label: "Stade II-III", q: "Stade II-III" },
      { label: "Stade III", q: "Stade III" },
      { label: "Stade IV", q: "Stade IV" },
      { label: "L2+", q: "L2+" }
    ],
    pathos: PATHOS,
    protocols: PROTOCOLS
  };
})();
