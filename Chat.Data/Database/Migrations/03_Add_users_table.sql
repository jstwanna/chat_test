CREATE TABLE IF NOT EXISTS public.users (
	id serial NOT NULL,
	"name" text NOT NULL,
	surname text NOT NULL,
	mail text NOT NULL,
	password_salt text NOT NULL,
	password_hash text NOT NULL,
	reg_date timestamp NOT NULL DEFAULT now(),
	"role" int4 NOT NULL DEFAULT 2,
	disabled bool NOT NULL DEFAULT false,
	disabled_date timestamp NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT user_role_fk FOREIGN KEY (id) REFERENCES public.roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
