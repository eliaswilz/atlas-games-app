-- Connect to PostgreSQL and create the database
CREATE DATABASE atlas_games_db;

-- Connect to the new database
\c atlas_games_db

-- Create tables
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    last_played TIMESTAMP,
    play_count INTEGER DEFAULT 0
);

-- Insert some sample data
INSERT INTO categories (name) VALUES ('Warm-up'), ('Short Form'), ('Long Form');
INSERT INTO games (name, category_id) VALUES
    ('Zip Zap Zop', 1),
    ('Word at a Time Story', 2),
    ('Harold', 3);
