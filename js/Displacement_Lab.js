// Grobal Variables
// --- from here ---
//Input Part
var dpr = 1;
var SA = 1; // Cross Section -> 0:Circle  1: Rectangle 2:Triangle
var L = 0, H = 0, Y = 0, W = 0; // Draw the variable in the figure
var OP = 0, DI = 0, ODI = 0, RO = 0, FI = 0; // Supports and Loads
var l, he, wi, E; // Beam variables
var data = new Array(1); // Input data
data[1] = new Array(7);
data = [];
//Calculation Part
var n; // Nodes
var djudge = 0; // Shear force Judge
var V, M, Def, Theta; // Results
var x = []; // Points
var int = 0; // Interval
// --- to here ---

function Cross_rect() {
  Change_SA(1);
}

function Cross_circ() {
  Change_SA(0);
}

function Cross_tri() {
  Change_SA(2);
}

function Beam_Set() {
  L = 0;
  Y = 0;
  H = 0;
  W = 0;
}

function Change_SA(x) {
  Beam_Set();
  SA = x;
  if (x == 0) {
    document.getElementById("Width").style.display = "none";
  } else {
    document.getElementById("Width").style.display = "table-row";
  }
  Draw(0);
}

function Length_start() {
  Beam_Set();
  L = 1;
  Draw(0);
}

function Height_start() {
  Beam_Set();
  H = 1;
  Draw(0);
}

function Young_start() {
  Beam_Set();
  Y = 1;
  Draw(0);
}

function Width_start() {
  Beam_Set();
  W = 1;
  Draw(0);
}

function One_Point() {
  Beam_Set();
  Back();
  document.getElementById("One-Point").style.backgroundColor = "rgb(240,179,108)";
  document.getElementById("One-Point-Set").style.display = "inline-block";
  document.getElementById("normal").style.display = "none";

  var canvas = document.getElementById('canvas');
  var w = dpr*canvas.width;
  var judge = 1;
  l = Number(document.getElementById("Beam-length").value);
  var position = document.getElementById("One-Point-Load-Position");
  var dposition = document.getElementById("One-Point-Load-DPosition");
  OP = 1;
  canvas.addEventListener('mousemove', e => {
    if (e.offsetX >=0.2*w && e.offsetX <= 0.9*w && OP == 1) {
      dposition.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
      if (l > 0 && judge == 1) {
        position.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
      }
      Draw(e.offsetX);
    } else {
      dposition.value ="---";
    }
  });
  canvas.addEventListener('click', e => {
    if (e.offsetX >=0.2*w && e.offsetX <= 0.9*w && OP == 1) {
      judge = 0;
      position.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
    }
    Draw(e.offsetX);
  });

  if (l <= 0) {
    Back();
    document.getElementById("Beam-length").style.backgroundColor = "rgb(208, 82, 28)";
    window.alert("Please input Beam length (>0)!!");
  }
}

function Start_Option() {
  ODI = 0;
  document.getElementById("Distributed-Load-SPosition").style.backgroundColor = "rgb(102, 216, 227)";
  document.getElementById("Distributed-Load-EPosition").style.backgroundColor = "rgb(255, 255, 255)";
  document.getElementById("Distributed-Load-SValue").style.backgroundColor = "rgb(102, 216, 227)";
  document.getElementById("Distributed-Load-EValue").style.backgroundColor = "rgb(255, 255, 255)";
  position = document.getElementById("Distributed-Load-SPosition");
  Draw(-1);
}

function End_Option() {
  ODI = 1;
  document.getElementById("Distributed-Load-EPosition").style.backgroundColor = "rgb(102, 216, 227)";
  document.getElementById("Distributed-Load-SPosition").style.backgroundColor = "rgb(255, 255, 255)";
  document.getElementById("Distributed-Load-EValue").style.backgroundColor = "rgb(102, 216, 227)";
  document.getElementById("Distributed-Load-SValue").style.backgroundColor = "rgb(255, 255, 255)";
  position = document.getElementById("Distributed-Load-EPosition");
  Draw(-1);
}

function Distributed() {
  if (ODI == 0) {
    Start_Option();
  } else if (ODI == 1) {
    End_Option();
  }

  Beam_Set();
  Back();
  document.getElementById("Distributed").style.backgroundColor = "rgb(240,179,108)";
  document.getElementById("normal").style.display = "none";
  document.getElementById("Distributed-Set").style.display = "inline-block";

  document.getElementById("Distributed-Load-SValue").value = 1;
  document.getElementById("Distributed-Load-EValue").value = 1;

  var canvas = document.getElementById('canvas');
  var w = dpr*canvas.width;
  var judge = 1;
  l = Number(document.getElementById("Beam-length").value);

  if (ODI == 0) {
    position = document.getElementById("Distributed-Load-SPosition");
  } else if (ODI == 1) {
    position = document.getElementById("Distributed-Load-EPosition");
  }
  var dposition = document.getElementById("Distributed-Load-DPosition");
  DI = 1;
  canvas.addEventListener('mousemove', e => {
    if (e.offsetX >=0.2*w && e.offsetX <= 0.9*w && DI == 1) {
      dposition.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
      if (l > 0 && judge == 1) {
        position.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
      }
      Draw(e.offsetX);
    } else {
      dposition.value ="---";
    }
  });
  canvas.addEventListener('click', e => {
    if (e.offsetX >=0.2*w && e.offsetX <= 0.9*w && DI == 1) {
      judge = 0;
      position.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
    }
    Draw(e.offsetX);
  });
  if (l <= 0) {
    Back();
    document.getElementById("Beam-length").style.backgroundColor = "rgb(208, 82, 28)";
    window.alert("Please input Beam length (>0)!!");
  }
}

function Rotatable() {
  Beam_Set();
  Back();
  document.getElementById("Rotatable").style.backgroundColor = "rgb(240,179,108)";
  document.getElementById("normal").style.display = "none";
  document.getElementById("Rotatable-Set").style.display = "inline-block";

  var canvas = document.getElementById('canvas');
  var w = dpr*canvas.width;
  var judge = 1;
  l = Number(document.getElementById("Beam-length").value);
  var position = document.getElementById("Rotatable-Support-Position");
  var dposition = document.getElementById("Rotatable-Support-DPosition");

  RO = 1;
  canvas.addEventListener('mousemove', e => {
    if (e.offsetX >=0.2*w && e.offsetX <= 0.9*w && RO == 1) {
      dposition.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
      if (l > 0 && judge == 1) {
        position.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
      }
      Draw(e.offsetX);
    } else {
      dposition.value ="---";
    }
  });
  canvas.addEventListener('click', e => {
    if (e.offsetX >=0.2*w && e.offsetX <= 0.9*w) {
      judge = 0;
      position.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
    }
    Draw(e.offsetX);
  });
  if (l <= 0) {
    Back();
    document.getElementById("Beam-length").style.backgroundColor = "rgb(208, 82, 28)";
    window.alert("Please input Beam length (>0)!!");
  }
}

function Fixed() {
  Beam_Set();
  Back();
  document.getElementById("Fixed").style.backgroundColor = "rgb(240,179,108)";
  document.getElementById("normal").style.display = "none";
  document.getElementById("Fixed-Set").style.display = "inline-block";

  Draw(0);

  var canvas = document.getElementById('canvas');
  var w = dpr*canvas.width;
  var judge = 1;
  l = Number(document.getElementById("Beam-length").value);
  var position = document.getElementById("Fixed-Support-Position");
  var dposition = document.getElementById("Fixed-Support-DPosition");
  FI = 1;
  canvas.addEventListener('mousemove', e => {
    if (e.offsetX >=0.2*w && e.offsetX <= 0.9*w && FI == 1) {
      dposition.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
      if (l > 0 && judge == 1) {
        position.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
      }
      Draw(e.offsetX);
    } else {
      dposition.value ="---";
    }
  });
  canvas.addEventListener('click', e => {
    if (e.offsetX >=0.2*w && e.offsetX <= 0.9*w) {
      judge = 0;
      position.value = Math.round(l/0.7/w*(e.offsetX-0.2*w)*Math.pow(10,3))/Math.pow(10,3);
    }
    Draw(e.offsetX);
  });

  if (l <= 0) {
    Back();
    document.getElementById("Beam-length").style.backgroundColor = "rgb(208, 82, 28)";
    window.alert("Please input Beam length (>0)!!");
  }
}

