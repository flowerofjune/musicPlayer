var $ = window.Zepto,
    root = window.player,
    controlManager = root.controlManager,
    audioManager = root.audioManager,
    MusicProcess = root.musicProcess,
    playList = root.playList,
    musicProcess = {},
    $scope = $(document.body),
    index = 0,
    songList = [];

getData("../mock/data.json");
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            songList = data;
            var currentData = data[index];
            bindClick();
            bindTouch();
            root.render(currentData);
            controlManager = new controlManager(data.length);
            audioManager = new audioManager();
            audioManager.setAudioSource(currentData.audio);
            musicProcess = new MusicProcess();
            $scope.trigger("play:change", currentData);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function bindTouch() {
    var offsetX = $(".slier-wrapper").offset().left;
    var width = $(".slier-wrapper").offset().width;
    var currentData = songList[index];

    $(".slider-dot").on("touchstart", function (e) {
        musicProcess.stop();
        audioManager.pause();
    }).on("touchmove", function (e) {
        var clientX = e.touches[0].clientX;
        musicProcess.lastPercent = (clientX - offsetX) / width;
        musicProcess.update(musicProcess.lastPercent);
    }).on("touchend", function (e) {
        var clientX = e.changedTouches[0].clientX;
        musicProcess.lastPercent = (clientX - offsetX) / width;
        musicProcess.start(currentData.duration);
        audioManager.jumpToPlay(musicProcess.lastPercent*currentData.duration);
    });
}

function bindClick() {
    $scope.on("click", ".like-btn", function () {
        var currentData = songList[index];
        if($(this).hasClass("is-like")){
            $(this).removeClass("is-like");
            currentData.isLike = false;
        }else{
            $(this).addClass("is-like");
            currentData.isLike = true;
        }
    });
    $scope.on('click', '.prev-btn', function () {
        index = controlManager.prev();
        var currentData = songList[index];
        root.render(currentData);
        $scope.trigger("play:change", currentData);
    });
    
    $scope.on('click', '.next-btn', function () {
        index = controlManager.next();
        var currentData = songList[index];
        root.render(currentData);
        $scope.trigger("play:change", currentData);
    });

    $scope.on('click', '.song-list-btn', function () {
        playList.renderList(songList, index);
    });

    $scope.on('click', '.play-btn', function () {
        var currentData = songList[index];
        if(audioManager.status == 'pause'){
            audioManager.play();
            musicProcess.start(currentData.duration);
        }else{
            audioManager.pause();
            musicProcess.stop();
        }
        $(this).toggleClass('pause');
    });

    $scope.on('play:change', function (event, currentData, changedIndex) {
        if(changedIndex !== undefined){
            index = changedIndex;
            controlManager.index = index;
        }
        audioManager.status = 'pause'
        audioManager.setAudioSource(currentData.audio);
        audioManager.play();
        $(".play-btn").addClass('pause');
        musicProcess.lastPercent = 0;
        musicProcess.start(currentData.duration);
        musicProcess.renderEndTime();
    });

}

