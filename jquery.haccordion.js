/*
**	Project:	Horizontal Accordion (hAccodrion)
**	Version:	v1.0
**	Author:		Collin Klopfenstein
**				collink@kulerwerks.com
*/
( function ( ) {
	$.fn.hAccordion = function ( settings ) {
		var options = $.extend( {
			section: 'section',
			label: 'label',
			container: 'sections'
		}, settings );
		
		var height = $(this).height( );
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
					if ( !hit ) {
						$(this).animate( { left: ( i * labelWidth ) }, function ( ) { window.sectionsFinished ++; if ( window.sectionsFinished == window.accordionSections ) { window.accordionExpanding = false; } } );
					} else {
						$(this).animate( { left: ( i * labelWidth ) + $(this).width( ) - labelWidth }, function ( ) { window.sectionsFinished ++; if ( window.sectionsFinished == window.accordionSections ) { window.accordionExpanding = false; } } );
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
				width: free - labelWidth - ( $('.section .content').css( 'padding-left' ).replace( /px/, '' ) * 2 ),
			} );
			
			$(this).children( ).each( function ( ) {
				height = height > $(this).height( ) ? height : $(this).height( );
			} );

			$(this).children( '.label' ).click( function ( ) {
				activate( $(this).parent( ) );
			} );
		} );
		
		if ( height > $(this).height( ) ) {
			$(this).css( 'height', height );
		}
	};
} )(jQuery);