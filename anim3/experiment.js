	//Name of the webpage is set
	document.title = "Perimeter of different Irregular polygons";

	/************************CSS File style.css is added to index.html**********************/
  var div;

	var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', 'style.css');
		document.getElementsByTagName('head')[0].appendChild(link);

/*******************HTML ELEMENTS ARE ADDED***************/

	div = document.createElement("div");													/* div to make arrow clickable */
		div.setAttribute('id', 'Forward');
		div.setAttribute('onclick','incframeCount()');
		document.body.appendChild(div);

	div = document.createElement("div");														/* div for learn option */
		div.setAttribute('class','label');
		div.setAttribute('id', 'learn');
		div.setAttribute('onclick','incframeCount()');
		div.innerHTML= "Learn How to Solve";
		document.body.appendChild(div);

	div = document.createElement("div");														/* div for solve option */
		div.setAttribute('class','label');
		div.setAttribute('id', 'solve');
		div.setAttribute('onclick','exercise()');
		div.innerHTML= "Start Solving";
		document.body.appendChild(div);

	div = document.createElement("div");														/* div for submit option */
		div.setAttribute('class','label');
		div.setAttribute('id', 'submit');
		div.setAttribute('onclick','submit()');
		div.innerHTML= "Submit";
		document.body.appendChild(div);

	div = document.createElement("div");													/* div for show option */
		div.setAttribute('class','label');
		div.setAttribute('id', 'show');
		div.setAttribute('onclick','show()');
		div.innerHTML= "Show";
		document.body.appendChild(div);


	div = document.createElement("div");													/* div for clear option*/
		div.setAttribute('class','label');
		div.setAttribute('id', 'clear');
		div.setAttribute('onclick','clearField()');
		div.innerHTML= "Clear";
		document.body.appendChild(div);

	div = document.createElement("div");													/* div to make arrow clickable */
		div.setAttribute('id', 'rotate1');
		div.setAttribute('onclick','rotateClock()');
		document.body.appendChild(div);

	div = document.createElement("div");													/* div to make arrow clickable */
		div.setAttribute('id', 'rotate2');
		div.setAttribute('onclick','rotateAnti()');
		document.body.appendChild(div);

	div = document.createElement("div");
		div.setAttribute('class', 'input');
		div.setAttribute('id', 'side1');
		div.setAttribute('contenteditable','true');
		document.body.appendChild(div);
	div = document.createElement("div");
		div.setAttribute('class', 'input');
		div.setAttribute('id', 'side2');
		div.setAttribute('contenteditable','true');
		document.body.appendChild(div);
	div = document.createElement("div");
		div.setAttribute('class', 'input');
		div.setAttribute('id', 'side3');
		div.setAttribute('contenteditable','true');
		document.body.appendChild(div);
	div = document.createElement("div");
		div.setAttribute('class', 'input');
		div.setAttribute('id', 'side4');
		div.setAttribute('contenteditable','true');
		document.body.appendChild(div);
	div = document.createElement("div");
		div.setAttribute('class', 'input');
		div.setAttribute('id', 'perimeter');
		div.setAttribute('contenteditable','true');
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
	var outlineBackground;	/* background outline object (PlaneGeometry) */
	var arrow;							/* ConeGeometry to show forward arrow */
	var outlinearrow;				/* ConeGeometry to show outline of forward arrow */
	var circularArrow1;			/* Circular Arrow to rotate ruler anticlockwise */
	var circularArrow2;			/* Circular Arrow to rotate ruler clockwise*/
	var farm=[];						/* To show different farms */
	var farmer;							/* To show farmer */
	var dialogue;						/* To show farmer's thought */
	var bottomText;					/* To show bottomText using canvas */
	var ruler;							/* To show ruler */
	var rightFixedText;			/* To show right side Text */
	var text=[];						/* Array of Object to show arrow with side length */
	var cText=[];						/* Array of Objects to show Side number */
	var sideValue=[];				/* array of canvas textured objects to show side value and Perimeter */
	var sidePlane;					/* Side Plane PlaneGeometry */
	var outlineSidePlane;		/* Outline Side Plane PlaneGeometry */
	var shape=[];						/* array of different shapes for calculating perimeter */
	////////////////////END OF OBJECTS/////////////////////////////////

	var centerX;						/*X coordinate of center of screen*/
	var centerY;						/*Y coordinate of center of screen*/
	var frameCount;					/* variable to keep count of current frame */
	var canvas;							/* canvas material used for different objects */
	var context;						/* canvas's context to draw on canvas */
	var exerciseCount;			/*	variable to initialise exercise */
	var track=[];							/* variable to keep track of ruler */
	var s1;									/* Side 1 text input */
	var s2;									/* Side 2 text input */
	var s3;									/* Side 3 text input */
	var s4;									/* Side 4 text input */
	var peri;								/* Perimeter text input */
	var side=[];						/* Side value */


	/*This function is called on each arrow click and sets some default properties*/
	function defaultProperties()
	{
		ruler.rotateZ(-ruler.rotation.z);
		clearField();
		farmer.visible=false;
		bottomText.visible=false;
		dialogue.visible=false;
		arrow.visible=true;
		outlinearrow.visible=true;
		sidePlane.visible=true;
		outlineSidePlane.visible=true;
		for (var i = 0; i < 9; i++)
		{
			shape[i].visible=false;
		}
	}
	function rotateAnti()
	{
		ruler.rotateZ(0.03);
	}
	function rotateClock()
	{
		ruler.rotateZ(-0.03);
	}
	/*This function is called by resetExperiment() to show first screen of animation*/
	function showFirstScreen()
	{
		farmer.visible=true;
		setTimeout(function() {
			dialogue.visible=true;
		}, 1000);
		setTimeout(function() {
			bottomText.visible=true;
		}, 2500);
		setTimeout(function() {
			document.getElementById('learn').style.visibility='visible';
			document.getElementById('solve').style.visibility='visible';
		}, 3000);
	}
	/*This function manages frame elements when forward arrow is clicked*/
	function incframeCount()
	{
		circularArrow1.visible=true;
		circularArrow2.visible=true;
		defaultProperties();
		arrow.material.color.setHex(0xffffff);							//sets the click effect of arrow
		setTimeout(function() {
			arrow.material.color.setHex(0x88ade8);
		}, 100);
		if(!exerciseCount)
		{
			document.getElementById("Forward").style.visibility = "hidden";
		  if (frameCount >= 0 && frameCount < 20 )
		  {
		    frameCount++;
		  }
			if(frameCount==1)
			{
				document.getElementById('learn').style.visibility='hidden';
				document.getElementById('solve').style.visibility='hidden';

				farm[0].visible=true;

			}
			if(frameCount==2)
			{
				ruler.visible=true;
				ruler.position.set(centerX-15,centerY-30,0);
			}
			if(frameCount==3)
			{
				ruler.rotateZ(Math.PI/2);
				ruler.position.set(centerX-60,centerY+5,0);
			}
			if(frameCount==4)
			{
				ruler.position.set(centerX-15,centerY+30,0);
			}
			if(frameCount==5)
			{
				ruler.position.set(centerX-7,centerY+30,0);
				ruler.rotateZ(-Math.PI/3.5);
			}
			if(frameCount==6)
			{
				for (var i = 0; i < 4; i++) {
					sideValue[i].visible=false;
					text[i].visible=false;
				}
				sideValue[4].visible=false;
				ruler.visible=false;
				rightFixedText.visible=false;
				farm[0].visible=false;
				farm[1].visible=true;
			}
			if(frameCount==7)
			{
				ruler.visible=true;
				ruler.position.set(centerX-15,centerY-30,0);
			}
			if(frameCount==8)
			{
				ruler.position.set(centerX-60,centerY+5,0);
				ruler.rotateZ(Math.PI*0.63)
			}
			if(frameCount==9)
			{
				ruler.position.set(centerX-60,centerY+6,0);
				ruler.rotateZ(Math.PI/7)
			}
			if(frameCount==10)
			{
				ruler.position.set(centerX-13,centerY+30,0);
				ruler.rotateZ(-Math.PI/7)
			}
			if(frameCount==11)
			{
				ruler.position.set(centerX-6,centerY+30,0);
				ruler.rotateZ(-Math.PI*0.65)
			}
			if(frameCount==12)
			{
				farm[1].visible=false;
				farm[2].visible=true;
				rightFixedText.visible=false;
				ruler.visible=false;
				for (var i = 4; i < 9; i++)
				{
					text[i].visible=false;
					sideValue[i].visible=false;
				}
				sideValue[9].visible=false;
				sideValue[10].visible=false;
			}
			if(frameCount==13)
			{
				ruler.visible=true;
				ruler.position.set(centerX-15,centerY-30,0);
			}
			if(frameCount==14)
			{
				ruler.rotateZ(Math.PI/2);
				ruler.position.set(centerX-60,centerY+5,0);
			}
			if(frameCount==15)
			{
				ruler.rotateZ(Math.PI/2);
				ruler.position.set(centerX-60,centerY+5,0);
			}
			if(frameCount==16)
			{
				ruler.position.set(centerX-16,centerY+30,0);
			}
			if(frameCount==17)
			{
				ruler.position.set(centerX-16,centerY+30,0);
			}
			if(frameCount==18)
			{
				ruler.position.set(centerX-60,centerY+5,0);
				ruler.rotateZ(Math.PI/2);
			}
			if(frameCount==19)
			{
				ruler.position.set(centerX-60,centerY+5,0);
				ruler.rotateZ(Math.PI/2);
			}
			if(frameCount==20)
			{
				resetExperiment();
			}
		}
		else
		{
			defaultProperties();
			do
			{
			frameCount=Math.floor(Math.random()*10);
			}while(frameCount==9 || track[frameCount]==1);
			track[frameCount]=1;
			track[9]++;
			if(track[9]==9)
			{
				for (var i = 0; i < 10; i++)
				{
					track[i]=0;
				}
			}
			shape[frameCount].visible=true;
		}
	}


	function exercise()
	{
		rightFixedText.position.set(centerX+30,centerY,0);
		exerciseCount=1;
		ruler.visible=true;
		defaultProperties();
		document.getElementById("submit").style.visibility="visible";
		document.getElementById("show").style.visibility="visible";
		document.getElementById("clear").style.visibility="visible";
		rightFixedText.visible=true;
		document.getElementById("solve").style.visibility="hidden";
		document.getElementById("learn").style.visibility="hidden";
			for (var i = 0; i < 4; i++) {
				cText[i].visible=true;
			s1.style.visibility="visible";
			s2.style.visibility="visible";
			s3.style.visibility="visible";
			s4.style.visibility="visible";
			peri.style.visibility="visible";
			circularArrow1.visible=true;
			circularArrow2.visible=true;
		}
		incframeCount();
	}
	function calculate()
	{
		switch (frameCount)
		{
			case 0: side[0]=9.7; side[1]=10; side[2]=5; side[3]=10; break;
			case 1:	side[0]=9.7; side[1]=4.9; side[2]=12; side[3]=5.4; break;
			case 2:	side[0]=7; side[1]=7.4; side[2]=13.9; side[3]=8.3; break;
			case 3:	side[0]=13.4; side[1]=1; side[2]=12; side[3]=4.9; break;
			case 4:	side[0]=10; side[1]=4.9; side[2]=12; side[3]=7.5; break;
			case 5:	side[0]=10.5; side[1]=8.7; side[2]=3.8; side[3]=7.5; break;
			case 6:	side[0]=14; side[1]=8.4; side[2]=9.7; side[3]=4.9; break;
			case 7:	side[0]=2.3; side[1]=9; side[2]=12.2; side[3]=3.2; break;
			case 8:	side[0]=9.8; side[1]=2.3; side[2]=9.9; side[3]=14.1; break;
			default:	resetExperiment();
		}
	}
	function submit()
	{
		var peri=document.getElementById("perimeter").innerHTML;
		calculate();
		peri = peri - (side[0]+side[1]+side[2]+side[3]);
		if(peri>-0.4 && peri < 0.4)
		{
			document.getElementById("perimeter").style.background="green";
		}
		else
		{
			document.getElementById("perimeter").style.background="red";
		}
	}
	function clearField()
	{
			s1.innerHTML="";
			s2.innerHTML="";
			s3.innerHTML="";
			s4.innerHTML="";
			peri.innerHTML="";
			peri.style.background="white";
	}
	function show()
	{
		clearField();
		calculate();
			s1.innerHTML=side[0];
			setTimeout(function() {
				s2.innerHTML=side[1];
				setTimeout(function() {
					s3.innerHTML=side[2];
					setTimeout(function() {
						s4.innerHTML=side[3];
						setTimeout(function() {
							peri.innerHTML=(Math.round((side[0]+side[1]+side[2]+side[3])*10))/10;
						}, 500);
					}, 400);
				}, 400);
			}, 400);

	}

	function rulerDrag(element, newpos)
	{
	    ruler.position.set(newpos.x,newpos.y,newpos.z);
	}
