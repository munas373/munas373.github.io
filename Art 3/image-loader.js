$(document).ready(function(){
    var currentMousePos = { x: -1, y: -1 };
    var newImage = [['<img src="assets/img/warhol1.jpeg" width="300" class="new-illusion 1">', '.new-illusion.1'],
                    ['<img src="assets/img/warhol2.jpg" width="300" class="new-illusion 2">', '.new-illusion.2'],
                    ['<img src="assets/img/warhol3.jpg" width="300" class="new-illusion 3">', '.new-illusion.3'],
                    ['<img src="assets/img/warhol4.jpg" width="300" class="new-illusion 4">', '.new-illusion.4'],
                    ['<img src="assets/img/warhol5.jpg" width="300" class="new-illusion 5">', '.new-illusion.5'],
                    ['<img src="assets/img/warhol1.jpeg" width="300" class="new-illusion 6">', '.new-illusion.6'],
                    ['<img src="assets/img/warhol2.jpg" width="300" class="new-illusion 7">', '.new-illusion.7'],
                    ['<img src="assets/img/warhol3.jpg" width="300" class="new-illusion 8">', '.new-illusion.8'],
                    ['<img src="assets/img/warhol4.jpg" width="300" class="new-illusion 9">', '.new-illusion.9']
                    ];

    $('html').on('click', function(){
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
        var rand = Math.floor(Math.random() * newImage.length);
        
        $('body').append(newImage[rand][0]);
        $(newImage[rand][1]).css('left', currentMousePos.x).css('top', currentMousePos.y);
        newImage.splice(rand, 1);
    });
});