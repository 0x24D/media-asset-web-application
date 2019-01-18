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
* Manage user authentications and sessions. (User registration is out of scope)

## Technologies used
* Frontend (Vue)
* Middleware (Express)
* Backend (MongoDB)
* Written using ES6 and running on node.js server
* Tested using Mocha and Supertest

## API (tbc)
* Create - POST
* Read - GET
* Update - PUT
* Delete - DELETE
```
/v1/files GET - return list of all files and versions
/v1/files POST - create new file
/v1/files PUT - bulk update files - create new version for all (?)
/v1/files DELETE - delete all files and versions

/v1/files/{id} GET - return latest version of specific file or a list of all versions for the file (?)
/v1/files/{id} POST - create new version (?)
/v1/files/{id} PUT - update specific file or error and just create new version (?)
/v1/files/{id} DELETE - delete specific file and versions

/v1/files/{id}/{version} GET - return specific file at version
/v1/files/{id}/{version} POST - error
/v1/files/{id}/{version} PUT - error
/v1/files/{id}/{version} DELETE - delete file version (should this be possible or error and just create new version?)

/v1/users GET - return all users
/v1/users POST - error (out of scope)
/v1/users PUT - error (out of scope)
/v1/users DELETE - error (out of scope)

/v1/users/{username} GET - return user with username
/v1/users/{username} POST - error (out of scope)
/v1/users/{username} PUT - error (out of scope)
/v1/users/{username} DELETE - error (out of scope)
```
