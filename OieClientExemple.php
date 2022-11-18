<?php
/*
Plugin Name: OieClientExemple
Version: 1
*/

if (!function_exists("add_action")) {
	echo "extension";
	exit();
}


add_action("wp_loaded", function () {
	
	require "donnees/crochets/shortcode.php";
	
	
}, 2);


add_filter("OieClientExemple/base_extension", function ($_) {
	return __DIR__;
});
add_filter("OieClientExemple/url_extension", function ($_) {
	return plugins_url("", __FILE__);
});


add_filter("OieClientExemple/version_extension", function ($_) {
	
	if (!isset($GLOBALS["OieClientExemple"]["version_extension"])) {
		
		$data = get_file_data(__FILE__, ["version" => "Version"]);
		$GLOBALS["OieClientExemple"]["version_extension"] = $data["version"];
		
	}
	
	
	return $GLOBALS["OieClientExemple"]["version_extension"];
	
});


