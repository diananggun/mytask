let dataBlog = [
  {
    id: new Date().valueOf(),
    title: "Restaurant Website",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2020-01-31"),
    description:
      "Restaurant website adalah sebuah situs web yang didedikasikan untuk menyediakan informasi dan pengalaman interaktif tentang restoran tertentu. Situs ini bertujuan untuk menarik perhatian pengunjung potensial, memberikan informasi tentang menu, lokasi, dan layanan yang disediakan oleh restoran tersebut, serta memfasilitasi proses pemesanan makanan secara online.",
    technology: ["reactjs", "nodejs", "typescript"],
    duration: calculateDuration(new Date("2020-01-01"), new Date("2020-01-31")),
    postAt: new Date(),
    image: "/assets/images/organic.jpg",
    author: "Dian Anggun Septiani",
  },
];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let description = document.getElementById("description").value;
  let checkboxes = document.querySelectorAll('input[name="technology"]:checked');
  let technology = [];
  checkboxes.forEach((checkbox) => {
    technology.push(checkbox.value);
  });

  let image = document.getElementById("blog-image").files;
  let start = new Date(startDate);
  let end = new Date(endDate);
  let duration = calculateDuration(start, end);

  image = URL.createObjectURL(image[0]);

  let blog = {
    id: new Date().valueOf(),
    title,
    startDate,
    endDate,
    description,
    technology,
    duration,
    postAt: new Date(),
    image,
    author: "Dian Anggun Septiani",
  };

  dataBlog.push(blog);
  localStorage.setItem("dataBlog", JSON.stringify(dataBlog));

  renderBlog();
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";
  for (let index = 0; index < dataBlog.length; index++) {
    let techImages = "";
    for (let i = 0; i < dataBlog[index].technology.length; i++) {
      techImages += `<img src="assets/images/${dataBlog[index].technology[i]}.jpg">`;
    }
    document.getElementById("contents").innerHTML += `
        <div class="blog-list-item">
        <div class="blog-image">
          <img src="${dataBlog[index].image}">
        </div>
        <div class="blog-content">
          <a class="title" href="blog-detail.html?id=${dataBlog[index].id}" target="_blank">${
      dataBlog[index].title
    }</a>
          <p class="duration">Duration : ${calculateDuration(
            new Date(dataBlog[index].startDate),
            new Date(dataBlog[index].endDate)
          )}</p>
          <p class="desc">${dataBlog[index].description}</p>
          <div class="tech-images">
          ${techImages}
          </div>
          <p class="published">${getFullTime(dataBlog[index].postAt)}</p>
          <p class="published">${getDistanceTime(dataBlog[index].postAt)}</p>
          <div class="button-container">
            <button class="button-project" type="button">Edit</button>
            <button class="button-project" type="button">Delete</button>
          </div>
        </div>
      </div>
        `;
  }
}

function getFullTime(time) {
  // console.log("get full time");
  // let time = new Date();
  // console.log(time);
  time = new Date(time);

  let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // console.log(monthName[8]);

  let date = time.getDate();
  // console.log(date);

  let monthIndex = time.getMonth();
  // console.log(monthIndex);

  let year = time.getFullYear();
  // console.log(year);

  let hours = time.getHours();
  let minutes = time.getMinutes();
  // console.log(minutes);

  if (hours <= 9) {
    hours = "0" + hours;
  } else if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${date} ${monthName[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}

function getDistanceTime(time) {
  let timeNow = new Date();
  let timePost = time;

  // waktu sekarang - waktu post
  let distance = timeNow - timePost; // hasilnya milidetik
  console.log(distance);

  let milisecond = 1000; // milisecond
  let secondInHours = 3600; // 1 jam 3600 detik
  let hoursInDays = 24; // 1 hari 24 jam

  let distanceDay = Math.floor(distance / (milisecond * secondInHours * hoursInDays)); // 1/86400000
  let distanceHours = Math.floor(distance / (milisecond * 60 * 60)); // 1/3600000
  let distanceMinutes = Math.floor(distance / (milisecond * 60)); // 1/60000
  let distanceSeconds = Math.floor(distance / milisecond); // 1/1000

  if (distanceDay > 0) {
    return `${distanceDay} Day Ago`;
  } else if (distanceHours > 0) {
    return `${distanceHours} Hours Ago`;
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} Minutes Ago`;
  } else {
    return `${distanceSeconds} Seconds Ago`;
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const dataFromLocalstorage = localStorage.getItem("dataBlog");
    if (dataFromLocalstorage) {
      dataBlog = JSON.parse(dataFromLocalstorage);
    }

    renderBlog();
  },
  false
);

// setInterval(function () {
//   renderBlog();
// }, 10000);

function calculateDuration(start, end) {
  var duration = end.getTime() - start.getTime();

  var days = Math.floor(duration / (24 * 60 * 60 * 1000));
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);

  var remainingDays = days % 30;
  var remainingMonths = months % 12;

  if (years > 0) {
    return `${years} tahun ${remainingMonths} bulan ${remainingDays} hari`;
  } else if (remainingMonths > 0) {
    return `${remainingMonths} bulan ${remainingDays} hari`;
  } else {
    return `${remainingDays} hari`;
  }
}
