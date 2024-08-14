from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True

class GameBase(BaseModel):
    name: str
    category_id: int

class GameCreate(GameBase):
    pass

class Game(GameBase):
    id: int
    last_played: Optional[datetime]
    play_count: int
    category: Category

    class Config:
        orm_mode = True