function Back() {
  Beam_Set();
  document.getElementById("Input_Form").style.display = "block";
  document.getElementById("Calc_Form").style.display = "none";
  document.getElementById("Result_Form").style.display = "none";
  document.getElementById("One-Point").style.backgroundColor = "rgba(255, 255, 255, 0)";
  document.getElementById("Distributed").style.backgroundColor = "rgba(255, 255, 255, 0)";
  document.getElementById("Rotatable").style.backgroundColor = "rgba(255, 255, 255, 0)";
  document.getElementById("Fixed").style.backgroundColor = "rgba(255, 255, 255, 0)";
  document.getElementById("One-Point-Set").style.display = "none";
  document.getElementById("normal").style.display = "inline-block";
  document.getElementById("Distributed-Set").style.display = "none";
  document.getElementById("Rotatable-Set").style.display = "none";
  document.getElementById("Fixed-Set").style.display = "none";

  OP = 0;
  DI = 0;
  RO = 0;
  FI = 0;

  document.getElementById("One-Point-Load-Position").value = -1;
  document.getElementById("Distributed-Load-SPosition").value = -1;
  document.getElementById("Distributed-Load-EPosition").value = -1;
  document.getElementById("Rotatable-Support-Position").value = -1;
  document.getElementById("Fixed-Support-Position").value = -1;

  Draw(-1);
}

function Resister_One_Point() {
  var position = Number(document.getElementById("One-Point-Load-Position").value);
  var value = Number(document.getElementById("One-Point-Load-Value").value);
  if (position < 0) {
    window.alert("Please input correct position!!");
  } else if (value == 0) {
    window.alert("Please input correct Load!!");
  } else {
    data.unshift([0,position,value]);
    Back();
  }
}

function Resister_Distributed() {
  var sposition = Number(document.getElementById("Distributed-Load-SPosition").value);
  var eposition = Number(document.getElementById("Distributed-Load-EPosition").value);
  var svalue = Number(document.getElementById("Distributed-Load-SValue").value);
  var evalue = Number(document.getElementById("Distributed-Load-EValue").value);

  if (sposition < 0 || eposition < 0) {
    window.alert("Please input correct Position!!");
  } else if (svalue == 0 && evalue == 0) {
    window.alert("Please input correct Load!!");
  } else {
    data.unshift([1,sposition,eposition,svalue,evalue]);
    Back();
  }
}

function Resister_Rotatable() {
  var position = Number(document.getElementById("Rotatable-Support-Position").value);

  if (position < 0) {
    window.alert("Please input correct Position!!");
  } else {
    data.unshift([2,position]);
    Back();
  }
}

function Resister_Fix() {
  var position = Number(document.getElementById("Fixed-Support-Position").value);
  if (position < 0) {
    window.alert("Please input correct Position!!");
  } else {
    data.unshift([3,position]);
    Back();
  }
}

function Delete(x) {
  data.splice(x,1);
  Draw(-1);
}

