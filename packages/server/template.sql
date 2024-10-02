-- Топик
CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  lastMessageDate timestamp with time zone default CURRENT_DATE,
  content: VARCHAR(255) NOT NULL
);

-- Ответы на комментарии
CREATE TABLE replyComment (
  id SERIAL PRIMARY KEY,
  author VARCHAR(100) NOT NULL,
  comment VARCHAR(255) NOT NULL
);

-- Комментарий
CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  date date,
  topicId id NOT NULL,
  replyToId id NOT NULL,
  FOREIGN KEY (topicId) REFERENCES topic (id),
  FOREIGN KEY (replyToId) REFERENCES replyComment (id)
);
