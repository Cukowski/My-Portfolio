const navbar = document.querySelector(".navbar");
const navbarOffsetTop = navbar.offsetTop;
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");
const progress = document.querySelector(".progress-bars-wrapper");
const progressBarPercents = [90, 80, 70, 60, 50, 40, 30];
const videoContainer = document.getElementById("video-container");
const YT_API_KEY = "YOUR_YOUTUBE_API_KEY";
const CHANNEL_ID = "YOUR_CHANNEL_ID";

window.addEventListener("scroll", () => {
  mainFn();
});

const mainFn = () => {
  if (window.pageYOffset >= navbarOffsetTop) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  sections.forEach((section, i) => {
    if (window.pageYOffset >= section.offsetTop - 10) {
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove("change");
      });
      navbarLinks[i].classList.add("change");
    }
  });

  if (window.pageYOffset + window.innerHeight >= progress.offsetTop) {
    document.querySelectorAll(".progress-percent").forEach((el, i) => {
      el.style.width = `${progressBarPercents[i]}%`;
      el.previousElementSibling.firstElementChild.textContent =
        progressBarPercents[i];
    });
  }
};

mainFn();

const loadVideos = async () => {
  if (!videoContainer) return;
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=4`
    );
    const data = await response.json();
    data.items.forEach((item) => {
      const id = item.id.videoId;
      if (!id) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${id}`;
      iframe.className = "video-frame";
      iframe.title = item.snippet.title;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      videoContainer.appendChild(iframe);
    });
  } catch (err) {
    if (videoContainer) videoContainer.innerHTML = "Failed to load videos.";
  }
};

document.addEventListener("DOMContentLoaded", loadVideos);

// window.addEventListener("resize", () => {
//   window.location.reload();
// });
