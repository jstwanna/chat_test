DO $$
BEGIN
IF NOT EXISTS (SELECT FROM pg_catalog.pg_tables
				WHERE schemaname = 'public'
				AND tablename = 'roles')
THEN
	CREATE TABLE public.roles (
		id serial NOT NULL,
		name text NOT NULL,
		"constraint" text NOT NULL,
		CONSTRAINT roles_pk PRIMARY KEY (id)
	);

	INSERT INTO public.roles (id, name, "constraint") VALUES (1, 'Администратор', 'ADMIN');
	INSERT INTO public.roles (id, name, "constraint") VALUES (2, 'Пользователь', 'USER');
END IF;

END $$;