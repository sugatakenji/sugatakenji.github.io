var audio = document.querySelector("#audio");
audio.muted = false;
audio.volume = 1;
////////////////Criando a Cena e o render/////////////
const scene = new THREE.Scene();
const camera =  new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
////////////////Criando a Cena e o render/////////////







////////////////vortex bg//////////////////////

////////////////Texture procedural///////////
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#00ff00';
ctx.strokeRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width/2, canvas.height/2);
ctx.strokeRect(canvas.width/2, canvas.height/2,canvas.width/2, canvas.height/2);
var texture = new THREE.CanvasTexture(canvas);
var testematerial = new THREE.MeshStandardMaterial({
  side: THREE.BackSide,
    map: texture,
    roughness : 1.0,
});
testematerial.map.wrapS = THREE.RepeatWrapping;
testematerial.map.wrapT = THREE.RepeatWrapping;
testematerial.map.repeat.set(10, 10);
////////////////Texture procedural/////////////

////////////////Criando a geometria do vortex/////////////
var points = [];
for (var i = 0; i < 4; i += 1) {
  var x = Math.sqrt(225 - ((i*4)**2)) ;
  var z = Math.sqrt(225 - (x**2)) ;
  points.push(new THREE.Vector3(-x + 15 ,-i*(i**2)*0.1, -z ));
}
var curve = new THREE.CatmullRomCurve3(points);
var tubeGeometry = new THREE.TubeGeometry(curve, 10,1, 50, false);
var tubeMaterial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
});
////////////////Criando a geometria do vortex/////////////
var tube = new THREE.Mesh(tubeGeometry, testematerial);
var tublight = new THREE.PointLight(0x005560, 100,);
/////////////////////atualizando a posição do tubo//////
var speed = 1;
window.addEventListener("wheel", event => {
  speed = event.deltaY/10;

});

function updateMaterial() {
  



  testematerial.map.offset.x += 0.001*speed;
  testematerial.map.offset.y += 0.005*speed;
};




/////////////////Criando a iluminação//////////////////////
var tublight = new THREE.PointLight(0x005560, 100,);
const amblight = new THREE.AmbientLight(0xffffff);
const lightpoint = new THREE.PointLight(0xffffff,3);
const lighthelper = new THREE.PointLightHelper(tublight);
tublight.position.set(9,-5.4,12);
lightpoint.position.set(0,2,5);
camera.position.setZ(0);
///////////////////////////////////////






////////////////Adicionado os elementos na cena/////////////
scene.add(amblight,lightpoint,tublight,lighthelper);
scene.add(tube);
////////////////Adicionado os elementos na cena/////////////

function animate(){
  requestAnimationFrame(animate);
  updateMaterial();
  renderer.render(scene, camera);
}

animate();