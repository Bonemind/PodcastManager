import database as d
import functools
from bottle import request, HTTPError

def getUserFromToken(currToken = None):
    if not currToken:
        return None

    try:
        u = d.User.get(d.User.token == currToken)
        print u.username 
    except d.User.DoesNotExist:
        return None
    return u

def authorize(role = None):
    def wrap(f):
        @functools.wraps(f)
        def wrapper(*args, **kwargs):
            print "Request:" + str(request.get_header("X-Auth-Token"))
            print role
            token = request.get_header("X-Auth-Token")
            if not token:
                raise HTTPError(401)
            token = str(request.get_header("X-Auth-Token"))
            user = getUserFromToken(token)
            if not user:
                raise HTTPError(401)
            if role:
                if not user.hasRole(role):
                    raise HTTPError(403)
            return f(*args, **kwargs)
        return wrapper
    return wrap
