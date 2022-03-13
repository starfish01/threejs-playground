let scene, camera, renderer, cube, circle;


const loader = new GLTFLoader();




function init() {
    let image = 'img/brick_bump.jpeg';

    const element = document.getElementById('container');
    console.log(element.offsetWidth);
    console.log(element.offsetHeight);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, element.offsetWidth / element.offsetHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(element.offsetWidth, element.offsetHeight);

    element.appendChild(renderer.domElement);

    // addCube(image);

    // loadGLTF();

    addText('No', 25);
    addText('Thanks', 50);

    for (let i = 0; i < 1000; i++) {
        addCircle();
    }

    camera.position.z = 5;
}


//
function loadGLTF() {
    let balloonLoader = new GLTFLoader();
    // let image = 'img/brick_bump.jpeg';

    balloonLoader.load('model/untitled.gltf', (gltf) => {
        Mesh = gltf.scene;
        Mesh.scale.set(0.2,0.2,0.2);
        scene.add(Mesh);
        Mesh.position.x = 0;
        Mesh.position.y = 10;
        Mesh.position.z = 15;
    });
}


function addText(text, zPosition) {
    var loader = new THREE.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var geometry = new THREE.TextGeometry( text, {
            font: font,
            size: 1,
            height: 0.5,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.05,
            bevelSegments: 3
        } );
        geometry.center();

        var material = new THREE.MeshNormalMaterial();
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.z = zPosition;
        scene.add( mesh );
    } );
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}


function addCircle() {

    const geometry = new THREE.CircleGeometry( 0.1, 40 );
    const material = new THREE.MeshBasicMaterial( { color:  getRandomColor() } );
    const circle = new THREE.Mesh( geometry, material );
    circle.position.x = Math.random() * 200 / 10 + 1 - 10;
    circle.position.y = Math.random() * 200 / 10 + 1 - 10;
    circle.position.z = Math.random() * 100;
    scene.add( circle );
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




function addCube(image) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const texture = new THREE.TextureLoader().load(image);
    const material = new THREE.MeshBasicMaterial({map: texture});
    cube = new THREE.Mesh(geometry, material);
    cube.position.z = 0;

    scene.add(cube);
}
function rotateCube() {
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.002;
}


function animate() {
    requestAnimationFrame(animate);
    // rotateCube();
    // camera.rotate.y = 90 * Math.PI / 180
    //
    // camera.position.z += 0.005;
    renderer.render(scene, camera);
}


document.getElementById("body").onscroll = function() {scrollFn()};

function scrollFn() {
    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    camera.position.z = (scrollTop / 100) + 5;
    // camera.position.x = (scrollTop / 1000) + 5;
    camera.rotation.y = scrollTop / 50000;

    console.log(scrollTop);

    // console.log(scrollTop / 1000);
}







function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();