

$.get("/api/user_data").then(function(data) {
   console.log(data.id);
   getBudgets(data.id);
});

var categories = [];
var categoryValue = [];

function getBudgets(userID) {
  var userString = userID || "";
   if (userString) {
    userString = "/user/" + userString;
  }
  $.get("/api/budgets" + userString, function(data) {
    // console.log("Budgets", data);
    for (var i = 0; i < data.length; i++){
      categories.push(data[i].name + ": $" + data[i].amount_spent);
      categoryValue.push(data[i].amount_spent);
    }
  }).then(() => {
    renderChart();
  })
}

function renderChart () {
    new Chart(document.getElementById("budget-chart"), {
      type: 'doughnut',
      data: {
          labels: categories,
          datasets: [
              {
                  label: "Budget (Dollars)",
                  backgroundColor: ["#0000ff", "#ee82ee", "#3cba9f", "#e8c3b9", "#c45850",
                  "#00bfff", "#b22222", "#228b22", "#d2691e", "#4b0082", "#ffd700"],
                  data: categoryValue
              }
          ],
      },
      options: {
          response: true,
          title: {
              text: "Expenses",
              display: true,
              fontSize: 26,
              fontFamily: "Lobster",
              fontColor: "black",
              padding: 30
          },
          legend: {
              display: true,
              position: "bottom",
              labels: {
                  fontSize: 16,
                  boxWidth: 20,
                  fontFamily: "Lobster",
                  fontColor: "black",
                  padding: 25
              }
          },
          tooltips: {
              callbacks: {
                  // function converting expenses into percentages/month.
                  label: function (tooltipItem, data) {
                      var dataset = data.datasets[tooltipItem.datasetIndex];
                      var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                      var total = meta.total;
                      var currentValue = dataset.data[tooltipItem.index];
                      var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                      return ' (' + percentage + '%)';
                  },
                  title: function (tooltipItem, data) {
                      return data.labels[tooltipItem[0].index];
                  }
              }
          },
      }
    });
  }