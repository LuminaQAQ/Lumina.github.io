// inherit
$(document).ready(function () {
    // 音乐控件
    {
        $('.music').click(function () {
            var music = Math.round($('.music').offset().left);
            if (music == 0) {
                $('.music').animate({ 'left': '4em' }, 'fast');
                $('.music-img').animate({ 'left': '0' }, 'fast');
                $('.music-img img').animate({ 'left': '0' }, 'fast');
                music = 64;
            } else {
                $('.music').animate({ 'left': '0' }, 'fast');
                $('.music-img').animate({ 'left': '-4em' }, 'fast');
                $('.music-img img').animate({ 'left': '-4em' }, 'fast');
                music = 0;
            }
        });
        // 播放
        var a = 0;
        $('.music-img').click(function () {
            if (a == 1) {
                a = 0;
                $('.play').attr('style', 'display:none');
                $('.play,.pause').animate({ 'width': '2em', 'height': '2em', 'position': 'absolute', 'left': '1em', 'top': '1em' });
                $('.pause').attr('style', 'display:block');
                $('.maudio')[0].pause();
            } else {
                a = 1;
                $('.pause').attr('style', 'display:none');
                $('.play,.pause').animate({ 'width': '1em', 'height': '1em', 'position': 'absolute', 'left': '2.7em', 'top': '2.7em' });
                $('.play').attr('style', 'display:block');
                $('.maudio')[0].play()
            }
        });
    }


    // 导航栏浮动, 滚动包含背景和返回 滚动事件
    {
        let scroll_top = $(document).scrollTop();
        let scroll_flag = false;
        let page_top = $('#page-top').height();
        $(document).scroll(function () {
            scroll_top = $(document).scrollTop();
            if (scroll_top >= page_top) {
                if (scroll_flag) {
                    scroll_flag = false;
                    $('.nav-wrap').css({ 'position': 'fixed', 'top': '0', 'z-index': '999', 'width': '100%' }).slideUp(0);
                    $('.nav-wrap').slideDown(700, function () {
                        $(this).clearQueue();

                        // 背景切换
                        $('.trans_bg').animate({
                            'right': '1rem'
                        }, 300, function () {
                            $(this).clearQueue();
                        });
                        $('.trans_bg img').animate({
                            'rotate': '+=180deg'
                        }, 700, function () {
                            $(this).clearQueue();
                        });

                        // 回到顶部
                        $('.toTop_bg').animate({
                            'right': '1.1rem'
                        }, 300, function () {
                            $(this).clearQueue();
                        });
                        $('.toTop_bg img').animate({
                            'rotate': '+=360deg'
                        }, 700, function () {
                            $(this).clearQueue();
                        });
                    });
                }
            } else {
                scroll_flag = true;
                $('.nav-wrap').css({ 'display': 'block', 'position': 'unset', 'z-index': '999', 'width': '100%' });

                // 背景切换
                $('.trans_bg').animate({
                    'right': '-2rem'
                }, 300, function () {
                    $(this).clearQueue();
                });

                // 回到顶部
                $('.toTop_bg').animate({
                    'right': '-1.9rem'
                }, 300, function () {
                    $(this).clearQueue();
                });
            }
        });


        // 副导航
        $('.vice-nav>li').hover(function () {
            $(this).children().siblings().slideDown(700);
        }, function () {
            let index = $(this).index();
            $('.vice-nav-list').eq(index).slideUp(700, function () {
                $(this).clearQueue();
            });
        });
    }


    // 回到顶部 animate
    {
        $('.toTop_bg').click(function () {
            let toTop_top = $(document).scrollTop();
            let page_top = $('#page-top').height();
            if (toTop_top > page_top) {
                $('body,html').animate({ scrollTop: 0 }, 1000);
            }
        })
    }

});