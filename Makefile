.PHONY: cv build serve clean

cv:
	python3 scripts/cv-gen

build: cv
	hugo

serve: cv
	hugo server

clean:
	rm -r public/ resources/_gen/
