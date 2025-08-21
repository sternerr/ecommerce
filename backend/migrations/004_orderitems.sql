-- +goose Up
CREATE TABLE order_items (
    productId UUID REFERENCES products(id) ON DELETE RESTRICT,
    orderId UUID REFERENCES orders(id) ON DELETE CASCADE,
    quantity INT,
    PRIMARY KEY (productId, orderId)
);

-- +goose Down
DROP TABLE order_items;
