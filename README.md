# desktop-cgi
Desktop-CGI is a desktop executable app that can be created from any CGI files or CGI web apps that can be served from an file, an embedded web server using proxy, or an remote proxy web server. It supports embedding and managing embeddable databases and executables. It supports all major Operating systems supported by electron like Windows, Linux, and MacOS supported by Electron.


`[Funding Invited]`


`[Team and Community Managers Invited]`


![Desktop CGI](./dev_support/assets/desktop-cgi.jpeg)


# Highlights


Desktop-CGI can serve any CGI files, OR CGI / Scripted / Interpreted languages like PHP, Ruby, Python, Perl, JSP, ASPX, Other Interpreted Languages through embedded webservers, OR any remote proxy (any protocol / webserver) apps 


Desktop-CGI runs an Electron - Node - Express based application under the hood and supports major Operating systems like Windows, Linux, Mac or any operating systems supported by Electron.


# Usage

* Install node.js from [https://www.nodejs.com](https://www.nodejs.com)
* Clone the [Git repository](https://github.com/desktop-cgi/desktop-cgi) (Alternatively, download the git repository)
* Change to the git repository directory / folder `cd path/to/desktop-cgi` from command line / shell / powershell
* Run command `npm install`
* Add your application in the respective `www` folder or sub-folder [TODO - Simplify]
* Check and modify `server/config/config-**template**.json` file for your application's configuration needs
* Check if your electron app runs using command `npm run electron`
* Run command `npm run electronbuild` [TODO - Simplify]
* [Demo] A demo app is placed in the folder [www\demoapp](./www/demoapp)


# Functionality Details


##### Electron based Desktop application that runs CGI Server

* `cgijs` is Nodejs framework independent / agnostic for serving CGI or interpreted scripting apps via files, or server based web apps via proxies
    - Express Recommended and used for demo
* Run any script files that supports CGI based file script serving - using `cgijs file` module
* Run any host that serves a web app - using `cgijs proxy` module
    - In App / Local / Remote proxy support
* Allows
    - running multiple interpreters in one app
    - running multiple proxies (currently http, websockets, tcp, udp. grpc planned) in one app
    - multiple embedded servers in one app
* Allows embedding servers like httpd, nginx, etc to serve web applications - using `cgijs process` module
* Allows embedding database servers (in development) - using `cgijs process` module


##### The script should pipe all interpreted language files below:

* Python (2.x, 3.x)
* Perl (Version Independent)
* PHP (Version Independent)
* Ruby (Version Independent)
<!-- * .NET (Version Independent) -->
<!-- * JSP (Version Independent) -->


##### The script will pipe all proxies of above languages and following (to be tested):

* Jsp (With Tomcat embedded)
* Aspx (Version Independent - With local IIS proxy, Apache embedded)
* Any app using local / remote proxy (currently http, websockets, tcp, udp. grpc planned)


##### The script should currently allow embedding following servers for proxy [TODO: In Development]:

* Apache HTTPD (Allows Embed & Proxy)
* Apache TomCat (Allows Embed & Proxy)
* Nginx (Allows Embed & Proxy)
* Mongoose http server (Allows Embed & Proxy)

The script can proxy to any File, most embeddable web servers, and/ or Proxy-able local / remote servers; even IIS Server (Allows Proxy)


##### Note:


##### Package Dependencies:

* Library dependencies:
    - Nodejs: (> 8.x)

* Application Dependencies:
    - cgi-js: (>=1.1.0)
    - electron": (>=18.1.0)
    - relevant compiling packages

* Application Demo Dependencies:
    - body-parser: (>=1.20.0)
    - ejs: (>=3.1.7)
    - express: (>=4.18.0)
    - fsevents: (>=2.3.2)
    - socket.io: (>=4.5.0)
    - ws: (>=8.5.0)

##### Usage Demo:

Check `index.js` and `server` folder for demo code


# Technical Specifications

...  * Technical specifications to be added


# Wiki

...  * Wiki link to be added


# Status

    In active development
You can track development status here [desktop-cgi/projects](https://github.com/orgs/desktop-cgi/projects/2)


# Open Unmoderated Communities

[Facebook](https://www.facebook.com/groups/732258757997109), [Quora](https://desktopcgi.quora.com/), [Github Discussion](https://github.com/desktop-cgi/desktop-cgi/discussions)


# Issues and Contributions

[Raise an Issue or Contribute](https://github.com/desktop-cgi/desktop-cgi/issues). Active Contributors are invited.


# Todo

Check file - [.todo](./dev_support/todo/.todo)


# References

[Electron Application Distribution](https://www.electronjs.org/docs/tutorial/application-distribution)


# License

The MIT License (MIT) - See [LICENSE](./LICENSE) for further details


Copyright © 2019 - till library works:
    Ganesh B <ganeshsurfs@gmail.com>

The project is intended to be maintained seriously.
<!-- Consider latest version feature: https://api.github.com/repos/DEDAjs/deda-service-manager/releases/latest -->
