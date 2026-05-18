const BIRTHDAY_PAGE = {
  friendName: "亲爱的朋友",
  birthdayDate: "5月20日",
  title: "生日快乐",
  heroMessage:
    "愿你今天像站在雪山顶看见日出一样，忽然觉得所有勇气、光和喜欢的事，都正在向你靠近。",
  mainWish:
    "好好收下所有祝福。愿你永远保有翻过高山的勇气，也能在起风的时候找到可以休息的小营地。生日快乐，愿你被认真喜欢，被世界温柔以待。",
  surpriseIntro: "山顶营地里，有几位原创小伙伴也想把祝福送给你。",
  surpriseWish:
    "他们说：今天不赶路，不冲刺，也不用证明什么。今天只负责快乐，负责被祝福，负责相信自己值得很多很多好事。",
  music: {
    src: "assets/birthday-music.mp3",
    volume: 0.55,
    onLabel: "音乐 开",
    offLabel: "音乐 关",
    missingLabel: "请放入音乐",
  },
  footerMessages: [
    "不管是工作还是备考，偶尔都要停下来好好过个生日的哦。",
    "一直很感谢 2024 年你送我的那本日历，在我离职失意最难熬的日子里，那些文字给了我很多安慰和力量，我一直记在心里。",
    //"其实这一年来，我心里一直对你有着不一样的好感，也能感受到你待人的温柔与善意。只是静下心好好想了想，我现在自身状态还不够安稳，经济也没安顿下来，也没能真正走进内心、完整了解你。一直这样不清不楚地相处，反而悄悄耽误了你。所以我想慢慢把这份喜欢好好安放起来，往后就安安静静做彼此舒服的朋友，守好分寸，不拉扯、不暧昧",
    "新的一岁，愿你被世界温柔偏爱，平安喜乐，万事顺心，也愿你早日遇见那个刚好合适、能好好珍惜你的人",
    "无论如何，新岁已至，生日快乐！放下心里的执念和难过，和过去的不愉快好好说再见，往后平安顺遂，满心皆是美好，岁岁无忧～",
    "自强不息的青春万岁！厚德载物的青春万岁！加油，奥利给！",
    "在困难面前，就让意志带你杀出重围吧！",
  ],
};

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element && value) {
    element.textContent = value;
  }
};

const getScrollBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

const bindInteractions = () => {
  const openGiftButton = document.getElementById("openGiftButton");
  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseCast = document.getElementById("surpriseCast");

  openGiftButton?.addEventListener("click", () => {
    document.body.classList.add("is-open");
    document.getElementById("letter")?.scrollIntoView({ behavior: getScrollBehavior() });
  });

  surpriseButton?.addEventListener("click", () => {
    if (!surpriseCast) {
      return;
    }

    const isOpening = surpriseCast.hidden;
    surpriseCast.hidden = !isOpening;
    surpriseButton.setAttribute("aria-expanded", String(isOpening));
    surpriseButton.textContent = isOpening ? "收起小彩蛋" : "打开小彩蛋";

    if (isOpening) {
      surpriseCast.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
    }
  });
};

const bindMusicControl = () => {
  const audio = document.getElementById("backgroundMusic");
  const toggle = document.getElementById("musicToggle");
  const toggleText = document.getElementById("musicToggleText");

  if (!audio || !toggle || !toggleText) {
    return;
  }

  audio.src = BIRTHDAY_PAGE.music.src;
  audio.volume = BIRTHDAY_PAGE.music.volume;

  const setPlaying = (isPlaying) => {
    toggle.dataset.state = isPlaying ? "playing" : "paused";
    toggle.setAttribute("aria-pressed", String(isPlaying));
    toggle.setAttribute("aria-label", isPlaying ? "暂停背景音乐" : "播放背景音乐");
    toggleText.textContent = isPlaying
      ? BIRTHDAY_PAGE.music.onLabel
      : BIRTHDAY_PAGE.music.offLabel;
  };

  const setUnavailable = () => {
    toggle.dataset.state = "missing";
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("aria-label", `未找到音乐文件：${BIRTHDAY_PAGE.music.src}`);
    toggleText.textContent = BIRTHDAY_PAGE.music.missingLabel;
  };

  audio.addEventListener("error", setUnavailable);
  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => setPlaying(false));

  toggle.addEventListener("click", async () => {
    if (toggle.dataset.state === "missing") {
      setUnavailable();
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setUnavailable();
      }
      return;
    }

    audio.pause();
  });

  setPlaying(false);
};

const bindFooterRotation = () => {
  const footer = document.getElementById("footerMessage");
  const messages = BIRTHDAY_PAGE.footerMessages.filter(Boolean);

  if (!footer || messages.length === 0) {
    return;
  }

  let index = 0;
  footer.textContent = messages[index];

  window.setInterval(() => {
    footer.classList.add("is-fading");

    window.setTimeout(() => {
      index = (index + 1) % messages.length;
      footer.textContent = messages[index];
      footer.classList.remove("is-fading");
    }, 180);
  }, 4800);
};

const initBirthdayPage = () => {
  document.title = `${BIRTHDAY_PAGE.title} · ${BIRTHDAY_PAGE.birthdayDate} - ${BIRTHDAY_PAGE.friendName}`;
  setText("recipientLine", `给${BIRTHDAY_PAGE.friendName}`);
  setText("heroTitle", BIRTHDAY_PAGE.title);
  setText("birthdayDateLine", BIRTHDAY_PAGE.birthdayDate);
  setText("heroMessage", BIRTHDAY_PAGE.heroMessage);
  setText("mainWish", BIRTHDAY_PAGE.mainWish);
  setText("surpriseIntro", BIRTHDAY_PAGE.surpriseIntro);
  setText("surpriseWish", BIRTHDAY_PAGE.surpriseWish);
  bindMusicControl();
  bindFooterRotation();
  bindInteractions();
};

initBirthdayPage();
