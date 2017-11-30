$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyBZpqFAnR6ubn4Ig7-Fe6lVXFODGCZE4ZE",
    authDomain: "reddit-clone-test-fd103.firebaseapp.com",
    databaseURL: "https://reddit-clone-test-fd103.firebaseio.com",
    projectId: "reddit-clone-test-fd103",
    storageBucket: "reddit-clone-test-fd103.appspot.com",
    messagingSenderId: "939272960776"
  };
  var DAY_IN_MS = 86400000;

  firebase.initializeApp(config);
  var database = firebase.database();

  database.ref('items')
    .orderByChild('createdAt')
    .startAt(Date.now() - DAY_IN_MS)
    .on('child_added', function(snapshot) {
      if ($('#loadingMsg').is(':visible')) {
        $('#loadingMsg').hide();
      }
      var result = snapshot.val();
      result.id = snapshot.key;
      buildItemElement(result);
    })

    database.ref('items')
      .orderByChild('createdAt')
      .startAt(Date.now() - DAY_IN_MS)
      .on('child_changed', function(snapshot) {
        if ($('#loadingMsg').is(':visible')) {
          $('#loadingMsg').hide();
        }
        var result = snapshot.val();
        result.id = snapshot.key;
        $('div.votes#'+result.id).text(result.votes);
      })

  function upVote() {
    var itemID = $(this).attr('id');
    firebase.database().ref('/items/' + itemID + '/votes')
      .transaction(function(currentVotes) {
        return currentVotes + 1;
      })
  }

  function downVote() {
    var itemID = $(this).attr('id');
    firebase.database().ref('/items/' + itemID + '/votes')
      .transaction(function(currentVotes) {
        return currentVotes - 1;
      })
  }

  function buildItemElement(item) {
    var $template = $('#content-template').clone()
    var newItem = $template.prop('content')

    // Inject data into template elements
    $(newItem).find('.content-title').text(item.title)
    $(newItem).find('.arrow').attr('id', item.id);
    $(newItem).find('.vote-up').on('click', upVote);
    $(newItem).find('.vote-down').on('click', downVote);
    $(newItem).find('.votes').text(item.votes).attr('id', item.id);
    $(newItem).find('.content-link').attr('href', item.link).attr('target', '_blank')
    $(newItem).find('.content-meta').text(item.user + ' posted ' + moment(item.createdAt).fromNow())

    $('#list').prepend(newItem)
  }

  $('#sharePost').on('click', function() {
    var link = $('#inputURL').val();
    var title = $('#inputTitle').val();
    var user = $('#inputUser').val();
    var createdAt = Date.now();
    var votes = 0;

    var data = {
      link: link,
      title: title,
      user: user,
      createdAt: createdAt,
      votes: votes
    }

    var itemsListRef = database.ref('items');
    var newItemRef = itemsListRef.push(data, function(err) {
      if (err) {
        console.error('Error saving to firebase', err);
      } else {
        console.log('Success saving to firebase!')
        $('#addPost').modal('hide');
      }
    });
  })

});
