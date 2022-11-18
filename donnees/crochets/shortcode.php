<?php


add_shortcode("OieClientExemple", function ($attr, $content, $tag) {
	
	$url_extension = apply_filters("OieClientExemple/url_extension", NULL);
	$version_extension = apply_filters("OieClientExemple/version_extension", NULL);
	
	
	wp_enqueue_style(
		  "OieClientExemple__affichage"
		, "$url_extension/liens/css/affichage.css"
		, []
		, $version_extension
	);
	
	
	$scripts = [
		"commun.js",
		"choix_partie.js",
		"nouvelle_partie.js",
		"en_jeu/preparation.js",
		"en_jeu/en_cours.js",
		"en_jeu/affichage/cases.js",
		"en_jeu/affichage/dessine_fond.js",
		"en_jeu/affichage/pions.js",
		"en_jeu/affichage/joueur_en_cours.js",
		"en_jeu/affichage/messages.js",
		"en_jeu/affichage/etapes.js",
	];
	
	// fichier à charger en dernier
	$scripts[] = "accueil.js";
	
	
	foreach ($scripts as $fichier) {
		
		$code = str_replace(
			  [".js", "/"]
			, ["", "__"]
			, $fichier
		);
		
		wp_enqueue_script(
			  "OieClientExemple__$code"
			, "$url_extension/liens/js/$fichier"
			, []
			, $version_extension
		);
		
	}
	
	
	$utilisateur = wp_get_current_user();
	$nom_utilisateur = $utilisateur->display_name;
	
	if (FALSE === $nom_utilisateur) {
		$nom_utilisateur = "";
	}
	
	
	wp_localize_script(
		  "OieClientExemple__accueil"
		, "donnees"
		,
		[
			"url_base" => home_url(""),
			"nom_utilisateur" => $nom_utilisateur,
		]
	);
	
	
	ob_start();
	?>
		<div class="OieClientExemple"></div>
	<?php
	return ob_get_clean();
	
});


