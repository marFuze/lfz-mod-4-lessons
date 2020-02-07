drop table if exists "users";
drop table if exists "products";

create table "users" (
  "userId"      serial,
  "name"        text not null,
  "email"       text not null unique,
  "password"    text not null,
  "createdAt"   timestamptz(6) not null default now()
);

create table "products" (
  "productId"   serial,
  "name"        text not null,
  "description" text not null,
  "createdAt"   timestamptz(6) not null default now()
);
