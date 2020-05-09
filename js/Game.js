class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var refe = await database.ref('playerCount').once("value");
      if(refe.exists()){
        playerCount = refe.val();
        player.getCount();
      }
      
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(13);
    text("GAME START",120,100);
    Player.getPlayerInfo();
    if(allPlayers!==undefined){
      var display_position=130;
      for(var plr in allPlayers){
        if(plr==="player"+player.index){
        fill("red");
        }
        else{
          fill(0);
        }
        display_position+=30;
        textSize(15);
        text(allPlayers[plr].name+":"+allPlayers[plr].display,120,display_position);
      }
    }
    if(keyIsDown(UP_ARROW) && Player.index!==null){
      player.distance+=50;
      player.update();
    }
  }
}
