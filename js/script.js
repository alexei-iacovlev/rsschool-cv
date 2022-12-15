// animation script for content
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(params) {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scroollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scroolTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	setTimeout(() => {
		animOnScroll();
	}, 500)
}

//script for up button
function scrollTo(to, duration = 700) {
	const
		element = document.scrollingElement || document.documentElement,
		start = element.scrollTop,
		change = to - start,
		startDate = +new Date(),
		// t = current time
		// b = start value
		// c = change in value
		// d = duration
		easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		},
		animateScroll = function () {
			const currentDate = +new Date();
			const currentTime = currentDate - startDate;
			element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			}
			else {
				element.scrollTop = to;
			}
		};
	animateScroll();
}

document.addEventListener('DOMContentLoaded', function () {
	let btn = document.querySelector('#toTop');
	window.addEventListener('scroll', function () {
		// If scrolled past 599px, show the button
		if (pageYOffset > 100) {
			btn.classList.add('show');
			// Otherwise we hide
		} else {
			btn.classList.remove('show');
		}
	});

	// Scroll to the top when clicked
	btn.onclick = function (click) {
		click.preventDefault();
		scrollTo(0, 200);
	}
});
