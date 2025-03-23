INSERT INTO "account" (account_firstname,account_lastname,account_email,account_password) VALUES('Tony','Stark','tony@starkent.com','Iam1ronM@n');

UPDATE "account" SET account_type = 'Admin' WHERE account_id = 1;

DELETE FROM "account" WHERE account_id = 1;

UPDATE "inventory" SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior') WHERE inv_id = 10;

SELECT a.inv_make, a.inv_model, b.classification_name FROM inventory a INNER JOIN classification b ON a.classification_id = b.classification_id WHERE b.classification_name = 'Sport'; 

UPDATE "inventory" SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'), inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');

