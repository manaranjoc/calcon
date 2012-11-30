$('.carousel').carousel({
  interval: 3000
});
$('.carousel2').carousel({
  interval: 3000
});
$('#estado').change(function() {
var estado = $(this).val();
if (estado == "nothing"){
    $('#formula').empty();
}else if (estado == "liquid"){
$('#formula').html('<p>Liquid volumetric flow rate, U.S. GPM(q)<br/><input type="text" placeholder="q" id="q" /><br/>Specific gravity of liquid at flowing conditions(g)<br/><input type="text" placeholder="g" id="g" /><br/>Actual pressure drop (P1-P2), Psi(∆P)<br/><input type="text" placeholder="AP" id="AP" /><br/><button id="submit">submit</button></p>');
$('#submit').click(function(e){
    e.preventDefault();
    var Cv;
    var q = $('#q').val();
    var g = $('#g').val();
    var AP = $('#AP').val();
    Cv = q * (Math.sqrt(g)/Math.sqrt(AP));
    $('#formula').html('<p> Valve flow coefficient <br/> Cv = '+ Cv +'<br/><button id="reset">reset</button><a href="template.html"><button id="other">other</button></a></p>');
        $('#reset').click(function(e) {
        e.preventDefault();
        $('#formula').empty();
        $('#estado').val("--");
});
})}else if(estado == "gas") {
    $('#formula').html('<p>Flowing temperature ˚R (460+˚F): (T)<br/><input type="text" placeholder="T" id="T" /><br/>Specific gravity of gas at flowing conditions(G)<br/><input type="text" placeholder="G" id="G" /><br/>Actual pressure drop (P1-P2), Psi(∆P)<br/><input type="text" placeholder="AP" id="AP" /><br/>Upstream pressure, psi(P1)<br/><input type="text" placeholder="P1" id="P1" /><br/>Downstream pressure, psi(P2)<br/><input type="text" placeholder="P2" id="P2" /><br/>Gas volumetric flow rate, SCFH(Q)<br/><input type="text" placeholder="Q" id="Q" /><br/><button id="submit2">submit</button></p>');  
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
    var r2 = AP * (P1 + P2);
    r1 = r1 / r2;
    Cv2 = Q / 936 * (Math.sqrt(r1) );
    $('#formula').html('<p> Valve flow coefficient <br/> Cv = '+ Cv2 +'<br/><button id="reset">reset</button><a href="template.html"><button id="other">other</button></a></p>');
        $('#reset').click(function(e) {
        e.preventDefault();
        $('#formula').empty();
        $('#estado').val("--");
});
    
    });
}else if (estado == "steam"){
     $('#formula').html('<p>Actual pressure drop (P1-P2), Psi(∆P)<br/><input type="text" placeholder="AP" id="AP" /><br/>Upstream pressure, psi(P1)<br/><input type="text" placeholder="P1" id="P1" /><br/>Downstream pressure, psi(P2)<br/><input type="text" placeholder="P2" id="P2" /><br/>Steam weight (mass) flow rate, LB/HR(W)<br/><input type="text" placeholder="W" id="W" /><br/><button id="submit3">submit</button></p>'); 
    $('#submit3').click(function(e){
            e.preventDefault();
            var Cv3;
            var P1 = $('#P1').val();
            var P2 = $('#P2').val();
            var AP = $('#AP').val();
            var W = $('#W').val(); 
            var r3 = AP * (P1 + P2);
            Cv3 = W / 2.1 * Math.sqrt(r3);
            $('#formula').html('<p> Valve flow coefficient <br/> Cv = '+ Cv3 +'<br/><button id="reset">reset</button><a href="template.html"><button id="other">other</button></a></p>');
            $('#reset').click(function(e) {
            e.preventDefault();
            $('#formula').empty();
            $('#estado').val("--"); 
            });                
    });
                        
}

});
$("#search").click(function(e){
    e.preventDefault();
    var question = $("#question").val();
        if (question == "cv" || question == "valve" || question == 'coefficient' ||  question ==  'valve flow coefficient' || question == 'flow' || question == 'Cv' || question == 'Valve' || question == 'Coefficient' ||  question ==  'Valve Flow Coefficient' || question == 'Flow'){
        $("#move").html('<a href="template.html">Cv</a>');
}

});