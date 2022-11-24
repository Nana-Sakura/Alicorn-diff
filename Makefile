maked:
	make make_nopack
	make pack
.PHONY: test lc df wd lcd lcr wd2 release-full watch-release dev-full devtools watch-dev pack windows macos linux clean launch_dev launch_release make_patch make_nobuild make_nopack make_only make_nobuild_nopack github_unix github_windows rmx
test:
	make launch_release
lc:
	make lcd
df:
	make dev-full
wd:
	make watch-dev
lcd:
	make launch_dev
lcr:
	make launch_release
wd2:
	make watch-dev & make devtools
release-full:
	make rmx
	npx webpack --config webpack.config.prod.js --progress
watch-release:
	make rmx
	npx webpack --config webpack.config.prod.js --progress --watch
dev-full:
	make rmx
	npx webpack --config webpack.config.dev.js --progress
devtools:
	npx react-devtools
watch-dev:
	make rmx
	npx webpack --config webpack.config.dev.js --progress --watch
pack:
	node eliminate.js
	node pack.js
windows:
	bash -c "npx electron-packager dist/release LibearXL --overwrite --platform=win32 --arch=x64 --icon ./resources/build/icon --out out" &  bash -c "npx electron-packager dist/release LibearXL --overwrite --platform=win32 --arch=ia32 --icon ./resources/build/icon --out out"
macos:
	npx electron-packager dist/release LibearXL --overwrite --platform=darwin --arch=x64 --icon ./resources/build/icon --out out
linux:
	bash -c "npx electron-packager dist/release LibearXL --overwrite --platform=linux --arch=x64 --icon ./resources/build/icon --out out" & bash -c "npx electron-packager dist/release LibearXL --overwrite --platform=linux --arch=arm64 --icon ./resources/build/icon --out out"
	node makesh.js
clean:
	node clean.js
launch_dev:
	cd dist
	npx electron .
launch_release:
	npx electron ./dist/release/
make_patch:
	make release-full
	node makepatch.js
make_nobuild:
	make make_nobuild-nopack
	make pack
make_nobuild-nopack:
	make linux
	make windows
make_nopack:
	make make_only
	make windows
	make linux
	make compress
make_only:
	make clean
	make release-full
github_unix:
	make rmx
	make clean
	make release-full
	make linux 
	make compress
github_windows:
	make rmx
	make clean
	make release-full
	make windows
	make compress
rmx:
	rm -rf node_modules/@types/react-router/node_modules
	rm -rf node_modules/@types/react-transition-group/node_modules
	rm -rf node_modules/@types/react-dom/node_modules node_modules/@types/react-router-dom/node_modules
	rm -rf node_modules/@types/react-is/node_modules