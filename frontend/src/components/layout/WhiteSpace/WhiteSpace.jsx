const WhiteSpace = ({
    children,
    height = '15vh',
    background,
  }) => {
    const isMobile = window.innerWidth < 1024;
    height = isMobile ? '10vh' : height; 
    return (
      <div
        style={{
          width: '100vw',
          height,
          backgroundColor: background,
        }}
      >
        {children}
      </div>
    );
  };
  
  export default WhiteSpace;
  