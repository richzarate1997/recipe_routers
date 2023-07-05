-- -----------------------------------------------------
-- Schema recipe_list_test
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `recipe_list_test`;
CREATE DATABASE `recipe_list_test`;
USE `recipe_list_test`;

-- -----------------------------------------------------
-- Table `recipe_list_test`.`app_user`
-- -----------------------------------------------------
CREATE TABLE `app_user` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(2048) NOT NULL,
  `enabled` BIT(1) NOT NULL DEFAULT 1
  );

-- -----------------------------------------------------
-- Table `recipe_list_test`.`app_role`
-- -----------------------------------------------------
CREATE TABLE `app_role` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE
);

-- -----------------------------------------------------
-- Table `recipe_list_test`.`app_user_role`
-- -----------------------------------------------------
CREATE TABLE `app_user_role` (
  `app_user_role_id` INT NOT NULL,
  `app_user_id` INT NOT NULL,
  CONSTRAINT `pk_app_user_role`
	PRIMARY KEY (`app_user_role_id`, `app_user_id`),
  CONSTRAINT `fk_app_user_role`
    FOREIGN KEY (`app_user_role_id`)
    REFERENCES `app_role`(`id`),
  CONSTRAINT `fk_app_user_role_user`
    FOREIGN KEY (`app_user_id`)
    REFERENCES `app_user`(`id`)
);

-- -----------------------------------------------------
-- Table `recipe_list_test`.`user`
-- -----------------------------------------------------
CREATE TABLE `user` (
  `app_user_id` INT NOT NULL,
  `display_name` VARCHAR(25) NOT NULL,
  `is_metric` BIT(1) NOT NULL DEFAULT 1,
  CONSTRAINT `pk_user_id`
	PRIMARY KEY (`app_user_id`),
  CONSTRAINT `fk_user_app_user_id`
	FOREIGN KEY (`app_user_id`)
    REFERENCES `app_user`(`id`)
  );

-- -----------------------------------------------------
-- Table `recipe_list_test`.`recipe`
-- -----------------------------------------------------
CREATE TABLE `recipe` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_app_user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `image` BLOB NULL,
  `instructions` TEXT(1000) NOT NULL,
  `vegetarian` BIT(1) NOT NULL DEFAULT 0,
  `vegan` BIT(1) NOT NULL DEFAULT 0,
  `gluten_free` BIT(1) NOT NULL DEFAULT 0,
  `dairy_free` BIT(1) NOT NULL DEFAULT 0,
  `servings` INT NOT NULL,
  `src_url` VARCHAR(255) NOT NULL,
  `cook_minutes` INT NOT NULL,
  CONSTRAINT `fk_user_app_user`
	FOREIGN KEY (`user_app_user_id`)
    REFERENCES `user`(`app_user_id`)
  );


-- -----------------------------------------------------
-- Table `recipe_list_test`.`user_favorite`
-- -----------------------------------------------------
CREATE TABLE `user_favorite` (
  `recipe_id` INT NOT NULL,
  `user_app_user_id` INT NOT NULL,
  CONSTRAINT `pk_user_favorite`
	PRIMARY KEY (`recipe_id`, `user_app_user_id`),
  CONSTRAINT `fk_user_has_favorite`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe`(`id`),
  CONSTRAINT `fk_favorite_has_user`
    FOREIGN KEY (`user_app_user_id`)
    REFERENCES `user`(`app_user_id`)
);


-- -----------------------------------------------------
-- Table `recipe_list_test`.`ingredient`
-- -----------------------------------------------------
CREATE TABLE `ingredient` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `aisle` VARCHAR(45) NULL
);


-- -----------------------------------------------------
-- Table `recipe_list_test`.`unit`
-- -----------------------------------------------------
CREATE TABLE `unit` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(15) NOT NULL,
  `abbrev` VARCHAR(10) NOT NULL
  );

-- -----------------------------------------------------
-- Table `recipe_list_test`.`recipe_ingredient`
-- -----------------------------------------------------
CREATE TABLE `recipe_ingredient` (
  `recipe_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `unit_id` INT NOT NULL,
  `quantity` DECIMAL(7,4) NOT NULL,
  CONSTRAINT `pk_recipe_ingredient`
	PRIMARY KEY (`recipe_id`, `ingredient_id`, `unit_id`),
  CONSTRAINT `fk_recipe_ingredient_recipe`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe`(`id`),
  CONSTRAINT `fk_recipe_ingredient_ingredient`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `ingredient`(`id`),
  CONSTRAINT `fk_recipe_ingredient_unit`
    FOREIGN KEY (`unit_id`)
    REFERENCES `unit`(`id`),
  CONSTRAINT `uq_recipe_ingredient_recipe_id_ingredient_id`
	UNIQUE (`recipe_id`, `ingredient_id`)
);

-- -----------------------------------------------------
-- Table `recipe_list_test`.`grocery_list`
-- -----------------------------------------------------
CREATE TABLE `grocery_list` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_app_user_id` INT NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  CONSTRAINT `fk_grocery_list_user`
	FOREIGN KEY (`user_app_user_id`)
	REFERENCES `user`(`app_user_id`)
);

