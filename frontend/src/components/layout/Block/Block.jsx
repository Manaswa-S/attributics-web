const paddingMap = {
  '1.2%': 'lg:px-[1.2%] px-[3%]',
  '5%': 'lg:px-[5%] px-[3%]',
  '8%': 'lg:px-[8%] px-[3%]',
  '15%': 'lg:px-[15%] px-[3%]',
};

const ymarginMap = {
  '0': 'lg:my-0 my-0',
  '5%': 'lg:my-[5%] my-[20%]',
  '10%': 'lg:my-[10%] my-[3%]',
}

const topMarginMap = {
  '0': 'lg:mt-0 mt-0',
  '5%': 'lg:mt-[5%] mt-[20%]',
  '7%': 'lg:mt-[7%] mt-[20%]',
  '10%': 'lg:mt-[10%] mt-[3%]',
}

const Block = ({
    children,
    minHeight = '',
    background,
    xpad = '1.2%',
    topMargin = '0',
    ymargin = '0',
  }) => {
    return (
      <div
        style={{
            width: '100%',
            minHeight,
        }}
        className={`relative ${paddingMap[xpad]} ${ymarginMap[ymargin]} ${topMarginMap[topMargin]} ${background}`}
      >
        {children}
      </div>
    );
  };
  
  export default Block;
