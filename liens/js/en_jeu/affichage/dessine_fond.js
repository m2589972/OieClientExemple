"use strict";


function dessine_fond(jeu)
{
	
	const fond = jeu["canevas"]["fond"];
	const ctx = fond.getContext("2d");
	
	
	// cases
	
	const largeur_cases = 0.48 * fond["clientWidth"];
	const largeur_case = largeur_cases / (jeu["xmax"] - jeu["xmin"] + 1);
	
	jeu["largeur_case"] = largeur_case;
	
	const x_origine = 0.3 * fond["clientWidth"];
	const y_origine = 0.5 * fond["clientHeight"];
	const decalage_numero = 5;
	const espace_cases = 3;
	
	
	
	Object.entries(jeu["cases"]).forEach(([index, icase]) => {
		
		let couleur = "#000";
		
		ctx["strokeStyle"] = couleur;
		ctx["fillStyle"] = couleur;
		
		icase["xp"] = x_origine + (icase["x"] - 2.5) * largeur_case;
		icase["yp"] = y_origine + icase["y"] * largeur_case;
		
		
		if ("fin" === icase["type"]) {
			
			ctx.strokeRect(
				  icase["xp"]
				, icase["yp"]
				, 3 * largeur_case - espace_cases
				, 2 * largeur_case - espace_cases
			);
			
			ctx["font"] = "20px serif";
			ctx.fillText(
				  `Arrivée`
				, icase["xp"] + 0.5 * largeur_case
				, icase["yp"] + 1.5 * largeur_case
			);
			
		} else {
			// autres cases
			
			
			if ("pont" === icase["type"]) {
				
				ctx["strokeStyle"] = "#DFD";
				ctx["fillStyle"] = "#DFD";
				
				ctx.fillRect(
					  icase["xp"]
					, icase["yp"]
					, largeur_case - espace_cases
					, largeur_case - espace_cases
				);
				
				ctx["strokeStyle"] = couleur;
				ctx["fillStyle"] = couleur;
				
			}
			
			
			ctx.strokeRect(
				  icase["xp"]
				, icase["yp"]
				, largeur_case - espace_cases
				, largeur_case - espace_cases
			);
			
			ctx["font"] = "15px serif";
			ctx.fillText(
				  index
				, icase["xp"] + decalage_numero
				, icase["yp"] + decalage_numero + 15
			);
			
			
			
		} // FIN autres cases
		
	}); // FIN Object.entries(jeu["cases"]).forEach(([index, icase]) => {
	
	
	// joueurs
	
	let x_joueurs = 0.6 * fond["clientWidth"];
	let y_joueurs = 0.1 * fond["clientHeight"];
	
	ctx["font"] = "bold 25px serif";
	ctx.fillText(
		  `Joueurs :`
		, x_joueurs
		, y_joueurs
	);

	ctx["font"] = "20px serif";
	const hauteur_nom = 30;
	const espace_cadre_y = 10;
	const espace_cadre_x = 2 * espace_cadre_y;
	
	const hauteur_ligne = hauteur_nom + 2 * espace_cadre_y;
	
	x_joueurs += hauteur_nom; // décalage au début de la liste
	
	Object.entries(jeu["joueurs"]).forEach(([id_joueur, tab_joueur]) => {
		
		y_joueurs += hauteur_ligne;
		tab_joueur["xp"] = x_joueurs - 2 * espace_cadre_x;
		tab_joueur["yp"] = y_joueurs - hauteur_nom;
		tab_joueur["largeur"] = ctx.measureText(tab_joueur["nom"])["width"] + 3 * espace_cadre_x;
		tab_joueur["hauteur"] = hauteur_nom + 2 * espace_cadre_y;
		
		
		ctx["strokeStyle"] = "#000";
		ctx["fillStyle"] = "#000";
		
		ctx.fillText(
			  tab_joueur["nom"]
			, x_joueurs
			, y_joueurs
		);
		
		
		dessine_pion(
			  fond
			, tab_joueur["couleur"]
			, x_joueurs - 0.6 * hauteur_nom
			, y_joueurs - 0.1 * hauteur_ligne
			, 4
		);
		
	});
	
	
	// bouton lancement dés
	
	const bouton_des = jeu["canevas"]["bouton_des"];
	const ctx_des = bouton_des.getContext("2d");
	
	let x_bouton = 0.65 * fond["clientWidth"];
	let y_bouton = 0.85 * fond["clientHeight"];
	
	const espace_bouton_x = 30;
	const espace_bouton_y = 10;
	
	const hauteur_texte_bouton = 40;
	
	const texte_bouton_des = `Lancer les dés`;
	
	
	ctx_des["font"] = "bold 25px serif";
	
	const largeur_bouton_des = ctx_des.measureText(texte_bouton_des)["width"];
	
	ctx_des["fillStyle"] = jeu["2e_couleur"];
	ctx_des.fillRect(
		  x_bouton - espace_bouton_x
		, y_bouton
		, largeur_bouton_des + 2 * espace_bouton_x
		, hauteur_texte_bouton + 2 * espace_bouton_y
	);
	
	ctx_des["fillStyle"] = "#FFF";
	ctx_des.fillText(
		  texte_bouton_des
		, x_bouton
		, y_bouton + hauteur_texte_bouton
	);
	
	
	
} // FIN function dessine_fond(jeu)


