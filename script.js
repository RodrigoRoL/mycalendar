var localeSettings = {};
dayjs.locale(localeSettings);

$(function () {

    var hour = dayjs().format("hh");

    function hours(){
        $(".time-block").each(function(){
            var blocktime = parseInt(this.id);
            $(this).toggleClass("past", blocktime < hour);
            $(this).toggleClass("present", blocktime === hour);
            $(this).toggleClass("future", blocktime > hour);
        });
    }
//Whenever you click the "save" button on the right the text you put in the box will be saved in local storage, meaning if you refresh the website will still be there
    function text(){
        $(".saveBtn").on("click", function(){
            var text = $(this).parent().attr("id");
            var value = $(this).siblings(".description").val();
            localStorage.setItem(text,value);
        });
    }
// add color depending if its past, present or future
    function colors(){
        $(".time-block").each(function(){
            var blocktime = parseInt(this.id);
            if(blocktime == hour){
                $(this).removeClass("past future").addClass("present");
            }
            else if (blocktime < hour){
                $(this).removeClass("present future").addClass("past");
            }
            else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }

    $(".time-block").each(function(){
        var text = $(this).attr("id");
        var value = localStorage.getItem(text);
        $(this).children(".description").val(value);
    });

    function updateTime(){
    var dateElement = $("#date");
    var timeElement = $("#time");
    var curentdate = dayjs().format("dddd, MM/DD, YYYY");
    var currentime = dayjs().format("h:mm:ss a");
    dateElement.text(curentdate);
    timeElement.text(currentime);
    }

   hours();
   text();
   colors();
   setInterval(updateTime, 1000);
  });