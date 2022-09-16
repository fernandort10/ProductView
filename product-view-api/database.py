
from productModel import Products
from userModel import Users
import motor.motor_asyncio


#Conexion to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://admin:admin@cluster0.eidgk04.mongodb.net/test')


database = client.ProductView


# Products Collection
collection = database.Products

async def fetch_one_product(name):
    document = await collection.find_one({"name":name})
    return document

async def fetch_all_products():
    products = []
    cursor = collection.find({})
    async for document in  cursor:
        products.append(Products(**document))
    return products

async def create_product(product):
    document = product
    result = await collection.insert_one(document)
    return document

async def update_product(name, price):
    await collection.update_one({"name":name},{"$set":{
        "price":price} })
    document = await collection.find_one({"name": name})
    return document

async def remove_product(name):
    await collection.delete_one({"name":name})
    return True

# Users Collection

collection2 = database.Users

async def create_user(user):
    document = user
    result = await collection2.insert_one(document)
    return document

async def fetch_user(username, password):
    document = await collection2.find_one({"username": username, "password":password})
    
    return document