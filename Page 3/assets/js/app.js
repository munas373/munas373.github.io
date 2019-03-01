var canvas = document.querySelector('.the-canvas');
var context = canvas.getContext('2d');
var ratio = window.devicePixelRatio || 1;

var totalLineHeight = 680;
var totalLines = 4;
var totalDiff = totalLineHeight / totalLines;
var fontHeight = 60 * ratio - 50; // Small centering

var smallestWidth = 280; // width of smallest line;
var offsetX = 12;
var offsetY = 6;
var iterations;
var verticalAlign, line1Diff, line2Diff, line3Diff, line4Diff, iterations, iteration, animationFrame;

var startRGB = [255, 255, 255];
var endRGB   = [220, 165, 163];
var fullColorSet = [];

init();

function init() {
  
  // Cancel any already running animations
  cancelAnimationFrame(animationFrame);
  
  // Set the canvas width and height
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
 
  // Set the canvas font properties
  context.font = '180px Helvetica';
  context.fontweight ='900'
  context.textAlign = 'center';
  context.fillStyle = '#fff';
  context.strokeStyle = "black";
  context.lineWidth = "2";
  context.textBaseline = "middle"; 
  
  // Centering of the text
  verticalAlign = (window.innerHeight / 2  * ratio) - totalLineHeight / 2;
  line1Diff = totalLineHeight + fontHeight - totalDiff;
  line2Diff = totalLineHeight + fontHeight - totalDiff * 2;
  line3Diff = totalLineHeight + fontHeight - totalDiff * 3;
  line4Diff = totalLineHeight + fontHeight - totalDiff * 4;
  
  // How many iterations will we go through?
  iterations = Math.floor(((window.innerWidth * ratio / 2) - (smallestWidth * ratio / 2)) / offsetX + 5);
  prepareColorSets(iterations);
  
  iteration = 0;
  
  animationFrame = requestAnimationFrame(draw);
}

// Draw loop
function draw() {
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  for( var i = iterations - 1; i > 0; i-- ) {
    context.fillStyle = 'rgb(' + fullColorSet[i][0] + ',' + fullColorSet[i][1] + ',' + fullColorSet[i][2] + ')';
    var x = window.innerWidth / 2 * ratio - i * offsetX;
    var y = verticalAlign + i * offsetY + (Math.sin(i + iteration) * 2);
    drawText( x, y );
  } 
  
  iteration += 0.1; 
  animationFrame = requestAnimationFrame(draw);
}

// Draw the single lines of text.
function drawText(x, y) {
  
  context.fillText("ART IS A", x, y + line4Diff);
  context.strokeText("ART IS A", x, y + line4Diff);
  
  context.fillText("COPY OF A COPY", x, y + line3Diff);
  context.strokeText("COPY OF A COPY", x, y + line3Diff);
  
  context.fillText("OF A COPY OF", x, y + line2Diff);
  context.strokeText("OF A COPY OF", x, y + line2Diff);
  
  context.fillText("A FORM", x, y + line1Diff);
  context.strokeText("A FORM", x, y + line1Diff);
}

// We do this so we don't have to calculate these EVERY loop.
function prepareColorSets(iterations) {
  fullColorSet = [];
  for( var i = 0; i < iterations; i++ ) {
    fullColorSet.push(colourGradientor(1 - i / iterations, startRGB, endRGB));
  }
}

// THNX - http://stackoverflow.com/questions/14482226/how-can-i-get-the-color-halfway-between-two-colors
function colourGradientor(p, rgb_beginning, rgb_end){

  var w = p * 2 - 1;
  var w1 = (w + 1) / 2.0;
  var w2 = 1 - w1;
  var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
             parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
             parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2)];
  return rgb;
};

window.onresize = init;




(function emojiCursor() {
  
  var possibleEmoji = ["art", "art", "art", "art"]
  var width = window.innerWidth;
  var height = window.innerHeight;
  var cursor = {x: width/2, y: width/2};
  var particles = [];
  
  function init() {
    bindEvents();
    loop();
  }
  
  // Bind events that are needed
  function bindEvents() {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchstart', onTouchMove);
    
    window.addEventListener('resize', onWindowResize);
  }
  
  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  
  function onTouchMove(e) {
    if( e.touches.length > 0 ) {
      for( var i = 0; i < e.touches.length; i++ ) {
        addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
      }
    }
  }
  
  function onMouseMove(e) {    
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    
    addParticle( cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
  }
  
  function addParticle(x, y, character) {
    var particle = new Particle();
    particle.init(x, y, character);
    particles.push(particle);
  }
  
  function updateParticles() {
    
    // Updated
    for( var i = 0; i < particles.length; i++ ) {
      particles[i].update();
    }
    
    // Remove dead particles
    for( var i = particles.length -1; i >= 0; i-- ) {
      if( particles[i].lifeSpan < 0 ) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
    
  }
  
  function loop() {
    requestAnimationFrame(loop);
    updateParticles();
  }
  
  /**
   * Particles
   */
  
  function Particle() {

    this.lifeSpan = 120; //ms
    this.initialStyles ={
      "position": "absolute",
      "display": "block",
      "pointerEvents": "none",
      "z-index": "10000000",
      "fontSize": "40px",
      "color": "black",
      "font-family":"Helvetica",
      "will-change": "transform"
    };

    // Init, and set properties
    this.init = function(x, y, character) {

      this.velocity = {
        x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: 1
      };
      
      this.position = {x: x - 10, y: y - 20};

      this.element = document.createElement('span');
      this.element.innerHTML = character;
      applyProperties(this.element, this.initialStyles);
      this.update();
      
      document.body.appendChild(this.element);
    };
    
    this.update = function() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;
      
      this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
    }
    
    this.die = function() {
      this.element.parentNode.removeChild(this.element);
    }
    
  }
  
  /**
   * Utils
   */
  
  // Applies css `properties` to an element.
  function applyProperties( target, properties ) {
    for( var key in properties ) {
      target.style[ key ] = properties[ key ];
    }
  }
  
  init();
})();

