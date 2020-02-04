Page({
    data:{
        courses:[],
        comment:{},
        teacher:[],
        isFold:"展开",
        ellipsis: true,
        isCard: false,
        commentL:0,
        courseL:0,
        isCourse:true,
        nCourse: false,
    },

    move: function(){
        var value = !this.data.ellipsis;
        this.setData({
          ellipsis: value
        });
        if(this.ellipsis){
            this.setData({
                isFold: "展开"
              }) ;
        }
        else{
            this.setData({
                isFold: "收起"
              }) 
        }
    },
    onLoad: function(options){
        console.log(options);
        var that = this;
        that.setData({
          id: options.id
        })
        wx.request({
          url: 'http://www.ecnucs.club:8000/service/teacher/listTeacher', /*修改more_coursecmt即可*/
          method: 'POST',
          data: { /*根据接口需要选择需要POST的数据*/
            id: that.data.id,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              teacher: res.data.data.teachers[0]
            })
            console.log(that.data.teacher);
          }
        })

        that.requestCourse();
        that.requestComment();
      },
      requestCourse: function(){
        var that = this;
        wx.request({
            url: 'http://www.ecnucs.club:8000/service/course/course_teaching', /*修改more_coursecmt即可*/
            method: 'POST',
            data: { /*根据接口需要选择需要POST的数据*/
              res_id: that.data.id,
              res_type: '教师'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data);
              var x = res.data.data.courses.length;
              that.setData({
                courses: res.data.data.courses,
                courseL: x
              })
              console.log(that.data.courses);
            },
            error: function(){
                console.log("error");
            }
            
          })
      },
    requestComment: function(){
      var that = this;
    wx.request({
        url: 'http://www.ecnucs.club:8000/service/course/more_comment', /*修改more_coursecmt即可*/
        method: 'POST',
        data: { /*根据接口需要选择需要POST的数据*/
          res_id: that.data.id,
          res_type: '教师'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          var x= res.data.data.comment_info.length;
            that.setData({
                comment: res.data.data.comment_info[0],
                commentL: x
              })
        
          console.log(that.data.comment);
        },
        failed: function(res){
            console.log(res)
        }
      })
  },
  grade: function(e){
    wx.navigateTo({
      url:'../grade/grade?id='+e.currentTarget.dataset.id+'&isCourse='+e.currentTarget.dataset.isCourse
    })
  },
  moreComment: function(e){
    wx.navigateTo({
      url:'../allCourseComment/allCourseComment?id='+e.currentTarget.dataset.id+'&isCourse='+e.currentTarget.dataset.isCourse
    })
  },

})