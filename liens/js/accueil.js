"use strict";


document.addEventListener("DOMContentLoaded", e => {
	
	charger_accueil();
	
});


function charger_accueil()
{
	
	const conteneur = nouveau_contenu();
	
	const informations_jeu = document.createElement("div");
	informations_jeu["classList"].add("informations_jeu");
	conteneur.appendChild(informations_jeu);
		
		const nom_utilisateur_label = document.createElement("label");
		informations_jeu.appendChild(nom_utilisateur_label);
			
			nom_utilisateur_label["innerHTML"] = `Nom joueur&nbsp;: ` +
				`<input type="text" name="nom_utilisateur"
					value="${donnees["nom_utilisateur"]}"/>`;
		
		const url_serveur_label = document.createElement("label");
		informations_jeu.appendChild(url_serveur_label);
			
			url_serveur_label["innerHTML"] = `URL serveur du jeu&nbsp;: ` +
				`<input type="text" name="url_serveur" value="${donnees["url_base"]}"/>`;
		
		
		const bouton_jouer = document.createElement("button");
		informations_jeu.appendChild(bouton_jouer);
		bouton_jouer["textContent"] = `Jouer`;
			
			bouton_jouer.addEventListener("click", e => {
				
				affichage_erreur(``);
				
				[...informations_jeu.getElementsByTagName("input")].forEach(champ => {
					donnees_jeu[champ["name"]] = champ["value"];
				});
				
				recherche_informations();
				
			}); // FIN bouton_jouer.addEventListener("click", e => {
		
		
		conteneur_message = document.createElement("div");
		informations_jeu.appendChild(conteneur_message);
	
	
} // FIN function charger_accueil()


function recherche_informations()
{
	
	serveur({
		"type" : "informations",
		"succes" : reponse => {
			
			if ("undefined" === typeof reponse) {
				return;
			}
			
			affichage_erreur(``);
			
			donnees_jeu["serveur"] = reponse;
			
			envoi_connexion_utilisateur();
			
		},
		"erreur_1er_essai" : e => {
			affichage_erreur(`Erreur de connexion au serveur.<br/>` +
				` Un 2<sup>e</sup> essai va être fait dans quelques instants...`);
		},
		"erreur_2e_essai" : e => {
			affichage_erreur(`Erreur de connexion au serveur.<br/>` +
				` Vérifiez l'URL saisi et recliquez sur "Jouer".`);
		},
	});
	
	
} // FIN function recherche_informations()


function envoi_connexion_utilisateur()
{
	
	serveur({
		"type" : "connexion_utilisateur",
		"arguments" : {
			"nom_utilisateur" : donnees_jeu["nom_utilisateur"],
		},
		"succes" : reponse => {
			
			affichage_erreur(``);
			
			donnees_jeu["utilisateur"] = reponse;
			
			document.getElementsByTagName("title")[0]["textContent"] = 
				donnees_jeu["nom_utilisateur"];
			
			if ("partie_en_cours" in reponse) {
				
				debut_partie();
				
			} else {
				
				afficher_choix_parties();
				
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
	
	
} // FIN function envoi_connexion_utilisateur()



