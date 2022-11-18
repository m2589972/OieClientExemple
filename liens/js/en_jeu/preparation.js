"use strict";


function debut_partie()
{
	const partie_en_cours = donnees_jeu["utilisateur"]["partie_en_cours"];
	
	const conteneur = nouveau_contenu();
	
	const zone_jeu = document.createElement("div");
	zone_jeu["classList"].add("zone_jeu");
	conteneur.appendChild(zone_jeu);
		
		const titre_page = document.createElement("div");
		titre_page["classList"].add("titre_page");
		titre_page["textContent"] = partie_en_cours["titre"];
		zone_jeu.appendChild(titre_page);
	
	
	if ("preparation" === partie_en_cours["etat"]) {
		
		const nombre_presents = Object.keys(partie_en_cours["utilisateurs"])["length"];
		
		const message_attente = document.createElement("div");
		titre_page["classList"].add("message_attente");
			
			const liste_nom_joueurs = [];
			
			Object.entries(partie_en_cours["utilisateurs"]).forEach(([id_joueur, nom_joueur]) => {
				liste_nom_joueurs.push(nom_joueur);
			});
			
			
			let ligne_message;
			
			ligne_message = document.createElement("div");
			ligne_message["textContent"] = `Attente des joueurs…`;
			message_attente.appendChild(ligne_message);
			
			ligne_message = document.createElement("div");
			ligne_message["textContent"] = 
				`Joueurs présents (${nombre_presents} / ${partie_en_cours["nombre_joueurs"]}) : `
				+ liste_nom_joueurs.join(", ")
			;
			message_attente.appendChild(ligne_message);
		
		zone_jeu.appendChild(message_attente);
		
		
		attente_debut_partie();
		
		
	} else if ("en_cours" === partie_en_cours["etat"]) {
		
		dessine_zone_jeu(zone_jeu, partie_en_cours);
		
	}
	
	
	// zone des messages
	conteneur_message = document.createElement("div");
	zone_jeu.appendChild(conteneur_message);
	
	
} // FIN function debut_partie()


function attente_debut_partie()
{
	
	setTimeout(e => {
		
		serveur({
			"type" : "informations_partie",
			"arguments" : {},
			"succes" : reponse => {
				
				affichage_erreur(``);
				
				if ("partie_en_cours" in reponse) {
					
					donnees_jeu["utilisateur"]["partie_en_cours"] = reponse["partie_en_cours"];
					
					debut_partie();
					
				}
				
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
		
		
	}, 3000);
	
	
} // FIN function attente_debut_partie()


