// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.38
// @description  优化smis.club挂刀页面的显示效果
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function () {
    // 页面加载完成后执行
    window.addEventListener('load', function () {
        // --- 新增：加载脚本后直接修改样式 ---
        var exchangeTableDetail = document.querySelector('.exchange-table-detail');
        if (exchangeTableDetail) {
            exchangeTableDetail.style.setProperty('min-width', 'auto', 'important');
        }

        // --- 点击切换逻辑 ---
        // 查找所有具有 'header-top-image' class 的触发器元素
        var triggerElements = document.querySelectorAll('.header-top-image');

        // 查找需要被点击修改的元素
        var targetElement1 = document.querySelector('.exchange-header-bottom');
        var targetElement2 = document.querySelector('.commodity-exchange-header');
        var targetElement3 = document.querySelector('.el-header');
        var targetElement4 = document.querySelector('.el-main');
        var targetElement5 = document.querySelector('.header-top-left');

        // 定义一个状态变量，用于判断当前是“执行”状态还是“复原”状态
        var isApplied = false;

        // 定义一个函数来应用样式
        function applyStyles() {
            if (targetElement1) {
                targetElement1.style.display = 'none';
            }
            if (targetElement2) {
                targetElement2.style.setProperty('height', '36px', 'important');
                targetElement2.style.setProperty('padding', '0 15px', 'important');
            }
            if (targetElement3) {
                targetElement3.style.display = 'none';
            }
            if (targetElement4) {
                targetElement4.style.setProperty('margin-top', '0', 'important');
            }
            if (targetElement5) {
                targetElement5.style.setProperty('margin-top', '7px', 'important');
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
                targetElement2.style.removeProperty('padding'); // 移除padding属性
            }
            if (targetElement3) {
                targetElement3.style.display = ''; // 恢复默认display
            }
            if (targetElement4) {
                targetElement4.style.removeProperty('margin-top'); // 移除margin-top属性
            }
            if (targetElement5) {
                targetElement5.style.removeProperty('margin-top'); // 移除margin-top属性
            }
            isApplied = false;
        }

        // 遍历所有触发器元素，并为每个元素添加点击事件监听器
        triggerElements.forEach(function (element) {
            element.addEventListener('click', function () {
                if (!isApplied) {
                    applyStyles();
                } else {
                    revertStyles();
                }
            });
        });
    });
})();