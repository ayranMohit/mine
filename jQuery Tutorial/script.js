$("document").ready(function () {
  /*jQuery selectors*/

  //calling by tag+ css manipulating
  //mouseover == mouseenter
  $("div").mouseenter(function () {
    $("div").css({
      padding: "2rem",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    });
  });
  //calling by class
  $("div").mouseleave(function () {
    $("div").removeAttr("style");
  });
  //calling by id + multiple + setting directions to elements seperately
  $("p").hover(
    function () {
      $(this).css({
        "font-size": "1.5rem",
        color: "white",
        transition: "color 1.5s, font-size 1s",
      });
    },
    function () {
      $(this).css({
        "font-size": "",
        color: "",
      });
    }
  );
  //calling by rank
  $("p:first").hover(
    function () {
      $("p:first").css("font-weigh", "900");
    },
    function () {
      $("p:first").css("font-weigh", "");
    }
  );
  //calling by parent & child
  $("div > p").hover(
    // let appended = "lalalala";
    function () {
      $(this).css({
        border: "1px solid black",
        padding: ".5rem .7rem",
        transition: "2s",
        borderRadius: "10px",
      });
    },
    function () {
      $(this).removeAttr("style");
    }
  );
  /* kewup,keydown,keyperss*/

  $("input[type='text']").keydown(function () {
    $(this).css("background-color", "yellow");
  });
  $("input[type='text']").keyup(function () {
    $(this).removeAttr("style");
  });
  var count = 0;
  $("input[type='text']").keypress(function () {
    count++;
    $(".text").text(count);
  });
  $("input[type='text']").keydown(function (event) {
    if (event.code === "Backspace") {
      if (count > 0) {
        count--;
      }
      $(".text").text(count);
      if (count == 0) {
        $(".text").text("")
      }
    }
  });
  // keyboard events of both code & which
  $("body").keydown(function (event) {
    console.log(event.code);
    console.log(event.which);
    if (event.code === "KeyH") {
      $("button").hide("5s");
    }
    if (event.code === "KeyS") {
      $("button").show("5s");
    }
    if (event.which == "65") {
      // key A
      $("button").hide("5s");
    }
    if (event.which == "66") {
      // key B
      $("button").show("5s");
    }
  });
});
