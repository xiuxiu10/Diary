//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    activeIndex:0,
    dayList:[],
    list: [],     
    sum:[
      {
        title:'今日专注时间(min)',
        val:'0'
      },
      {
        title: '今日专注次数',
        val: '0'
      },
      {
        title: '累计专注时间',
        val: '0分钟'
      },
      {
        title: '累计专注时间',
        val: '0分钟'
      }
    ],
      cateArr: [
      {
        text: '工作'
      },
      {
        text: "学习",
      },
      {
        text: '运动'
      }
    ],
  },
  onShow: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    var logs = wx.getStorageSync('logs') || [];
    // 为什么logs里面会有一串数字，哪里来的？
    logs.pop();
    console.log(logs)
    var day = 0; //今日番茄次数
    var total = logs.length; //累计番茄次数
    var dayTime = 0; //今日时长
    var totalTime = 0; //累计时长
    var dayList = [];

    if (logs.length > 0) {
      for (var i = 0; i < logs.length; i++) {
        if ((logs[i].date !== undefined) && logs[i].date.substr(0, 10) == util.formatTime(new Date).substr(0, 10)) {
          // if(logs[i].date==util.formatTime(new Date)){
          // console.log(0)
          day = day + 1;
          dayTime = dayTime + parseInt(logs[i].time)
          dayList.push(logs[i])
          this.setData({
            dayList: dayList,
            list: dayList
          })
        }
        if (logs[i].date !== undefined) {
          totalTime = totalTime + parseInt(logs[i].time)
        }
      };
      this.setData({
        'sum[0].val': day,
        'sum[1].val': total,
        'sum[2].val': dayTime,
        'sum[3].val': totalTime
      })
    }
  },

 changeType: function (e) {
    var index = e.currentTarget.dataset.index
    if (index == 1) { //今日
      this.setData({
        list: this.data.dayList
      })
    } else {         //历史
      var logs = wx.getStorageSync('logs') || [];
      this.setData({
        list: logs
      })
    };
    this.setData({
      actionIndex: index
    })
  }
})
