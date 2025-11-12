\c chatdb chat_user

CREATE TABLE IF NOT EXISTS chat_messages (
    id serial PRIMARY KEY,
    user_id varchar(255) NOT NULL,
    message text NOT NULL,
    timestamp TIMESTAMP DEFAULT current_timestamp
);

\c userdb user_user

CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);
