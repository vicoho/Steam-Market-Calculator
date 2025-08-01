// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.2
// @description  优化smis.club挂刀页面的显示效果
// @author       vicoho 
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function() {
    // 页面加载完成后执行
    window.addEventListener('load', function() {
        // 查找触发器元素
        var triggerElement = document.querySelector('[data-v-99d3c6b9]');
        // 查找需要修改的元素
        var targetElement1 = document.querySelector('[data-v-99d3c6b9]'); // 自身也需要修改
        var targetElement2 = document.querySelector('[data-v-54ea84d4]');

        // 定义一个状态变量，用于判断当前是“执行”状态还是“复原”状态
        var isApplied = false;

        // 如果找到了触发器元素，则添加点击事件监听器
        if (triggerElement) {
            triggerElement.addEventListener('click', function() {
                if (!isApplied) {
                    // 首次点击：应用样式
                    if (targetElement1) {
                        targetElement1.style.display = 'none';
                        targetElement1.style.setProperty('height', '70px', 'important');
                    }
                    if (targetElement2) {
                        targetElement2.style.display = 'none';
                        targetElement2.style.setProperty('margin-top', '0', 'important');
                    }
                    isApplied = true; // 切换到“已应用”状态
                } else {
                    // 再次点击：复原样式
                    if (targetElement1) {
                        targetElement1.style.display = ''; // 恢复默认display
                        targetElement1.style.removeProperty('height'); // 移除height属性
                    }
                    if (targetElement2) {
                        targetElement2.style.display = ''; // 恢复默认display
                        targetElement2.style.removeProperty('margin-top'); // 移除margin-top属性
                    }
                    isApplied = false; // 切换到“未应用”状态
                }
            });
        }
    });
})();