let blogDetail = {};

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const dataFromLocalstorage = localStorage.getItem("dataBlog");
    if (dataFromLocalstorage) {
      const blogData = JSON.parse(dataFromLocalstorage);
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      blogDetail = blogData.find((blog) => blog.id == id);

      renderBlog();
    }
  },
  false
);

function renderBlog() {
  document.getElementById("contents").innerHTML = `
  <div class="title-blog">${blogDetail.title}</div>
  <div class="blog-image">
    <img src="${blogDetail.image}" alt="" />
    <div class="blog-desc">
      <div class="duration">
        <h4>Duration</h4>
        <p><i class="fas fa-calendar"></i></p>
        <p><i class="fas fa-clock"></i>${calculateDuration(
          new Date(blogDetail.startDate),
          new Date(blogDetail.endDate)
        )}</p>
      </div>
      <div class="technologies">
        <h4>Technologies</h4>
        <p><i class="fas fa-code"></i>Node Js</p>
        <p><i class="fas fa-file-code"></i>React js</p>
      </div>
    </div>
  </div>
  <div class="blog-content">
    <p>
      ${blogDetail.description}
    </p>
  </div>
</div>
  `;
}

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
