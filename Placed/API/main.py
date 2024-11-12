from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import DuplicateKeyError
from typing import List, Optional


#swagger docs https://api-4wettnp0r-lyes-projects-bd83505c.vercel.app/docs

app = FastAPI()

uri = "mongodb+srv://lyeriff0:CVuSVLlgsxUEUTqp@placedcluster.ol0el.mongodb.net/?retryWrites=true&w=majority&appName=placedCluster"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["placedCluster"]
collection = db["companies"] 
question_collection = db["questions"]
users_collection = db["users"]

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


#company schema
class Company(BaseModel):
    id: int = None
    name: str
    icon_url: str
    questions: List[int] = Field(default_factory=list)

class AddQuestions(BaseModel):
    questions: List[int]


#question schemas
class Question(BaseModel):
    id: Optional[int] = None
    title: str
    content: str
    user_id: int


#schema for user submission form
class QuestionWithCompany(BaseModel):
    user_id: int
    title: str
    content: str
    company_name: str
    company_img_url: str

#user schemas
class UserCreate(BaseModel):
    name: str
    email_id: str
    questions: List[int] = []
    profile_pic_url: str

class UserResponse(BaseModel):
    id: int
    name: str
    email_id: str
    questions: List[int]
    profile_pic_url: str

@app.get("/")
def retuf():
    return "Hi"

@app.post("/companies/", status_code=201)
def create_company(company: Company):
    last_company = collection.find_one(sort=[("id", -1)])
    new_id = (last_company["id"] + 1) if last_company else 1
    company.id = new_id

    try:
        result = collection.insert_one(company.dict())
        return {"message": "Company created successfully", "id": company.id}
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Company with this ID already exists")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert company")

@app.get("/companies/", response_model=List[Company])
def get_companies():
    companies = list(collection.find())
    return companies

@app.get("/companies/{company_id}", response_model=Company)
def get_company(company_id: int):
    company = collection.find_one({"id": company_id})
    if company:
        return company
    else:
        raise HTTPException(status_code=404, detail="Company not found")

@app.patch("/companies/{company_id}/questions", status_code=200)
def add_questions(company_id: int, questions: AddQuestions):
    result = collection.update_one(
        {"id": company_id},
        {"$addToSet": {"questions": {"$each": questions.questions}}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")
    elif result.modified_count == 0:
        raise HTTPException(status_code=304, detail="No questions added; they may already exist in the list.")
    
    return {"message": "Questions added successfully"}

@app.delete("/companies/{company_id}", status_code=200)
def delete_company(company_id: int):
    result = collection.delete_one({"id": company_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"message": "Company deleted successfully"}

@app.post("/questions/", status_code=201)
def create_question(question: Question):
    last_question = question_collection.find_one(sort=[("id", -1)])
    new_id = (last_question["id"] + 1) if last_question else 1
    question.id = new_id

    try:
        question_collection.insert_one(question.dict())
        return {"message": "Question created successfully", "id": question.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert question")

@app.delete("/questions/{question_id}", status_code=200)
def delete_question(question_id: int):
    result = question_collection.delete_one({"id": question_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"message": "Question deleted successfully"}

@app.get("/questions/{question_id}", response_model=Question)
def get_question(question_id: int):
    qustion = question_collection.find_one({"id": question_id})
    if qustion:
        return qustion
    else:
        raise HTTPException(status_code=404, detail="Question not found")

@app.get("/questions/", response_model=List[Question])
def get_questions():
    questions = list(question_collection.find())
    return questions

@app.post("/users/", response_model=UserResponse, status_code=201)
def create_user(user: UserCreate):
    last_user = users_collection.find_one(sort=[("id", -1)])
    new_user_id = (last_user["id"] + 1) if last_user else 1
    user_document = {
        "id": new_user_id,
        "name": user.name,
        "email_id": user.email_id,
        "questions": user.questions,
        "profile_pic_url": user.profile_pic_url
    }

    try:
        users_collection.insert_one(user_document)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert user")

    return UserResponse(**user_document)

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    user = users_collection.find_one({"id": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return UserResponse(**user)

@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int):
    result = users_collection.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}

@app.post("/questions_with_company/", status_code=201)
def add_question_with_company(question_data: QuestionWithCompany):
    last_question = question_collection.find_one(sort=[("id", -1)])
    new_question_id = (last_question["id"] + 1) if last_question else 1
    question_document = {
        "id": new_question_id,
        "user_id": question_data.user_id,
        "title": question_data.title,
        "content": question_data.content
    }
    
    try:
        question_collection.insert_one(question_document)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert question")

    existing_company = collection.find_one({"name": question_data.company_name})

    if existing_company:
        collection.update_one(
            {"name": question_data.company_name},
            {"$addToSet": {"questions": new_question_id}}
        )
    else:
        last_company = collection.find_one(sort=[("id", -1)])
        new_company_id = (last_company["id"] + 1) if last_company else 1
        company_document = {
            "id": new_company_id,
            "name": question_data.company_name,
            "icon_url": question_data.company_img_url,
            "questions": [new_question_id]
        }

        try:
            collection.insert_one(company_document)
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to insert company")

    user = users_collection.find_one({"id": question_data.user_id})
    if user:
        users_collection.update_one(
            {"id": question_data.user_id},
            {"$addToSet": {"questions": new_question_id}}
        )
    else:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "message": "Question added and company/user updated successfully",
        "question_id": new_question_id,
        "company_name": question_data.company_name
    }
