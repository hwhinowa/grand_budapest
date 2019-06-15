'use strict';

document.addEventListener('DOMContentLoaded', function(){
	let $wrap = $('.wrap'),
		$box = $('.video_box'),
		$intro = $('#intro');

	// 인트로 영상 재생이 끝나면 실행
	$intro.onended = function(){
		setTimeout(function(){
			$wrap.classList.add('active');
			$box.style.display = 'none';
		},1000);
	}

	Slider();
});

// 선택자 객체 지정
function $(selector){
	let $el = document.querySelectorAll(selector),
		count = $el.length;

	if(count > 1){
		return $el;
	}else if(count == 1){
		return $el[0];
	}else{
		return;
	}
};

// 가로 스크롤
const horizontal_scroll = function (event) {
	let nav = $('header');

	if (document.body.doScroll){
        document.body.doScroll(event.wheelDelta > 0 ? 'left' : 'right');
    }else if ((event.wheelDelta || event.detail) > 0){
        document.body.scrollLeft -= 100;
    }else{
        document.body.scrollLeft += 100;
	}
	if(document.body.scrollLeft > 700){
		nav.classList.add('active');
	}else{
		nav.classList.remove('active');
	}
    return false;
};
document.body.addEventListener('mousewheel', horizontal_scroll);
document.body.addEventListener('scroll', function(){
	let nav = $('header');
	
	if(document.body.scrollLeft > 700){
		nav.classList.add('active');
	}else{
		nav.classList.remove('active');
	}
    return false;
});

const go_to=(target)=>{
	let num, stick = true, nav = $('header');

	switch(target){
		case 'Welcome':
			num = 0;
			break;
		case 'Info':
			num = 1600;
			stick = false;
			break;
		case 'Staff':
			num = 4300;
			stick = false;
			break;
		default:
			num = 0;
			stick = true;
			break;
	}
	document.body.scrollTo({
		"behavior": "smooth",
		"left": num
	});

	if(stick){
		nav.classList.remove('active');
	}else{
		nav.classList.add('active');
	}
}

// 이미지 슬라이더
const Slider=()=>{
	let	$slider = $('.slide_box'),
		$item = $('.slide'),
		$prevbtn = $('.slide_nav .prev'),
		$nextbtn = $('.slide_nav .next'),
		slideLength = $item.length,
		autoSlider = true,
		current = 0;

	$('.slide_total').innerHTML = ' - ' + slideLength;
	$item[current].classList.add('current');

	if (slideLength > 1){
		$item[slideLength-1].classList.add('prev');
	}

	var control = function(dir) {
		if (dir === 'next') {
			current = current < slideLength-1 ? current + 1 : 0;
		} else {
			current = current > 0 ? current - 1 : slideLength-1;
		}

		var	nextItem = current < slideLength-1 ? current + 1 : 0,
			prevItem = current > 0 ? current - 1 : slideLength-1;

		$item[current].classList.add('current');
		$item[current].classList.remove('prev');
		$item[prevItem].classList.add('prev');
		$item[prevItem].classList.remove('current');
		$item[nextItem].classList.remove('prev');
		$item[nextItem].classList.remove('current');
	}

	setInterval(function() {
		if(autoSlider){
			control('next');
		}
	},5000);

	$slider.addEventListener('mouseenter',function(){
		autoSlider = false;
		return;
	})
	$slider.addEventListener('mouseleave',function(){
		autoSlider = true;
		return;
	})

	$prevbtn.addEventListener('click', function() {
		control('prev');
	});

	$nextbtn.addEventListener('click', function() {
		control('next');
	});
};