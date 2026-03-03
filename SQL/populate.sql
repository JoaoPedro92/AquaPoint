-- -------------------------------------------------------
-- TYPES
-- -------------------------------------------------------
insert into type (id, type_name) values (1, 'Humano');
insert into type (id, type_name) values (2, 'Animais');
insert into type (id, type_name) values (3, 'Ambos');

-- -------------------------------------------------------
-- STATES
-- -------------------------------------------------------
insert into states (id, state_name) values (1, 'Necessita manutenção');
insert into states (id, state_name) values (2, 'Bom estado');
insert into states (id, state_name) values (3, 'Pendente');

-- -------------------------------------------------------
-- TRUST LEVEL
-- -------------------------------------------------------
insert into trustLevels (id, trust_name) values (1, 'Apagar');
insert into trustLevels (id, trust_name) values (2, 'Existe mas com pouca certeza');
insert into trustLevels (id, trust_name) values (3, 'Existe com alguma certeza');
insert into trustLevels (id, trust_name) values (4, 'Verificado');

-- -------------------------------------------------------
-- ZONE
-- -------------------------------------------------------
insert into zone (id, zone_name) values (1, 'Norte');
insert into zone (id, zone_name) values (2, 'Centro');
insert into zone (id, zone_name) values (3, 'Lisboa');
insert into zone (id, zone_name) values (4, 'Alentejo');
insert into zone (id, zone_name) values (5, 'Algarve');

-- -------------------------------------------------------
-- LOCAL
-- -------------------------------------------------------
insert into local (id, local_name, zone_id) values (1, 'Porto', 1);
insert into local (id, local_name, zone_id) values (2, 'Braga', 1);
insert into local (id, local_name, zone_id) values (3, 'Coimbra', 2);
insert into local (id, local_name, zone_id) values (4, 'Lisboa', 3);
insert into local (id, local_name, zone_id) values (5, 'Faro', 5);

-- -------------------------------------------------------
-- USERS
-- -------------------------------------------------------
insert into users (id, name, email, passwordHash, profilePicture, createdAt, role)
values (1, 'Admin', 'admin@aquapoint.pt', 'hashedpassword1', NULL, '2025-01-01', 1);

insert into users (id, name, email, passwordHash, profilePicture, createdAt, role)
values (2, 'User Teste', 'user@aquapoint.pt', 'hashedpassword2', NULL, '2025-01-02', 0);

-- -------------------------------------------------------
-- RATING
-- -------------------------------------------------------
insert into rating (id, rating) values (1, 1);
insert into rating (id, rating) values (2, 2);
insert into rating (id, rating) values (3, 3);
insert into rating (id, rating) values (4, 4);
insert into rating (id, rating) values (5, 5);

-- -------------------------------------------------------
-- COMMENT
-- -------------------------------------------------------
insert into comment (id, comment) values (1, 'Fonte funcional e limpa.');
insert into comment (id, comment) values (2, 'Precisa de manutenção.');
insert into comment (id, comment) values (3, 'Não encontrei no local.');

-- -------------------------------------------------------
-- AQUA_POINTS
-- -------------------------------------------------------
insert into aqua_points 
(id, point_name, point_type, local_id, image, latitude, longitude)
values 
(1, 'Fonte da Avenida', 1, 4, NULL, 38.7169, -9.1399);

insert into aqua_points 
(id, point_name, point_type, local_id, image, latitude, longitude)
values 
(2, 'Bebedouro Parque Central', 3, 1, NULL, 41.1579, -8.6291);

-- -------------------------------------------------------
-- POINTS_STATE
-- -------------------------------------------------------
insert into points_state (id, point_id, state_id)
values (1, 1, 2);

insert into points_state (id, point_id, state_id)
values (2, 2, 1);

-- -------------------------------------------------------
-- POINTS_TRUST
-- -------------------------------------------------------
insert into points_trust (id, point_id, trust_id)
values (1, 1, 3);

insert into points_trust (id, point_id, trust_id)
values (2, 2, 2);

-- -------------------------------------------------------
-- FAVORITES
-- -------------------------------------------------------
insert into favorites (id, user_id, point_id, date)
values (1, 2, 1, '2025-02-01');

-- -------------------------------------------------------
-- INTERACTION
-- -------------------------------------------------------
insert into interaction
(id, interaction_type, user_id, rating_id, comment_id, point_id, createdAt)
values
(1, 1, 2, 4, 1, 1, '2025-02-02');

commit;