\c userdb user_user;

CREATE SEQUENCE roles_id_seq START WITH 1 INCREMENT BY 1;

create table if not exists roles (
    id   BIGINT primary key DEFAULT nextval('roles_id_seq'),
    name TEXT UNIQUE NOT NULL
)