function Draw(x) {
  var figure = document.getElementById('Figure');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  canvas.width = figure.clientWidth;
  canvas.height = figure.clientHeight;

  var w = dpr*canvas.width;
  var h = dpr*canvas.height;
  context.strokeStyle = "rgb(0,0,0)";
  context.lineWidth = 1.5;
  context.scale(dpr,dpr);

  //Draw Cross Section
  l = Number(document.getElementById("Beam-length").value);
  he = Number(document.getElementById("Beam-height").value);
  wi = Number(document.getElementById("Beam-width").value);
  var shape = document.getElementById("Beam-Info")

  context.beginPath();
  var rect = document.getElementById("Cross-rect");
  var circ = document.getElementById("Cross-circ");
  var tria = document.getElementById("Cross-tria");
  rect.style.backgroundColor = "rgba(255, 255, 255, 0)";
  circ.style.backgroundColor = "rgba(255, 255, 255, 0)";
  tria.style.backgroundColor = "rgba(255, 255, 255, 0)";

  if (SA == 1) {
    context.moveTo(0.05*w,0.45*h);
    context.lineTo(0.15*w,0.45*h);
    context.lineTo(0.15*w,0.45*h+0.10*w);
    context.lineTo(0.05*w,0.45*h+0.10*w);
    context.lineTo(0.05*w,0.45*h);
    context.closePath();
    context.stroke();
    rect.style.backgroundColor = "rgb(240,179,108)";
    shape.value ="Rectangle: "+String(l)+"x"+String(he)+"x"+String(wi)+" m";
  } else if (SA == 0) {
    context.arc(0.1*w,0.45*h+0.05*w,0.05*w,Math.PI*0,Math.PI*2,true);
    context.closePath();
    context.stroke();
    circ.style.backgroundColor = "rgb(240,179,108)";
    shape.value ="Circle: "+String(l)+"x"+String(he)+" m";
  } else {
    context.moveTo(0.10*w,0.45*h);
    context.lineTo(0.05*w,0.45*h+0.10*w);
    context.lineTo(0.15*w,0.45*h+0.10*w);
    context.lineTo(0.10*w,0.45*h);
    context.closePath();
    context.stroke();
    tria.style.backgroundColor = "rgb(240,179,108)";
    shape.value ="Triangle: "+String(l)+"x"+String(he)+"x"+String(wi)+" m";
  }

  // Draw Beam
  context.beginPath();
  context.moveTo(0.20*w,0.45*h);
  context.lineTo(0.90*w,0.45*h);
  context.lineTo(0.90*w,0.45*h+0.10*w);
  context.lineTo(0.20*w,0.45*h+0.10*w);
  context.lineTo(0.20*w,0.45*h);
  context.closePath();
  context.stroke();

  // Draw Floor
  context.beginPath();
  context.lineWidth = 12;
  context.moveTo(0.20*w,0.60*h+0.10*w);
  context.lineTo(0.90*w,0.60*h+0.10*w);
  context.closePath();
  context.stroke();

  //Each Variables
  if (L == 1) {
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle = "rgb(244, 136, 11)";
    context.moveTo(0.20*w,0.40*h);
    context.lineTo(0.90*w,0.40*h);
    context.moveTo(0.25*w,0.36*h);
    context.lineTo(0.20*w,0.40*h);
    context.lineTo(0.25*w,0.44*h);
    context.moveTo(0.85*w,0.36*h);
    context.lineTo(0.90*w,0.40*h);
    context.lineTo(0.85*w,0.44*h);
    context.stroke();
  }

  if (H == 1) {
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle = "rgb(244, 136, 11)";
    context.moveTo(0.10*w,0.45*h);
    context.lineTo(0.10*w,0.45*h+0.10*w);
    context.moveTo(0.09*w,0.50*h);
    context.lineTo(0.10*w,0.45*h);
    context.lineTo(0.11*w,0.50*h);
    context.moveTo(0.09*w,0.40*h+0.10*w);
    context.lineTo(0.10*w,0.45*h+0.10*w);
    context.lineTo(0.11*w,0.40*h+0.10*w);

    context.moveTo(0.48*w,0.45*h);
    context.lineTo(0.48*w,0.45*h+0.10*w);
    context.moveTo(0.47*w,0.50*h);
    context.lineTo(0.48*w,0.45*h);
    context.lineTo(0.49*w,0.50*h);
    context.moveTo(0.47*w,0.40*h+0.10*w);
    context.lineTo(0.48*w,0.45*h+0.10*w);
    context.lineTo(0.49*w,0.40*h+0.10*w);
    context.stroke();
  }

  if (W == 1) {
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle = "rgb(244, 136, 11)";
    context.moveTo(0.05*w,0.50*h+0.10*w);
    context.lineTo(0.15*w,0.50*h+0.10*w);
    context.moveTo(0.08*w,0.46*h+0.10*w);
    context.lineTo(0.05*w,0.50*h+0.10*w);
    context.lineTo(0.08*w,0.54*h+0.10*w);
    context.moveTo(0.12*w,0.46*h+0.10*w);
    context.lineTo(0.15*w,0.50*h+0.10*w);
    context.lineTo(0.12*w,0.54*h+0.10*w);
    context.stroke();
  }

  if (Y == 1) {
    context.beginPath();
    context.rect(0.20*w,0.45*h,0.7*w,0.1*w);
    context.fillStyle = "rgb(244, 136, 11)";
    context.fill();

    if (SA == 0) {
      context.beginPath();
      context.arc(0.1*w,0.45*h+0.05*w,0.05*w,Math.PI*0,Math.PI*2,true);
      context.fillStyle = "rgb(244, 136, 11)";
      context.fill();
    } else if (SA == 1) {
      context.beginPath();
      context.rect(0.05*w,0.45*h,0.10*w,0.10*w);
      context.fillStyle = "rgb(244, 136, 11)";
      context.fill();
    } else if (SA == 2) {
      context.beginPath();
      context.moveTo(0.10*w,0.45*h);
      context.lineTo(0.05*w,0.45*h+0.10*w);
      context.lineTo(0.15*w,0.45*h+0.10*w);
      context.lineTo(0.10*w,0.45*h);
      context.closePath();
      context.fillStyle = "rgb(244, 136, 11)";
      context.fill();
    }
  }


  var position = document.getElementById("One-Point-Load-Position");
  if (OP == 1) {
    context.beginPath();
    context.lineWidth = 5;
    context.strokeStyle = "rgba(0, 0, 0, 0.35)";
    context.moveTo(x,0.2*h);
    context.lineTo(x,0.45*h);
    context.moveTo(x-0.02*w,0.40*h);
    context.lineTo(x,0.45*h);
    context.lineTo(x+0.02*w,0.40*h);
    context.stroke();

    context.beginPath();
    context.lineWidth = 1.5;
    context.strokeStyle = "rgb(255, 0, 0)";
    context.moveTo(x,0.1*h);
    context.lineTo(x,0.9*h);
    context.stroke();

    if (position.value >= 0 && position.value <= l) {
      xp = position.value*0.7*w/l+0.2*w;
      context.beginPath();
      context.lineWidth = 5;
      context.strokeStyle = "rgba(0, 0, 0, 1)";
      context.moveTo(xp,0.2*h);
      context.lineTo(xp,0.45*h);
      context.moveTo(xp-0.02*w,0.40*h);
      context.lineTo(xp,0.45*h);
      context.lineTo(xp+0.02*w,0.40*h);
      context.stroke();

      context.beginPath();
      context.lineWidth = 1.5;
      context.strokeStyle = "rgb(13, 0, 255)";
      context.moveTo(xp,0.1*h);
      context.lineTo(xp,0.9*h);
      context.stroke();
    }
  }


  if (DI == 1) {
    var sposition = document.getElementById("Distributed-Load-SPosition");
    var eposition = document.getElementById("Distributed-Load-EPosition");
    var svalue = document.getElementById("Distributed-Load-SValue");
    var evalue = document.getElementById("Distributed-Load-EValue");

    var sh = 0.45*h;
    var eh = 0.45*h;
    if (svalue.value > 0 && evalue.value > 0) {
      if (evalue.value > svalue.value) {
        eh = 0.2*h;
        sh = (0.45-(svalue.value/evalue.value)*0.25)*h;
      } else if (svalue.value > evalue.value) {
        sh = 0.2*h;
        eh = (0.45-(evalue.value/svalue.value)*0.25)*h;
      } else if (svalue.value == evalue.value) {
        if (svalue.value <= 0) {
          sh = 0.45*h;
          eh = 0.45*h;
        } else {
          sh = 0.325*h;
          eh = 0.325*h;
        }
      }
    }

    if (ODI == 0) {
      context.beginPath();
      context.lineWidth = 5;
      context.strokeStyle = "rgba(0, 0, 0, 0.35)";
      context.moveTo(x,sh);
      context.lineTo(x,0.45*h);
      context.stroke();
      if (eposition.value >= 0 && eposition.value <= l) {
        xp = eposition.value*0.7*w/l+0.2*w;
        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = "rgba(0, 0, 0, 0.35)";
        context.moveTo(x,sh);
        context.lineTo(xp,eh);
        context.stroke();
      }
    } else if (ODI == 1) {
      context.beginPath();
      context.lineWidth = 5;
      context.strokeStyle = "rgba(0, 0, 0, 0.35)";
      context.moveTo(x,eh);
      context.lineTo(x,0.45*h);
      context.stroke();
      if (sposition.value >= 0 && sposition.value <= l) {
        xp = sposition.value*0.7*w/l+0.2*w;
        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = "rgba(0, 0, 0, 0.35)";
        context.moveTo(x,eh);
        context.lineTo(xp,sh);
        context.stroke();
      }
    }

    context.beginPath();
    context.lineWidth = 1.5;
    context.strokeStyle = "rgb(255, 0, 0)";
    context.moveTo(x,0.1*h);
    context.lineTo(x,0.9*h);
    context.stroke();

    var check = 0;
    if (sposition.value >= 0 && sposition.value <= l) {
      xp = sposition.value*0.7*w/l+0.2*w;
      context.beginPath();
      context.lineWidth = 5;
      context.strokeStyle = "rgba(0, 0, 0, 1)";
      context.moveTo(xp,sh);
      context.lineTo(xp,0.45*h);
      context.stroke();
      if (ODI == 0) {
        context.beginPath();
        context.lineWidth = 1.5;
        context.strokeStyle = "rgb(13, 0, 255)";
        context.moveTo(xp,0.1*h);
        context.lineTo(xp,0.9*h);
        context.stroke();

        if (eposition.value >= 0 && eposition.value <= l) {
          xp = eposition.value*0.7*w/l+0.2*w;
          context.beginPath();
          context.lineWidth = 1.5;
          context.strokeStyle = "rgb(255, 255, 255)";
          context.moveTo(xp,0.1*h);
          context.lineTo(xp,0.9*h);
          context.stroke();
        }
      }
      check = check + 1;
    }

    if (eposition.value >= 0 && eposition.value <= l) {
      xp = eposition.value*0.7*w/l+0.2*w;
      context.beginPath();
      context.lineWidth = 5;
      context.strokeStyle = "rgba(0, 0, 0, 1)";
      context.moveTo(xp,eh);
      context.lineTo(xp,0.45*h);
      context.stroke();

      if (ODI == 1) {
        context.beginPath();
        context.lineWidth = 1.5;
        context.strokeStyle = "rgb(13, 0, 255)";
        context.moveTo(xp,0.1*h);
        context.lineTo(xp,0.9*h);
        context.stroke();

        if (sposition.value >= 0 && sposition.value <= l) {
          xp = sposition.value*0.7*w/l+0.2*w;
          context.beginPath();
          context.lineWidth = 1.5;
          context.strokeStyle = "rgb(255, 255, 255)";
          context.moveTo(xp,0.1*h);
          context.lineTo(xp,0.9*h);
          context.stroke();
        }
      }
      check = check + 1;
    }

    if (check > 1) {
      sp = sposition.value*0.7*w/l+0.2*w;
      ep = eposition.value*0.7*w/l+0.2*w;
      context.beginPath();
      context.lineWidth = 5;
      context.strokeStyle = "rgba(0, 0, 0, 1)";
      context.moveTo(sp,sh);
      context.lineTo(ep,eh);
      context.stroke();
    }
  }

  if (RO == 1) {
    position = document.getElementById("Rotatable-Support-Position");
    context.beginPath();
    context.arc(x,0.525*h+0.10*w,0.075*h,Math.PI*0,Math.PI*2,true);
    context.fillStyle = "rgba(0, 0, 0, 0.35)";
    context.fill();

    context.beginPath();
    context.lineWidth = 1.5;
    context.strokeStyle = "rgb(255, 0, 0)";
    context.moveTo(x,0.1*h);
    context.lineTo(x,0.9*h);
    context.stroke();

    if (position.value >= 0 && position.value <= l) {
      context.beginPath();
      xp = position.value*0.7*w/l+0.2*w;
      context.arc(xp,0.525*h+0.10*w,0.075*h,Math.PI*0,Math.PI*2,true);
      context.fillStyle = "rgba(0, 0, 0, 1)";
      context.fill();

      context.beginPath();
      context.lineWidth = 1.5;
      context.strokeStyle = "rgb(13, 0, 255)";
      context.moveTo(xp,0.1*h);
      context.lineTo(xp,0.9*h);
      context.stroke();
    }
  }

  position = document.getElementById("Fixed-Support-Position");
  if (FI == 1) {
    context.beginPath();
    context.lineWidth = 12;
    context.strokeStyle = "rgba(0, 0, 0, 0.35)";
    context.moveTo(x,0.3*h);
    context.lineTo(x,0.60*h+0.10*w);
    context.stroke();

    context.beginPath();
    context.lineWidth = 1.5;
    context.strokeStyle = "rgb(255, 0, 0)";
    context.moveTo(x,0.1*h);
    context.lineTo(x,0.9*h);
    context.stroke();

    if (position.value >= 0 && position.value <= l) {
      xp = position.value*0.7*w/l+0.2*w;
      context.beginPath();
      context.beginPath();
      context.lineWidth = 12;
      context.strokeStyle = "rgba(0, 0, 0, 1)";
      context.moveTo(xp,0.3*h);
      context.lineTo(xp,0.60*h+0.10*w);
      context.stroke();

      context.beginPath();
      context.lineWidth = 1.5;
      context.strokeStyle = "rgb(13, 0, 255)";
      context.moveTo(xp,0.1*h);
      context.lineTo(xp,0.9*h);
      context.stroke();
    }
  }

  var table = document.getElementById("Set-Item");
  table.innerHTML ="";
  for (var i=0; i<data.length; i++) {

    if (data[i][0] == 0) {
      var newItem = document.createElement("tr");
      newItem.id = "Item"+String(i);
      newItem.innerHTML = "<td>"+String(i)+"</td><td>One-Point<br>Load</td><td>"+String(data[i][1])+" m</td><td>"+String(data[i][2])+" N</td><td><button type=\"submit\" onclick=\"Delete(this.value);\" value=\""+String(i)+"\">Delete</button></td>";
      table.appendChild(newItem);

      if (data[i][1] <= l && data[i][1] >= 0) {
        xp = data[i][1]*0.7*w/l+0.2*w;
        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = "rgba(0, 0, 0, 1)";
        context.moveTo(xp,0.2*h);
        context.lineTo(xp,0.45*h);
        context.moveTo(xp-0.02*w,0.40*h);
        context.lineTo(xp,0.45*h);
        context.lineTo(xp+0.02*w,0.40*h);
        context.stroke();
        document.getElementById("Item"+String(i)).style.backgroundColor = "rgba(255, 255, 255, 0)";
      } else {
        document.getElementById("Item"+String(i)).style.backgroundColor = "rgb(208, 82, 28)";
      }
    }

    if (data[i][0] == 1) {
      var newItem = document.createElement("tr");
      newItem.id = "Item"+String(i);
      newItem.innerHTML = "<td>"+String(i)+"</td><td>Distributed<br>Load</td><td>"+String(data[i][1])+" - "+String(data[i][2])+" m</td><td>"+String(data[i][3])+" - "+String(data[i][4])+" N</td><td><button type=\"submit\" onclick=\"Delete(this.value);\" value=\""+String(i)+"\">Delete</button></td>";
      table.appendChild(newItem);
      if (data[i][1] >= 0 && data[i][1] <= l && data[i][2] >= 0 && data[i][2] <= l) {
        var sh = 0.45*h;
        var eh = 0.45*h;
        if (data[i][3] >= 0 && data[i][4] >= 0) {
          if (data[i][4] > data[i][3]) {
            eh = 0.2*h;
            sh = (0.45-(data[i][3]/data[i][4])*0.25)*h;
          } else if (data[i][3] > data[i][4]) {
            sh = 0.2*h;
            eh = (0.45-(data[i][4]/data[i][3])*0.25)*h;
          } else if (data[i][3] == data[i][4] && data[i][3] != 0) {
            sh = 0.325*h;
            eh = 0.325*h;
          }
        }

        sp = data[i][1]*0.7*w/l+0.2*w;
        ep = data[i][2]*0.7*w/l+0.2*w;

        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "rgba(0, 0, 0, 1)";
        context.moveTo(sp,0.45*h);
        context.lineTo(sp,sh);
        context.lineTo(ep,eh);
        context.lineTo(ep,0.45*h);
        context.stroke();
        document.getElementById("Item"+String(i)).style.backgroundColor = "rgba(255, 255, 255, 0)";
      } else {
        document.getElementById("Item"+String(i)).style.backgroundColor = "rgb(208, 82, 28)";
      }
    }

    if (data[i][0] == 2) {
      var newItem = document.createElement("tr");
      newItem.id = "Item"+String(i);
      newItem.innerHTML = "<td>"+String(i)+"</td><td>Rotatable<br>Supportd</td><td>"+String(data[i][1])+" m</td><td></td><td><button type=\"submit\" onclick=\"Delete(this.value);\" value=\""+String(i)+"\">Delete</button></td>";
      table.appendChild(newItem);

      if (data[i][1] <= l && data[i][1] >= 0) {
        xp = data[i][1]*0.7*w/l+0.2*w;
        context.beginPath();
        xp = data[i][1]*0.7*w/l+0.2*w;
        context.arc(xp,0.525*h+0.10*w,0.075*h,Math.PI*0,Math.PI*2,true);
        context.lineWidth = 2;
        context.strokeStyle = "rgba(0, 0, 0, 1)";
        context.stroke();
        document.getElementById("Item"+String(i)).style.backgroundColor = "rgba(255, 255, 255, 0)";
      } else {
        document.getElementById("Item"+String(i)).style.backgroundColor = "rgb(208, 82, 28)";
      }
    }

    if (data[i][0] == 3) {
      var newItem = document.createElement("tr");
      newItem.id = "Item"+String(i);
      newItem.innerHTML = "<td>"+String(i)+"</td><td>Fixed<br>Supportd</td><td>"+String(data[i][1])+" m</td><td></td><td><button type=\"submit\" onclick=\"Delete(this.value);\" value=\""+String(i)+"\">Delete</button></td>";
      table.appendChild(newItem);

      if (data[i][1] <= l && data[i][1] >= 0) {
        xp = data[i][1]*0.7*w/l+0.2*w;
        context.beginPath();
        context.rect(xp-4,0.30*h,8,0.30*h+0.10*w);
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.fill();
        document.getElementById("Item"+String(i)).style.backgroundColor = "rgba(255, 255, 255, 0)";
      } else {
        document.getElementById("Item"+String(i)).style.backgroundColor = "rgb(208, 82, 28)";
      }
    }
  }

  if (l > 0) {
    document.getElementById("Beam-length").style.backgroundColor = "rgb(255, 255, 255)";
  }

  canvas.style.width = String(canvas.width/dpr) + "px";
  canvas.style.height = String(canvas.height/dpr) + "px";
}

