import { ImprovedNoise } from "./three/math/ImprovedNoise.js";

let container;
let camera, scene, renderer;
let mesh, texture;

const worldWidth = 256,
  worldDepth = 256;
const clock = new THREE.Clock();

let mouseX = 0,
  mouseY = 0;
const sensitivity = 0.002;

window.addEventListener("load", function () {
  // Remove Preloader after all resources are loaded
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500); // Delay to allow fading effect

  // Fade in nav and footer separately after preloader is removed
  document.querySelector("nav").style.opacity = "1";
  document.querySelector("footer").style.opacity = "1";

  // Function to apply animation
  function applyAnimation(selector, animation) {
    document.querySelectorAll(selector).forEach((element) => {
      element.style.animation = animation;
    });
  }

  // Apply animations to hero titles
  applyAnimation("#hero-title-1", "showContent 1s 0s ease-in-out forwards");
  applyAnimation("#hero-title-2", "showContent 1s 0.5s ease-in-out forwards");
  applyAnimation("#hero-title-3", "showContent 1s 1s ease-in-out forwards");
});

init();

document.addEventListener("mousemove", onMouseMove);

function init() {
  container = document.getElementById("hero");

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xefd1b5);
  scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);

  const data = generateHeight(worldWidth, worldDepth);

  camera.position.set(100, 800, -800); /* 
	camera.lookAt(-100, 810, -800); */
  camera.lookAt(0, 0, 0);

  const geometry = new THREE.PlaneGeometry(
    7500,
    7500,
    worldWidth - 1,
    worldDepth - 1
  );
  geometry.rotateX(-Math.PI / 2);

  const vertices = geometry.attributes.position.array;

  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 1] = data[i] * 10;
  }

  texture = new THREE.CanvasTexture(
    generateTexture(data, worldWidth, worldDepth)
  );
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ map: texture })
  );
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
}

function generateHeight(width, height) {
  let seed = Math.PI / 4;
  window.Math.random = function () {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const size = width * height,
    data = new Uint8Array(size);
  const perlin = new ImprovedNoise(),
    z = Math.random() * 100;

  let quality = 1;

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < size; i++) {
      const x = i % width,
        y = ~~(i / width);
      data[i] += Math.abs(
        perlin.noise(x / quality, y / quality, z) * quality * 1.75
      );
    }
    quality *= 5;
  }

  return data;
}

function generateTexture(data, width, height) {
  let context, image, imageData, shade;
  const vector3 = new THREE.Vector3(0, 0, 0);
  const sun = new THREE.Vector3(1, 1, 1);
  sun.normalize();

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext("2d");
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);

  image = context.getImageData(0, 0, canvas.width, canvas.height);
  imageData = image.data;

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
    vector3.x = data[j - 2] - data[j + 2];
    vector3.y = 2;
    vector3.z = data[j - width * 2] - data[j + width * 2];
    vector3.normalize();

    shade = vector3.dot(sun);

    imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
    imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
    imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
  }

  context.putImageData(image, 0, 0);

  const canvasScaled = document.createElement("canvas");
  canvasScaled.width = width * 4;
  canvasScaled.height = height * 4;

  context = canvasScaled.getContext("2d");
  context.scale(4, 4);
  context.drawImage(canvas, 0, 0);

  image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
  imageData = image.data;

  for (let i = 0, l = imageData.length; i < l; i += 4) {
    const v = ~~(Math.random() * 5);
    imageData[i] += v;
    imageData[i + 1] += v;
    imageData[i + 2] += v;
  }

  context.putImageData(image, 0, 0);

  return canvasScaled;
}

function animate() {
  updateCamera();
  render();
}

function updateCamera() {
  camera.rotation.y = -mouseX * sensitivity;
  camera.rotation.x = -mouseY * sensitivity;
}

function render() {
  renderer.render(scene, camera);
}

