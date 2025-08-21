-- +goose Up
CREATE TABLE orders(
	id UUID PRIMARY KEY,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	totalprice INT NOT NULL,
	user_id UUID REFERENCES users(id)
);

-- +goose Down
DROP TABLE orders;
