$(document).ready(function () {
  // $('form input').on("invalid", function(event) {
  //     event.preventDefault();
  // });

  $("#mortgage-amount")
    .focus(function () {
      $(this).parent().css({ borderColor: "hsl(61, 70%, 52%)" });
      $(this).prev().css({
        backgroundColor: "hsl(61, 70%, 52%)",
        color: "hsl(200, 24%, 40%)",
      });
    })
    .blur(function () {
      resetStyles($(this).prev());
    });

  $("#mortgage-term, #interest-rate")
    .focus(function () {
      $(this).parent().css({ borderColor: "hsl(61, 70%, 52%)" });
      $(this).next().css({
        backgroundColor: "hsl(61, 70%, 52%)",
        color: "hsl(200, 24%, 40%)",
      });
    })
    .blur(function () {
      resetStyles($(this).next());
    });

  $('input[name="mortgage-type"]').change(function () {
    $('input[name="mortgage-type"]:checked').parent().css({
      backgroundColor: "hsla(61, 70%, 52%, 0.2)",
      borderColor: "hsl(61, 70%, 52%)",
    });
    $('input[name="mortgage-type"]:not(:checked)').parent().css({
      backgroundColor: "transparent",
      borderColor: "hsl(200, 24%, 40%)",
    });
  });

  $(".reset-button").click(function () {
    resetStyles($(".input-placeholder"));
  });

  $("form").submit(function () {
    resetStyles($(".input-placeholder"));
    let mAmount = $("#mortgage-amount");
    let mTerm = $("#mortgage-term");
    let interest = $("#interest-rate");
    let mType = $('input[name="mortgage-type"]:checked', "#mortgage-input");
    let isError = false;
    let p = mAmount.val();
    let r = interest.val();
    let n = mTerm.val();

    if (p == "") {
      displayError(mAmount.prev());
      isError = true;
    }
    if (n == "") {
      displayError(mTerm.next());
      isError = true;
    }

    if (r == "") {
      displayError(interest.next());
      isError = true;
    }

    if (mType.val() == undefined) {
      $("#m-type-error").show();
      isError = true;
    }

    if (!isError) {
      let monthlyRepayment, totalRepayment;
      let rateConverted = r / 100 / 12;
      let periodMonths = n * 12;
      let monthlyInterest, totalInterest;

      monthlyRepayment =
        (p * rateConverted * Math.pow(1 + rateConverted, periodMonths)) /
        (Math.pow(1 + rateConverted, periodMonths) - 1);

      let emi = monthlyRepayment.toFixed(2);
      totalRepayment = (monthlyRepayment * periodMonths).toFixed(2);
      //   console.log(emi, totalRepayment);
      totalInterest = (totalRepayment - p).toFixed(2);
      monthlyInterest = (totalInterest / periodMonths).toFixed(2);

      if (mType.val() === "interest") {
        $(".result-stats h1").html(`&#163; ${monthlyInterest}`);
        $("#monthly-amount").text("Your monthly interest");
        $(".result-stats h3").html(`&#163; ${totalInterest}`);
        $(".total-amount").text("Total interest you'll pay over the term");
        console.log(monthlyInterest);
      } else {
        $(".result-stats h1").html(`&#163; ${emi}`);
        $("#monthly-amount").text("Your monthly repayments");
        $(".result-stats h3").html(`&#163; ${totalRepayment}`);
        $(".total-amount").text("Total you'll repay over the term");
      }

      $(".result-empty").hide();
      $(".result-completed").show(100, function () {
        $(this).css("display", "flex");
      });
    }
  });
});

function resetStyles(ele) {
  ele.css({
    backgroundColor: "hsl(202, 86%, 94%)",
    color: "hsl(200, 24%, 40%)",
  });
  ele.parent().css("borderColor", "hsl(200, 24%, 40%)");
  $(".error-msg").hide();
  $(".container").css("height", "75%");
  $('input[name="mortgage-type"]').parent().css({
    backgroundColor: "transparent",
    borderColor: "hsl(200, 24%, 40%)",
  });
}

function displayError(ele) {
  $(".container").css("height", "85%");
  ele.css({ backgroundColor: "hsl(4, 69%, 50%)", color: "white" });
  ele.parent().css("borderColor", "hsl(4, 69%, 50%)");
  ele.parent().next(".error-msg").show();
}