-- -----------------------------------------------------
-- Table `recipe_list_test`.`grocery_list_ingredient`
-- -----------------------------------------------------
CREATE TABLE `grocery_list_ingredient` (
  `ingredient_id` INT NOT NULL,
  `grocery_list_id` INT NOT NULL,
  CONSTRAINT `pk_grocery_list_ingredient`
	PRIMARY KEY (`grocery_list_id`, `ingredient_id`),
  CONSTRAINT `fk_grocery_list_ingredient_ingredient`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `ingredient`(`id`),
  CONSTRAINT `fk_grocery_list_ingredient_list`
    FOREIGN KEY (`grocery_list_id`)
    REFERENCES `grocery_list`(`id`)
);


-- -----------------------------------------------------
-- Table `recipe_list_test`.`cuisine`
-- -----------------------------------------------------
CREATE TABLE `cuisine` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL
);


-- -----------------------------------------------------
-- Table `recipe_list_test`.`recipe_cuisine`
-- -----------------------------------------------------
CREATE TABLE `recipe_cuisine` (
  `cuisine_id` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  CONSTRAINT `pk_recipe_cuisine`
	PRIMARY KEY (`cuisine_id`, `recipe_id`),
  CONSTRAINT `fk_recipe_cuisine`
    FOREIGN KEY (`cuisine_id`)
    REFERENCES `cuisine`(`id`),
  CONSTRAINT `fk_cuisine_has_recipe`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe`(`id`)
);

DELIMITER //
CREATE PROCEDURE set_known_good_state()
BEGIN

	SET sql_safe_updates = 0;
	DELETE FROM `app_user_role`;
    DELETE FROM `recipe_cuisine`;
    DELETE FROM `recipe_ingredient`;
    DELETE FROM `grocery_list_ingredient`;
    DELETE FROM `user_favorite`;
    DELETE FROM `recipe`;
	ALTER TABLE `recipe` AUTO_INCREMENT = 1;
    DELETE FROM `grocery_list`;
	ALTER TABLE `grocery_list` AUTO_INCREMENT = 1;
    DELETE FROM `user`;
    DELETE FROM `app_user`;
	ALTER TABLE `app_user` AUTO_INCREMENT = 1;
    DELETE FROM `app_role`;
	ALTER TABLE `app_role` AUTO_INCREMENT = 1;
    DELETE FROM `ingredient`;
	ALTER TABLE `ingredient` AUTO_INCREMENT = 1;
    DELETE FROM `unit`;
	ALTER TABLE `unit` AUTO_INCREMENT = 1;
    DELETE FROM `cuisine`;
	ALTER TABLE `cuisine` AUTO_INCREMENT = 1;
    SET sql_safe_updates = 1;


	INSERT INTO `app_role` (`name`) VALUE
		('USER'),
		('ADMIN');

	-- passwords are set to "P@ssw0rd!"
	INSERT INTO `app_user` (username, password_hash, enabled)
		VALUES
		('admin@reciperouters.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
		('test@user.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
        ('another@user.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

	INSERT INTO `app_user_role`
		VALUES 
		(1, 2), 
		(2, 1);

	INSERT INTO `user` (`app_user_id`, `display_name`, `is_metric`)
		VALUES
		(1, 'ADMIN', 1),
		(2, 'TESTER', 0);

	INSERT INTO `unit` (`id`, `name`, `abbrev`)
		VALUES
		(1, 'fluid ounce','fl oz'),
		(2, 'ounce','oz'),
		(3, 'tablespoon','tbsp'),
		(4, 'cup','c'),
		(5, 'pint','pt'),
		(6, 'quart','qt'),
		(7, 'gallon','gal'),
		(8, 'teaspoon','tsp'),
		(9, 'pound','lb'),
		(10, 'milliliter','mL'),
		(11, 'liter','L'),
		(12, 'gram','g'),
		(13, 'kilogram','kg'),
        (14, 'count', 'ct');
        
	INSERT INTO `cuisine` (`id`, `name`)
		VALUES
        (1, 'Italian'),
        (2, 'Mexican'),
        (3, 'Vietnamese'),
        (4, 'Greek'),
        (5, 'Southern');
        
	INSERT INTO `ingredient` (`id`, `name`, `image_url`, `aisle`)
		VALUES
        (1, 'Cheese', 'https://cheese.com/cheese.jpg', 'Dairy'),
        (2, 'Dough', 'http://bread.com/bread.jpg', 'Bakery'),
        (3, 'Tomato', 'https://tomato.com/tomato.jpg', 'Produce'),
        (4, 'Bell Pepper', 'http://google.com/pepper.jpg', 'Produce');
	
	INSERT INTO `ingredient` (`id`, `name`, `image_url`)
		VALUES -- ingredient with null aisle
        (5, 'Corn Tortilla', 'http://bread.com/bread.jpg');
        
	INSERT INTO `recipe` (`id`, `user_app_user_id`, `title`, `image_url`, `image`, `instructions`, `vegetarian`, `vegan`, `gluten_free`, `dairy_free`, `servings`, `src_url`, `cook_minutes`)
		VALUES
		(1, 2, 'Pepper Pizza', 'Fresh-Veggie-Pizza-394118.jpg', null, 'Mix ingredients together and throw in the oven at 400 for 20 minutes', 1, 0, 0, 0, 4, 'https://recipes.com/pepper-pizza', 45),
        (2, 1, 'Pepper Tacos', '', '010101011101011101011110101110101100010100010100101', 'Make tacos for dinner, and enjoy them.', 1, 0, 1, 0, 6, '', 90);
        
	INSERT INTO `recipe_ingredient` (`recipe_id`, `ingredient_id`, `unit_id`, `quantity`)
		VALUES
        (1, 2, 2, 16),
        (1, 1, 4, 1.5),
        (1, 3, 9, 0.5),
        (1, 4, 9, 0.3),
        (2, 5, 14, 12),
        (2, 3, 14, 1),
        (2, 1, 4, 16),
        (2, 4, 14, 1);
        
	INSERT INTO `recipe_cuisine` (`cuisine_id`, `recipe_id`)
		VALUES
        (1, 1), (2, 2);
        
	INSERT INTO `user_favorite` (`recipe_id`, `user_app_user_id`)
		VALUES
        (1, 1), (2, 1);
        
	INSERT INTO `grocery_list` (`id`, `user_app_user_id`, `name`)
		VALUES
        (1, 1, 'Main'),
        (2, 1, 'Pepper Tacos'),
        (3, 2, 'Main');
        
	INSERT INTO `grocery_list_ingredient` (`ingredient_id`, `grocery_list_id`)
		VALUES
        (1, 2),
        (3, 2),
        (4, 2),
        (5, 2),
        (1, 1),
        (1, 3);
        
END //
DELIMITER ;
