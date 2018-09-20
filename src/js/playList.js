/**
 * Created by lihuifang on 2018/9/19.
 */
(function ($, root) {
    var $scope = $(document.body),
        songList = [];
    $playList = $('\
        <div class="play-list show">\
            <div class="list-header">播放列表</div>\
                <ul class="list-wrapper">\
                </ul>\
            <div class="close-btn">关闭</div>\
        </div>');
    function renderList(list, curIndex) {
        var listStr = "";
        songList = list;
        list.forEach(function (item, index) {
            if(curIndex == index){
                listStr += '<li class="item active">' + item.song + '-' + item.singer + '</li>';
            }else{
                listStr += '<li class="item">' + item.song + '-' + item.singer + '</li>';
            }
        });
        $playList.find(".list-wrapper").html(listStr);
        console.log('$scope.find(".play-list")'+ $scope.find(".play-list"));
        if($scope.find(".play-list").length <= 0){
            $scope.append($playList);
        }else{
            $(".play-list").addClass("show");
        }

        bindEvent(curIndex);
    }

    function bindEvent(curIndex) {
        $(".close-btn").on("click", function(){
            $(".play-list").removeClass("show");
        });
        
        $(".item").on("click", function () {
            var index = $(this).index();
            if(curIndex != index){
                $(".item.active").removeClass("active");
                $(".item").eq(index).addClass("active");

                var currentData = songList[index];
                root.render(currentData);
                $scope.trigger("play:change", [currentData, index]);
            }
            setTimeout(function(){
                $(".play-list").removeClass("show");
            }, 200);
        });
    }

    root.playList = {
        renderList: renderList
    }
})(window.Zepto, window.player || (window.player = {}));
