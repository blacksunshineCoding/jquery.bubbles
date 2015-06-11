$.fn.bubbles = function(options){
	
	var bubblesRand;
	var sizeRand;
	var bubbleRadius;
	
	var startPositionBottom;
	var startPositionLeft;
	var endPositionBottom;
	
	var riseSpeed;
	
	var randDifference;
	
	var bubbleClass;
	var bubbleClassMain;
	var bubbleClassSub;
	
	var hueRand;
	var saturationRand;
	var brightnessRand;
	var colors = [];
	
	var bubbleRun = 1;
	
	options = $.extend({
		minBubbleSize: 20,
		maxBubbleSize: 150,
		minBubbleSpeed: 2500,
		maxBubbleSpeed: 7500,
		minStartDifference: 10,
		maxStartDifference: 50,
		colorRangeHueMin: 0,
		colorRangeHueMax: 275,
		colorRangeSaturationMin: 100,
		colorRangeSaturationMax: 100,
		colorRangeBrightnessMin: 50,
		colorRangeBrightnessMax: 100,
		minBubbleQuantity: 10,
		maxBubbleQuantity: 100,
		runDelay: 500,
		runTimes: 10
	}, options);
	

	
	randBetween = function(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	};
	
//	var conBubble = $('.bubble');
//	var
//	
//	if (!$('.bubble').is(":visible") && $('.bubble').css('bottom') > $('#template').height() ) {
//		$(this).remove();
//	}
	var windowHeight = $(window).height();
	$('#template').css('height', windowHeight);
	$('#template').css({background:'linear-gradient(lightblue,blue)'});
	
	/* First Run */

	initialRunTimes();
	
	
	
	function initialRuns() {
		startBubbleRun();
		
		setTimeout(function() {
			startBubbleRun();
		}, 500);
	}
	
	function initialRunTimes() {
		startBubbleRun();
		
		for (var x = 0, xlimit = 10; x < xlimit; x++) {
			
			setTimeout(function() {
				startBubbleRun();
			}, 500);
			
		}
	}

	function startBubbleRun() {
		bubblesRand = randBetween(options.minBubbleQuantity, options.maxBubbleQuantity);
		
		for (var i = 0, limit = bubblesRand; i < limit; i++) {
			
			sizeRand = randBetween(options.minBubbleSize, options.maxBubbleSize);
			bubbleRadius = sizeRand / 2;
			
			startPositionBottom = '-' + sizeRand;
			startPositionLeft = randBetween(0, $('#template').width());
			
			riseSpeed = randBetween(options.minBubbleSpeed, options.maxBubbleSpeed);
			
			randDifference = randBetween(options.minStartDifference, options.maxStartDifference);
			
			startPositionBottom = startPositionBottom - randDifference;
			startPositionBottom = startPositionBottom - (2 * sizeRand);
			
			endPositionBottom = $('#template').height() + sizeRand;
			
			hueRand = randBetween(options.colorRangeHueMin, options.colorRangeHueMax);
			saturationRand = randBetween(options.colorRangeSaturationMin, options.colorRangeSaturationMax);
			brightnessRand = randBetween(options.colorRangeBrightnessMin, options.colorRangeBrightnessMax);
			
			colors[i] = {
					hsl: 'hsl(' + hueRand + ', ' + saturationRand + '%, ' + brightnessRand + '%)',
					size: sizeRand + 'px',
					radius: bubbleRadius + 'px',
					speed: riseSpeed,
					bottom: startPositionBottom + 'px',
					left: startPositionLeft + 'px',
					startPosition: [
					          { bottom: startPositionBottom + 'px' },
					          { left: startPositionLeft + 'px' }
					]
			};
			bubbleClassMain = 'bubble';
			bubbleClassSub = 'bubbleCount' + i;
			bubbleClass = bubbleClassMain + ' ' + bubbleClassSub;
			
			$('#template').append('<div class="' + bubbleClass + '"></div>');
	
			$('.' + bubbleClassSub).css({
				'display': 'block',
				'position': 'absolute',
				'width': colors[i].size,
				'height': colors[i].size,
				'border-radius': colors[i].radius,
				'background-color': colors[i].hsl,
				'bottom': colors[i].bottom,
				'left': colors[i].left
			});
			
			$('.' + bubbleClassSub).animate({
				bottom: endPositionBottom
			}, colors[i].speed );
			
		}
	
		bubbleRun++;
		
	}
}

/*
	red = h0
	orange = h35
	yellow = h60
	green = h125 (h85 - h145)
	lightblue = h180
	blue = h245 (h200 - h275)
	pink = h300

*/
