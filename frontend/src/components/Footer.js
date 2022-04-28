import React from "react";

function Footer() {
  return (
    <>
      <div className="social-section" id="follow-us">
        <div className="flex flex-col space-y-4 text-sm justify-center items-center p-8">
          <p>CONNECT WITH US ON</p>
          <div className="flex justify-center items-center space-x-4">
            <a
              href="https://twitter.com/soulelectronics"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/social_twitter.png" alt="Twitter" />
            </a>
            <a
              href="https://www.instagram.com/soulelectronics"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/social_ig.png" alt="Instagram" />
            </a>
            <a
              href="https://discord.gg/PqGfjBhbjU"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/social_discord.png" alt="Discord" />
            </a>
          </div>
          <p>2022 © METABRGE. All rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
