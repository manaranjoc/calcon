$('.carousel').carousel({
  interval: 10000
});
$('.carousel2').carousel({
  interval: 10000
});
$('#estado').change(function() {
var estado = $(this).val();
if (estado == "nothing"){
    $('#formula').empty();
}else if (estado == "liquid"){
$('#formula').html('<p>Liquid volumetric flow rate, U.S. GPM(q)<br/><input type="text" placeholder="q" id="q" /><br/>Specific gravity of liquid at flowing conditions(g)<br/><input type="text" placeholder="g" id="g" /><br/>Actual pressure drop (P1-P2), Psi(∆P)<br/><input type="text" placeholder="AP" id="AP" /><br/><button id="submit" class="btn">submit</button></p>');
$('#submit').click(function(e){
    e.preventDefault();
    var Cv;
    var q = $('#q').val();
    var g = $('#g').val();
    var AP = $('#AP').val();
    Cv = q * (Math.sqrt(g)/Math.sqrt(AP));
    Cv = Cv.toFixed(4);
    $('#formula').html('<p> Valve flow coefficient <br/> Cv = '+ Cv +'<br/><button id="reset" class="btn">reset</button><a href="template.html"><button id="other" class="btn">other</button></a></p>');
        $('#reset').click(function(e) {
        e.preventDefault();
        $('#formula').empty();
        $('#estado').val("--");
});
})}else if(estado == "gas") {
    $('#formula').html('<p>Flowing temperature ˚R (460+˚F): (T)<br/><input type="text" placeholder="T" id="T" /><br/>Specific gravity of gas at flowing conditions(G)<br/><input type="text" placeholder="G" id="G" /><br/>Actual pressure drop (P1-P2), Psi(∆P)<br/><input type="text" placeholder="∆P" id="AP" /><br/>Upstream pressure, psi(P1)<br/><input type="text" placeholder="P1" id="P1" /><br/>Downstream pressure, psi(P2)<br/><input type="text" placeholder="P2" id="P2" /><br/>Gas volumetric flow rate, SCFH(Q)<br/><input type="text" placeholder="Q" id="Q" /><br/><button id="submit2" class="btn">submit</button></p>');  
    $('#submit2').click(function(e){
    e.preventDefault();
    var Cv2;
    var G = $('#G').val();
    var P1 = $('#P1').val();
    var P2 = $('#P2').val();
    var T = $('#T').val();
    var AP = $('#AP').val();
    var Q = $('#Q').val();
    var r1 = G * T;
    var r2 = AP * (parseFloat(P1) + parseFloat(P2));
    r1 = r1 / r2;
    Cv2 = Q / 936 * (Math.sqrt(r1) );
    Cv2 = Cv2.toFixed(4);
    $('#formula').html('<p> Valve flow coefficient <br/> Cv = '+ Cv2 +'<br/><button id="reset" class="btn">reset</button><a href="template.html"><button id="other" class="btn">other</button></a></p>');
        $('#reset').click(function(e) {
        e.preventDefault();
        $('#formula').empty();
        $('#estado').val("--");
});
    
    });
}else if (estado == "steam"){
     $('#formula').html('<p>Actual pressure drop (P1-P2), Psi(∆P)<br/><input type="text" placeholder="∆P" id="AP" /><br/>Upstream pressure, psi(P1)<br/><input type="text" placeholder="P1" id="P1" /><br/>Downstream pressure, psi(P2)<br/><input type="text" placeholder="P2" id="P2" /><br/>Steam weight (mass) flow rate, LB/HR(W)<br/><input type="text" placeholder="W" id="W" /><br/><button id="submit3" class="btn">submit</button></p>'); 
    $('#submit3').click(function(e){
            e.preventDefault();
            var Cv3;
            var P1 = $('#P1').val();
            var P2 = $('#P2').val();
            var AP = $('#AP').val();
            var W = $('#W').val(); 
            var r3 = AP * (parseFloat(P1) + parseFloat(P2));
            Cv3 = W / 2.1 * Math.sqrt(r3);
            Cv3 = Cv3.toFixed(4)
            $('#formula').html('<p> Valve flow coefficient <br/> Cv = '+ Cv3 +'<br/><button id="reset" class="btn">reset</button><a href="template.html"><button id="other" class="btn">other</button></a></p>');
            $('#reset').click(function(e) {
            e.preventDefault();
            $('#formula').empty();
            $('#estado').val("--"); 
            });                
    });
                        
}

});



var paginas = {
    'cv': 'template.html',
    'coeficiente': 'template.html',
    'flujo': 'services.html',
    'flux': 'services.html',
    'flow': 'services.html',
    'orifice': 'placa_de_orificio.html',
    'orificio': 'placa_de_orificio.html'
};


$('#buscar').click(function(e) {
    e.preventDefault();
    
    var busqueda = $('#busqueda').val();
    
     var pagina = paginas[busqueda.toLowerCase()];
    
    if(typeof pagina != 'undefined') {
       window.location.href = pagina;            
    }
    
    console.log(pagina);
    
});