function AnalyzeFEM() {
  // Move to Next Page
  document.getElementById("Result_Form").style.display = "block";
  document.getElementById("Input_Form").style.display = "none";
  document.getElementById("Calc_Form").style.display = "block";

  n = 100;
  djudge = 0;

  V = new Array(n+1);
  M = new Array(n+1);
  Theta = new Array(n+1);
  Def = new Array(n+1);

  for (var i=0; i<n+1; i++) {
    V[i] = 0;
    M[i] = 0;
    Def[i] = 0;
    Theta[i] = 0;
  }

  Bef_Calc(n);

  // New Array f
  var f = new Array(2*(n+1));
  for (var i=0; i<2*(n+1);i++) {
    f[i] = 0;
  }

  for (var i=0; i<data.length; i++) {
    if (data[i][0] == 0 || data[i][0] == 2 || data[i][0] == 3) {
      if (isNaN(data[i][1])) {

      } else {
        var xp = Closest(x,data[i][1]);
        f[2*xp] = f[2*xp] + data[i][2];
      }
    }

    // New Array K
    var type = 0;
    if (data[i][0] == 1) {
      for (var k=0; k<n; k++) {
        if (data[i][1] < x[k]) {
          if (data[i][2] < x[k]) {
            type = 0;
          } else if (data[i][2] > x[k] && data[i][2] <= x[k+1]) {
            type = 1;
          } else {
            type = 2;
          }
        } else if (data[i][1] > x[k] && data[i][1] <= x[k+1]) {
          if (data[i][2] > x[k] && data[i][2] <= x[k+1]) {
            type = 3;
          } else if (data[i][2] > x[k+1]) {
            type = 4;
          }
        }

        if (type == 1) {
          f[2*k] = f[2*k] + N1int(data[i][5],data[i][6],x[k],data[i][2],int) - N1int(data[i][5],data[i][6],x[k],x[k],int);
          f[2*k+1] = f[2*k+1] + N2int(data[i][5],data[i][6],x[k],data[i][2],int) - N2int(data[i][5],data[i][6],x[k],x[k],int);
          f[2*k+2] = f[2*k+2] + N3int(data[i][5],data[i][6],x[k],data[i][2],int) - N3int(data[i][5],data[i][6],x[k],x[k],int);
          f[2*k+3] = f[2*k+3] + N4int(data[i][5],data[i][6],x[k],data[i][2],int) - N4int(data[i][5],data[i][6],x[k],x[k],int);
        } else if (type == 2) {
          f[2*k] = f[2*k] + N1int(data[i][5],data[i][6],x[k],x[k+1],int) - N1int(data[i][5],data[i][6],x[k],x[k],int);
          f[2*k+1] = f[2*k+1] + N2int(data[i][5],data[i][6],x[k],x[k+1],int) -  N2int(data[i][5],data[i][6],x[k],x[k],int);
          f[2*k+2] = f[2*k+2] + N3int(data[i][5],data[i][6],x[k],x[k+1],int) -  N3int(data[i][5],data[i][6],x[k],x[k],int);
          f[2*k+3] = f[2*k+3] + N4int(data[i][5],data[i][6],x[k],x[k+1],int) -  N4int(data[i][5],data[i][6],x[k],x[k],int);
        } else  if (type == 4) {
          f[2*k] = f[2*k] + N1int(data[i][5],data[i][6],x[k],x[k+1],int) - N1int(data[i][5],data[i][6],x[k],data[i][1],int);
          f[2*k+1] = f[2*k+1] + N2int(data[i][5],data[i][6],x[k],x[k+1],int) - N2int(data[i][5],data[i][6],x[k],data[i][1],int);
          f[2*k+2] = f[2*k+2] + N3int(data[i][5],data[i][6],x[k],x[k+1],int) - N3int(data[i][5],data[i][6],x[k],data[i][1],int);
          f[2*k+3] = f[2*k+3] + N4int(data[i][5],data[i][6],x[k],x[k+1],int) - N4int(data[i][5],data[i][6],x[k],data[i][1],int);
        } else if (type == 3) {
          f[2*k] = f[2*k] + N1int(data[i][5],data[i][6],x[k],data[i][2],int) - N1int(data[i][5],data[i][6],x[k],data[i][1],int);
          f[2*k+1] = f[2*k+1] + N2int(data[i][5],data[i][6],x[k],data[i][2],int) - N2int(data[i][5],data[i][6],x[k],data[i][1],int);
          f[2*k+2] = f[2*k+2] + N3int(data[i][5],data[i][6],x[k],data[i][2],int) - N3int(data[i][5],data[i][6],x[k],data[i][1],int);
          f[2*k+3] = f[2*k+3] + N4int(data[i][5],data[i][6],x[k],data[i][2],int) - N4int(data[i][5],data[i][6],x[k],data[i][1],int);
        }
      }
    }
  }

  var I = Inertia();

  var K = new Array(2*(n+1));
  for (var i=0; i<2*(n+1); i++) {
    K[i] = new Array(2*(n+1));
    for (var k=0; k<2*(n+1); k++) {
      K[i][k] = 0;
    }
  }

  for (var i=0; i<n; i++) {
    K[2*i][2*i] = K[2*i][2*i] + 12/Math.pow(int,3);
    K[2*i][2*i+1] = K[2*i][2*i+1] - 6/Math.pow(int,2);
    K[2*i][2*i+2] = K[2*i][2*i+2] - 12/Math.pow(int,3);
    K[2*i][2*i+3] = K[2*i][2*i+3] - 6/Math.pow(int,2);

    K[2*i+1][2*i] = K[2*i+1][2*i] - 6/Math.pow(int,2);
    K[2*i+1][2*i+1] = K[2*i+1][2*i+1] + 4/int;
    K[2*i+1][2*i+2] = K[2*i+1][2*i+2] + 6/Math.pow(int,2);
    K[2*i+1][2*i+3] = K[2*i+1][2*i+3] + 2/int;

    K[2*i+2][2*i] = K[2*i+2][2*i] - 12/Math.pow(int,3);
    K[2*i+2][2*i+1] = K[2*i+2][2*i+1] + 6/Math.pow(int,2);
    K[2*i+2][2*i+2] = K[2*i+2][2*i+2] + 12/Math.pow(int,3);
    K[2*i+2][2*i+3] = K[2*i+2][2*i+3] + 6/Math.pow(int,2);

    K[2*i+3][2*i] = K[2*i+3][2*i] - 6/Math.pow(int,2);
    K[2*i+3][2*i+1] = K[2*i+3][2*i+1] + 2/int;
    K[2*i+3][2*i+2] = K[2*i+3][2*i+2] + 6/Math.pow(int,2);
    K[2*i+3][2*i+3] = K[2*i+3][2*i+3] + 4/int;
  }

  for (var i=0; i<2*(n+1); i++) {
    for (var k=0; k<2*(n+1); k++) {
      K[i][k] = K[i][k]*E*I;
    }
  }

  // Boundary Condition
  var zero = new Array(n+1);
  for (var i=0;i<n+1; i++) {
    zero[i] = 0;
  }

  for (var i=0; i<data.length; i++) {
    if (data[i][0] == 2) {
      var xp = Closest(x,data[i][1]);
      zero[xp] = 1;
    }

    if (data[i][0] == 3) {
      var xp = Closest(x,data[i][1]);
      zero[xp] = 2;
    }
  }

  for (var i=0; i<n+1; i++) {
    if (zero[i] > 0) {
      K[2*i][2*i] = K[2*i][2*i]*Math.pow(10,10);
      f[2*i] = 0;
    }
    if (zero[i] > 1) {
      K[2*i+1][2*i+1] = K[2*i+1][2*i+1]*Math.pow(10,10);
      f[2*i+1] = 0;
    }
  }

  var U = Solver(K,f);

  for (var i=0; i<U.length/2;i++) {
    Def[i] = U[2*i];
    Theta[i] = -U[2*i+1];
  }

  M[0] = -E*I*(Theta[1]-Theta[0])/int;
  for (i=1;i<n;i++) {
    M[i] = -E*I*(Theta[i+1]-Theta[i-1])/2/int;
  }
  M[n] = -E*I*(Theta[n]-Theta[n-1])/int;


  if (djudge > 0 || isNaN(V[0])) {
    V[0] = (M[1]-M[0])/int;
    for (i=1;i<n;i++) {
      V[i] = (M[i+1]-M[i-1])/2/int;
    }
    V[n] = (M[n]-M[n-1])/int;
  }

  Draw_Deflection(x,Def);
  Draw_Theta(x,Theta);
  Draw_ShearForce(x,V);
  Draw_Moment(x,M);
  Draw_Result(Def);

  document.getElementById("Result_Type").innerHTML = "";
  if (djudge == 0) {
    document.getElementById("Result_Type").innerHTML = "FEM "+String(n+1)+" elements Result";
  } else {
    document.getElementById("Result_Type").innerHTML = "Statically Indeterminate Beam<br>FEM "+String(n+1)+" elements Result";
  }

  document.getElementById("Input_Form").style.display = "none";
  document.getElementById("Calc_Form").style.display = "none";
  document.getElementById("Result_Form").style.display = "block";
  window.scrollTo(0,0);
  document.getElementById("FDM_Input").style.display = "inline";
  document.getElementById("FEM_Input").style.display = "none";
}

