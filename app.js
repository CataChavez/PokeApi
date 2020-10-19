$(function(){

  $("button").click(function(event){
    event.preventDefault()
    var idpokemon = $('#idpokemon').val()
      

  
  var settings = {
    "url": `https://pokeapi.co/api/v2/pokemon/${idpokemon}`,
    "method": "GET"
    };
      
    $.ajax(settings).done(function (response) {
      $('#name').text(response.name)
      $('img').attr('src', response.sprites['front_default'])
      $('#weight').text(`Peso:${response.weight} [kg]`)
      createChart(response)  
         
    });   
  })
});

function createChart(data) {
  var cleanData = data.stats.map(function(info){
    return { label: info.stat.name, y: info.base_stat}
  })
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: false,
    theme: "light2",
    title:{
      text: "Pokemon Stats"
    },
    data: [
     {
       type: "column",
       dataPoints: cleanData
     }  
    ]
  });
  chart.render();
  }
