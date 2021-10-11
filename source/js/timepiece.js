class Timepiece {

    constructor() {
        this.init()
    }

    ZHCNArr=['零','一','二','三','四','五','六','七','八','九','十'];
    dateInfo = null;
    rotateInfo= null;
    $el = null;
    els = null;

    init() {
        console.log('init timepiece...');
        let timeDom = document.createElement('ul');
        timeDom.appendChild($('hr')[0]);
        timeDom.classList.add('clock');
        timeDom.setAttribute('id', 'helang-clock');
        this.$el = $(timeDom);
        $('#page-header')[0].appendChild(this.$el[0]);
        let nowDate=new Date();
            this.dateInfo={
                "year":nowDate.getFullYear(),
                "month":nowDate.getMonth()+1,
                "day":nowDate.getDate(),
                "hour":nowDate.getHours(),
                "minute":nowDate.getMinutes(),
                "sec":nowDate.getSeconds()
            };
            console.log(this.dateInfo);

            this.setDate();
            this.setHour();
    }

    /* 转为简体中文 */
    changeZHCN(value) {
         /* 小于 10 */
         if(value<10){
            return this.ZHCNArr[value];
        }

        let val=value.toString(),str='';
        /* 整十 */
        if(val.charAt(1)==0){
            // 第一位不是1 取对应的数值
            if(val.charAt(0)!=1){
                str=this.ZHCNArr[parseInt(val.charAt(0),10)];
            }
            str+=this.ZHCNArr[10];
            return str;
        }

        /* 小于 20 */
        if(value<20){
            str=this.ZHCNArr[10]+this.ZHCNArr[parseInt(val.charAt(1),10)];
            return str;
        }

        str=this.ZHCNArr[parseInt(val.charAt(0),10)]+this.ZHCNArr[10]+this.ZHCNArr[parseInt(val.charAt(1),10)];
        return str;
    }

    /* 设置日期 */
    setDate() {
        let yearStr='',monthStr='',dayStr='';
        let y=this.dateInfo.year.toString();
        for(let i=0;i<y.length;i++){
            yearStr+=this.changeZHCN(parseInt(y.charAt(i),10));
        }
        monthStr=this.changeZHCN(this.dateInfo.month);
        dayStr=this.changeZHCN(this.dateInfo.day);
        if(this.els){
            this.els.date.html(yearStr+'年'+monthStr+'月'+dayStr+'日');
        }else {
            this.$el.append('<li class="date">'+(yearStr+'年'+monthStr+'月'+dayStr+'日')+'</li>');
        }
    }

    /* 设置小时 */
    setHour() {
        let str='',rotateArr=[];
        for(var i=1;i<=24;i++){
            rotateArr.push(360/24*(i-1)*-1);
            str+='<div><div>'+(this.changeZHCN(i))+'时</div></div>';
        }
        this.$el.append('<li class="hour on-hour">'+str+'</li>');

        setTimeout( ()=> {
            this.$el.find(".on-hour>div").each(function (index,el) {
                $(el).css({
                    "transform":"rotate("+rotateArr[index]+"deg)"
                })
            });
            setTimeout( ()=> {
                this.setMinute();
            },300);
        },100)
    }

    /* 设置分钟 */
    setMinute() {
        let str='',rotateArr=[];
        for(var i=1;i<=60;i++){
            rotateArr.push(360/60*(i-1)*-1);
            str+='<div><div>'+(this.changeZHCN(i))+'分</div></div>';
        }
        this.$el.append('<li class="hour minute on-minute">'+str+'</li>');

        setTimeout( ()=> {
            this.$el.find(".on-minute>div").each(function (index,el) {
                $(el).css({
                    "transform":"rotate("+rotateArr[index]+"deg)"
                })
            });
            setTimeout( ()=> {
                this.setSec();
            },300)
        },100);
    }

    /* 设置秒 */
    setSec(){
        let str='',rotateArr=[];
        for(let i=1;i<=60;i++){
            rotateArr.push(360/60*(i-1)*-1);
            str+='<div><div>'+(this.changeZHCN(i))+'秒</div></div>';
        }
        this.$el.append('<li class="hour sec on-sec">'+str+'</li>');
        setTimeout( ()=> {
            this.$el.find(".on-sec>div").each(function (index,el) {
                $(el).css({
                    "transform":"rotate("+rotateArr[index]+"deg)"
                })
            });
            setTimeout( ()=> {
                this.initRotate();
            },1300);
        },100);
    }

    /* 初始化滚动位置 */
    initRotate() {
        this.rotateInfo={
            "h":360/24*(this.dateInfo.hour-1),
            "m":360/60*(this.dateInfo.minute-1),
            "s":360/60*(this.dateInfo.sec-1),
        };
        this.els={
            "date":this.$el.find(".date"),
            "hour":this.$el.find(".on-hour"),
            "minute":this.$el.find(".on-minute"),
            "sec":this.$el.find(".on-sec")
        };
        this.els.hour.css({
            "transform":"rotate("+this.rotateInfo.h+"deg)"
        });
        this.els.minute.css({
            "transform":"rotate("+this.rotateInfo.m+"deg)"
        });
        this.els.sec.css({
            "transform":"rotate("+this.rotateInfo.s+"deg)"
        });

        setTimeout( () => {
            this.$el.find("hr").addClass("active").css({
                "width":"49%"
            });
            this.start();
        },300);
    }

    /* 启动 */
    start(){
        setTimeout( ()=> {
            if(this.dateInfo.sec<=60){
                this.dateInfo.sec++;
                var r=360/60*(this.dateInfo.sec-1);
                this.els.sec.css({
                    "transform":"rotate("+r+"deg)"
                });

                this.minuteAdd();
                this.start();
            }else {
                console.log(this.dateInfo.sec)
            }
        },1000);
    };

    /* 分钟数增加 */
    minuteAdd(){
        if(this.dateInfo.sec==60+1){
            setTimeout( ()=> {
                this.els.sec.css({
                    "transform":"rotate(0deg)",
                    "transition-duration": "0s"
                });
                this.dateInfo.sec=1;
                setTimeout( ()=> {
                    this.els.sec.attr("style","transform:rotate(0deg)");
                },100);
                this.dateInfo.minute++;
                var r=360/60*(this.dateInfo.minute-1);
                this.els.minute.css({
                    "transform":"rotate("+r+"deg)"
                });
                this.hourAdd();
            },300);
        }
    };

    /* 小时数增加 */
    hourAdd(){
        if(this.dateInfo.minute==60+1){
            setTimeout( ()=> {
                this.els.minute.css({
                    "transform":"rotate(0deg)",
                    "transition-duration": "0s"
                });
                this.dateInfo.minute=1;
                setTimeout( ()=> {
                    this.els.minute.attr("style","transform:rotate(0deg)");
                },100);
                this.dateInfo.hour++;
                let r=360/24*(this.dateInfo.hour-1);
                this.els.hour.css({
                    "transform":"rotate("+r+"deg)"
                });
                this.dayAdd();
            },300);
        }
    };

    /* 天数增加 */
    dayAdd(){
        if(this.dateInfo.hour==24+1){
            setTimeout( ()=> {
                this.els.hour.css({
                    "transform":"rotate(0deg)",
                    "transition-duration": "0s"
                });
                this.dateInfo.hour=1;
                setTimeout( ()=> {
                    this.els.hour.attr("style","transform:rotate(0deg)");
                },100);

                let nowDate=new Date();
                this.dateInfo.year=nowDate.getFullYear();
                this.dateInfo.month=nowDate.getMonth()+1;
                this.dateInfo.day=nowDate.getDate();
                this.setDate();
            },300);
        }
    };
}

btf.isJqueryLoad(
     () => {
         new Timepiece();
     }
);