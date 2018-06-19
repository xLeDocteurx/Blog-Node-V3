class user {
  constructor(id, email, password, username) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}

class post {
  constructor(id, date, title, content, author, comments) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.content = content;
    this.author = author;
    this.comments = [];
  }
}

class com {
    constructor (id, date, content, author) {
        this.id = id;
        this.date = date;
        this.content = content;
        this.author = author;
    }
}