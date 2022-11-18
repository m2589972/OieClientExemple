"use strict";


function dessine_pions_plateau(jeu)
{
	
	Object.entries(jeu["joueurs"]).forEach(([id_utilisateur, tab_joueur]) => {
		
		if (!(tab_joueur["position"] in jeu["cases"])) {
			return;
		}
		
		
		const tab_case = jeu["cases"][tab_joueur["position"]];
		
		
		efface_canevas(tab_joueur["canevas_pion"]);
		
		dessine_pion(
			  tab_joueur["canevas_pion"]
			, tab_joueur["couleur"]
			, tab_case["xp"] + 0.5 * jeu["largeur_case"]
			, tab_case["yp"] + 0.5 * jeu["largeur_case"]
			, 3
		);
		
	});
	
	
} // FIN function dessine_pions_plateau(jeu)


function dessine_pion(canevas, couleur, x, y, taille)
{
	
	const ctx = canevas.getContext("2d");
	
	ctx["fillStyle"] = couleur;
	ctx["strokeStyle"] = couleur;
	
	
	const hauteur_rond = 1.5 * taille;
	const hauteur_base = 3.5 * taille;
	const demie_base_haut = 0.7 * taille;
	const demie_base_bas = 2 * taille;
	
	const rayon = Math.sqrt(hauteur_rond ** 2 + demie_base_haut ** 2);
	const milieu = (hauteur_base + hauteur_rond + rayon) / 2;
	
	const dy2 = milieu;
	const dy1 = dy2 - hauteur_base;
	
	ctx.beginPath();
	ctx.moveTo(x - demie_base_haut, y + dy1)
	ctx.lineTo(x - demie_base_bas,  y + dy2);
	ctx.lineTo(x + demie_base_bas,  y + dy2);
	ctx.lineTo(x + demie_base_haut, y + dy1);
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(x, y + dy1 - hauteur_rond, rayon, 0, 2 * Math["PI"]);
	ctx.fill();
	
	
} // FIN function dessine_pion(canevas, couleur, x, y, taille)


function test_pions(couleurs2, jeu)
{
	
	const canevas = jeu["canevas"]["fond"];
	const ctx = canevas.getContext("2d");
	
	const x = 600;
	const y = 250;
	
	
	dessine_pion(
		  canevas
		, couleurs2[3]
		, x
		, y
		, 40
	);
	
	dessine_pion(
		  canevas
		, couleurs2[3]
		, jeu["cases"][4]["xp"] + 0.5 * jeu["largeur_case"]
		, jeu["cases"][4]["yp"] + 0.5 * jeu["largeur_case"]
		, 4
	);
	
	
	ctx["fillStyle"] = "#000";
	ctx["strokeStyle"] = "#000";
	
	ctx.beginPath();
	ctx.moveTo(x - 4, y - 4);
	ctx.lineTo(x + 4, y + 4);
	ctx.moveTo(x + 4, y - 4);
	ctx.lineTo(x - 4, y + 4);
	ctx.stroke();
	
	
} // FIN test_pions(couleurs2, jeu)


function test_couleurs(couleurs2, jeu)
{
	const x = 200;
	const y = -40;
	const espace = 80;
	
	const canevas = jeu["canevas"]["fond"];
	
	
	couleurs2.forEach((c1, i1) => {
		
		couleurs2.forEach((c2, i2) => {
			
			if (i1 <= i2) {
				return;
			}
			
			dessine_pion(
				  canevas
				, c1
				, x + i2 * espace
				, y + i1 * espace
				, 5
			);
			
			dessine_pion(
				  canevas
				, c2
				, x + i2 * espace + 30
				, y + i1 * espace
				, 5
			);
			
			
		});
		
	});
	
	
} // FIN test_couleurs(couleurs, jeu)



