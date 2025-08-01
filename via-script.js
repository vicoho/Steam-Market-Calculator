// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.21
// @description  优化smis.club挂刀页面的显示效果
// @author       vicoho 
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function() {
    // 页面加载完成后执行
    window.addEventListener('load', function() {
        // 查找所有具有 'header-top-image' class 的触发器元素
        // 注意：这里使用 querySelectorAll 因为可能有多个相同 class 的元素，
        // 我们会给每个都添加点击事件。
        var triggerElements = document.querySelectorAll('.header-top-image');

        // 查找需要修改的元素
        var targetElement1 = document.querySelector('.exchange-header-bottom');
        var targetElement2 = document.querySelector('.commodity-exchange-header');
        var targetElement3 = document.querySelector('.el-header');
        var targetElement4 = document.querySelector('.el-main');

        // 定义一个状态变量，用于判断当前是“执行”状态还是“复原”状态
        // 这个状态是全局的，所有触发器元素共享
        var isApplied = false;

        // 定义一个函数来应用样式
        function applyStyles() {
            if (targetElement1) {
                targetElement1.style.display = 'none';
            }
            if (targetElement2) {
                targetElement2.style.setProperty('height', '70px', 'important');
            }
            if (targetElement3) {
                targetElement3.style.display = 'none';
            }
            if (targetElement4) {
                targetElement4.style.setProperty('margin-top', '0', 'important');
            }
            isApplied = true;
        }

        // 定义一个函数来复原样式
        function revertStyles() {
            if (targetElement1) {
                targetElement1.style.display = ''; // 恢复默认display
            }
            if (targetElement2) {
                targetElement2.style.removeProperty('height'); // 移除height属性
            }
            if (targetElement3) {
                targetElement3.style.display = ''; // 恢复默认display
            }
            if (targetElement4) {
                targetElement4.style.removeProperty('margin-top'); // 移除margin-top属性
            }
            isApplied = false;
        }

        // 遍历所有触发器元素，并为每个元素添加点击事件监听器
        triggerElements.forEach(function(element) {
            element.addEventListener('click', function() {
                if (!isApplied) {
                    // 首次点击：应用样式
                    applyStyles();
                } else {
                    // 再次点击：复原样式
                    revertStyles();
                }
            });
        });
    });
})();