$('#submit').click(function(e){
    e.preventDefault();
    var ts = $('#ts').val();
    ts = parseFloat(ts);
    var t0 = $('#t0').val();
    t0 = parseFloat(t0);
    var H = $('#H').val();
    H = parseFloat(H);
    var h = $('#h').val();
    var p = $('#p').val();
    var Q = $('#Q').val();
    Q = parseFloat(Q);
    var PD = $('#PD').val();
    var n = $('#n').val();
    var D = $('#D').val();
    var X = $('#X').val();
    var P1 = $('#P1').val();
    var W = $('#W').val();
    W = parseFloat(W);
    var d = 0;
    var Re = 0;
    var D1 = 0;
    var B = 0;
    var E = 0;
    var C = 0;
    var liquid = $('#liquid').is(':checked');
    var gas = $('#gas').is(':checked');
    var steam = $('#steam').is(':checked');
    var rey = function(Q, n, D){
    Re = (1.2732 * (Math.pow(10, 6)) * Q)/(n * D) ;
    return Re;
    };
    if(liquid == true && gas == true && steam == true){
        alert("you are crazy");
    }else if (liquid == true){
        var r1 = PD *p;
       var d1 =((Q * (Math.pow(10, 4)))/(2.1 * (Math.sqrt(r1))));
       d = Math.sqrt(d1);  
       rey(Q, n, D);
       $('#move').html('Diameter(d)<br />'+ d +'<br />Reynold(Re)<br />'+ Re + '<br /><button class=btn id="reset">Reset</button>');
           $('#reset').click(function(e){
           e.preventDefault();
           window.location.href = 'placa_de_orificio.html';
           
           });
       
    }else if(gas == true){
        Q = parseFloat(Q);
       D1 = D * (1 + (parseFloat(H * Math.pow(10, -5) * (ts - t0))));
       var xxx = (Math.pow(Q, 2))/((4.6 * Math.pow(10, -10)) * (Math.pow(D1, 4)) * PD * parseFloat(p) + Math.pow(Q, 2));
       B = Math.pow(xxx, 0.25);
       var B1 = parseFloat(B);
       E = (1 - (0.41 + (0.35 * Math.pow(B1, 4))) * (PD / (P1 * X)));
       rey(Q, n, D);
       var Re1 = parseFloat(Re);
       var Mp = Math.pow(10, 6)/ Re1;
       C = 0.5959 + (0.0312 * Math.pow(B1, 2.1)) - (0.184 * Math.pow(B1, 8)) + (0.0029 * Math.pow(B1, 2.5) * Math.pow(Mp, 0.75)) + ((2.286/D1) * (Math.pow(B1, 4)/(1-Math.pow(B1, 4))) * (0.85598 / D1) * Math.pow(B1, 3));
       B1 = (1 - Math.pow(B1, 4)) / (PD * p);
       B = ((2847.05 * Q)/Math.pow(D, 2) * E * C) * (Math.sqrt(B1));
       var d2 = B * D1;
       d =(d2)/(1 + (H * (ts - t0)));
       $('#move').html('Diameter(d)<br />'+ d +'<br />Reynold(Re)<br />'+ Re +'<br />D1<br />'+ D1 +'<br />B<br />'+ B +'<br />E<br />'+ E +'<br />C<br />'+ C +'<br /><button class=btn id="reset">Reset</button>');
       $('#reset').click(function(e){
           e.preventDefault();
           window.location.href = 'placa_de_orificio.html';
           
       });
}else if(steam == true){
       D1 = D * (1 + (parseFloat(H * Math.pow(10, -5) * (ts - t0))));
       var xxx = (Math.pow(Q, 2))/((4.6 * Math.pow(10, -10)) * (Math.pow(D1, 4)) * PD * parseFloat(p) + Math.pow(Q, 2));
       B = Math.pow(xxx, 0.25);
       var B1 = parseFloat(B);
       E = (1 - (0.41 + (0.35 * Math.pow(B1, 4))) * (PD / (P1 * X)));
       rey(Q, n, D);
       var Re1 = parseFloat(Re)
       var Mp = Math.pow(10, 6)/ Re1
       C = 0.5959 + (0.0312 * Math.pow(B1, 2.1)) - (0.184 * Math.pow(B1, 8)) + (0.0029 * Math.pow(B1, 2.5) * Math.pow(Mp, 0.75)) + ((2.286/D1) * (Math.pow(B1, 4)/(1-Math.pow(B1, 4))) * (0.85598 / D1) * Math.pow(B1, 3));
       var Fs = 1 + (0.0074 * W);
       B1 = (1 - Math.pow(B1, 4)) / (PD * p);
       B = ((2847.05 * Q)/Math.pow(D, 2) * E * C * Fs) * (Math.sqrt(B1));
       var d2 = B * D1
       d =(d2)/(1 + (H * (ts - t0)));
       $('#move').html('Diameter(d)<br />'+ d +'<br />Reynold(Re)<br />'+ Re +'<br />D1<br />'+ D1 +'<br />B<br />'+ B +'<br />E<br />'+ E +'<br />C<br />'+ C +'<br />Fs<br />'+ Fs +'<br /><button class=btn id="reset">Reset</button>');
       $('#reset').click(function(e){
           e.preventDefault();
           window.location.href = 'placa_de_orificio.html';
           
       });
    }
});
