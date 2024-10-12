// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import {AnimationAction} from 'three';

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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);



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
let op=1;

let home =document.querySelector(".HomePage");

//Scroll Eventlistener---
window.addEventListener("scroll", (e)=>{

  currentScroll = window.scrollY * 0.001;
  console.log(currentScroll);
  if(currentScroll>6)
  {
      scene.remove(object);
      scene.add(cube);
      camera.position.z=5;
  }
  else
  {
    scene.add(object);
    camera.position.z=700;
  }

  //set opacity value
  op=1-(currentScroll*0.2)

  if(currentScroll > 1) {
    object.scale.set(currentScroll, currentScroll, currentScroll);
  }
});

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;


function animate() {
  requestAnimationFrame(animate);
  // Set opacity of a HomePage---
  if(op<0)
  {
    home.style.display="none"
  }
  else
  {
    home.style.display="flex";
    home.style.opacity=op;
    // console.log(op);
  }

//Eye Movement
  if(currentScroll<2)
  {
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  else
  {
    object.rotation.y = -1.54;
    object.rotation.x = -0.001;
  }
  renderer.render(scene, camera);

}

//Loader Animation
// const load=document.querySelector(".loader");

// setTimeout(() => {
//   load.style.top="-100%"
// }, 2000);

// gsap.from(".HomePage .leftbox",{
//   x:-200,
//   duration:3,
// })


let aboutMeElement = document.querySelector('.rightbox p');
let aboutMe=aboutMeElement.textContent;
let text = '';
let i = 0;
let speed = 20; // adjust the speed of the autowrite effect

function autowrite(){
  if (i < aboutMe.length) {
    text += aboutMe.charAt(i);
    aboutMeElement.textContent = text;
    i++;
    setTimeout(autowrite, speed);
  }
}
window.onload = autowrite;






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


