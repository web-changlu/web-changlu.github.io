let instance = null;
let timer = null;
class Timepiece {
    constructor() {
        this.init()
    }

    ZHCNArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    dateInfo = null;
    rotateInfo = null;
    $el = null;
    els = null;

    init() {
        if (timer) return timer;
        console.log('init timepiece...');
        const timeDom = $('<ul><hr/><li class="cl-clock-bg"></li></ul>');
        timeDom[0].classList.add('clock');
        timeDom[0].setAttribute('id', 'helang-clock');
        timeDom.appendTo('#page-header');
        this.$el = timeDom;
        timer = this.$el;
        let nowDate = new Date();
        this.dateInfo = {
            "year": nowDate.getFullYear(),
            "month": nowDate.getMonth() + 1,
            "day": nowDate.getDate(),
            "hour": nowDate.getHours(),
            "minute": nowDate.getMinutes(),
            "sec": nowDate.getSeconds()
        };
        // console.log(this.dateInfo);

        this.setDate();
        this.setHour();
    }

    /* 转为简体中文 */
    changeZHCN(value) {
        /* 小于 10 */
        if (value < 10) {
            return this.ZHCNArr[value];
        }

        let val = value.toString(), str = '';
        /* 整十 */
        if (val.charAt(1) == 0) {
            // 第一位不是1 取对应的数值
            if (val.charAt(0) != 1) {
                str = this.ZHCNArr[parseInt(val.charAt(0), 10)];
            }
            str += this.ZHCNArr[10];
            return str;
        }

        /* 小于 20 */
        if (value < 20) {
            str = this.ZHCNArr[10] + this.ZHCNArr[parseInt(val.charAt(1), 10)];
            return str;
        }

        str = this.ZHCNArr[parseInt(val.charAt(0), 10)] + this.ZHCNArr[10] + this.ZHCNArr[parseInt(val.charAt(1), 10)];
        return str;
    }

    /* 设置日期 */
    setDate() {
        let yearStr = '', monthStr = '', dayStr = '';
        let y = this.dateInfo.year.toString();
        for (let i = 0; i < y.length; i++) {
            yearStr += this.changeZHCN(parseInt(y.charAt(i), 10));
        }
        monthStr = this.changeZHCN(this.dateInfo.month);
        dayStr = this.changeZHCN(this.dateInfo.day);
        if (this.els) {
            this.els.date.html(yearStr + '年' + monthStr + '月' + dayStr + '日');
        } else {
            this.$el.append('<li class="date">' + (yearStr + '年' + monthStr + '月' + dayStr + '日') + '</li>');
        }
    }

    /* 设置小时 */
    setHour() {
        let str = '', rotateArr = [];
        for (var i = 1; i <= 24; i++) {
            rotateArr.push(360 / 24 * (i - 1) * -1);
            str += '<div><div>' + (this.changeZHCN(i)) + '时</div></div>';
        }
        this.$el.append('<li class="hour on-hour">' + str + '</li>');

        setTimeout(() => {
            this.$el.find(".on-hour>div").each(function (index, el) {
                $(el).css({
                    "transform": "rotate(" + rotateArr[index] + "deg)"
                })
            });
            setTimeout(() => {
                this.setMinute();
            }, 300);
        }, 100)
    }

    /* 设置分钟 */
    setMinute() {
        let str = '', rotateArr = [];
        for (var i = 1; i <= 60; i++) {
            rotateArr.push(360 / 60 * (i - 1) * -1);
            str += '<div><div>' + (this.changeZHCN(i)) + '分</div></div>';
        }
        this.$el.append('<li class="hour minute on-minute">' + str + '</li>');

        setTimeout(() => {
            this.$el.find(".on-minute>div").each(function (index, el) {
                $(el).css({
                    "transform": "rotate(" + rotateArr[index] + "deg)"
                })
            });
            setTimeout(() => {
                this.setSec();
            }, 300)
        }, 100);
    }

