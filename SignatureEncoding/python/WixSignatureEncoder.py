import base64
from collections import OrderedDict
from datetime import datetime
import hashlib
import hmac
import itertools
import urllib
import pytz

API_HOST = 'openapi.wix.com'
API_PORT = 443
API_VERSION = '1.0.0'



def add_signature_header(http_headers, signature):
    http_headers['x-wix-signature'] = signature


def generate_string_to_be_signed(method, path, parameters, body, http_headers):
        sorted_request_parameters = OrderedDict(
            sorted(itertools.chain({'version': API_VERSION}.iteritems(),
                                    parameters.iteritems(),
                                    http_headers.iteritems()))
        )

        return '\n'.join([method, path] +
                         sorted_request_parameters.values() +
                         ([body] if body else []))


def sign(to_sign, secret_key):
    return hmac.new(str(secret_key), msg=str(to_sign), digestmod=hashlib.sha256).digest()


def remove_padding(signature):
    return signature.replace('=', '')



def add_parameters_to_path(path, parameters):
    return path + "?" + \
        urllib.urlencode(dict(itertools.chain(parameters.iteritems(), [('version', API_VERSION)])))


#
# This function generates the list of headers that are to be sent via HTTP to the api
#
def create_http_headers(app_key, instance_id):
    return {
        'x-wix-application-id': app_key,
        'x-wix-instance-id': instance_id,
        'x-wix-timestamp': datetime.now(pytz.utc).isoformat(),
    }


#
# This is the function that does the calculation of the signature
# Note that the http headers it accepts is the list created by the above 'create_headers'
# function
#
def calculate_signature(method, path, parameters, body, http_headers, secret_key):
    to_sign = generate_string_to_be_signed(method, path, parameters, body, http_headers)

    signed = sign(to_sign, secret_key)

    encoded = base64.urlsafe_b64encode(signed)

    encoded_without_padding = remove_padding(encoded)

    return encoded_without_padding


#
# Use this function to create the http headers (including the signature header)
# that is to be sent via HTTP in the api call. The function also returns
# the modified path that is to be used in the HTTP call
#
def create_http_data(app_key, secret_key, instance_id, path, parameters, body, method):
    http_headers = create_http_headers(app_key, instance_id)
    signature = calculate_signature(method, path, parameters, body, http_headers, secret_key)
    add_signature_header(http_headers, signature)
    path = add_parameters_to_path(path, parameters)
    return http_headers, path
