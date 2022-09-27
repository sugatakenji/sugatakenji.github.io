import './style.css';
import * as THREE from 'three/Three.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xc0cf00});
const torus = new THREE.Mesh(geometry,material);

const amblight = new THREE.AmbientLight(0xffffff);
const lightpoint = new THREE.PointLight(0xffffff,3);
const lighthelper = new THREE.PointLightHelper(lightpoint);
const gridhelper = new THREE.GridHelper(200, 50);
lightpoint.position.set(0,2,5);


camera.position.setZ(30);
const controls = new OrbitControls(camera, renderer.domElement);



////////////////vortex bg///////////////////////
const loader = new THREE.TextureLoader();
var points = [];
for (var i = 0; i < 4; i += 1) {
  var x = Math.sqrt(225 - ((i*4)**2)) ;
  var z = Math.sqrt(225 - (x**2)) ;
  points.push(new THREE.Vector3(-x + 15 ,-i, -z ));
}
var curve = new THREE.CatmullRomCurve3(points);
var tubeGeometry = new THREE.TubeGeometry(curve, 10,1, 50, false);
var tubeMaterial = new THREE.MeshBasicMaterial({
  side: THREE.BackSide,
 // color: 0x00ff00, wireframe: true
 map: loader.load('assets/tunel_TEXTURE.jpg'),
});
tubeMaterial.map.wrapS = THREE.RepeatWrapping;
tubeMaterial.map.wrapT = THREE.RepeatWrapping;
tubeMaterial.map.repeat.set(10, 1);
var tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
function updateMaterialOffset() {
  // Update the offset of the material with the defined speed
  tubeMaterial.map.offset.x += 0.002;
};
///////////////////////////////////////

////////////////////import models///////////////////
var loaderTV = new GLTFLoader();
loaderTV.load( 'assets/TV.glb', function ( gltf )
{
    const tv = gltf.scene; 
    tv.rotation.y = -5.14 / 2;
    tv.position.y = -0.5;
    tv.position.z = -1.0;
    
    //tv.position.x = -0.2;
    tv.scale.set(0.25, 0.25, 0.25);
     scene.add(tv);
} );

var loaderTELA = new GLTFLoader();
loaderTELA.load( 'assets/tela.glb', function ( gltf )
{
    const video = document.getElementById('video');
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.flipY = false;
   
    const videoMaterial =  new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.FrontSide, toneMapped: false} );

    const tela = gltf.scene; 
    tela.rotation.y = -3.14 / 2;
    tela.position.y = -0.5;
    tela.position.z = -1.0;
   // tela.position.x = -0.2;      
    tela.scale.set(0.25, 0.25, 0.25);
    tela.traverse((o) => {
      if (o.isMesh) o.material = videoMaterial;
    });
    //scene.add(tela);
} );
///////////////////////////////////////






scene.add(amblight,lightpoint,lighthelper, gridhelper);
scene.add(tube)


function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x +=0.05;
  updateMaterialOffset();
  renderer.render(scene, camera);
  controls.update();
}

animate();