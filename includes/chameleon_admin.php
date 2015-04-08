<?php

	function chameleon_admin() {
		
		global $chameleon_options;
		
		$twitter = $chameleon_options["twitter-text"];
		$social = $chameleon_options["social-buttons"];
		$firefox = $chameleon_options["firefox-flash"];
		$copyText = $chameleon_options["copyright-text"];
		$copyLink = $chameleon_options["copyright-link"];
		$copyTarget = $chameleon_options["copyright-target"];
		
		ob_start(); ?>

		<div class="wrap">
			
            <h1 class="chameleon-header"><?php _e("Chameleon Video Player", "chameleon_domain"); ?></h1>
            
            <div class="chameleon-content">
            
                <h2><?php _e("Global Settings", "chameleon_domain"); ?></h2><hr />
    
                <form class="chameleon-form" method="post" action="options.php">
    
                    <?php settings_fields("chameleon_settings_group"); ?>
    
                    <p>
                        <?php _e("Firefox Uses Flash", "chameleon_domain"); ?> <span data-title="<?php _e("Select 'yes' if you want to use a single .mp4 video", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <span class="chameleon-box">
                            <input name="chameleon_settings[firefox-flash]" type="radio" value="yes" <?php if($firefox === "yes") echo "checked"; ?> /> <?php _e("yes", "chameleon_domain"); ?>
                            <input name="chameleon_settings[firefox-flash]" type="radio" value="no" <?php if($firefox === "no") echo "checked"; ?> /> <?php _e("no", "chameleon_domain"); ?>
                        </span>
                    </p>
    
                    <hr />
    
                    <p>
                        <?php _e("Use Social Buttons", "chameleon_domain"); ?> <span data-title="<?php _e("Choose to use the video player's social buttons", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <span class="chameleon-box">
                            <input name="chameleon_settings[social-buttons]" type="radio" value="yes" <?php if($social === "yes") echo "checked"; ?> /> <?php _e("yes", "chameleon_domain"); ?>
                            <input name="chameleon_settings[social-buttons]" type="radio" value="no" <?php if($social === "no") echo "checked"; ?> /> <?php _e("no", "chameleon_domain"); ?>
                        </span>
                    </p>
    
                    <hr />
    
                    <p>
                        <?php _e("Twitter Text", "chameleon_domain"); ?> <span data-title="<?php _e("Additional text for Twitter when the video is shared", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <textarea name="chameleon_settings[twitter-text]"><?php if($twitter !== "") echo $twitter; ?></textarea>
                    </p>
                    
                    <hr />
    
                    <p>
                        <?php _e("Copyright Text", "chameleon_domain"); ?> <span data-title="<?php _e("Copyright text, leave blank for no copyright", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <input class="chameleon-medium" name="chameleon_settings[copyright-text]" value="<?php if($copyText !== "") echo $copyText; ?>" type="text" />
                    </p>
    
                    <hr />
                    
                    <p>
                        <?php _e("Copyright Link", "chameleon_domain"); ?> <span data-title="<?php _e("Right-click menu copyright hyperlink", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <input class="chameleon-medium" name="chameleon_settings[copyright-link]" value="<?php if($copyLink !== "") echo $copyLink; ?>" type="text" />
                    </p>
                    
                    <hr />
                    
                    <p>
                        <?php _e("Copyright Link Target", "chameleon_domain"); ?> <span data-title="<?php _e("The copyright link's window target", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <input class="chameleon-small" name="chameleon_settings[copyright-target]" value="<?php if($copyTarget !== "") echo $copyTarget; ?>" type="text" />
                    </p>
    
                    <hr />
                    
                    <p class="submit-chameleon">
                        <input type="hidden" name="chameleon_settings[domain]" value="<?php echo plugins_url("wp-chameleon/"); ?>" />
                        <input type="submit" class="button-primary" value="<?php _e("Submit Settings", "chameleon_domain"); ?>" />
                    </p>
    
                </form>
    
            </div>
            
            <div class="chameleon-content chameleon-second">
            
                <h2><?php _e("Shortcode Generator", "chameleon_domain"); ?></h2><hr />
    
                <form class="chameleon-form" id="chameleon-shortcode" action="#">
    
                    <?php settings_fields("chameleon_settings_group"); ?>
                    
                    <p>
                        <?php _e("Autoplay Video", "chameleon_domain"); ?> <span data-title="<?php _e("Choose if you want the video to autoplay", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <span class="chameleon-box">
                            <input name="chameleon_autoplay" type="radio" value="yes" /> <?php _e("yes", "chameleon_domain"); ?>
                            <input name="chameleon_autoplay" type="radio" value="no" checked /> <?php _e("no", "chameleon_domain"); ?>
                        </span>
                    </p>
    
                    <hr />
    
                    <p>
                        <?php _e("Video Player Skin", "chameleon_domain"); ?> <span data-title="<?php _e("Choose the video player skin", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <span class="chameleon-box">
                            <input name="chameleon_skin" type="radio" value="light" checked /> <?php _e("light", "chameleon_domain"); ?>
                            <input name="chameleon_skin" type="radio" value="dark" /> <?php _e("dark", "chameleon_domain"); ?>
                        </span>
                    </p>
    
                    <hr />
                    
                    <p>
                        <?php _e("Make Video Responsive", "chameleon_domain"); ?> <span data-title="<?php _e("Select 'yes' if your site is 'responsive'", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <span class="chameleon-box">
                            <input name="chameleon_responsive" type="radio" value="yes" /> <?php _e("yes", "chameleon_domain"); ?>
                            <input name="chameleon_responsive" type="radio" value="no" checked /> <?php _e("no", "chameleon_domain"); ?>
                        </span>
                    </p>
    
                    <hr />
                    
                    <p>
                        <?php _e("Video Width", "chameleon_domain"); ?> <span data-title="<?php _e("Enter the original width of your video", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <input class="chameleon-small chameleon-wid" name="chameleon_width" value="960" type="text" />
                    </p>
                    
                    <hr />
                    
                    <p>
                        <?php _e("Video Height", "chameleon_domain"); ?> <span data-title="<?php _e("Enter the original height of your video", "chameleon_domain"); ?>" class="chameleon-question">?</span><br />
                        <input class="chameleon-small" name="chameleon_height" value="540" type="text" />
                    </p>
    
                    <hr />
                    
                    <p>Video URL <img class="chameleon-addmedia chameleon-upload" src="<?php echo home_url("wp-admin/images/media-button.png"); ?>" />
						<span class="chameleon-question" data-title="<?php _e("Enter url to the mp4 version of the video", "chameleon_domain"); ?>">?</span>
						<br /><input class="chameleon-medium" name="chameleon_video" type="text" />
                        <span class="chameleon-media chameleon-video-holder"></span>
					</p>
                    
                    <hr />
                    
                    <p><span class="chameleon-multimedia">Video Poster <img class="chameleon-addmedia" src="<?php echo home_url("wp-admin/images/media-button.png"); ?>" />
						<span class="chameleon-question" data-title="<?php _e("Choose a preview poster for your video", "chameleon_domain"); ?>">?</span></span>
						<br /><input class="chameleon-medium" name="chameleon_poster" type="text" />
                        <span class="chameleon-media chameleon-poster-holder"></span>
					</p>
                    
                    <hr />
                    
                    <p class="submit-chameleon">
                        <input type="submit" class="button-primary chameleon-submit" value="<?php _e("Generate Shortcode", "chameleon_domain"); ?>" />
                        <span class="chameleon-clip"><span class="chameleon-success"><?php _e("copied", "chameleon_domain"); ?></span>
                        <span class="chameleon-board">
                            <object type="application/x-shockwave-flash" width="120" height="24" data="<?php echo plugins_url("wp-chameleon/clipboard/clipboard.swf"); ?>" id="chameleon-clipboard-swf">
                                <param name="movie" value="<?php echo plugins_url("wp-chameleon/clipboard/clipboard.swf"); ?>" />
                                <param name="allowScriptAccess" value="always" />
                                <param name="wmode" value="transparent">
                            </object>
                        </span>
                        <input type="submit" class="button-primary chameleon-clipboard" value="<?php _e("Copy to Clipboard", "chameleon_domain"); ?>" /></span>
                    </p>
                    
                    <p class="chameleon-generate"><input type="text" class="chameleon-output chameleon-medium" /></p>
    
                </form>
    
            </div>
            
        </div>
        
		<?php echo ob_get_clean();

	}
	
	function chameleon_admin_scripts() {

		wp_enqueue_script("jquery");
		
		// check for new 3.5 media viewer
		if(function_exists("wp_enqueue_media")) {
		
			wp_enqueue_media();
			
		}
		else {
				
			wp_enqueue_style("thickbox");
			wp_enqueue_script("thickbox");
		
		}
		
		wp_enqueue_style("chameleon_css", plugins_url("wp-chameleon/css/chameleon_wp.css"));  
		wp_enqueue_script("chameleon_script", plugins_url("wp-chameleon/js/chameleon_wp.js"));
		
	}

	function chameleon_add_admin() {

		add_options_page("chameleon", "Chameleon Video", "manage_options", "chameleon_admin", "chameleon_admin"); 

	}

	function chameleon_register() {

		register_setting("chameleon_settings_group", "chameleon_settings");

	}
	
	add_action("admin_enqueue_scripts", "chameleon_admin_scripts");	
	add_action("admin_init", "chameleon_register");
	add_action("admin_menu", "chameleon_add_admin");


?>