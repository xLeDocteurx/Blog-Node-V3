var fs = require('fs');

exports.commit = function (data) {
  // console.log(JSON.stringify(data));
  // fs.writeFile('save.json', "This is working");
  fs.writeFile('./public/json/core.json', JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('JSON successfully modified!');
  });
};

exports.newProject = (data) => {
  
}

exports.saveProject = (data) => {
  
}

exports.loadProject = (data) => {
  
}

exports.add_User = (data) => {

  var i = all_Clients.indexOf(all_Clients.find(element => {
    return element.sockid == socket.id;
  }));
  all_Clients[i].email = data;

  io.sockets.emit('refresh', all_Clients);
}

exports.sub_User = (data) => {


  console.log("substracted datas from all_Clients :");
  var i = all_Clients.indexOf(data.id);
  all_Clients.splice(i, 1);

  io.sockets.emit('refresh', all_Clients);
};
