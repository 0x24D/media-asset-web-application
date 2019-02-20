# media-asset-web-application

* User-friendly web application for storing metadata about uploaded files

## Purpose
* Handle file metadata. (Uploading files is out of scope)
  * Title
  * Author
  * Date
  * Keywords/tags
* Manage multiple versions of each file
* Allow files to be checked-in and checked-out so different users are not editing the same file concurrently
* Web application can be used by teams split across multiple locations
* Manage user authentications and sessions. (User registration via a form is out of scope, but endpoints must exist)

## Technologies used
* Frontend (Vue)
* Middleware (Express)
* Backend (MongoDB)
* Written using ES6 and running on node.js server
* Tested using Mocha and Chai

## API
* Create - POST
* Read - GET
* Update - PUT
* Delete - DELETE
```
/api/v1/files GET - return list of latest version of all files
/api/v1/files POST - create new file
/api/v1/files PUT - error
/api/v1/files DELETE - delete all files and versions

/api/v1/files/{id} GET - return latest version of specific file
/api/v1/files/{id} POST - error
/api/v1/files/{id} PUT - update file (create new version)
/api/v1/files/{id} DELETE - delete specific file and versions

/api/v1/files/{id}/{version} GET - return specific file at version
/api/v1/files/{id}/{version} POST - error
/api/v1/files/{id}/{version} PUT - error
/api/v1/files/{id}/{version} DELETE - error

/api/v1/files/lock/{id} POST - lock/unlock using 'locked' property

/api/v1/users GET - return list of all users
/api/v1/users POST - create new user
/api/v1/users PUT - error
/api/v1/users DELETE - delete all users

/api/v1/users/{username} GET - return user with username
/api/v1/users/{username} POST - error
/api/v1/users/{username} PUT - update user
/api/v1/users/{username} DELETE - delete specific user

/api/v1/authentication/login POST - login user, create token
/api/v1/authentication/logout POST - logout user, remove token
```