    /* 设置秒 */
    setSec() {
        let str = '', rotateArr = [];
        for (let i = 1; i <= 60; i++) {
            rotateArr.push(360 / 60 * (i - 1) * -1);
            str += '<div><div>' + (this.changeZHCN(i)) + '秒</div></div>';
        }
        this.$el.append('<li class="hour sec on-sec">' + str + '</li>');
        setTimeout(() => {
            this.$el.find(".on-sec>div").each(function (index, el) {
                $(el).css({
                    "transform": "rotate(" + rotateArr[index] + "deg)"
                })
            });
            setTimeout(() => {
                this.initRotate();
            }, 1300);
        }, 100);
    }

    /* 初始化滚动位置 */
    initRotate() {
        this.rotateInfo = {
            "h": 360 / 24 * (this.dateInfo.hour - 1),
            "m": 360 / 60 * (this.dateInfo.minute - 1),
            "s": 360 / 60 * (this.dateInfo.sec - 1),
        };
        this.els = {
            "date": this.$el.find(".date"),
            "hour": this.$el.find(".on-hour"),
            "minute": this.$el.find(".on-minute"),
            "sec": this.$el.find(".on-sec")
        };
        this.els.hour.css({
            "transform": "rotate(" + this.rotateInfo.h + "deg)"
        });
        this.els.minute.css({
            "transform": "rotate(" + this.rotateInfo.m + "deg)"
        });
        this.els.sec.css({
            "transform": "rotate(" + this.rotateInfo.s + "deg)"
        });

        setTimeout(() => {
            this.$el.find("hr").addClass("active");
            this.start();
        }, 300);
    }

    /* 启动 */
    start() {
        setTimeout(() => {
            if (this.dateInfo.sec <= 60) {
                this.dateInfo.sec++;
                var r = 360 / 60 * (this.dateInfo.sec - 1);
                this.els.sec.css({
                    "transform": "rotate(" + r + "deg)"
                });

                this.minuteAdd();
                this.start();
            } else {
                console.log(this.dateInfo.sec)
            }
        }, 1000);
    };

    /* 分钟数增加 */
    minuteAdd() {
        if (this.dateInfo.sec == 60 + 1) {
            setTimeout(() => {
                this.els.sec.css({
                    "transform": "rotate(0deg)",
                    "transition-duration": "0s"
                });
                this.dateInfo.sec = 1;
                setTimeout(() => {
                    this.els.sec.attr("style", "transform:rotate(0deg)");
                }, 100);
                this.dateInfo.minute++;
                var r = 360 / 60 * (this.dateInfo.minute - 1);
                this.els.minute.css({
                    "transform": "rotate(" + r + "deg)"
                });
                this.hourAdd();
            }, 300);
        }
    };

    /* 小时数增加 */
    hourAdd() {
        if (this.dateInfo.minute == 60 + 1) {
            setTimeout(() => {
                this.els.minute.css({
                    "transform": "rotate(0deg)",
                    "transition-duration": "0s"
                });
                this.dateInfo.minute = 1;
                setTimeout(() => {
                    this.els.minute.attr("style", "transform:rotate(0deg)");
                }, 100);
                this.dateInfo.hour++;
                let r = 360 / 24 * (this.dateInfo.hour - 1);
                this.els.hour.css({
                    "transform": "rotate(" + r + "deg)"
                });
                this.dayAdd();
            }, 300);
        }
    };

    /* 天数增加 */
    dayAdd() {
        if (this.dateInfo.hour == 24 + 1) {
            setTimeout(() => {
                this.els.hour.css({
                    "transform": "rotate(0deg)",
                    "transition-duration": "0s"
                });
                this.dateInfo.hour = 1;
                setTimeout(() => {
                    this.els.hour.attr("style", "transform:rotate(0deg)");
                }, 100);

                let nowDate = new Date();
                this.dateInfo.year = nowDate.getFullYear();
                this.dateInfo.month = nowDate.getMonth() + 1;
                this.dateInfo.day = nowDate.getDate();
                this.setDate();
            }, 300);
        }
    };
}
class MyEvents {
    constructor() {
        if (instance) {
            return instance;
        } else {
            instance = this;
            this.init();
        }
    }

    init() {
        console.log('init user events');
        this.checkPageSize();
        $(window).resize(() => {
            //执行代码块
            this.checkPageSize();
        });
    }
    checkPageSize() {
        if ($(window).width() <= 720) {
            if (timer) {
                timer.remove();
                timer = null;
            }

            $('#page-header').attr('page-size', 'min');
        } else {
            new Timepiece();
            // $('#page-header').attr('page-size', 'normal' );
        }
    }
}

