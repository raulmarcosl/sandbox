$(document).ready(function () {
  var camera, scene, renderer, geometry, material, mesh;
  
  init(0x00dddd);
  animate(); 

  function init(smokeColor) {
    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    scene.add( camera );

    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    material = new THREE.MeshLambertMaterial( { color: 0xaa6666, wireframe: false } );
    mesh = new THREE.Mesh( geometry, material );
    cubeSineDriver = 0;

    textGeo = new THREE.PlaneGeometry(300,300);
    textTexture = THREE.ImageUtils.loadTexture('sandbox_texture.png');
    textMaterial = new THREE.MeshLambertMaterial({color: '#ffff00', opacity: 1, map: textTexture, transparent: true, blending: THREE.AdditiveBlending})
    text = new THREE.Mesh(textGeo,textMaterial);
    text.position.z = 800;
    scene.add(text);

    light = new THREE.DirectionalLight(0xffffff,0.5);
    light.position.set(-1,0,1);
    scene.add(light);

    smokeTexture = THREE.ImageUtils.loadTexture('smoke_texture.png');
    smokeMaterial = new THREE.MeshLambertMaterial({color: smokeColor, map: smokeTexture, transparent: true});
    smokeGeo = new THREE.PlaneGeometry(300,300);
    smokeParticles = [];

    for (p = 0; p < 150; p++) {
      var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
      particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
      particle.rotation.z = Math.random() * 360;
      scene.add(particle);
      smokeParticles.push(particle);
    }
  
    document.body.appendChild( renderer.domElement );
  }
  
  function animate() {
    delta = clock.getDelta();
    requestAnimationFrame( animate );
    evolveSmoke();
    render();
  }
  
  function evolveSmoke() {
    var sp = smokeParticles.length;
    while(sp--) {
      smokeParticles[sp].rotation.z += (delta * 0.10);
    }
  }

  function render() {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.0;
    cubeSineDriver += .01;
    mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
    renderer.render( scene, camera ); 
  }

  function hexFromRGB(r, g, b) {
    var hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 )
    ];
    $.each( hex, function( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
    });
    return hex.join( "" ).toUpperCase();
  }
  function refresh() {
    var red = $( "#red" ).slider( "value" ),
      green = $( "#green" ).slider( "value" ),
      blue = $( "#blue" ).slider( "value" ),
      hex = hexFromRGB( red, green, blue );
    
    console.log(hex);

    // init(hex);
    // animate();
  }

  $( "#red, #green, #blue" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    slide: refresh,
    change: refresh
  });
  
  $( "#red" ).slider( "value", 255 );
  $( "#green" ).slider( "value", 140 );
  $( "#blue" ).slider( "value", 60 );

  $("#slider-lines, #slider-ratio").on("slidestop", function() {
    var lines = $("#slider-lines").slider("value");
    var ratio = $("#slider-ratio").slider("value");
    console.log('lines: ', lines);
    console.log('ratio: ', ratio);
    draw(lines, ratio);
  });

  $( function() {
    $( "#slider-lines" ).slider({
      min: 1,
      max: 1000,
      step: 10
    }).trigger('slide');

    $( "#slider-ratio" ).slider({
      min: 0.005,
      max: 0.1,
      step: 0.005
    }).trigger('slide');
  } );

  $("#red, #green, #blue").on("slidestop", function() {
    console.log('change');
    var red = $( "#red" ).slider( "value" ),
      green = $( "#green" ).slider( "value" ),
      blue = $( "#blue" ).slider( "value" ),
      hex = hexFromRGB( red, green, blue );
    
    console.log(hex);

    init(hex);
    animate()

  });
});