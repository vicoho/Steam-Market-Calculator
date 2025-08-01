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
    // 页面加载完成后执行
    window.addEventListener('load', function() {
        // 查找具有特定data属性的元素
        var element = document.querySelector('[data-v-54ea84d4]');

        // 如果找到了元素，则修改其背景颜色
        if (element) {
            element.style.backgroundColor = 'red';
        }
    });
})();