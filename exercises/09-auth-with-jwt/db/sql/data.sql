truncate table "users" restart identity;
truncate table "products" restart identity;

INSERT INTO "products" ("name", "description")
VALUES  ('Paper Weight', 'A hevy object used for holding down paper.'),
        ('Roadrunner Trap', 'A device for capturing the roadrunner.'),
        ('Sticky Notes', 'A small square piece of paper that can be stuck to things.'),
        ('Fedora', 'A stylish hat'),
        ('Electric Guitar', 'A guitar that uses electricity'),
        ('Phillips Head Screwdriver', 'The one that is a plus'),
        ('Oversized Target', 'Large oversized target'),
        ('Baseball Hat', 'A hat in the style of baseball'),
        ('Top Hat', 'Tall cylindrical hat'),
        ('Piano', 'A large wood box with 88 keys'),
        ('Paper', 'Used for writing'),
        ('Trucker Hat', 'A hat worn by truckers'),
        ('Needle Nose Pliers', 'Really pointy pliers'),
        ('Hammer', 'Used for driving nails'),
        ('Anvil', 'Large heavy metal object that often falls from sky.'),
        ('Drums', 'The coolest of the instruments');
