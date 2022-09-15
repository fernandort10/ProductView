
from math import prod
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import(
    fetch_one_product,
    fetch_all_products,
    create_product,
    update_product,
    remove_product,
    create_user,
    fetch_user
)
from productModel import Products
from userModel import Users

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

#Products

@app.get("/api/products")
async def get_products():
    response = await fetch_all_products()
    return response

@app.get("/api/products{name}", response_model=Products)
async def get_products_byId(name):
    response = await fetch_one_product(name)
    if response:
        return response
    raise HTTPException (404, f"There is no Product with this name {name}")

@app.post("/api/products", response_model=Products)
async def post_products(product:Products):
    print(product.dict())
    response = await create_product(product.dict())

    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/api/products{name}/",response_model=Products)
async def put_product(name:str, price:int):
    response = await update_product(name, price)
    if response:
        return response
    raise HTTPException (404, f"There is no Product with this name {name}")

@app.delete("/api/products{name}")
async def delete_product(name):
    response = await remove_product(name)
    if response: 
        return "Success"
    raise HTTPException (404, f"There is no Product with this name {name}")

#Users

@app.get("/api/users/{username}/{password}",response_model=Users)
async def get_user_by_username(username, password):
    response = await fetch_user(username,password)
    if response:
        return response
    raise HTTPException (404, f"There is no Product with this name {username}")

@app.post("/api/users", response_model=Users)
async def post_users(users:Users):
    print(users.dict())
    response = await create_user(users.dict())

    if response:
        return response
    raise HTTPException(400, "Something went wrong")