<?php

	/*
	Plugin Name: Chameleon Video Player
	Plugin URI: http://www.codingjack.com/chameleon_wp/preview.html
	Description: HTML5 Video Player with Flash Backup
	Version: 1.0
	Author: CodingJack
	Author URI: http://www.codingjack.com/
	*/
	
	$chameleon_options = get_option("chameleon_settings");

	if(!$chameleon_options) {
		
		$chameleon_options["social-buttons"] = "yes";
		$chameleon_options["twitter-text"] = "Check out this video";
		$chameleon_options["firefox-flash"] = "no";
		$chameleon_options["copyright-text"] = "&copy; " .  get_bloginfo("name");
		$chameleon_options["copyright-link"] = home_url();
		$chameleon_options["copyright-target"] = "_blank";
		$chameleon_options["domain"] = plugins_url("wp-chameleon/");

		add_option("chameleon_settings", $chameleon_options);

	}
	
	function chameleon_admin_link($links) {
		
		array_unshift($links, '<a href="' . get_admin_url() . 'options-general.php?page=chameleon_admin">Admin</a>');
		
		return $links;
		
	}

	function deactivate_chameleon() {

		delete_option("chameleon_settings");

	}

	if(!is_admin()) {
		
		include("includes/chameleon_scripts.php");

	}

	else {
		
		include("includes/chameleon_admin.php");
		
		register_deactivation_hook( __FILE__, "deactivate_chameleon");
		add_filter("plugin_action_links_" . plugin_basename(__FILE__), "chameleon_admin_link");
		
	}

?>