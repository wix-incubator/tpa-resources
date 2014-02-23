function encode_signature($application_id, $instance_id, $method, $request_path, $query_params, $post_params, $body = '')
{
    $request_params = array_merge($query_params, $post_params);
    ksort($request_params);

    $request_params[] = $application_id;
    $request_params[] = $instance_id;
    $request_params[] = date('c'); // ISO 8601 (added in PHP 5)

    $signature_string = strtoupper($method) . "\n$request_path\n";
    foreach ($request_params as $request_param)
    {
        switch(gettype($request_param))
        {
        	case 'boolean':
                $signature_string .= $request_param ? "true\n" : "false\n";
        		break;
        	default:
                $signature_string .= strval($request_param) . "\n";
        		break;
        }
    }
    $signature_string .= $body;

    $encoded_signature = strtr(base64_encode(hash_hmac("sha256", $signature_string, '[APP_SECRET]', TRUE)), '+/', '-_');
    while(substr($encoded_signature, -1) == '=')
    {
        $encoded_signature = substr($encoded_signature, 0, -1);
    }

    return $encoded_signature;
}
