-- -----------------------------------------------------
-- Schema recipe_list
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `recipe_list`;
CREATE DATABASE `recipe_list`;
USE `recipe_list`;

-- -----------------------------------------------------
-- Table `recipe_list`.`app_user`
-- -----------------------------------------------------
CREATE TABLE `app_user` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(2048) NOT NULL,
  `enabled` BIT(1) NOT NULL DEFAULT 1
  );

-- -----------------------------------------------------
-- Table `recipe_list`.`app_role`
-- -----------------------------------------------------
CREATE TABLE `app_role` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE
);

-- -----------------------------------------------------
-- Table `recipe_list`.`app_user_role`
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
-- Table `recipe_list`.`user`
-- -----------------------------------------------------
CREATE TABLE `user` (
  `app_user_id` INT NOT NULL,
  `display_name` VARCHAR(255) NOT NULL,
  `is_metric` BIT(1) NOT NULL DEFAULT 1,
  CONSTRAINT `pk_user_id`
	PRIMARY KEY (`app_user_id`),
  CONSTRAINT `fk_user_app_user_id`
	FOREIGN KEY (`app_user_id`)
    REFERENCES `app_user`(`id`)
  );

-- -----------------------------------------------------
-- Table `recipe_list`.`recipe`
-- -----------------------------------------------------
CREATE TABLE `recipe` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_app_user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `image` BLOB NULL,
  `instructions` VARCHAR(255) NOT NULL,
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
-- Table `recipe_list`.`app_user_favorite`
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
-- Table `recipe_list`.`ingredient`
-- -----------------------------------------------------
CREATE TABLE `ingredient` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `aisle` VARCHAR(45) NULL
);


-- -----------------------------------------------------
-- Table `recipe_list`.`unit`
-- -----------------------------------------------------
CREATE TABLE `unit` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `abbrev` VARCHAR(10) NOT NULL
  );

-- -----------------------------------------------------
-- Table `recipe_list`.`recipe_ingredient`
-- -----------------------------------------------------
CREATE TABLE `recipe_ingredient` (
  `recipe_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `unit_id` INT NOT NULL,
  `quantity` DECIMAL(25) NOT NULL,
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
-- Table `recipe_list`.`grocery_list`
-- -----------------------------------------------------
CREATE TABLE `grocery_list` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL
);

-- -----------------------------------------------------
-- Table `recipe_list`.`grocery_list_ingredient`
-- -----------------------------------------------------
CREATE TABLE `grocery_list_ingredient` (
  `ingredient_id` INT NOT NULL,
  `user_app_user_id` INT NOT NULL,
  `list_id` INT NOT NULL,
  CONSTRAINT `pk_grocery_list_ingredient`
	PRIMARY KEY (`list_id`, `ingredient_id`, `user_app_user_id`),
  CONSTRAINT `fk_grocery_list_ingredient_ingredient`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `ingredient`(`id`),
  CONSTRAINT `fk_grocery_list__ingredient_app_user`
    FOREIGN KEY (`user_app_user_id`)
    REFERENCES `user`(`app_user_id`),
CONSTRAINT `fk_grocery_list_ingredient_list`
    FOREIGN KEY (`list_id`)
    REFERENCES `grocery_list`(`id`)
);


-- -----------------------------------------------------
-- Table `recipe_list`.`cuisine`
-- -----------------------------------------------------
CREATE TABLE `cuisine` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL
);


-- -----------------------------------------------------
-- Table `recipe_list`.`recipe_cuisine`
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

ALTER TABLE `app_user` AUTO_INCREMENT = 1;
ALTER TABLE `app_role` AUTO_INCREMENT = 1;
ALTER TABLE `recipe` AUTO_INCREMENT = 1;
ALTER TABLE `ingredient` AUTO_INCREMENT = 1;
ALTER TABLE `unit` AUTO_INCREMENT = 1;
ALTER TABLE `cuisine` AUTO_INCREMENT = 1;
ALTER TABLE `grocery_list` AUTO_INCREMENT = 1;


INSERT INTO `app_role` (`name`) VALUE
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
INSERT INTO `app_user` (username, password_hash, enabled)
    VALUES
    ('admin@reciperouters.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('test@user.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

INSERT INTO `app_user_role`
    VALUES 
    (1, 2), 
    (2, 1);

INSERT INTO `user` (app_user_id, display_name, is_metric)
	VALUES
    (1, 'ADMIN', 1),
    (2, 'TESTER', 0);

INSERT INTO `unit` (`name`, `abbrev`)
	VALUES
    ('fluid ounce','fl oz'),
    ('ounce','oz'),
    ('tablespoon','tbsp'),
    ('cup','c'),
    ('pint','pt'),
    ('quart','qt'),
    ('gallon','gal'),
    ('teaspoon','tsp'),
    ('pound','lb'),
    ('milliliter','mL'),
    ('liter','L'),
    ('gram','g'),
    ('kilogram','kg'),
	( 'count', 'ct');
