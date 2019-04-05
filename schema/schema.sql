/*
For example, files could be named using sequence number:
001_add_discounted_amount_to_products.sql
002_add_total_amount_to_orders.sql
003_patch_products_default_discounted_amount.sql
*/

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(22) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE templates (
    id BIGINT AUTO_INCREMENT NOT NULL,
    temp_name VARCHAR(255),
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE template_pdfs (
    id BIGINT AUTO_INCREMENT NOT NULL,
    temp_id BIGINT NOT NULL,
    pdf_name VARCHAR(255) NOT NULL,
    pdf_sequence INT(8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE fill_infos (
    id BIGINT AUTO_INCREMENT NOT NULL,
    pdf_id BIGINT NOT NULL,
    label VARCHAR(255) NOT NULL,
    label_value VARCHAR(255) NOT NULL,
    x_position INT(5) NOT NULL,
    y_position INT(5) NOT NULL,
    type VARCHAR(255) NULL,
    input_type VARCHAR(255) NULL,
    min INT(5) NULL,
    max INT(5) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

alter table templates add foreign key (user_id) references users(id) on delete cascade;
alter table template_pdfs add foreign key (temp_id) references templates(id) on delete cascade;
alter table fill_infos add foreign key (pdf_id) references template_pdfs(id) on delete cascade;