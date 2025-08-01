// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.33 // 版本号增加，方便识别更新
// @description  优化smis.club挂刀页面的显示效果
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function () {
    // 页面加载完成后执行
    window.addEventListener('load', function () {
        // 查找所有具有 'header-top-image' class 的触发器元素
        var triggerElements = document.querySelectorAll('.header-top-image');

        // 查找需要修改的元素
        var targetElement1 = document.querySelector('.exchange-header-bottom');
        var targetElement2 = document.querySelector('.commodity-exchange-header');
        var targetElement3 = document.querySelector('.el-header');
        var targetElement4 = document.querySelector('.el-main');
        var targetElement5 = document.querySelector('.header-top-left');
        var targetElement6 = document.querySelector('.exchange-table-detail[data-v-99d3c6b9]');

        // 定义一个状态变量，用于判断当前是“执行”状态还是“复原”状态
        var isApplied = false;

        // 定义一个变量来存储 .exchange-table-detail[data-v-99d3c6b9] 的原始 min-width
        var originalMinwidth = null;

        // 在页面加载时，获取并存储原始 min-width
        if (targetElement6) {
            originalMinwidth = targetElement6.style.minWidth || getComputedStyle(targetElement6).minWidth;
            // 如果计算样式是 'auto' 或其他默认值，我们可能需要特殊处理
            if (originalMinwidth === 'auto' || originalMinwidth === '0px') {
                originalMinwidth = ''; // 恢复时直接移除，让它回到默认行为
            }
        }


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
            // 移除 min-width 属性
            if (targetElement6) {
                targetElement6.style.removeProperty('min-width');
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
            // 恢复 min-width 属性
            if (targetElement6 && originalMinwidth !== null) {
                targetElement6.style.minWidth = originalMinwidth;
            }
            isApplied = false;
        }

        // 遍历所有触发器元素，并为每个元素添加点击事件监听器
        triggerElements.forEach(function (element) {
            element.addEventListener('click', function () {
                if (!isApplied) {
                    // 首次点击：应用样式
                    applyStyles();
                } else {
                    // 再次点击：复原样式
                    revertStyles();
                }
            });
        });

        // 移除之前独立存在的 min-width 移除代码块
        // 因为现在 min-width 的移除和复原都通过点击事件控制了
    });
})();