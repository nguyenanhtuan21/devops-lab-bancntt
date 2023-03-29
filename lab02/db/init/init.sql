USE todos;
CREATE TABLE todos.task (
	ID bigint Primary Key auto_increment,
    Content text, 
    IsFinished int(1)
);