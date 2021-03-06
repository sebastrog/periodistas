/**
 * jQuery plugin for Responsive Hotspot
 *
 * Author: SK Lam
 */
	$theWidth = $(window).width();
	// $leftspot = null;
	// $topspot = null;

	// if ( $theWidth > 300) {
	// 	$leftspot = 56;
	// 	$topspot = 5
	// }

	// if ( $theWidth > 500) {
	// 	$leftspot = 40;
	// }

	// if ( $theWidth > 700) {
	// 	$leftspot = 20;
	// }

	// if ( $theWidth > 991) {
	// 	$leftspot = 11;
	// }

	// if ( $theWidth > 1224) {
	// 	$leftspot = 0;
	// }

(function() {
	'use strict';

	/*
		Reposition the HotSpots during init and resize windows
	*/	

	function _positionHotspots(options) {
		var imageWidth = $(options.mainselector + ' ' + options.imageselector).prop('naturalWidth'); 
		var imageHeight = $(options.mainselector + ' ' + options.imageselector).prop('naturalHeight');

		var bannerWidth = $(options.mainselector).width();
		var bannerHeight = $(options.mainselector).height();
		
		$(options.selector).each(function(e) {

			var xPos = $(this).attr('x');
			var yPos = $(this).attr('y');

			var xPosMobile = $(this).attr('xPosMobile');
			var yPosMobile = $(this).attr('yPosMobile');

			if( $theWidth > 580 ) {
				xPos = xPos / imageWidth * bannerWidth;
				yPos = yPos / imageHeight * bannerHeight;
				$(this).css({
					// 'top': yPos - $topspot,
					// 'left': xPos - $leftspot,
					'top': yPos,
					'left': xPos,
					'display': 'block',
				});
				
			} else {
				xPosMobile = xPosMobile / imageWidth * bannerWidth;
				yPosMobile = yPosMobile / imageHeight * bannerHeight;

				$(this).css({
					// 'top': yPos - $topspot,
					// 'left': xPos - $leftspot,
					'top': yPosMobile,
					'left': xPosMobile,
					'display': 'block',
				});
			}		
			
			$(this).children(options.tooltipselector).css({
				'margin-left': - ($(this).children(options.tooltipselector).width() / 2)
			});
		});
	}

	// Bind the events (hover or click) for the tooltip
	function _bindHotspots(e, options) {
			if ($(e).children(options.tooltipselector).is(':visible')) {
				$(e).children(options.tooltipselector).css('display', 'none');
			} else {
				$(options.selector + ' '  + options.tooltipselector).css('display', 'none');
				$(e).children(options.tooltipselector).css('display', 'block');
				if ($(window).width() - ($(e).children(options.tooltipselector).offset().left + $(e).children(options.tooltipselector).outerWidth()) < 0) {
					$(e).children(options.tooltipselector).css({
						'right': '0',
						'left': 'auto',
					});
				}
			}
	}
	
	$.fn.hotSpot = function( options ) {
 
    // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object – this is to keep from overriding our "defaults" object.
    var _options = $.extend( {}, $.fn.hotSpot.defaults, options );
 
		// Position each hotspot
		this.each(function() {
				_positionHotspots.call($(this), _options);
		});

		// Bind the windows resize event to recalculate the hotspot position
		$(window).resize(function() {
				this.each(function() {
						_positionHotspots.call($(this), _options);
				});
		}.bind(this));

		// Bind the hover/click for selector to show the tooltip
		switch (_options.bindselector) {
			case 'click':
				$(_options.selector).bind ('click', function(e){_bindHotspots(e.currentTarget, _options)});
				break;
			case 'hover':
				$(_options.selector).hover (function(e){_bindHotspots(e.currentTarget, _options)});
				break;
			default:
				break;
		}
		
		return this;
	};
	
	// Plugin defaults
	$.fn.hotSpot.defaults = {
		mainselector: '#hotspotImg',
		selector: '.hot-spot',
		imageselector: '.img-responsive',
		tooltipselector: '.tooltip',
		bindselector: 'hover'
	};
}(jQuery));
