


export  const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;
  
    if (!width) {
      return <th {...restProps} />;
    }
  
    return (
      <th
        {...restProps}
        onMouseDown={(e) => {
          const startWidth = restProps.width;
          const startPageX = e.pageX;
          
          const handleMouseMove = (moveEvent) => {
            const newWidth = startWidth + moveEvent.pageX - startPageX;
            onResize && onResize(newWidth);
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />
    );
  };