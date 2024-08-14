# Atlas Games App

Atlas Games App is a web application for managing and tracking improv games. It allows users to create categories, add games, and track game plays.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL 12+

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/atlas-games-app.git
   cd atlas-games-app
   ```

2. Set up the backend:
   ```
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

4. Set up the database:
   - Install PostgreSQL if you haven't already
   - Create a new database:
     ```
     createdb atlas_games_db
     ```
   - Update the database connection string in `backend/app/database.py`:
     ```python
     SQLALCHEMY_DATABASE_URL = "postgresql://your_username:your_password@localhost/atlas_games_db"
     ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   uvicorn app.main:app --reload
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

The backend will be running on `http://localhost:8000` and the frontend on `http://localhost:3000`.

## Database Setup

1. Ensure PostgreSQL is installed and running
2. Create the database:
   ```
   createdb atlas_games_db
   ```
3. The application will automatically create the necessary tables when you first run the backend server

## For Users: How to Run the App

1. Ensure you have Python 3.8+, Node.js 14+, and PostgreSQL 12+ installed
2. Clone the repository:
   ```
   git clone https://github.com/yourusername/atlas-games-app.git
   cd atlas-games-app
   ```
3. Set up and start the backend:
   ```
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
4. In a new terminal, set up and start the frontend:
   ```
   cd frontend
   npm install
   npm start
   ```
5. Open a web browser and navigate to `http://localhost:3000`

Enjoy using the Atlas Games App!

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
