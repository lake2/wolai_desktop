let wolai_theme = localStorage.getItem('wolai_theme');

function enhance() {
    const $: JQueryStatic = require('jquery');
    const remote: Electron.Remote = require('electron').remote;

    (() => {
        const $container = $('#wolai-page-layout > div:first');
        if ($container.length == 1) {
            $container.css({ paddingRight: '75px', position: 'relative' });

            const update = () => {
                const fill = localStorage.getItem('wolai_theme') === '"light"' ? '#312727' : '#9a9a9ab3';
                const $wolai_desktop = $container.find('#wolai_desktop');
                const $html = $(`
                <div id="wolai_desktop" style="position: absolute;top: 10px;right: 10px;z-index: 1;display: flex;align-items: center">
                    <div title="移动窗口" style="width: 22px;height: 22px;font-size: 0;cursor: default;-webkit-app-region: drag;margin: 0 10px">
                        <svg viewBox="0 0 1024 1024" width="200" height="200" style="width: 100%;height: 100%;">
                            <path fill="${fill}" d="M943.5 481.1L795.4 327.3 732.8 390l62.7 62.7H586.1c-10.2 0-18.6-8.3-18.6-18.6V230.5l62.7 62.7 62.7-62.7L539.1 76.7c-17.1-17.1-45.6-17.1-62.7 0L328.3 230.5l62.7 62.7 62.7-68.4v209.3c0 10.2-8.3 18.6-18.6 18.6H225.8l62.7-62.7-57-62.7L77.7 481.1c-5.7 5.7-11.4 17.1-11.4 28.5 0 11.4 5.7 22.8 11.4 28.5l153.8 153.8 62.7-62.7-68.4-62.7h209.3c10.2 0 18.6 8.3 18.6 18.6v209.3L391 731.7l-62.7 62.7 153.8 153.8c5.7 5.7 17.1 11.4 28.5 11.4 11.4 0 22.8-5.7 28.5-11.4l153.8-153.8-62.7-62.7-62.7 62.7V585.1c0-10.2 8.3-18.6 18.6-18.6h209.3l-62.7 62.7 62.7 62.7 153.8-153.8c11.4-17.1 11.4-39.9-5.7-57z"></path>
                        </svg>
                    </div>
                    <div id="desktop-close" title="关闭" style="width: 22px;height: 22px;font-size: 0;cursor: pointer">
                        <svg viewBox="0 0 1024 1024" width="200" height="200" style="width: 100%;height: 100%;">
                            <path fill="${fill}" d="M622.276923 508.061538l257.969231-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353846l-41.353846-41.353847c-11.815385-11.815385-29.538462-11.815385-41.353846 0L539.569231 425.353846c-7.876923 7.876923-19.692308 7.876923-27.569231 0L254.030769 165.415385c-11.815385-11.815385-29.538462-11.815385-41.353846 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L169.353846 793.6c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L512 618.338462c7.876923-7.876923 19.692308-7.876923 27.569231 0l257.969231 257.96923c11.815385 11.815385 29.538462 11.815385 41.353846 0l41.353846-41.353846c11.815385-11.815385 11.815385-29.538462 0-41.353846L622.276923 535.630769c-5.907692-7.876923-5.907692-19.692308 0-27.569231z"></path>
                        </svg>
                    </div>
                </div>
                `);
                if ($wolai_desktop.length !== 0) {
                    $wolai_desktop.remove();
                }
                $container.append($html);

                $('#desktop-close').click(() => {
                    const win = remote.getCurrentWindow();
                    win.hide();
                });
            };

            if (!$container.data('init')) {
                $container.data('init', true);
                update();
            }

            if (localStorage.getItem('wolai_theme') !== wolai_theme) {
                wolai_theme = localStorage.getItem('wolai_theme');
                update();
            }
        }
        const $sidebar = $('#sidebar-tree-root');
        if ($sidebar.length === 1) {
            $sidebar.css({ '-webkit-app-region': 'drag' });
            $sidebar.children().css({ '-webkit-app-region': 'no-drag' });
        }
    })();

    (() => {
        $(document).keydown(function (e) {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 123) {
                remote.BrowserWindow.getFocusedWindow()?.webContents.openDevTools();
            }
        });
    })();
}

document.addEventListener('DOMContentLoaded', function () {
    // @ts-ignore 
    const $ = window.$ = window.jQuery = require('jquery');

    // 观察器的配置（需要观察什么变动）
    const config = { childList: true, subtree: true };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(enhance);

    // 以上述配置开始观察目标节点
    observer.observe(document.body, config);
});
