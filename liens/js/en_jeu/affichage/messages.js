"use strict";


function ajout_message(texte)
{

	if (conteneur_message["classList"].contains("erreur")) {
		
		conteneur_message["classList"].remove("erreur");
		conteneur_message["innerHTML"] = ``;
		
	}
	
	
	const ligne_message = document.createElement("div");
	ligne_message["classList"].add("ligne_message");
	ligne_message["textContent"] = texte;
	
	conteneur_message.appendChild(ligne_message);
	
	
	// retrait des anciens messages
	
	const limite = 4;
	
	const lignes = [...conteneur_message.getElementsByClassName("ligne_message")];
	
	if (lignes["length"] > limite) {
		lignes[0].remove();
	}
	
	
} // FIN function ajout_message(texte)


