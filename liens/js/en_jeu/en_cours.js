"use strict";


function dessine_zone_jeu(zone_jeu, partie_en_cours)
{
	
	const largeur_dessin = zone_jeu["clientWidth"];
	const hauteur_dessin = 500;
	
	const dessin_jeu = document.createElement("div");
	dessin_jeu["classList"].add("dessin_jeu");
	dessin_jeu.setAttribute("style", `height : ${hauteur_dessin}px`);
	
	zone_jeu.appendChild(dessin_jeu);
	
	zone_jeu.addEventListener("click", e => {
		
		const id_joueur_en_cours = donnees_jeu["utilisateur"]["partie_en_cours"]["id_joueur"];
		
		if (id_joueur_en_cours === donnees_jeu["utilisateur"]["id_utilisateur"]) {
			
			const bouton_des = jeu["canevas"]["bouton_des"];
			bouton_des["classList"].remove("affiche");
			
			lancer_des(jeu);
			
		}
		
		
	});
	
	
	const fond = document.createElement("canvas");
	const joueur_en_cours = document.createElement("canvas");
	
	const bouton_des = document.createElement("canvas");
	bouton_des["classList"].add("bouton_des");
	
	
	const jeu = placement_cases(partie_en_cours["cases"]);
	jeu["2e_couleur"] = "#369";
	
	jeu["canevas"] = {
		"fond" : fond,
		"joueur_en_cours" : joueur_en_cours,
		"bouton_des" : bouton_des,
	};
	
	
	// préparer liste des joueurs
	
	const couleurs2 = [...donnees_jeu["couleurs"]]; // copie de la liste pour les tests
	const positions = donnees_jeu["utilisateur"]["partie_en_cours"]["positions"];
	
	jeu["joueurs"] = {};
	
	Object.entries(partie_en_cours["utilisateurs"]).forEach(([id_utilisateur, nom_joueur]) => {
		
		const canevas_pion = document.createElement("canvas");
		
		jeu["joueurs"][id_utilisateur] = {
			"nom" : nom_joueur,
			"canevas_pion" : canevas_pion,
			"couleur" : donnees_jeu["couleurs"].pop(),
			"position" : positions[id_utilisateur],
		};
		
		jeu["canevas"][`pion_${id_utilisateur}`] = canevas_pion;
		
	});
	
	
	// dessin
	
	Object.entries(jeu["canevas"]).forEach(([i, c]) => {
		
		c.setAttribute("width", largeur_dessin);
		c.setAttribute("height", hauteur_dessin);
		
		dessin_jeu.appendChild(c);
		
	});
	
	
	dessine_fond(jeu);
	//test_couleurs(couleurs2, jeu);
	//test_pions(couleurs2, jeu);
	
	dessine_etat_initial(jeu);
	
	nouvelles_etapes(jeu);
	
	
} // FIN function dessine_zone_jeu(zone_jeu)


function dessine_etat_initial(jeu)
{
	
	dessine_pions_plateau(jeu);
	dessine_joueur_en_cours(jeu);
	
}


function lancer_des(jeu)
{
	
	const partie_en_cours = donnees_jeu["utilisateur"]["partie_en_cours"];
	
	serveur({
		"type" : "lancer_des",
		"arguments" : {},
		"succes" : reponse => {
			
			pile_etapes.push(...reponse["etapes"]);
			partie_en_cours["timestamp"] = reponse["timestamp"];
			
			traitement_etapes(jeu);
			
		},
		"erreur_1er_essai" : e => {
			affichage_erreur(`Erreur de connexion au serveur.<br/>` +
				` Un 2<sup>e</sup> essai va être fait dans quelques instants...`);
		},
		"erreur_2e_essai" : e => {
			affichage_erreur(`Erreur de connexion au serveur.<br/>` +
				` Le serveur n'est pas joignable actuellement.`);
		},
	});
	
	
} // FIN function lancer_des(jeu)


function nouvelles_etapes(jeu)
{
	
	const partie_en_cours = donnees_jeu["utilisateur"]["partie_en_cours"];
	
	
	if (0 === partie_en_cours["id_joueur"]) {
		// la partie est finie
		return;
	}
	
	setTimeout(e => {
		
		serveur({
			"type" : "nouvelles_etapes",
			"arguments" : {
				"date_etape_precedente" : partie_en_cours["timestamp"],
			},
			"succes" : reponse => {
				
				if (0 === partie_en_cours["id_joueur"]) {
					// la partie est finie
					return;
				}
				
				
				pile_etapes.push(...Object.values(reponse["etapes"]));
				partie_en_cours["timestamp"] = reponse["timestamp"];
				
				traitement_etapes(jeu);
				
				nouvelles_etapes(jeu);
				
			},
			"erreur_1er_essai" : e => {
				affichage_erreur(`Erreur de connexion au serveur.<br/>` +
					` Un 2<sup>e</sup> essai va être fait dans quelques instants...`);
			},
			"erreur_2e_essai" : e => {
				affichage_erreur(`Erreur de connexion au serveur.<br/>` +
					` Le serveur n'est pas joignable actuellement.`);
			},
		});
		
		
	}, 2000);
	
	
} // FIN function nouvelles_etapes()


function efface_canevas(canevas)
{
	
	const ctx = canevas.getContext("2d");
	
	ctx.clearRect(0, 0, canevas["width"], canevas["height"]);
	
}