function AnalyzeFDM() {
  // Move to Next Page
  document.getElementById("Result_Form").style.display = "block";
  document.getElementById("Input_Form").style.display = "none";
  document.getElementById("Calc_Form").style.display = "block";

  n = 200;
  djudge = 0;

  V = new Array(n+1);
  M = new Array(n+1);
  Theta = new Array(n+1);
  Def = new Array(n+1);

  for (var i=0; i<n+1; i++) {
    V[i] = 0;
    M[i] = 0;
    Def[i] = 0;
    Theta[i] = 0;
  }

  Bef_Calc(n);

  // New Array f
  f = new Array(n+1);
  for (var i=0; i<n+1;i++) {
    f[i] = 0;
  }

  for (var i=0; i<data.length; i++) {
    if (data[i][0] == 0) {
      var xp = Closest(x,data[i][1]);
      f[xp] = f[xp] + data[i][2];
    }

    if (data[i][0] == 1) {
      for (var k=0;k<n+1;k++) {
        if (x[k] >= data[i][1] && x[k] <= data[i][2]) {
          f[k] = f[k] + (data[i][5]*x[k]+data[i][6])*int;
        }
      }
    }
  }

  var I = Inertia();

  K = new Array(n+1);
  for (var i=0; i<n+1; i++) {
    K[i] = new Array(n+1);
    for (var k=0; k<n+1; k++) {
      K[i][k] = 0;
    }
  }

  K[0][0] = 1;
  K[0][1] = -2;
  K[0][2] = 1;
  K[1][0] = -2;
  K[1][1] = 5;
  K[1][2] = -4;
  K[1][3] = 1;
  for (var i=2; i<n-1; i++) {
    K[i][i-2] = 1;
    K[i][i-1] = -4;
    K[i][i] = 6;
    K[i][i+1] = -4;
    K[i][i+2] = 1;
  }
  K[n-1][n-3] = 1;
  K[n-1][n-2] = -4;
  K[n-1][n-1] = 5;
  K[n-1][n] = -2;
  K[n][n-2] = 1;
  K[n][n-1] = -2;
  K[n][n] = 1;

  // Boundary Condition
  for (var i=0; i<data.length; i++) {
    var xp;
    if (data[i][0] == 2) {
      xp = Closest(x,data[i][1]);
      K[xp][xp] = K[xp][xp]*Math.pow(10,10);
      f[xp] = 0;
    }
    if (data[i][0] == 3) {
      xp = Closest(x,data[i][1]);
      K[xp][xp] = K[xp][xp]*Math.pow(10,10);
      f[xp] = 0;
      if (xp < n) {
        K[xp+1][xp+1] = K[xp+1][xp+1]*Math.pow(10,10);
        f[xp+1] = 0;
      } else {
        K[xp-1][xp-1] = K[xp-1][xp-1]*Math.pow(10,10);
        f[xp-1] = 0;
      }
    }
  }

  var Def = Solver(K,f);

  for (var i=0; i<n+1; i++) {
    Def[i] = Def[i]*Math.pow(int,3)/E/I;
  }

  Theta[0] = (Def[1]-Def[0])/int;
  for (i=1;i<n;i++) {
    Theta[i] = (Def[i+1]-Def[i-1])/2/int;
  }
  Theta[n] = (Def[n]-Def[n-1])/int;

  M[0] = -E*I*(Theta[1]-Theta[0])/int;
  for (i=1;i<n;i++) {
    M[i] = -E*I*(Theta[i+1]-Theta[i-1])/2/int;
  }
  M[n] = -E*I*(Theta[n]-Theta[n-1])/int;


  if (djudge == 1) {
    V[0] = (M[1]-M[0])/int;
    for (i=1;i<n;i++) {
      V[i] = (M[i+1]-M[i-1])/2/int;
    }
    V[n] = (M[n]-M[n-1])/int;
  }


  document.getElementById("Input_Form").style.display = "none";
  document.getElementById("Calc_Form").style.display = "none";
  document.getElementById("Result_Form").style.display = "block";
  window.scrollTo(0,0);
  document.getElementById("FDM_Input").style.display = "none";
  document.getElementById("FEM_Input").style.display = "inline";

  document.getElementById("Result_Type").innerHTML = "";
  if (djudge == 0) {
    document.getElementById("Result_Type").innerHTML = "FDM "+String(n+1)+" nodes Result";
  } else {
    document.getElementById("Result_Type").innerHTML = "Statically Indeterminate Beam<br>FDM "+String(n+1)+" nodes Result";
  }

  Draw_Deflection(x,Def);
  Draw_Theta(x,Theta);
  Draw_ShearForce(x,V);
  Draw_Moment(x,M);
  Draw_Result(Def);
}

