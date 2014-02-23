public static function &isWixRequest() {
 
    list( $code, $data ) = explode( '.', $_GET[ 'instance' ] );
 
    if ( base64_decode( strtr( $code, "-_", "+/" ) ) != hash_hmac( "sha256", $data, '[APP_SECRET]', TRUE ) ) {
        die();  // Report error
    }
 
    if ( ( $json = json_decode( base64_decode( $data ) ) ) === null ) {
        die();  // Report error
    }
    return $json;
}