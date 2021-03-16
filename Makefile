# THIS := $(realpath $(lastword $(MAKEFILE_LIST)))
# HERE := $(shell dirname $(THIS))


.PHONY: all

all: bannar setup install migrate note serve

setup:
	@php -r "file_exists('.env') || copy('.env.example', '.env');"
	@rm -fr database/database.sqlite
	@touch database/database.sqlite

install:
	@$(MAKE) composer
	@$(MAKE) npm
	@$(MAKE) key

composer:
	@composer install

npm:
	@npm ci
	@npm run dev

key:
	@php artisan key:generate

migrate:
#	@php artisan migrate:refresh
	@php artisan migrate:fresh --seed
#	@php artisan db:seed

serve:
	@php artisan serve
	@$(MAKE) note

phptest:
	@php ./vendor/bin/phpunit --testdox

phptest-coverage:
	@php ./vendor/bin/phpunit --coverage-html storage/logs/coverage --testdox

phpstan:
	@php ./vendor/bin/phpstan analyse --memory-limit=2G

phpsalm:
	@php ./vendor/bin/psalm

phpinsights:
	@php artisan insights --fix

phpstyle:
	@$(MAKE) phpstan
	@$(MAKE) phpsalm
	@$(MAKE) phpfix
	@$(MAKE) phpinsights

phpfix:
	@php ./vendor/bin/php-cs-fixer fix --config .php_cs

note:
	@echo "\n======================================== [NOTE] ========================================"
	@echo "You're ready to go! Visit Ping CRM in your browser, and login with:					 "
	@echo "[*] Username: johndoe@example.com														 "
	@echo "[*] Password: secret"
	@echo "========================================================================================\n"

bannar:
	@echo " _____ _              _____ _____  __  __"
	@echo "|  __ (_)            / ____|  __ \|  \/  |"
	@echo "| |__) | _ __   __ _| |    | |__) | \  / |"
	@echo "|  ___/ | '_ \ / _\` | |    |  _  /| |\/| |"
	@echo "| |   | | | | | (_| | |____| | \ \| |  | |"
	@echo "|_|   |_|_| |_|\__, |\_____|_|  \_\_|  |_|"
	@echo "                __/ |"
	@echo "               |___/"
	@echo "\n"
