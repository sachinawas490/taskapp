import jwt
from fastapi import HTTPException,Depends
from datetime import datetime,timedelta
from data import SECRET_KEY,EXPIRE_DAY,ALGORITHM
from fastapi.security import OAuth2PasswordBearer





def create_token(data:dict):
    copy_data=data.copy()
    time_to_expire=datetime.utcnow()+timedelta(days=EXPIRE_DAY)
    copy_data['exp']=time_to_expire
    return jwt.encode(copy_data,SECRET_KEY,algorithm=ALGORITHM)




get_token=OAuth2PasswordBearer(tokenUrl="login")

def verify_token(token:str=Depends(get_token)):
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        print("payload for token verification  ",payload)
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401,detail="token has expired :server side")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401,detail="invalid token :server side")
