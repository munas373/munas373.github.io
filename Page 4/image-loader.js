$(document).ready(function(){
    var currentMousePos = { x: -1, y: -1 };
    var newImage = [['<img src="assets/img/carpenter1.jpg" width="290" class="new-illusion 1">', '.new-illusion.1'],
                    ['<img src="assets/img/carpenter2.jpg" width="300" class="new-illusion 2">', '.new-illusion.2'],
                    ['<img src="assets/img/shoemaker1.jpg" width="400" class="new-illusion 3">', '.new-illusion.3'],
                    ['<img src="assets/img/shoemaker2.jpg" width="400" class="new-illusion 4">', '.new-illusion.4']
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