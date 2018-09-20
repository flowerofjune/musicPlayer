/**
 * Created by lihuifang on 2018/9/18.
 */
(function ($, root) {
    function MusicProcess(duration) {
        this.duration = 0;
        this.startTime = 0,
        this.lastPercent = 0,
        this.animationFrameId = undefined;
    }

    MusicProcess.prototype = {
        start: function(duration) {
            this.duration = duration;
            this.lastPercent = this.lastPercent ? this.lastPercent : 0;
            var startTime = this.startTime = new Date().getTime();
            cancelAnimationFrame(this.animationFrameId);
            _this = this;
            function updateTime() {
                var currentTime = new Date().getTime();
                var percent = _this.lastPercent + ((currentTime - startTime) / (duration * 1000));
                if(percent >= 0 && percent <= 1){
                    _this.update(percent);
                    _this.animationFrameId = requestAnimationFrame(updateTime);
                }else{
                    $scope.find(".next-btn").trigger("click");
                    cancelAnimationFrame(_this.animationFrameId);
                }

            }
            updateTime();
        },

        stop: function () {
            var stopTime = new Date().getTime();
            this.lastPercent = this.lastPercent + (stopTime - this.startTime) / (this.duration * 1000);
            cancelAnimationFrame(this.animationFrameId);
        },
        update: function (percent) {
            var secs = Math.round(percent * this.duration);
            secs = formateTime(secs);
            $(".start-time").text(secs);
            $(".slider-bottom").css({
                transform: "translateX(" + (percent - 1) * 100 + "%)"
            });
        },
        renderEndTime: function () {
            $(".end-time").text(formateTime(this.duration));
        }
    }

    root.musicProcess = MusicProcess;

    function formateTime(duration) {
        var minute = Math.floor(duration / 60),
            second = duration % 60;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return minute + ":" + second;
    }
})(window.Zepto, window.player || (window.player = {}));
