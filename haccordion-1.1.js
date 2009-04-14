/*
**	Project:	Horizontal Accordion (hAccodrion)
**	Version:	v1.1
**	Author:		Collin Klopfenstein
**				collink@kulerwerks.com
*/
( function ( ) {
	$.fn.hAccordion = function ( settings ) {
		var options = $.extend( {
			section: 'section',
			label: 'label',
			duration: 750,
			easing: 'swing',
			callback: null,
			selected: null
		}, settings );
		
		var height = 0;
		var width = $(this).width( );
		var labelWidth = $('.' + options.label).width( );
		var children = $(this).children( '.' + options.section );
		var free = width - ( labelWidth * children.length );
		
		$(this).css( {
			position: 'relative',
			overflow: 'hidden'
		} );
		
		var getPosition = function ( section ) {
			var i = 0, pos = 0;
			$(children).each( function ( ) {
				if ( this == section[0] ) {
					pos = i;
				}
					
				i ++;
			} );
			return pos;
		};
		
		var activate = function ( section ) {
			var pos = getPosition( section );
			if ( section.length > 0 && !window.accordionExpanding ) {
				window.accordionExpanding = true;
				window.accordionSections = children.length;
				window.sectionsFinished = 0;
				
				var hit = false;
				$(children).each( function ( i ) {
					var tmp = this;
					if ( !hit ) {
						$(this).animate( { left: ( i * labelWidth ) }, options.duration, options.easing, function ( ) { window.sectionsFinished ++; if ( window.sectionsFinished == window.accordionSections ) { window.accordionExpanding = false; } if ( typeof options.callback == 'function' ) { options.callback.call( tmp ); } } );
					} else {
						$(this).animate( { left: ( i * labelWidth ) + $(this).width( ) - labelWidth }, options.duration, options.easing, function ( ) { window.sectionsFinished ++; if ( window.sectionsFinished == window.accordionSections ) { window.accordionExpanding = false; } if ( typeof options.callback == 'function' ) { options.callback.call( tmp ); } } );
					}
					
					if ( this == section[0] ) {
						hit = true;
					}
				} );
			}
		};
		
		$(children).each( function ( i ) {
			$(this).css( {
				position: 'absolute',
				left: i === 0 ? 0 : ( free + ( i * labelWidth ) ),
				width: free + labelWidth
			} );
			$(this).children( '.label' ).css( 'float', 'left' ).css( 'cursor', 'pointer' );
			$(this).children( '.content' ).css( {
				'float': 'left',
				width: free - labelWidth - ( $('.section .content').css( 'padding-left' ).replace( /px/, '' ) * 2 )
			} );
			
			$(this).children( '.content' ).each( function ( ) {
				height = height > $(this).height( ) ? height : $(this).height( );
			} );

			$(this).children( '.label' ).click( function ( ) {
				activate( $(this).parent( ) );
			} ).focus( function ( ) { $(this)[0].blur( ); } );
		} );

		if ( height > $(this).height( ) ) {
			$(this).css( 'height', height );
		}
		
		if ( options.selected ) {
		    $( function ( ) {
		        activate( $(options.selected) );
		    } );
	    }
	};
} )(jQuery);