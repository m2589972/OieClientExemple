"use strict";


function dessine_joueur_en_cours(jeu)
{
	const canevas = jeu["canevas"]["joueur_en_cours"];
	const ctx = canevas.getContext("2d");
	
	ctx.strokeStyle = jeu["2e_couleur"];
	
	
	const id_joueur_en_cours = donnees_jeu["utilisateur"]["partie_en_cours"]["id_joueur"];
	
	const tab_joueur = jeu["joueurs"][id_joueur_en_cours];
	
	
	efface_canevas(canevas);
	
	if (id_joueur_en_cours in jeu["joueurs"]) {
		
		// rectangle autour du joueur en cours
		
		ctx.strokeRect(
			  tab_joueur["xp"]
			, tab_joueur["yp"]
			, tab_joueur["largeur"]
			, tab_joueur["hauteur"]
		);
		
	}
	
	
	// affichage du bouton "Lancer les dés"
	
	const bouton_des = jeu["canevas"]["bouton_des"];
	
	if (id_joueur_en_cours === donnees_jeu["utilisateur"]["id_utilisateur"]) {
		bouton_des["classList"].add("affiche");
	}
	
	
} // FIN function joueur_en_cours(jeu)


