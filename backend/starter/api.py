from django.db.utils import IntegrityError
from django.http import JsonResponse
from ninja import Router
from ninja.errors import HttpError, ValidationError, AuthenticationError
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_jwt.authentication import JWTAuth
from ninja_extra import NinjaExtraAPI


from users.models import User

from .schema import SignUpInput, SignUpOutput, UserSchema


api = NinjaExtraAPI(auth=JWTAuth())
api.register_controllers(NinjaJWTDefaultController)
router = Router()


@api.exception_handler(AuthenticationError)
def authentication_error(request, exc):
    try:
        (message, ) = exc.args
        return JsonResponse({"detail": message}, status=401)
    except ValueError:
        return JsonResponse({"detail": "Authentication error"}, status=401)



@router.post("/signup", auth=None, response=SignUpOutput)
def signup(request, data: SignUpInput):
    if not data.passwordsMatch():
        raise ValidationError("Passwords should match.")
    try:
        user = User.objects.create(username=data.username)
        user.set_password(data.password)
        user.save()
    except IntegrityError:
        raise ValidationError("Username is already taken.")
    except Exception:
        raise HttpError(500, "Server error.")
    return user


@router.get("/me", response=UserSchema)
def me(request):
    return request.user


api.add_router("", router)
