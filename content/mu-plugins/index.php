<?php

ini_set( 'xdebug.var_display_max_children', - 1 ); // phpcs:ignore
ini_set( 'xdebug.var_display_max_data', - 1 ); // phpcs:ignore
ini_set( 'xdebug.var_display_max_depth', - 1 ); // phpcs:ignore

add_filter( 'https_ssl_verify', '__return_false' );
