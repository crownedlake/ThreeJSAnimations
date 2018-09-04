	//Name of the webpage is set
	document.title = "CLASSIFICATION OF TRIANGLES";

	/************************CSS File style.css is added to index.html**********************/
  var div;

	var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', 'style.css');
		document.getElementsByTagName('head')[0].appendChild(link);

/*******************HTML ELEMENTS ARE ADDED***************/
	div = document.createElement("div");														/* Based on Sides option div */
		div.setAttribute('class','label');
		div.setAttribute('id', 'baseSides');
		div.setAttribute('onclick','baseSides()');
		div.innerHTML= "BASED ON SIDES";
		document.body.appendChild(div);

	div = document.createElement("div");														/* Based on Angles option div */
		div.setAttribute('class','label');
		div.setAttribute('id', 'baseAngles');
		div.setAttribute('onclick','baseAngles()');
		div.innerHTML= "BASED ON ANGLES";
		document.body.appendChild(div);

	div = document.createElement("div");													/* Show examples option div */
		div.setAttribute('class','label');
		div.setAttribute('id', 'example');
		div.setAttribute('onclick','example()');
		div.innerHTML= "EXAMPLES";
		document.body.appendChild(div);

	div = document.createElement("div");													/*Adding 2 divs to implement Go Forward and Go Back arrows*/
		div.setAttribute('id', 'Back');
		div.setAttribute('onclick','decframeCount()');
		document.body.appendChild(div);

	div = document.createElement("div");
		div.setAttribute('id', 'Forward');
		div.setAttribute('onclick','incframeCount()');
		document.body.appendChild(div);


	/* Global Variables */
	/* We define frame of dimension 100x50 */
	/* We define a ball which bounces in the xy plane */
	/* We define modifiable prameters : gravity, ball size, initial velocity */
	/* We support draggable ball */
	/* Scene Dimensions (in meters: at z = 0) */

	var mySceneTLX;        /* Top Left corner X coordinate */
	var mySceneTLY;        /* Top Left corner Y coordinate */
	var mySceneBRX;        /* Bottom Right corner X coordinate */
	var mySceneBRY;        /* Bottom Right corner Y coordinate */

 	//////////////////////ALL threeOBJECTS///////////////////////////////
	var background;					/* background object (PlaneGeometry) */
	var leftPane;						/* left panel to show triangles based on sides (PlaneGeometry) */
	var outlineleftPane;		/* outline of left panel (for better look) */
	var rightPane;					/* right panel to show triangles based on angles (PlaneGeometry) */
	var outlinerightPane;		/* outline of right panel (for better look) */
	var triangle=[];				/* array of 6 triangle objects */
	var arrow1;							/* ConeGeometry to show arrow */
	var arrow2;							/* ConeGeometry to show arrow */
	var outlinearrow1;			/* outline of arrow1 */
	var outlinearrow2;			/* outline of arrow2 */
	var equiTriangle;				/* EQUILATERAL triangle object */
	var isoscelesTriangle;	/* ISOSCELES triangle object */
	var scaleneTriangle;		/* SCALENE triangle object */
	var acuteTriangle;		  /* ACUTE triangle object */
	var rightTriangle;			/* RIGHT ANGLED triangle object */
	var obtuseTriangle;			/* OBTUSE triangle object */
	var exampleBackground;	/*PlaneGeometry object TO SHOW example background*/
	var examplePlane = [];	/*PlaneGeometry objects TO SHOW examples*/
	var stick1;							/* Ice-Cream Stick */
	var stick2;							/* Ice-Cream Stick */
	var stick3;							/* Ice-Cream Stick */
	var stick4;							/* Cricket Bat */
	var stick5;							/* Wooden Ruler */
	var text=[];						/* Ice-Cream Stick */
	////////////////////END OF OBJECTS/////////////////////////////////

	var centerX;						/*X coordinate of center of screen*/
	var centerY;						/*Y coordinate of center of screen*/
	var leftPaneX;					/*X coordinate of left panel*/
	var leftPaneY;					/*Y coordinate of left panel*/
	var rightPaneX;					/*X coordinate of right panel*/
	var rightPaneY;					/*Y coordinate of right panel*/

	var scale;							/* variable to increase and decrease size of triangles */
	var inc;								/* variable to set increase or decrease of triangles */
	var translate;					/* variable to set movement of left and right panels */
	var lPane;							/* variable initialise movement of left or right panels */
	var exampleShow;				/* variable to show examples */
	var frameCount;					/* variable to keep count of current frame */
	var stickRotation;			/* variable to rotate sticks */
	var canvas;
	var context;

	/* function to start movement of left panel when clicked on Based on Sides option */
	function baseSides()
	{
	  frameCount =1;
	  for(var i= 4;i<=6;i++)
	  {
	    triangle[i].visible=false;
	  }
	  translate=1;
	  lPane=1;
	  arrow1.visible=true;
	  arrow2.visible=true;
	  outlinearrow1.visible=true;
	  outlinearrow2.visible=true;
		document.getElementById("Forward").style.visibility = "visible";
		document.getElementById("Back").style.visibility = "visible";
	  document.getElementById("baseAngles").style.visibility = "hidden";
	  document.getElementById("baseSides").style.visibility = "hidden";
		document.getElementById("example").style.visibility = "hidden";
	}

	/* function to start movement of right panel when clicked on Based on Sides option */
	function baseAngles()
	{
	  frameCount = 1;
	  for(var i= 1;i<=3;i++)
	  {
	    triangle[i].visible=false;
	  }
	  translate=1;
	  lPane=0;
	  arrow1.visible=true;
	  arrow2.visible=true;
	  outlinearrow1.visible=true;
	  outlinearrow2.visible=true;
		document.getElementById("Forward").style.visibility = "visible";
		document.getElementById("Back").style.visibility = "visible";
	  document.getElementById("baseAngles").style.visibility = "hidden";
	  document.getElementById("baseSides").style.visibility = "hidden";
		document.getElementById("example").style.visibility = "hidden";
	}


	/* function to start EXAMPLES when clicked on examples option */
	/* position of divs elements are set for each triangle */
	/* to show each angle and each edge */
	function example()
	{
		exampleShow++;
		defaultProperties();
		stick1.visible=false;
		stick2.visible=false;
		stick3.visible=false;
		stick4.visible=false;
		stick5.visible=false;
		if(exampleShow==1)
		{
			document.getElementById("baseAngles").style.visibility = "hidden";
			document.getElementById("baseSides").style.visibility = "hidden";
			document.getElementById("example").innerHTML="NEXT";
			stick2.visible=true;
			stick3.visible=true;
			stick5.visible=true;
			stick2.position.set(centerX-12.5,centerY,0);
			stick3.position.set(centerX+7.5,centerY,0);
			stick5.position.x += 10;
			stick1.position.x += 10;
			stick4.position.x += 10;
			exampleBackground.visible=true;
		}
		else if (exampleShow==2)
		{
			examplePlane[0].visible=true;
		}
		else if (exampleShow==3)
		{
			stick1.visible=true;
			stick2.visible=true;
			stick2.position.set(centerX-10,centerY,0);
			stick3.position.set(centerX+5,centerY,0);
		}
		else if (exampleShow==4)
		{
			examplePlane[1].visible=true;
		}
		else if (exampleShow==5)
		{
			stick5.visible=true;
			stick4.visible=true;
			stick2.visible=true;
			stick2.position.set(centerX-12.5,centerY,0);
		}
		else if (exampleShow==6)
		{
			examplePlane[2].visible=true;
		}
		else if (exampleShow==7)
		{
			stick2.position.set(centerX-10,centerY,0);
			stick1.visible=true;
			stick2.visible=true;
			stick3.visible=true;
		}
		else if (exampleShow==8)
		{
			examplePlane[3].visible=true;
		}
		else if (exampleShow==9)
		{
			stick1.visible=true;
			stick2.visible=true;
		}
		else if (exampleShow==10)
		{
			examplePlane[4].visible=true;
		}
		else if (exampleShow==11)
		{
			stick1.visible=true;
			stick2.visible=true;
		}
		else if (exampleShow==12)
		{
			examplePlane[5].visible=true;
			document.getElementById("example").innerHTML="HOME";
		}
		else
		{
			document.getElementById("baseAngles").style.visibility = "visible";
			document.getElementById("baseSides").style.visibility = "visible";
			exampleBackground.visible=false;
			exampleShow=0;
			document.getElementById("example").innerHTML="EXAMPLES";
			stick1.position.x -= 10;
			stick2.position.x -= 10;
			stick3.position.x -= 10;
			stick4.position.x -= 10;
			stick5.position.x -= 10;
		}
}
	/*This function is called on each arrow click and sets some default properties*/
	function defaultProperties()
	{
		equiTriangle.visible=false;
		isoscelesTriangle.visible=false;
		scaleneTriangle.visible=false;
		acuteTriangle.visible=false;
		rightTriangle.visible=false;
		obtuseTriangle.visible=false;
		for (var i = 0; i < 6; i++)
		{
			text[i].visible=false;
			examplePlane[i].visible=false;
		}
		stickRotation=1;
		stick1.rotateZ(-stick1.rotation.z);
		stick2.rotateZ(-stick2.rotation.z);
		stick3.rotateZ(-stick3.rotation.z);
		stick4.rotateZ(-stick4.rotation.z);
		stick5.rotateZ(-stick5.rotation.z);
	}

	/*This function manages frame elements when back arrow is clicked*/
	function decframeCount()
	{
		defaultProperties();
		document.getElementById("Forward").style.visibility = "visible";
		document.getElementById("Back").style.visibility = "visible";
		arrow1.material.color.setHex(0xffffff);				//sets the click effect of arrow1
		setTimeout(function() {
		arrow1.material.color.setHex(0xff0000);
		}, 100);

		frameCount--;

		if (frameCount <= 1)
		{
			frameCount=1;
			translate= -1;
			triangle[1].material.color.setHex(0x000000);
			triangle[4].material.color.setHex(0x000000);
			if(lPane)
			{
				stick3.visible=false;
			}
			stick1.visible=false;
			stick2.visible=false;
			arrow1.visible=false;
			arrow2.visible=false;
			outlinearrow1.visible=false;
			outlinearrow2.visible=false;
			document.getElementById("Forward").style.visibility = "hidden";
			document.getElementById("Back").style.visibility = "hidden";
		}

	  if(frameCount==2)
	  {
	    triangle[1].material.color.setHex(0x0000ff);
			triangle[2].material.color.setHex(0x000000);
			triangle[4].material.color.setHex(0x0000ff);
			triangle[5].material.color.setHex(0x000000);
			if(lPane)
			{
				stick1.visible=true;
				stick5.visible=false;
				stick2.position.set(centerX-20,centerY,0);
				stick3.position.set(centerX-5,centerY,0);
			}
	  }
		if(frameCount==3)
		{
			triangle[2].material.color.setHex(0x0000ff);
			triangle[3].material.color.setHex(0x000000);
			triangle[5].material.color.setHex(0x0000ff);
			triangle[6].material.color.setHex(0x000000);
			arrow2.visible=true;
			outlinearrow2.visible=true;
			if(lPane)
			{
				stick4.visible=false;
				stick3.visible=true;
			}
		}
	}

	/*This function manages frame elements when forward arrow is clicked*/
	function incframeCount()
	{
		defaultProperties();
		document.getElementById("Forward").style.visibility = "visible";
		document.getElementById("Back").style.visibility = "visible";
		arrow2.material.color.setHex(0xffffff);							//sets the click effect of arrow2
		setTimeout(function() {
			arrow2.material.color.setHex(0xff0000);
		}, 100);
	  if (frameCount > 0 && frameCount < 4)
	  {
	    frameCount++;
	  }

	  if(frameCount==2)
	  {
	    triangle[1].material.color.setHex(0x0000ff);
			triangle[4].material.color.setHex(0x0000ff);
			if(lPane)
			{

				stick3.visible=true;
			}
			stick1.visible=true;
			stick2.visible=true;
	  }
		if(frameCount==3)
		{
			triangle[2].material.color.setHex(0x0000ff);
			triangle[1].material.color.setHex(0x000000);
			triangle[5].material.color.setHex(0x0000ff);
			triangle[4].material.color.setHex(0x000000);
			if(lPane)
			{
				stick1.visible=false;
				stick5.visible=true;
				stick2.position.set(centerX-22.5,centerY,0);
				stick3.position.set(centerX-2.5,centerY,0);
			}
		}
		if(frameCount==4)
		{
			triangle[3].material.color.setHex(0x0000ff);
			triangle[2].material.color.setHex(0x000000);
			triangle[6].material.color.setHex(0x0000ff);
			triangle[5].material.color.setHex(0x000000);
			arrow2.visible=false;
			outlinearrow2.visible=false;
			document.getElementById("Forward").style.visibility="hidden";
			if(lPane)
			{
				stick3.visible=false;
				stick4.visible=true;
			}
		}
	}

