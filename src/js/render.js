(function ($, root) {
    var $scope = $(document.body);
    /**
     * 渲染歌曲信息
     * @param data
     */
    function renderInfo(data) {
        var infoHtml = '<p class="song-name">' + data.song + '</p>\
            <p class="singer-name">' + data.singer + '</p>\
            <p class="album-name">' + data.album + '</p>';
        $(".song-info").html(infoHtml);
    }

    /**
     * 渲染收藏按钮
     * @param data
     */
    function renderIsLike(isLike) {
        if(isLike){
            $(".like-btn").addClass("is-like");
        }else{
            $(".like-btn").removeClass("is-like");
        }
    }

    /**
     * 渲染图片
     * @param data
     */
    function renderImg(src) {
        var img = new Image();
        img.onload = function () {
            root.blurImg(img, $scope);
            console.log(src);
            $scope.find(".img-wrapper img").attr("src", src);
        }
        img.src = src;
    }

    root.render = function (data) {
        renderInfo(data);
        renderIsLike(data.isLike);
        renderImg(data.image)
    }
})(window.Zepto, window.player || (window.player = {}))