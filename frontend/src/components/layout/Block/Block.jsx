const xPaddingMap = {
  'none': 'lg:px-0 px-0',
  'small': 'lg:px-5 px-3',
  'medium': 'lg:px-25 px-3',
  'large': 'lg:px-50 px-3',
  'larger': 'lg:px-120 px-3',
};

const topMarginMap = {
  'none': 'lg:mt-0 mt-0',
  'small': 'lg:mt-25 mt-20',
  'large': 'lg:mt-45 mt-30',
}

const Block = ({
    children,
    minHeight = '',
    background,
    xpad = 'small',
    topMargin = 'none',
  }) => {
    return (
      <div
        style={{
            width: '100%',
            minHeight,
        }}
        className={`relative ${xPaddingMap[xpad]} ${topMarginMap[topMargin]} ${background}`}
      >
        {children}
      </div>
    );
  };
  
  export default Block;
