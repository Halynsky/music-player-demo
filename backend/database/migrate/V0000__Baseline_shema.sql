create table session (
    sid varchar NOT null COLLATE "default",
    sess json NOT null,
    expire timestamp(6) NOT null
)
WITH (OIDS=false);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" primary key ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


create table users
(
	id bigserial not null
		constraint users_pkey
			primary key,
	social_id varchar(256) not null,
	name varchar(32) not null,
	registration_date timestamp default timezone('utc'::text, now()),
	role varchar(16) default 'USER'::character varying
)
;

create unique index users_social_id_uindex
	on users (social_id)
;

create table tracks
(
	id bigserial not null
		constraint tracks_pkey
			primary key,
	name varchar(256) not null,
	artist varchar(256) not null,
)
;

create table genres
(
	id varchar(32) not null
		constraint genres_pkey
			primary key
)
;




