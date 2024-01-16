import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const planegeometry = new THREE.PlaneGeometry( 20, 20, 32 ); // Plane geometry for the ground
// Add texture to the ground
var texture = new THREE.TextureLoader().load( 'public/sol.jpg' );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 5, 5 );
const materialplane = new THREE.MeshPhongMaterial( {color: 0xffff00, side: THREE.DoubleSide, map: texture} );
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1, 0);
scene.add(cube);

var plane = new THREE.Mesh( planegeometry, materialplane );
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Moove camera with mouse
camera.position.set(0, 20, 6);
var controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, 0);
function cameramoove() { controls.update(); 
    renderer.render(scene, camera); 
    requestAnimationFrame(cameramoove); 
} 
requestAnimationFrame(cameramoove);

// Add the lights
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Add axe helper
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add grid helper
var size = 20;
var divisions = 10;
var gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Make the axes appear with the "a" key and the grid with the "g" key
document.addEventListener('keydown', (e) => {
    if (e.key === 'a') {
        axesHelper.visible = !axesHelper.visible;
    }
    if (e.key === 'g') {
        gridHelper.visible = !gridHelper.visible;
    }
});

// Add other cubes, spheres, cylinders, cones and torus to the scene
var geometry2 = new THREE.BoxGeometry(1, 1, 1);
var material2 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
var cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(2, 1, 0);
scene.add(cube2);

var geometry3 = new THREE.SphereGeometry(1, 32, 32);
var material3 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
var sphere = new THREE.Mesh(geometry3, material3);
sphere.position.set(4, 1, 0);
scene.add(sphere);

var geometry4 = new THREE.CylinderGeometry(1, 1, 2, 32);
var material4 = new THREE.MeshPhongMaterial({ color: 0x00ffff });
var cylinder = new THREE.Mesh(geometry4, material4);
cylinder.position.set(6, 1, 0);
scene.add(cylinder);

var geometry5 = new THREE.ConeGeometry(1, 2, 32);
var material5 = new THREE.MeshPhongMaterial({ color: 0xff00ff });
var cone = new THREE.Mesh(geometry5, material5);
cone.position.set(8, 1, 0);
scene.add(cone);

var geometry6 = new THREE.TorusGeometry(1, 0.5, 16, 100);
var material6 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
var torus = new THREE.Mesh(geometry6, material6);
torus.position.set(10, 1, 0);
scene.add(torus);

// Add fog
scene.fog = new THREE.Fog(0xaaaaaa, 2, 35);

// Draw a tree

// Trunk
var geometry7 = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
var material7 = new THREE.MeshPhongMaterial({ color: 0x663300 });
var cylinder2 = new THREE.Mesh(geometry7, material7);
cylinder2.position.set(-2, 2, 0);
scene.add(cylinder2);

// Dessine le feuillage
// Ajoute la texture feuillage
var feuille = new THREE.TextureLoader().load( 'public/feuille.jpg' );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 5, 5 );

var geometry8 = new THREE.SphereGeometry(2, 32, 32);
var material8 = new THREE.MeshPhongMaterial({ color: 0x009900, map: feuille });
var sphere2 = new THREE.Mesh(geometry8, material8);
sphere2.position.set(-2, 5, 0);
scene.add(sphere2);

// Dessine des pommes
var appleCount = 10; // Number of apples to draw
var appleRadius = 2; // Radius around the tree trunk to distribute the apples

var appleGeometry = new THREE.SphereGeometry(0.1, 32, 32);
var appleMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

for (var i = 0; i < appleCount; i++) {
    // Ajoute des pommes à l'arbre
    var apple = new THREE.Mesh(appleGeometry, appleMaterial);
    var appleAngle = Math.random() * Math.PI * 2;
    var appleHeight = Math.random() * 2 - 0.5;
    apple.position.set(
        Math.cos(appleAngle) * appleRadius,
        appleHeight,
        Math.sin(appleAngle) * appleRadius
    );
    sphere2.add(apple);
}
