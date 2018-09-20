(function ($, root) {
    function AudioManager() {
        this.audio = new Audio();
        this.status = "pause";
    }

    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        setAudioSource: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay: function (time) {
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.audioManager = AudioManager;
})(window.Zepto, window.player || (window.player = {}));