$(document).ready(function() {
  var createdAt = new Date()
  var dummyData = [
    {
      title: 'Funny Video!',
      link: 'https://www.google.com',
      votes: 12,
      user: 'steveman',
      createdAt: createdAt
    },
    {
      title: 'Sad Video!',
      link: 'https://www.google.com',
      votes: 42,
      user: 'steveboy',
      createdAt: createdAt
    },
    {
      title: 'Unpopular Video!',
      link: 'https://www.google.com',
      votes: -112,
      user: 'internetman',
      createdAt: createdAt
    }
  ]

  dummyData.forEach(function(item, index) {
    var $template = $('#content-template').clone()
    var newItem = $template.prop('content')

    // Inject data into template elements
    $(newItem).find('.content-number').text(index + 1)
    $(newItem).find('.content-title').text(item.title)
    $(newItem).find('.votes').text(item.votes)
    $(newItem).find('.content-link').attr('href', item.link)
    $(newItem).find('.content-link').attr('target', '_blank')
    $(newItem).find('.content-meta').text(item.user + ' posted at ' + item.createdAt)

    $('#list').append(newItem)
  });
});