const volunteersData = [
  {
    name: "Umashankar",
    position: "Chair",
    order: 1,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/umashankar-s-8186b2286/",
    },
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGsdmD5356mag/profile-displayphoto-shrink_400_400/B4DZPV64CbHcAg-/0/1734460802707?e=1745452800&v=beta&t=No0l6fh6IvNKMQHuvcFkq77_GFMT8ztDsW0FoqMxNkA",
  },
  {
    name: "Vishnu Kashyap D",
    position: "Vice Chair",
    order: 2,
    socialLinks: {
      linkedin:
        "https://www.linkedin.com/in/vishnu-kashyap-d-54a5b82a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/vishnukashyapd18",
      github: "https://github.com/VishnuKashyap0018",
    },
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEW6bu1vAYUzw/profile-displayphoto-shrink_400_400/B56ZOh4vmCGgAg-/0/1733587840276?e=1745452800&v=beta&t=JywDohIpBm6LuRljTrMQN57N-QGYyvQ0AMGsttjkQyY",
  },
  {
    name: "Ramvel",
    position: "Secretary",
    order: 3,
    socialLinks: {
    },
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHmk8ryUKt14g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730543082071?e=1746662400&v=beta&t=gDPSbVnnd93nsW815WXNRP5CCcgZ3TXfXhIgeFDa9hA",
  },
  {
    name: "Medha",
    position: "Joint Secretary",
    order: 4,
    socialLinks: {},
    image: "https://media.licdn.com/dms/image/v2/D5603AQG8wnTTa3yLuw/profile-displayphoto-shrink_400_400/B56ZQfXDd5G8Ag-/0/1735692925816?e=1746662400&v=beta&t=mcKubhPGdz9ytvwyUIYw1WeoAbbixNMn_c1bap1rOq4",
  },

  {
    name: "Vishal",
    position: "Treasurer",
    order: 5,
    socialLinks: {},
    image: "https://media.licdn.com/dms/image/v2/D5603AQEWSnQYT3ISsA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1721578792016?e=1746662400&v=beta&t=Mk-PMlghhMEBu_XBZswcwEVLH9xJyPG6qOx-vmObH4c",
  },
  {
    name: "Thanmay",
    position: "Joint Treasurer",
    order: 6,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Abhay Prabhakar",
    position: "Webmaster",
    order: 7,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/abhay-prabhakar",
      instagram: "https://www.instagram.com/abhay.__.p/",
      github: "https://github.com/abhayprabhakar/",
    },
    image: "/images/execom/abhay.jpeg",
  },
  {
    name: "Soumyadeep Ghosh",
    position: "Webmaster",
    order: 8,
    socialLinks: {},
    image: "https://media.licdn.com/dms/image/v2/D5603AQE_sy2m0rYwbw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1725071799619?e=1746662400&v=beta&t=Rw-CjLZzGbc7iU7a_aLZJQwjtTfb2dFD96Af45WuXlc",
  },
  {
    name: "Nithin",
    position: "Tech Head",
    order: 9,
    socialLinks: {},
    image: "https://media.licdn.com/dms/image/v2/D5603AQFAkje1qNViJg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1702727203110?e=1746662400&v=beta&t=fJC-0gqdhdeCLEoB4RFVCyJ7RteBfuEzftn8mLR_Oto",
  },
  {
    name: "Sai Samay",
    position: "Tech Associate",
    order: 10,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sai-samay-870205320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram: "https://www.instagram.com/sai_samay?igsh=Zm13eHNnc2tmb2E5&utm_source=qr",
      github: "https://github.com/yamas14",
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGb5qMSFloZ3w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1725188214385?e=1746662400&v=beta&t=iPrKD-VoyUak6ZGBtohtqzMuDhFsmSMqLcytOCONB30",
  },
  {
    name: "Manognya G",
    position: "Media Head",
    order: 11,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Valli Gayatri Patibanda",
    position: "Media Associate",
    order: 12,
    socialLinks: {
      linkedin:
        "https://www.linkedin.com/in/valli-gayatri-patibanda-3a005b1b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram:
        "https://www.instagram.com/gayatrii_p?igsh=MTQ3dWh3ZTljdHV4NQ==",
    },
    image: "https://media.licdn.com/dms/image/v2/D5603AQFCHT2c04fsJw/profile-displayphoto-shrink_400_400/B56ZOmKAS2GwAg-/0/1733659461600?e=1746662400&v=beta&t=5nsivYwSm8idrqM_ceH2VtVcv3v0prAsZrQSNwQtfGw",
  },
  {
    name: "Meghana S",
    position: "Content & Design Head",
    order: 13,
    socialLinks: {},
    image: "/images/execom/meghna.jpeg",
  },
  {
    name: "Disha Jain",
    position: "Content & Design Associate",
    order: 14,
    socialLinks: {
      linkedin: "http://www.linkedin.com/in/disha-jain275",
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHC3gZ6TVJWSA/profile-displayphoto-shrink_800_800/B4EZUi8tIEHcAc-/0/1740048094220?e=1746662400&v=beta&t=TZRQeneEcAwAOaC4mkdrGRLQZgNbK-rOYV2HTY1IFWk",
  },
  {
    name: "Abdul Majid",
    position: "Events & Operation Head",
    order: 15,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Sinchana Anil",
    position: "Events & Operation Associate",
    order: 16,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sinchana-anil-161a68337",
      instagram:
        "https://www.instagram.com/sinchanaa_anil?igsh=cWQ2OTNxb2I5bW15",
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQFzCSB6cpgvsQ/profile-displayphoto-shrink_200_200/B4EZQr.7wBGcAY-/0/1735904706816?e=1746662400&v=beta&t=qU0gRvJHFGgSFfXx8yquavrSTeVgaJ55IbusVT1lD9s",
  },
  {
    name: "Yeshwanth",
    position: "Marketing Head",
    order: 17,
    socialLinks: {},
    image: "/images/execom/avatar1.png",
  },
  {
    name: "Sagar Y J",
    position: "Marketing Associate",
    order: 18,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sagar-yj-a70411321/",
      instagram: "https://www.instagram.com/sagaryj03/",
      github: "https://github.com/Sagaryj",
    },
    image: "/images/execom/sagar.JPG",
  },
  {
    name: "Keerthana Sindhu",
    position: "Marketing Associate",
    order: 19,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ks-aabz7",
      instagram: "https://www.instagram.com/keerrth_04?igsh=cG96dGcxaHl3cWox",
      github: "https://github.com/Keerthana040",
    },
    image: "https://media.licdn.com/dms/image/v2/D5603AQH_l403szcAFQ/profile-displayphoto-shrink_800_800/B56ZTPRB6_HwAo-/0/1738644136533?e=1746662400&v=beta&t=OICH0Sb8x299I8_CKJ6Xx3qmqrT5NxxN_-7WVgKmy_o",
  },
];