// Check Inputs. Solving Support and shear force
function Bef_Calc(n) {
  // Get Data
  l = Number(document.getElementById("Beam-length").value);
  w = Number(document.getElementById("Beam-width").value);
  h = Number(document.getElementById("Beam-height").value);
  E = Number(document.getElementById("Young").value)*Math.pow(10,9);

  var f1 = 0, f2 = 0, s1 = 0, s2 = 0;

  //Check!!
  if (data.length < 2) {
    window.alert("Please make sure that you input correct situation!!");
    Back();
    return 0;
  }

  for (var i=0; i<data.length; i++) {
    if (data[i][0] == 0 ) {
      f1 = f1 + 1;
      if (data[i][1] < 0 || data[i][1] > l) {
        Back();
        window.alert("Please enter correct Situation!!");
        return 1;
      }
    }

    if (data[i][0] == 1) {
      f2 = f2 + 1;
      if (data[i][1] < 0 || data[i][1] > l || data[i][2] < 0 || data[i][2] > l) {
        Back();
        window.alert("Please enter correct Situation!!");
        return 1;
      }
    }

    if (data[i][0] == 2) {
      s1 = s1 + 1;
      if (data[i][1] < 0 || data[i][1] > l) {
        Back();
        window.alert("Please enter correct Situation!!");
        return 1;
      }
    }

    if (data[i][0] == 3) {
      s2 = s2 + 1;
      if (data[i][1] < 0 || data[i][1] > l) {
        Back();
        window.alert("Please enter correct Situation!!");
        return 1;
      }
    }
  }

  if (f1 + f2 < 1) {
    Back();
    window.alert("Please input Load!!");
    return 1;
  }

  if (s1 + s2 < 1) {
    Back();
    window.alert("Please input Support!!");
    return 1;
  }

  if (s1 < 2 && s2 == 0) {
    Back();
    window.alert("To support the beam, we need at least 1 fixed support or 2 rotatable support!!");
    return 1;
  }

  // Nodes
  int = l/n;
  x = [];
  for (var i=0; i<n+1; i++) {
    x[i] = l*i/n;
  }

  // Sorting Data
  var suparray = [];
  var supnum = 0;
  for (var i=0; i<data.length; i++) {
    if (data[i][0] == 1) {
      var sp,ep,sv,ev;
      if (data[i][1] > data[i][2]) {
        ep = data[i][1];
        sp = data[i][2];
        ev = data[i][3];
        sv = data[i][4];

        data[i][1] = sp;
        data[i][2] = ep;
        data[i][3] = sv;
        data[i][4] = ev;
      } else {
        sp = data[i][1];
        ep = data[i][2];
        sv = data[i][3];
        ev = data[i][4];
      }

      var a = (ev-sv)/(ep-sp);
      var bb = ev-a*ep;

      data[i][5] = a;
      data[i][6] = bb;
    }

    if (data[i][0] == 2 || data[i][0] == 3) {
      suparray[supnum] = i;
      supnum = supnum + 1;
    }
  }

  // Solving Support Force
  var amount = 0;
  for (var i=0; i<data.length; i++) {
    if (data[i][0] == 0) {
      amount = amount - data[i][2];
    } else if (data[i][0] == 1) {
      amount = amount - (data[i][3]+data[i][4])*(data[i][2]-data[i][1])/2;
    }
  }

  if (supnum <= 0) {
    document.getElementByID("Calc_Form").style.display = "none";
    window.alert("No Support!!");
    Back();
    return 0;
  } else if (supnum == 1) {
    data[suparray[0]][2] = amount;
  } else {
    var S = new Array(supnum);
    for (var i=0;i<supnum;i++) {
      S[i] = new Array(supnum);
      if (i == 0) {
        for (var k=0; k<supnum; k++) {
          S[i][k] = 1;
        }
      } else {
        for (var k=0; k<supnum; k++) {
          S[i][k] = 0;
        }
      }
    }

    for (var i=1; i<supnum; i++) {
      for (var k=0; k<supnum; k++) {
        if (i!=k) {
          S[i][k] = data[suparray[i]][1] - data[suparray[k]][1];
        }
      }
    }

    b = new Array(supnum);
    for (var i=0; i<supnum; i++) {
      b[i] = 0;
    }
    b[0] = amount;

    for (var i=1; i<supnum; i++) {
      for (var k=0; k<data.length; k++) {
        if (data[k][0] == 0) {
          b[i] = b[i] + (data[k][1]-data[suparray[i]][1])*data[k][2];
        }
        if (data[k][0] == 1) {
          b[i] = b[i] - data[k][5]/3*(2*Math.pow(data[suparray[i]][1],3)-Math.pow(data[k][2],3)-Math.pow(data[k][1],3)) - (data[k][6]-data[k][5]*data[suparray[i]][1])/2*(2*Math.pow(data[suparray[i]][1],2)-Math.pow(data[k][2],2)-Math.pow(data[k][1],2)) + data[k][6]*data[suparray[i]][1]*(2*data[suparray[i]][1]-data[k][2]-data[k][1]);
        }
      }
    }

    var check = 1;
    var j = supnum;
    do {
      if (j == 1) {
        data[suparray[0]][2] = 0;
        for (var i=0; i<data.length; i++) {
          if (data[i][0] == 0) {
            data[suparray[0]][2] = data[suparray[0]][2] - data[i][2];
          } else if (data[i][0] == 1) {
            data[suparray[0]][2] = data[suparray[0]][2] - (data[i][3]+data[i][4])*(Math.abs(data[i][1]-data[i][2]))/2;
          }
        }
        check = 0;
      } else {
        check = 0;
        var SF = Solver(S,b);
        for (var i=0; i<SF.length; i++) {
          if (isNaN(SF[i])) {
            djudge = 1;
          }
        }
        if (djudge > 0) {
          check = 0;
        } else {
          for (var i=0; i<j; i++) {
            if (SF[i] > 0 && data[suparray[i]][0] == 2) {
              data[suparray[i]][2] = 0;
              for (var k=0; k<j; k++) {
                S[k].splice(i,1);
              }
              S.splice(i,1);
              b.splice(i,1);
              suparray.splice(i,1);
              check = check + 1;
              j = j - 1;
            } else {
              data[suparray[i]][2] = SF[i];
            }
          }
        }
      }
    } while (check > 0);
  }
  Solve_SF();
}

