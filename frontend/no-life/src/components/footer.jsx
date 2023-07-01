const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className=" max-sm:h-10 max-sm:text-sm h-14 bg-neutral flex justify-start items-center text-white font-geologica pl-5 text-lg">
      <p>&copy; copyright {year} | Djamet Coder</p>
    </div>
  );
};

export default Footer;
