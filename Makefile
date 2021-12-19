.PHONY: project install setup qa dev cs csfix phpstan tests build

############################################################
# PROJECT ##################################################
############################################################

project: install setup

install:
	composer install

setup:
	mkdir -p var/{tmp,log}
	chmod +0777 var/{tmp,log}

############################################################
# DEVELOPMENT ##############################################
############################################################

qa: cs phpstan

cs:
	vendor/bin/codesniffer app

csfix:
	vendor/bin/codefixer app

phpstan:
	vendor/bin/phpstan analyse -c phpstan.neon --memory-limit=512M app

tests:
	echo "OK"

coverage:
	echo "OK"
