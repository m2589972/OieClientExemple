"use strict";


function nouvelle_partie()
{
	
	const conteneur = nouveau_contenu();
	
	const nouvelle_partie = document.createElement("div");
	nouvelle_partie["classList"].add("nouvelle_partie");
	conteneur.appendChild(nouvelle_partie);
		
		const titre_page = document.createElement("div");
		titre_page["classList"].add("titre_page");
		titre_page["textContent"] = `Nouvelle partie`;
		nouvelle_partie.appendChild(titre_page);
		
		const titre_label = document.createElement("label");
		nouvelle_partie.appendChild(titre_label);
			
			titre_label["innerHTML"] = `Titre de la partie&nbsp;: ` +
				`<input type="text" name="titre" value=""/>`;
		
		const nombre_joueurs_label = document.createElement("label");
		nouvelle_partie.appendChild(nombre_joueurs_label);
			
			nombre_joueurs_label["textContent"] = `Nombre de joueurs : `;
			
			const nombre_joueurs_select = document.createElement("select");
			nombre_joueurs_label.appendChild(nombre_joueurs_select);
			
			Object.entries(donnees_jeu["serveur"]["nombre_joueurs"]).forEach(([i, nombre]) => {
				
				const choix_nombre = document.createElement("option");
				choix_nombre["textContent"] = nombre;
				choix_nombre.setAttribute("value", nombre);
				nombre_joueurs_select.appendChild(choix_nombre);
				
			});
		
		
		const ligne_bouton = document.createElement("div");
		ligne_bouton["classList"].add("ligne_bouton");
		nouvelle_partie.appendChild(ligne_bouton);
			
			const bouton_creer_nouvelle_partie = document.createElement("button");
			bouton_creer_nouvelle_partie["textContent"] = `Créer la partie`;
			ligne_bouton.appendChild(bouton_creer_nouvelle_partie);
				
				bouton_creer_nouvelle_partie.addEventListener("click", e => {
					
					affichage_erreur(``);
					
					const valeur_titre = titre_label.getElementsByTagName("input")[0]["value"];
					const valeur_nombre = nombre_joueurs_label
						.getElementsByTagName("select")[0]["value"];
					
					
					creer_nouvelle_partie(valeur_titre, valeur_nombre);
					
					
				}); // FIN bouton_creer_nouvelle_partie.addEventListener("click", e => {
		
		
		// zone des messages d'erreur de connexion au serveur
		conteneur_message = document.createElement("div");
		nouvelle_partie.appendChild(conteneur_message);
	
	
} // FIN function nouvelle_partie()


function creer_nouvelle_partie(titre, nombre_joueurs)
{
	
	serveur({
		"type" : "nouvelle_partie",
		"arguments" : {
			"titre" : titre,
			"nombre_joueurs" : nombre_joueurs,
		},
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
	
	
} // FIN function creer_nouvelle_partie(titre, nombre_joueurs)


