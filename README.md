## clone project
git clone https://github.com/puskipus/skill-test-griyanet.git

## Install backend
<br /> open backend folder
<br /> run "composer install"
<br /> copy ".env.example" and rename to ".env"
<br /> set DB connection
<br /> run "php artisan jwt:secret"
<br /> run "php artisan migrate"
<br /> run "php artisan db:seed"
<br /> run "php artisan serve"

## Install frontend
<br /> open frontend folder
<br /> run "npm i"
<br /> setup the .env file
<br /> run "npm start"
