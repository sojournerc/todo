
# TODO 
A todo list using koa.js, React.js, Bootstrap, and sqlite3 configured to run on Redhat Openshift.

## sqlite3 database
To use a database file instead of in-memory anonymous database set path to the file as environment variable `TODO_DB_FILE`. Can be relative to working directory. i.e. 

    export TODO_DB_FILE=../todo.sql

