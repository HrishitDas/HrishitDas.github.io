function changeVisibility() {
    var iframes = document.getElementsByClassName('iframe');
    for(i = 0; i < iframes.length; i++) {
      iframes[i].style.visibility = 'visible';
    }
  }