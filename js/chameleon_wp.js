(function($) {
	
	var vid, func, isVideo, input, multi, media, poster, legacy, mediaHolder, posterHolder;
	
	$(document).ready(function() {
        
		var obj = {display: "none", visibility: "visible"};
		legacy = window.hasOwnProperty("send_to_editor");
		
		multi = $(".chameleon-multimedia");
		mediaHolder = $(".chameleon-video-holder").css(obj);
		posterHolder = $(".chameleon-poster-holder").css(obj);
		vid = $("input[name=chameleon_video]").focusin(removeError);
		media = $("input[name=chameleon_video]").val("").focusin(inFocus).focusout(outFocus);
		poster = $("input[name=chameleon_poster]").val("").focusin(inFocus).focusout(outFocus);
		
		$(".chameleon-success").css(obj);
		$(".chameleon-small").keyup(checkKey);
		$(".chameleon-output").focusin(onFocus);
		$(".chameleon-addmedia").click(openModal);
		$(".chameleon-submit").click(generateCode);
		$(".chameleon-clipboard").click(showMessage);
		$("#chameleon-shortcode").submit(preventDefault);
		
		
    });
	
	function onFocus(event) {
		
		event.preventDefault();
		
		var $this = this;
		setTimeout(function() {$this.select();}, 100);
		
	}
	
	function showMessage() {
	
		window.prompt("Copy to clipboard: Ctrl+C", $(".chameleon-output").val());
		
	}
				
	function preventDefault(event) {
		
		event.preventDefault();
		
	}
	
	function removeError() {

		$(this).removeClass("chameleon-error");
		
	}
	
	function checkKey() {

		this.value = this.value.replace(/[^0-9\.|#|-]/g, "");

	}
	
	function inFocus() {

		var $this = $(this), value = $this.val();
		
		if(!value) return;
		
		$this.data("orig", value);

	}	

	function outFocus() {

		var $this = $(this), value = $this.val();

		if(value === $this.data("orig")) return;

		loadMedia(value, $(this).parent().children(".chameleon-media"));

	}
	
	function openModal() {
		
		if(!legacy) {
			
			func = wp.media.editor.send.attachment;
			wp.media.editor.send.attachment = updateMedia;
			
		}
		else {
		
			func = window.send_to_editor;
			window.send_to_editor = updateMedia;
			
		}
		
		var $this = $(this);
		
		if($this.hasClass("chameleon-addmedia")) {
			
			input = $this.hasClass("chameleon-upload") ? media : poster;
			
		}
		else {
			
			input = media;
			
		}
		
		isVideo = $this.hasClass("chameleon-upload");
		
		if(!legacy) {
			
			wp.media.editor.open($this);	
			$(".media-menu").children(":eq(1)").hide();
		
		}
		else {
			
			tb_show("", "media-upload.php?type=image&amp;TB_iframe=true");
			
		}
		
	}
	
	function updateMedia(html, attachment) {

		var url, holder;
		
		if(!legacy) {
		
			url = attachment.url;
			wp.media.editor.send.attachment = func;
			
		}
		else {
			
			url = $(html);
			url = url.attr("src") || url.attr("href");
			
			tb_remove();
			window.send_to_editor = func;
			
		}
		
		holder = isVideo ? mediaHolder : posterHolder;
		
		input.val(url);
		loadMedia(url, holder);

	}
	
	function loadMedia(url, holder) {

		var file = getType(url);
		holder.empty().hide();

		if(!file) return;
		var el;

		if(file.search("mp4") !== -1) {

			el = $("<video />").attr("controls", "controls").appendTo(holder.show());
			$("<source />").attr({type: "video/webm", src: file.split("mp4").join("webm")}).appendTo(el);
			$("<source />").attr({type: "video/mp4", src: file}).appendTo(el);

		}
		else {

			multi.addClass("chameleon-loading");
			el = $("<img />").one("load", mediaLoaded).one("error", mediaError).appendTo(holder);
			el.attr("src", file);

		}

	}
	
	function getType(url) {

		var spliced = url.split(".");
		if(!spliced.length) return null;

		spliced = spliced[spliced.length - 1];

		if(spliced === "jpg" || spliced === "png" || spliced === "gif" || spliced === "mp4") {

			return url;

		}
		else {

			return null;

		}

	}
	
	function mediaLoaded() {

		var $this = $(this).unbind("error");
		multi.removeClass("chameleon-loading");
		$this.parent().show();

		var w = this.width || $this.width(),
		h = this.height || $this.height(),
		perc = h > 75 ? 75 / h : 1;

		if(w * perc > 223) perc = 223 / w;
		$this.attr({width: w * perc, height: h * perc}).click(openModal);

	}
	
	function mediaError() {

		multi.removeClass("chameleon-loading");
		$(this).unbind("load");

	}
	
	function generateCode() {
		
		var responsive = $("input[name=chameleon_responsive]:checked").val(),
		auto = $("input[name=chameleon_autoplay]:checked").val(),
		height = $("input[name=chameleon_height]").val() || 540,
		width = $("input[name=chameleon_width]").val() || 960,
		skin = $("input[name=chameleon_skin]:checked").val(),
		poster = $("input[name=chameleon_poster]").val(),
		video = vid.val();
		
		if(!video) {
		
			vid.addClass("chameleon-error");
			return;
			
		}
		
		$(".chameleon-generate").show();
		$(".chameleon-clip").css("visibility", "visible");
		
		$(".chameleon-output").val(
		
			'[chameleon_video autoplay="' + auto + 
			'" skin="' + skin + 
			'" responsive="' + responsive + 
			'" width="' + width + 
			'" height="' + height + 
			'" video="' + video + 
			'" poster="' + poster + '" /]'
		
		);

	}
	
	
})(jQuery);

// called from Flash
function chameleonClipboard() {
	
	jQuery(".chameleon-success").stop(true, true).fadeIn(300, function() {
		
		var $this = jQuery(this), timer;
		clearTimeout($this.data("timer"));
		
		timer = setTimeout(function() {$this.fadeOut(300);}, 1500);
		$this.data("timer", timer);
		
	});
	
	return jQuery(".chameleon-output").val();
	
}







