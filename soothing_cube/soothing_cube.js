let angle = 0;
let sq_width = 50; // larger square width  --> fewer squares
let ma;
let maxD;
let ortho_size = 800;
let wavelength_factor = 250; // larger value --> larger wavelength
let prop_speed = 0.05; // affects speed of ripple; the angle update step
var colors = [0,0,1, 1,0,0, 0,1,0, 1,0,1,];

// here the z and x axes make up the plane along which the ripple 
// propagates while the y-axis extends upwards from the center of the ripple
//                       y
//                       |
//                       |____x
//                      / 
//                    z/    

let rightLight = new p5.Vector([1], [0], [0]);
let topLight = new p5.Vector([0], [-1], [0]);
let leftLight = new p5.Vector([0], [0], [1]);



function setup() {
  createCanvas(ortho_size, ortho_size, WEBGL); //sets the canvas area
  up_factor = atan(cos(QUARTER_PI)); // determines the camera angle above the plane
  // controls the wavelenth (dist from center to a point)
  maxD = dist(0, 0, wavelength_factor, wavelength_factor);  // dist(x1,y1,x2,y2)
}




function draw() {
  background(50); // sets gray canvas background darkness
  // sets the ortho view of the cubes
  ortho(-ortho_size, ortho_size, ortho_size, -ortho_size, 0, 1200);
  rotateX(-up_factor); // rotates camera up
  rotateY(-QUARTER_PI); // rotates camera 45 degrees 
  colorMode(RGB,255);

  // iterates thru each square of the array to update height
  for (let z = 0; z < height; z += sq_width) {
    for (let x = 0; x < width; x += sq_width) {

      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      // offset allows angle to change b/w adjacent squares
      let adj_angle = angle + offset;
      // map(function, closest oscil. height on bot, closest osc height on top,
      //            furthest osc height on bottom, furthest osc height on top )
      let h = round(map(sin(adj_angle), -1, 1, 100, 300));
      translate(x-width/2, 0, z-height/2); //sets heights of boxes for each time interval
      let color_h = map(sin(adj_angle), -1, 1, 100, 300)

      directionalLight(0, ((color_h-100)/2)*(255/200), 255, topLight); //top
      normalMaterial();

    //   directionalLight(255, 255, 255, rightLight); // right
    //   directionalLight(((color_h-100)/2), 100, 100, topLight); //top

      box(sq_width, h, sq_width); // makes each column w/ 2 as a sq w/ varying height
      pop();
    }
  }
  angle -= prop_speed;
}