import java.util.Arrays;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.codec.binary.Base64;

/**
 * 
 */

/**
 *
 */
public class WixSignatureDecoder {

	public final static JsonNode decodeSignature(final String signedInstance, final String secretKey) throws Exception {
		// initialization
		final SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HMACSHA256");
		final Mac mac = Mac.getInstance("HMACSHA256");
		mac.init(secretKeySpec);
		 
		// split the signed-instance
		Base64 base64 = new Base64(256, null, true);
		int idx = signedInstance.indexOf(".");
		String signature = signedInstance.substring(0, idx);
		String encodedJson = signedInstance.substring(idx+1);
		 
		 
		byte[] sig = base64.decode(signature.getBytes());
		byte[] mySig = mac.doFinal(encodedJson.getBytes());
		if (!Arrays.equals(mySig, sig))  {
		    throw new Exception("signatures do not match");
		} 
	
	    // objectMapper is jackson interface for reading JSON - one JSON serialization library in java
	    return objectMapper.readTree(new String(base64.decode(encodedJson)));
	}
}