// pwa相关
class PWA {
    constructor() {
        this.insertRemindDom();
        if ('serviceWorker' in navigator) {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.addEventListener('controllerchange', function () {
                    showNotification()
                })
            }

            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js')
            })
        }

        function showNotification() {
            if (GLOBAL_CONFIG.Snackbar) {
                var snackbarBg =
                    document.documentElement.getAttribute('data-theme') === 'light'
                        ? GLOBAL_CONFIG.Snackbar.bgLight
                        : GLOBAL_CONFIG.Snackbar.bgDark
                var snackbarPos = GLOBAL_CONFIG.Snackbar.position
                Snackbar.show({
                    text: '已更新最新版本',
                    backgroundColor: snackbarBg,
                    duration: 500000,
                    pos: snackbarPos,
                    actionText: '点击刷新',
                    actionTextColor: '#fff',
                    onActionClick: function (e) {
                        location.reload()
                    },
                })
            } else {
                var showBg =
                    document.documentElement.getAttribute('data-theme') === 'light'
                        ? '#49b1f5'
                        : '#1f1f1f'
                var cssText = `top: 0; background: ${showBg};`
                document.getElementById('app-refresh').style.cssText = cssText
            }
        }
    }

    insertRemindDom() {
        $(`<div class="app-refresh" id="app-refresh">
        <div class="app-refresh-wrap">
          <label>✨ 网站已更新最新版本 👉</label>
          <a href="javascript:void(0)" onclick="location.reload()">点击刷新</a>
        </div>
      </div>`).appendTo('body');
    }
}

class InsertDom {

    constructor() {
        this.addAplayer();
        this.addApFlod();
        this.addWaves();
        this.options = {
            container: this.apDom[0],
            autoplay: false,
            theme: '#FAEB6C',
            loop: 'all',
            order: 'random',
            preload: 'auto',
            volume: 0.7,
            mutex: true,
            listFolded: true,
            listMaxHeight: 180,
            lrcType: 3,
            audio: [
                {
                    name: '觅红',
                    artist: '兔裹煎蛋卷',
                    url: '/music/觅红.mp3',
                    cover: '/music/mihong.png',
                    lrc: '',
                    // theme: '#ebd0c2'
                },
                {
                    name: '你的样子（钢琴版）',
                    artist: 'Killed by Moy',
                    url: '/music/你的样子（钢琴版）.flac',
                    cover: '/music/cover.png',
                    lrc: '',
                    // theme: '#ebd0c2'
                },
                {
                    name: '奢香夫人',
                    artist: '潘柚彤',
                    url: '/music/奢香夫人-潘.m4a',
                    cover: '/music/pyt.png',
                    lrc: '',
                    // theme: '#ebd0c2'
                },
            ]
        }
        this.ap = new APlayer(this.options);
        this.bindAplayerMove();
        this.bindaplayerFlod();
        const xhr = new XMLHttpRequest();
        this.setTheme(this.ap.list.index, xhr);
        this.ap.on('listswitch', ({ index }) => {
            this.setTheme(index, xhr);
        });
    }

