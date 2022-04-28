import React from "react";

function SocialIcons() {
  return (
    <div className="w-[6%] items-center justify-center flex flex-col space-y-12">
      <a
        href="https://twitter.com/soulelectronics"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="/assets/Icon_feather-twitter.png"
          alt="Twitter"
          className="w-7"
        />
      </a>{" "}
      <a
        href="https://www.instagram.com/soulelectronics"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/assets/icon_instagram.png" alt="Instagram" className="w-7" />{" "}
      </a>
      <a href="https://discord.gg/PqGfjBhbjU" target="_blank" rel="noreferrer">
        <img
          src="/assets/Icon_simple-discord.png"
          alt="Discord"
          className="w-7"
        />
      </a>
    </div>
  );
}

export default SocialIcons;
