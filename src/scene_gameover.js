
Ptero.scene_gameover = (function(){

	var buttonList;

	var isNewHigh;

	function cleanup() {
		buttonList.disable();
	}

	function init() {
		Ptero.audio.play('score');
		Ptero.overlord.stopScript();

		buttonList = new Ptero.ButtonList(Ptero.assets.json["btns_gameover"]);
		buttonList.enable();

		var btns = buttonList.namedButtons;

		btns["score"].text    = Ptero.score.getTotal().toString();
		btns["waves"].text    = Ptero.score.getWaves().toString();
		btns["kills"].text    = Ptero.score.getKills().toString();
		btns["caps"].text     = Ptero.score.getCaptures().toString();
		btns["bounties"].text = Ptero.score.getBounties().toString();
		btns["accuracy"].text = Math.floor(Ptero.score.getAccuracy()*100).toString();

		btns["replay"].onclick = function() {
			Ptero.audio.fadeOut('score',1.0);
			Ptero.setScene(Ptero.scene_play);
		};

		btns["quit"].onclick = function() {
			Ptero.setScene(Ptero.scene_menu);
			Ptero.audio.stop('score');
			Ptero.audio.play('theme');
		};

		isNewHigh = Ptero.score.commitStats();
		btns["highScore"].shouldDraw = isNewHigh.score;
	}

	function draw(ctx) {
		Ptero.deferredSprites.draw(ctx);
		buttonList.draw(ctx);
	}

	var time = 0;
	function update(dt) {
		time += dt;
		Ptero.overlord.update(dt);
	}

	return {
		init:init,
		draw:draw,
		update:update,
		cleanup: cleanup,
	};
})();