function Solve_SF() {
  for (var i=0; i<data.length; i++) {
    if (data[i][0] == 0) {
      for (var k=0; k<n+1; k++) {
        if (x[k] >= data[i][1]) {
          V[k] = V[k] - data[i][2];
        }
      }
    }

    if (data[i][0] == 1) {
      for (var k=0; k<n+1; k++) {
        if (x[k] >= data[i][2]) {
          V[k] = V[k] - (data[i][3]+data[i][4])*(Math.abs(data[i][2]-data[i][1]))/2;
        }
        if (x[k] >= data[i][1] && x[k] < data[i][2]) {
          V[k] = V[k] - (data[i][5]/2*(Math.pow(x[k],2)-Math.pow(data[i][1],2))+data[i][6]*(x[k]-data[i][1]));
        }
      }
    }

    if (data[i][0] == 2){
      for (var k=0; k<n+1; k++) {
        if (x[k] >= data[i][1]) {
          V[k] = V[k] - data[i][2];
        }
      }
    }

    if (data[i][0] == 3){
      for (var k=0; k<n+1; k++) {
        if (x[k] >= data[i][1]) {
          V[k] = V[k] - data[i][2];
        }
      }
    }
  }
}

function Inertia() {
  var I;
  if (SA == 0) {
    //Circle
    I = Math.PI*Math.pow(h,4)/64;
  } else if (SA == 1) {
    //Rectangle
    I = w*Math.pow(h,3)/12;
  } else {
    //Triangle
    I = w*Math.pow(h,3)/36;
  }
  return I;
}

