"use strict";


function afficher_choix_parties()
{
	
	const parties_en_preparation = donnees_jeu["utilisateur"]["parties_en_preparation"];
	
	const conteneur = nouveau_contenu();
	
	
	const entete = document.createElement("div");
	entete["classList"].add("entete");
	conteneur.appendChild(entete);
		
		const titre_page = document.createElement("div");
		titre_page["classList"].add("titre_page");
		titre_page["textContent"] = `Nom joueur : `;
		entete.appendChild(titre_page);
		
		const nom_joueur = document.createElement("span");
		nom_joueur["classList"].add("nom_joueur");
		nom_joueur["textContent"] = donnees_jeu["utilisateur"]["nom_utilisateur"];
		titre_page.appendChild(nom_joueur);
		
		const bouton_nouvelle_partie = document.createElement("button");
		bouton_nouvelle_partie["classList"].add("nouvelle_partie");
		bouton_nouvelle_partie["textContent"] = `Créer une nouvelle partie`;
		entete.appendChild(bouton_nouvelle_partie);
		
			bouton_nouvelle_partie.addEventListener("click", e => {
				nouvelle_partie();
			});
	
	
	const liste_parties = document.createElement("div");
	liste_parties["classList"].add("liste_parties");
	conteneur.appendChild(liste_parties);
		
		Object.entries(parties_en_preparation).forEach(([id_partie, tab_partie]) => {
			
			const conteneur_partie = document.createElement("div");
			conteneur_partie["classList"].add("conteneur_partie");
			liste_parties.appendChild(conteneur_partie);
			
				const titre_partie = document.createElement("div");
				titre_partie["classList"].add("titre");
				titre_partie["textContent"] = tab_partie["titre"];
				conteneur_partie.appendChild(titre_partie);
				
				const joueurs_partie = document.createElement("div");
				joueurs_partie["classList"].add("joueurs");
					
					const nombre_presents = Object.keys(tab_partie["utilisateurs"])["length"];
					
					const liste_nom_joueurs = [];
					
					Object.entries(tab_partie["utilisateurs"])
					.forEach(([id_joueur, nom_joueur]) => {
						liste_nom_joueurs.push(nom_joueur);
					});
					
					joueurs_partie["textContent"] = 
						`Joueurs (${nombre_presents} / ${tab_partie["nombre_joueurs"]}) : `
						 + liste_nom_joueurs.join(", ");
				
				conteneur_partie.appendChild(joueurs_partie);
				
				
				// zone des messages d'erreur de connexion au serveur
				const conteneur_message_bouton = document.createElement("div");
				conteneur_message_bouton["classList"].add("conteneur_message_bouton");
				conteneur_partie.appendChild(conteneur_message_bouton);
				
				
				const bouton_choix = document.createElement("button");
				bouton_choix["textContent"] = `Jouer dans cette partie`;
				conteneur_partie.appendChild(bouton_choix);
				
					bouton_choix.addEventListener("click", e => {
						choix_partie(id_partie, conteneur_message_bouton);
					});
			
			
		}); // FIN Object.entries(parties_en_preparation).forEach(
	
	
} // FIN afficher_choix_parties()


function choix_partie(id_partie, conteneur_message_bouton)
{
	
	conteneur_message = conteneur_message_bouton;
	
	serveur({
		"type" : "rejoindre_partie",
		"arguments" : {
			"id_partie" : id_partie,
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
	
	
} // FIN function choix_partie(id_partie, conteneur_message_bouton)


