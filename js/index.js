
$(document).ready(function () {
	// 音乐控件
	{
		$('.music').click(function () {
			let music = Math.round($('.music').offset().left);
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
		let a = 0;
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

	// 头图切换 数组 css
	{
		let img_index = 0
		let arr = [
			"../source/img/index/firstview.png",
			"../source/img/index/firstview1.jpg",
			"../source/img/index/firstview2.jpg"
		];

		$('.arrow_r').click(function () {
			if (img_index == arr.length - 1) {
				img_index = 0;
				$('.firstview figure').css("background-image", 'url(' + arr[img_index] + ')');
			} else {
				$('.firstview figure').css("background-image", 'url(' + arr[++img_index] + ')');
			}
		});

		$('.arrow_l').click(function () {
			if (img_index == 0) {
				img_index = 2;
				$('.firstview figure').css("background-image", 'url(' + arr[img_index] + ')');
			} else {
				$('.firstview figure').css("background-image", 'url(' + arr[--img_index] + ')');
			}
		});
	}

	// 背景切换  leave animate 阻止冒泡
	{
		$('.trans_bg ul li>span').click(function () {
			let index = $(this).index();
			let color = $(this).css('background-color')
			$('.pagebg').animate({ 'background-color': color }, 700, function () {
				$(this).clearQueue();
			});
		});

		$('.trans_bg').click(function (e) {
			$('.trans_bg ul').animate({
				"width": 'toggle',
				"overflow": 'hidden'
			}, 300, function (e) {
				$(this).clearQueue();
			});
			e.stopPropagation();
		})

		$('.trans_bg ul').mouseleave(function () {
			$('.trans_bg ul').animate({
				"width": 'toggle',
				"overflow": 'hidden'
			}, 300);
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

	// 公告栏轮播
	{
		const bulletin_h = $('#bulletin ul li').height();
		let bulletin_index = $('#bulletin ul li').length - 1;
		let count = 0;
		for (var i = 0; i < bulletin_index + 1; i++) {
			$('.circle').append('<li></li>');
		}
		$('.circle li').eq(0).addClass('circle-active');

		$('.circle li').click(function () {
			let index = $(this).index();
			count = index;

			$('#bulletin ul').animate({ 'bottom': index * bulletin_h }, 700, function () {
				$('.circle li').eq(count).addClass('circle-active').siblings().removeClass('circle-active');
				$(this).clearQueue();
			});
		});

		$('#bulletin').mouseover(function () {
			clearInterval(timer_set);
		})
		$('#bulletin').mouseout(function () {
			timer_set = setInterval(timer, 3000);
		});

		function timer() {
			if ($('#bulletin ul').css('bottom') < (bulletin_h * bulletin_index) + 'px') {
				$('#bulletin ul').animate({ 'bottom': '+=' + bulletin_h }, 700, function () {
					$('.circle li').eq(++count).addClass('circle-active').siblings().removeClass('circle-active');
					$(this).clearQueue();
				});
			} else {
				count = 0;
				$('#bulletin ul').animate({ 'bottom': '0' }, 700, function () {
					$('.circle li').eq(count).addClass('circle-active').siblings().removeClass('circle-active');
					$(this).clearQueue();
				});
			}
		}

		let timer_set = setInterval(timer, 3000);
	}

	// 公告栏收起展开 animate
	{
		$('#list').click(function () {
			let blt = $('#bulletin');
			let windows = parseInt($(window).width()) / 16;
			if (blt.height() != 0) {
				blt.animate({ 'height': '0', 'margin': '0', 'border': '0' });
				$('#list span').text('点击展开公告栏');
				$('#list img').animate({ 'rotate': '-=180deg' }, 700);
			} else {
				if (windows < 63 && windows >= 30) {
					blt.animate({ 'height': '15.5em', 'margin': '1em' });
				} else {
					blt.animate({ 'height': '14em', 'margin': '1em' });
				}
				$('#list span').text('点击收起公告栏');
				$('#list img').animate({ 'rotate': '+=180deg' }, 700);
			}
		});
	}

	// 
	{
	}

	// 换页 ajax index() 兄弟选择器 ...
	{
		let atc_count = 0;
		let page_index = 0;

		// 文章初始生成
		let atc_len = $('.left').length;

		// 页码 + 换页
		for (var i = 0; i < atc_len; i++) {
			if (i % 3 == 0) {
				$('.next-page').append(
					`
						<div class="single-np non-single-np">${++atc_count}</div>
					`
				);
			}
		}

		$('.single-np').eq(0).removeClass('non-single-np');


		console.log($('.article-wrap article').length);


		// 换页文章
		$('.single-np, .non-single-np').click(function () {
			let index = $(this).index();
			page_index = index;
			$('.article-wrap').empty().fadeOut(0).fadeIn();
			$(this).removeClass('non-single-np').siblings().addClass('non-single-np');
		});

	}

	// 搜索栏
	{
		$('#search').focus(function () {
			$('.search-wrap').slideDown();
		});

		$('.nav-wrap h3, .nav-wrap .vice-nav, .firstview, #page-center').click(function () {
			$('.search-wrap').slideUp();
		});

		$('.search-wrap li').click(function () {
			$('#search').val($(this).text());
			$('.info-clear').css('display', 'block');
		});

		$('.search-wrap li').mouseenter(function () {
			$(this).css('background-color', '#606163');
		});
		$('.search-wrap li').mouseleave(function () {
			$(this).css('background-color', 'unset');
		});

		$('.info-clear').click(function () {
			$('#search').val('');
			$('.info-clear').css('display', 'none');
		});

		$('#search').keydown(function () {
			if ($('#search').val() !== '') {
				$('.info-clear').css('display', 'block');
			}
		})
	}

	// 时间 - 倒计时

	// anti_timer();
	// setInterval(anti_timer, 1000);

	// function anti_timer() {
	//     let now = new Date();
	//     let future = +new Date('2023-1-22');
	//     let times = (future - now) / 1000;
	//     if (times == 0) {
	//         $('#anti-time').html('<h3>春节快乐!</h3>');
	//     } else {

	//         let mon = parseInt(times / 60 / 60 / 24 / 30);
	//         let d = parseInt(times / 60 / 60 / 24 % 30);
	//         let h = parseInt(times / 60 / 60 % 24);
	//         let min = parseInt(times / 60 % 60);
	//         let s = parseInt(times % 60);

	//         mon = mon < 10 ? '0' + mon : mon;
	//         d = d < 10 ? '0' + d : d;
	//         h = h < 10 ? '0' + h : h;
	//         min = min < 10 ? '0' + min : min;
	//         s = s < 10 ? '0' + s : s;

	//         $('#anti-time').html('<h3>距离2023春节还有: <br>' + mon + '月' + d + '天' + h + '时' + min + '分' + s +
	//             '秒' + '</h3>');


	//     }
	// };

	// 随写录
	{

		let mydate = new Date();
		let year = mydate.toLocaleDateString();
		$('.write-btn').click(function () {
			if ($('.write-btn').attr('value') == '收') {
				$('.write-area').slideUp(700);
				$('.write-btn').attr('value', '写');
			} else {
				$('.write-area').slideDown(700);
				$('.write-btn').attr('value', '收');
			};
		});

		$('.submit').click(function () {
			let txt = $('.write-txt').val();
			if (txt == '') {
				alert("请输入内容!");
				return false;
			}
			$('.note-board').before("<div id='comment' class='single-note'>" + txt +
				"<div class='note-ts'>" + year + "</div>" + "</div>");
		});
	}

	// 用户头像
	{
		$('.header-mask').hide();
		$('#client-header').mouseenter(function () {
			$('.header-mask').fadeIn(300);
		});
		$('.header-mask a').mouseout(function () {
			$('.header-mask').fadeOut(300);
		});
	}
});
