.PHONY: project install setup qa dev cs csf phpstan tests build

############################################################
# PROJECT ##################################################
############################################################

project: install setup

install:
	composer install

setup:
	mkdir -p temp log
	chmod +0777 temp log

############################################################
# DEVELOPMENT ##############################################
############################################################

qa: cs phpstan

cs:
	vendor/bin/codesniffer app

csf:
	vendor/bin/codefixer app

phpstan:
	vendor/bin/phpstan analyse -c phpstan.neon --memory-limit=512M app

tests:
	echo "OK"

coverage:
	echo "OK"