function Draw_Result(y) {
  var figure = document.getElementById('Result-Figure');
  var canvas = document.getElementById('Result-Draw');
  var context = canvas.getContext('2d');

  canvas.width = figure.clientWidth;
  canvas.height = figure.clientHeight;

  var w = dpr*canvas.width;
  var h = dpr*canvas.height;
  context.scale(dpr,dpr);

  //Draw Cross Section
  l = Number(document.getElementById("Beam-length").value);
  he = Number(document.getElementById("Beam-height").value);
  wi = Number(document.getElementById("Beam-width").value);
  var shape = document.getElementById("Beam-Info");

  context.beginPath(y);
  if (SA == 1) {
    context.rect(0.10*w,0.20*h,0.30*h,0.30*h);
    context.fillStyle = "rgba(138, 237, 192, 0.7)";
    context.fill();
  } else if (SA == 0) {
    context.arc(0.10*w+0.15*h,0.35*h,0.15*h,Math.PI*0,Math.PI*2,true);
    context.fillStyle = "rgba(138, 237, 192, 0.7)";
    context.fill();
  } else {
    context.moveTo(0.10*w,0.50*h);
    context.lineTo(0.10*w+0.15*h,0.20*h);
    context.lineTo(0.10*w+0.30*h,0.50*h);
    context.lineTo(0.10*w,0.50*h);
    context.fillStyle = "rgba(138, 237, 192, 0.7)";
    context.fill();
  }
  var s = 0.15*w+0.30*h;
  var e = 0.90*w;
  // Draw Beam
  var el = 0;
  for (var i=0; i<y.length; i++) {
    if (Math.abs(y[i]) > el) {
      el = Math.abs(y[i]);
    }
  }
  var per = 0.1*h/el;
  var int = (e-s)/(y.length-1);

  context.beginPath();
  context.moveTo(s,y[0]*per+0.35*h);
  for (var i=1; i<y.length; i++) {
    context.lineTo(s+i*int,y[i]*per+0.35*h);
    context.strokeStyle = "rgba(138, 237, 192, 0.7)";
  }
  context.lineWidth = 0.3*h;
  context.stroke();

  context.beginPath();
  context.moveTo(s,y[0]*per+0.35*h);
  for (var i=1; i<y.length; i++) {
    context.lineTo(s+i*int,y[i]*per+0.35*h);
    context.strokeStyle = "rgba(0, 255, 79, 1)";
  }
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.moveTo(0.05*w,0.35*h);
  context.lineTo(0.95*w,0.35*h);
  context.strokeStyle = "rgba(255, 255, 255, 1)";
  context.lineWidth = 1;
  context.stroke();

  for (var i=0; i<data.length; i++) {
    if (data[i][0] == 2) {
      var xp = data[i][1]*(e-s)/l+s;
      context.beginPath();
      context.arc(xp,0.60*h,0.10*h,Math.PI*0,Math.PI*2,true);
      context.fillStyle = "rgb(187, 163, 215)";
      context.fill();
    }

    if (data[i][0] == 3) {
      var xp = data[i][1]*(e-s)/l+s;
      context.beginPath();
      context.moveTo(xp,0.10*h);
      context.lineTo(xp,0.60*h);
      context.lineWidth = 8;
      context.strokeStyle = "rgb(187, 163, 215)"
      context.stroke();
    }
  }

  canvas.style.width = String(canvas.width) + "px";
  canvas.style.height = String(canvas.height) + "px";
}

function Draw_Deflection(x,y) {
  var ctx = document.getElementById("Result-Deflection");
  Draw_Figure(ctx,x,y,"rgba(27, 255, 152, 1)","rgba(138, 237, 192, 0.7)","Beam Deflection","Beam Deflection [m]",true);
}

function Draw_Theta(x,y) {
  var ctx = document.getElementById("Result-Theta");
  Draw_Figure(ctx,x,y,"rgba(255, 255, 255, 1)","rgba(167, 167, 167, 0.7)","Beam Slope","Beam Slope",true);
}

function Draw_ShearForce(x,y) {
  var ctx = document.getElementById("Result-Force");
  Draw_Figure(ctx,x,y,"rgba(51, 244, 238, 1)","rgba(139, 252, 249, 0.7)","Shear Force","SFD (Shear Force Diagram) [N]",false);
}

function Draw_Moment(x,y) {
  var ctx = document.getElementById("Result-Moment");
  Draw_Figure(ctx,x,y,"rgba(250, 166, 55, 1)","rgba(249, 199, 133, 0.7)","Moment","BMD (Bending Moment Diagram) [Nm]",false);
}

function Draw_Figure(ctx,x,y,c1,c2,s1,s2,r) {
  var mini = Math.min.apply(null,y);
  var maxi = Math.max.apply(null,y);
  if (myLineChart) {
    myLineChart.destroy();
  }
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: s1,
        data: y,
        pointRadius: 0,
        borderColor: c1,
        backgroundColor: c2,
        fill: true
        }
      ],
    },
    options: {
      legend: {
        labels: {
          fontSize: 13,
          fontColor: 'rgba(255, 255, 255, 1)',
        }
      },
      title: {
        display: true,
        text: s2,
        fontSize: 20,
        fontColor: 'rgba(255, 255, 255, 1)'
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: 'rgba(186, 168, 168, 1)',
            drawBorder: false
          },
          ticks: {
            suggestedMax: maxi,
            suggestedMin: mini,
            reverse: r,
            fontColor: 'rgba(199, 160, 160, 1)',
            fontSize: 13
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: 'rgba(199, 160, 160, 1)',
            fontSize: 12
          }
        }]
      },
    }
  });
}

function N1int(a,b,s,x,int) {
  c = a*s+b;
  var ans = 2*a/5/Math.pow(int,3)*Math.pow(x-s,5)+(2*c/Math.pow(int,3)-3*a/Math.pow(int,2))/4*Math.pow(x-s,4)-c/Math.pow(int,2)*Math.pow(x-s,3)+a/2*Math.pow(x-s,2)+c*(x-s);
  return ans;
}

function N3int(a,b,s,x,int) {
  c = a*s+b;
  var ans = -2*a/5/Math.pow(int,3)*Math.pow(x-s,5)+(3*a/Math.pow(int,2)-2*c/Math.pow(int,3))/4*Math.pow(x-s,4)+c/Math.pow(int,2)*Math.pow(x-s,3);
  return ans;
}

function N2int(a,b,s,x,int) {
  c = a*s+b;
  var ans = a/5/Math.pow(int,2)*Math.pow(x-s,5)+(c/Math.pow(int,2)-2*a/int)/4*Math.pow(x-s,4)+(a-2*c/int)/3*Math.pow(x-s,3)+c/2*Math.pow(x-s,2);
  return -1*ans;
}

function N4int(a,b,s,x,int) {
  c = a*s+b;
  var ans = a/5/Math.pow(int,2)*Math.pow(x-s,5)+(c/Math.pow(int,2)-a/int)/4*Math.pow(x-s,4)-c/3/int*Math.pow(x-s,3);
  return -1*ans;
}

function Closest(x,y) {
  var e = Math.abs(x[0] - y);
  var p = 0;
  for (var i=1; i<x.length; i++) {
    if (e > Math.abs(x[i] - y)) {
      p = i;
      e = Math.abs(x[i] - y);
    }
  }
  return p;
}

function Solver(matA,b) {
  var N = b.length;
    var matL = new Array(N)
    for (var i=0; i<N; i++) {
      matL[i] = new Array(N);
      for (var k=0;k<N;k++) {
        matL[i][k] = 0;
      }
    }
    var matU = new Array(N)
    for (var i=0; i<N; i++) {
      matU[i] = new Array(N);
      for (var k=0;k<N;k++) {
        if (k == i) {
          matU[i][k] = 1;
        } else {
            matU[i][k] = 0;
        }
      }
    }
    var lu = new Array(N)
    for (var i=0; i<N; i++) {
      lu[i] = new Array(N);
      for (var k=0;k<N;k++) {
        lu[i][k] = 0;
      }
    }
    for (var i = 0; i < N; i++) {
        var n = N - i - 1;
        var l0 = matL[i][i] = matA[0][0];
        var l1 = [];
        for (var j = 0; j < n; j++) {
            matL[j + i + 1][i] = l1[j] = matA[j + 1][0];
        }
        var u1 = [];
        for (var j = 0; j < n; j++) {
            matU[i][j + i + 1] = u1[j] = matA[0][j + 1] / l0;
        }
        for (var j = 0; j < n; j++) {
            for (var k = 0; k < n; k++) {
                lu[j][k] = l1[j] * u1[k];
            }
        }
        var A1 = [];
        for (var j = 0; j < n; j++) {
            A1[j] = [];
            for (var k = 0; k < n; k++) {
                A1[j][k] = matA[j + 1][k + 1] - lu[j][k];
            }
        }
        matA = A1;
    }
    var y = new Array(N);
    for (var i = 0; i < N; i++) {
        var sum = 0;
        for (var k = 0; k <= i - 1; k++) {
            sum += matL[i][k] * y[k];
        }
        y[i] = (b[i] - sum) / matL[i][i];
    }
    var x = new Array(N);
    for (var i = N - 1; i >= 0; i--) {
        var sum = 0;
        for (var k = i + 1; k <= N - 1; k++) {
            sum += matU[i][k] * x[k];
        }
        x[i] = y[i] - sum;
    }
    return x;
}
