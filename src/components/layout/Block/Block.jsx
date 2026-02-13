const Block = ({
    children,
    minHeight = '',
    background,
    xpad = '1.2%',
  }) => {

    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
        if (xpad != '') {
            xpad = '5%';
        }
    }

    return (
      <div
        style={{
            width: '100%',
            minHeight,
            paddingLeft: xpad,
            paddingRight: xpad,
            backgroundColor: background,
        }}
        className="relative"
      >
        {children}
      </div>
    );
  };
  
  export default Block;
