import React, { Component } from 'react';
import * as THREE from "three";
import { Layers } from 'three';



export class GameWindow extends Component {
    //test: React.RefObject<unknown>;
    mount: any;
    state = {
        gameWon : false
    }

    
    componentDidMount(){
        // === THREE.JS CODE START ===
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 
            75, 
            window.innerWidth/window.innerHeight, 
            0.1, 
            1000 
        );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.BasicShadowMap;

        this.mount.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1.5, 1 );
        const material = new THREE.MeshPhongMaterial( { color: 0xaa99d4 } )
        const cube = new THREE.Mesh( geometry, material );        
        scene.add( cube );

        

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add( ambientLight );

        var spotLight = new THREE.PointLight(0xffffff, 0.5 );
        spotLight.position.set(10, 10, 10);
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 0.1;
        spotLight.shadow.camera.far = 25;
        scene.add( spotLight );

        camera.position.z = 3;

        camera.lookAt(scene.position);

        var xRate = Math.round((Math.random() * (30 - 5)))/1000;
        var yRate = Math.round((Math.random() * (30 - 5)))/1000;

        document.onkeydown = function(key) {

            if (key.key == "ArrowLeft"){
                yRate += -0.001;
            } else if (key.key == "ArrowRight"){
                yRate += 0.001;
            } else if (key.key == "ArrowUp"){
                xRate += -0.001;
            } else if (key.key == "ArrowDown"){
                xRate += 0.001;
            }

            xRate = Math.round(xRate * 1000) / 1000
            yRate = Math.round(yRate * 1000) / 1000
        }
        

        var animate = function (this: any, callback: Function) {
            
            //light.position.x += 0.05
            const frame = requestAnimationFrame( animate.bind(this, callback) );

            if (xRate === 0.0 && yRate === 0.0){
                cancelAnimationFrame( frame )
                callback();
            } else {
                
                cube.rotation.x += xRate;
                cube.rotation.y += yRate;
                renderer.render( scene, camera );
            }
          


 
        };

        animate(() => {this.setState({gameWon : true})});
        // === THREE.JS EXAMPLE CODE END ===
    }

    render(){

        let gameWon = this.state.gameWon
        let winText = <h1 style={{margin : 0, color : "lightblue", position : "absolute"}}>
            Use the arrow keys to try and stop the block from spinning!
        </h1>
        if (gameWon){
            winText = <h1 style={{
                color : "lightblue",
                position : "absolute"
            }}>You Win!</h1>
        }
        return (
            <div>
                {winText}
                <div ref={ref => (this.mount = ref)} />
            </div>
        )
    }
}



//const rootElement = document.getElementById("root");
//ReactDOM.render()