function initializeLazyLoading() {
  const lazyImages = document.querySelectorAll(".lazy-load");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px",
    }
  );

  lazyImages.forEach((img) => imageObserver.observe(img));
}

function createVolunteerCard(volunteer) {
  const card = document.createElement("div");
  card.className = "volunteer-card";

  const image = document.createElement("img");
  image.className = "volunteer-image lazy-load";
  image.dataset.src = volunteer.image;
  image.alt = volunteer.name;

  const name = document.createElement("div");
  name.className = "volunteer-name";
  name.textContent = volunteer.name;

  const position = document.createElement("div");
  position.className = "volunteer-position";
  position.textContent = volunteer.position;

  const socialIcons = document.createElement("div");
  socialIcons.className = "social-icons";

  const socialPlatforms = [
    { name: "linkedin", icon: faLinkedin, url: volunteer.socialLinks.linkedin },
    { name: "instagram", icon: faInstagram, url: volunteer.socialLinks.instagram },
    { name: "twitter", icon: faTwitter, url: volunteer.socialLinks.twitter },
    { name: "github", icon: faGithub, url: volunteer.socialLinks.github },
  ];

  socialPlatforms.forEach((platform) => {
    if (platform.url) {
      const socialLink = document.createElement("a");
      socialLink.href = platform.url;
      socialLink.target = "_blank";
      socialLink.className = "social-icon";

      const icon = document.createElement("i");
      icon.className = platform.icon;

      socialLink.appendChild(icon);
      socialIcons.appendChild(socialLink);
    }
  });

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(position);
  card.appendChild(socialIcons);

  return card;
}

const volunteerContainer = document.getElementById("volunteer-container");
const fragment = document.createDocumentFragment();

volunteersData.forEach((volunteer) => {
  const card = createVolunteerCard(volunteer);
  fragment.appendChild(card);
});

volunteerContainer.appendChild(fragment);

initializeLazyLoading();
