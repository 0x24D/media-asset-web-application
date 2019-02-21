// add users
// admin:secretpw
use mediaAssetDb;
db.users.insert({
  username: 'admin',
  password: '$2a$10$k087ll49ZJ/8peyDpJCxFuAyNE341CD7eE0ye9xmfrqrpnJwJZ0AO',
  salt: '$2a$10$k087ll49ZJ/8peyDpJCxFu',
});

// morten:morten123
db.users.insert({
  username: 'morten',
  password: '$2a$10$QfngliY9vh8XE/XDKYZ2EO7jSOaL9HREubPMd9rxPL9MBHChk7rwq',
  salt: '$2a$10$QfngliY9vh8XE/XDKYZ2EO',
});

// tove:tove456
db.users.insert({
  username: 'tove',
  password: '$2a$10$xBg5R7JcfIeMPoU.0u2q1u0/M9yhQaPtk4HFD.lBnMPVH7kLKhwpq',
  salt: '$2a$10$xBg5R7JcfIeMPoU.0u2q1u',
});

db.files.insert({
  name: 'requirements.txt',
  locked: false,
  data: [{
    title: 'Requirements for asset application',
    author: 'morten',
    tags: ['requirements', 'asset', 'morten'],
    created_date: Date.now(),
    version: 1,
  }],
});

db.files.insert({
  name: 'poster.pdf',
  locked: false,
  data: [{
    title: 'Job recruitment poster',
    author: 'tove',
    tags: ['poster', 'creative', 'tove'],
    created_date: Date.now(),
    version: 1,
  }],
});

db.files.insert({
  name: 'timesheet.xls',
  locked: false,
  data: [{
    title: 'Timesheet for January 2019',
    author: 'tove',
    tags: ['spreadsheet', 'business', 'tove'],
    created_date: Date.now(),
    version: 1,
  }],
});
