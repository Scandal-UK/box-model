import { AmbientLight, BoxGeometry, LinearFilter, Mesh, MeshLambertMaterial, PerspectiveCamera, PointLight, Scene, TextureLoader, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Create the renderer with correct pixel ratio & aspect ratio
const renderer = new WebGLRenderer( { alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Set the scene and camera
const scene = new Scene();
const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set( -15, 10, 20 );

// Add the lights
const light = new PointLight( 0xffffff, .4 );
light.position.set( 10, 10, 10 );
scene.add( light );

const ambientLight = new AmbientLight( 0xbbbbbb );
scene.add( ambientLight );

// Load the textures
const textureLoader = new TextureLoader();
const boxFrontTexture = textureLoader.load( "textures/box-front.png" );
const boxBackTexture = textureLoader.load( "textures/box-back.png" );
const boxLeftTexture = textureLoader.load( "textures/box-left.png" );
const boxRightTexture = textureLoader.load( "textures/box-right.png" );
const boxTopTexture = textureLoader.load( "textures/box-top.png" );
const boxBottomTexture = textureLoader.load( "textures/box-bottom.png" );

// Use the linear filter for the textures to avoid blurriness
boxFrontTexture.minFilter
 = boxBackTexture.minFilter
 = boxLeftTexture.minFilter
 = boxRightTexture.minFilter
 = boxTopTexture.minFilter
 = boxBottomTexture.minFilter
 = LinearFilter;

const boxFront = new MeshLambertMaterial( { color: 0xffffff, map: boxFrontTexture } );
const boxBack = new MeshLambertMaterial( { color: 0xffffff, map: boxBackTexture } );
const boxLeft = new MeshLambertMaterial( { color: 0xffffff, map: boxLeftTexture } );
const boxRight = new MeshLambertMaterial( { color: 0xffffff, map: boxRightTexture } );
const boxTop = new MeshLambertMaterial( { color: 0xffffff, map: boxTopTexture } );
const boxBottom = new MeshLambertMaterial( { color: 0xffffff, map: boxBottomTexture } );

const materials = [
  boxRight,
  boxLeft,
  boxTop,
  boxBottom,
  boxFront,
  boxBack
];

const box = new Mesh( new BoxGeometry( 10, 8, 1.2, 4, 4, 1 ), materials );
scene.add( box );

// Create the orbit controls for the camera
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enablePan = false;
controls.enableZoom = false;

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
animate();
