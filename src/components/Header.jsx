function Header() {
  return (
    <header className="w-full">
      <div className="flex items-center justify-between bg-[#27262c] px-6 md:px-12 py-4 shadow-md">
        <div
          className="flex gap-5 justify-center items-center"
          onClick={() => {
            window.open("https://lottery.purplewavestudios.com/");
          }}
        >
          <img
            src="/images/logo.jpg"
            alt="USDT"
            className="object-contain w-14 h-14 rounded-full"
          />
          <h4 className="text-lg font-bold uppercase">Lottery</h4>
        </div>
        <div className="flex items-center gap-4">
          <w3m-button />
        </div>
      </div>
    </header>
  );
}

export default Header;
