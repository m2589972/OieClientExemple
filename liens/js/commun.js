"use strict";


const donnees_jeu = {
	"couleurs" : [
		"#3CE",
		"#666",
		"#3EC",
		"#E99",
		"#ED0",
		"#C3E",
		"#D62",
	],
};

let conteneur_message;


function affichage_erreur(message_html)
{
	
	if (`` === message_html) {
		conteneur_message["classList"].remove("message", "erreur");
	} else {
		conteneur_message["classList"].add("message", "erreur");
	}
	
	conteneur_message["innerHTML"] = message_html;
	
}

function affichage_message_jeu(message_html)
{
	
	if (`` === message_html) {
		conteneur_message["classList"].remove("message", "jeu");
	} else {
		conteneur_message["classList"].add("message", "jeu");
	}
	
	conteneur_message["innerHTML"] = message_html;
	
}


function serveur(args)
{
	let url = `${donnees_jeu["url_serveur"]}/wp-json/OieServeur/${args["type"]}`;
	
	
	const parametres_fetch = {};
	
	parametres_fetch["method"] = "POST";
	
	if ("informations" === args["type"]) {
		parametres_fetch["method"] = "GET";
	}
	
	if ("arguments" in args) {
		
		parametres_fetch["body"] = new FormData();
		
		Object.entries(args["arguments"]).forEach(([cle, valeur]) => {
			parametres_fetch["body"].append(cle, valeur);
		});
		
		if (	("utilisateur" in donnees_jeu)
			&&	("jeton_utilisateur" in donnees_jeu["utilisateur"])
		) {
			
			parametres_fetch["body"].append(
				  "jeton_utilisateur"
				, donnees_jeu["utilisateur"]["jeton_utilisateur"]
			);
			
		}
		
	}
	
	
	return fetch(url, parametres_fetch)
		.then(reponse => {
			
			if (!reponse["ok"]) {
				throw reponse;
			} else {
				return reponse.json().then(args["succes"]);
			}
			
		})
		.catch(rejet => {
			
			console.error(rejet);
			
			
			if (	("boolean" === typeof args["2e_essai"])
				&&	args["2e_essai"]
			) {
				
				args["erreur_2e_essai"]();
				
			} else {
				
				args["erreur_1er_essai"]();
				
				setTimeout(e => {
					args["2e_essai"] = true;
					serveur(args);
				}, 3000);
				
			}
			
		}
	); // FIN return fetch(url, parametres_fetch)
	
	
} // FIN function serveur(args)


function nouveau_contenu()
{
	
	const conteneur = document.getElementsByClassName("OieClientExemple")[0];
	conteneur["innerHTML"] = ``;
	
	
	return conteneur;
	
}


function aff(v)
{
	console.log(v);
}


