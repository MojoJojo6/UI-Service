# UI-Service
It provides HTML, CSS and static files for Web Application.

## Steps to Setup in Windows

### Install Python 3.6.x in your system.
* https://www.python.org/ftp/python/3.6.5/python-3.6.5-amd64-webinstall.exe

### Install git.
* https://gitforwindows.org/

### Create a folder Capstone_39.
* Navigate to Capstone_39 via command prompt.

### Clone our project repositories from GitHub (Run commands mentioned below in cmd)
```
git clone https://github.com/MojoJojo6/UserService.git
git clone https://github.com/MojoJojo6/CourseService.git
git clone https://github.com/MojoJojo6/ForumDiscussion.git
git clone https://github.com/MojoJojo6/UI-Service.git
```

### Install python libraries to run the project.
```
python -m pip install django
python -m pip install djangorestframework
python -m pip install django-channels 
python -m pip install django-cors-headers
```
if pip error: https://stackoverflow.com/questions/41501636/how-to-install-pip3-on-windows

### Setting up database (Run commands mentioned below in cmd)

#### User-Service
```
python UserService\manage.py makemigrations
python UserService\manage.py migrate
```

#### Course-Service
```
python CourseService\manage.py makemigrations
python CourseService\manage.py migrate
```

#### Forum-Service
``` 
python ForumDiscussion\manage.py makemigrations
python ForumDiscussion\manage.py migrate
```

#### UI-Service
```
python UI-Service\UI\manage.py makemigrations
python UI-Service\UI\manage.py migrate
```

### Run Services
Open 4 cmd prompts and navigate to Capstone_39.

#### Run User-Service (cmd prompt 1)
```
python UserService\manage.py runserver 8000
```

#### Run Course-Service (cmd prompt 2)
```
python CourseService\manage.py runserver 8001
```

#### Run Forum-Service (cmd prompt 3)
```
python ForumDiscussion\manage.py runserver 8002
```

#### Run UI-Service (cmd prompt 4)
```
python UI-Service\UI\manage.py runserver 8003
```

### Load Web Page
* Open your browser (Google Chrome preferable)
* Browse: http://127.0.0.1:8003/

### Register & View the Web Learning Portal