    ap = null
    options = null
    apDom = null
    aplayerContainer = null;
    apFlod = null;
    addAplayer() {
        // $('<div class="aplayer no-destroy" data-id="6987078772" data-server="netease" data-type="playlist" data-fixed="true" data-mini="true" data-listFolded="false" data-order="random" data-preload="none" data-autoplay="true" muted></div>').appendTo('body');
        const aplayerContainer = $(`<div class='aplayer-container'></div>`);

        const apDom = $('<div></div>');
        apDom[0].classList.add('aplayer');
        // apDom[0].classList.add('aplayer-position');
        $(`<p class='aplayer-title'><i class="fa fa-music"></i>音乐鉴赏</p><i class="fa fa-times closemusic"></i>`).appendTo(aplayerContainer);
        apDom.appendTo(aplayerContainer);
        aplayerContainer.appendTo('body');
        // apDom.appendTo('body');
        this.apDom = apDom;
        this.aplayerContainer = aplayerContainer;

    }
    addApFlod() {
        const apFlod = $(`<div class='aplayer-flod'></div>`)
        apFlod.appendTo('body');
        apFlod.attr('flod', false);
        this.apFlod = apFlod;
    }
    addWaves() {
        const waves = $(`
            <div id='waves'>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0"></use>
                        <use xlink:href="#gentle-wave" x="48" y="3"></use>
                        <use xlink:href="#gentle-wave" x="48" y="5"></use>
                        <use xlink:href="#gentle-wave" x="48" y="7"></use>
                    </g>
                </svg>
            </div>
        `)
        $('#page-header').after(waves);
    }
    setTheme(index, xhr) {
        const image = new Image();
        const _this = this;
        const colorThief = new ColorThief();
        if (!_this.ap.list.audios[index].theme) {
            xhr.onload = function () {
                let coverUrl = URL.createObjectURL(this.response);
                image.onload = () => {
                    let color = colorThief.getColor(image);
                    _this.ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
                    URL.revokeObjectURL(coverUrl)
                };
                image.src = coverUrl;
            }
            xhr.open('GET', _this.ap.list.audios[index].cover, true);
            xhr.responseType = 'blob';
            xhr.send();
        }
    };
    bindaplayerFlod() {
        $('.closemusic').bind('click', (e) => {
            const leftInstance = e.screenX;
            const screenWidth = window.innerWidth;
            const positionObj = {};
            // const width = this.aplayerContainer.width();
            // 移动元素
            this.aplayerContainer.css({ "width": 0, 'border': 'none' });
            // this.aplayerContainer.css({"left": '-15rem', "top": '80%', "width": 0});
            if (leftInstance < (screenWidth / 2)) {
                // alert('靠左边');
                positionObj.left = true;
            } else {
                // alert('靠右边');
                positionObj.left = false;
            }
            const snackbarBg =
                document.documentElement.getAttribute('data-theme') === 'light'
                    ? GLOBAL_CONFIG.Snackbar.bgLight
                    : GLOBAL_CONFIG.Snackbar.bgDark;
            const snackbarPos = GLOBAL_CONFIG.Snackbar.position
            Snackbar.show({
                text: `点击${positionObj.left ? '左' : '右'}下角按钮可再次开启音乐播放器`,
                backgroundColor: snackbarBg,
                actionText: '我知道了',
                actionTextColor: '#fff',
                duration: 500000,
                pos: snackbarPos,
                actionTextColor: '#F8A061',
            })
            // alert('点击左下角按钮可再次开启音乐播放器')
            setTimeout(() => {
                this.apFlod.attr('flod', true);
            }, 3000)

            if (positionObj.left) {
                // alert('靠左边');
                this.apFlod.attr('left', true);
            } else {
                // alert('靠右边');
                this.apFlod.attr('left', false);
            }
        });
        this.apFlod.bind('click', (e) => {
            this.apFlod.attr('flod', false);
            this.apFlod.removeAttr('left');
            this.aplayerContainer.css({ "width": "18rem", 'border': '3px solid #fff' });
            // this.aplayerContainer.css({"left": 0, "width":"14rem"});
        })
    }
    bindAplayerMove() {
        $('.aplayer-title').bind('mousedown', (e) => {
            // 算出鼠标相对元素的位置
            const disX = e.clientX - this.aplayerContainer[0].offsetLeft;
            const disY = e.clientY - this.aplayerContainer[0].offsetTop;
            const containerHeight = this.aplayerContainer.height(), containerWidth = this.aplayerContainer.width();
            document.onmousemove = (e) => {
                let left = e.clientX - disX
                let top = e.clientY - disY;
                let maxTop = window.innerHeight - containerHeight, maxLeft = window.innerWidth - containerWidth;

                if (top >= maxTop) {
                    top = maxTop;
                } else if (top < 0) {
                    top = 0;
                }
                if (left < 0) {
                    left = 0;
                } else if (left >= maxLeft) {
                    left = maxLeft;
                }
                // 移动元素
                this.aplayerContainer.css({ "left": left + 'px', "top": top + 'px' });
            }
            document.onmouseup = (e) => {
                // 鼠标弹起停止移动
                document.onmousemove = null
                // 防止弹起后再次循环
                document.onmouseup = null
            }
        })
    }
}


(() => {
    new MyEvents();
    new InsertDom();
    new PWA();
}
)();