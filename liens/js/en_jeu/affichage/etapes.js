"use strict";


let pile_etapes = [];


function traitement_etapes(jeu)
{
	
	if (0 === pile_etapes["length"]) {
		return ;
	}
	
	
	const etape = pile_etapes.shift();
	
	const partie_en_cours = donnees_jeu["utilisateur"]["partie_en_cours"];
	
	
	partie_en_cours["id_joueur"] = etape["id_joueur_suivant"];
	
	Object.entries(etape["positions"]).forEach(([id_utilisateur, position]) => {
		
		jeu["joueurs"][Math.floor(id_utilisateur)]["position"] = position;
		
	});
	
	
	const tab_joueur = jeu["joueurs"][etape["id_joueur"]];
	
	
	if (etape["id_joueur"] === donnees_jeu["utilisateur"]["id_utilisateur"]) {
		// joueur connecté
		
		ajout_message(`Vous lancez les dés et obtenez ${etape["des"].join(", ")}.`);
		
		
		if ("messages" in etape) {
			
			etape["messages"].forEach(message => {
				
				if ("trop_loin" === message) {
					
					ajout_message(`Vous êtes allé trop loin et revenez en arrière.`);
					
				} else if ("case_occupee" === message) {
					
					ajout_message(`Vous êtes arrivé sur une case occupée.`
						+ ` Vous renvoyez l'autre joueur à votre case d'origine.`);
					
				} else if ("pont" === message) {
					
					ajout_message(`Vous êtes arrivé sur un pont et`
						+ ` avez avancé de 6 cases supplémentaires.`);
					
				} else if ("fin" === message) {
					
					ajout_message(`Vous avez gagné.`);
					
				}
				
			});
			
		}
		
		
	} else {
		// autre joueur
		
		ajout_message(`${tab_joueur["nom"]} lance les dés`
			+ ` et obtient ${etape["des"].join(", ")}.`);
		
		
		if ("messages" in etape) {
			
			etape["messages"].forEach(message => {
				
				if ("trop_loin" === message) {
					
					ajout_message(`${tab_joueur["nom"]} est allé trop loin`
						+ ` et revient en arrière.`);
					
				} else if ("case_occupee" === message) {
					
					ajout_message(`${tab_joueur["nom"]} est arrivé sur une case occupée.`
						+ ` Il renvoie l'autre joueur à sa case d'origine.`);
					
				} else if ("pont" === message) {
					
					ajout_message(`${tab_joueur["nom"]} est arrivé sur un pont et`
						+ ` a avancé de 6 cases supplémentaires.`);
					
				} else if ("fin" === message) {
					
					ajout_message(`${tab_joueur["nom"]} a gagné.`);
					
				}
				
			});
			
		}
		
		
	} // FIN autre joueur
	
	
	dessine_pions_plateau(jeu);
	
	dessine_joueur_en_cours(jeu);
	
	
} // FIN function traitement_etapes(jeu)


