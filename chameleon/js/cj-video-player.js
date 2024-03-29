/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */

(function($) {
	
	// number between 0-100
	var initialVolume = 75,
	
	// the amount of space the video scrub line should account for
	iconBuffer = 358,
	
	// the player controls markup
	htmlControls = 
			
		'<div class="cj-vid-element cj-vid-play-pause">' + 
		
			'<span class="cj-vid-icon cj-vid-play fa-icon-play"></span>' + 
			'<span class="cj-vid-icon cj-vid-pause fa-icon-pause"></span>' + 
			
		'</div>' + 
				
		'<div class="cj-vid-element cj-vid-time">00:00/00:00</div>' + 
		
		'<div class="cj-divider-left"></div>' +
		
		'<div class="cj-vid-element cj-vid-scrub">' + 
		
			'<span class="cj-vid-line cj-vid-total"></span>' + 
			'<span class="cj-vid-line cj-vid-buffer"></span>' + 
			'<span class="cj-vid-line cj-vid-progress"></span>' + 
			
		'</div>' + 
		
		'<div class="cj-divider-right"></div>' +

		'<div class="cj-vid-element cj-vid-vol-buttons">' + 
		
			'<span class="cj-vid-icon cj-vid-volume fa-icon-volume-up"></span>' + 
			'<span class="cj-vid-icon cj-vid-mute fa-icon-volume-off"></span>' + 
			
		'</div>' + 

		'<div class="cj-vid-element cj-vid-vol-lines">' + 
		
			'<span class="cj-vid-line cj-vid-vol-total"></span>' + 
			'<span class="cj-vid-line cj-vid-vol-current"></span>' + 
			
		'</div>' + 
		
		'<div class="cj-divider-right cj-divider-last"></div>' +
		
		'<div class="cj-vid-element cj-vid-social">' + 
		
			'<span class="cj-vid-twitter fa-icon-twitter"></span>' + 
			'<span class="cj-vid-facebook fa-icon-facebook"></span>' + 
			'<span class="cj-vid-google fa-icon-google-plus"></span>' + 
		
		'</div>' + 

		'<div class="cj-vid-element cj-vid-fullscreen">' + 
		
			'<span class="cj-vid-icon cj-vid-full fa-icon-resize-full"></span>' + 
			'<span class="cj-vid-icon cj-vid-normal fa-icon-resize-small"></span>' + 
		
		'</div>',
	
	// the right-click menu
	contextMenu = 
	
		'<div class="cj-context-menu cj-item-inactive">' + 
		
			'<ul>' + 
			
				'<li class="cj-context-play"><span>Play</span></li>' + 
				'<li class="cj-context-pause"><span>Pause</span></li>' +
				'<li class="cj-context-mute"><span>Mute</span></li>' + 
				'<li class="cj-context-unmute"><span>Unmute</span></li>' + 
				'<li class="cj-context-full"><span>Fullscreen</span></li>' + 
				'<li class="cj-context-normal cj-context-inactive"><span>Normalscreen</span></li>' + 
				'<li class="cj-context-copyright"><span>&copy; Video Productions</span></li>' + 
				
			'</ul>' +
			
		'</div>', 
	
	copyrightTarget,
	copyrightLink, 
	contextUnmute,
	contextNormal,
	usePlayPause,
	contextPause,
	useVolLines,
	videoPlayed,
	requestFull,
	bubbleWidth,
	contextPlay,
	contextMute,
	contextFull,
	cancelFull,
	videoTimer,
	fullChange,
	fullStatus,
	container,
	totalTime,
	useVolBtn,
	playPause,
	storedWid,
	storedVol,
	useStatus,
	winHeight,
	fullTimer,
	videoSwf,
	controls,
	vidLines,
	progress,
	volLines,
	fullNorm,
	volTotal,
	volWidth,
	winWidth,
	useLines,
	duration,
	myObject,
	contextW,
	contextH,
	controlH,
	throttle,
	useShare,
	buffered,
	supress,
	offLeft,
	volIsOn,
	myMedia,
	bigPlay,
	useFull,
	volMute,
	volPlay,
	touched,
	request,
	oHeight,
	poster,
	oWidth,
	vidHit,
	buffer,
	webkit,
	sTimer,
	bubble,
	cTimer,
	mMinus,
	bodies,
	vTotal,
	volume,
	volBtn,
	normal,
	inFull,
	norWid,
	safari,
	prevW,
	prevH,
	frame,
	video,
	pause,
	share,
	agent,
	tTime,
	auto,
	play,
	full,
	skin,
	win,
	url,
	par,
	pst,
	ssl,
	doc;
	
	function socialClick() {
		
		// Currently the purpose of the share buttons is to share the actual page
		// If you wish to link them to your social networks instead the urls can be changed
		// Example: window.open("http://twitter.com/CodingJack");
		
		if(!video.paused) togglePlayPause();
		
		switch($(this).attr("class").split(" ")[0]) {
		
			case "cj-vid-twitter":
				
				window.open("http://twitter.com/home?status=" + share + parent.document.URL);
			
			break;
			
			case "cj-vid-facebook":
			
				window.open("http://www.facebook.com/share.php?u=" + parent.document.URL);
			
			break;
			
			case "cj-vid-google":
			
				window.open("https://plus.google.com/share?url=" + parent.document.URL);
			
			break;
			
		}
		
	}
	
	function init() {
		
		doc = document;
		frame = $(window.frameElement);
		
		if(!frame.length) return;
		
		oWidth = frame.attr("data-width") || frame.attr("width") || 640;
		oHeight = frame.attr("data-height") || frame.attr("height") || 360;
		
		if(oWidth.toString().search('%') !== -1) oWidth = 640;
		if(oHeight.toString().search('%') !== -1) oHeight = 360;
		
		oWidth = parseInt(oWidth, 10);
		oHeight = parseInt(oHeight, 10);
		
		par = frame.parent();
		win = $(window);
		writeSize();
		
		url = frame.attr("data-video") || "";
		if(!url) return;
		
		pst = frame.attr("data-poster") || "";
		share = frame.attr("data-share-text") || "";
		auto = frame.attr("data-auto-play") === "yes";
		copyrightLink = frame.attr("data-copyright-link");
		copyrightTarget = frame.attr("data-copyright-target");
		useShare = frame.attr("data-use-share-buttons") === "yes";
		if(share) share += " ";
		
		ssl = document.URL.search("https") !== -1;
		agent = navigator.userAgent.toLowerCase();
		webkit = agent.search("webkit") !== -1;
		safari = webkit && agent.search("chrome") === -1;
		
		var firefox = agent.search("firefox") !== -1,
		android = agent.search("android") !== -1,
		index;
		
		if(safari) {
		
			index = agent.indexOf('version') + 8,
			safari = parseInt(agent.substr(index, index + 4), 10) < 6;
			
		}
		
		tTime = !android ? 100 : 250;
		skin = frame.attr("data-skin") === "light" ? " cj-vid-light" : " cj-vid-dark";
		bodies = $("body").addClass("cj-vid-container" + skin);
		
		initialVolume *= 0.01;
		video = doc.createElement("video");
		touched = "onorientationchange" in window || (android && firefox);
		container = $("<div />").appendTo(bodies);
		
		if(!ssl) {
		
			url = url.split("https").join("http");
			if(pst) pst = pst.split("https").join("http");
			
		}
		else {
		
			if(url.search("https") === -1) url = url.split("http").join("https");
			if(pst && pst.search("https") === -1) pst = pst.split("http").join("https");
			
		}
		
		if(!!video.requestFullscreen) {
		
			requestFull = "requestFullscreen";
			cancelFull = "exitFullscreen";
			fullChange = "fullscreenchange";
			fullStatus = "fullscreenElement";
			
		}
		else if(!!video.webkitRequestFullScreen) {
		
			requestFull = "webkitRequestFullscreen";
			cancelFull = "webkitExitFullscreen";
			fullChange = "webkitfullscreenchange";
			fullStatus = "webkitIsFullScreen";
			
		}
		else if(!!video.mozRequestFullScreen) {
		
			requestFull = "mozRequestFullScreen";
			cancelFull = "mozCancelFullScreen";
			fullChange = "mozfullscreenchange";
			fullStatus = "mozFullScreen";
			
		}
		
		if(!touched) {
			
			var opera = agent.search("opera") !== -1;
			
			if((firefox && frame.attr("data-firefox-uses-flash") === "yes") || opera) requestFull = null;
			
		}
		
		// HTML5
		if(requestFull && !!video.canPlayType && !touched) {
			
			video.volume = 0;
			
			if(pst) {
				
				poster = $("<img />").addClass("cj-poster").one('error.cjvideo', posterError).one("load.cjvideo", posterReady).appendTo(container);
				poster.attr("src", pst);
				
			}
			else {
			
				posterReady();
				
			}
			
		}
		// Flash
		else if(!touched) {
			
			var domain = frame.attr("data-plugin-url") || "";
			
			if(domain) {
				
				if(!ssl) {	
				
					domain = domain.split("https").join("http");
					
				}
				else if(domain.search("https") === -1) {
					
					domain = domain.split("http").join("https");
						
				}
				
			}
			
			videoSwf = domain + "chameleon/swf/video_fallback_" + skin.split("-")[2] + ".swf";
			startIt();

		}
		// Mobile always get the devices default player
		else {
			
			writeVideo(url);
			
			if(pst && !firefox) myMedia.attr("poster", pst);
			if(auto) myMedia.attr("autoplay", "autoplay");
			
			myMedia.attr("controls", "controls").prependTo(container);
			
			resizer();
			$(parent).on("orientationchange.cjvideo", throttleResize);
			
			$("#cj-wrapper").remove();
			
		}
		
	}
	
	function fallbackRequest(cb) {
		
		setTimeout(cb, 250);
	
	}
	
	function writeVideo(url) {
		
		myMedia = $(video).addClass("cj-video");
		
		$("<source />").attr("type", "video/webm").attr("src", url.split("mp4").join("webm")).prependTo(myMedia);
		$("<source />").attr("type", "video/ogg").attr("src", url.split("mp4").join("ogv")).prependTo(myMedia);
		$("<source />").attr("type", "video/mp4").attr("src", url).prependTo(myMedia);
		
	}
	
	function posterReady() {
	
		if(poster) poster.unbind('error.cjvideo');
		writeVideo(url);
				
		controls = $("<div />").addClass("cj-vid-controls").html(htmlControls).appendTo(container);
		controlH = parseInt(controls.css("height"), 10) || 29;
		
		myMedia.prependTo(container.css("opacity", 0).addClass("cj-fade-video"));

		if(initialVolume === 0) initialVolume = 1;
		storedVol = initialVolume;
		
		request = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || fallbackRequest;
		video.addEventListener("canplay", onMetaData, false);
		video.play();
		
	}
	
	function posterError() {
	
		poster.unbind('load.cjvideo').remove();
		pst = poster = null;
		
		posterReady();
		
	}
	
	function onMetaData() {
		
		video.pause();
		video.removeEventListener("canplay", onMetaData, false);

		full = $(".cj-vid-full");
		play = $(".cj-vid-play");
		pause = $(".cj-vid-pause");
		volMute = $(".cj-vid-mute");
		vTotal = $(".cj-vid-total");
		buffer = $(".cj-vid-buffer");
		normal = $(".cj-vid-normal");
		volPlay = $(".cj-vid-volume");
		vidLines = $(".cj-vid-scrub");
		videoTimer = $(".cj-vid-time");
		progress = $(".cj-vid-progress");
		volTotal = $(".cj-vid-vol-total");
		volume = $(".cj-vid-vol-current");
		volBtn = $(".cj-vid-vol-buttons");
		volLines = $(".cj-vid-vol-lines");
		fullNorm = $(".cj-vid-fullscreen");
		playPause = $(".cj-vid-play-pause");
		bubble = $("<span />").addClass("cj-time-bubble").text("00:00").appendTo(container);
		bigPlay = $("<span />").addClass("cj-vid-play-btn fa-icon-play").appendTo(container);
		
		useLines = vidLines.length && progress.length && vTotal.length && buffer.length;
		useVolLines = volLines.length && volume.length && volTotal.length;
		usePlayPause = playPause.length && play.length && pause.length;
		useVolBtn = volBtn.length && volPlay.length && volMute.length;
		useFull = fullNorm.length && full.length && normal.length && !safari;
		useStatus = videoTimer.length;
		bubbleWidth = bubble.width();
		
		if(safari) {
		
			iconBuffer -= 35;
			$(".cj-vid-social").css("border-right", 0);
			
		}
		
		if(usePlayPause) {
			
			if(auto) {
			
				play.hide();
				pause.show();
			
			}
			else {
			
				pause.hide();
				play.show();
				
			}
			
			playPause.on("click.cjvideo", togglePlayPause);
			
		}
		else {
			
			if(playPause.length) {
				
				playPause.hide();
				
			}
			else {
			
				if(play.length) play.hide();
				if(pause.length) pause.hide();
				
			}
			
		}

		if(useVolBtn) {
			
			checkVolume(initialVolume);
			volBtn.on("click.cjvideo", toggleVolume);
			
		}
		else {

			if(volBtn.length) {
			
				volBtn.hide();
				
			}
			else {
			
				if(volPlay.length) volPlay.hide();
				if(volMute.length) volMute.hide();
				
			}
			
		}

		if(useVolLines) {
			
			if(webkit) volume.addClass("cj-vol-no-border").wrap($("<span />").addClass("cj-vid-line cj-vid-vol-mask"));
			
			volWidth = parseInt(volTotal.css("width"), 10);
			volume.css("width", volWidth * initialVolume);
			volLines.on("mousedown.cjvideo", volumeDown).on("mouseup.cjvideo", volumeUp);
			
		}
		else {
		
			useVolLines = false;
			
			if(volLines.length) {
			
				volLines.hide();
				
			}
			else {
				
				if(volume.length) volume.hide();
				if(volTotal.length) volTotal.hide();
				
			}
			
		}
		
		if(useFull) {
			
			fullNorm.on("click.cjvideo", toggleFull);
			
		}
		else {
			
			if(fullNorm.length) {
			
				fullNorm.hide();
				
			}
			else {
			
				if(full.length) full.hide();
				if(normal.length) normal.hide();
				
			}
			
		}

		if(useLines) {
			
			vidLines.css("width", mMinus);
			vTotal.css("width", mMinus);
			
			duration = video.duration;
			vidHit = $("<span />").addClass("cj-vid-hit").insertAfter(progress).on("mouseenter.cjvideo", enterLines).on("mousedown.cjvideo", lineDown).on("mouseup.cjvideo", lineUp);
			
		}
		else {
			
			if(vidLines.length) {
				
				vidLines.hide();
				
			}
			else {
			
				if(progress.length) progress.hide();
				if(vTotal.length) vTotal.hide();
				
			}
			
		}

		if(useStatus) {
			
			var mins = video.duration / 60,
			secs = ((mins - (mins | 0)) * 60) | 0;
			mins = mins | 0;
			
			totalTime = "/" + (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
			videoTimer.text("00:00" + totalTime);
			
		}
		
		if(contextMenu) {
		
			contextMenu = $(contextMenu).appendTo(bodies);
			contextH = contextMenu.outerHeight(true) + 10;
			contextW = contextMenu.outerWidth(true) + 10;
			
			contextPlay = $(".cj-context-play");
			contextFull = $(".cj-context-full");
			contextMute = $(".cj-context-mute");
			contextPause = $(".cj-context-pause");
			contextNormal = $(".cj-context-normal");
			contextUnmute = $(".cj-context-unmute");
			
			var copyright = $(".cj-context-copyright"),
			copyText = frame.attr("data-copyright");
			
			if(copyright.length && copyText) {
				
				var cText = copyright.children("span");
				
				if(cText.length) {
					
					if(webkit && skin === " cj-vid-light" && agent.search("chrome") === -1) {
								
						cText.addClass("cj-no-copy-border");
						
					}
					
					cText.html(copyText);
					
				}
				
				if(copyrightLink) copyright.on("click.cjvideo", copyrightClick);
				
			}
			
			if(contextPlay.length && contextPause.length) {
				
				if(auto) {
					
					contextPlay.addClass("cj-context-inactive");
					
				}
				else {
					
					contextPause.addClass("cj-context-inactive");
					
				}
				
				contextPlay.on("click.cjvideo", togglePlayPause);
				contextPause.on("click.cjvideo", togglePlayPause);
					
			}
			else {
				
				contextPlay = null;
			
			}
			
			if(contextMute.length && contextUnmute.length) {
			
				if(video.volume > 1) {
					
					contextMute.addClass("cj-context-inactive");
					
				}
				else {
					
					contextUnmute.addClass("cj-context-inactive");
					
				}
				
				contextMute.on("click.cjvideo", toggleVolume);
				contextUnmute.on("click.cjvideo", toggleVolume);
				
			}
			else {
			
				contextMute = null;
				
			}
			
			if(contextFull.length && contextNormal.length && !safari) {
				
				contextFull.on("click.cjvideo", toggleFull);
				contextNormal.on("click.cjvideo", toggleFull);
				
			}
			else {
			
				if(contextFull.length) contextFull.hide();
				if(contextNormal.length) contextNormal.hide();
				
				contextNormal = contextFull = null;
				
			}
			
			contextMenu.addClass((webkit ? "cj-ctx-inactive" : "cj-context-transition"));
			
			$(doc).bind("contextmenu", rightClick);
			bodies.on("mouseleave", hideContext);
			
		}
		
		var social = $(".cj-vid-social");
		
		if(useShare) {
			
			if(social.length) {	
				social.children("span").on("click.cjvideo", socialClick);
			}
			else {
				
				iconBuffer -= 74;	
				
				if(safari) {
				
					$(".cj-divider-last").hide();
					$(".cj-vid-vol-lines").css("border-right", 0);
					
				}
				
			}
			
		}
		else {
		
			iconBuffer -= 74;
			if(social.length) social.hide();
			
			if(safari) {
				
				$(".cj-divider-last").hide();
				$(".cj-vid-vol-lines").css("border-right", 0);
				
			}
			
		}
		
		video.addEventListener("ended", videoEnded, false);	
		myMedia.on("click.cjvideo", togglePlayPause);
		bigPlay.on("click.cjvideo", togglePlayPause);
		
		startIt();
		
	}
	
	function rightClick(event) {
		
		event.preventDefault();
		event.stopPropagation();
		
		if(winWidth < 480) return;
		
		var x = event.pageX, y = event.pageY,
		maxY = winHeight - controlH - 10,
		maxX = winWidth - 10;
		
		x = x + contextW > maxX ? winWidth - contextW - 16 : x < 10 ? 10 : x;
		y = y + contextH > maxY ? winHeight - contextH - controlH : y < 10 ? 10 : y;
		
		// webkit css3 transitions are a little quirky for the right-click menu, jQuery animate used instead
		if(!webkit) {
		
			contextMenu.css({left: x, top: y}).removeClass("cj-item-inactive");
			
		}
		else {
			
			contextMenu.stop().removeClass("cj-ctx-inactive").css("visibility", "visible").animate({
				
				top: y, 
				left: x, 
				opacity: 1
				
			}, {duration: 750, easing: "easeOutQuint", queue: false});
			
		}
		
		bodies.one("click.cjvideo", hideContext);
		
	}
	
	function hideContext() {
		
		bodies.unbind("click.cjvideo", hideContext);
		
		if(!webkit) {
		
			contextMenu.addClass("cj-item-inactive");
			
		}
		else {
			
			contextMenu.stop().addClass("cj-ctx-inactive").animate({opacity: 0}, {
				
				duration: 750, 
				easing: "easeOutQuint", 
				complete: offContext, 
				queue: false
				
			});
			
		}
		
	}
	
	function offContext() {
		
		contextMenu.css("visibility", "hidden");
		
	}
	
	function startIt() {
		
		if(myMedia) {

			resizer();
			$(parent).on("resize.cjvideo", throttleResize);
			if(useStatus) videoTimer.text("00:00" + totalTime);
			
			$("#cj-wrapper").remove();
			container.css("opacity", 1);
			
			request(updateBuffer);
			video.volume = initialVolume;
					
			if(!auto) return;
			if(poster) poster.hide();
			
			videoPlayed = true;			
			video.play();
			
			request(videoTime);
			bigPlay.addClass("cj-item-inactive");
			bodies.on("mousemove.cjvideo", showControls).on("mouseleave.cjvideo", hideControls);
			
			if(usePlayPause) pause.show();
			
		}
		else {
			
			var flashVars = 
			
				'url=' + url + 
				'&vol=' + initialVolume + 
				'&domain=' + parent.document.URL + 
				'&auto=' + (auto ? "true" : "false") + 
				'&useShare=' + (useShare ? "true" : "false"), 
				
			copyText = frame.attr("data-copyright");
			
			if(pst) flashVars += '&poster=' + pst;
			if(share) flashVars += '&share=' + share;
			if(copyText) flashVars += '&copyright=' + copyText;
			
			myObject = $('<object id="myflash" type="application/x-shockwave-flash" data="' + videoSwf + '" width="' + win.width() + '" height="' + win.height() + '">' + 
							'<param name="movie" value="' + videoSwf + '" />' + 
							'<param name="allowScriptAccess" value="always" />' + 
							'<param name="bgcolor" value="#000000" />' + 
							'<param name="allowfullscreen" value="true" />' +  
							'<param name="wmode" value="opaque" />' + 
							'<param name="flashvars" value="' + flashVars + '" />' +
							'<a href="http://get.adobe.com/flashplayer/" target="_blank"><img src="img/get_flash.jpg" /></a>' +
							
						'</object>');
		
			myMedia = $("<div />").prependTo(container).append(myObject);
			
		}
		
	}
	
	function objectResize() {
		
		if(!throttle) resizeObject("cj");
		
		clearTimeout(sTimer);
		sTimer = setTimeout(resizeObject, tTime);
		
	}
	
	function resizeObject(st) {
	
		writeSize();
		
		if(prevW === winWidth && prevH === winHeight) return;
		myObject.attr({width: winWidth, height: winHeight});
		
		prevW = winWidth;
		prevH = winHeight;
		throttle = st === "cj";
		
	}
	
	function throttleResize() {
		
		if(!throttle) resizer("cj");
		
		clearTimeout(sTimer);
		sTimer = setTimeout(resizer, tTime);
		
	}
	
	function writeSize() {
	
		winWidth = !touched ? win.width() : frame.width();
		
		if(oWidth && oHeight && !supress) {
			
			winWidth = !touched ? win.width() : par.width();
			
			winHeight = ((winWidth / oWidth) * oHeight) | 0;
			frame.attr("height", winHeight);
			
		}
		else {
			
			if(!touched) {
			
				winWidth = win.width();
				winHeight = win.height();
				
			}
			else {
			
				winWidth = frame.width();
				winHeight = frame.height();
				
			}
			
			winWidth = !touched ? win.width() : frame.width();
			winHeight = !touched ? win.height() : frame.height();
			
		}
		
	}
	
	function resizer(st) {
		
		writeSize();
		
		if(prevW === winWidth && prevH === winHeight) return;
		mMinus = winWidth > 480 ? winWidth - iconBuffer : winWidth - 181;
		
		if(useLines) {
			
			vidLines.css("width", mMinus);
			vTotal.css("width", mMinus);
			
			if(buffered) {
				
				buffer.css("width", mMinus);
				vidHit.css("width", mMinus);
				
			}
			
			if(videoPlayed && !video.paused) videoTime();
			
		}
		
		myMedia.width(winWidth);
		myMedia.height(winHeight);
		
		prevW = winWidth;
		prevH = winHeight;
		
		throttle = st === "cj";
		if(!videoPlayed && poster) resizePoster();
		
	}
	
	function resizePoster() {
	
		poster.attr({width: winWidth, height: winHeight}).css("top", (win.height() >> 1) - (winHeight >> 1));
		
	}

	function showControls() {
		
		controls.css("opacity", 1);
		
	}

	function hideControls() {
		
		controls.css("opacity", 0);
		
	}

	function videoEnded(event) {

		event.stopPropagation();
		clearTimeout(cTimer);
		
		video.pause();
		videoPlayed = false;
		video.currentTime = 0;
		videoTimer.text("00:00" + totalTime);
		bodies.off("mousemove.cjvideo mouseleave.cjvideo");
		
		if(useLines) progress.css("width", 0);
		
		if(poster) {
			
			resizePoster();
			poster.show();
			
		}
		
		if(usePlayPause) {
		
			pause.hide();
			play.show();
			
		}
		
		controls.css("opacity", 1);	
		bigPlay.removeClass("cj-item-inactive");
		
	}

	function togglePlayPause(event) {
		
		if(event && $(this).hasClass("cj-context-inactive")) return;
		if(bodies.hasClass("cj-hide-mouse")) return;
		
		if(video.paused) {
			
			if(!videoPlayed) {
				
				if(poster) poster.hide();
				videoPlayed = true;	
				
			}
			
			video.play();
			
			if(usePlayPause) {
				
				play.hide();
				pause.show();
			
			}
			
			request(videoTime);
			bigPlay.addClass("cj-item-inactive");
			
			if(contextPlay) {
			
				contextPlay.addClass("cj-context-inactive");
				contextPause.removeClass("cj-context-inactive");
				
			}
			
			if(!inFull) {
				
				bodies.on("mousemove.cjvideo", showControls).on("mouseleave.cjvideo", hideControls);
				
			}
			else if(event && !video.paused && event.pageY < winHeight - controlH) {
			
				cTimer = setTimeout(hideFull, 3000);
			
			}
			
		} 
		else {
			
			video.pause();
		
			if(usePlayPause) {
			
				pause.hide();
				play.show();
				
			}
	
			bigPlay.removeClass("cj-item-inactive");
			
			if(!inFull) {
				
				bodies.off("mousemove.cjvideo mouseleave.cjvideo");
				showControls();
				
			}
			else {
			
				clearTimeout(cTimer);
			
				showControls();
				bodies.removeClass("cj-hide-mouse");
				
			}
			
			if(contextPlay) {
			
				contextPause.addClass("cj-context-inactive");
				contextPlay.removeClass("cj-context-inactive");
				
			}
			
		}

		showControls();
		
	}
	
	function checkVolume(num) {
		
		if(!num) num = video.volume;
		
		if(num !== 0) {
			
			volIsOn = true;
			
			if(useVolBtn) {

				volMute.hide();
				volPlay.show();
				
			}
			
			if(contextMute) {
				
				contextUnmute.addClass("cj-context-inactive");
				contextMute.removeClass("cj-context-inactive");
				
			}
			
		}
		else {
			
			volIsOn = false;
			if(useVolLines) volume.css("width", 0);
			
			if(useVolBtn) {
			
				volPlay.hide();
				volMute.show();
				
			}
			
			if(contextMute) {
				
				contextMute.addClass("cj-context-inactive");
				contextUnmute.removeClass("cj-context-inactive");
				
			}
			
		}
		
	}
	
	function changeVolume(event) {
		
		var dif = event.pageX - volLines.offset().left, 
		vol = dif / volWidth;
		vol = vol < 0 ? 0 : vol > 1 ? 1 : vol;
		
		if(dif > volWidth - 3) {
			
			dif = volWidth;
			vol = 1;
			
		}
		
		volume.css("width", dif);
		video.volume = vol;
		
	}
	
	function volumeDown(event) {
		
		changeVolume(event);
		volLines.on("mousemove.cjvideo", changeVolume).on("mouseleave.cjvideo", volumeUp);
		
	}
	
	function volumeUp() {
		
		volLines.off("mousemove.cjvideo mouseleave.cjvideo");
		if(useVolBtn) checkVolume();
		
	}
	
	function toggleVolume(event) {
		
		if(event && $(this).hasClass("cj-context-inactive")) return;
		
		if(volIsOn) {
			
			if(useVolLines) {
			
				storedWid = parseInt(volume.css("width"), 10);
				volume.css("width", 0);
				
			}
			
			storedVol = video.volume;
			video.volume = 0;
			checkVolume();
			
		}
		else {
		
			if(useVolLines) volume.css("width", storedWid);
			
			video.volume = storedVol;
			checkVolume();
			
		}
		
	}

	function moveLine(event) {
		
		if(isNaN(offLeft)) offLeft = vidLines.offset().left;
		
		video.currentTime = video.duration * ((event.pageX - offLeft) / mMinus);
		videoTime();
		
	}
	
	function lineDown(event) {
		
		video.pause();
		moveLine(event);
		vidHit.on("mousemove.cjvideo", moveLine).on("mouseleave.cjvideo", lineUp);
		
	}
	
	function lineUp() {
	
		vidHit.off("mousemove.cjvideo", moveLine).off("mouseleave.cjvideo", lineUp);
		if(video.paused) togglePlayPause();
		
	}
	
	function enterLines() {
	
		vidHit.on("mouseleave.cjvideo", leaveLines).on("mousemove.cjvideo", updateBubble);
		bubble.addClass("cj-time-bubble-active");
		
	}
	
	function leaveLines() {
	
		vidHit.off("mouseleave.cjvideo").off("mousemove.cjvideo", updateBubble);
		bubble.removeClass("cj-time-bubble-active");
		
	}
	
	function updateBubble(event) {
		
		if(isNaN(offLeft)) offLeft = vidLines.offset().left;
		
		var pageX = event.pageX,
		mins = (((pageX - offLeft) / mMinus) * video.duration) / 60,
		secs = ((mins - (mins | 0)) * 60) | 0;
		mins = mins | 0;
		
		bubble.css("left", pageX - bubbleWidth).text((mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs));
		
	}
	
	function updateBuffer() {
		
		var perc = video.buffered.end(0) / video.duration;
		
		if(perc < 1) {
			
			var prog = mMinus * (video.buffered.end(0) / video.duration);
			
			buffer.css("width", prog);
			vidHit.css("width", prog);
			
			request(updateBuffer);
			
		}
		else {
			
			buffered = true;
			buffer.css("width", mMinus);
			vidHit.css("width", mMinus);
			
		}
		
	}
	
	function videoTime() {	
		
		var curTime = video.currentTime;
		if(useLines) progress.css("width", mMinus * (curTime / video.duration));
		
		if(useStatus) {
		
			var mins = curTime / 60,
			secs = ((mins - (mins | 0)) * 60) | 0;
			mins = mins | 0;
			
			videoTimer.text((mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs) + totalTime);
			
		}
		
		if(!video.paused) request(videoTime);
		
	}
	
	function fullMouse(event) {
		
		clearTimeout(cTimer);
		
		showControls();
		bodies.removeClass("cj-hide-mouse");
		
		if(!video.paused && event.pageY < winHeight - controlH) {
			
			cTimer = setTimeout(hideFull, 3000);
			
		}
		
	}
	
	function hideFull() {
	
		bodies.addClass("cj-hide-mouse");
		hideControls();
		
	}

	function toggleFull(event) {
		
		if(event && $(this).hasClass("cj-context-inactive")) return;
		
		if(!inFull) {
			
			norWid = winWidth;
			supress = true;
			
			doc.addEventListener(fullChange, fsChange, false);
			bodies[0][requestFull]();

		}
		else {
			
			doc[cancelFull]();
			
		}
		
	}
	
	function fsChange() {
		
		clearTimeout(fullTimer);
		
		if(doc[fullStatus]) {
			
			fullTimer = setTimeout(goFull, 100);
			
		}
		else {
			
			win.unbind("resize.cjvideo", safariEscape);
			doc.removeEventListener(fullChange, fsChange, false);
			exitFull();
			
		}
		
	}

	function goFull() {
		
		full.hide();
		normal.show();
		
		bodies.off("mousemove.cjvideo mouseleave.cjvideo");
		showControls();
		
		if(contextFull) {
			
			contextFull.addClass("cj-context-inactive");
			contextNormal.removeClass("cj-context-inactive");
			
		}
		
		inFull = true;
		if(!webkit) bodies.off("mousemove.cjvideo", fullMouse).on("mousemove.cjvideo", fullMouse);
		win.unbind("resize.cjvideo", safariEscape).one("resize.cjvideo", safariEscape);
		
	}
	
	// Safari is a little quirky with iframes + Fullscreen, so we listen for a resize event to capture a native exit (when escape key is clicked)
	function safariEscape() {
		
		win.unbind("resize.cjvideo", safariEscape);
		doc.removeEventListener(fullChange, fsChange, false);
		
		clearTimeout(fullTimer);
		exitFull();
		
	}

	function exitFull() {
		
		clearTimeout(cTimer);
		
		bodies.off("mousemove.cjvideo").removeClass("cj-hide-mouse");
		
		if(!video.paused) {
		
			hideControls();
			bodies.on("mousemove.cjvideo", showControls).on("mouseleave.cjvideo", hideControls);
			
		}
		else {
		
			showControls();
			
		}
		
		if(contextFull) {
			
			contextNormal.addClass("cj-context-inactive");
			contextFull.removeClass("cj-context-inactive");
			
		}
		
		full.show();
		normal.hide();
		
		inFull = supress = false;
		setTimeout(checkExit, 100);
		
	}
	
	function checkExit() {
		
		if(win.width() !== norWid) {
			
			setTimeout(checkExit, 100);
			
		}
		else {
		
			resizer();
				
		}
		
	}
	
	function thisMovie(fallback) {
					
		return agent.search("msie") !== -1 ? doc[fallback] : win[0][fallback];
		
	}
	
	function copyrightClick() {
	
		if(copyrightLink) {
		
			if(copyrightTarget !== "_blank") {	
			
				parent.window.location = copyrightLink;
				
			}
			else {
				
				if(myMedia.is("video") && !video.paused) togglePlayPause();
				window.open(copyrightLink);
				
			}
			
		}
		
	}
	
	// http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
	$.extend($.easing, {
		
		easeOutQuint: function (x, t, b, c, d) {
			
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			
		}
		
	});
	
	$.cjVideo = {
		
		init: function() {
			
			resizeObject();
			$(parent).on("resize.cjvideo", objectResize);
			
			try {
				thisMovie("myflash").videoResized();
			}
			catch(event){}
			
			$("#cj-wrapper").remove();
			
		},
		
		copyright: function() {
		
			copyrightClick();
			
		}
		
	};
	
	$(document).ready(init);

	
})(jQuery);


// called from Flash
function cjVideoPlayer(st) {

	jQuery.cjVideo[st]();
	
}





