let scene, camera, renderer, cube, circle;

function init() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let image = urlParams.get('image')

    if (!image) {
        image = 'img/rene.jpeg';
    }



    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    addCube(image);

    for (let i = 0; i < 1000; i++) {
        addCircle();
    }

    camera.position.z = 5;
}

function addCircle() {

    const colour = Math.random() < 0.5 ? 0xffff00 : '#0000FF'

    const geometry = new THREE.CircleGeometry( 0.1, 40 );
    const material = new THREE.MeshBasicMaterial( { color: colour } );
    const circle = new THREE.Mesh( geometry, material );
    circle.position.x = Math.random() * 200 / 10 + 1 - 10;
    circle.position.y = Math.random() * 200 / 10 + 1 - 10;
    scene.add( circle );
}

function addCube(image) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const texture = new THREE.TextureLoader().load(image);
    const material = new THREE.MeshBasicMaterial({map: texture});
    cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
}


function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.002;

    camera.position.z += 0.005;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();