# Include variables
include .env.dist
-include .env
export

############################################################
# PROJECT ##################################################
############################################################
.PHONY: project
project: install setup

.PHONY: install
install: install-php install-node

.PHONY: install-php
install-php:
	composer install

.PHONY: install-node
install-node:
	npm install

.PHONY: setup
setup:
	cp -n .env.example .env || true
	cp -n config/local.neon.dist config/local.neon || true
	mkdir -p var/log var/tmp var/tmp/sessions
	chmod 0777 var/log var/tmp var/tmp/sessions

.PHONY: clean
clean:
	find var/tmp -mindepth 1 ! -name '.gitignore' -type f,d -exec rm -rf {} +
	find var/log -mindepth 1 ! -name '.gitignore' -type f,d -exec rm -rf {} +

############################################################
# DEVELOPMENT ##############################################
############################################################
.PHONY: qa
qa: cs phpstan

.PHONY: cs
cs:
ifdef GITHUB_ACTION
	vendor/bin/phpcs --standard=ruleset.xml --extensions=php,phpt --tab-width=4 --ignore=tests/tmp -q --report=checkstyle app tests | cs2pr
else
	vendor/bin/phpcs --standard=ruleset.xml --extensions=php,phpt --tab-width=4 --ignore=tests/tmp --colors -nsp app tests
endif

.PHONY: csf
csf:
	vendor/bin/phpcbf --standard=ruleset.xml --extensions=php,phpt --tab-width=4 --ignore=tests/tmp --colors -nsp app tests

.PHONY: phpstan
phpstan:
	vendor/bin/phpstan analyse -c phpstan.neon --memory-limit=512M

.PHONY: tests
tests:
	vendor/bin/tester -s -p php --colors 1 -C tests/Cases

.PHONY: coverage
coverage:
ifdef GITHUB_ACTION
	vendor/bin/tester -s -p phpdbg --colors 1 -C --coverage coverage.xml --coverage-src app tests/Cases
else
	vendor/bin/tester -s -p phpdbg --colors 1 -C --coverage coverage.html --coverage-src app tests/Cases
endif

.PHONY: dev
dev:
	NETTE_DEBUG=1 NETTE_ENV=dev php -S 0.0.0.0:8000 -t www

.PHONY: build
build:
	npm run build

.PHONY: watch
watch:
	npm run watch

############################################################
# DEPLOYMENT ###############################################
############################################################
.PHONY: deploy
deploy:
	$(MAKE) clean
	$(MAKE) project
	$(MAKE) build
	$(MAKE) clean

############################################################
# DOCKER ###################################################
############################################################
.PHONY: docker-up
docker-up:
	docker compose up

.PHONY: docker-mariadb
docker-mariadb: ## Spin MariaDB docker container
	docker run \
		-it \
		--rm \
		-p 3306:3306 \
		-v $(CURDIR)/.docker/data/mariadb:/var/lib/mysql \
		-v $(CURDIR)/db/init.sql:/docker-entrypoint-initdb.d/init.sql \
		-e MYSQL_USER=${DB_USER} \
		-e MYSQL_PASSWORD=${DB_PASSWORD} \
		-e MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD} \
		-e MYSQL_DATABASE=${DB_DATABASE} \
		mariadb:10.11
