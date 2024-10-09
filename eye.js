// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 700;



let object;
let objToRender='eye';
const loader = new GLTFLoader();
loader.load(`models/${objToRender}/scene.gltf`,
     function(gltf)
     {
        object=gltf.scene;
        scene.add(object);
     },
     function(error)
     {
        console.error(error);
     }
);

const canvas = document.getElementById('draw');
const renderer = new THREE.WebGLRenderer({ canvas ,antialias: true,});
renderer.setSize(window.innerWidth, window.innerHeight);

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1.5); // (color, intensity)
topLight.position.set(300, 300, 300) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

//Add ambient light to the scene, so we can see the 3D model
const ambientLight = new THREE.AmbientLight(0x333333,1);
scene.add(ambientLight);

// Add helpers for all lights
// const topLightHelper = new THREE.DirectionalLightHelper(topLight, 10);
// scene.add(topLightHelper);

// const ambientLightHelper = new THREE.PointLightHelper(ambientLight, 10);
// scene.add(ambientLightHelper);




let currentScroll=0;
let targetScroll=0;
let ease=0.00025

let theta1=0;
let theta2=0;
let theta3=0;

let animationActive=true;
let animationFreamRequest=false;

window.addEventListener("scroll", (e)=>{
  console.log(window.scrollY); // Changed from pageYOffset to scrollY
  currentScroll=window.scrollY*0.001
  // camera.position.z-=currentScroll*0.1;
  if(currentScroll>1)
  object.scale.set(currentScroll,currentScroll,currentScroll);
  
  
});

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;


function animate() {
  requestAnimationFrame(animate);
  console.log(object.position);
  if(currentScroll<2)
  {
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    // console.log(object.rotation.y);
    // console.log(object.rotation.x);

  }
  else
  {
    // object.rotation.y = -Math.PI/2;
    object.rotation.y = -1.54;
    object.rotation.x = -0.001;
  }
  renderer.render(scene, camera);

}





//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  //add mouse position listener, so we can make the eye move
  document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  
  //Start the 3D rendering
  animate();


