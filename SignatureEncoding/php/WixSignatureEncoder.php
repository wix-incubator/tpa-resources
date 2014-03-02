function encode_signature($application_id, $instance_id, $method, $request_path, $query_params, $post_params, $body = '')
{
    $ts = date('c'); // ISO 8601 (added in PHP 5)
    $request_params = array_merge($query_params, $post_params);
    $request_params['application-id'] = $application_id;
    $request_params['instance-id'] = $instance_id;
    $request_params['timestamp'] = $ts;
    ksort($request_params);
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
    $signature_string = trim($signature_string);
    
    if($body != NULL && strlen($body) > 0) {
        $signature_string .= "\n" . $body;
    }

    $encoded_signature = strtr(base64_encode(hash_hmac("sha256", $signature_string, '[APP_SECRET]', TRUE)), '+/', '-_');
    while(substr($encoded_signature, -1) == '=')
    {
        $encoded_signature = substr($encoded_signature, 0, -1);
    }

    return array('signature' => $encoded_signature, 'timestamp' => $ts);
}
