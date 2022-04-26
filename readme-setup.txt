
Build Instructions Linux: https://www.electronjs.org/docs/latest/development/build-instructions-linux


Electron Installer Debian
https://github.com/electron-userland/electron-installer-debian
This tool requires Node 10 or greater, fakeroot, and dpkg to build the .deb package.
sudo apt-get install fakeroot dpkg

Electron Installer RPM
https://github.com/electron-userland/electron-installer-redhat
This tool requires Node 10 or greater and rpmbuild 4.13 or greater to build the .rpm package.
sudo apt-get install rpm

https://github.com/endlessm/electron-installer-flatpak
This tool requires flatpak and flatpak-builder >= 0.8.2 to be installed on your system. See http://flatpak.org/getting.html
    flatpak --user remote-add --from gnome https://sdk.gnome.org/gnome.flatpakrepo
    flatpak --user install gnome org.freedesktop.Platform/x86_64/1.4 org.freedesktop.Platform/i386/1.4
npm install --save-dev electron-installer-flatpak

https://github.com/electron-userland/electron-installer-snap
The easiest way is to use Electron Forge and enable the snap maker.
npm install --save-dev electron-installer-snap

https://github.com/electron-userland/electron-installer-dmg
This module requires using macOS and Node 12 (LTS) or above.
npm i electron-installer-dmg --save-dev

https://github.com/electron-userland/electron-installer-windows
This tool relies on the awesome Squirrel.Windows framework written by @anaisbetts.
npm install --save-dev electron-installer-windows

https://github.com/felixrieseberg/electron-wix-msi
Most Electron developers use the official windows-installer to create Windows installers.
npm i --save-dev electron-wix-msi

https://github.com/felixrieseberg/electron-windows-store
npm install -g electron-windows-store
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

https://github.com/electron/windows-installer
NPM module that builds Windows installers for Electron apps using Squirrel.
npm install --save-dev electron-winstaller

https://github.com/electron-userland/electron-installer-zip
Create a zip file with support for symlinks required by Electron on macOS
npm i electron-installer-zip --save-dev

https://github.com/Urucas/electron-packager-interactive
An interactive implementation of electron-packager
npm install -g electron-packager-interactive

https://github.com/electron-userland/electron-forge
Note: Electron Forge requires Node 12.13.0 (LTS) or above, plus git installed.
npm install -g @electron-forge/cli

https://github.com/electron/electron-rebuild
npm install --save-dev electron-rebuild

https://github.com/electron/windows-installer
NPM module that builds Windows installers for Electron apps using Squirrel.
npm install --save-dev electron-winstaller

https://github.com/felixrieseberg/electron-windows-store
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
npm install -g electron-windows-store


https://www.npmjs.com/package/electron-packager-plugin-non-proprietary-codecs-ffmpeg
https://www.npmjs.com/package/electron-packager-languages


allproxy - Consider for monitoring
AllProxy is a MITM proxy similar to Fiddler and Charles, but in addition to HTTP(S), it also can 
    captures SQL, gRPC, MongoDB, Redis, Memcached, TCP, and log messages.
https://www.npmjs.com/package/allproxy

Nodejs monitoring tools
https://www.section.io/engineering-education/top-node.js-monitoring-tools/

Capture uptime, performance system metrics of process
https://www.npmjs.com/package/metrica

Process Metric Monitoring - Linux
https://github.com/yahoo/monitr

