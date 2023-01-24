############################################################
# PROJECT ##################################################
############################################################
.PHONY: project install setup clean

project: install setup

install:
	composer install

setup:
	mkdir -p temp temp/sessions log
	chmod +0777 temp temp/sessions log

clean:
	find temp -mindepth 1 ! -name '.gitignore' -type f,d -exec rm -rf {} +
	find log -mindepth 1 ! -name '.gitignore' -type f,d -exec rm -rf {} +

############################################################
# DEVELOPMENT ##############################################
############################################################
.PHONY: qa dev cs csf phpstan tests coverage dev build

qa: cs phpstan

cs:
ifdef GITHUB_ACTION
	vendor/bin/phpcs --standard=ruleset.xml --extensions=php,phpt --tab-width=4 --ignore=tests/tmp -q --report=checkstyle app tests | cs2pr
else
	vendor/bin/phpcs --standard=ruleset.xml --extensions=php,phpt --tab-width=4 --ignore=tests/tmp --colors -nsp app tests
endif

csf:
	vendor/bin/phpcbf --standard=ruleset.xml --extensions=php,phpt --tab-width=4 --ignore=tests/tmp --colors -nsp app tests

phpstan:
	vendor/bin/phpstan analyse -c phpstan.neon --memory-limit=512M

tests:
	vendor/bin/tester -s -p php --colors 1 -C tests/Cases

coverage:
ifdef GITHUB_ACTION
	vendor/bin/tester -s -p phpdbg --colors 1 -C --coverage coverage.xml --coverage-src app tests/Cases
else
	vendor/bin/tester -s -p phpdbg --colors 1 -C --coverage coverage.html --coverage-src app tests/Cases
endif

dev:
	NETTE_DEBUG=1 NETTE_ENV=dev php -S 0.0.0.0:8000 -t www

build:
	echo "BUILD OK"

############################################################
# DEPLOYMENT ###############################################
############################################################
.PHONY: deploy

deploy:
	$(MAKE) clean
	$(MAKE) project
	$(MAKE) build
	$(MAKE) clean
