# Survey App

![](./survey-app.jpg)

This was an exciting project pulling together all that I have been  learning at Flatiron School over the last four months. I have come to  appreciate the simplicity of setting up an API with Rails. This Fullstack Application uses [Ruby on Rails]() to build a backend API which serves a full CRUD interface to a HTML/CSS/JS frontend. The architecture is an example of a VanillaJS Single Page Application (SPA).  

## Getting Started

### Prerequisites

This repository is only the front-end for an overall Application. The [Ruby on Rails](https://rubyonrails.org/) API back-end can be found at [JS-Survey-app_backend](https://github.com/eclectic-coding/js-survey-app_backend).  You can find direction for setting up here and on that repository. 

#### Backend Setup  

You will need to set up the backend first. The repository is available [here](https://github.com/eclectic-coding/js-survey-app_backend). Clone to your computer:

```shell
https://github.com/eclectic-coding/js-survey-app_backend.git
```

Rails is setup with the following requirements:

- Postgres DB
- Rails-CORS is configured to allow connections from `http://localhost:8080`. If your development server uses a different port, you will need to configure in `config/initializer/cors.rb`.

Setup database `rails db:create`  then `rails db:migrate` 

#### Frontend Setup 

Clone to repository to your computer:  
```shell
https://github.com/eclectic-coding/js-survey-app_frontend.git
```

Change to the project directory and install the node packages either with `yarn` or `npm install`.

The frontend application uses Gulp to compile and minify CSS files and uses Browsersync to run a hot reloading development server. Run the command, within the project directory, `gulp watch`.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc


```

```