/******************* Load Experiment objects code ***********************/

	var helpContent;
	function initialiseHelp()
	{
    helpContent="";
    helpContent = helpContent + "<h2>CLASSIFICATION of TRIANGLES help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows different triangles and categorise them.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls.</p>";
    helpContent = helpContent + "<h3>Click Start Button</h3>";
    helpContent = helpContent + "<p>Different animations of triangles will be started.</p>";
    helpContent = helpContent + "<p>You have the following options:</p>";
    helpContent = helpContent + "<h3>You can click on Based on Sides.</h3>";
    helpContent = helpContent + "<p>Different triangles will be shown based on their sides</p>";
    helpContent = helpContent + "<h3>You can click based on angles</h3>";
    helpContent = helpContent + "<p>Different triangles will be shown based on their angles.</p>";
		helpContent = helpContent + "<h3>You can click based on Examples</h3>";
		helpContent = helpContent + "<p>Different triangles will be shown with their sides and angles.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

	var infoContent;
	function initialiseInfo()
	{
    infoContent =  "";
    infoContent = infoContent + "<h1>CLASSIFICATION of Triangles concepts</h2>";
    infoContent = infoContent + "<h2>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment categorises different triangles based on their sides and angles.</p>";
    infoContent = infoContent + "<h2>BASED ON SIDES</h3>";
		infoContent = infoContent + "<h3>EQUILATERAL TRIANGLES</h3>";
    infoContent = infoContent + "<p>Triangles which have all their sides equal to each other are called EQUILATERAL TRIANGLES</p>";
    infoContent = infoContent + "<p>EQUILATERAL triangles have all their angles equals to 60 degrees</p>";
		infoContent = infoContent + "<h3>ISOSCELES TRIANGLES</h3>";
		infoContent = infoContent + "<p>Triangles which have two of their sides equal to each other are called ISOSCELES TRIANGLES</p>";
		infoContent = infoContent + "<p>ISOSCELES triangles have two of their angles equals to one another</p>";
		infoContent = infoContent + "<h3>SCALENE TRIANGLES</h3>";
		infoContent = infoContent + "<p>Triangles which have all their sides not equal to each other are called SCALENE TRIANGLES</p>";
		infoContent = infoContent + "<p>SCALENE triangles have all their angles different to each other</p>"
		infoContent = infoContent + "<h2>BASED ON ANGLES</h3>";
		infoContent = infoContent + "<h3>ACUTE TRIANGLES</h3>";
		infoContent = infoContent + "<p>Triangles which have all their angles equal to less than 90 degrees are called ACUTE TRIANGLES</p>";
		infoContent = infoContent + "<p>ACUTE triangles doesn't have any angles greater than 90 degrees</p>";
		infoContent = infoContent + "<h3>RIGHT ANGLED TRIANGLES</h3>";
		infoContent = infoContent + "<p>Triangles which have of the angles equal 90 degrees are called RIGHT ANGLED TRIANGLES</p>";
		infoContent = infoContent + "<p>RIGHT ANGLED triangles follows pythagores theorem</p>";
		infoContent = infoContent + "<h3>OBTUSE TRIANGLES</h3>";
		infoContent = infoContent + "<p>Triangles which have on of their angles greater than 90 degrees are called OBTUSE TRIANGLES</p>";
		infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
	}

	function initialiseScene()
	{
    	/* Initialise Scene Variables */
    	mySceneTLX = 0.0;
    	mySceneTLY = 50.0;
    	mySceneBRX = 100.0;
    	mySceneBRY = 0.0;
	}

	function initialiseOtherVariables()
	{
		/* Initialise other globally declared Variables */
	  centerX = (mySceneBRX - mySceneTLX)/2;
	  centerY = (mySceneTLY - mySceneBRY)/2;
	  leftPaneX = centerX - 90;
	  leftPaneY = centerY;
	  rightPaneX = centerX + 90;
	  rightPaneY = centerY;
		exampleShow=0;																//examples will be shown from start
		scale =0;																			//object is increased by scale
		inc =1;																				//object is increasing
		lPane=1;																			//leftpane is active
		translate=0;																	//left and right panels are not moving
		frameCount=0;																	//currently no triangles are explained
		stickRotation=1;															//Stick start rotating
	}

/**
 * This function creates the scene of the experiment.
 * It is called by the library during document load.
 * It is recommended that you do not initialise any variables globally.
 * It is recommended that this function create all the elements first.
 * It should then call a reset function to initialise values.
 * This will allow a reset exepriment functionality to be implemented.
 * <p>
 * It is recommended that the developer first draw a sketch of the experiment on a piece of paper.
 * The sketch should specify the size and initial position of all the elements that comprise the experiment.
 * <p>
 * Once the sketch is ready, the developer should instantiate the elements at the intial location.
 * <p>
 * The (x,y) position of the camera would be set to the center of area of interest.
 * The z position of the camera would be such that the field of vision would cover the height.
 * The aspect ratio of the camera whould cover the width.
 * <p>
 * Two lights would be suitably positioned to light the area of interest.
 * <p>
 * The developer can position the camera and lights if he so chooses.
 * <p>
 * The camera would adjust and cover a wider and taller area depending on the dimensions of the display.
 * hence the background (if any) shoudl extend beyond the area of interest.
 * <p>
 * Finally the developer should call the function PIEsetAreaOfInterest(tlx, tly, brx, bry).
 * The parameters are the top left corner and bottom right corner coordinates.
 * The X axis goes from lef to right of te display and the y axis goes from bottom to up.
 * The area of interst should be wide and tall enough to cover all potential movements.
 * <p>
 * The developer should have a fairly good idea of the controls forthe experiment.
 * Once the scene is setup and is visible, the developer can include the controls and
 * the callback functions needed to update the experiment parameters.
 * The PIE library provides a set of functions to implement common controls.
 * <p>
 * The developer should code and assign proper event handlers to the elements (to control animation).
 */

	function loadExperimentElements()
		{
			var geometry;
			var material;
			var texture;

	    PIEsetExperimentTitle("Classification of Triangles");
	    PIEsetDeveloperName("Sachin Chand");
	    PIEhideControlElement();

	    /* initialise help and info content */
	    initialiseHelp();
	    initialiseInfo();

	    /* initialise Scene */
	    initialiseScene();

	    /* initialise Other Variables */
	    initialiseOtherVariables();

			/*Background plane*/
	    geometry = new THREE.PlaneGeometry( 120  , 60, 32 );
	    	material = new THREE.MeshBasicMaterial( {color: 0x3676db, side: THREE.DoubleSide} );
	    	background = new THREE.Mesh( geometry, material );
	    	background.position.set(centerX,centerY,0);
	    	PIEaddElement(background);

			/*LEFT PANE*/
			geometry = new THREE.PlaneGeometry( 120  , 40, 32 );

	    	material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
	    	outlineleftPane=new THREE.Mesh(geometry,material);
	    	outlineleftPane.scale.set(1.01,1.02,1);
	    	outlineleftPane.position.set(leftPaneX,leftPaneY,0);
	    	PIEaddElement(outlineleftPane);

	    	material = new THREE.MeshBasicMaterial( {color: 0xFDF6D5, side: THREE.DoubleSide} );
	    	leftPane = new THREE.Mesh( geometry, material );
	    	leftPane.position.set(leftPaneX,leftPaneY,0);
	    	PIEaddElement(leftPane);

			/*RIGHT PANE*/
	    geometry = new THREE.PlaneGeometry( 120  , 40, 32 );

	     material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
	     outlinerightPane=new THREE.Mesh(geometry,material);
	     outlinerightPane.scale.set(1.01,1.02,1);
	     outlinerightPane.position.set(rightPaneX,rightPaneY,0);
	     PIEaddElement(outlinerightPane);

	     material = new THREE.MeshBasicMaterial( {color: 0xFDF6D5,side: THREE.DoubleSide} );
	     rightPane = new THREE.Mesh( geometry, material );
	     rightPane.position.set(rightPaneX,rightPaneY,0);
	     PIEaddElement(rightPane);
			/*Example Plane*/
			geometry = new THREE.PlaneGeometry(55,40,32);
			 material = new THREE.MeshBasicMaterial( {color: 0xFDF6D5,side: THREE.DoubleSide} );
			 exampleBackground = new THREE.Mesh(geometry,material);
			 exampleBackground.position.set(centerX,centerY,0);
			 PIEaddElement(exampleBackground);
			 exampleBackground.visible=false;

			/*Triangle array*/
	  	geometry = new THREE.Geometry();
	  		geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	  		geometry.vertices.push(new THREE.Vector3(-5, 0, 0));
	  		geometry.vertices.push(new THREE.Vector3(-7.5, 5, 0));
	  		geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	  		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(7.5, -2.5, 0) );

 			material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
	    	triangle[1] = new THREE.Line( geometry, material );
	    	triangle[1].position.set(centerX-43,centerY+3,0);
	    	PIEaddElement(triangle[1]);
   		material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
	    	triangle[2] = new THREE.Line( geometry, material );
	    	triangle[2].position.set(centerX-43,centerY-10,0);
	    	triangle[2].scale.set(1,1.5,1);
	    	PIEaddElement(triangle[2]);
	    	triangle[2].rotateZ(Math.PI/4);
			material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
	    	triangle[3] = new THREE.Line( geometry, material );
	    	triangle[3].position.set(centerX-43,centerY+15,0);
	    	triangle[3].scale.set(1.5,1.5,1);
	    	PIEaddElement(triangle[3]);
	    	triangle[3].rotateZ(-Math.PI/4);
	    material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
	    	triangle[4] =  new THREE.Line( geometry, material );
	    	triangle[4].position.set(centerX+43,centerY+15,0);
	    	PIEaddElement(triangle[4]);

	    geometry = new THREE.Geometry();
	    	geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	    	geometry.vertices.push(new THREE.Vector3(-2, 0, 0));
	    	geometry.vertices.push(new THREE.Vector3(-2, 7, 0));
	    	geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	    	geometry.applyMatrix( new THREE.Matrix4().makeTranslation(6, -4, 0) );
	    material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
	    	triangle[5] =  new THREE.Line( geometry, material );
	    	triangle[5].position.set(centerX+43,centerY+3,0);
	    	PIEaddElement(triangle[5]);

	    geometry = new THREE.Geometry();
	    	geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	    	geometry.vertices.push(new THREE.Vector3(-5, 0, 0));
	    	geometry.vertices.push(new THREE.Vector3(-2, 7, 0));
	    	geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	    	geometry.applyMatrix( new THREE.Matrix4().makeTranslation(6, -4, 0) );
	    material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
	    	triangle[6] =  new THREE.Line( geometry, material );
	    	triangle[6].position.set(centerX+43,centerY-10,0);
	    	PIEaddElement(triangle[6]);

			//Create Arrow and add it to the scene
	  	geometry = new THREE.ConeGeometry(0.08,0.2,64,49,true,0,6.3);
	  		material = new THREE.MeshBasicMaterial( {color: 0x000000} );

	  	outlinearrow1 = new THREE.Mesh(geometry, material);
	  		outlinearrow1.position.set(centerX-5,centerY-15,1);
	  		outlinearrow1.scale.set( 35, 24, 0 );
	  		outlinearrow1.rotateZ(Math.PI/2);
	  		PIEaddElement(outlinearrow1);
	  		outlinearrow1.visible=false;
 			outlinearrow2 = new THREE.Mesh(geometry, material);
	  		outlinearrow2.position.set(centerX+5,centerY-15,1);
	  		outlinearrow2.scale.set(35,24,0);
	  		outlinearrow2.rotateZ(-Math.PI/2);
	  		PIEaddElement(outlinearrow2);
	  		outlinearrow2.visible=false;

	  	material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
	  		arrow1 = new THREE.Mesh(geometry, material);
	  		arrow1.position.set(centerX-5,centerY-15,1);
	  		arrow1.scale.set( 30, 20, 3 );
	  		arrow1.rotateZ(Math.PI/2);
	  		PIEaddElement(arrow1);
	  		arrow1.visible=false;

	  	material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
	  		arrow2 = new THREE.Mesh(geometry, material);
	  		arrow2.position.set(centerX+5,centerY-15,1);
	  		arrow2.scale.set( 30, 20, 3 );
	  		arrow2.rotateZ(-Math.PI/2);
	  		PIEaddElement(arrow2);
	  		arrow2.visible=false;

			/*6 triangles based on sides and angles are created*/
			geometry = new THREE.PlaneGeometry(20, 20,0);

				texture = new THREE.ImageUtils.loadTexture( 'images/equilateral.jpg' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					equiTriangle = new THREE.Mesh(geometry, material);
					equiTriangle.position.set(centerX+10,centerY+5,0);
					PIEaddElement(equiTriangle);
					equiTriangle.visible=false;

				texture = new THREE.ImageUtils.loadTexture( 'images/isosceles.jpg' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					isoscelesTriangle = new THREE.Mesh(geometry, material);
					isoscelesTriangle.position.set(centerX+10,centerY+5,0);
					PIEaddElement(isoscelesTriangle);
					isoscelesTriangle.visible=false;

				texture = new THREE.ImageUtils.loadTexture( 'images/scalene.jpg' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					scaleneTriangle = new THREE.Mesh(geometry, material);
					scaleneTriangle.position.set(centerX+10,centerY+5,0);
					PIEaddElement(scaleneTriangle);
					scaleneTriangle.visible=false;

				texture = new THREE.ImageUtils.loadTexture( 'images/acute.jpg' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					acuteTriangle = new THREE.Mesh(geometry, material);
						acuteTriangle.position.set(centerX+15,centerY+5,0);
					PIEaddElement(acuteTriangle);
					acuteTriangle.visible=false;

				texture = new THREE.ImageUtils.loadTexture( 'images/right.jpg' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					rightTriangle = new THREE.Mesh(geometry, material);
					rightTriangle.position.set(centerX+15,centerY+5,0);
					PIEaddElement(rightTriangle);
					rightTriangle.visible=false;

				texture = new THREE.ImageUtils.loadTexture( 'images/obtuse.jpg' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					obtuseTriangle = new THREE.Mesh(geometry, material);
					obtuseTriangle.position.set(centerX+15,centerY+5,0);
					PIEaddElement(obtuseTriangle);
					obtuseTriangle.visible=false;

					/*Addition of example triangles*/
					canvas = document.createElement('canvas');
					canvas.width=350;
					canvas.height=300;
					context = canvas.getContext('2d');
					context.font = "20px Arial";
					context.fillText("25",80,150);
					context.fillText("25",270,150);
					context.fillText("20",170,255);
					context.font = "30px Arial";
					context.fillText("Isosceles Triangle",70,290);
					context.beginPath();
					context.moveTo(200, 20);
					context.lineTo(100, 230);
					context.lineTo(300, 230);
					context.closePath();
					context.lineWidth = 10;
					context.strokeStyle = '#666666';
					context.stroke();
					context.fillStyle = "#045575";
					context.fill();
					texture = new THREE.Texture(canvas)
					texture.needsUpdate = true;
   				material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
				  material.transparent = true;
  				examplePlane[0] = new THREE.Mesh(
				        new THREE.PlaneGeometry(20,20),
				        material
				      );
					examplePlane[0].position.set(centerX,centerY+5,0);
					PIEaddElement(examplePlane[0]);

					canvas = document.createElement('canvas');
					canvas.width=350;
					canvas.height=300;
					context = canvas.getContext('2d');
					context.font = "20px Arial";
					context.fillText("18",60,150);
					context.fillText("25",270,150);
					context.fillText("20",170,255);
					context.font = "30px Arial";
					context.fillText("Acute Triangle",100,290);
					context.beginPath();
					context.moveTo(130, 50);
					context.lineTo(80, 230);
					context.lineTo(300, 230);
					context.closePath();
					context.lineWidth = 10;
					context.strokeStyle = '#666666';
					context.stroke();
					context.fillStyle = "#03a565";
					context.fill();
					context.fillStyle = "#000000";
					context.font = "20px Arial";
					context.fillText(")70",80,230);
					context.fillText("50(",260,230);
					context.fillText("60",125,80);
					texture = new THREE.Texture(canvas)
					texture.needsUpdate = true;
   				material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
				  material.transparent = true;
  				examplePlane[1] = new THREE.Mesh(
				        new THREE.PlaneGeometry(20,20),
				        material
				      );
					examplePlane[1].position.set(centerX,centerY+5,0);
					PIEaddElement(examplePlane[1]);

					canvas = document.createElement('canvas');
					canvas.width=350;
					canvas.height=300;
					context = canvas.getContext('2d');
					context.font = "20px Arial";
					context.fillText("20",140,150);
					context.fillText("12",280,150);
					context.fillText("18",170,255);
					context.font = "30px Arial";
					context.fillText("Scalene Triangle",70,290);
					context.beginPath();
					context.moveTo(250, 70);
					context.lineTo(100, 230);
					context.lineTo(300, 230);
					context.closePath();
					context.lineWidth = 10;
					context.strokeStyle = '#666666';
					context.stroke();
					context.fillStyle = "#f4b08b";
					context.fill();
					texture = new THREE.Texture(canvas)
					texture.needsUpdate = true;
   				material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
				  material.transparent = true;
  				examplePlane[2] = new THREE.Mesh(
				        new THREE.PlaneGeometry(20,20),
				        material
				      );
					examplePlane[2].position.set(centerX,centerY+5,0);
					PIEaddElement(examplePlane[2]);

					canvas = document.createElement('canvas');
					canvas.width=350;
					canvas.height=300;
					context = canvas.getContext('2d');
					context.font = "20px Arial";
					context.fillText("15",100,150);
					context.fillText("15",260,150);
					context.fillText("15",170,255);
					context.font = "30px Arial";
					context.fillText("Equilateral Triangle",70,290);
					context.beginPath();
					context.moveTo(200, 50);
					context.lineTo(100, 230);
					context.lineTo(300, 230);
					context.closePath();
					context.lineWidth = 10;
					context.strokeStyle = '#666666';
					context.stroke();
					context.fillStyle = "#ed53e8";
					context.fill();
					context.fillStyle = "#000000";
					context.font = "20px Arial";
					context.fillText(")60",100,230);
					context.fillText("60(",270,230);
					context.fillText("60",190,90);
					texture = new THREE.Texture(canvas)
					texture.needsUpdate = true;
   				material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
				  material.transparent = true;
  				examplePlane[3] = new THREE.Mesh(
				        new THREE.PlaneGeometry(20,20),
				        material
				      );
					examplePlane[3].position.set(centerX,centerY+5,0);
					PIEaddElement(examplePlane[3]);

					canvas = document.createElement('canvas');
					canvas.width=350;
					canvas.height=300;
					context = canvas.getContext('2d');
					context.font = "20px Arial";
					context.fillText("18",160,150);
					context.fillText("15",300,150);
					context.fillText("13",170,255);
					context.font = "30px Arial";
					context.fillText("Obtuse Triangle",80,290);
					context.beginPath();
					context.moveTo(330, 50);
					context.lineTo(80, 230);
					context.lineTo(250, 230);
					context.closePath();
					context.lineWidth = 10;
					context.strokeStyle = '#666666';
					context.stroke();
					context.fillStyle = "#ed53e8";
					context.fill();
					context.fillStyle = "#000000";
					context.font = "20px Arial";
					context.fillText(")40",90,230);
					context.fillText("110",215,230);
					context.fillText("30",290,90);
					texture = new THREE.Texture(canvas)
					texture.needsUpdate = true;
   				material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
				  material.transparent = true;
  				examplePlane[4] = new THREE.Mesh(
				        new THREE.PlaneGeometry(20,20),
				        material
				      );
					examplePlane[4].position.set(centerX,centerY+5,0);
					PIEaddElement(examplePlane[4]);

					canvas = document.createElement('canvas');
					canvas.width=350;
					canvas.height=300;
					context = canvas.getContext('2d');
					context.font = "20px Arial";
					context.fillText("20",40,150);
					context.fillText("25",220,150);
					context.fillText("15",150,255);
					context.font = "30px Arial";
					context.fillText("Right Angled Triangle",50,290);
					context.beginPath();
					context.moveTo(100, 20);
					context.lineTo(100, 230);
					context.lineTo(250, 230);
					context.closePath();
					context.lineWidth = 10;
					context.strokeStyle = '#666666';
					context.stroke();
					context.fillStyle = "#FFCC00";
					context.fill();
					context.fillStyle = "#000000";
					context.font = "20px Arial";
					context.fillText("_",95,212);
					context.fillText("|",104,230);
					context.fillText("90",108,230);
					context.fillText("55(",215,230);
					context.fillText("35",100,60);
					texture = new THREE.Texture(canvas)
					texture.needsUpdate = true;
   				material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
				  material.transparent = true;
  				examplePlane[5] = new THREE.Mesh(
				        new THREE.PlaneGeometry(20,20),
				        material
				      );
					examplePlane[5].position.set(centerX,centerY+5,0);
					PIEaddElement(examplePlane[5]);

					/*Addition of Differet Sticks, ruler and bat objects*/
			geometry = new THREE.PlaneGeometry(20, 3,0);
				texture = new THREE.ImageUtils.loadTexture( 'images/ruler.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					stick5 = new THREE.Mesh(geometry, material);
					stick5.position.set(centerX-12.5,centerY,0);
					PIEaddElement(stick5);
					stick5.visible=false;
			geometry = new THREE.PlaneGeometry(22, 3,0);
				texture = new THREE.ImageUtils.loadTexture( 'images/bat.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					geometry.applyMatrix( new THREE.Matrix4().makeTranslation(-12.5, 0, 0) );
					stick4 = new THREE.Mesh(geometry, material);
					stick4.position.set(centerX-1,centerY,0);
					PIEaddElement(stick4);
					stick4.visible=false;
			geometry = new THREE.PlaneGeometry(15, 2,0);
				texture = new THREE.ImageUtils.loadTexture( 'images/stick.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					stick1 = new THREE.Mesh(geometry, material);
					stick1.position.set(centerX-20,centerY,0);
					PIEaddElement(stick1);
					stick1.rotateX(Math.PI);
					stick1.visible=false;
				texture = new THREE.ImageUtils.loadTexture( 'images/stick.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					geometry.applyMatrix( new THREE.Matrix4().makeTranslation(7.5, 0, 0) );
					stick2 = new THREE.Mesh(geometry, material);
					stick2.position.set(centerX-20,centerY,0);
					PIEaddElement(stick2);
					stick2.visible=false;
			geometry = new THREE.PlaneGeometry(15, 2,0);
				texture = new THREE.ImageUtils.loadTexture( 'images/stick.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					geometry.applyMatrix( new THREE.Matrix4().makeTranslation(-7.5, 0, 0) );
					stick3 = new THREE.Mesh(geometry, material);
					stick3.position.set(centerX-5,centerY,0);
					PIEaddElement(stick3);
					stick3.visible=false;
					/*Addition of Differet text objects*/
			geometry = new THREE.PlaneGeometry(20, 3,0);
				texture = new THREE.ImageUtils.loadTexture( 'images/text0.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					text[0] = new THREE.Mesh(geometry, material);								//equilateral triangle text
					text[0].position.set(centerX-15,centerY-5,0);
					PIEaddElement(text[0]);
					text[0].visible=false;
				texture = new THREE.ImageUtils.loadTexture( 'images/text1.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					text[1] = new THREE.Mesh(geometry, material);							//isosceles triangle text
					text[1].position.set(centerX-15,centerY-5,0);
					PIEaddElement(text[1]);
					text[1].visible=false;
				texture = new THREE.ImageUtils.loadTexture( 'images/text2.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					text[2] = new THREE.Mesh(geometry, material);						//scalene triangle text
					text[2].position.set(centerX-15,centerY-5,0);
					PIEaddElement(text[2]);
					text[2].visible=false;
				texture = new THREE.ImageUtils.loadTexture( 'images/text3.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					text[3] = new THREE.Mesh(geometry, material);						//acute triangle text
					text[3].position.set(centerX-15,centerY-5,0);
					PIEaddElement(text[3]);
					text[3].visible=false;
				texture = new THREE.ImageUtils.loadTexture( 'images/text4.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					text[4] = new THREE.Mesh(geometry, material);							//right triangle text
					text[4].position.set(centerX-15,centerY-5,0);
					PIEaddElement(text[4]);
					text[4].visible=false;
				texture = new THREE.ImageUtils.loadTexture( 'images/text5.gif' );
					material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
					text[5] = new THREE.Mesh(geometry, material);						//obtuse triangle text
					text[5].position.set(centerX-15,centerY-5,0);
					PIEaddElement(text[5]);
					text[5].visible=false;

	    /* Reset all positions */
	    resetExperiment();

	    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
	}

	/******************* End of Load Experiment objects code ***********************/

	/******************* Reset Experiment code ***********************/

	/**
	 * This function resets the position of all experiment elements to their default values.
	 * <p>
	 * This is called during initial document load.
	 * This is also be called by the system provided reset button.
	 * <p>
	 * Apart from the position, this should also reset all variables which can be controlled by the user.
	 * This function will also clear any output variables/graphs
	 */
	function resetExperiment()
	{
	  initialiseOtherVariables();
		defaultProperties();
		exampleBackground.visible=false;
		arrow1.visible=false;
		arrow2.visible=false;
		outlinearrow1.visible=false;
		outlinearrow2.visible=false;
		document.getElementById("Forward").style.visibility = "hidden";
		document.getElementById("Back").style.visibility = "hidden";
		leftPane.position.set(leftPaneX,leftPaneY,0);
		rightPane.position.set(rightPaneX,rightPaneY,0);
		outlineleftPane.position.set(leftPaneX,leftPaneY,0);
		outlinerightPane.position.set(rightPaneX,rightPaneY,0);
		document.getElementById("baseAngles").style.visibility = "visible";
		document.getElementById("baseSides").style.visibility = "visible";
		document.getElementById("example").style.visibility = "visible";
		document.getElementById("example").innerHTML="EXAMPLES";
		for (var i = 1; i <= 6 ; i++)
		{
			triangle[i].visible=true;
			triangle[i].material.color.setHex(0x000000);
		}
		stick1.visible=false;
		stick2.visible=false;
		stick3.visible=false;
		stick4.visible=false;
		stick5.visible=false;
		stick1.position.set(centerX-20,centerY,0);
		stick2.position.set(centerX-20,centerY,0);
		stick3.position.set(centerX-5,centerY,0);
		stick4.position.set(centerX-1,centerY,0);
		stick5.position.set(centerX-12.5,centerY,0);
		PIEstartAnimation();
	}

	/******************* End of Reset Experiment code ***********************/

	/******************* Update (animation changes) code ***********************/

	/**
	 * This function updates the location of all experiment elements during each animation frame.
	 * <p>
	 * The function receives both animation time as well as the dt (time difference) from last call.
	 * This function is expected to implement the laws of physics to update the position.
	 * This function will also update any output variables/graphs
	 * <p>
	 * Important Note : Boundary Events
	 * <p>
	 * During any physics simulation you will reach a boundary event.
	 * In our case, the boundary even is the ball hitting any of the walls.
	 * The boundary event typically changes the sign of velocity/acceleration.
	 * The boundary event is most likely to happen in the middle of the two calls.
	 * The library allows the experiment to change the simulation time by processing partial time.
	 * This function can call a library function with the time remaining to be processed before exiting.
	 * <p>
	 * @param  t       The time in milliseconds elapsed since the beginning of animation cycle
	 * @param  dt      The time in milliseconds elapsed since the last acll to this function
	 */

	function translatePane()
	{
		if(translate==1)															//left or right panel will start moving
		{
	  	if(lPane)																		//left pane will move
		  {
		    if(leftPaneX <= centerX - 20)
		    {
		      leftPaneX = leftPaneX + 0.7;
		      rightPaneX = rightPaneX + 0.15;
		    }

		  }
			else if(!lPane )														//right pane will move
	   	{
	     	if(rightPaneX >= centerX + 20)
	     	{
	       	rightPaneX = rightPaneX - 0.7;
	       	leftPaneX = leftPaneX - 0.15;
	     	}
	  	}
			else
				{
					translate=0;
				}
			}
		else
		{
			if(lPane )																	//left pane will move to original position
			{
				if(leftPaneX >= centerX - 90)
				{
					leftPaneX = leftPaneX - 0.7;
					rightPaneX = rightPaneX - 0.15;
				}
				else
				{
					for (var i = 4; i <=6 ; i++)
					{
						triangle[i].visible=true;
					}
					translate=0;
					document.getElementById("baseAngles").style.visibility = "visible";
					document.getElementById("baseSides").style.visibility = "visible";
					document.getElementById("example").style.visibility = "visible";
				}
			}
			else if(!lPane )													//right pane will move to original position
		 	{
				 if(rightPaneX <= centerX + 90)
				 {
					 rightPaneX = rightPaneX + 0.7;
					 leftPaneX = leftPaneX + 0.15;
				 }
				 else
			 	{
		 			for (var i = 1; i <=3 ; i++)
			 		{
			 			triangle[i].visible=true;
			 		}
			 		translate=0;

					document.getElementById("baseAngles").style.visibility = "visible";
					document.getElementById("baseSides").style.visibility = "visible";
					document.getElementById("example").style.visibility = "visible";
		 		}
			}
		}
	}

	function updateExperimentElements(t, dt)
	{

	  if(translate && frameCount==1)															//starts the animation by moving the panels
	  {
	    translatePane();
	    leftPane.position.set(leftPaneX,leftPaneY,0);
	    outlineleftPane.position.set(leftPaneX,leftPaneY,0);
	    rightPane.position.set(rightPaneX,rightPaneY,0);
	    outlinerightPane.position.set(rightPaneX,rightPaneY,0);
	  }
		/*This part of the code makes triangles scale and rotate simultaneously*/
	  if(inc == 1 )
	  {
	    scale += 0.01;
	    if(scale > 0.3)
	    {
	      inc = 0;
	    }
	  }
	  else
	  {
	    scale -= 0.01;
	    if(scale < -0.3)
	    {
	      inc = 1;
	    }
	  }
	  for(var i=1 ; i<=6 ; i++)
	  {
	    triangle[i].rotateZ(Math.PI/90);
	    triangle[i].scale.set(1+scale,1+scale,1);
	  }

		/*shows the triangle with proper animation and values of sides and angles*/
	  if(lPane && frameCount>1)
	  {
			if(frameCount==2)
			{
				if(stickRotation && stickRotation<=100)
				{
					stick2.rotateZ(Math.PI/300);
					stick3.rotateZ(-Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
					text[0].visible=true;
					equiTriangle.visible=true;
				}
			}
			if(frameCount==3)
			{

					if(stickRotation && stickRotation<=75)
					{
						stick2.rotateZ(Math.PI/300);
						stick3.rotateZ(-Math.PI/300);
						stickRotation++;
					}
					else
					{
						stickRotation=0;
						text[1].visible=true;
						isoscelesTriangle.visible=true;
					}
			}
			if(frameCount==4)
			{
					if(stickRotation && stickRotation<=60)
					{
						stick2.rotateZ(2*Math.PI/300);
						stick4.rotateZ(-Math.PI/300);
						stickRotation++;
					}
					else
					{
						stickRotation=0;
						text[2].visible=true;
						scaleneTriangle.visible=true;
					}
			}
	  }
		else if(!lPane && frameCount>1)
		{

			if(frameCount==2)
			{
				if(stickRotation && stickRotation<=75)
				{
					stick2.rotateZ(Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
					text[3].visible=true;
					acuteTriangle.visible=true;
				}
			}
			if(frameCount==3)
			{
				if(stickRotation && stickRotation<=150)
				{
					stick2.rotateZ(Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
					text[4].visible=true;
					rightTriangle.visible=true;
				}

			}
			if(frameCount==4)
			{
				if(stickRotation && stickRotation< 200)
				{
					stick2.rotateZ(Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
					text[5].visible=true;
					obtuseTriangle.visible=true;
				}
			}
		}
		//Showing Animation of Examples
		if(exampleShow>=0)
		{
			if(exampleShow==1)
			{
				if(stickRotation && stickRotation<=75)
				{
					stick2.rotateZ(Math.PI/300);
					stick3.rotateZ(-Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
				}
			}
			else if(exampleShow==3)
			{
				if(stickRotation && stickRotation<=75)
				{
					stick2.rotateZ(Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
				}
			}
			else if(exampleShow==5)
			{
				if(stickRotation && stickRotation<=60)
				{
					stick2.rotateZ(2*Math.PI/300);
					stick4.rotateZ(-Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
				}
			}
			else if(exampleShow==7)
			{
				if(stickRotation && stickRotation<=100)
				{
					stick2.rotateZ(Math.PI/300);
					stick3.rotateZ(-Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
				}
			}
			else if(exampleShow==9)
			{
				if(stickRotation && stickRotation< 200)
				{
					stick2.rotateZ(Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
				}
			}
			else if(exampleShow==11)
			{
				if(stickRotation && stickRotation<=150)
				{
					stick2.rotateZ(Math.PI/300);
					stickRotation++;
				}
				else
				{
					stickRotation=0;
				}
			}
		}
	}
	/******************* Update (animation changes) code ***********************/
