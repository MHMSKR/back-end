# back-end

1. Download this project
2. creat file .env on root path. then add 
```
API_PORT = your server port listen
DB_HOST = your mysql database host 
DB_USERNAME = your msql database username msql database
DB_PASSWORD = your msql database password
DB_PORT = port of database
DB_NAME = hescas_db
SECRET_KEY = "HESCAS_FINAL_PROJECT_PRIVATE_KEY"
```
3. import database file in your phpmyadmin page
4. run `npm install` to install dependencies
5. run `npm run dev` to run this project

database info 

users table
- _id = index of rows of table
- user_id = uuid 32 bit primary key
- email = email in lower case letter is a uniq
- passwd = encrypted password
- fullname = free name user can use
- role = role management hescas home device have a two role is one 'host' and nine 'resident'
- image_profile = profile image type png, jpg, jpeg size less than 10mb
