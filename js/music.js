// inherit
$(document).ready(function () {

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

    // 音乐控件
    {
        var music_btn = Math.round($('.music').offset().left);
        $('.music').click(function () {
            if (music_btn == 0) {
                $('.music').animate({ 'left': '4em' }, 'fast');
                $('.music-img').animate({ 'left': '0' }, 'fast');
                $('.music-imgs').animate({ 'left': '0' }, 'fast');
                music_btn = 64;
            } else {
                $('.music').animate({ 'left': '0' }, 'fast');
                $('.music-img').animate({ 'left': '-4em' }, 'fast');
                $('.music-imgs').animate({ 'left': '-4em' }, 'fast');
                music_btn = 0;
            }
        });
        // 选曲
        var music = document.querySelectorAll('.maudio');
        var index = null;
        // 周排行
        var menu1 = document.querySelector('.music-menu1');
        var names1 = menu1.children;
        var music_img = document.querySelector('.music-imgs');
        var arr1 = new Array();
        var img_arr1 = new Array();
        arr1 = [
            '../source/medium/未梦 - himmel.mp3',
            '../source/medium/专页_分栏/周/My Soul,Your Beats! (Instrumental) - 麻枝准.mp3',
            '../source/medium/专页_分栏/周/Wisp X - with all my heart.mp3',
            '../source/medium/专页_分栏/周/远枫 Acoustic - himmel.mp3',
            '../source/medium/专页_分栏/周/Cytus II Opening - The Whole Rest - KIVΛ.mp3',
            '../source/medium/专页_分栏/周/Aphasia - 闫东炜.mp3',
            '../source/medium/专页_分栏/周/Eternal Layer - Wisp X.mp3',
            '../source/medium/专页_分栏/周/Phigros Ending (Extended) - 姜米條、Pigeon Games.mp3',
            '../source/medium/专页_分栏/周/Stasis - Wisp X.mp3',
            '../source/medium/专页_分栏/周/Wings of Liberty - himmel.mp3'
        ];
        img_arr1 = [
            '../source/img/music专页_分栏/1/未梦 - himmel.png',
            '../source/img/music专页_分栏/1/My Soul,Your Beats! (Instrumental) - 麻枝准.jpg',
            '../source/img/music专页_分栏/1/Wisp X - with all my heart.png',
            '../source/img/music专页_分栏/1/远枫 Acoustic - himmel.png',
            '../source/img/music专页_分栏/1/Cytus II Opening - The Whole Rest - KIVΛ.png',
            '../source/img/music专页_分栏/1/Aphasia - 闫东炜.jpg',
            '../source/img/music专页_分栏/1/Eternal Layer - Wisp X.png',
            '../source/img/music专页_分栏/1/Phigros Ending (Extended) - 姜米條、Pigeon Games.png',
            '../source/img/music专页_分栏/1/Stasis - Wisp X.jpg',
            '../source/img/music专页_分栏/1/Wings of Liberty - himmel.jpg'
        ];

        for (var i = 0; i < names1.length; i++) {
            names1[i].setAttribute('index', i);
            names1[i].addEventListener('click', function () {
                m_pause();
                for (var i = 0; i < music.length; i++) {
                    music[0].src = arr1[index];
                    music[i].pause();
                    music_img.style.backgroundImage = '';
                    a = 0;
                }
                var index = this.getAttribute('index');

                music[index].src = arr1[index];
                music_img.src = img_arr1[index];
                music[index].play();
                l = index;

                m_play();
                a = 2;

                $('.music').animate({ 'left': '4em' }, 'fast');
                $('.music-img').animate({ 'left': '0' }, 'fast');
                $('.music-img img').animate({ 'left': '0' }, 'fast');
                music_btn = 64;
            });
        };

        var menu2 = document.querySelector('.music-menu2');
        var names2 = menu2.children;
        var arr2 = new Array();
        var img_arr2 = new Array();
        var l = null;
        arr2 = [
            '../source/medium/专页_分栏/总/Ring - Chandelier XIII.mp3',
            '../source/medium/专页_分栏/总/Concentric Circles - Yichen.mp3',
            '../source/medium/专页_分栏/总/Forever - Wisp X.mp3',
            '../source/medium/专页_分栏/总/Temple of Time (Wisp X Remix) - Wisp X、Maplestory.mp3',
            '../source/medium/专页_分栏/总/ハルノヒ (春日) - 爱缪 (あいみょん).mp3',
            '../source/medium/专页_分栏/总/日陰と帽子と風鈴と - Foxtail-Grass Studio.mp3',
            '../source/medium/专页_分栏/总/Terminal Illness - 闫东炜.mp3',
            '../source/medium/专页_分栏/总/反复折断的光线 - 闫东炜.mp3',
            '../source/medium/专页_分栏/总/onoken - Last.mp3',
            '../source/medium/专页_分栏/总/Rua,K - Still.mp3'
        ];
        img_arr2 = [
            '../source/img/music专页_分栏/2/Ring - Chandelier XIII.jpg',
            '../source/img/music专页_分栏/2/Concentric Circles - Yichen.jpg',
            '../source/img/music专页_分栏/2/Forever - Wisp X.jpg',
            '../source/img/music专页_分栏/2/Temple of Time (Wisp X Remix) - Wisp X、Maplestory.jpg',
            '../source/img/music专页_分栏/2/ハルノヒ (春日) - 爱缪 (あいみょん).jpg',
            '../source/img/music专页_分栏/2/日陰と帽子と風鈴と - Foxtail-Grass Studio.jpg',
            '../source/img/music专页_分栏/2/Terminal Illness - 闫东炜.jpg',
            '../source/img/music专页_分栏/2/反复折断的光线 - 闫东炜.jpg',
            '../source/img/music专页_分栏/2/onoken - Last.jpg',
            '../source/img/music专页_分栏/2/Rua,K - Still.png'
        ]


        for (var i = 0; i < names2.length; i++) {
            names2[i].setAttribute('index', i);
            names2[i].addEventListener('click', function () {
                m_pause();
                for (var i = 0; i < music.length; i++) {
                    music[0].src = arr2[index];
                    music[i].pause();
                    a = 0;
                }
                var index = this.getAttribute('index');
                music[index].src = arr2[index];
                music_img.src = img_arr2[index];
                music[index].play();
                l = index;

                m_play();
                a = 2;

                $('.music').animate({ 'left': '4em' }, 'fast');
                $('.music-img').animate({ 'left': '0' }, 'fast');
                $('.music-img img').animate({ 'left': '0' }, 'fast');
                music_btn = 64;
            });
        };
        // 播放
        var a = 0;
        $('.music-img').click(pl_pa);
        function pl_pa() {
            if (a == 1) {
                a = 0;
                m_pause();
                for (var i = 0; i < $('.maudio').length; i++) {
                    $('.maudio')[i].pause();
                }
            }
            else if (a == 2) {
                m_pause();
                a = 0;
                for (var i = 0; i < music.length; i++) {
                    music[i].pause();
                }
            } else {
                m_play();
                $('.maudio')[l].play();
            }
        }
        function m_pause() {
            $('.play').attr('style', 'display:none');
            $('.play,.pause').animate({ 'width': '2em', 'height': '2em', 'position': 'absolute', 'left': '1em', 'top': '1em' }, 300);
            $('.pause').attr('style', 'display:block');
        }
        function m_play() {
            a = 1;
            $('.pause').attr('style', 'display:none');
            $('.play,.pause').animate({ 'width': '1em', 'height': '1em', 'position': 'absolute', 'left': '2.7em', 'top': '2.7em' }, 300);
            $('.play').attr('style', 'display:block');
        }

        // 三明治
        $('.smenu').click(function () {
            $('.sidebar').animate({ 'width': '70%' });
            $('.sidebar-shadow').attr('style', 'display:block');
            $('.sidebar-wrap').attr('style', 'display:block');
        });
        $('.sidebar-shadow').click(function () {
            $('.sidebar').animate({ 'width': '0' });
            $('.sidebar-shadow').attr('style', 'display:none');
        });
        $('.menu-list').click(function () {
            $('.menu-list-wrap').slideToggle();
        });
        // 分类
        var lis = $('.classify-list1 li');
        $('.classify').mouseover(function () {
            $('.classify-list1').attr('style', 'display:block');
        });
        $('.classify').mouseout(function () {
            $('.classify-list1').attr('style', 'display:none');
        });
    }

    // 轮播图
    {
        let winSize = $('#bulletin').width()
        let imgLen = $('.bulletin ul li').length;
        let i = 0;
        $('.bulletin ul li').css({ 'width': winSize + 'px' });
        $(window).resize(() => {
            winSize = $('#bulletin').width()
            $('.bulletin ul li').css({ 'width': winSize + 'px' });

            $('.bulletin ul').css({ 'width': winSize * imgLen })
        });

        let timer = setInterval(img_group, 5000);

        function img_group() {
            const wd = $('#bulletin').width()
            if (i < imgLen) {
                $('.bulletin ul').animate({ 'left': wd * -i }, 1000);
                i++;
            } else {
                $('.bulletin ul').animate({ 'left': 0 }, 1000);
                i = 0;
            }

            clearInterval(timer);
            timer = setInterval(img_group, 5000)
        };
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