from ninja import Schema


class SignUpInput(Schema):
    username: str
    password: str
    confirmPassword: str

    def passwordsMatch(self):
        return self.password == self.confirmPassword


class SignUpOutput(Schema):
    id: int
    username: str


class LoginInput(Schema):
    username: str
    password: str


class UserSchema(Schema):
    username: str
