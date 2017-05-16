'use restrict';
document.addEventListener('DOMContentLoaded', function (event) {
  var sourceUri = 'https://www.pixiv.net/ranking.php?mode=daily&format=json&content=illust';
  var promiseList = [];

  for (var i = 1; i <= 3; i++) {
    var p = axios.get(sourceUri + '&p=' + i);
    promiseList.push(p);
  }

  Promise.all(promiseList).then(function (values) {
    var items = [];
    var illustrations = [];
    values.forEach(function (response) {
      if (response.status === 200) {
        // Extracting illustration info
        response.data.contents.forEach(function (e) {
            illustrations.push({
              'illustrationId': e.illust_id,
              'illustrationUrl': e.url,
              'illustrationTitle': e.title,
              'userName': e.user_name,
            });
        });
      }
    });

    // Shuffle.
    illustrations = shuffle(illustrations);

    // Inserting elements to a New tab page body.
    illustrations.forEach(function (e) {
      items.push(createGalleryItem(
        e.illustrationId,
        e.illustrationUrl,
        e.illustrationTitle,
        e.userName
      ));
    });

    items.forEach(function (e) {
      document.body.querySelector('#gallery').appendChild(e);
    });
  }).catch(function (response) {
    console.log(response);
  });
});

function makeMemberIllustUrl(IllustrationId) {
  return 'https://www.pixiv.net/i/' + String(IllustrationId);
}

function loadedCallback(e) {
  e.target.classList.add('loaded');
}

function createIllustrationElement(imageUrl, title, author) {
  var img = new Image();
  img.src = imageUrl;
  img.onload = loadedCallback;
  img.alt = author + ' / ' + title;
  return img;
}

function createGalleryItem(illustrationId, imageUrl, title, author) {
    var linkUrl = makeMemberIllustUrl(illustrationId);
    var img = createIllustrationElement(imageUrl, title, author);
    var anchor = document.createElement('a');
    anchor.setAttribute('href', linkUrl);
    anchor.appendChild(img);
    return anchor;
}

function shuffle(array) {
  var n = array.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}
