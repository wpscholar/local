<?php

ini_set( 'xdebug.var_display_max_children', - 1 ); // phpcs:ignore
ini_set( 'xdebug.var_display_max_data', - 1 ); // phpcs:ignore
ini_set( 'xdebug.var_display_max_depth', - 1 ); // phpcs:ignore

add_filter( 'https_ssl_verify', '__return_false' );


/**
 * Loads media from a remote site when on a local dev environment.
 * Eliminates the need to download the uploads directory from the remote site for testing purposes.
 */
//if ( 'example.local' === $_SERVER['HTTP_HOST'] ):
//	add_filter( 'upload_dir', function ( $uploads ) {
//		$uploads['baseurl'] = str_replace('example.local', 'example.com', $uploads['baseurl']);
//
//		return $uploads;
//	} );
//endif;
