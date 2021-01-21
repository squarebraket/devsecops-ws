--liquibase formatted sql

--changeset ppl:1
create table member (
                       member_id text,
                       last_name text,
                       first_name text,
                       status text,
                       points integer
);

create table status_level (
  key text,
  value text
)
