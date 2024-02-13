## clone project
git clone https://github.com/puskipus/skill-test-griyanet.git

## Install backend
open backend folder
run "composer install"
copy ".env.example" and rename to ".env"
set DB connection
run "php artisan jwt:secret"
run "php artisan migrate"
run "php artisan db:seed"
run "php artisan serve"

## Install frontend
open frontend folder
run "npm i"
setup the .env file
run "npm start"
