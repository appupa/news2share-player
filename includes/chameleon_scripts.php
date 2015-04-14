<?php

	function chameleon_process_shortcode($atts) {

		global $chameleon_options;

		extract(shortcode_atts(array(

			"autoplay" => "yes",
			"skin" => "light",
			"width" => "960",
			"height" => "540",
			"responsive" => "no",
			"poster" => plugins_url("wp-chameleon/chameleon/video/1.jpg"),
			"video" => plugins_url("wp-chameleon/chameleon/video/1.mp4"),

		), $atts));

		$onload = "this.style.visibility='visible';";
		$el = '<iframe style="visibility: hidden" onload="' . $onload . '" ' .

			'data-auto-play="' . $autoplay . '" ' .
            'data-video="' . $video . '" ' .
            'data-poster="' . $poster . '" ' .
            'data-skin="' . $skin . '" ' .
            'data-firefox-uses-flash="' . $chameleon_options["firefox-flash"] . '" ' .
            'data-use-share-buttons="' . $chameleon_options["social-buttons"] . '" ' .
            'data-share-text="' . htmlentities($chameleon_options["twitter-text"]) . '" ' .
            'data-copyright="' . str_replace("&Acirc;", "", htmlentities($chameleon_options["copyright-text"])) . '" ' .
            'data-copyright-link="' . $chameleon_options["copyright-link"] . '" ' .
            'data-copyright-target="' . $chameleon_options["copyright-target"] . '" ' .
			'data-plugin-url="' . $chameleon_options["domain"] . '" ' .
            'height="' . $height . '" ' .
            'scrolling="no" ' .
            'frameborder="0" ' .
            'type="text/html" ' .
            'mozallowfullscreen="mozallowfullscreen" ' .
            'webkitallowfullscreen="webkitallowfullscreen" ' .
            'allowfullscreen="allowfullscreen" ' .
            'src="' . plugins_url("wp-chameleon/chameleon/cj-video.html") . '" ';

		if($responsive === "yes") {
			$el .= 'data-width="' . $width . '" data-height="' . $height . '" width="100%"';
		}
		else {
			$el .= 'width="' . $width . '"';
		}

		return $el . "></iframe>";

	}

  function new_vid_shortcode($atts) {
    $new_atts = array(
      "width" => $atts['width'],
      "height" => $atts['height'],
      "video" => $atts['mp4']
    );
    return chameleon_process_shortcode($new_atts);
  }

	add_shortcode("video", "new_vid_shortcode");

?>
