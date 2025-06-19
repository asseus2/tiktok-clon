const videoPlayer = document.getElementById("videoPlayer");
const videos = [
  { name: "Dans", file: "video1.mp4" },
  { name: "Komik An", file: "video2.mp4" },
  { name: "Gezi", file: "video3.mp4" }
];
let currentIndex = 0;

function changeVideo(direction) {
  if (direction === "next") {
    currentIndex = (currentIndex + 1) % videos.length;
  } else if (direction === "prev") {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  }
  videoPlayer.src = videos[currentIndex].file;
  videoPlayer.play();
}

// Mouse wheel swipe
window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    changeVideo("next");
  } else {
    changeVideo("prev");
  }
});

// Touch swipe
let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  if (touchStartY - touchEndY > 50) {
    changeVideo("next");
  } else if (touchEndY - touchStartY > 50) {
    changeVideo("prev");
  }
});

// Menü işlevleri
document.getElementById("homeBtn").addEventListener("click", () => {
  currentIndex = 0;
  videoPlayer.src = videos[currentIndex].file;
  videoPlayer.play();
});

document.getElementById("searchBtn").addEventListener("click", () => {
  document.getElementById("searchModal").style.display = "flex";
});

document.getElementById("exploreBtn").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  currentIndex = randomIndex;
  videoPlayer.src = videos[currentIndex].file;
  videoPlayer.play();
});

document.getElementById("profileBtn").addEventListener("click", () => {
  document.getElementById("profileModal").style.display = "flex";
});

function closeSearchModal() {
  document.getElementById("searchModal").style.display = "none";
}

function closeProfileModal() {
  document.getElementById("profileModal").style.display = "none";
}

// Arama işlevi
function searchVideo() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const foundIndex = videos.findIndex(video => video.name.toLowerCase().includes(keyword));
  if (foundIndex !== -1) {
    currentIndex = foundIndex;
    videoPlayer.src = videos[currentIndex].file;
    videoPlayer.play();
    closeSearchModal();
  } else {
    alert("Video bulunamadı!");
  }
}
