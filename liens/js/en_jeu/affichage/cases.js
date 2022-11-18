"use strict";


function placement_cases(cases)
{
	
	const jeu = {
		"xmin" : 1,
		"xmax" : 3,
		"cases" : {},
	};
	
	const pivot = cases["length"] - 1;
	let x = 1, y = 0;
	let dx = -1, dy = 0;
	
	
	cases.reverse().forEach((type_case, index) => {
		
		const icase = {
			"type" : type_case,
		};
		
		if ("debut" === type_case) {
			return;
		} else if ("fin" === type_case) {
			
			icase["x"] = 1;
			icase["y"] = -1;
			
		} else {
			// autres cases
			
			x += dx;
			y += dy;
			
			icase["x"] = x;
			icase["y"] = y;
			
			jeu["xmin"] = Math.min(x, jeu["xmin"]);
			jeu["xmax"] = Math.max(x, jeu["xmax"]);
			
			
			if (y < 0) {
				
				if (x - y === 2) {
					dx = 1;
					dy = 0;
				} else if (x + y === 2) {
					dx = 0;
					dy = 1;
				}
				
			} else { // si y >= 0
				
				if (x - y === 3) {
					dx = -1;
					dy = 0;
				} else if (x + y === 0) {
					dx = 0;
					dy = -1;
				}
				
			} // FIN si y >= 0
			
			
		} // FIN autres cases
		
		jeu["cases"][pivot - index] = icase;
		
	}); // FIN cases.reverse().forEach((type_case, index) => {
	
	
	return jeu;
	
} // FIN function placement_cases(cases)


