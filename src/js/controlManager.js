/**
 * Created by lihuifang on 2018/9/17.
 */
(function ($, root) {
    function ControlManager(len) {
        this.index = 0;
        this.len = len;
    }

    ControlManager.prototype = {
        prev: function () {
          return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            var index = this.index,
                len = this.len,
                curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlManager = ControlManager;
})(window.Zepto, window.player || (window.player = {}));