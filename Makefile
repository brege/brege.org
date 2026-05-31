.PHONY: cv build serve clean

cv:
	hugo --quiet
	sed --quiet '1p; 2,/^---$$/p' content/cv/index.md > /tmp/brege-cv.md
	printf '\n' >> /tmp/brege-cv.md
	cat public/cv.md >> /tmp/brege-cv.md
	cmp --silent /tmp/brege-cv.md content/cv/index.md || cp /tmp/brege-cv.md content/cv/index.md

build: cv
	hugo

serve: cv
	hugo server

clean:
	rm -r public/ resources/_gen/
