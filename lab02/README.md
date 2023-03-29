# Build Docker Compose
## RUN Docker Compose
``` 
docker-compose up -d
```
## Add table in DB
``` 
docker exec -it lab02-db mysql --user=root --password=123456789@Abc

use todo-app

CREATE TABLE todolist (
  ID int NOT NULL AUTO_INCREMENT COMMENT 'ID Công việc',
  IDTodo char(36) NOT NULL DEFAULT '',
  TodoName varchar(255) DEFAULT NULL COMMENT 'Tên công việc',
  Status tinyint DEFAULT 0,
  IsDelete tinyint DEFAULT 0,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 9,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci,
COMMENT = 'Danh sách công việc';

```
## Done and Test
