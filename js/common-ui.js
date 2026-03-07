(function () {
  function initStars() {
    const starsLayer = document.getElementById("stars-layer");
    if (!starsLayer || starsLayer.dataset.initialized === "true") {
      return;
    }

    const isMobileStarsViewport = window.matchMedia("(max-width: 639px)").matches;
    const starCount = isMobileStarsViewport ? 500 : 1000;
    const appearDuration = 60;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      star.style.left = Math.random() * 100 + "vw";
      star.style.top = Math.random() * 100 + "vh";

      const size = Math.random() * 2 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";

      starsLayer.appendChild(star);

      const riseDuration = 75 + Math.random() * 150;
      const blinkDuration = 5 + Math.random() * 10;
      star.style.animationDuration = `${blinkDuration}s, ${riseDuration}s`;

      const delay = Math.random() * appearDuration;
      star.style.animationDelay = `${delay}s, ${delay}s`;
    }

    starsLayer.dataset.initialized = "true";
  }

  function getResumeHref(selectedLang) {
    const resumeBasePath = window.location.pathname.includes("/html/") ? "../img/resume/" : "img/resume/";
    const resumeFile = selectedLang === "de" ? "Bewerbung_Maik_Isaak.pdf" : "Resume_Maik_Isaak.pdf";
    return resumeBasePath + resumeFile;
  }

  window.initPortfolioCommonUi = function initPortfolioCommonUi() {
    initStars();

    const switcher = document.getElementById("language-switcher");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!switcher || !mobileMenu) {
      return null;
    }

    const languageButton = switcher.querySelector(".language-button");
    const options = switcher.querySelectorAll(".language-option");
    const mobileMenuButton = mobileMenu.querySelector(".mobile-menu-button");
    const navLinks = document.querySelectorAll(".navigation-item a");
    const mobileNavLinks = document.querySelectorAll(".mobile-navigation-link");
    const mobileLanguageLabelText = mobileMenu.querySelector(".mobile-language-label-text");
    const mobileLanguageOptions = mobileMenu.querySelectorAll(".mobile-language-option");
    const resumeLinks = document.querySelectorAll(".resume-link");

    function updateResumeLinks(selectedLang) {
      const resumeHref = getResumeHref(selectedLang);

      resumeLinks.forEach((link) => {
        link.setAttribute("href", resumeHref);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
    }

    return {
      switcher,
      languageButton,
      options,
      mobileMenu,
      mobileMenuButton,
      navLinks,
      mobileNavLinks,
      mobileLanguageLabelText,
      mobileLanguageOptions,
      resumeLinks,
      updateResumeLinks,
    };
  };
})();
