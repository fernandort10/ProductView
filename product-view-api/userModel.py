from pydantic import BaseModel

class Users(BaseModel):
    username: str
    password: str
    name: str
    lastName: str
    disabled: bool
    firstLogin: bool
    creadedDate: str
    isAdmin : bool
    email : str