/******************* Load Experiment objects code ***********************/

	var helpContent;
	function initialiseHelp()
	{
    helpContent="";
    helpContent = helpContent + "<h1>Perimeter of different Irregular polygons</h1>";
    helpContent = helpContent + "<h2>About the experiment</h2>";
    helpContent = helpContent + "<p>The experiment shows different Irregular Polygons as Farms and find their perimeters.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls, additionally you can drag and rotate ruler shown using the circular arrows</p>";
    helpContent = helpContent + "<h3>Start Button is clicked by default, click on stop to pause the animation.</h3>";
    helpContent = helpContent + "<p>First screen shows a farmer with hai question about the total length of fence required</p>";
    helpContent = helpContent + "<p>To cover his farms.</p>";
    helpContent = helpContent + "<h2>You can choose from the following two options</h2>";
    helpContent = helpContent + "<ul></ul>";
    helpContent = helpContent + "<li>Start to learn Calculating.</li>";
    helpContent = helpContent + "<li>Start Calculating on your own.</li>";
    helpContent = helpContent + "<h3>Start Learning</h3>";
    helpContent = helpContent + "<p>Different Irregular Polygons will be shown.</p>";
    helpContent = helpContent + "<p>Animations will be shown on how to calculate perimeter of different polygons.</p>";
    helpContent = helpContent + "<p>Click on Forward Arrow to see more examples.</p>";
    helpContent = helpContent + "<h3>Start Solving</h3>";
    helpContent = helpContent + "<p>Different Irregular Polygons will be shown.</p>";
    helpContent = helpContent + "<p>You have to calculate each side of the polygon to find the perimeter.</p>";
    helpContent = helpContent + "<p>Enter the result and click on submit to check the result or you can click on show to know the answer.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

	var infoContent;
	function initialiseInfo()
	{
    infoContent =  "";
    infoContent = infoContent + "<h1>Perimeter of different Irregular polygons</h2>";
    infoContent = infoContent + "<h2>About the experiment</h3>";
    infoContent = infoContent + "<p>Perimeter of any shape is the sum of all its lengths.</p>";
		infoContent = infoContent + "<p>perimeter doesn't depend upon the shape of the object.<p>";
    infoContent = infoContent + "<h2>IRREGULAR POLYGONS</h3>";
    infoContent = infoContent + "<p>Polygons which have all their sides or angles equal to each other is called an irregular polygon.</p>";
		infoContent = infoContent + "<h3>How to calculate perimeter of irregular polygons</h3>";
		infoContent = infoContent + "<p>Perimeter of an irregular polygon can be found out by</p>";
		infoContent = infoContent + "<p>taking all its sides one by one and calculating each side's length</p>";
		infoContent = infoContent + "<p>and then adding the length of each side to get the total perimeter of that polygon</p>";
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
		frameCount=0;																	//currently no triangles are explained
		exerciseCount=0;
		s1=document.getElementById("side1");
		s2=document.getElementById("side2");
		s3=document.getElementById("side3");
		s4=document.getElementById("side4");
		peri=document.getElementById("perimeter");
	}
	/*This function creates an arrow to show length of a side given as side and create */
  /*a new canvas texture which is used with object text[index].*/
  /*These arrows are used to show length of the side */

	 function createSideArrow(side,index )
	 {
	 	canvas = document.createElement('canvas');
	 	canvas.width=1000;
	 	canvas.height=100;
	 	context = canvas.getContext('2d');
	 	context.font = "bold 30pt Arial";
	 	context.fillStyle="#000000";
	 	context.fillText(side,480,60);
	 	context.lineWidth=10;
	 	context.moveTo(50,60);
	 	context.lineTo(20,50);
	 	context.lineTo(50,40);
	 	context.moveTo(20,50);
	 	context.lineTo(460,50);
	 	context.moveTo(550,50);
	 	context.lineTo(980,50);
	 	context.moveTo(950,40);
	 	context.lineTo(980,50);
	 	context.lineTo(950,60);
	 	context.strokeStyle = '#d4e800';
	 	context.stroke();
	 	texture = new THREE.Texture(canvas)
	 	texture.needsUpdate = true;
	 	material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
	 	material.transparent = true;
	 	text[index] = new THREE.Mesh(
	 	new THREE.PlaneGeometry(30, 4),
	 				material
	 				);
	 	PIEaddElement(text[index]);
	 }

	 function writeCanvas(value,index)
	{
		 canvas = document.createElement('canvas');
		 canvas.width=200;
		 canvas.height=100;
		 context = canvas.getContext('2d');
		 		 context.font = "Bold 40pt Arial";
		 		 context.fillStyle = "#000000";
		 		 context.fillText(value, 0, 50);
		 texture = new THREE.Texture(canvas)
		 texture.needsUpdate = true;
		 material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
		 material.transparent = true;
		 cText[index] = new THREE.Mesh(
 	 			new THREE.PlaneGeometry(6, 4),
 	 			material
 	 		);
 	 	PIEaddElement(cText[index]);
	}
	 /*This function creates canvas texture which is used by an object sideValue[index]*/
	 /*to show value of side given as vaule and perimeter.*/
	 /*bool is true if '+' is not to be added else false*/

	 function createSideValue(value,index,bool)
	 {
	 	canvas = document.createElement('canvas');
	 	canvas.width=80;
	 	canvas.height=100;
	 	context = canvas.getContext('2d');
	 	if(bool==false)
	 	{
	 		context.font = "bold 30pt Arial";
	 		context.fillStyle="#ffffff";
	 		context.fillText("+",12,50);
	 	}
	 	context.font = "bold 30pt Arial";
	 	context.fillStyle="#840030";
	 	context.fillText(value,1,100);
	 	texture = new THREE.Texture(canvas)
	 	texture.needsUpdate = true;
	 	material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
	 	material.transparent = true;
	 	sideValue[index] = new THREE.Mesh(
	 			new THREE.PlaneGeometry(5, 6),
	 			material
	 		);
	 	PIEaddElement(sideValue[index]);
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

	    PIEsetExperimentTitle("Perimeter of different Irregular polygons");
	    PIEsetDeveloperName("Sachin Chand");
	    PIEhideControlElement();

	    /* initialise help and info content */
	    initialiseHelp();
	    initialiseInfo();

	    /* initialise Scene */
	    initialiseScene();

	    /* initialise Other Variables */
	    initialiseOtherVariables();

			/*Background outline plane*/
	    geometry = new THREE.PlaneGeometry( 120  , 60, 32 );
	    	material = new THREE.MeshBasicMaterial( {color: 0x012727, side: THREE.DoubleSide} );
	    	background = new THREE.Mesh( geometry, material );
	    	background.position.set(centerX,centerY,0);
	    	PIEaddElement(background);

			/*Background plane*/
		   geometry = new THREE.PlaneGeometry( 100 , 45, 32 );
		   	material = new THREE.MeshBasicMaterial( {color: 0x42f4e8, side: THREE.DoubleSide} );
		   	background = new THREE.Mesh( geometry, material );
		   	background.position.set(centerX,centerY-1,0);
		   	PIEaddElement(background);

				/*Background outline Side plane*/
				geometry = new THREE.PlaneGeometry( 34 , 43, 32 );
					material = new THREE.MeshBasicMaterial( {color: 0x1e1d1d, side: THREE.DoubleSide} );
					outlineSidePlane = new THREE.Mesh( geometry, material );
					outlineSidePlane.position.set(centerX+30,centerY-1,0);
					PIEaddElement(outlineSidePlane);

				/*Background Side plane*/
				 geometry = new THREE.PlaneGeometry( 33  , 42, 32 );
					material = new THREE.MeshBasicMaterial( {color: 0x88ade8, side: THREE.DoubleSide} );
					sidePlane = new THREE.Mesh( geometry, material );
					sidePlane.position.set(centerX+30,centerY-1,0);
					PIEaddElement(sidePlane);
			/*Triangle array*/
	  	geometry = new THREE.Geometry();
	  		geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	  		geometry.vertices.push(new THREE.Vector3(-5, 0, 0));
	  		geometry.vertices.push(new THREE.Vector3(-7.5, 5, 0));
	  		geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	  		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(7.5, -2.5, 0) );

			//Create Arrow and add it to the scene
	  	geometry = new THREE.ConeGeometry(0.08,0.2,64,49,true,0,6.3);
	  		material = new THREE.MeshBasicMaterial( {color: 0x000000} );
			outlinearrow = new THREE.Mesh(geometry, material);
	  		outlinearrow.position.set(centerX,centerY-20,1);
	  		outlinearrow.scale.set(35,24,0);
	  		outlinearrow.rotateZ(-Math.PI/2);
	  	material = new THREE.MeshBasicMaterial( {color: 0x88ade8} );
	  		arrow = new THREE.Mesh(geometry, material);
	  		arrow.position.set(centerX,centerY-20,1);
	  		arrow.scale.set( 30, 20, 3 );
	  		arrow.rotateZ(-Math.PI/2);
				PIEaddElement(outlinearrow);
				PIEaddElement(arrow);
				//Create Circular arrows
				geometry = new THREE.PlaneGeometry(4,4,32);
					texture = new THREE.ImageUtils.loadTexture( 'images/circulararrow.png' );
					material = new THREE.MeshStandardMaterial( { transparent:true,map: texture, side: THREE.DoubleSide } );
					circularArrow1	= new THREE.Mesh(geometry,material);
					PIEaddElement(circularArrow1);
					circularArrow1.position.set(centerX-33,centerY-20,0);

					material = new THREE.MeshStandardMaterial( { transparent:true,map: texture, side: THREE.DoubleSide } );
					circularArrow2	= new THREE.Mesh(geometry,material);
					PIEaddElement(circularArrow2);
					circularArrow2.rotateY(Math.PI);
					circularArrow2.position.set(centerX-28,centerY-20,0);
				/*Addition of different farm objects*/
				geometry = new THREE.PlaneGeometry(30, 20,0);
				texture = new THREE.ImageUtils.loadTexture( 'images/farm.png' );
				material = new THREE.MeshStandardMaterial( { transparent:true,map: texture, side: THREE.DoubleSide } );
				farm[0] = new THREE.Mesh(geometry,material);
				PIEaddElement(farm[0]);
				farm[0].position.set(centerX-30,centerY+5,0);

				texture = new THREE.ImageUtils.loadTexture( 'images/farm2.png' );
				material = new THREE.MeshStandardMaterial( { transparent:true,map: texture, side: THREE.DoubleSide } );
				farm[1] = new THREE.Mesh(geometry,material);
				PIEaddElement(farm[1]);
				farm[1].position.set(centerX-30,centerY+5,0);

				texture = new THREE.ImageUtils.loadTexture( 'images/farm3.png' );
				material = new THREE.MeshStandardMaterial( { transparent:true,map: texture, side: THREE.DoubleSide } );
				farm[2] = new THREE.Mesh(geometry,material);
				PIEaddElement(farm[2]);
				farm[2].position.set(centerX-30,centerY+5,0);

			/*Addition of farmer*/
			geometry = new THREE.PlaneGeometry(20, 20,0);
			texture = new THREE.ImageUtils.loadTexture( 'images/farmer.png' );
				material = new THREE.MeshBasicMaterial( {transparent:true, map: texture, side: THREE.DoubleSide } );
				farmer = new THREE.Mesh(geometry, material);
				farmer.position.set(centerX-20,centerY+5,0);
				PIEaddElement(farmer);
			/*Addition of farmer's dialogue*/
			geometry = new THREE.PlaneGeometry(20, 10,0);
			texture = new THREE.ImageUtils.loadTexture( 'images/dialogue.png' );
				material = new THREE.MeshBasicMaterial( {transparent:true, map: texture, side: THREE.DoubleSide } );
				dialogue = new THREE.Mesh(geometry, material);
				dialogue.position.set(centerX+5,centerY+15,0);
				PIEaddElement(dialogue);

			/*Additon Of ruler Obhect*/
			geometry = new THREE.PlaneGeometry(45, 5,0);
			texture = new THREE.ImageUtils.loadTexture( 'images/ruler.png' );
			material = new THREE.MeshBasicMaterial( {transparent:true, map: texture, side: THREE.DoubleSide } );
			ruler = new THREE.Mesh(geometry, material);
			ruler.position.set(centerX,centerY,0);
			PIEaddElement(ruler);
			PIEdragElement(ruler);
	    PIEsetDrag(ruler, rulerDrag);


			////Addition of Bottom Text/////
					// create a canvas element//
					canvas = document.createElement('canvas');
					canvas.width=1200;
					canvas.height=100;
					context = canvas.getContext('2d');
					context.font = "Bold 20pt Arial";
					context.fillStyle = "#000000";
					context.fillText('Length Of Fence require EQUALS To', 0, 50);
					context.font = "Bold 30pt Arial";
					context.fillStyle = "#FF0000";
					context.fillText('PERIMETER', 510, 50);
					context.font = "Bold 20pt Arial";
					context.fillStyle = "#000000";
					context.fillText('Of Irregular Polygon Field', 780, 50);
					texture = new THREE.Texture(canvas)
					texture.needsUpdate = true;
				  material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
				  material.transparent = true;
				  bottomText = new THREE.Mesh(
				      new THREE.PlaneGeometry(50, 5),
				    	material
				    );
					bottomText.position.set(centerX,centerY-10,0);
					PIEaddElement( bottomText );
					bottomText.visible=false;
					/////////Additon of Fixed right Text///////////
					canvas = document.createElement('canvas');
					canvas.width=970;
					canvas.height=1800;
					context = canvas.getContext('2d');
					context.font = "bold 40pt Arial";
					context.fillText("Perimeter equals to sum of Each Side",10,50);
					context.font = "bold 60pt Arial";
					context.fillStyle="#071f8c";
					context.fillText("Perimeter =",10,1600);
					texture = new THREE.Texture(canvas)
					texture.needsUpdate = true;
					material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
					material.transparent = true;

					rightFixedText = new THREE.Mesh(
					  	new THREE.PlaneGeometry(30, 40),
							material
							);
					PIEaddElement(rightFixedText);
					rightFixedText.position.set(centerX+30,centerY-3,0);

					//////////Creation of Different side arrows to show side length///////////
					createSideArrow(14,0);
					text[0].position.set(centerX-15,centerY-6,0);
					createSideArrow(9.4,1);
					text[1].scale.set(0.7,1,1);
					text[1].position.set(centerX-31,centerY+5,0);
					text[1].rotateZ(Math.PI/2);
					createSideArrow(6.9,2);
					text[2].scale.set(0.5,1,1);
					text[2].position.set(centerX-22.5,centerY+16,0);
					createSideArrow(12,3);
					text[3].scale.set(0.85,1,1);
					text[3].position.set(centerX-6,centerY+5.5,0);
					text[3].rotateZ(-Math.PI/3.5);
					createSideArrow(8.5,4);
					text[4].position.set(centerX-15.5,centerY-6,0);
					text[4].scale.set(0.65,1,1);
					createSideArrow(5.7,5);
					text[5].position.set(centerX-29,centerY+1,0);
					text[5].scale.set(0.45,1,1);
					text[5].rotateZ(Math.PI*0.63);
					createSideArrow(7.5,6);
					text[6].position.set(centerX-23,centerY+12,0);
					text[6].scale.set(0.6,1,1);
					text[6].rotateZ(Math.PI/7);
					createSideArrow(7.5,7);
					text[7].position.set(centerX-7,centerY+12,0);
					text[7].scale.set(0.6,1,1);
					text[7].rotateZ(-Math.PI/7);
					createSideArrow(5.7,8);
					text[8].position.set(centerX-2,centerY+1,0);
					text[8].scale.set(0.45,1,1);
					text[8].rotateZ(-Math.PI*0.65);
					createSideArrow(3,9);
					text[9].position.set(centerX-14.5,centerY-6,0);
					text[9].scale.set(0.4,1,1);
					createSideArrow(6.7,10);
					text[10].position.set(centerX-19,centerY+2,0);
					text[10].scale.set(0.5,1,1);
					text[10].rotateZ(Math.PI/2);
					createSideArrow(9.7,11);
					text[11].position.set(centerX-10,centerY+2,0);
					text[11].scale.set(0.5,1,1);
					text[11].rotateZ(Math.PI/2);
					createSideArrow(14,12);
					text[12].position.set(centerX-15,centerY+16,0);
					createSideArrow(5.5,13);
					text[13].position.set(centerX-24,centerY+9,0);
					text[13].scale.set(0.4,1,1);
					createSideArrow(5.5,14);
					text[14].position.set(centerX-5.5,centerY+9,0);
					text[14].scale.set(0.4,1,1);
					createSideArrow(2.5,15);
					text[15].position.set(centerX-31,centerY+13,0);
					text[15].scale.set(0.4,1,1);
					text[15].rotateZ(Math.PI/2);
					createSideArrow(2.5,16);
					text[16].position.set(centerX+1,centerY+12,0);
					text[16].scale.set(0.4,1,1);
					text[16].rotateZ(Math.PI/2);

					///////////Addition of different side values//////////////////

					createSideValue(14,0,true);
					sideValue[0].position.set(centerX+30,centerY+13,0);
					createSideValue(9.4,1,false);
					sideValue[1].position.set(centerX+30,centerY+6,0);
					createSideValue(6.9,2,false);
					sideValue[2].position.set(centerX+30,centerY-1,0);
					createSideValue(12,3,false);
					sideValue[3].position.set(centerX+30,centerY-8,0);
					createSideValue(42.3,4,true);
					sideValue[4].position.set(centerX+35,centerY-15.5,0);
					createSideValue(8.5,5,true);
					sideValue[5].position.set(centerX+30,centerY+14,0);
					createSideValue(5.7,6,false);
					sideValue[6].position.set(centerX+30,centerY+8,0);
					createSideValue(7.5,7,false);
					sideValue[7].position.set(centerX+30,centerY+2,0);
					createSideValue(7.5,8,false);
					sideValue[8].position.set(centerX+30,centerY-4,0);
					createSideValue(5.7,9,false);
					sideValue[9].position.set(centerX+30,centerY-10,0);
					createSideValue(34.9,10,true);
					sideValue[10].position.set(centerX+35,centerY-15.5,0);
					createSideValue(3,11,true);
					sideValue[11].position.set(centerX+30,centerY+15,0);
					createSideValue(6.7,12,false);
					sideValue[12].position.set(centerX+30,centerY+11,0);
					createSideValue(6.7,13,false);
					sideValue[13].position.set(centerX+30,centerY+7,0);
					createSideValue(14,14,false);
					sideValue[14].position.set(centerX+30,centerY+3,0);
					createSideValue(5.5,15,false);
					sideValue[15].position.set(centerX+30,centerY-1,0);
					createSideValue(5.5,16,false);
					sideValue[16].position.set(centerX+30,centerY-5,0);
					createSideValue(2.5,17,false);
					sideValue[17].position.set(centerX+30,centerY-9,0);
					sideValue[17].visible=false;
					createSideValue(2.5,18,false);
					sideValue[18].position.set(centerX+30,centerY-13,0);
					sideValue[18].visible=false;
					createSideValue(46.4,19,true);
					sideValue[19].position.set(centerX+35,centerY-15.5,0);
					sideValue[19].visible=false;
					for (var i = 11; i < 19; i++)
					{
						sideValue[i].scale.set(0.6,0.6,1);
					}
      writeCanvas('Side 1',0);
			cText[0].position.set(centerX+25,centerY+13,0);
			writeCanvas('Side 2',1);
			cText[1].position.set(centerX+25,centerY+6,0);
			writeCanvas('Side 3',2);
			cText[2].position.set(centerX+25,centerY-1,0);
			writeCanvas('Side 4',3);
			cText[3].position.set(centerX+25,centerY-8,0);

			geometry = new THREE.Geometry();
	  		geometry.vertices.push(new THREE.Vector3(-21, 0, 0));
				geometry.vertices.push(new THREE.Vector3(0, 0, 0));
				geometry.vertices.push(new THREE.Vector3(-5,21, 0));
				geometry.vertices.push(new THREE.Vector3(-16, 21, 0));
				geometry.vertices.push(new THREE.Vector3(-21, 0, 0));
	  		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10.5, -10.5, 0) );
			material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
	    	shape[0] = new THREE.Line( geometry, material );
	    	shape[0].position.set(centerX-20,centerY,0);
	    	PIEaddElement(shape[0]);

				geometry = new THREE.Geometry();
		  		geometry.vertices.push(new THREE.Vector3(-21, 0, 0));
					geometry.vertices.push(new THREE.Vector3(0, 0, 0));
					geometry.vertices.push(new THREE.Vector3(5,10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 0, 0));
		  		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10.5, -5.25, 0) );
			material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
		    shape[1] = new THREE.Line( geometry, material );
		    shape[1].position.set(centerX-20,centerY,0);
		    PIEaddElement(shape[1]);

				geometry = new THREE.Geometry();
		  		geometry.vertices.push(new THREE.Vector3(-15, 0, 0));
					geometry.vertices.push(new THREE.Vector3(0, 0, 0));
					geometry.vertices.push(new THREE.Vector3(10,15, 0));
					geometry.vertices.push(new THREE.Vector3(-20, 15, 0));
					geometry.vertices.push(new THREE.Vector3(-15, 0, 0));
		  		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10, -7.5, 0) );
			material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
			   	shape[2] = new THREE.Line( geometry, material );
			   	shape[2].position.set(centerX-20,centerY,0);
			   	PIEaddElement(shape[2]);
					geometry = new THREE.Geometry();
			  	geometry.vertices.push(new THREE.Vector3(-21, 12, 0));
					geometry.vertices.push(new THREE.Vector3(5, 0, 0));
					geometry.vertices.push(new THREE.Vector3(5,10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 14, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 12, 0));
			  	geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10.5, -5.25, 0) );
					material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
			    shape[3] = new THREE.Line( geometry, material );
			    shape[3].position.set(centerX-20,centerY,0);
			    PIEaddElement(shape[3]);
					geometry = new THREE.Geometry();
				 	geometry.vertices.push(new THREE.Vector3(-21, 0, 0));
					geometry.vertices.push(new THREE.Vector3(0, -5, 0));
					geometry.vertices.push(new THREE.Vector3(5,10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 0, 0));
				 	geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10.5, -5.25, 0) );
					material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
				  shape[4] = new THREE.Line( geometry, material );
				  shape[4].position.set(centerX-20,centerY,0);
				  PIEaddElement(shape[4]);
					geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
					geometry.vertices.push(new THREE.Vector3(5,15, 0));
					geometry.vertices.push(new THREE.Vector3(-2,10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
					geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10.5, -5.25, 0) );
					material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
					shape[5] = new THREE.Line( geometry, material );
					shape[5].position.set(centerX-20,centerY,0);
					PIEaddElement(shape[5]);
					geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vector3(-30, 0, 0));
					geometry.vertices.push(new THREE.Vector3(0, 0, 0));
					geometry.vertices.push(new THREE.Vector3(0,10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 10.5, 0));
					geometry.vertices.push(new THREE.Vector3(-30, 0, 0));
					geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10.5, -5.25, 0) );
					material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
					shape[6] = new THREE.Line( geometry, material );
				  shape[6].position.set(centerX-20,centerY,0);
				  PIEaddElement(shape[6]);
					geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vector3(-5, 0, 0));
					geometry.vertices.push(new THREE.Vector3(0, 0, 0));
					geometry.vertices.push(new THREE.Vector3(5,5, 0));
			 	 	geometry.vertices.push(new THREE.Vector3(-21, 10.5, 0));
				 	geometry.vertices.push(new THREE.Vector3(-5, 0, 0));
					geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10.5, -5.25, 0) );
				 	material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
					shape[7] = new THREE.Line( geometry, material );
					shape[7].position.set(centerX-20,centerY,0);
					PIEaddElement(shape[7]);
					geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vector3(-21, 0, 0));
					geometry.vertices.push(new THREE.Vector3(0, 0, 0));
					geometry.vertices.push(new THREE.Vector3(5,21, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 5, 0));
					geometry.vertices.push(new THREE.Vector3(-21, 0, 0));
					geometry.applyMatrix( new THREE.Matrix4().makeTranslation(10.5, -5.25, 0) );
					material = new THREE.LineBasicMaterial({ color: 0x000000 ,linewidth: 5});
					shape[8] = new THREE.Line( geometry, material );
					shape[8].position.set(centerX-20,centerY,0);
					PIEaddElement(shape[8]);

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
		rightFixedText.position.set(centerX+30,centerY-3,0);
		for (var i = 0; i < 17; i++)
		{
			text[i].visible=false;
			sideValue[i].visible=false;
		}
		sideValue[17].visible=false;
		sideValue[18].visible=false;
		sideValue[19].visible=false;
		for (var i = 0; i < 3; i++)
		{
			farm[i].visible=false;
			farm[i].position.set(centerX-30,centerY+5,0);
			shape[i].visible=false;
		}
		for (var i = 0; i < 4; i++) {
			cText[i].visible=false;
		}
		for (var i = 0; i < 10; i++)
		{
			track[i]=0;
		}
		sidePlane.visible=false;
		outlineSidePlane.visible=false;
		arrow.visible=false;
		outlinearrow.visible=false;
		ruler.visible=false;
		rightFixedText.visible=false;
		document.getElementById("Forward").style.visibility = "visible";
		document.getElementById("learn").style.visibility="hidden";
		document.getElementById("solve").style.visibility="hidden";
		document.getElementById("submit").style.visibility="hidden";
		document.getElementById("show").style.visibility="hidden";
		document.getElementById("clear").style.visibility="hidden";
		s1.style.visibility="hidden";
		s2.style.visibility="hidden";
		s3.style.visibility="hidden";
		s4.style.visibility="hidden";
		peri.style.visibility="hidden";
		circularArrow1.visible=false;
		circularArrow2.visible=false;
		showFirstScreen();
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

	function updateExperimentElements(t, dt)
	{

		////////////ALL Animations are done by frame, Each frame have different ///////////////////
		////////////small animations like showing of arrow and side and calculating perimeter//////
		if(!exerciseCount)
		{
			if(frameCount==1)
			{
				if(farm[0].position.x <= centerX-15)
				{
					farm[0].position.x += 0.4;
				}
				else
				{
					rightFixedText.visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==2)
			{
				if(ruler.position.y <= centerY-10)
				{
						ruler.position.y += 0.4;
				}
				else
				{
					text[0].visible=true;
					sideValue[0].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==3)
			{
				if(ruler.position.x <= centerX-28)
				{
						ruler.position.x += 0.4;
				}
				else
				{
					text[1].visible=true;
					sideValue[1].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else	if(frameCount==4)
			{
				if(ruler.position.y >= centerY+13)
				{
						ruler.position.y -= 0.4;
				}
				else
				{
					text[2].visible=true;
					sideValue[2].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==5)
			{
				if(ruler.position.y >= centerY+2)
				{
						ruler.position.y -= 0.4;
				}
				else
				{
					text[3].visible=true;
					sideValue[3].visible=true;
					sideValue[4].visible=true;
					setTimeout(function() {
						ruler.visible=false;
						document.getElementById("Forward").style.visibility = "visible";
					}, 1000);
				}
			}
			else if(frameCount==6)
			{
				if(farm[1].position.x <= centerX-15)
				{
					farm[1].position.x += 0.4;
				}
				else
				{
					rightFixedText.visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==7)
			{
				if(ruler.position.y <= centerY-10)
				{
						ruler.position.y += 0.4;
				}
				else
				{
					text[4].visible=true;
					sideValue[5].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==8)
			{
				if(ruler.position.x <= centerX-28)
				{
						ruler.position.x += 0.4;
				}
				else
				{
					text[5].visible=true;
					sideValue[6].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==9)
			{
				if(ruler.position.x <= centerX-28)
				{
						ruler.position.x += 0.4;
				}
				else
				{
					text[6].visible=true;
					sideValue[7].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==10)
			{
				if(ruler.position.y >= centerY+11)
				{
						ruler.position.y -= 0.4;
				}
				else
				{
					text[7].visible=true;
					sideValue[8].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==11)
			{
				if(ruler.position.y >= centerY)
				{
						ruler.position.y -= 0.4;
				}
				else
				{
					text[8].visible=true;
					sideValue[9].visible=true;
					sideValue[10].visible=true;
					setTimeout(function() {
						ruler.visible=false;
						document.getElementById("Forward").style.visibility = "visible";
					}, 1000);
				}
			}
			else if(frameCount==12)
			{
				if(farm[2].position.x <= centerX-15)
				{
					farm[2].position.x += 0.4;
				}
				else
				{
					rightFixedText.visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==13)
			{
				if(ruler.position.y <= centerY-10)
				{
						ruler.position.y += 0.4;
				}
				else
				{
					text[9].visible=true;
					sideValue[11].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==14)
			{
				if(ruler.position.x <= centerX-16)
				{
						ruler.position.x += 0.4;
				}
				else
				{
					text[10].visible=true;
					sideValue[12].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==15)
			{
				if(ruler.position.x <= centerX-6)
				{
						ruler.position.x += 0.4;
				}
				else
				{
					text[11].visible=true;
					sideValue[13].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==16)
			{
				if(ruler.position.y >= centerY+12)
				{
						ruler.position.y -= 0.4;
				}
				else
				{
					text[12].visible=true;
					sideValue[14].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==17)
			{
				if(ruler.position.y >= centerY+6)
				{
						ruler.position.y -= 0.4;
				}
				else
				{
					text[13].visible=true;
					sideValue[15].visible=true;
					text[14].visible=true;
					sideValue[16].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==18)
			{
				if(ruler.position.x <= centerX-25)
				{
						ruler.position.x += 0.4;
				}
				else
				{
					text[15].visible=true;
					sideValue[17].visible=true;
					document.getElementById("Forward").style.visibility = "visible";
				}
			}
			else if(frameCount==19)
			{
				if(ruler.position.x <= centerX+5)
				{
						ruler.position.x += 0.4;
				}
				else
				{
					text[16].visible=true;
					sideValue[18].visible=true;
					sideValue[19].visible=true;
					setTimeout(function() {
						ruler.visible=false;
						document.getElementById("Forward").style.visibility = "visible";
					}, 1000);
				}
			}
		}
	}
	/******************* Update (animation changes) code ***********************/
