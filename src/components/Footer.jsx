function Footer() {
  return (
    <header className="w-full">
      <div className="flex items-center gap-4 justify-center flex-row bg-[#27262c] p-4">
        <button
          onClick={() => {
            window.open(
              "https://chiliscan.com/address/0x2f1b7e0d80d21574277e50E4a6C3C92204b4ccb7"
            );
          }}
        >
          {/* Polyscan */}
          <img
            src="/images/logo.jpg"
            alt="PolyScan"
            className="w-10 h-10 rounded-full"
          />
        </button>

        <button
          // onclick open a link
          onClick={() => {
            window.open("https://t.me/MunChizToken");
          }}
        >
          {/* Polyscan */}
          <img
            src="./images/chains/twitter.png"
            alt="PolyScan"
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>
    </header>
  );
}

export default Footer;
