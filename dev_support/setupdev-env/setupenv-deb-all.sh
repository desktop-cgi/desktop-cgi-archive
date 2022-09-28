# # 
# # LANGUAGE INSTALLATION DEPENDENCIES AND BUILDS
# # ----------------------------------------------
# # Install python python3 php ruby-full nodejs default-jre default-jdk git-all
# #


sudo apt-get install python python3

sudo apt install ca-certificates apt-transport-https software-properties-common lsb-release
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install php

sudo apt-get install ruby-full

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

VERSION="1.19.1"
ARCH="amd64"
curl -O -L "https://golang.org/dl/go${VERSION}.linux-${ARCH}.tar.gz"
wget -L "https://golang.org/dl/go${VERSION}.linux-${ARCH}.tar.gz"
ls -l
curl -sL https://golang.org/dl/ | grep -A 5 -w "go${VERSION}.linux-${ARCH}.tar.gz"
tar -xf "go${VERSION}.linux-${ARCH}.tar.gz"
ls -l
cd go/
ls -l
cd ..
sudo chown -R root:root ./go
sudo mv -v go /usr/local
echo -e "#set up Go lang path #\nexport GOPATH=$HOME/go\nexport PATH=$PATH:/usr/local/go/bin:$GOPATH/bin\n" >> ~/.bash_profile
source $HOME/.bash_profile

sudo apt update
sudo apt-get install default-jre
sudo apt-get install default-jdk

sudo apt-get install git-all


# #
# # ELECTRON BUILD DEPENDENCIES
# # ------------------------------
# # 

sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libasound2-dev libcap-dev \
                       libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python3-dbusmock openjdk-8-jre

sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf

sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu


sudo apt-get install dpkg fakeroot


sudo apt-get install rpm


sudo apt install gnupg ca-certificates
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
echo "deb https://download.mono-project.com/repo/ubuntu stable-focal main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list
sudo apt update


sudo apt-get install wine --fix-missing
sudo apt-get install wine64 --fix-missing
sudo apt-get update

sudo apt-get install wine --fix-missing
sudo apt-get install wine64 --fix-missing
sudo apt-get update


# sudo apt-get install apparmor libfuse2 squashfs-tools udev apparmor-profiles-extra apparmor-utils fuse zenity kdialog apparmor libfuse2 snapd squashfs-tools udev
# sudo snap install snapcraft --classic

# #
# # INSTALL DESKTOPCGI GIT REPOSITORY DEPENDENCIES
# # ----------------------------------------------
# # 


npm install -g prebuild
npm install --force


# # Install only if the package.json scripts are not right. It is set up already
# npm exec --package=@electron-forge/cli -c "electron-forge import"

cp ./setupenv-deb.sh ../setupenv-deb.sh
cp ./setupenv-deb-all.sh ../setupenv-deb-all.sh

cd ../

chmod +x setupenv-deb.sh
chmod +x setupenv-deb-all.sh

cd ./desktop-cgi

chmod +x git.rebase.fork.sh

