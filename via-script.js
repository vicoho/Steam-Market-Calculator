// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.11
// @description  优化smis.club挂刀页面的显示效果
// @author       vicoho 
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function() {
    window.addEventListener('load', function() {
        var collapseButton = document.querySelector('.header-top-image');
        var targetElement = document.querySelector('.commodity-exchange-header');

        if (collapseButton && targetElement) {
            // 保存原始高度，以便可以切换回去
            var originalHeight = targetElement.style.height; // 如果元素没有内联高度，这里可能是空字符串

            // 更好的方式是获取计算后的高度
            var computedStyle = window.getComputedStyle(targetElement);
            var initialHeight = computedStyle.height;

            collapseButton.addEventListener('click', function() {
                if (targetElement.style.height === '70px') {
                    // 如果当前是70px，则恢复到原始高度
                    targetElement.style.height = initialHeight;
                } else {
                    // 否则，设置为70px
                    targetElement.style.height = '70px';
                }
                // 添加过渡效果，让动画更平滑
                targetElement.style.transition = 'height 0.3s ease-in-out';
            });
        } else {
            console.log('未找到指定的按钮或目标元素，请检查类名是否正确。');
        }
    });
})();