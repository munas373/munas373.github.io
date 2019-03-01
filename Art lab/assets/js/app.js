function toggleImage() {
  var image = document.getElementById('image');
  image.classList.toggle('hidden');
  image.style.width=500 + 'px';
  image.style.top=500 + 'px';
}

var button = document.getElementById('button')
button.addEventListener('click', toggleImage)

