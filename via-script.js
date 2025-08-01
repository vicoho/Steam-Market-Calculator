// ==UserScript==
// @name         挂刀页面美化
// @namespace    https://github.com/vicoho/Steam-Market-Calculator
// @version      0.61
// @description  优化smis.club挂刀页面的显示效果，通过注入CSS实现
// @author       vicoho
// @run-at       document-end
// @match        https://smis.club/exchange
// @grant        none
// ==/UserScript==

(function () {
    // --- 点击切换逻辑 ---
    // 查找所有具有 'header-top-image' class 的触发器元素
    var triggerElements = document.querySelectorAll('.header-top-image');

    // 定义要注入的CSS样式
    var cssStyles = `
        .exchange-header-bottom {
            display: none !important;
        }
        .commodity-exchange-header {
            height: 36px !important;
            padding: 0 15px !important;
        }
        .el-header {
            display: none !important;
        }
        .el-main {
            margin-top: 0 !important;
        }
        .header-top-left {
            margin-top: 7px !important;
        }
        .exchange-table-detail {
            min-width: auto !important;
        }
        .commodity-exchange-bottom {
            margin-top: 0px !important;
        }
        .exchange-phone-item-bottom + div > .exchange-table-detail:nth-last-child(2) {
            display: none !important;
        }
        .exchange-phone-item-bottom + div > .exchange-table-detail:nth-last-child(1) {
            display: none !important;
        }
    `;

    // 创建一个style元素
    var styleElement = document.createElement('style');
    styleElement.id = 'smis-beautify-styles'; // 给style元素一个ID，方便后续查找和移除
    styleElement.type = 'text/css';
    styleElement.textContent = cssStyles; // 直接使用 textContent，兼容 Chrome 内核浏览器

    // 定义一个状态变量，用于判断当前是“执行”状态还是“复原”状态
    var isApplied = false;

    // 定义一个函数来应用样式 (注入CSS)
    function applyStyles() {
        // 确保styleElement只被添加一次
        if (!document.getElementById('smis-beautify-styles')) {
            document.head.appendChild(styleElement);
        }
        isApplied = true;
    }

    // 定义一个函数来复原样式 (移除CSS)
    function revertStyles() {
        var existingStyle = document.getElementById('smis-beautify-styles');
        if (existingStyle) {
            existingStyle.parentNode.removeChild(existingStyle);
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

    // --- 新增功能：日成交量样式修改 ---
    // 页面加载完成后执行
    window.addEventListener('load', function () {
        // 定义常量
        const MIN_DAILY_VOLUME_THRESHOLD = 30;

        // 获取所有带有 exchange-phone-item-median class 的 div 元素
        const divs = document.querySelectorAll('div.exchange-phone-item-median');

        // 遍历每个 div 元素
        divs.forEach(div => {
            // 检查当前 div 的文本内容是否包含“日成交量”
            if (div.textContent.includes('日成交量')) {
                // 在这个 div 内部，找到那个包含数字且样式为 rgb(51, 51, 51) 的 span 元素
                const dailyVolumeSpan = div.querySelector('span[style="color: rgb(51, 51, 51);"]');

                // 确保找到了这个 span 元素
                if (dailyVolumeSpan) {
                    // 提取 span 的文本内容并移除首尾空格
                    const volumeText = dailyVolumeSpan.textContent.trim();
                    // 将文本转换为整数
                    const volume = parseInt(volumeText, 10);

                    // 检查转换后的数字是否有效且大于常量定义的阈值
                    if (!isNaN(volume) && volume > MIN_DAILY_VOLUME_THRESHOLD) {
                        // 如果条件满足，将该 span 元素的文本颜色设置为 #974ae8，并加粗
                        dailyVolumeSpan.style.color = '#974ae8';
                        dailyVolumeSpan.style.fontWeight = 'bold';
                    }
                }
            }
        });
    });
})();