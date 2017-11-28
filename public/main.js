$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyBZpqFAnR6ubn4Ig7-Fe6lVXFODGCZE4ZE",
    authDomain: "reddit-clone-test-fd103.firebaseapp.com",
    databaseURL: "https://reddit-clone-test-fd103.firebaseio.com",
    projectId: "reddit-clone-test-fd103",
    storageBucket: "reddit-clone-test-fd103.appspot.com",
    messagingSenderId: "939272960776"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  database.ref('/items').once('value').then(function(snapshot) {
    var results = snapshot.val();
    var counter = 1;
    for (var id in results) {
      buildItemElement(results[id], counter);
      counter++;
    }
  })

  function buildItemElement(item, index) {
    var $template = $('#content-template').clone()
    var newItem = $template.prop('content')

    // Inject data into template elements
    $(newItem).find('.content-number').text(index)
    $(newItem).find('.content-title').text(item.title)
    $(newItem).find('.votes').text(item.votes)
    $(newItem).find('.content-link').attr('href', item.link)
    $(newItem).find('.content-link').attr('target', '_blank')
    $(newItem).find('.content-meta').text(item.user + ' posted ' + moment(item.createdAt).fromNow())

    $('#list').append(newItem)
  }
});
