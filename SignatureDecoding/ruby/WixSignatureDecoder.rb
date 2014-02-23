def parse_instance_data(signed_instance)
    APP_SECRET = 'YOUR_APP_SECRET_GOES_HERE'
    signature, encoded_json = signed_instance.split('.', 2)
 
    # Need to add Base64 padding to make base64 decode work in Ruby. (ref: http://stackoverflow.com/questions/4987772/decoding-facebooks-signed-request-in-ruby-sinatra)
 
    encoded_json_hack = encoded_json + ('=' * (4 - encoded_json.length.modulo(4)))
 
    json_str = Base64.urlsafe_decode64(encoded_json_hack)
 
    hmac = OpenSSL::HMAC.digest(OpenSSL::Digest::SHA256.new, APP_SECRET, encoded_json)
 
    # bug in ruby. why are there '=' chars on urlsafe_encode ?!
 
    my_signature = Base64.urlsafe_encode64(hmac).gsub('=','')
 
    raise "the signatures do not match" if (signature != my_signature)
 
    JSON.parse(json_str)
 
end