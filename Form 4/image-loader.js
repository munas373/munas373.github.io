$(document).ready(function(){
    var currentMousePos = { x: -1, y: -1 };
    var newImage = [['<img src="assets/img/blueprint.jpg" width="350" class="new-illusion 1">', '.new-illusion.1'],
                    ['<img src="assets/img/blueprint2.jpg" width="350" class="new-illusion 2">', '.new-illusion.2'],
                    ['<img src="assets/img/math.jpg" width="300" class="new-illusion 3">', '.new-illusion.3'],
                    ['<img src="assets/img/math2.jpg" width="300" class="new-illusion 4">', '.new-illusion.4'],
                    ['<img src="assets/img/Plato.jpg" width="350" class="new-illusion 5">', '.new-illusion.5'],
                    ['<img src="assets/img/Plato2.jpg" width="300" class="new-illusion 6">', '.new-illusion.6'],
                    ['<img src="assets/img/light.jpg" width="200" class="new-illusion 7">', '.new-illusion.7'],
                    ['<img src="assets/img/light2.jpg" width="350" class="new-illusion 8">', '.new-illusion.8'],
                    ['<img src="assets/img/mind.jpg" width="200" class="new-illusion 9">', '.new-illusion.9'],
                    ['<img src="assets/img/thinker.jpg" width="250" class="new-illusion 10">', '.new-illusion.10']
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